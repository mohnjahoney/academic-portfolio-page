import { papers } from './papers.js';
import { renderers } from './renderers/index.js';

const DEFAULT_RENDERER = 'bare';

const app = document.querySelector('#app');
const switcher = document.querySelector('#renderer-switcher');

const params = new URLSearchParams(window.location.search);
const requestedRenderer =
  params.get('view') || params.get('renderer') || DEFAULT_RENDERER;
const activeRenderer =
  renderers.find((renderer) => renderer.id === requestedRenderer) ||
  renderers.find((renderer) => renderer.id === DEFAULT_RENDERER);

document.documentElement.dataset.renderer = activeRenderer.id;

const renderSwitcher = () => {
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

renderSwitcher();
activeRenderer.render({ container: app, papers });
