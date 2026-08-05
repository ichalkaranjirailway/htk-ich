// Reads ENTRIES from data.js and UI_TEXT from i18n.js, renders the
// stats strip + timeline, and handles the मराठी/English language toggle.
// You should not need to edit this file — edit data.js or i18n.js instead.

const trackEl = document.getElementById("track");
const tabsEl = document.getElementById("tabs");
const statsEl = document.getElementById("stats-grid");
const emptyEl = document.getElementById("empty-state");
const langToggleBtn = document.getElementById("lang-toggle");
const langToggleLabel = document.getElementById("lang-toggle-label");

let activeCategory = "all";
const LANG_KEY = "ichalkaranji-railway-lang";
let lang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "mr";

function t(key) {
  return (UI_TEXT[lang] && UI_TEXT[lang][key]) || (UI_TEXT.mr && UI_TEXT.mr[key]) || key;
}

// Returns an entry's field in the current language, falling back to the
// original (Marathi/mixed) text if no English translation exists yet.
function ef(entry, field) {
  if (lang === "en" && entry.en && entry.en[field]) return entry.en[field];
  return entry[field];
}

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  const locale = lang === "en" ? "en-IN" : "mr-IN";
  return d.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
}

function applyStaticText() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  if (langToggleLabel) langToggleLabel.textContent = t("toggle_to");
}

function renderStats() {
  const total = ENTRIES.length;
  const byCat = {};
  Object.keys(CATEGORY_META).forEach(k => byCat[k] = 0);
  ENTRIES.forEach(e => { if (byCat[e.category] !== undefined) byCat[e.category]++; });
  const replied = ENTRIES.filter(e => e.status === "replied").length;

  const cells = [
    { n: total, l: t("stat_total") },
    { n: byCat.rti, l: t("stat_rti") },
    { n: byCat.letter, l: t("stat_letters") },
    { n: byCat.grievance, l: t("stat_grievance") },
    { n: byCat.petition, l: t("stat_petitions") },
    { n: replied, l: t("stat_responses") },
  ];

  statsEl.innerHTML = cells.map(c => `
    <div class="stat-cell">
      <span class="n">${c.n}</span>
      <span class="l">${c.l}</span>
    </div>
  `).join("");
}

function renderTabs() {
  const counts = { all: ENTRIES.length };
  Object.keys(CATEGORY_META).forEach(k => {
    counts[k] = ENTRIES.filter(e => e.category === k).length;
  });

  const allTab = `<button class="tab" data-cat="all" aria-pressed="${activeCategory === "all"}">
      All <span class="count">${counts.all}</span>
    </button>`;

  const catTabs = Object.entries(CATEGORY_META).map(([key, meta]) => `
    <button class="tab" data-cat="${key}" aria-pressed="${activeCategory === key}">
      ${meta.label} <span class="count">${counts[key]}</span>
    </button>
  `).join("");

  tabsEl.innerHTML = allTab + catTabs;

  tabsEl.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.cat;
      renderTabs();
      renderTimeline();
    });
  });
}

function proofHTML(entry) {
  const title = ef(entry, "title");
  switch (entry.proofType) {
    case "image":
    case "pdf":
    case "video":
      // Document/photo/video proofs are not published on the site — visitors
      // are directed to contact the committee to request them.
      return `<a class="proof-link" href="mailto:ich.mh.51@gmail.com?subject=${encodeURIComponent("Proof Document Request - " + title)}">${t("proof_contact")}</a>`;
    case "link":
      return `<a class="proof-link" href="${entry.proofSrc}" target="_blank" rel="noopener">${t("proof_link")}</a>`;
    case "text":
      return `<p class="proof-text">"${entry.proofSrc}"</p>`;
    default:
      return "";
  }
}

function renderTimeline() {
  const sorted = [...ENTRIES].sort((a, b) => new Date(b.date) - new Date(a.date));
  const filtered = activeCategory === "all" ? sorted : sorted.filter(e => e.category === activeCategory);

  if (filtered.length === 0) {
    trackEl.innerHTML = "";
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  const statusLabels = {
    replied: t("status_replied"),
    pending: t("status_pending"),
    "no-response": t("status_no_response"),
  };

  trackEl.innerHTML = filtered.map(e => {
    const meta = CATEGORY_META[e.category] || { label: e.category };
    const statusLabel = statusLabels[e.status] || e.status;
    return `
      <article class="entry" data-status="${e.status}">
        <div class="entry-top">
          <span class="tag cat">${meta.label}</span>
          <span class="tag status-${e.status}">${statusLabel}</span>
          <span class="entry-date">${fmtDate(e.date)}${e.referenceNo ? " · Ref: " + e.referenceNo : ""}</span>
        </div>
        <h3>${ef(e, "title")}</h3>
        <p class="to-whom">${t("label_to")} ${ef(e, "to_whom")}</p>
        <p class="desc">${ef(e, "description")}</p>
        <div class="response"><strong>${t("label_response")}</strong>${ef(e, "response")}</div>
        ${proofHTML(e)}
      </article>
    `;
  }).join("");
}

function renderAll() {
  applyStaticText();
  renderStats();
  renderTabs();
  renderTimeline();
}

if (langToggleBtn) {
  langToggleBtn.addEventListener("click", () => {
    lang = lang === "mr" ? "en" : "mr";
    localStorage.setItem(LANG_KEY, lang);
    renderAll();
  });
}

renderAll();
