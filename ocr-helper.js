/* ==========================================================
   ocr-helper.js
   --------------------------------------------------------
   Free, client-side only. Runs entirely in the admin's own
   browser. No server, no API key, no billing of any kind.

   Uses:
     - PDF.js (Mozilla, open source) to read text-layer PDFs
       directly, and to rasterize scanned/image-only pages.
     - Tesseract.js (open source) to OCR scanned pages/images,
       with Marathi + English language data ('mar+eng').

   This file is loaded ONLY on admin.html — it never ships to
   the public pages, so public visitors never download these
   (fairly large) OCR libraries.

   Everything this file produces is a SUGGESTION for the admin
   to review and correct. Nothing here is ever shown to the
   public directly — see admin.html's review step.
   ========================================================== */

const EvidenceOCR = (function () {

  const PDFJS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
  const PDFJS_WORKER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const TESSERACT_SRC = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.0.5/tesseract.min.js";

  let libsReady = null;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("लायब्ररी लोड होऊ शकली नाही: " + src));
      document.head.appendChild(s);
    });
  }

  async function ensureLibs() {
    if (libsReady) return libsReady;
    libsReady = (async () => {
      await Promise.all([loadScript(PDFJS_SRC), loadScript(TESSERACT_SRC)]);
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
    })();
    return libsReady;
  }

  // Render a PDF.js page to a canvas and return it (for OCR fallback).
  async function renderPageToCanvas(page, scale = 2) {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas;
  }

  let tesseractWorker = null;
  async function getTesseractWorker(onProgress) {
    if (tesseractWorker) return tesseractWorker;
    tesseractWorker = await Tesseract.createWorker("mar+eng", 1, {
      logger: (m) => {
        if (onProgress && m.status === "recognizing text") {
          onProgress(m.progress);
        }
      },
    });
    return tesseractWorker;
  }

  async function ocrCanvas(canvas, onProgress) {
    const worker = await getTesseractWorker(onProgress);
    const { data } = await worker.recognize(canvas);
    return data.text || "";
  }

  async function ocrImageFile(file, onProgress) {
    await ensureLibs();
    const worker = await getTesseractWorker(onProgress);
    const { data } = await worker.recognize(file);
    return [{ pageNum: 1, text: data.text || "", method: "ocr" }];
  }

  // Extracts text from a PDF: tries the real text layer first (fast,
  // accurate); if a page's text layer is empty/very short (i.e. it's a
  // scanned image with no text layer), OCRs that page instead.
  async function extractPDF(file, onProgress) {
    await ensureLibs();
    const buf = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const textLayerText = textContent.items.map((it) => it.str).join(" ").trim();

      if (textLayerText.length >= 25) {
        pages.push({ pageNum: i, text: textLayerText, method: "text-layer" });
      } else {
        // Likely a scanned page — rasterize and OCR it.
        const canvas = await renderPageToCanvas(page);
        const ocrText = await ocrCanvas(canvas, (p) => {
          if (onProgress) onProgress((i - 1 + p) / pdf.numPages);
        });
        pages.push({ pageNum: i, text: ocrText.trim(), method: "ocr" });
      }
      if (onProgress) onProgress(i / pdf.numPages);
    }
    return pages;
  }

  // Main entry point. Returns { pages: [{pageNum, text, method}], fullText }
  async function extract(file, onProgress) {
    let pages;
    if (file.type === "application/pdf") {
      pages = await extractPDF(file, onProgress);
    } else {
      pages = await ocrImageFile(file, onProgress);
    }
    const fullText = pages.map((p) => `--- पान ${p.pageNum} ---\n${p.text}`).join("\n\n");
    return { pages, fullText };
  }

  // ------------------------------------------------------------------
  // Heuristic (non-AI, plain pattern-matching) suggestions.
  // These are ALWAYS suggestions shown in editable fields — never
  // auto-published. They exist purely to save typing.
  // ------------------------------------------------------------------

  const CATEGORY_KEYWORDS = {
    RTI: [/\bRTI\b/i, /right to information/i, /माहिती अधिकार/, /कलम\s*6/, /कलम\s*७/],
    CPGRAMS: [/\bCPGRAMS\b/i, /grievance/i, /तक्रार निवारण/, /pgportal/i],
    "आपले सरकार": [/आपले सरकार/, /aaple sarkar/i, /aaplesarkar/i],
    "Railway / Government Letters": [/railway board/i, /central railway/i, /ministry of railways/i, /रेल्वे बोर्ड/, /जिल्हाधिकारी/, /collector/i],
  };

  function detectCategory(text) {
    const scores = {};
    for (const [cat, patterns] of Object.entries(CATEGORY_KEYWORDS)) {
      scores[cat] = patterns.reduce((n, re) => n + (re.test(text) ? 1 : 0), 0);
    }
    let best = null, bestScore = 0;
    for (const [cat, score] of Object.entries(scores)) {
      if (score > bestScore) { best = cat; bestScore = score; }
    }
    return best; // null if nothing matched — admin picks manually
  }

  function detectDate(text) {
    const patterns = [
      /\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})\b/,          // 02/07/2026, 02-07-2026, 02.07.2026
      /\b(\d{1,2})\s+(जानेवारी|फेब्रुवारी|मार्च|एप्रिल|मे|जून|जुलै|ऑगस्ट|सप्टेंबर|ऑक्टोबर|नोव्हेंबर|डिसेंबर)\s+(\d{4})\b/,
      /\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/i,
    ];
    for (const re of patterns) {
      const m = text.match(re);
      if (m) return m[0];
    }
    return null;
  }

  function detectReferenceNumber(text) {
    const patterns = [
      /(?:Reference\s*No\.?|Ref\.?\s*No\.?|संदर्भ\s*क्र\.?|तक्रार\s*क्र\.?|Registration\s*No\.?)\s*[:\-]?\s*([A-Za-z0-9\/\-\.]{4,})/i,
    ];
    for (const re of patterns) {
      const m = text.match(re);
      if (m) return m[1];
    }
    return null;
  }

  // Splits text into Question/Answer blocks by common markers.
  // Returns an array of { question, answer, sourcePage } — question or
  // answer may be empty if a marker without a matching pair was found;
  // admin fixes these in the review UI.
  function splitQA(pages) {
    const combined = pages.map((p) => ({ pageNum: p.pageNum, text: p.text })).flatMap((p) =>
      p.text.split(/\n+/).map((line) => ({ pageNum: p.pageNum, line }))
    );
    const qMarker = /^\s*(प्रश्न|Question|Q)\s*[\.\)\:\-]?\s*(\d+)?/i;
    const aMarker = /^\s*(उत्तर|Answer|Reply|A)\s*[\.\)\:\-]?\s*(\d+)?/i;

    const blocks = [];
    let current = null;
    let mode = null; // 'q' | 'a'

    for (const { pageNum, line } of combined) {
      if (qMarker.test(line)) {
        if (current) blocks.push(current);
        current = { question: line.replace(qMarker, "").trim(), answer: "", sourcePage: pageNum };
        mode = "q";
      } else if (aMarker.test(line)) {
        if (!current) current = { question: "", answer: "", sourcePage: pageNum };
        current.answer = (current.answer + " " + line.replace(aMarker, "").trim()).trim();
        mode = "a";
      } else if (current && mode === "q" && line.trim()) {
        current.question = (current.question + " " + line.trim()).trim();
      } else if (current && mode === "a" && line.trim()) {
        current.answer = (current.answer + " " + line.trim()).trim();
      }
    }
    if (current) blocks.push(current);
    return blocks;
  }

  return {
    extract,
    detectCategory,
    detectDate,
    detectReferenceNumber,
    splitQA,
  };
})();
