# Prompt For Building A Paper Portfolio Dataset

You are helping build a small academic paper portfolio from rough citation material.
The goal is to create a reliable structured data file, local PDF archive, and minimal webpage.
Favor verified source data over pasted citation text.

Keep the implementation simple and easy to revise later.

## Starting Point

Set up a minimal Vite project if one does not already exist. Use Vite for local development rather than a separate static server.

Use this basic structure:

- `papers.js`: structured paper metadata
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

PDF checks should confirm:

- every stored PDF is actually a PDF
- the local PDF link count matches the data fields
- production builds include `pdfs/` under `dist/pdfs`

Project checks:

```sh
npm run build
```

Browser smoke test when a dev server is running:

- rendered list item count equals `papers.length`
- newly added titles appear
- PDF links appear
- abstracts are not visible unless deliberately enabled

## What Can Be Automated

A shell script can handle:

- creating `pdfs/`
- downloading arXiv PDFs
- trying known publisher PDF patterns
- validating file types
- adding local PDF fields for files that exist
- running repeatable sanity checks

A script can also query structured APIs, such as Crossref, arXiv, or Semantic Scholar, to help find metadata.

The harder reference-gathering work still needs LLM or human judgment:

- interpreting poorly formatted citations
- deciding whether two similar titles are the same paper
- reconciling preprint and final publication metadata
- noticing subtle author-list discrepancies
- deciding when uncertainty is high enough to ask the user
- writing useful `shortDescription`, `tags`, and `assetIdeas`

Use automation for retrieval and checks. Use judgment for source selection, merges, and ambiguity.

## Update The Process Notes

When the workflow changes, update `process.md`.
Keep `process.md` as a practical runbook and keep this file as the reusable prompt/instruction layer.
