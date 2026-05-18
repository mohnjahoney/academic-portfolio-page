import {
  createElement,
  getEraLabel,
  groupBy,
  paperLinks
} from './shared.js';

const createOrbitPaper = (paper, index, total) => {
  const angle = total <= 1 ? 0 : (index / total) * Math.PI * 2;
  const radius = 38 + (index % 3) * 12;
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius;

  return createElement('article', {
    className: `constellation-node era-${paper.era}`,
    attrs: {
      style: `--x: ${x}%; --y: ${y}%; --delay: ${index * 70}ms;`
    },
    children: [
      createElement('h3', { text: paper.title }),
      createElement('p', {
        className: 'constellation-meta',
        text: `${paper.year} / ${paper.journal || 'Journal not listed'}`
      }),
      createElement('p', {
        className: 'constellation-authors',
        text: paper.authors.join(', ')
      }),
      paperLinks(paper, 'constellation-links')
    ]
  });
};

export const constellationRenderer = {
  id: 'constellation',
  name: 'Constellation',
  render({ container, papers }) {
    const grouped = groupBy(papers, (paper) => paper.era || 'other');
    const eras = Object.keys(grouped);

    const fields = eras.map((era) =>
      createElement('section', {
        className: `constellation-field era-${era}`,
        children: [
          createElement('h2', { text: getEraLabel(era) }),
          createElement('div', {
            className: 'constellation-map',
            children: grouped[era].map((paper, index) =>
              createOrbitPaper(paper, index, grouped[era].length)
            )
          })
        ]
      })
    );

    container.replaceChildren(
      createElement('div', {
        className: 'constellation-shell',
        children: fields
      })
    );
  }
};
