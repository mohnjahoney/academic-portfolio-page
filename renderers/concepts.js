import { paperConcepts } from '../paperConcepts.js';
import { createElement } from './shared.js';

const seriousConceptButtons = [
  ['doorway', 'Doorway'],
  ['question', 'Question'],
  ['reframe', 'Reframe'],
  ['pitch', 'Pitch'],
  ['detail', 'Detail']
];

const playfulConceptButtons = [
  ['haiku', 'Haiku'],
  ['limerick', 'Limerick'],
  ['aphorism', 'Aphorism'],
  ['koan', 'Koan']
];
const allConceptButtons = [
  ...seriousConceptButtons,
  ...playfulConceptButtons
];

const paragraphsFor = (text) =>
  String(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const openConceptDialog = ({ dialog, title, label, text }) => {
  const body =
    ['Haiku', 'Limerick'].includes(label)
      ? [
          createElement('p', {
            className: 'concept-dialog-poem',
            text
          })
        ]
      : paragraphsFor(text).map((paragraph) =>
          createElement('p', { text: paragraph })
        );

  dialog.replaceChildren(
    createElement('p', {
      className: 'concept-dialog-label',
      text: label
    }),
    createElement('h2', { text: title }),
    createElement('div', {
      className: 'concept-dialog-body',
      children: body
    })
  );

  dialog.showModal();
};

const createConceptNode = (paper) => {
  const concept = paperConcepts[paper.id];

  return createElement('article', {
    className: concept ? 'concept-node' : 'concept-node is-empty',
    attrs: { tabindex: concept ? '0' : undefined },
    children: [createElement('h2', { text: paper.title })]
  });
};

const positionOverlay = ({ overlay, node }) => {
  const rect = node.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 16;
  const width = Math.min(520, viewportWidth - margin * 2);
  const height = Math.min(250, viewportHeight - margin * 2);
  const nodeCenterX = rect.left + rect.width / 2;
  const nodeCenterY = rect.top + rect.height / 2;
  const viewportCenterX = viewportWidth / 2;
  const viewportCenterY = viewportHeight / 2;
  const preferredLeft =
    nodeCenterX < viewportCenterX ? rect.left : rect.right - width;
  const preferredTop =
    nodeCenterY < viewportCenterY ? rect.top : rect.bottom - height;
  const left = Math.max(
    margin,
    Math.min(preferredLeft, viewportWidth - width - margin)
  );
  const top = Math.max(
    margin,
    Math.min(preferredTop, viewportHeight - height - margin)
  );

  overlay.style.left = `${left}px`;
  overlay.style.top = `${top}px`;
  overlay.style.width = `${width}px`;
  overlay.style.minHeight = `${height}px`;
};

const createConceptOverlay = ({ node, paper, dialog }) => {
  const concept = paperConcepts[paper.id];
  const overlay = createElement('article', {
    className: 'concept-node-overlay',
    children: [
      createElement('h2', { text: paper.title }),
      createElement('div', {
        className: 'concept-node-action-group',
        children: seriousConceptButtons
          .filter(([key]) => concept[key])
          .map(([, label]) =>
            createElement('button', {
              text: label,
              attrs: { type: 'button' }
            })
          )
      }),
      createElement('div', {
        className: 'concept-node-action-group is-playful',
        children: playfulConceptButtons
          .filter(([key]) => concept[key])
          .map(([, label]) =>
            createElement('button', {
              text: label,
              attrs: { type: 'button' }
            })
          )
      })
    ]
  });

  const buttons = overlay.querySelectorAll('button');
  const activeButtons = allConceptButtons.filter(([key]) => concept[key]);

  buttons.forEach((button, index) => {
    const [key, label] = activeButtons[index];
    button.addEventListener('click', () => {
      openConceptDialog({
        dialog,
        title: paper.title,
        label,
        text: concept[key]
      });
    });
  });

  positionOverlay({ overlay, node });
  return overlay;
};

const wireConceptOverlay = ({ node, paper, dialog }) => {
  const concept = paperConcepts[paper.id];
  if (!concept) return;

  let overlay;
  let hideTimer;

  const showOverlay = () => {
    window.clearTimeout(hideTimer);

    if (!overlay) {
      overlay = createConceptOverlay({ node, paper, dialog });
      document.body.append(overlay);

      overlay.addEventListener('mouseenter', showOverlay);
      overlay.addEventListener('mouseleave', hideOverlay);
      overlay.addEventListener('focusin', showOverlay);
      overlay.addEventListener('focusout', hideOverlay);
    }

    positionOverlay({ overlay, node });
    overlay.classList.add('is-visible');
    node.classList.add('has-overlay');
  };

  const removeOverlay = () => {
    if (
      overlay?.matches(':hover, :focus-within') ||
      node.matches(':hover, :focus-within')
    ) {
      return;
    }

    overlay?.remove();
    overlay = undefined;
    node.classList.remove('has-overlay');
  };

  function hideOverlay() {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(removeOverlay, 120);
  }

  node.addEventListener('mouseenter', showOverlay);
  node.addEventListener('mouseleave', hideOverlay);
  node.addEventListener('focusin', showOverlay);
  node.addEventListener('focusout', hideOverlay);
  window.addEventListener('resize', () => {
    if (overlay) positionOverlay({ overlay, node });
  });
  window.addEventListener('scroll', () => {
    if (overlay) positionOverlay({ overlay, node });
  }, { passive: true });
};

export const conceptsRenderer = {
  id: 'concepts',
  name: 'Concepts',
  render({ container, papers }) {
    const dialog = createElement('dialog', {
      className: 'concept-dialog'
    });
    const nodes = papers.map((paper) => createConceptNode(paper, dialog));

    nodes.forEach((node, index) => {
      wireConceptOverlay({ node, paper: papers[index], dialog });
    });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    container.replaceChildren(
      createElement('section', {
        className: 'concepts-page',
        children: nodes
      }),
      dialog
    );
  }
};
