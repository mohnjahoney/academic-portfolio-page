import {
  createElement,
  getEraLabel,
  paperLinks
} from './shared.js';
import { figureSetsForPaper } from '../paperFigures.js';

const createEmptyFigureCarousel = () =>
  createElement('div', {
    className: 'specimen-figure-carousel is-empty',
    attrs: { 'aria-hidden': 'true' },
    children: [
      createElement('div', {
        className: 'specimen-figure-frame'
      }),
      createElement('div', {
        className: 'specimen-figure-controls is-placeholder'
      })
    ]
  });

const populateFigureCarousel = ({ carousel, paper, figureSet, onSetFailure }) => {
  const figures = figureSet.figures;
  let activeIndex = 0;
  let timer;
  let failed = false;

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

  figureElements.forEach((image) => {
    image.addEventListener('error', () => {
      if (!failed) {
        failed = true;
        stopTimer();
        onSetFailure();
      }
    });
  });

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

  carousel.className = 'specimen-figure-carousel';
  carousel.setAttribute('aria-label', `${paper.title} figures`);
  carousel.removeAttribute('aria-hidden');
  carousel.replaceChildren(
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
  );

  const handleMouseEnter = () => stopTimer();
  const handleMouseLeave = () => startTimer();

  carousel.addEventListener('mouseenter', handleMouseEnter);
  carousel.addEventListener('mouseleave', handleMouseLeave);
  startTimer();

  return () => {
    stopTimer();
    carousel.removeEventListener('mouseenter', handleMouseEnter);
    carousel.removeEventListener('mouseleave', handleMouseLeave);
  };
};

const createFigureCarousel = (paper) => {
  const figureSets = figureSetsForPaper(paper);

  if (!figureSets.primary) {
    return createEmptyFigureCarousel();
  }

  const carousel = createElement('figure');
  let cleanup = () => {};

  const showEmpty = () => {
    cleanup();
    carousel.replaceWith(createEmptyFigureCarousel());
  };

  const showSet = (figureSet) => {
    cleanup();
    cleanup = populateFigureCarousel({
      carousel,
      paper,
      figureSet,
      onSetFailure: () => {
        if (figureSet.source === 'by-hand' && figureSets.fallback) {
          showSet(figureSets.fallback);
        } else {
          showEmpty();
        }
      }
    });
  };

  showSet(figureSets.primary);

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
