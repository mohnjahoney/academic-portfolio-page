import {
  createElement,
  linkLine,
  metadataLine,
  externalLinksFor,
  pdfLinksFor
} from './shared.js';

const createPaperItem = (paper) => {
  const item = createElement('li');
  const title = createElement('h2', { text: paper.title });

  item.append(
    title,
    metadataLine('Year', paper.year),
    metadataLine('Journal', paper.journal),
    metadataLine('Authors', paper.authors.join(', ')),
    linkLine('Links', externalLinksFor(paper))
  );

  const pdfLinks = pdfLinksFor(paper);

  if (pdfLinks.length > 0) {
    item.append(linkLine('PDFs', pdfLinks));
  }

  return item;
};

export const bareRenderer = {
  id: 'bare',
  name: 'Bare',
  render({ container, papers }) {
    const list = createElement('ol', { className: 'bare-list' });
    list.append(...papers.map(createPaperItem));
    container.replaceChildren(list);
  }
};
