import {
  createElement,
  externalLinksFor,
  joinInline,
  pdfLinksFor
} from './shared.js';

const createRow = (paper) =>
  createElement('tr', {
    children: [
      createElement('td', {
        className: 'compact-title-cell',
        children: [
          createElement('strong', { text: paper.title }),
          createElement('span', {
            className: 'compact-authors',
            text: paper.authors.join(', ')
          })
        ]
      }),
      createElement('td', { text: paper.year }),
      createElement('td', { text: paper.journal || 'Not listed' }),
      createElement('td', {
        className: 'compact-links',
        children: [joinInline(externalLinksFor(paper), ' / ')]
      }),
      createElement('td', {
        className: 'compact-links',
        children: [joinInline(pdfLinksFor(paper), ' / ')]
      })
    ]
  });

export const compactRenderer = {
  id: 'compact',
  name: 'Compact',
  render({ container, papers }) {
    const table = createElement('table', {
      className: 'compact-table',
      children: [
        createElement('thead', {
          children: [
            createElement('tr', {
              children: ['Paper', 'Year', 'Journal', 'Links', 'PDFs'].map(
                (heading) => createElement('th', { text: heading })
              )
            })
          ]
        }),
        createElement('tbody', {
          children: papers.map(createRow)
        })
      ]
    });

    container.replaceChildren(
      createElement('section', {
        className: 'compact-shell',
        children: [table]
      })
    );
  }
};
