// Reads ENTRIES from data.js and renders the stats strip + timeline.
// You should not need to edit this file — edit data.js instead.

const trackEl = document.getElementById("track");
const tabsEl = document.getElementById("tabs");
const statsEl = document.getElementById("stats-grid");
const emptyEl = document.getElementById("empty-state");

let activeCategory = "all";

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function renderStats() {
  const total = ENTRIES.length;
  const byCat = {};
  Object.keys(CATEGORY_META).forEach(k => byCat[k] = 0);
  ENTRIES.forEach(e => { if (byCat[e.category] !== undefined) byCat[e.category]++; });
  const replied = ENTRIES.filter(e => e.status === "replied").length;

  const cells = [
    { n: total, l: "Total Actions Logged" },
    { n: byCat.rti, l: "RTI Applications" },
    { n: byCat.letter, l: "Letters to Officials" },
    { n: byCat.grievance, l: "Grievance Filings" },
    { n: byCat.petition, l: "Petitions" },
    { n: replied, l: "Responses Received" },
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
  switch (entry.proofType) {
    case "image":
      return `<img class="proof-image" src="${entry.proofSrc}" alt="Proof for: ${entry.title}" loading="lazy">`;
    case "pdf":
      return `<a class="proof-link" href="${entry.proofSrc}" target="_blank" rel="noopener">View PDF proof →</a>`;
    case "link":
      return `<a class="proof-link" href="${entry.proofSrc}" target="_blank" rel="noopener">View original post →</a>`;
    case "text":
      return `<p class="proof-text">"${entry.proofSrc}"</p>`;
    case "video":
      return `<video class="proof-video" src="${entry.proofSrc}" controls preload="metadata"></video>`;
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

  trackEl.innerHTML = filtered.map(e => {
    const meta = CATEGORY_META[e.category] || { label: e.category };
    const statusLabel = { replied: "Replied", pending: "Pending", "no-response": "No Response" }[e.status] || e.status;
    return `
      <article class="entry" data-status="${e.status}">
        <div class="entry-top">
          <span class="tag cat">${meta.label}</span>
          <span class="tag status-${e.status}">${statusLabel}</span>
          <span class="entry-date">${fmtDate(e.date)}${e.referenceNo ? " · Ref: " + e.referenceNo : ""}</span>
        </div>
        <h3>${e.title}</h3>
        <p class="to-whom">To: ${e.to_whom}</p>
        <p class="desc">${e.description}</p>
        <div class="response"><strong>Response received</strong>${e.response}</div>
        ${proofHTML(e)}
      </article>
    `;
  }).join("");
}

renderStats();
renderTabs();
renderTimeline();
