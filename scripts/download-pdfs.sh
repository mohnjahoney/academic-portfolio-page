#!/usr/bin/env bash
set -euo pipefail

pdf_dir="pdfs"
force=0
download_arxiv=1
download_journal=1
update_papers=1

usage() {
  cat <<'USAGE'
Usage: scripts/download-pdfs.sh [options]

Downloads paper PDFs listed in papers.js into pdfs/.

Filename convention:
  Journal PDF: pdfs/<paper-id>.pdf
  arXiv PDF:   pdfs/<paper-id>-arXiv.pdf

Options:
  --force             Re-download files that already exist.
  --skip-arxiv        Do not download arXiv PDFs.
  --skip-journal      Do not try official journal PDFs.
  --no-update-papers  Do not add journalPdf/arXivPdf fields to papers.js.
  -h, --help          Show this help text.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --force)
      force=1
      ;;
    --skip-arxiv)
      download_arxiv=0
      ;;
    --skip-journal)
      download_journal=0
      ;;
    --no-update-papers)
      update_papers=0
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
  shift
done

mkdir -p "$pdf_dir"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command curl
require_command file
require_command node

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

download_pdf() {
  local url="$1"
  local out="$2"
  local tmp="$tmp_dir/$(basename "$out").tmp"

  if [[ -f "$out" && "$force" -eq 0 ]]; then
    echo "skip existing $out"
    return 0
  fi

  if ! curl -L -f --retry 2 --retry-delay 1 \
    -A "Mozilla/5.0" \
    -H "Accept: application/pdf,text/html;q=0.9,*/*;q=0.8" \
    -o "$tmp" \
    "$url" >/dev/null 2>&1; then
    rm -f "$tmp"
    echo "fail $out: download failed"
    return 1
  fi

  local mime_type
  mime_type="$(file -b --mime-type "$tmp")"

  if [[ "$mime_type" != "application/pdf" ]]; then
    rm -f "$tmp"
    echo "fail $out: got $mime_type"
    return 1
  fi

  mv "$tmp" "$out"
  echo "ok $out"
}

doi_to_pdf_urls() {
  local doi="$1"
  local journal_link="$2"

  case "$doi" in
    10.1103/PhysRevLett.*)
      printf '%s\n' "https://journals.aps.org/prl/pdf/$doi"
      ;;
    10.1103/PhysRevE.*)
      printf '%s\n' "https://journals.aps.org/pre/pdf/$doi"
      ;;
    10.1103/PhysRevA.*)
      printf '%s\n' "https://journals.aps.org/pra/pdf/$doi"
      ;;
    10.1103/PhysRevX.*)
      printf '%s\n' "https://journals.aps.org/prx/pdf/$doi"
      ;;
    10.1007/*)
      printf '%s\n' "https://link.springer.com/content/pdf/$doi.pdf"
      ;;
    10.1038/*)
      printf '%s\n' "https://www.nature.com/articles/${doi#10.1038/}.pdf"
      ;;
    10.3390/*)
      if [[ "$journal_link" == https://www.mdpi.com/* ]]; then
        printf '%s\n' "${journal_link%/}/pdf"
      fi
      ;;
    10.1088/*|10.1209/*)
      printf '%s\n' "https://iopscience.iop.org/article/$doi/pdf"
      ;;
  esac
}

paper_rows() {
  node --input-type=module <<'NODE'
import { papers } from './papers.js';

const empty = '__NONE__';

for (const paper of papers) {
  const arxivId = paper.arXivLink?.match(/\/abs\/([^?#]+)/)?.[1] ?? empty;
  const doi = paper.journalLink?.match(/doi\.org\/(.+)$/)?.[1] ?? empty;
  const journalLink = paper.journalLink ?? empty;
  console.log([paper.id, arxivId, doi, journalLink].join('\t'));
}
NODE
}

while IFS=$'\t' read -r id arxiv_id doi journal_link; do
  [[ "$arxiv_id" == "__NONE__" ]] && arxiv_id=""
  [[ "$doi" == "__NONE__" ]] && doi=""
  [[ "$journal_link" == "__NONE__" ]] && journal_link=""

  if [[ "$download_arxiv" -eq 1 && -n "$arxiv_id" ]]; then
    download_pdf "https://arxiv.org/pdf/$arxiv_id" "$pdf_dir/$id-arXiv.pdf" || true
  fi

  if [[ "$download_journal" -eq 1 && -n "$doi" ]]; then
    journal_out="$pdf_dir/$id.pdf"
    if [[ -f "$journal_out" && "$force" -eq 0 ]]; then
      echo "skip existing $journal_out"
      continue
    fi

    mapfile -t journal_urls < <(doi_to_pdf_urls "$doi" "$journal_link")
    if [[ "${#journal_urls[@]}" -eq 0 ]]; then
      echo "skip journal $id: no known PDF pattern for $doi"
      continue
    fi

    journal_ok=0
    for url in "${journal_urls[@]}"; do
      if download_pdf "$url" "$journal_out"; then
        journal_ok=1
        break
      fi
    done

    if [[ "$journal_ok" -eq 0 ]]; then
      echo "no journal PDF stored for $id"
    fi
  fi
done < <(paper_rows)

if [[ "$update_papers" -eq 1 ]]; then
  node --input-type=module <<'NODE'
import { promises as fs } from 'node:fs';
import { papers } from './papers.js';

const files = new Set(await fs.readdir('pdfs').catch(() => []));
let source = await fs.readFile('papers.js', 'utf8');
const warnings = [];

for (const paper of papers) {
  const journalFile = `${paper.id}.pdf`;
  const arxivFile = `${paper.id}-arXiv.pdf`;

  if (files.has(journalFile) && !source.includes(`journalPdf: '/pdfs/${journalFile}'`)) {
    const anchor = `journalLink: '${paper.journalLink}',`;
    if (paper.journalLink && source.includes(anchor)) {
      source = source.replace(anchor, `${anchor}\n    journalPdf: '/pdfs/${journalFile}',`);
    } else {
      warnings.push(`${paper.id}: could not place journalPdf`);
    }
  }

  if (files.has(arxivFile) && !source.includes(`arXivPdf: '/pdfs/${arxivFile}'`)) {
    const anchor = `arXivLink: '${paper.arXivLink}',`;
    if (paper.arXivLink && source.includes(anchor)) {
      source = source.replace(anchor, `${anchor}\n    arXivPdf: '/pdfs/${arxivFile}',`);
    } else {
      warnings.push(`${paper.id}: could not place arXivPdf`);
    }
  }
}

await fs.writeFile('papers.js', source);

if (warnings.length > 0) {
  console.warn(warnings.join('\n'));
}
NODE
fi
