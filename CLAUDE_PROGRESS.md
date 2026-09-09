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
PHASE 3–14: NOT STARTED

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

## DEFERRED (candidates for a future Phase 2 unit, not started)
- Full audit of remaining one-off hex colors sitewide (beyond the 3 consolidated this session).
- Explicit tablet-breakpoint stress test — existing grids already use
  `auto-fit`/`auto-fill minmax()` so they're naturally responsive, but this hasn't been visually
  verified at 600–900px widths specifically.
- `admin.html`/`admin_edit.html`/`opinion_edit.html` — not restyled at all this phase (internal
  tools, left alone for safety/scope reasons, not because they don't need it).

## KNOWN ISSUES
None found that block Phase 3.

## TESTING STATUS
Structural/automated checks only (parse validation, diff verification, brace balance,
byte-identity of protected files) — no live browser render test was possible in this
environment. Recommend the user do a quick visual spot-check of `index.html` and one inner page
after deploying, specifically confirming: (a) Tab key from page load reveals the skip link and
it jumps to content correctly, (b) the voters-list/Kajrolkar tribute cards on the homepage still
look identical to before.

## NEXT EXACT ACTION
Begin Phase 3: introduce the Evidence ID scheme (`IR-EV-YYYY-TYPE-NNN`) as an additive field on
the 6 existing entries in `evidence-data.js` (do not restructure existing keys, do not rewrite
existing evidence summaries/facts — only add the new `id` field and, where the master prompt's
metadata structure calls for it, `authority`/`documentType`/`status` fields that are already
knowable from data already in this file or evidence-data.js's existing entries).

## LAST COMPLETED STEP
Phase 2 Unit 1 complete and verified: skip-links + `id="main"` landmarks added sitewide
(excluding protected/admin files), 3 hardcoded tribute/voters colors consolidated into
`styles.css` tokens, all voting-protection checksums confirmed intact, deliverable zip prepared.
