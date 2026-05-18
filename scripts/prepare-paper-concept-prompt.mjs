import { readFileSync } from 'node:fs';
import { papers } from '../papers.js';

const ids = process.argv.slice(2);

if (ids.length === 0) {
  console.error('Usage: node scripts/prepare-paper-concept-prompt.mjs <paper-id> [paper-id...]');
  process.exit(1);
}

const prompt = readFileSync('prompts/paper-concepts.md', 'utf8');
const selectedPapers = ids.map((id) => {
  const paper = papers.find((candidate) => candidate.id === id);

  if (!paper) {
    console.error(`Unknown paper id: ${id}`);
    process.exit(1);
  }

  return {
    id: paper.id,
    title: paper.title,
    year: paper.year,
    journal: paper.journal,
    authors: paper.authors,
    tags: paper.tags || [],
    shortDescription: paper.shortDescription || '',
    abstract: paper.abstract || ''
  };
});

console.log(`${prompt.trim()}\n\n## Paper Data\n\n`);
console.log(JSON.stringify(selectedPapers, null, 2));
