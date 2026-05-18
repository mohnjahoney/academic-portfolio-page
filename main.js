import { papers } from './papers.js';
import { authors } from './authors.js';
import { renderers } from './renderers/index.js';

const DEFAULT_RENDERER = 'bare';

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
    ['Authors', '?page=authors']
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

renderSwitcher();
renderSiteNav();

if (activePage === 'authors') {
  document.documentElement.dataset.page = 'authors';
  pageTitle.textContent = 'Authors';
  renderAuthorsPage();
} else {
  document.documentElement.dataset.page = 'papers';
  document.documentElement.dataset.renderer = activeRenderer.id;
  pageTitle.textContent = 'Academic Papers';
  activeRenderer.render({ container: app, papers });
}
