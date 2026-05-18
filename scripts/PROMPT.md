# Prompt For Building A Paper Portfolio Dataset

You are helping build a small academic paper portfolio from rough citation material.
The goal is to create reliable structured data files, a local PDF archive, and minimal webpages for papers and related author information.
Favor verified source data over pasted citation text.

Keep the implementation simple and easy to revise later.

## Starting Point

Set up a minimal Vite project if one does not already exist. Use Vite for local development rather than a separate static server.

Use this basic structure:

- `papers.js`: structured paper metadata
- `authors.js`: structured author metadata derived from paper authors and verified external sources
- `main.js`: minimal rendering logic
- `index.html`: simple list page
- `pdfs/`: local PDF archive
- `scripts/download-pdfs.sh`: repeatable PDF download helper
- `process.md`: living notes about the workflow and decisions

The local development command should be:

```sh
npm run dev
```

The app can use Vite's default port, or the next available port if that one is busy.

The first page only needs to render a list of papers. For each paper, show:

- title
- year
- journal
- authors
- external links
- local PDF links

Do not render abstracts yet unless specifically asked.

The authors page can stay simple. For each author, show:

- name
- number of papers co-authored
- best guess for current email
- best guess for current institution

Add a small top navigation between papers and authors. Leave room for later pages such as posters and talks.

## Data Shape

Each paper record should use stable, explicit fields:

- `id`: stable slug-style identifier, used for filenames
- `era`: broad category
- `featured`, optional
- `title`
- `authors`
- `institutions`
- `year`
- `journal`
- `journalLink`, for DOI or publisher page
- `arXivLink`, for arXiv abstract page
- `journalPdf`, when a verified local journal PDF exists
- `arXivPdf`, when a verified local arXiv PDF exists
- `otherLinks`, for author pages, lab pages, PDFs, or institutional pages
- `abstract`
- `tags`
- `shortDescription`
- `assetIdeas`
- `verified: false`, only when intentionally keeping an incomplete or uncertain record

Do not use a single `paperUrl` field. Keep journal, arXiv, local PDFs, and other links separate.

Each author record should use stable, explicit fields:

- `id`: stable slug-style identifier
- `name`: normalized display name
- `aliases`: alternate names or initials found in citations
- `focusAuthor: true`, only for the portfolio owner
- `authoredPaperIds`: list of paper IDs from `papers.js`
- `institutions`: known relevant institutions
- `emails`: known relevant email addresses, with the best current guess first
- `latestAcademicPosition`: best guess for latest academic position, with `title`, `organization`, and `confidence`
- `currentPosition`: best guess for current position, academic or otherwise, with `title`, `organization`, `sector`, and `confidence`
- `sourceUrls`: pages used to support the author record

Keep author data separate from paper data. Papers should continue to store their own author name lists for citation rendering, while `authors.js` stores normalized people-level data.

## Citation Gathering

Treat rough pasted citations as leads, not source-of-truth records.

For each candidate paper:

1. Search the exact title in quotes.
2. Search the title plus one or two coauthors.
3. Use arXiv identifiers directly when provided.
4. Use DOI, volume, issue, article number, or journal title to confirm publication details.
5. Prefer the strongest source: journal/publisher page, arXiv page, author/lab page, institutional page, then index pages.
6. Record the canonical published title, author list, year, journal, DOI link, arXiv link, and abstract.

If searching for missing papers by coauthor, search combinations such as:

- `"Mahoney" "Crutchfield"`
- `"Mahoney" "Gu"`
- `"Mahoney" "Wiesner"`
- `"Mahoney" "Mitchell"`

Then compare candidates against existing titles, DOIs, and arXiv links before adding anything.

## Author Gathering

Build `authors.js` from the author names already present in `papers.js`, then verify and enrich each person record from the web.

For each author:

1. Normalize the display name from the most complete form available.
2. Preserve shorter citation forms, initials, and alternate spellings in `aliases`.
3. Link the author to all matching records through `authoredPaperIds`.
4. Search the author name with one or more distinctive coauthors or paper titles when the name is ambiguous.
5. Prefer current institutional profile pages, personal academic pages, ORCID, lab pages, publisher pages, conference bios, and paper PDFs over generic index pages.
6. Record institutions that are clearly connected to the author.
7. Record email addresses only when found in public academic, institutional, paper, or CV sources.
8. Make a best guess for latest academic position and current position, and include a confidence value.

For the focus author, set `focusAuthor: true`. Do not infer that flag from name matching alone in future projects; set it intentionally.

When evidence conflicts, prefer the more recent official source. If a current role is uncertain, keep the best supported value and lower the confidence rather than inventing precision.

Do not over-collect. The first useful author page only needs enough data to show name, paper count, current email, and current institution.

## Duplicate And Merge Policy

Before adding a paper:

1. Check exact title matches.
2. Check near-duplicates caused by punctuation, capitalization, subtitles, or changed preprint titles.
3. Check DOI and arXiv IDs against existing records.
4. Merge journal and arXiv information into one record when they refer to the same paper.
5. Use the published title when a preprint title and final title differ, unless there is a clear reason not to.
6. Keep both `journalLink` and `arXivLink` when both are available.
7. Put extra pages in `otherLinks`.

Ask the user before merging when there is a real discrepancy, such as conflicting author order, mismatched years, title changes that may indicate different papers, or a DOI that appears to point elsewhere.

For author records, merge cautiously:

- Merge initials into a full-name record when the papers and coauthor context make the identity clear.
- Keep alternate forms in `aliases`.
- Do not merge common names based only on name similarity.
- Ask the user before merging if two people share a name or if source pages suggest different institutions, fields, or career paths.
- Keep one author record per person, not one per name spelling.

## Abstracts And Math

Add an `abstract` field for each paper when available.

Guidelines:

- Prefer the journal or arXiv abstract.
- Store abstracts as JavaScript template literals.
- Normalize line breaks and obvious PDF copy artifacts.
- Preserve meaningful math notation.
- Wrap LaTeX expressions in double dollar signs, `$$...$$`.
- Escape backslashes inside JavaScript strings, for example `$$\\epsilon$$`.
- Check for stray single-dollar math delimiters before finishing.

## PDFs

Store PDFs in `pdfs/`.

Use paper IDs for filenames:

- official journal PDF: `pdfs/<id>.pdf`
- arXiv PDF: `pdfs/<id>-arXiv.pdf`

This is preferred over camelCased titles because IDs are shorter, stable, already filesystem-safe, and tied directly to data records.

Use or create `scripts/download-pdfs.sh` to automate the deterministic parts:

- read `papers.js`
- derive arXiv PDF URLs from `arXivLink`
- try known official publisher PDF URL patterns from DOI links
- skip existing files unless forced
- download into `pdfs/`
- validate files with `file`
- discard HTML, login pages, blocked responses, and other non-PDF files
- add `journalPdf` and `arXivPdf` fields only when local files exist

Some official journal PDFs will not be retrievable without authentication or browser/session behavior. Do not force these. Record only the files that can be downloaded and validated cleanly.

## Images From PDFs

Store extracted or rendered paper figures in `images-from-pdfs/`.

Use one directory per paper:

- `images-from-pdfs/<id>/figure-1.png`
- `images-from-pdfs/<id>/figure-2.png`

Start with a Poppler preflight:

```sh
pdfimages -list pdfs/<id>-arXiv.pdf
```

Use this only to decide whether embedded raster extraction is worthwhile. If the listed objects are tiny, 1-bit, `stencil`, mostly `[inline]`, or only a few bytes each, do not extract them into the project. These are usually masks, glyph fragments, or PDF internals rather than useful figures.

When a PDF contains substantial raster images, `pdfimages -png` can be useful. Otherwise, especially for vector figures, rasterize pages and crop:

```sh
pdftoppm -png -r 200 pdfs/<id>-arXiv.pdf /tmp/<id>-page
sips --cropToHeightWidth <height> <width> \
  --cropOffset <y> <x> \
  /tmp/<id>-page-2.png \
  --out images-from-pdfs/<id>/figure-1.png
```

Important: `sips --cropOffset` takes `y x`, not `x y`.

For batch extraction, prefer a caption-anchored approach over raw embedded extraction:

1. Use `pdftohtml -xml -i -stdout <pdf>` to get page text and coordinates.
2. Detect caption starts such as `Fig. 1`, `FIG. 2`, or `Figure 3`.
3. Use the caption position to estimate a crop region above the caption.
4. Render pages with `pdftoppm -png -r 200`.
5. Crop rendered page images with `sips`.
6. Store outputs in the paper's image directory.

This approach is imperfect, but useful. It tends to produce reasonable placeholders quickly for many papers, especially when figures are vector artwork and not extractable as embedded raster images.

Prefer `pdftohtml -xml` over `pdftotext -bbox-layout` for this workflow. Some PDFs can make `pdftotext -bbox-layout` crash, while `pdftohtml -xml` still provides usable text coordinates.

Watch for Poppler page image naming. `pdftoppm` may write `page-1.png`, `page-01.png`, or `page-001.png` depending on the page count. Scripts should check for padded and unpadded names.

Cropping workflow:

1. Render pages at 200 DPI.
2. Open or preview the rendered page image.
3. Estimate the figure region in pixels.
4. Crop generously at first, including the caption when useful.
5. Preview the crop.
6. Adjust until neighboring article text is removed and labels are not clipped.
7. Name final files `figure-1.png`, `figure-2.png`, and so on.

Do not spend too long perfecting early crops. Limit manual refinement to three crop attempts per image. After three attempts, keep the best crop and move on, unless the image is unusable enough to misrepresent the figure.

It is acceptable for a first-pass batch to contain imperfect crops. Treat these as working assets that can be improved later. The immediate goal is to get figure-like visual material into stable per-paper directories.

Do not keep raw embedded extraction fragments unless they are actually useful. If diagnostic fragments are temporarily created, move or delete them before treating the image set as complete.

After a batch extraction, update the figure manifest that rendering code uses. A compact count-based manifest can be easier to maintain than listing every image path manually, as long as files are named sequentially as `figure-N.png`.

## Minimal Rendering

Keep rendering boring and replaceable.

The page should:

- import `papers` from `papers.js`
- create one list item per paper
- show title, year, journal, authors
- render external links as `Journal`, `arXiv`, and `Other N`
- render internal local links as `Journal PDF` and `arXiv PDF`
- avoid rendering abstracts until asked

Do not invest heavily in style yet. The page is a functional representation of the data, not the final design.

For the authors page:

- import `authors` from `authors.js`
- sort authors by descending co-authored paper count, then alphabetically by name
- render one list item per author
- show name, paper count, current email, and current institution
- keep the renderer pipeline separate from the data
- hide paper renderer controls when viewing authors

## Validation

After editing data or scripts, run checks.

Data checks should confirm:

- no duplicate titles
- no missing abstracts, unless intentionally incomplete
- no papers missing all source links
- no `paperUrl` fields
- no unintended `verified: false` records
- no stray single-dollar LaTeX delimiters
- every `journalPdf` and `arXivPdf` field points to an existing file

Author checks should confirm:

- every paper author has a corresponding author record, unless intentionally excluded
- no author records exist for people absent from `papers.js`, unless intentionally added for future data
- `authoredPaperIds` all point to real paper IDs
- each author appears in the author list of each referenced paper, accounting for aliases
- exactly one focus author exists
- no duplicate author IDs
- every author has at least one institution or a clearly marked uncertainty
- current email and current institution are best guesses, not guaranteed facts

PDF checks should confirm:

- every stored PDF is actually a PDF
- the local PDF link count matches the data fields
- production builds include `pdfs/` under `dist/pdfs`

Image extraction checks should confirm:

- extracted figure files are readable PNGs or another intentional image format
- figure filenames follow the `figure-N.png` convention
- each paper's images live under `images-from-pdfs/<id>/`
- manifest counts match the number of `figure-N.png` files on disk
- crops do not include unrelated neighboring text
- crops do not clip labels, arrows, axes, captions, or other meaningful figure content
- noisy `pdfimages` fragments are not kept as final figure assets
- papers without local PDFs are skipped explicitly rather than failing silently

Project checks:

```sh
npm run build
```

Browser smoke test when a dev server is running:

- rendered list item count equals `papers.length`
- newly added titles appear
- PDF links appear
- abstracts are not visible unless deliberately enabled
- authors page rendered item count equals `authors.length`
- authors page sorts by paper count, then alphabetically within ties
- navigation links move between papers and authors

## What Can Be Automated

A shell script can handle:

- creating `pdfs/`
- downloading arXiv PDFs
- trying known publisher PDF patterns
- validating file types
- adding local PDF fields for files that exist
- running repeatable sanity checks
- running `pdfimages -list` as a preflight for figure extraction
- rasterizing pages with `pdftoppm`
- finding figure captions with `pdftohtml -xml`
- creating first-pass caption-anchored crops
- validating generated images with `file`
- updating a count-based figure manifest from generated directories

A script can also query structured APIs, such as Crossref, arXiv, or Semantic Scholar, to help find metadata.

A script can help with author processing by:

- extracting unique author names from `papers.js`
- normalizing obvious citation aliases
- checking that every `authoredPaperIds` value exists
- counting co-authored papers per author
- detecting paper authors missing from `authors.js`
- detecting author records that do not correspond to any paper author

However, author enrichment usually needs LLM or human judgment because names are ambiguous and current positions change.

The harder reference-gathering work still needs LLM or human judgment:

- interpreting poorly formatted citations
- deciding whether two similar titles are the same paper
- reconciling preprint and final publication metadata
- noticing subtle author-list discrepancies
- deciding when uncertainty is high enough to ask the user
- writing useful `shortDescription`, `tags`, and `assetIdeas`
- distinguishing two researchers with the same or similar names
- choosing the best current email or institution from stale public pages
- deciding whether an industry, academic, or personal page is the best current-position source
- deciding which rendered page regions correspond to actual figures
- refining crops so the output looks clean and complete

Use automation for retrieval and checks. Use judgment for source selection, merges, and ambiguity.

## Update The Process Notes

When the workflow changes, update `process.md`.
Keep `process.md` as a practical runbook and keep this file as the reusable prompt/instruction layer.
