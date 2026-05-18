import { papers } from './papers.js';
import { authors } from './authors.js';
import { renderers } from './renderers/index.js';
import { figureSetsForPaper } from './paperFigures.js';

const DEFAULT_RENDERER = 'bare';
const DEFAULT_IMAGE_RENDERER = 'masonry';

const app = document.querySelector('#app');
const pageTitle = document.querySelector('#page-title');
const siteNav = document.querySelector('#site-nav');
const switcher = document.querySelector('#renderer-switcher');

const params = new URLSearchParams(window.location.search);
const activePage = params.get('page') || 'papers';
const requestedRenderer =
  params.get('view') || params.get('renderer') || DEFAULT_RENDERER;
const activeRenderer =
  renderers.find((renderer) => renderer.id === requestedRenderer) ||
  renderers.find((renderer) => renderer.id === DEFAULT_RENDERER);
const requestedImageRenderer = params.get('view') || DEFAULT_IMAGE_RENDERER;

const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }

  if (options.text !== undefined) {
    element.textContent = options.text;
  }

  Object.entries(options.attrs || {}).forEach(([name, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(name, value);
    }
  });

  (options.children || []).forEach((child) => {
    if (child !== undefined && child !== null) {
      element.append(child);
    }
  });

  return element;
};

const createLink = (label, href) =>
  createElement('a', {
    text: label,
    attrs: { href }
  });

const renderSiteNav = () => {
  const links = [
    ['Papers', `?view=${activeRenderer.id}`],
    ['Authors', '?page=authors'],
    ['Images', `?page=images&view=${DEFAULT_IMAGE_RENDERER}`]
  ].map(([label, href]) => {
    const link = createLink(label, href);
    const pageForLink = label.toLowerCase();

    if (pageForLink === activePage) {
      link.setAttribute('aria-current', 'page');
    }

    return link;
  });

  siteNav.replaceChildren(...links);
};

const renderSwitcher = () => {
  if (activePage === 'images') {
    const label = document.createElement('span');
    label.className = 'switcher-label';
    label.textContent = 'View';

    const options = document.createElement('div');
    options.className = 'switcher-options';

    imageRenderers.forEach((renderer) => {
      const link = document.createElement('a');
      link.href = `?page=images&view=${renderer.id}`;
      link.textContent = renderer.name;

      if (renderer.id === activeImageRenderer.id) {
        link.setAttribute('aria-current', 'page');
      }

      options.append(link);
    });

    switcher.replaceChildren(label, options);
    return;
  }

  if (activePage !== 'papers') {
    switcher.replaceChildren();
    return;
  }

  const label = document.createElement('span');
  label.className = 'switcher-label';
  label.textContent = 'View';

  const options = document.createElement('div');
  options.className = 'switcher-options';

  renderers.forEach((renderer) => {
    const link = document.createElement('a');
    link.href = `?view=${renderer.id}`;
    link.textContent = renderer.name;

    if (renderer.id === activeRenderer.id) {
      link.setAttribute('aria-current', 'page');
    }

    options.append(link);
  });

  switcher.replaceChildren(label, options);
};

const authorCurrentInstitution = (author) =>
  author.currentPosition?.organization ||
  author.latestAcademicPosition?.organization ||
  author.institutions?.[0] ||
  'Not listed';

const authorCurrentEmail = (author) => author.emails?.[0] || 'Not listed';

const createAuthorItem = (author) =>
  createElement('li', {
    className: author.focusAuthor ? 'author-item focus-author' : 'author-item',
    children: [
      createElement('h2', { text: author.name }),
      createElement('p', {
        text: `Papers co-authored: ${author.authoredPaperIds.length}`
      }),
      createElement('p', {
        text: `Current email: ${authorCurrentEmail(author)}`
      }),
      createElement('p', {
        text: `Current institution: ${authorCurrentInstitution(author)}`
      })
    ]
  });

const renderAuthorsPage = () => {
  const sortedAuthors = [...authors].sort((a, b) => {
    const paperCountDifference =
      b.authoredPaperIds.length - a.authoredPaperIds.length;

    if (paperCountDifference !== 0) {
      return paperCountDifference;
    }

    return a.name.localeCompare(b.name);
  });

  const list = createElement('ol', {
    className: 'authors-list',
    children: sortedAuthors.map(createAuthorItem)
  });

  app.replaceChildren(
    createElement('section', {
      className: 'authors-page',
      children: [list]
    })
  );
};

const seededValue = (text) => {
  let hash = 2166136261;

  for (const character of text) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 4294967295;
};

const shuffled = (items) =>
  [...items].sort(
    (a, b) =>
      seededValue(`${a.paperId}:${a.index}:${a.src}`) -
      seededValue(`${b.paperId}:${b.index}:${b.src}`)
  );

const imageEntriesForPapers = (paperList, sourceOverrides = {}) =>
  paperList.flatMap((paper) => {
    const figureSets = figureSetsForPaper(paper);
    const figureSet =
      sourceOverrides[paper.id] === 'auto'
        ? figureSets.fallback || figureSets.primary
        : figureSets.primary;

    if (!figureSet) return [];

    return figureSet.figures.map((figure, index) => ({
      ...figure,
      index,
      paperId: paper.id,
      paperTitle: paper.title,
      source: figureSet.source,
      hasAutoFallback: figureSet.source === 'by-hand' && Boolean(figureSets.fallback)
    }));
  });

const placeholderImageRenderer = (name) => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name,
  render({ container }) {
    container.replaceChildren(
      createElement('section', {
        className: 'image-placeholder-page'
      })
    );
  }
});

const masonryImageRenderer = {
  id: 'masonry',
  name: 'Masonry',
  render({ container, papers: paperList }) {
    const sourceOverrides = {};

    const renderMasonry = () => {
      const entries = shuffled(imageEntriesForPapers(paperList, sourceOverrides));

      container.replaceChildren(
        createElement('section', {
          className: 'image-masonry-page',
          children: entries.map((entry) => {
            const image = createElement('img', {
              attrs: {
                src: entry.src,
                alt: entry.alt,
                loading: 'lazy'
              }
            });

            image.addEventListener('error', () => {
              if (entry.source === 'by-hand' && entry.hasAutoFallback) {
                sourceOverrides[entry.paperId] = 'auto';
                renderMasonry();
                return;
              }

              image.replaceWith(
                createElement('div', {
                  className: 'image-masonry-blank',
                  attrs: { 'aria-hidden': 'true' }
                })
              );
            });

            return createElement('figure', {
              className: 'image-masonry-item',
              children: [image]
            });
          })
        })
      );
    };

    renderMasonry();
  }
};

const imageRenderers = [
  masonryImageRenderer,
  placeholderImageRenderer('Contact Sheet'),
  placeholderImageRenderer('Focus Wall'),
  placeholderImageRenderer('Sequence')
];

const activeImageRenderer =
  imageRenderers.find((renderer) => renderer.id === requestedImageRenderer) ||
  imageRenderers.find((renderer) => renderer.id === DEFAULT_IMAGE_RENDERER);

renderSwitcher();
renderSiteNav();

if (activePage === 'authors') {
  document.documentElement.dataset.page = 'authors';
  pageTitle.textContent = 'Authors';
  renderAuthorsPage();
} else if (activePage === 'images') {
  document.documentElement.dataset.page = 'images';
  document.documentElement.dataset.renderer = activeImageRenderer.id;
  pageTitle.textContent = 'Images';
  activeImageRenderer.render({ container: app, papers });
} else {
  document.documentElement.dataset.page = 'papers';
  document.documentElement.dataset.renderer = activeRenderer.id;
  pageTitle.textContent = 'Academic Papers';
  activeRenderer.render({ container: app, papers });
}
