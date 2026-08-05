# Ichalkaranji Railway Evidence Archive

Static site — no build step needed.

## Files
- `index.html` — main page
- `styles.css` — all styling (citizen ledger / railway signal theme)
- `data.js` — **edit this** to add new evidence entries
- `i18n.js` — English/Marathi text for the fixed page labels (headings, nav, stat labels etc.)
- `script.js` — renders stats, filter tabs, timeline, and the language toggle (don't need to touch)
- `proofs/` — put your scanned RTI replies, letters, screenshots, and videos here (filenames must match `proofSrc` in data.js)

## Language toggle (English / मराठी)
There's a small "English" / "मराठी" button top-right in the header. Clicking it
switches the whole page. It remembers the visitor's choice (localStorage), so
it stays in their picked language on their next visit.

- Fixed page text (headings, nav links, stat labels, etc.) comes from `i18n.js`.
- Each entry in `data.js` can have an `en: { title, to_whom, description, response }`
  block with the English version of that entry. All 29 existing entries already
  have this filled in.

## Deploy to GitHub Pages (free)
1. Create a new GitHub repo, e.g. `ichalkaranji-railway-archive`
2. Upload all files in this folder (including the `proofs/` folder with your files inside)
3. Go to repo Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / `root`
4. Save — your site will be live at `https://<your-username>.github.io/ichalkaranji-railway-archive/` in a couple of minutes

## Adding a new entry
Open `data.js`, copy an existing `{ ... }` entry block inside the `ENTRIES` array, change the `id` to the next number, and fill in the fields (instructions are in the comment at the top of the file). To have the entry also show correctly in English, add an `en: { title, to_whom, description, response }` block at the end of the entry, same as the existing ones — otherwise the English view will just show the Marathi/mixed text for that entry.
