import {
  createElement,
  getEraLabel,
  groupBy,
  paperLinks
} from './shared.js';

const createDossier = (paper) =>
  createElement('article', {
    className: 'dossier-card',
    children: [
      createElement('div', {
        className: 'dossier-kicker',
        text: `${paper.year} / ${paper.journal || 'Journal not listed'}`
      }),
      createElement('h2', { text: paper.title }),
      createElement('p', {
        className: 'dossier-authors',
        text: paper.authors.join(', ')
      }),
      createElement('p', {
        className: 'dossier-description',
        text: paper.shortDescription || ''
      }),
      paperLinks(paper, 'dossier-links')
    ]
  });

export const dossierRenderer = {
  id: 'dossier',
  name: 'Dossier',
  render({ container, papers }) {
    const grouped = groupBy(papers, (paper) => paper.era || 'other');
    const eraOrder = Object.keys(grouped).sort((a, b) =>
      getEraLabel(a).localeCompare(getEraLabel(b))
    );

    const sections = eraOrder.map((era) =>
      createElement('section', {
        className: 'dossier-section',
        children: [
          createElement('h2', {
            className: 'dossier-section-title',
            text: getEraLabel(era)
          }),
          createElement('div', {
            className: 'dossier-grid',
            children: grouped[era].map(createDossier)
          })
        ]
      })
    );

    container.replaceChildren(
      createElement('div', {
        className: 'dossier-shell',
        children: sections
      })
    );
  }
};
