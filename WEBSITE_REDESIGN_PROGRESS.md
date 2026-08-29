# Ichalkaranji Railway Website — Redesign Progress

Last updated: 2026-08-27 (Session 1)
Source snapshot audited: `htk-ich-main` zip export (no `.git` history included in this export)

## CURRENT PHASE
Phase 0 — Discovery + Baseline Audit: COMPLETE
Phase 1 — Information Architecture / Sitemap: COMPLETE
Phase 2 — Homepage restructuring: COMPLETE (this pass — see "PHASE 2 STATUS" below for what's
left for a future deeper pass)
Phase 3 — Header/Navigation/Footer consistency: COMPLETE (audit + fix both done this session)

## PHASE 1 — IA DECISION (locked, applies to all later homepage work)
Confirmed sitemap stays as-is (no page merges/renames needed): HOME, HISTORY, PROJECT-STATUS,
EVIDENCE, OUR-WORK, WHY-ICHALKARANJI, OFFICIALS, GALLERY, TEAM, OPINION, VOTERS-LIST, BRIEF,
ADMIN/ADMIN_EDIT. The homepage's subnav already deep-links to all of these correctly — that
does not need to change. The actual problem was never "wrong sitemap", it was that index.html
was rendering the FULL content of gallery.html and team.html a second time (via an inline
`<script>` at the bottom of index.html reading GALLERY_ITEMS/TEAM_MEMBERS in full), instead of
using its existing "ev-teaser" CTA cards as the real gateway to those pages. Decision: keep all
dedicated pages exactly as they are; fix index.html to show a small preview + link, not a full
duplicate. Same treatment is queued for the timeline section (section 06) — see "NEXT" below.

## PHASE 2 — HOMEPAGE RESTRUCTURING — UNIT 1 (DONE, this session)
File touched: `index.html` only. Nothing else.
- Gallery section (`#gallery`) on the homepage now renders only the first 6 `GALLERY_ITEMS`
  (was: all 21), plus a linked tile ("+15 · पूर्ण दालन पहा →") pointing to `gallery.html`.
- Team section (`#team`) on the homepage now renders only the first 6 `TEAM_MEMBERS` (was: all
  18), plus a linked tile ("+12 · पूर्ण यादी पहा →") pointing to `team.html`.
- Section intro copy for both reworded to say "काही ठळक क्षण/सदस्य" (some highlights) instead of
  implying completeness.
- `gallery.html`, `team.html`, `gallery-data.js`, `team-data.js` — UNCHANGED. Full lists still
  render correctly on their own dedicated pages exactly as before.
- Preview counts are named constants (`HOMEPAGE_GALLERY_PREVIEW_COUNT`,
  `HOMEPAGE_TEAM_PREVIEW_COUNT` = 6 each) sitting right above their loops, so a future session
  (or the owner) can retune the number in one place without touching layout logic.
- Verified: all 30 voting-widget IDs still present exactly once, `owSubmitVote` call count
  unchanged (2), script load order unchanged, the byte range containing the vote widget markup
  is untouched (checksum-verified before/after), and both edited inline `<script>` blocks pass
  a Node syntax parse + brace/paren balance check.

## PHASE 2 — HOMEPAGE RESTRUCTURING — UNIT 2 (DONE, this session)
Investigated first: `history.html` uses `timeline-data.js` (separate data), `evidence.html` uses
`evidence-data.js` (separate data), `project-status.html` uses `project-status-data.js` (separate
data) — but the homepage `#timeline` section actually uses `data.js`'s `ENTRIES`, which is the
**same exact data source as `our-work.html`** (RTI/grievance/petition/letter log). So the
homepage timeline was never duplicating history/evidence/status — it was fully duplicating
`our-work.html` specifically. Fixed accordingly:

Files touched: `script.js`, `index.html`. `our-work.html`, `history.html`, `evidence.html`,
`project-status.html` and all their data files — UNCHANGED, verified untouched.
- `script.js`'s `renderTimeline()` now checks an optional global
  `window.HOMEPAGE_TIMELINE_PREVIEW_COUNT`. If unset (the case for every page except the
  homepage, including `our-work.html`), behavior is byte-for-byte identical to before — full
  list, no change. This makes the change a strict opt-in, not a shared-file risk.
- `index.html` sets `window.HOMEPAGE_TIMELINE_PREVIEW_COUNT = 6` and
  `window.HOMEPAGE_TIMELINE_MORE_LINK = "our-work.html"` in a small inline script placed
  immediately before `<script src="script.js">` (so the flag exists before renderTimeline() first
  runs), and appends a "+N · पूर्ण कालपटल पहा →" link tile to `our-work.html` when a category has
  more entries than the preview count. This also works correctly per-tab (each category tab shows
  up to 6 of its own most-recent entries + its own "more" tile) since tab-click handlers call the
  same `renderTimeline()`.
- Section 06 heading/intro copy updated to say "अलीकडील कारवाई" (recent activity) and points to
  the "आमचं काम" page for the full list, instead of implying the homepage list is complete.
- Verified post-change: all 30 voting-widget IDs still present exactly once, `owSubmitVote` count
  unchanged (2), script load order unchanged (firebase → firebase-config → opinion-content →
  opinion-widget → mail-config → campaign-extras → content → gallery-data → team-data → data →
  [inline] → script.js → [inline]), `our-work.html` confirmed to NOT set the new flag (so it's
  guaranteed unaffected), and both `script.js` and every inline `<script>` block in `index.html`
  pass a Node `new Function(...)` syntax parse.

## PHASE 2 STATUS
Homepage's three worst duplication offenders (full gallery, full team roster, full RTI/action
timeline) are now previews-with-CTA instead of full duplicates. Remaining Phase 2 candidates for
a future unit (not started, no changes made yet):
- Visual/spacing pass on the new preview "more" tiles (currently inline-styled to match existing
  `.gallery-item`/`.team-item`/`.entry` card look reasonably well, but not yet moved into
  `styles.css` as a proper reusable class — functional now, polish later, low risk either way).
- Re-check whether the "Independence Day banner" / "Kajrolkar tribute" blocks near the top of the
  homepage (above the fold, before the hero) still make sense positionally once the page is
  shorter — not evaluated yet this session.
- Homepage copy sections (About/Facts) not yet reviewed for length/overload — audit only, no
  known problem found yet.

## PHASE 2 STATUS: COMPLETE (for this pass)
Polish items closed out this session:
- Moved all "preview → full page" tile styling (gallery/team/timeline more-tiles) out of inline
  `style=""` attributes into proper reusable classes: `.gallery-more-tile`, `.team-more-tile` (in
  `gallery.css`) and `.entry-more-tile` (in `styles.css`), using the site's existing `--navy`
  design token instead of a hardcoded hex color.
- Audited the above-the-fold block (Independence Day seasonal banner, vote widget, public voters
  teaser, Kajrolkar tribute) — already link-out teasers, not full duplicated content. No change
  needed, none made.
- Audited About/Facts copy (`content.js`: aboutP1–3, fact1–5) — factual, evidence-dense, already
  concise (2–5 sentences each). Not homepage-overload material. No change needed, none made.
- Duplicate/stray files (`admin (1).html`, `admin (2).html`, `index (2).html`,
  `gallery (1).css`, `team-data (2) (1).js`) — confirmed unreferenced by any other file
  (grep-checked), left untouched per instruction, still flagged "suspected duplicates — do not
  delete yet".

## PHASE 3 — HEADER / NAVIGATION / FOOTER AUDIT (COMPLETE) + FIX (IMPLEMENTED)

### Audit findings
- **Footer**: already fully consistent across all 13 public pages — identical markup/text
  (`इचलकरंजी रेल्वे कृती समिती` / `Citizen-maintained evidence archive · अद्ययावत केले जात आहे`).
  No issue found.
- **Masthead/branding**: already fully consistent — every inner page has the same
  `<header class="masthead"><div class="wrap masthead-top">...` band. No issue found.
- **Navigation — P1 issue found**: `index.html` was the ONLY page with a real navigation menu
  (`<nav class="subnav">`, sticky, horizontally-scrollable on mobile via existing CSS). All 12
  other public pages (history, project-status, evidence, evidence-detail, our-work,
  why-ichalkaranji, officials, gallery, team, brief, kajrolkar, voters-list) had **no nav
  menu at all** — only a single contextual "← back" link (each with its own one-off CSS class:
  `.hist-back`, `.ev-back`, `.ow-back`, etc.). Once a visitor left the homepage, they were stuck
  navigating one page at a time back to `index.html` — a real dead-end problem, not just
  cosmetic.
- **Active page state**: did not exist anywhere (not even on the homepage's own subnav).
- **Mobile menu**: no hamburger exists; the subnav is a horizontal-scroll bar (`overflow-x:auto`)
  — already mobile-usable as-is, no separate mobile menu needed.
- **Broken/duplicate links**: none found in the nav — all 10 nav targets verified to exist as
  real files.
- **opinion.html — deliberately excluded from this fix**: it's a standalone, distraction-free
  vote/share landing page (own dark theme, doesn't even load `styles.css`), built for WhatsApp/
  social sharing. Adding the full site nav would work against its single-purpose conversion
  design, so it intentionally still has no nav — same as before. Documenting this so it isn't
  mistaken for a miss later.

### Fix implemented (small, mechanical, same pattern on every file)
Files touched: `styles.css` (one new rule), and these 12 pages — inserted the identical
`<nav class="subnav">` markup already used on `index.html` right after `</header>`, mechanically,
with each page's own entry marked `aria-current="page"`:
`history.html, project-status.html, evidence.html, evidence-detail.html, our-work.html,
why-ichalkaranji.html, officials.html, gallery.html, team.html, brief.html, kajrolkar.html,
voters-list.html`.
- Nav link set (same 10 links everywhere): मुख्यपान → index.html, इतिहास → history.html,
  प्रकल्प स्थिती → project-status.html, आमचं काम → our-work.html, इचलकरंजी का? →
  why-ichalkaranji.html, अधिकाऱ्यांसाठी → officials.html, कागदपत्रे → evidence.html, गॅलरी →
  gallery.html, सदस्य → team.html, मत नोंदवा → opinion.html.
- Active-page marking: each top-level page marks itself; `evidence-detail.html` marks "कागदपत्रे"
  (it's an evidence sub-page); `brief.html` marks "अधिकाऱ्यांसाठी" (reached from officials.html);
  `kajrolkar.html` and `voters-list.html` get the nav for escape/wayfinding but mark nothing
  active since they aren't top-level nav items themselves.
- New CSS rule added to `styles.css`: `nav.subnav a[aria-current="page"]` (navy color + bold +
  underline) — reuses existing `--navy` token, no new colors introduced.
- Zero changes to `index.html`'s own subnav in this unit (it already had one).

### Verification performed
- Confirmed `</header>` occurred exactly once in each of the 12 target files before editing
  (guarantees the insertion landed in exactly the right, intended spot, not somewhere by chance).
- Confirmed exactly one `<nav class="subnav">` / one `</nav>` per file after editing.
- Confirmed all 10 nav-target files exist on disk.
- Re-ran the full Voting Protection Protocol on `index.html` (all 30 IDs present exactly once,
  `owSubmitVote` count unchanged at 2) — this phase did not touch `index.html` or `opinion.html`
  at all, and this is now confirmed, not just assumed.
- Confirmed `opinion.html` still has zero nav insertions (intentionally excluded).
- Ran a `<div>`/`</div>` balance check across all touched files — all 12 newly-touched pages
  balance exactly (17/17, 16/16, etc.); `index.html` shows a 76-open/75-close imbalance, but this
  was verified to be **pre-existing in the original uploaded zip, not introduced by any change
  made in this project** (checked by diffing div counts against the untouched original archive).
  Flagged here for future attention but not fixed yet — locating and fixing a stray unclosed
  `<div>` inside a 500+ line file safely needs its own careful, isolated unit, not a rushed fix
  bundled into a navigation task.

## KNOWN OPEN ITEM CARRIED FORWARD
~~`index.html` has one unclosed `<div>` somewhere (pre-existing, not caused by this project).~~
**FIXED this session — see "P1 TASK 1" below.**

## P1 TASK 1 — UNCLOSED `<div>` IN index.html (FIXED)
Root cause found via a line-by-line open/close stack trace (not guessing): the `#facts` section
(section 03, "इचलकरंजीला रेल्वे का हवी — पाच सिद्ध तथ्ये") opened `<div class="wrap">` but was
missing its matching closing `</div>` before `</section>` — compare with the `#about` section
right above it, which has the correct `</div></div></section>` pattern. The impact: every element
after this point in the DOM (`#gallery`, `#team`, `#timeline`, footer, and the entire vote-related
markup that comes later) was nested one level deeper than the CSS expected, which is exactly the
kind of bug that can cause silent, breakpoint-specific layout glitches. Fixed by adding the one
missing `</div>`. Verified before/after:
- Full stack-trace re-run: 0 unclosed tags, 0 orphan closes, total opens (76) = total closes (76).
- All 30 voting-widget IDs still present exactly once, `owSubmitVote` count unchanged (2) — this
  fix is far above the vote widget in the DOM and doesn't touch it, confirmed by ID/count re-scan.
- All 4 inline `<script>` blocks in `index.html` still pass Node syntax parse.
- Section landmarks (`#stats #about #facts #gallery #team #timeline #footer`) each still appear
  exactly once, in the same order.
No other file touched for this fix.

## P1 TASK 2 — NAVIGATION RESPONSIVE AUDIT (DONE — audit + 2 safe fixes)
Reviewed the shared `nav.subnav` CSS and the `.masthead-top` band that sits above it on every
page (both already shared/reused, not duplicated per-page — good baseline).

Findings:
- `nav.subnav` was already a solid mobile pattern: sticky, horizontal-scroll (`overflow-x:auto`),
  `white-space:nowrap` per link — so the 10 Marathi labels (including the two longest,
  "अधिकाऱ्यांसाठी" and "प्रकल्प स्थिती") never wrap or overflow the page; they just scroll. No
  structural fix needed there — added a small mobile-only padding/font-size reduction (`@media
  max-width:480px`) so the bar feels less cramped on the smallest phones, plus
  `-webkit-overflow-scrolling: touch` for smoother iOS scroll momentum.
- `.masthead-top` (the branding + tagline band above the nav) had **no wrap protection** —
  `display:flex; justify-content:space-between` with two text spans and no `flex-wrap`. On
  narrow phones (~320–360px) the two spans ("इचलकरंजी रेल्वे कृती समिती" + tagline) are long
  enough to be tight. Added `@media max-width:480px` rule: wraps, centers, reduces gap/font-size
  slightly. Low-risk, purely additive — does not change desktop rendering at all.
- **Observation, not fixed (out of scope / not part of the new nav)**: `index.html`'s own subnav
  has 13 items (uses in-page anchors like `#stats`, `#facts`, `#footer` alongside page links)
  while the new inner-page navs have 10 items (page links only, since inner pages don't have
  those homepage sections to anchor to). This is a real inconsistency in item *count*, but
  changing `index.html`'s existing subnav wasn't asked for this session and risks interacting
  with anchor-scroll behavior — flagging for a future Phase 3.1 decision rather than changing it
  now.
- **Observation, not fixed (pre-existing, unrelated to nav)**: the petition CTA button
  (`class="lang-toggle"`, "याचिकेवर स्वाक्षरी करा", appears to be on the stray `index (2).html`
  duplicate, not on the live `index.html`) has no matching CSS rule anywhere in the repo — would
  render as unstyled default link text if it were live. Since it's not on the actual live
  `index.html`, no action taken; noting only for completeness.

Verified after both mobile CSS additions: `styles.css` brace count still balanced (82/82), no
existing rule overridden (both changes are pure additions inside new `@media` blocks or as new
declarations), voting widget untouched (this task only edited `styles.css`).

## P1 TASK 3 — FACTUAL CONSISTENCY AUDIT: data.js / evidence-data.js / project-status-data.js /
timeline-data.js (DONE — audit only, zero values changed, per instruction)

Cross-checked every date/cost/ROR/status claim across all four data files against each other and
against the OCR'd `extractedText` already embedded in `evidence-data.js` for each source document
(this is the closest available stand-in for "reading the original PDF" without a scanned-image
OCR pass). Overall finding: the data is in noticeably good shape — most claims are internally
consistent, cross-referenced correctly between files, and dates/figures match the underlying
OCR'd source text word-for-word (e.g. the 02.01.2020 revised DPR figures of ₹180.73 crore / ROR
−12.73% appear identically in `evidence-data.js`'s OCR text, `project-status-data.js`, and
`timeline-data.js`). The site's existing practice of self-flagging genuine conflicts (see below)
is good practice and was left as-is.

**One data-quality issue found — flagged, not changed:**
- **"मूळ DPR" (original DPR) claim** — appears in both `project-status-data.js` and
  `timeline-data.js` (`t-2017-dpr`): "30 नोव्हेंबर 2017 — खर्च ₹191.59 कोटी, ROR −10.11%". Both
  entries are labeled `verification: "verified"`, but **`evidenceUrl` is `null` in both**, and
  the only source cited is "प्रकल्पाच्या अधिकृत नोंदी" / "साईटच्या content.js मध्ये पूर्वीपासून
  नमूद" (the project's own prior records / the site's own earlier content) — i.e. no independent,
  traceable source document exists in the current evidence set for this specific 2017 figure.
  Per the site's own documented convention (`verified` = 🟢 "पुराव्यासह पडताळलेलं" / verified
  *with evidence*), this entry does not currently meet its own bar for that label. **Marking as
  REQUIRES VERIFICATION here rather than editing the file** — the owner should either locate the
  original 2017 DPR document (RTI, official letter, etc.) to properly back this figure with an
  `evidenceUrl`, or relabel it `pending`/`context` to match what's actually evidenced today. No
  value or label was changed in the repo.
- **Related, already self-flagged by the site (no action needed)**: `timeline-data.js`'s
  `t-2018-survey-conflict` entry already transparently marks itself `verification: "pending"` and
  documents that the MP's 22.07.2026 letter states the survey/DPR was sent in **August 2018**,
  which doesn't match either the 30.11.2017 or 02.01.2020 dates used elsewhere. This is good
  existing practice — the site is not hiding the discrepancy — confirmed correctly cross-linked
  and left untouched.
- **Minor verification nuance (not an error, just a precision note)**: `t-2017-survey` /
  "Final Location Survey — भूमिपूजन" (11 June 2017) cites the RTI reply as its source, but reading
  the OCR'd RTI text closely, that date actually appears in the *RTI applicant's own question*
  (which cites a Central Railway Twitter announcement) — the RTI reply itself declines to engage
  with that part of the question rather than independently confirming the date. The date is,
  however, independently corroborated by the separate MP Mane letter ("भूमिपूजन 11.06.2017 रोजी
  तत्कालीन रेल्वेमंत्री सुरेश प्रभू यांच्या हस्ते"), so the underlying fact does have two-document
  support even though the RTI citation alone doesn't fully carry it. No change made; noting for
  precision only.

No dates, costs, ROR/FIRR/EIRR figures, or sanction-status wording were altered anywhere in this
task — audit only, as instructed.

## TASK 4 — DUPLICATE FILES (confirmed, still NOT deleted)
Re-ran a full-repository reference search (`.html`, `.js`, `.css`, `.md`) for all 5 suspected
files — zero references anywhere except this progress file's own notes. Additionally diffed each
against its live counterpart to characterize *what* they are, not just that they're unused:
- `admin (1).html` (489 lines) and `admin (2).html` (563 lines) are both substantially shorter,
  earlier-looking versions of the live `admin.html` (1749 lines) — look like superseded drafts.
- `index (2).html` (208 lines) is a much shorter, earlier version of the live `index.html` (565
  lines) — missing SEO meta tags present in the live version, among other differences.
- `gallery (1).css` (17 lines) is a stub compared to the live `gallery.css` (47 lines).
- `team-data (2) (1).js` (4 lines) is essentially empty compared to the live `team-data.js` (78
  lines).
All five read as accidental leftover exports of earlier work-in-progress states, not alternate
live variants or decoys with unique content. This strengthens confidence they're safe to delete,
but per instruction they remain untouched this session — still flagged
"suspected duplicates — confirmed unreferenced, confirmed superseded drafts — do not delete yet,
awaiting owner's explicit go-ahead."

## NEXT RECOMMENDED TASK
All four P1 items from this session are closed out. For the next session, in rough priority
order: (a) owner decision needed on the "मूळ DPR" verification-label question above (locate a
source document or relabel — this is a judgment call for the owner, not something to auto-fix),
(b) owner decision on deleting the 5 confirmed-safe duplicate files, (c) Phase 3.1 — decide
whether to reconcile `index.html`'s 13-item subnav with the new 10-item inner-page nav pattern,
(d) resume the broader Phase 4+ mobile-first pass now that the structural (div) and factual
audits are both clean, per the instruction to hold off on larger visual redesign until this
point.

## PHASE 4 — MOBILE-FIRST AUDIT (DONE — good news: mostly already solid)
Checked all 14 public pages for: viewport meta tag presence, hardcoded fixed pixel widths that
could overflow, table responsiveness, image responsiveness, and grid/flex wrapping behavior.
Findings:
- Viewport meta tag present and correct on all 14 pages (opinion.html additionally sets
  `maximum-scale=1`, which disables pinch-zoom — technically an accessibility concern, but this
  is inside the protected vote-widget page, so left untouched without owner sign-off).
- Global `img { max-width: 100%; }` rule already exists in `styles.css` — images are safe
  site-wide.
- `why-ichalkaranji.html`'s two data tables are already wrapped in `.wi-table-wrap { overflow-x:
  auto; }` — safe on narrow screens, no fix needed.
- `.team-grid` uses `flex-wrap: wrap`, `.gallery-grid` uses CSS Grid `auto-fill, minmax(220px,
  1fr)` — both already reflow correctly on narrow viewports, including the new homepage preview
  "more" tiles added in Phase 2 (verified: at a 320px viewport with 24px side padding, ~272px
  content width, `minmax(220px,1fr)` collapses to a single column — no overflow).
- `.masthead h1` already uses `clamp(32px, 5vw, 52px)` and `.stats-grid` already uses
  `repeat(auto-fit, minmax(150px, 1fr))` — both properly fluid, no fix needed.
Conclusion: the two additive CSS fixes made in the prior session (masthead-top wrap protection +
subnav mobile padding) were in fact the only real mobile gaps in the current design system. No
further Phase 4 fixes made this session — audited and confirmed clean rather than fixed, since
nothing broken was found.

## PHASE 3.1 — NAV ITEM-COUNT QUESTION (RESOLVED — no fix needed, was flagged in error)
Re-examined `index.html`'s own subnav (13 items: 6 same-page anchors — `#stats #about #facts
#gallery #team #timeline` — + 6 cross-page links + `#footer`) against the new 10-item inner-page
nav (page links only). On closer inspection this is not an inconsistency needing reconciliation:
the homepage nav correctly points to sections that physically exist on the homepage (including
the trimmed gallery/team/timeline previews from Phase 2), while inner pages correctly need real
page links since those sections don't exist there. Different content warrants different nav
items — this is contextually correct design, not a defect. Retracting the earlier "flagged for
Phase 3.1" note; no change made or needed.

## PHASE 13 — ACCESSIBILITY QUICK AUDIT (DONE — 2 small fixes made)
Checked alt text coverage, heading hierarchy (one-H1-per-page rule), and keyboard focus states
across all 14 public pages.
- **Fixed**: `evidence-detail.html` was rendering each evidence document's image via JS
  (`<img src="${url}">`) with no `alt` attribute at all. Now uses the evidence item's own title
  as `alt` text (`d.title`, falling back to "मूळ कागदपत्र" if untitled), with basic quote-escaping.
  Verified: the surrounding inline script still passes a Node syntax parse.
- **Fixed (vote-widget-adjacent, extra caution applied)**: `index.html` had two `<h1>` tags — the
  homepage's own hero title (`c-heroTitle`, correct) and, separately, the vote widget's own
  heading (`id="opHeroTitle"`), which is one of the 30 protected voting-widget IDs. Before
  touching it: confirmed via `opinion-widget.js` (`document.getElementById('opHeroTitle')
  .textContent = ...`) that the widget's JS only ever accesses this element by ID and only ever
  sets `.textContent` — the tag name itself carries no functional meaning to the script. Changed
  `<h1 id="opHeroTitle">` to `<h2 id="opHeroTitle">` (ID, all other attributes, position, and
  content byte-for-byte unchanged) — a pure semantic/accessibility fix, not a logic change. Ran
  the full Voting Protection Protocol immediately after: all 30 IDs present exactly once,
  `owSubmitVote` count unchanged (2), `<div>` balance still 76/76, all 4 inline scripts still
  parse. Every public page now has exactly one `<h1>`.
- **Found, not fixed (low-severity, documented only)**: `evidence.html` goes `<h1>` → `<h3>`
  (skipping `<h2>`) — the `<h3>` is the repeated per-card title inside the dynamically-rendered
  evidence list, which is a common and low-risk pattern (not a real navigation-order problem for
  screen readers in practice, since each `<h3>` is a distinct, meaningfully-labelled item), but
  technically not strict heading order. Not fixed this session — a real fix would mean either
  demoting to a consistent scheme with an added `<h2>` section wrapper, which is a small design
  decision better bundled with other content-page polish rather than done in isolation.
- Keyboard focus: `a:focus-visible, button:focus-visible, .tab:focus-visible` rule already exists
  in `styles.css` — baseline keyboard accessibility already in place, no gap found.

## FILES TOUCHED THIS SESSION (for reference — deliver only these, per owner's standing
instruction to receive changed files only, not a full-repo export)
`index.html` (h1→h2 fix on vote-widget heading only — no other change this session),
`evidence-detail.html` (added alt text to dynamically-rendered evidence images).

## PHASE 14 — SEO / SOCIAL-SHARING AUDIT (DONE) + FIXES (IMPLEMENTED, all 14 public pages)

### Audit findings
- **Titles**: already good on every page — unique, descriptive, present. No issue.
- **Meta descriptions**: missing on 2 pages — `evidence-detail.html`, `brief.html`.
- **Canonical tags**: missing on 1 page — `evidence-detail.html`.
- **Open Graph (og:title/og:description)**: missing entirely on 5 pages — `evidence-detail.html,
  gallery.html, team.html, brief.html, voters-list.html`. Present but missing `og:url` on 7 more
  (history, project-status, evidence, our-work, why-ichalkaranji, officials, kajrolkar).
- **og:image — missing on ALL 14 pages, including index.html.** This is the biggest real-world
  finding: since this campaign relies heavily on WhatsApp/social sharing (the vote widget has
  built-in share buttons), every shared link was showing up with no preview image at all.
- **twitter:card** — present only on `index.html` (and set to the weaker `"summary"`, not
  `"summary_large_image"`), absent everywhere else.
- **Favicon — `favicon.svg` exists in the repo but was not linked (`<link rel="icon">`) on ANY of
  the 14 pages.** Real, silent bug: browser tabs have been showing a generic/blank icon this
  whole time despite the asset already existing.

### Fix implemented (mechanical, mostly additive, no page's body touched)
All 14 pages: added `<link rel="icon" type="image/svg+xml" href="favicon.svg">`; added
`og:image` + `twitter:image` pointing to the existing
`ichalkaranji-railway-kruti-samiti-banner.jpg.jpeg` (720×594 — usable but not the ideal 1200×630
OG ratio, flagging in case the owner wants a purpose-cropped banner later); added `og:type`
(`website`); added/upgraded `twitter:card` to `summary_large_image` everywhere (including
upgrading `index.html`'s prior `"summary"`).
Additionally, only where genuinely missing (existing values were never overwritten): meta
description + canonical on `evidence-detail.html`; meta description on `brief.html`; og:title/
og:description on `evidence-detail.html, gallery.html, team.html, brief.html, voters-list.html`;
og:url on the 7 pages that had og:title/og:description but no og:url.
`evidence-detail.html` already carries `<meta name="robots" content="noindex, follow">` (sensible
for a query-string-keyed detail page) — left as-is; adding OG/canonical there still helps social
sharing of a specific document link even though it's deliberately excluded from search indexing.

### Bonus fix found during the per-page h1 sanity check (not originally in scope, but a genuine,
safe, isolated finding)
`brief.html` had **zero real headings anywhere** — its title and 6 section headings were all
plain `<div class="br-title">` / `<div class="br-h2">` rather than `<h1>`/`<h2>`. Confirmed both
CSS rules are class-only selectors (no tag-based styling depends on them being `<div>`s), so
converted the main title to `<h1 class="br-title">` and all 6 section headers to
`<h2 class="br-h2">`. Verified: div count in `brief.html` balances (20/20), the `onclick="window.
print()"` button untouched, page has zero inline `<script>` blocks to worry about.

### Verification performed (full protocol, since `index.html` was among the touched files)
- All 30 voting-widget IDs present exactly once in `index.html`, `owSubmitVote` count unchanged
  (2) — this task only added `<head>` meta tags, nothing in the `<body>` of `index.html` was
  touched.
- `<div>` balance in `index.html` still 76/76 (unaffected — head-only changes).
- Every one of the 14 public pages now has exactly one `<h1>` (was 2 on `index.html` from the
  earlier session, 0 on `brief.html` found and fixed this session — both now 1).
- Every one of the 14 pages now has exactly one `og:image` tag (previously 0 anywhere).
- All inline `<script>` blocks across all 14 pages still pass a Node syntax parse.
- `</head>` occurred exactly once per file before editing (confirmed the insertion point was
  unambiguous everywhere).

## FILES TOUCHED THIS SESSION (SEO pass) — supersedes the "FILES TOUCHED" note above, which was
from the previous session
`index.html`, `history.html`, `project-status.html`, `evidence.html`, `evidence-detail.html`,
`our-work.html`, `why-ichalkaranji.html`, `officials.html`, `gallery.html`, `team.html`,
`opinion.html`, `brief.html` (head meta tags + the 6 heading-tag fixes), `kajrolkar.html`,
`voters-list.html`. All 14 public pages — deliver all 14 for this session, per the standing
instruction to send only what changed.

## FEATURE REMOVAL — "अधिकाऱ्यांना कळवणारा Email" (COMPLETE, owner-requested)
Owner reported the admin panel's Email tab was unusable for them and asked to remove the entire
feature — both the admin editing tab and any public-facing button.

**Investigation before removing anything**: read `campaign-extras.js`'s own header comment, which
revealed the public "अधिकाऱ्यांना थेट कळवा" button had *already* been removed from the public
pages by the original developer at some earlier point (rationale left in the comment: emailing
1,500+ existing respondents to come back and re-send wasn't practical) — the feature had already
been narrowed to an admin-only personal tool. So there was no live public button to remove;
`mail-config.js` was being loaded on `index.html`/`opinion.html` but nothing there ever read the
`MAIL_CONFIG` variable it defines — confirmed via a full-repo grep before touching anything.

**Removed, this session:**
- `admin.html`: the "📧 Email" nav link, its entire `<h2 id="sec-mail">` section (all form
  fields), and the corresponding JS block (`MAIL_TEXT_KEYS`, `MAIL_DEFAULTS`, `loadMailBtn`/
  `saveMailBtn` click handlers).
- `index.html` and `opinion.html`: the now-fully-unused `<script src="mail-config.js">` tag (was
  loading a file nothing on those pages ever read).
- `mail-config.js`: deleted from the repo entirely (its only remaining consumer, the admin tab,
  no longer exists).
- `campaign-extras.js`: updated two stale comments that referenced the old mail-button/
  mail-config.js relationship, since that context no longer applies. No functional code in this
  file changed — the progress gauge, results countdown, and share counter are untouched.

**Verified after removal:**
- Full Voting Protection Protocol on both `index.html` and `opinion.html`: all shared IDs present
  exactly once in each (opinion.html's one intentional difference — it never had a `qrShareBtn`
  element — confirmed pre-existing by diffing against the original uploaded zip, not something
  broken this session).
- `owSubmitVote` count unchanged (2) in both files.
- Script load order in both files unaffected apart from the one deleted line — Firebase →
  firebase-config → opinion-content → opinion-widget → campaign-extras (→ content/data files on
  index.html) is intact.
- `index.html` `<div>` balance still 76/76.
- `admin.html` `<div>` balance now 84/84 (was 84/84 including the removed section's own balanced
  divs — the whole section was removed as one balanced unit) and its single inline `<script>`
  block still passes a Node syntax parse (59,569 chars, no errors).
- Grepped the entire repo for `mail-config`, `MAIL_CONFIG`, `MAIL_TEXT_KEYS`, `MAIL_DEFAULTS`,
  `loadMailBtn`, `saveMailBtn`, `sec-mail`, and all `m-*` field IDs — zero remaining references
  anywhere.

## FILES TOUCHED THIS SESSION
`admin.html`, `index.html`, `opinion.html`, `campaign-extras.js` (edited); `mail-config.js`
(deleted). Deliver these 4 changed files (not the deleted one) per the standing instruction to
send only what changed.

## ADMIN PANEL — QUICK USABILITY IMPROVEMENT (DONE, same session)
Owner also asked generally what else could be improved on the admin panel. Made one small, safe,
unambiguous fix directly (not a design judgment call, so no owner sign-off needed): the GitHub
Token field was `type="password"`, fully invisible with no way to check you'd pasted it correctly
— a plausible real source of the "login not working" friction. Added a 👁️/🙈 show/hide toggle
button next to the field. Verified: admin.html's single inline `<script>` still parses (Node),
`<div>` balance now 85/85 (was 84/84 — the toggle button's own wrapper div is balanced). No other
admin behavior touched.

## FURTHER ADMIN-PANEL IMPROVEMENT IDEAS (not yet done — for owner to prioritize)
- No visible feedback for an expired/invalid GitHub token until a save/load actually fails —
  could add a one-time "test token" check.
- No "unsaved changes" warning if the owner navigates between tabs or closes the page mid-edit.
- The 9 tabs are all on one long scrolling page (with a sticky quick-nav) — fine on desktop, but
  worth a dedicated mobile pass since admin work is often done from a phone.
None of these were requested explicitly — listed only as options for a future session.

## NEXT RECOMMENDED TASK
Still open, awaiting owner input: (a) the "मूळ DPR" verification-label question, (b) go-ahead to
delete the 5 confirmed-safe duplicate files (unrelated to the just-removed email feature — still
`admin (1).html`, `admin (2).html`, `index (2).html`, `gallery (1).css`,
`team-data (2) (1).js`). Otherwise, pick one of the admin-panel improvement ideas above, or
resume the broader Phase 12 visual-consistency pass.

## BASELINE FACTS (do not re-derive these — just verify if repo changes)

**Pages (top-level .html):** index, history, project-status, evidence, evidence-detail,
our-work, gallery, officials, opinion, opinion_edit, brief, kajrolkar (embedded on index, not
a separate page — see below), admin, admin_edit, team, why-ichalkaranji, voters-list.
Duplicate uploads present in the zip that must NOT both ship: `admin (1).html`, `admin (2).html`,
`index (2).html`, `gallery (1).css`, `team-data (2) (1).js` — these look like accidental
duplicate exports, not intentional variants. Confirm with repo owner before deleting.

**Data files:** data.js (626 lines — homepage/committee copy, stats, facts, timeline tab config),
evidence-data.js, project-status-data.js, gallery-data.js, team-data.js, timeline-data.js,
opinion-content.js, campaign-extras.js.

**Core scripts:** script.js (145 lines — homepage rendering: stats, gallery grid, team grid,
timeline tabs/track, lightbox), opinion-widget.js (shared vote widget logic, used on BOTH
index.html top banner and opinion.html), firebase-config.js (single shared Firebase project
`htk-ich`, Firestore-backed), ocr-helper.js, mail-config.js.

## P0 — VOTING SYSTEM: PROTECTED ELEMENTS (locked, do not rename/change)

- Firebase project: `htk-ich` (Firestore). Config lives ONLY in `firebase-config.js`, consumed by
  index.html, opinion.html, admin.html.
- Voter identity: `localStorage.htk_ich_voted` (bool) + `localStorage.htk_ich_voter_id` (uuid,
  used as the Firestore doc ID via `.doc(id).set()` — NOT `.add()` — this is the duplicate-vote
  fix; do not change back to `.add()`).
- Also has a canvas/WebGL+screen/timezone device fingerprint as a secondary anti-duplicate signal
  (no external library, wrapped in try/catch).
- Markup contract: the whole widget lives under `id="opinion-widget"`, with fixed child IDs:
  `opEyebrow, opHeroTitle, opHeroSub, opPopNum, opPopText, opYesLabel, opNoLabel, opVoteHint,
  opDetailTitle, opDetailNote, fname, fmobile, farea, submitErr, submitBtn, skipBtn, opThanksTitle,
  opThanksText, opShareLine, waShare, fbShare, twShare, moreShare, qrShareBtn, opFooter, voteStep,
  detailPanel, thanksPanel, board, yesNum, noNum, totalNum`.
- Submit handler: `onclick="owSubmitVote()"` / `owSubmitVote(true)` for skip — function name is
  load-bearing, defined in opinion-widget.js.
- Load order requirement (documented in opinion-widget.js header): firebase SDK →
  firebase-config.js → opinion-content.js (optional) → opinion-widget.js. Any redesign that
  reorders `<script>` tags on index.html or opinion.html must preserve this order.
- Content (labels/headings) is swappable via `OPINION_CONTENT` in opinion-content.js — safe to
  edit copy there; do NOT edit label strings by hand inside opinion-widget.js.

## P1 — TRUST / FACTUAL FLAGS
- Not yet reviewed line-by-line against source PDFs this session. Before rewriting any status/
  history/evidence copy, cross-check claims in data.js / evidence-data.js /
  project-status-data.js against the actual PDFs in the repo root (RTI replies, CPGRAMS, MP
  letters, 1956 Lok Sabha reference, etc.) rather than trusting the existing summary text
  blindly — flagged for Phase 6/Phase 7 work, not done yet.

## P2/P3 — INFORMATION ARCHITECTURE / HOMEPAGE OVERLOAD (confirmed real)
index.html currently renders, in one continuous scroll:
1. Independence Day banner (seasonal, conditional)
2. Full opinion/vote widget (hero + vote + detail form + thanks/share panel)
3. Public voters list section
4. Kajrolkar tribute block
5. Hero (title/lede/status chip)
6. Stats grid
7. About/"मागणी काय आहे" + callout
8. Five facts section
9. **Full gallery grid** (duplicates gallery.html)
10. **Full team grid** (duplicates team.html)
11. **Full tabbed timeline** covering history + project-status + our-work + why-ichalkaranji +
    officials + evidence + gallery + team categories all in one track
12. Footer

This is the literal "everything dumped on one page" problem the owner described. Dedicated pages
(gallery.html, team.html, history.html, project-status.html, our-work.html, why-ichalkaranji.html,
evidence.html, officials.html) already exist and appear to duplicate rather than receive traffic
from index.html. Recommended direction for Phase 1/2 (not yet implemented): keep vote widget +
hero + stats + short teaser sections on homepage; trim gallery/team grids on homepage to a small
preview (e.g. 4-6 items) that links out to gallery.html/team.html; keep the timeline but scope
it to a short "recent milestones" teaser linking to history.html for the full record, OR keep
full timeline but remove the duplicated gallery/team blocks since those already have dedicated
pages. Final call deferred to Phase 1 sitemap work — flagging here, not deciding unilaterally
since it affects a lot of content placement.

## SECURITY NOTE (not a P0 bug, just documented)
Firebase `apiKey` in firebase-config.js is committed in plain text. This is normal/expected for
Firebase web apps (client keys are not secrets by design) — real protection comes from Firestore
security rules, which are not visible in this static export. Flagged for Phase 16 (Security) to
confirm rules are properly locked down server-side; not a code change needed here.

## KNOWN DUPLICATE/STRAY FILES IN THIS EXPORT (need owner confirmation before removal)
`admin (1).html`, `admin (2).html`, `index (2).html`, `gallery (1).css`, `team-data (2) (1).js`
— still not deleted, still awaiting owner go-ahead (see repeated notes above; unchanged since
first flagged in Phase 0).

## ADMIN PANEL — "📁 सरकारी कागदपत्रे व पुरावे" TAB IMPROVEMENTS (DONE, this session)
Owner reported this specific admin tab was confusing, and asked specifically for: selecting
multiple files at once should file them in automatically, sorted by date. Two real, related
problems found and fixed — both in `admin.html` only, nothing else touched:

1. **No multi-file upload existed at all.** The file input (`#ev-file`) only ever accepted one
   file, so every document had to be uploaded and hand-described one at a time. Added a genuinely
   new, separate "➕ एकाच वेळी अनेक कागदपत्रे (Bulk Upload)" panel above the existing single-item
   form (which is untouched and still there for detailed one-at-a-time edits). The new panel:
   - Accepts multiple files at once (`<input type="file" id="ev-bulk-files" multiple>`).
   - For each selected file, sequentially: uploads it to the repo, runs the existing browser-side
     OCR (`EvidenceOCR.extract`, same helper the single-item form already uses), then reuses the
     existing `detectCategory`/`detectDate`/`detectReferenceNumber` keyword-based suggestions to
     pre-fill category/date/reference number. Title is guessed from the filename as a starting
     point.
   - **Every bulk-uploaded item is saved with `status: "draft"`, never `"published"`.** This was
     a deliberate safety choice, not an oversight: the site's own existing convention (see the
     tab's own instructions) is that the human-written summary is what's shown as
     "Admin-Reviewed" — auto-detected category/date are keyword guesses, not verified facts, so
     none of this should go live without the owner opening each draft and checking it, exactly
     like the existing single-item workflow already requires. This means "select multiple files"
     now does the tedious upload+OCR+guess-metadata work automatically, but publishing each one
     is still a deliberate human step — consistent with the "do not invent facts" principle
     applied everywhere else in this project.
   - If OCR fails on one particular file (e.g. a bad scan), that file still gets uploaded and
     added as an empty-text draft rather than aborting the whole batch — the owner can re-run OCR
     on it individually later from the normal single-item edit form.
   - All new items are saved to `evidence-data.js` in a single batched write at the end of the
     batch (reusing the existing `saveEvidenceDocs()` function, including its existing sha-
     refresh-and-retry logic for GitHub's 409 conflicts) — not one commit per file.

2. **The list was sorted by "last edited in admin" (`updatedAt`), not by the document's own real
   date** — this was very likely the actual root of "confusing, doesn't end up in the right
   place": editing an old 1965 letter today would jump it to the top of the list, ahead of a
   2026 letter untouched since last week. Added a new date-parser (`evParseDateForSort`) that
   understands this site's actual date formats — `02/07/2026`, `02 July 2026`, and Marathi
   month names/Devanagari digits (`०२ जुलै २०२६`) — and changed the list's sort to use the
   document's own `date` field through this parser, most-recent-first. A date that can't be
   parsed sorts to the bottom rather than silently breaking the list. This is exactly the
   "automatically land in their proper place, by date" behavior the owner asked for.

**Verification performed:** admin.html's single inline `<script>` block still parses cleanly
(Node), `<div>` balance now 89/89 and `<fieldset>` balance 5/5 (both include the new bulk panel's
own balanced markup), `#ev-file` (single-item, untouched) and `#ev-bulk-files` (new) confirmed to
be two distinct, non-conflicting IDs, and `ocr-helper.js` (which defines `EvidenceOCR`) was
already loaded on this page before this script block, so no new script tag was needed. This
session did not touch `index.html`, `opinion.html`, or any other public page — voting is
unaffected by definition, not just by re-verification, since `admin.html` shares no markup or ID
namespace with the vote widget.

## FILES TOUCHED THIS SESSION
`admin.html` only.

## BULK UPLOAD — FOLLOW-UP FIX (same day, owner reported via screenshot)
After a successful 19-file bulk upload, the owner reported the page "only shows this much" —
the success message, then straight to the single-item "एक कागदपत्र / Edit" form, with no visible
list of the 19 new drafts. Root cause: `#evidenceList` (the actual results list) sits near the
top of the tab, right under the original "कागदपत्रे लोड करा" button — well *above* the Bulk
Upload panel in the page. The list WAS being correctly refreshed after the bulk save, but it
rendered off-screen above the owner's scroll position (right where they'd just clicked "सर्व
Draft म्हणून सेव्ह करा"), and the success message's own wording ("खाली यादीत दिसतील" — "will
appear in the list below") was actively wrong, pointing the opposite direction from where the
list actually is. Fixed both: corrected the message to say "वरच्या यादीत" (in the list above),
and added an automatic smooth-scroll to `#evidenceList` right after the bulk save completes, so
the owner is taken straight to their new drafts without needing to scroll or hunt for them.
Verified: admin.html's script still parses, `<div>` balance still 89/89 — this was a small,
isolated change to the last few lines of the bulk-upload completion handler only.

## NEXT RECOMMENDED TASK
Still open, awaiting owner input: (a) the "मूळ DPR" verification-label question, (b) go-ahead to
delete the 5 confirmed-safe duplicate files. Otherwise: the owner may want to try the new bulk
evidence upload and report back on the auto-detected category/date accuracy before this pattern
(bulk-select → auto-process → draft-only) gets extended to the Gallery/Timeline tabs, which have
a similar one-at-a-time feel today.

## OCR — FULLY REMOVED FROM THE SITE (owner-requested, same day)
Owner reported OCR "not working properly" and, when asked to confirm scope, explicitly chose full
removal — both the single-item Edit form's OCR buttons and the Bulk Upload flow's automatic OCR —
accepting the known trade-off that new evidence added from now on won't get automatic full-text
search content (existing published documents' `extractedText` is untouched and still searchable).

**Removed from `admin.html`:**
- Single-item form: the "🔍 OCR चालवा" / "🧹 OCR मजकूर पुसा" / "📋 Copy मूळ मजकूर" buttons and the
  OCR-progress element. The `#ev-extractedText` textarea itself was **kept**, but repurposed into
  a plain manual field — the owner (or anyone helping) can still paste text in by hand if they
  want a document to be searchable; it's just no longer auto-populated. Relabelled it "पूर्ण
  मजकूर (ऐच्छिक — शोधासाठी)" with a hint explaining it's optional and manual now.
- The "🪄 Auto Detect (सुचवा)" button and its hint — this only ever worked off OCR text, so it had
  no purpose left. Category is now always chosen manually from the dropdown (still defaults to
  RTI); date/reference-number are always typed in by hand.
- Bulk Upload: removed the per-file OCR call and the category/date/reference-number auto-guessing
  that depended on it. Bulk upload now does exactly what it says — uploads each file and creates
  a bare `status: "draft"` entry with just a filename-derived title, leaving category ("Other
  Evidence" default), date, authority, reference number, tags, and summary all blank for the
  owner to fill in per-item during review. **This does not undo the earlier "sort list by actual
  document date" fix** — that fix reads whatever is in each document's `date` field regardless of
  how it got there, so it will work correctly once the owner types the real date in during review.
- `ocr-helper.js` (the `EvidenceOCR` helper — text extraction, category/date/reference-number
  guessing) — deleted from the repo entirely. Confirmed via a full-repo grep that nothing else
  referenced it (`evidence.html`'s search only reads the `extractedText` *data field* already
  stored in `evidence-data.js`, not the helper script — that keeps working for existing entries).
- Updated three hint/instruction paragraphs on the tab that referenced OCR, so the UI text
  matches what the tab actually does now.

**Verified after removal:** admin.html's single inline `<script>` block still parses (Node),
`<div>` balance now 86/86, `<fieldset>` balance still 5/5, grepped for every OCR-related element
ID (`ev-runOcrBtn`, `ev-clearOcrBtn`, `ev-copyOcrBtn`, `ev-ocrProgress`, `ev-autoDetectBtn`,
`_evLastPages`) and confirmed zero dangling references anywhere, and confirmed `EvidenceOCR`/
`ocr-helper` have zero remaining references in any file. `#ev-extractedText` itself is still
correctly wired into save/edit/version-history exactly as before — only how it gets filled in
changed (manual instead of automatic).

## FILES TOUCHED THIS SESSION
`admin.html` (edited); `ocr-helper.js` (deleted).

## NEXT RECOMMENDED TASK
Still open, awaiting owner input: (a) the "मूळ DPR" verification-label question, (b) go-ahead to
delete the 5 confirmed-safe duplicate files. Otherwise: try the simplified bulk-upload-without-OCR
flow on a real batch and confirm the manual review step (typing title/date/category per draft)
feels reasonable before extending the same bulk pattern to Gallery/Timeline tabs.
