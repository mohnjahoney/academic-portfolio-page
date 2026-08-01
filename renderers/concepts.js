import { paperConcepts } from '../paperConcepts.js';
import { createElement } from './shared.js';

const seriousConceptModes = [
  ['doorway', 'Doorway'],
  ['question', 'Question'],
  ['reframe', 'Reframe'],
  ['pitch', 'Pitch'],
  ['detail', 'Detail']
];

const playfulConceptModes = [
  ['haiku', 'Haiku'],
  ['limerick', 'Limerick'],
  ['aphorism', 'Aphorism'],
  ['koan', 'Koan']
];

const allConceptModes = [...seriousConceptModes, ...playfulConceptModes];
const modeLabels = Object.fromEntries(allConceptModes);

const paragraphsFor = (text) =>
  String(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const resultBodyFor = (mode, text) =>
  ['haiku', 'limerick'].includes(mode)
    ? [
        createElement('p', {
          className: 'concept-result-poem',
          text
        })
      ]
    : paragraphsFor(text).map((paragraph) =>
        createElement('p', { text: paragraph })
      );

const createConceptNode = (paper) => {
  const concept = paperConcepts[paper.id];

  return createElement('article', {
    className: concept ? 'concept-node' : 'concept-node is-empty',
    attrs: concept
      ? {
          tabindex: '0',
          role: 'button',
          'aria-haspopup': 'dialog',
          'aria-expanded': 'false',
          'aria-label': `Explore concepts for ${paper.title}`
        }
      : undefined,
    children: [createElement('h2', { text: paper.title })]
  });
};

const createModeButton = ([key, label], playful = false) =>
  createElement('button', {
    className: playful ? 'is-playful' : '',
    text: label,
    attrs: {
      type: 'button',
      'data-mode': key,
      'aria-pressed': key === 'doorway' ? 'true' : 'false'
    }
  });

const createModeBar = () =>
  createElement('div', {
    className: 'concept-mode-bar',
    attrs: {
      role: 'toolbar',
      'aria-label': 'Concept interpretation'
    },
    children: [
      createElement('span', {
        className: 'concept-mode-label',
        text: 'Interpret as'
      }),
      createElement('div', {
        className: 'concept-mode-group',
        children: seriousConceptModes.map((mode) => createModeButton(mode))
      }),
      createElement('div', {
        className: 'concept-mode-group is-playful',
        children: playfulConceptModes.map((mode) =>
          createModeButton(mode, true)
        )
      })
    ]
  });

const positionOverlay = ({ overlay, node }) => {
  const rect = node.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 16;
  const width = Math.min(620, viewportWidth - margin * 2);
  const maxHeight = viewportHeight - margin * 2;

  overlay.style.width = `${width}px`;
  overlay.style.maxHeight = `${maxHeight}px`;

  const height = Math.min(overlay.scrollHeight, maxHeight);
  const nodeCenterX = rect.left + rect.width / 2;
  const nodeCenterY = rect.top + rect.height / 2;
  const preferredLeft =
    nodeCenterX < viewportWidth / 2 ? rect.left : rect.right - width;
  const preferredTop =
    nodeCenterY < viewportHeight / 2 ? rect.top : rect.bottom - height;
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
};

export const conceptsRenderer = {
  id: 'concepts',
  name: 'Concepts [experimental]',
  render({ container, papers }) {
    const nodes = papers.map(createConceptNode);
    const modeBar = createModeBar();
    const closeButton = createElement('button', {
      className: 'concept-result-close',
      text: '×',
      attrs: {
        type: 'button',
        'aria-label': 'Close pinned concept'
      }
    });
    const overlay = createElement('article', {
      className: 'concept-node-overlay',
      attrs: {
        role: 'dialog',
        'aria-live': 'polite'
      }
    });
    let activeMode = 'doorway';
    let activeIndex = null;
    let pinnedIndex = null;

    const conceptFor = (index) => paperConcepts[papers[index]?.id];
    const isPinned = () => pinnedIndex !== null;

    const updateNodeStates = () => {
      nodes.forEach((node, index) => {
        const isActiveNode = index === activeIndex;
        const isPinnedNode = index === pinnedIndex;

        node.classList.toggle('has-overlay', isActiveNode);
        node.classList.toggle('is-pinned', isPinnedNode);
        if (!node.classList.contains('is-empty')) {
          node.setAttribute(
            'aria-expanded',
            isActiveNode ? 'true' : 'false'
          );
        }
      });
    };

    const renderOverlay = () => {
      if (activeIndex === null) return;

      const paper = papers[activeIndex];
      const concept = conceptFor(activeIndex);
      const text = concept?.[activeMode] || 'No interpretation is available.';

      overlay.replaceChildren(
        createElement('div', {
          className: 'concept-result-header',
          children: [
            createElement('div', {
              children: [
                createElement('p', {
                  className: 'concept-result-label',
                  text: modeLabels[activeMode]
                }),
                createElement('h2', { text: paper.title })
              ]
            }),
            closeButton
          ]
        }),
        createElement('div', {
          className: 'concept-result-body',
          children: resultBodyFor(activeMode, text)
        }),
        createElement('p', {
          className: 'concept-result-pin-hint',
          text: 'Pinned · choose another mode or click the card area to close'
        })
      );

      overlay.classList.toggle('is-pinned', isPinned());
      overlay.setAttribute(
        'aria-label',
        `${modeLabels[activeMode]} for ${paper.title}`
      );
      positionOverlay({ overlay, node: nodes[activeIndex] });
    };

    const pinPaper = (index) => {
      if (!conceptFor(index)) return;

      pinnedIndex = index;
      activeIndex = index;
      renderOverlay();
      overlay.classList.add('is-visible');
      updateNodeStates();
    };

    const closeOverlay = ({ restoreFocus = false } = {}) => {
      const nodeToFocus =
        restoreFocus && pinnedIndex !== null ? nodes[pinnedIndex] : null;

      pinnedIndex = null;
      activeIndex = null;
      overlay.classList.remove('is-visible', 'is-pinned');
      updateNodeStates();
      nodeToFocus?.focus();
    };

    const setMode = (mode) => {
      activeMode = mode;
      modeBar.querySelectorAll('button').forEach((button) => {
        button.setAttribute(
          'aria-pressed',
          button.dataset.mode === activeMode ? 'true' : 'false'
        );
      });

      if (activeIndex !== null) {
        renderOverlay();
      }
    };

    modeBar.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => setMode(button.dataset.mode));
    });
    modeBar.addEventListener('click', (event) => event.stopPropagation());

    nodes.forEach((node, index) => {
      if (!conceptFor(index)) return;

      node.addEventListener('click', (event) => {
        event.stopPropagation();

        if (isPinned()) {
          closeOverlay();
        } else {
          pinPaper(index);
        }
      });
      node.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();

          if (isPinned()) {
            closeOverlay({ restoreFocus: true });
          } else {
            pinPaper(index);
          }
        }
      });
    });

    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closeOverlay({ restoreFocus: true });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isPinned()) {
        closeOverlay({ restoreFocus: true });
      }
    });

    window.addEventListener('resize', () => {
      if (activeIndex !== null) {
        positionOverlay({ overlay, node: nodes[activeIndex] });
      }
    });
    window.addEventListener('scroll', () => {
      if (activeIndex !== null) {
        positionOverlay({ overlay, node: nodes[activeIndex] });
      }
    }, { passive: true });

    const conceptsPage = createElement('section', {
      className: 'concepts-page',
      children: [
        createElement('aside', {
          className: 'concepts-notice',
          text:
            'Machine-generated interpretations of the archive material: useful for exploration, unreliable as fact.',
          attrs: { role: 'note' }
        }),
        modeBar,
        ...nodes
      ]
    });

    conceptsPage.addEventListener('click', () => {
      if (isPinned()) closeOverlay();
    });

    container.replaceChildren(conceptsPage);
    document.body.append(overlay);
  }
};
