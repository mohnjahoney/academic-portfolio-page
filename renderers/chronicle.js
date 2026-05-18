import {
  createElement,
  getEraLabel,
  groupBy,
  paperLinks,
  sortedYears
} from './shared.js';

const createPaperNode = (paper) =>
  createElement('article', {
    className: `chronicle-paper era-${paper.era}`,
    children: [
      createElement('div', {
        className: 'chronicle-journal',
        text: paper.journal || 'Journal not listed'
      }),
      createElement('h3', { text: paper.title }),
      createElement('p', {
        className: 'chronicle-authors',
        text: paper.authors.join(', ')
      }),
      paperLinks(paper, 'chronicle-links')
    ]
  });

export const chronicleRenderer = {
  id: 'chronicle',
  name: 'Chronicle',
  render({ container, papers }) {
    const grouped = groupBy(papers, (paper) => paper.year);
    const years = sortedYears(papers);

    const legend = createElement('div', {
      className: 'chronicle-legend',
      children: [...new Set(papers.map((paper) => paper.era))].map((era) =>
        createElement('span', {
          className: `legend-chip era-${era}`,
          text: getEraLabel(era)
        })
      )
    });

    const timeline = createElement('div', {
      className: 'chronicle-timeline',
      children: years.map((year) =>
        createElement('section', {
          className: 'chronicle-year',
          children: [
            createElement('h2', { text: year }),
            createElement('div', {
              className: 'chronicle-year-papers',
              children: grouped[year].map(createPaperNode)
            })
          ]
        })
      )
    });

    container.replaceChildren(
      createElement('section', {
        className: 'chronicle-shell',
        children: [legend, timeline]
      })
    );
  }
};
