# CLAUDE_PROGRESS.md — Ichalkaranji Railway Evidence & Accountability Portal

Last updated: 2026-09-22 (Session D — Phase 4 Unit 1)
Source: user-uploaded ZIP (`htk-ich-main.zip`), which reflects Phase 0–3 only (no Phase 4
changes were present — the earlier Phase-4 delivery apparently wasn't merged into this working
copy). Per explicit instruction, this and all future sessions work from the uploaded ZIP as the
authoritative master copy — do not pull/clone from GitHub unless the user says otherwise.

## RELATIONSHIP TO PRIOR WORK
`WEBSITE_REDESIGN_PROGRESS.md` (older, narrower master prompt — homepage de-duplication,
Phases 0–3) stays untouched as historical record; it is not superseded, its work is a completed
prerequisite. This file tracks the new, larger Master Prompt v2 scope only.

## PROJECT STATUS
PHASE 0 — Full codebase audit: COMPLETE (Session A)
PHASE 1 — Architecture cleanup and safety mapping: COMPLETE (Session A/B — script.js and
  mail-config.js confirmed to have zero voting references; campaign-extras.js confirmed to
  contain only reassurance comments, no actual vote logic; final protected-file list locked,
  see below)
PHASE 2 — Visual/IA redesign: DONE for this pass (accessibility + design-token consolidation
  unit — see PHASE 2 UNIT 1 below). Further Phase 2 units possible later (see "Deferred").
PHASE 3 — Evidence ID architecture: DONE for this pass (see PHASE 3 UNIT 1 below).
PHASE 4 — Official Decision Chain: DONE for this pass (see PHASE 4 UNIT 1 below).
PHASE 5–14: NOT STARTED

## FINAL PROTECTED FILE LIST (locked, do not modify without explicit user sign-off)
`opinion.html`, `opinion-widget.js`, `opinion-widget.css`, `opinion-content.js`,
`firebase-config.js`, `voters-list.html`, the voting-results tab inside `admin.html`, and the
embedded vote-widget block inside `index.html` (checksum: `owSubmitVote` must appear exactly
**2** times in index.html; script load order must stay
firebase→firebase-config→opinion-content→opinion-widget→campaign-extras→content→gallery-data→
team-data→data→[inline]→script.js→[inline]).
`admin_edit.html` / `opinion_edit.html` — confirmed dead code (zero inbound references) across
multiple sessions now; still not deleted (needs the user's own GitHub action, not a file
delivery) and left untouched again this session out of caution.

## PHASE 2 UNIT 1 (this session) — accessibility + design-token consolidation
Files touched (13 total): `styles.css`, `index.html`, `history.html`, `evidence.html`,
`evidence-detail.html`, `project-status.html`, `our-work.html`, `why-ichalkaranji.html`,
`officials.html`, `gallery.html`, `team.html`, `brief.html`, `kajrolkar.html`.

Changes:
1. Added a `.skip-link` (skip-to-main-content) to every page above, hidden off-screen until
   keyboard-focused — a real accessibility gap (none existed before). Deliberately NOT added to
   `opinion.html`, `voters-list.html`, or any admin/edit file — those stay fully untouched.
2. Added `id="main"` to each page's existing content wrapper (`<main>` on index.html;
   `.hist-page`, `.ev-page`, `.ps-page`, `.ow-page`, `.wi-page`, `.of-page`, `.gp-page`,
   `.tp-page`, `.br-page`, `.kt-page` on the rest) as the skip-link's target — no new wrapper
   elements introduced, just an `id` attribute on what was already there.
3. Consolidated 3 hardcoded hex values repeated across index.html's inline `<style>` block
   (`#0B1F2E`, `#D4AF37`, `#F3D27A` — used by the public-voters-list card and the Kajrolkar
   tribute card) into new tokens in `styles.css`'s `:root`: `--navy-deep`, `--gold-accent`,
   `--gold-light`. Purely a maintainability change — same computed colors, same visual output.
   One-off flag colors (`#FF9933`/`#138808`/`#0B3D91`, Independence Day banner) intentionally
   left as-is — single-use, not worth a token.

## VERIFICATION DONE THIS SESSION (all passed)
- `owSubmitVote` count in `index.html`: 2 (unchanged from baseline).
- `opinion.html`, `opinion-widget.js`, `opinion-widget.css`, `opinion-content.js`,
  `firebase-config.js`, `voters-list.html`, `admin.html` — byte-diffed against the source ZIP:
  **identical, zero bytes changed**.
- Script load order in `index.html`: unchanged.
- All 12 modified `.html` files: parsed cleanly with Python's `html.parser` (no structural
  errors introduced).
- Inline `<script>` blocks in `index.html`: brace-balance check passed on all 4 blocks.
- `diff -rq` of the full working copy against the source ZIP: exactly the 13 intended files
  differ, nothing else — confirmed no incidental/accidental file touches.
- Spot-checked full line-level diff on `gallery.html`: exactly the 2 intended lines added/changed
  (skip-link + `id="main"`), nothing else.

## PHASE 3 UNIT 1 (this session) — Evidence ID scheme
Files touched (4): `evidence-data.js`, `evidence.css`, `evidence.html`, `evidence-detail.html`.

What was done:
1. Added a formal public-facing Evidence ID (`IR-EV-YYYY-TYPE-NNN`) and a source-priority
   Level (A/B/C/D, per the master prompt's own scheme) as two NEW additive fields —
   `evidenceId` and `sourceLevel` — on evidence-data.js entries. **The existing internal `id`
   field (used as the URL lookup key by evidence-detail.html, e.g.
   `evidence-detail.html?id=ev-1956-loksabha`) was NOT touched, renamed, or renumbered.**
2. Scope: only the **7 currently-published** entries got IDs assigned. The other 19 entries in
   the file are `status:"draft"` — mostly untitled/undated WhatsApp image uploads the admin
   hasn't reviewed or written summaries for yet. Assigning a formal evidence ID to an unreviewed,
   incomplete record would misrepresent it as vetted evidence, so those were deliberately left
   alone (no `evidenceId` field at all — not even a placeholder).
3. IDs assigned:
   - `ev-1787383568850` (RTI reply, 12.08.2026) → `IR-EV-2026-RTI-001`, Level A
   - `ev-1956-loksabha` (Lok Sabha Q.1205, 19.12.1956) → `IR-EV-1956-LS-001`, Level A
   - `ev-1929-story-of-ichalkaranji` (H. George Franks book, 1929) → `IR-EV-1929-HIST-001`, Level C
   - `ev-2015-karad-belgaum-proposal` (MLA/municipality letters, 2015-2016) → `IR-EV-2015-LTR-001`, Level B
   - `ev-2026-mp-mane-letter` (MP Mane's letter, 22.07.2026) → `IR-EV-2026-LTR-001`, Level B
   - `ev-1965-tarun-bharat` (newspaper clipping, 1965) → `IR-EV-1965-MEDIA-001`, Level C
   - `ev-1787979873043` ("Sankeshwar Railway Action Committee" photo, 20/11/2015) →
     `IR-EV-2015-DOC-001`, Level C — this one also got a `verificationNote` field flagging that
     its `authority`/`summary` fields are blank in the source data (it's marked "published" but
     looks unreviewed) — the note says this in Marathi and recommends admin review; the ID is
     provisional pending that review.
4. Type-code taxonomy used (documented here so future sessions stay consistent): `RTI`
   (RTI application/reply), `LS` (Lok Sabha/Parliamentary), `HIST` (historical book/secondary
   source), `LTR` (letter/correspondence — public representation), `MEDIA` (newspaper/press
   clipping), `DOC` (photographed/scanned document of unclear formal type, used when metadata is
   too thin to classify more precisely). Sequence number resets per YYYY-TYPE combination, not
   globally — e.g. a second 2026 RTI reply would be `IR-EV-2026-RTI-002`.
5. Frontend: added the Evidence ID (monospace, outlined badge) and source-Level badge (color-
   coded by level: green=A, brass/gold=B, grey=C, red=D) to both the evidence grid cards
   (`evidence.html`) and the evidence detail page header (`evidence-detail.html`), shown only
   when the field is present (so the 19 unassigned drafts render exactly as before — no visual
   change for them). The `verificationNote` field, if present, renders as a small red warning
   line on the detail page.
6. No factual content, dates, authorities, or summaries were changed. No entries were deleted,
   reordered, or renumbered.

## VERIFICATION DONE THIS SESSION (Phase 3, all passed)
- `owSubmitVote` count in `index.html`: still 2.
- All 7 protected voting files confirmed byte-identical to the source ZIP (unchanged).
- `evidence-data.js` re-parsed successfully as JSON after edits (26 total entries; exactly 7 now
  carry `evidenceId`/`sourceLevel`, the other 19 unchanged); braces/brackets balanced across the
  whole file.
- Confirmed the edit only touched the top-level `id` line for each targeted entry, NOT the
  nested `previousVersions[].snapshot.id` field that shares the same string (`ev-1787979873043`
  appears twice in the file — once as the live entry, once inside its own version-history
  snapshot; only the live entry was touched).
- `evidence.html` and `evidence-detail.html` re-parsed cleanly with Python's `html.parser`;
  `<div>` open/close tag counts balanced in both files after the template-literal edits.
- `diff -rq` against the source ZIP confirms only 4 files differ from the Phase-2 baseline this
  session: `evidence-data.js`, `evidence.css`, `evidence.html`, `evidence-detail.html`.

## PHASE 4 UNIT 1 (this session, 22 Sep 2026) — Official Decision Chain
File touched (1): `project-status.html` only.

What was done:
1. Added a vertical connected-node "अधिकृत निर्णय साखळी" (Official Decision Chain) component
   to `project-status.html`, placed between the existing status grid and the disclaimer.
2. **Zero new data.** The component reads `timeline-data.js` (loaded via a new `<script>` tag)
   at render time and pulls a curated, hardcoded subset of 8 existing event IDs:
   `t-2017-survey, t-2017-dpr, t-2018-survey-conflict, t-2019-pinkbook, t-2020-revised-dpr,
   t-2020-22-token-budget, t-2022-23-firr-eirr, t-2026-rti` — sorted chronologically by date at
   render time. `timeline-data.js` itself was not modified, so this component and `history.html`'s
   timeline can never drift out of sync.
3. Deliberately excluded two milestones the master prompt's own example mentions (a
   project-specific 23.02.2023 EIRR-request date, a "2026 fresh FLS/DPR process" step) — neither
   is verified anywhere in this site's actual data files, so they were not invented.
4. The flagged `t-2018-survey-conflict` node (genuine 3-way date discrepancy between the
   original DPR, revised DPR, and MP Mane's letter) renders with red-accented styling and stays
   visible with its ⚠️ marker and full verification note — not hidden or resolved.
5. Each node shows: date label, title, full description, verification badge (🟢/🟡/⚪, same
   legend as the rest of the page), and an evidence link when one exists — same visual language
   as the existing `.ps-card`/`.ps-verify` styles already on this page.

## VERIFICATION DONE THIS SESSION (Phase 4, all passed)
- `owSubmitVote` count in `index.html`: still 2 (file untouched this session).
- `diff -rq` against the source ZIP: **only `project-status.html` differs** — every other file,
  including all 7 protected voting files, byte-identical.
- `project-status.html` re-parses cleanly with Python's `html.parser`.
- Inline `<script>` block brace/paren balance: 0/0 (balanced).
- Simulated the exact chain-building logic (Node.js) against the real `timeline-data.js`:
  confirms 8 nodes render, correct chronological order (2017-06-11 → 2026-08-12), and exactly
  one node (`t-2018-survey-conflict`) is flagged as the conflict node — matching the source data.

## DEFERRED (candidates for future sessions, not started)
- Full audit of remaining one-off hex colors sitewide (beyond the 3 consolidated in Phase 2).
- Explicit tablet-breakpoint stress test — existing grids already use
  `auto-fit`/`auto-fill minmax()` so they're naturally responsive, but this hasn't been visually
  verified at 600–900px widths specifically.
- `admin.html`/`admin_edit.html`/`opinion_edit.html` — not restyled at all so far (internal
  tools, left alone for safety/scope reasons, not because they don't need it).
- Assigning Evidence IDs to the 19 draft entries once the admin reviews/publishes them (Phase 3
  follow-up, not a new phase — just unfinished coverage of this phase's own scope).
- The `ev-1787979873043` entry's thin metadata (blank authority/summary despite being
  "published") — flagged for the user's own admin-side review, not something a future session
  should silently fill in.

## KNOWN ISSUES
None found that block Phase 4.

## TESTING STATUS
Structural/automated checks only (JSON re-parse, HTML parse validation, diff verification,
byte-identity of protected files, brace/div balance) — no live browser render test was possible
in this environment. Recommend the user spot-check `evidence.html` and one detail page (e.g. the
1956 Lok Sabha one) after deploying to confirm the new ID/Level badges display as expected and
don't visually clash with existing category/authority badges. Also recommend re-checking the
skip-link/id="main" behavior from Phase 2 at the same time.

## VISUAL DESIGN PASS (22 Sep 2026, same day as Phase 4 — user-requested, off the phase track)
User said the site felt boring and asked for a proper visual-design pass with full discretion.
Scope: `styles.css` (global) + `evidence.css` (homepage-only `.ev-teaser` grid) + `index.html`
(homepage) only. Deliberately did NOT touch history.html/evidence.html/our-work.html/
why-ichalkaranji.html/officials.html/gallery.html/team.html/brief.html/kajrolkar.html — none of
them needed changes for this pass since their shared chrome (masthead-top bar, subnav, footer)
already reads fine as a plain bar and gets only the safe global tweaks below; only the homepage
has the large hero + card-heavy sections that read as flat/boring.

Kept the established brand (paper/navy/brass/gold tokens — same ones already used in the printed
Amit Shah nivedan letterhead) rather than replacing the palette; added visual energy instead of
swapping identity:
1. New `--radius-lg`/`--shadow-card`/`--shadow-lift` tokens — a deliberately more generous radius
   for *content cards* (stat cells, callouts, timeline entries, explore-more tiles), while hairline
   `--radius:2px` stays untouched for small data labels (`.tag`, `.proof-link`, `.tab`,
   `.skip-link`) so the ledger/report feel of those is unchanged. A hierarchy choice, not a
   blanket radius bump.
2. New `.masthead-hero` MODIFIER class (added only to index.html's `<header>`, NOT to base
   `.masthead`) — a navy-deep→navy→navy-soft gradient + a pure-CSS-gradient "rail track" motif
   (two brass rails + repeating sleeper ticks) along the hero's base, literal to the railway
   subject rather than decorative-for-its-own-sake. **Important**: this was deliberately scoped
   to a modifier class after checking — the other 12 public pages reuse bare `.masthead` as a
   short ~50px top bar with no `.masthead-body`, and the gradient/rail-motif band would have
   overlapped/obscured that bar if applied to `.masthead` itself.
3. One orchestrated hero entrance (`heroRise` keyframe, staggered on `.masthead-body`'s 5 direct
   children only) — a single moment, not per-section scroll animations. Respects the existing
   global `prefers-reduced-motion` rule.
4. The homepage's one real call-to-action — "याचिकेवर स्वाक्षरी करा" (sign the petition) — was
   previously a completely unstyled plain link (`.lang-toggle` had zero CSS rules anywhere in the
   codebase). Gave it a real button treatment (gold-accent fill, hover lift). No HTML class
   changes needed for this one — just added the missing CSS.
5. Section rhythm: `main > section:nth-of-type(even)` gets `--paper-raised` background for
   alternating bands (scoped via the `<main>` element, which only index.html/dead-duplicate
   index(2).html use) — with an explicit `#timeline` override back to `--paper` since its own
   `.entry` cards are already `--paper-raised` and would've lost contrast otherwise.
6. `.stat-cell` (brass top-accent + hover lift), `.callout` (brass left-accent bar), `.entry`
   (hover lift) all promoted to the new card language.
7. The 9 "explore more" tiles at the bottom of the homepage were previously 9 stacked full-width
   bars with a completely unstyled class (only `.ev-teaser` in evidence.css, which had a flat
   hairline-radius box with no hover state). Wrapped them in a new `.ev-teaser-grid` (responsive
   grid, added in `evidence.css` since that's where `.ev-teaser` already lived) and gave the tiles
   the same accent-bar/hover-lift card language. `.ev-teaser` only ever appears on index.html, so
   this couldn't affect evidence.html/evidence-detail.html despite living in the same stylesheet.
8. `nav.subnav a:hover` — added a transition + changed the hover underline color from `--line` to
   `--brass` (was barely visible before). This rule is shared sitewide (all pages use `.subnav`),
   so this one small polish DOES apply everywhere — everything else in this pass is homepage-only.

VERIFICATION: diff against the pre-pass working copy shows exactly 3 files changed this sub-pass
(`styles.css`, `evidence.css`, `index.html`) on top of the already-delivered Phase 4 file
(`project-status.html`) — 4 files total differ from the original uploaded ZIP, everything else
byte-identical including all 7 protected voting files (owSubmitVote count still 2). index.html
div-tag-balanced (77 open/77 close), parses cleanly, inline `<script>` blocks brace-balanced.
Tried a local headless render (wkhtmltoimage) for a self-critique screenshot per usual design
practice — its old WebKit engine doesn't support CSS custom properties (`var()`) at all, so it
rendered the WHOLE site unstyled (not just this pass's changes) and wasn't usable as a check;
noting this so a future session doesn't waste time on the same tool. No live modern-browser
render was possible in this environment — recommend the user spot-check the homepage on an
actual phone/browser after deploying, especially the hero on a narrow (<560px) screen.

## NEXT EXACT ACTION
Begin Phase 5: RTI/CPGRAMS evidence classification (answered/partial/transferred/not-clarified,
per master prompt §11). Only one RTI entry is currently published in `evidence-data.js`
(`ev-1787383568850`) — if its classification isn't already clear from the entry's own fields,
mark it "पडताळणी आवश्यक" rather than guessing.

## LAST COMPLETED STEP
Same-day visual design pass complete and verified (see above) on top of Phase 4 Unit 1 (Official
Decision Chain). All voting-protection checksums confirmed intact, deliverable zip prepared.

## NOTE FOR NEXT SESSION
This session's uploaded ZIP did NOT contain the Phase 4 changes from the 9-10 Sep session (see
CLAUDE_CHANGELOG.md) — the user evidently didn't merge that delivered zip into their live copy.
If a future session's ZIP looks like it's missing already-"done" phases again, don't assume the
progress log is wrong — diff against this file's stated PROJECT STATUS and trust what's actually
in the ZIP.
