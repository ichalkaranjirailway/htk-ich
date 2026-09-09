# CLAUDE_PROGRESS.md — Ichalkaranji Railway Evidence & Accountability Portal

Last updated: 2026-09-09 (Session B — Phase 2)
Source: user-uploaded ZIP (`htk-ich-main__13_.zip`), confirmed byte-identical to
github.com/ichalkaranjirailway/htk-ich main HEAD `0e40f23` at time of upload. Per explicit
instruction, this and all future sessions work from the uploaded ZIP as the authoritative
master copy — do not pull/clone from GitHub unless the user says otherwise.

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
PHASE 4–14: NOT STARTED

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

## NEXT EXACT ACTION
Begin Phase 4: build the "Official Decision Chain" visual component (per master prompt §6) using
the dates/figures already verified in `evidence-data.js`/`project-status-data.js` (2017 FLS,
30.11.2017 original DPR ₹191.59cr/-10.11% ROR, 02.01.2020 revised DPR ₹180.73cr/-12.73% ROR,
2023 Railway Board EIRR request, 2026 fresh FLS/DPR process) — additive new component, likely
placed on `project-status.html` and/or `history.html`; do not invent any date/figure not already
present in the site's own data files.

## LAST COMPLETED STEP
Phase 3 Unit 1 complete and verified: Evidence ID + source-Level fields added to the 7 published
evidence-data.js entries (additive only, internal `id` untouched), badges rendered on
evidence.html/evidence-detail.html, all voting-protection checksums confirmed intact, deliverable
zip prepared.
