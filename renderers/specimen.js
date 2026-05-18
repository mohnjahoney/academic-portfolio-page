import {
  createElement,
  getEraLabel,
  paperLinks
} from './shared.js';

const createSpecimen = (paper, index) =>
  createElement('article', {
    className: `specimen-card era-${paper.era}`,
    attrs: { style: `--tilt: ${index % 2 === 0 ? '-1.2deg' : '1.2deg'};` },
    children: [
      createElement('div', {
        className: 'specimen-number',
        text: String(index + 1).padStart(2, '0')
      }),
      createElement('div', {
        className: 'specimen-era',
        text: getEraLabel(paper.era)
      }),
      createElement('h2', { text: paper.title }),
      createElement('p', {
        className: 'specimen-authors',
        text: paper.authors.join(', ')
      }),
      createElement('div', {
        className: 'specimen-facts',
        children: [
          createElement('span', { text: paper.year }),
          createElement('span', { text: paper.journal || 'Journal not listed' }),
          createElement('span', {
            text: `${paper.tags?.length || 0} tags`
          })
        ]
      }),
      paperLinks(paper, 'specimen-links')
    ]
  });

export const specimenRenderer = {
  id: 'specimen',
  name: 'Specimen',
  render({ container, papers }) {
    container.replaceChildren(
      createElement('section', {
        className: 'specimen-shell',
        children: [
          createElement('div', {
            className: 'specimen-rail',
            children: papers.map(createSpecimen)
          })
        ]
      })
    );
  }
};
