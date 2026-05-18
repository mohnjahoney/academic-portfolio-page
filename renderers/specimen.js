import {
  createElement,
  getEraLabel,
  paperLinks
} from './shared.js';
import { paperFigures } from '../paperFigures.js';

const createFigureCarousel = (paper) => {
  const figures = paperFigures[paper.id] || [];

  if (figures.length === 0) {
    return null;
  }

  let activeIndex = 0;
  let timer;

  const figureElements = figures.map((figure, index) =>
    createElement('img', {
      className: index === activeIndex ? 'is-active' : '',
      attrs: {
        src: figure.src,
        alt: figure.alt,
        loading: 'lazy'
      }
    })
  );

  const controls = figures.map((_, index) =>
    createElement('button', {
      className: index === activeIndex ? 'is-active' : '',
      attrs: {
        type: 'button',
        'aria-label': `Show figure ${index + 1}`,
        'aria-current': index === activeIndex ? 'true' : undefined
      }
    })
  );

  const showFigure = (nextIndex) => {
    activeIndex = nextIndex;

    figureElements.forEach((image, index) => {
      image.classList.toggle('is-active', index === activeIndex);
    });

    controls.forEach((control, index) => {
      control.classList.toggle('is-active', index === activeIndex);

      if (index === activeIndex) {
        control.setAttribute('aria-current', 'true');
      } else {
        control.removeAttribute('aria-current');
      }
    });
  };

  const startTimer = () => {
    if (figures.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    timer = window.setInterval(() => {
      showFigure((activeIndex + 1) % figures.length);
    }, 5200);
  };

  const stopTimer = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  controls.forEach((control, index) => {
    control.addEventListener('click', () => {
      stopTimer();
      showFigure(index);
    });
  });

  const carousel = createElement('figure', {
    className: 'specimen-figure-carousel',
    attrs: { 'aria-label': `${paper.title} figures` },
    children: [
      createElement('div', {
        className: 'specimen-figure-frame',
        children: figureElements
      }),
      ...(figures.length > 1
        ? [
            createElement('div', {
              className: 'specimen-figure-controls',
              children: controls
            })
          ]
        : [])
    ]
  });

  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);
  startTimer();

  return carousel;
};

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
      createFigureCarousel(paper),
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
