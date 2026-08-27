# Ichalkaranji Railway Website — Redesign Progress

Last updated: 2026-08-27 (Session 1)
Source snapshot audited: `htk-ich-main` zip export (no `.git` history included in this export)

## CURRENT PHASE
Phase 0 — Discovery + Baseline Audit: COMPLETE
Phase 1 — Information Architecture / Sitemap: COMPLETE (decision below)
Phase 2 — Homepage restructuring: IN PROGRESS (unit 1 of N complete — see below)

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

## NEXT RECOMMENDED TASK
Either (a) continue Phase 2 with the polish items above, or (b) move to Phase 3 (global
header/navigation/footer consistency across all pages — not yet audited this session), or (c)
begin the P1 fact-checking pass on data.js/evidence-data.js/project-status-data.js copy against
the source PDFs (flagged in Phase 0, still outstanding). Recommend (b) next since navigation
consistency is cheap to verify and affects every other page.

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

## NEXT RECOMMENDED TASK
Phase 1: finalize sitemap/IA decision for homepage vs dedicated pages (the P2/P3 item above),
then implement Phase 2 homepage restructuring as a small, verifiable diff that leaves the vote
widget markup/IDs/script order completely untouched.

## OPEN QUESTIONS FOR OWNER
1. Confirm the 5 duplicate/stray files above are accidental exports and safe to ignore/delete.
2. How should updated files be delivered each session (see chat) — no git push access is
   available in this environment.
