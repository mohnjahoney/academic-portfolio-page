# Paper Data Gathering Process

This is a living record of the process for building and maintaining `papers.js`.
It focuses only on gathering, verifying, merging, and checking paper metadata.
Rendering decisions belong elsewhere.

Use Vite for local development:

```sh
npm run dev
```

Do not use a separate Python static web server for this app. Vite handles ES modules, dev serving, and the local `/assets/article-pdfs/...` links during development.

## Goal

Create a structured list of academic papers with enough verified metadata to support a simple webpage now and richer presentation later.

Each paper record should include:

- `id`: stable slug-style identifier
- `era`: broad category used by the portfolio
- `title`
- `authors`
- `institutions`
- `year`
- `journal`
- `journalLink`, when a journal DOI or journal page is available
- `arXivLink`, when an arXiv record is available
- `journalPdf`, when a verified local copy of the official journal PDF exists
- `arXivPdf`, when a verified local copy of the arXiv PDF exists
- `otherLinks`, for author pages, lab pages, institutional pages, PDFs, or other sources
- `abstract`
- `tags`
- `shortDescription`
- `assetIdeas`
- `verified: false`, only when a record is intentionally kept despite incomplete verification

## Source Priority

Use source material to verify and normalize the citation before adding anything to `papers.js`.

Preferred source order:

1. Journal or publisher page, especially DOI pages.
2. arXiv abstract page.
3. Author, lab, university, or institutional publication page.
4. Reputable indexing services, only when primary sources are unavailable.
5. User-provided citation text, as a lead rather than final authority.

Do not add a citation directly from rough pasted text without checking it.

## Search Pattern

When starting from rough citations:

1. Search the exact title in quotes.
2. Search title plus one or two coauthors.
3. Search the arXiv URL or identifier if provided.
4. Search DOI, volume, issue, or article number if provided.
5. Open the strongest primary source and record the canonical title, author list, journal, year, DOI, arXiv link, and abstract.

When searching for missing papers by coauthor:

1. Search combinations like `"Mahoney" "Crutchfield"`, `"Mahoney" "Gu"`, `"Mahoney" "Wiesner"`, and `"Mahoney" "Mitchell"`.
2. Compare candidate titles against the existing `papers.js` titles before adding.
3. Prefer exact title matches over fuzzy matches.
4. If a candidate is probably relevant but cannot be verified from a primary source, either skip it or add it with `verified: false` only if there is a reason to keep it visible for later review.

## Duplicate And Merge Rules

Before adding a paper:

1. Check for an exact title match in `papers.js`.
2. Check for near-duplicate titles, especially title case, punctuation, subtitles, and changed preprint/published titles.
3. Check whether the arXiv link or DOI already exists under another record.
4. If the same paper appears with both preprint and journal metadata, merge into one record.
5. Keep both `journalLink` and `arXivLink` when both exist.
6. Add non-primary pages to `otherLinks`.
7. If the source title changed between preprint and publication, use the published title unless there is a strong reason not to.
8. If metadata conflicts and the merge is not obvious, stop and ask for a decision.

Examples of discrepancies worth asking about:

- Different author order across sources
- Different titles that may represent revised versions rather than the same paper
- Different publication years between preprint and journal publication
- A DOI that appears to point to a different title
- A source claiming "in press" while another shows final publication data

## Abstract Handling

Add an `abstract` field for each paper.

Guidelines:

- Prefer the abstract from the journal page or arXiv page.
- Keep the abstract as a JavaScript template literal.
- Do not render abstracts on the page until the UI is ready for them.
- Normalize obvious copy artifacts, line breaks, and hyphenation from PDFs.
- Preserve meaningful mathematical notation.
- Wrap LaTeX expressions in double dollar signs: `$$...$$`.
- If a source uses single-dollar math, convert it to double-dollar math.
- Escape backslashes inside JavaScript strings, for example `$$\\epsilon$$`.
- Avoid leaving stray single-dollar delimiters.

## Link Fields

Use separate fields rather than a single catch-all paper URL:

- `journalLink`: DOI or publisher page for the final journal paper.
- `arXivLink`: arXiv abstract page, not the PDF URL.
- `otherLinks`: list of additional useful URLs.

Do not use `paperUrl` for new records.

## PDF Files

Store local PDFs in `assets/article-pdfs/`.

Use the paper `id` for filenames rather than camelCased titles. The `id` is already stable, readable, filesystem-safe, and tied directly to the data record. Full titles are long and can change between preprint and publication.

Filename conventions:

- Official journal PDF: `assets/article-pdfs/<id>.pdf`
- arXiv PDF: `assets/article-pdfs/<id>-arXiv.pdf`

For each paper:

1. Try to download the official journal PDF from the publisher or DOI-linked journal page.
2. Keep the file only if it validates as a PDF.
3. If the publisher returns HTML, a login page, or an error page, do not store it as a PDF.
4. Try to download the arXiv PDF from `https://arxiv.org/pdf/<arxiv-id>` when an arXiv link exists.
5. Add `journalPdf` and/or `arXivPdf` only for files that exist locally.
6. Use site-root paths in `papers.js`, for example `/assets/article-pdfs/example-arXiv.pdf`.

The Vite dev server can serve `/assets/article-pdfs/...` from the project root. The production build needs to copy `assets/article-pdfs/` into `dist/assets/article-pdfs`, so keep the `npm run build` script aligned with this convention.

The repeatable download command is:

```sh
npm run download:pdfs
```

This runs `scripts/download-pdfs.sh`. The script reads `papers.js`, downloads arXiv PDFs from the arXiv IDs, tries known official publisher PDF URL patterns from DOI links, validates each downloaded file with `file`, stores only real PDFs, and adds `journalPdf` / `arXivPdf` fields for local files that exist.

Useful options:

```sh
scripts/download-pdfs.sh --force
scripts/download-pdfs.sh --skip-journal
scripts/download-pdfs.sh --skip-arxiv
scripts/download-pdfs.sh --no-update-papers
```

## Verification Checks

After editing `papers.js`, run the data sanity check:

```sh
node -e 'import("./papers.js").then(({papers}) => { const titles = papers.map(p => p.title.toLowerCase()); const dupes = titles.filter((t, i) => titles.indexOf(t) !== i); console.log("papers", papers.length); console.log("duplicate titles", dupes.length ? dupes.join(", ") : "none"); console.log("missing abstracts", papers.filter(p => !p.abstract).map(p => p.id).join(",") || "none"); console.log("missing links", papers.filter(p => !p.journalLink && !p.arXivLink && !(p.otherLinks && p.otherLinks.length)).map(p => p.id).join(",") || "none"); console.log("paperUrl", papers.filter(p => p.paperUrl).length); console.log("verified false", papers.filter(p => p.verified === false).map(p => p.id).join(",") || "none"); console.log("single dollar abstracts", papers.filter(p => /(^|[^$])\$[^$]/.test(p.abstract || "") || /[^$]\$($|[^$])/.test(p.abstract || "")).map(p => p.id).join(",") || "none"); })'
```

Expected output for a clean pass:

- No duplicate titles
- No missing abstracts
- No missing links
- `paperUrl 0`
- `verified false none`, unless there are intentionally unverified records
- `single dollar abstracts none`

Check local PDF fields against the files on disk:

```sh
node -e 'import("./papers.js").then(async ({papers}) => { const fs = await import("node:fs/promises"); const files = new Set(await fs.readdir("assets/article-pdfs").catch(() => [])); const missing = []; for (const paper of papers) { for (const field of ["journalPdf", "arXivPdf"]) { if (!paper[field]) continue; const file = paper[field].replace("/assets/article-pdfs/", ""); if (!files.has(file)) missing.push(`${paper.id}:${field}`); } } console.log("missing local pdfs", missing.join(",") || "none"); })'
```

Check that stored PDFs are actually PDF files:

```sh
find assets/article-pdfs -maxdepth 1 -type f -name '*.pdf' -print | sort | xargs -n 1 file
```

Also run:

```sh
npm run build
```

The build should pass after every data update. Even though this process file is about data gathering, the build catches malformed JavaScript quickly.

## Browser Spot Check

When a dev server is running, reload the local page and check:

- The number of rendered list items matches `papers.length`.
- Newly added titles appear.
- Abstracts are not visible yet.
- Links still render.

This is a smoke test, not a rendering review.

## Concept Summaries

Keep conceptual summaries separate from citation metadata.

- `papers.js` remains the bibliographic and source-data layer.
- `paperConcepts.js` stores interpretive reader-facing summaries keyed by paper ID.
- `prompts/paper-concepts.md` stores the reusable LLM instructions.

The concept fields are:

- `doorway`: one plain-language orientation sentence
- `question`: one short curiosity-driving question
- `reframe`: one conceptual takeaway sentence
- `pitch`: three to four sentence summary
- `detail`: two or three short explanatory paragraphs
- `haiku`: playful three-line miniature summary
- `limerick`: playful five-line miniature summary
- `aphorism`: one memorable sentence
- `koan`: one quiet koan-like question or statement

Generate `pitch` and `detail` first, then derive the shorter and more playful fields from that interpretation.
Retire `gist` as a field name; use the more specific `doorway`, `question`, and `reframe` fields instead.

Prepare an LLM prompt for one or two papers at a time while tuning:

```sh
npm run concept:prompt -- prediction-retrodiction turnstile-mechanism-fronts-fluid-flows
```

Review generated text before adding it to `paperConcepts.js`.
The concept layer is editorial and interpretive, so it should be easy to revise by hand.

## Current Notes

- The current data shape uses one record per paper, even when both arXiv and journal sources exist.
- The page currently renders only title, year, journal, authors, and links.
- Abstracts are stored but intentionally not rendered.
- `shortDescription` values are currently human-written summaries based on the verified title and abstract, not copied from source pages.
- `assetIdeas` are internal planning hints and do not need the same level of source verification as citation metadata.

## Open Questions For Future Iterations

- Decide whether to track source provenance per field, for example `sources` or `verifiedSources`.
- Decide whether `institutions` should reflect author affiliations at publication time or broader project affiliations.
- Decide whether `shortDescription` should be generated, removed, or sourced from a controlled editorial pass.
- Decide whether proceedings, working papers, and unpublished manuscripts should live in the same array or separate collections.
