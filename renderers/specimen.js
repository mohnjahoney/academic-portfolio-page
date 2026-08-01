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
        loading: 'lazy',
        draggable: 'false'
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

  const frame = createElement('div', {
    className: 'specimen-figure-frame',
    attrs: {
      title: 'Click the left or right half to change figures'
    },
    children: figureElements
  });

  frame.addEventListener('click', (event) => {
    if (
      figures.length < 2 ||
      !carousel.closest('.specimen-card')?.classList.contains('is-active')
    ) {
      return;
    }

    const bounds = frame.getBoundingClientRect();
    const direction = event.clientX < bounds.left + bounds.width / 2 ? -1 : 1;

    stopTimer();
    showFigure((activeIndex + direction + figures.length) % figures.length);
  });

  carousel.className = 'specimen-figure-carousel';
  carousel.setAttribute('aria-label', `${paper.title} figures`);
  carousel.removeAttribute('aria-hidden');
  carousel.replaceChildren(
    frame,
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
          createElement('span', { text: paper.journal || 'Journal not listed' }),
          createElement('span', { text: paper.year })
        ]
      }),
      paperLinks(paper, 'specimen-links')
    ]
  });

export const specimenRenderer = {
  id: 'specimen',
  name: 'Specimen',
  render({ container, papers }) {
    const cards = papers.map(createSpecimen);
    const status = createElement('span', {
      className: 'specimen-stack-status',
      text: `1 / ${papers.length}`,
      attrs: {
        'aria-live': 'polite',
        'aria-atomic': 'true'
      }
    });
    const previousButton = createElement('button', {
      text: '←',
      attrs: {
        type: 'button',
        'aria-label': 'Previous paper',
        disabled: 'true'
      }
    });
    const nextButton = createElement('button', {
      text: '→',
      attrs: {
        type: 'button',
        'aria-label': 'Next paper'
      }
    });
    const stage = createElement('div', {
      className: 'specimen-stage',
      children: [
        createElement('span', {
          className: 'specimen-stack-label is-left',
          text: 'Viewed'
        }),
        createElement('span', {
          className: 'specimen-stack-label is-right',
          text: 'Up next'
        }),
        createElement('div', {
          className: 'specimen-stack-toolbar',
          children: [previousButton, status, nextButton]
        }),
        ...cards,
        createElement('p', {
          className: 'specimen-stack-hint',
          text: 'Swipe or scroll sideways'
        })
      ]
    });
    const rail = createElement('div', {
      className: 'specimen-rail',
      children: [
        ...papers.map(() =>
          createElement('span', {
            className: 'specimen-snap-point',
            attrs: { 'aria-hidden': 'true' }
          })
        ),
        stage
      ]
    });
    const shell = createElement('section', {
      className: 'specimen-shell',
      attrs: {
        tabindex: '0',
        'aria-label': 'Paper specimen stack'
      },
      children: [rail]
    });

    let step = 1;
    let activeIndex = 0;
    let frame;
    const snapPoints = [...rail.querySelectorAll('.specimen-snap-point')];
    const cardControls = cards.map((card) => [
      ...card.querySelectorAll('a, button')
    ]);
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const goTo = (index, behavior = 'smooth') => {
      const nextIndex = Math.min(Math.max(index, 0), papers.length - 1);
      const left = nextIndex * step;

      if (Math.abs(shell.scrollLeft - left) < 1) return;

      shell.scrollTo({
        left,
        behavior: reducedMotion.matches ? 'auto' : behavior
      });
    };

    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('is-active')) {
          goTo(index);
        }
      });
    });

    const mix = (start, end, amount) => start + (end - start) * amount;

    const updateCards = () => {
      frame = undefined;

      const progress = step > 0 ? shell.scrollLeft / step : 0;
      const nextActiveIndex = Math.min(
        Math.max(Math.round(progress), 0),
        papers.length - 1
      );
      const viewportWidth = shell.clientWidth;
      const cardWidth = cards[0]?.offsetWidth || 360;
      const stackCenter = Math.min(
        Math.max(cardWidth * 0.34, 86),
        viewportWidth * 0.14
      );
      const leftX = stackCenter - viewportWidth / 2;
      const rightX = -leftX;
      const stackScale = viewportWidth < 760 ? 0.68 : 0.78;

      cards.forEach((card, index) => {
        const delta = index - progress;
        const isLeft = delta < -0.5;
        const isRight = delta > 0.5;
        const depth = Math.min(7, Math.max(1, Math.round(Math.abs(delta))));
        const stackY = depth * 2.5;
        const stackRotation =
          (index % 2 === 0 ? -1 : 1) * (2.4 + depth * 0.35);
        let x;
        let y;
        let scale;
        let rotation;

        if (delta <= -1) {
          x = leftX + depth * 2;
          y = stackY;
          scale = stackScale;
          rotation = -stackRotation;
        } else if (delta < 0) {
          const amount = delta + 1;
          x = mix(leftX, 0, amount);
          y = mix(stackY, 0, amount);
          scale = mix(stackScale, 1, amount);
          rotation = mix(-stackRotation, 0, amount);
        } else if (delta <= 1) {
          x = mix(0, rightX, delta);
          y = mix(0, stackY, delta);
          scale = mix(1, stackScale, delta);
          rotation = mix(0, stackRotation, delta);
        } else {
          x = rightX - depth * 2;
          y = stackY;
          scale = stackScale;
          rotation = stackRotation;
        }

        card.style.setProperty('--specimen-x', `${x}px`);
        card.style.setProperty('--specimen-y', `${y}px`);
        card.style.setProperty('--specimen-scale', String(scale));
        card.style.setProperty('--specimen-rotation', `${rotation}deg`);
        card.style.zIndex = String(
          Math.abs(delta) <= 1
            ? 1000 - Math.round(Math.abs(delta) * 20)
            : isLeft
              ? 100 + index
              : 100 + papers.length - index
        );
        card.classList.toggle('is-active', index === nextActiveIndex);
        card.classList.toggle('is-left-stack', isLeft);
        card.classList.toggle('is-right-stack', isRight);
        card.setAttribute(
          'aria-hidden',
          index === nextActiveIndex ? 'false' : 'true'
        );
        cardControls[index].forEach((control) => {
          if (index === nextActiveIndex) {
            control.removeAttribute('tabindex');
          } else {
            control.setAttribute('tabindex', '-1');
          }
        });
      });

      if (activeIndex !== nextActiveIndex) {
        activeIndex = nextActiveIndex;
        status.textContent = `${activeIndex + 1} / ${papers.length}`;
      }

      previousButton.disabled = activeIndex === 0;
      nextButton.disabled = activeIndex === papers.length - 1;
    };

    const requestCardUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateCards);
    };

    const updateGeometry = () => {
      const currentProgress = step > 0 ? shell.scrollLeft / step : activeIndex;
      const viewportWidth = shell.clientWidth;

      step = Math.min(760, Math.max(300, viewportWidth * 0.72));
      rail.style.width = `${viewportWidth + step * (papers.length - 1)}px`;
      snapPoints.forEach((point, index) => {
        point.style.left = `${index * step}px`;
      });
      shell.scrollLeft =
        Math.min(Math.max(currentProgress, 0), papers.length - 1) * step;
      updateCards();
    };

    shell.addEventListener('scroll', () => {
      requestCardUpdate();
    }, { passive: true });

    shell.addEventListener('wheel', (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const movingForward = event.deltaY > 0;
      const atStart = shell.scrollLeft <= 0;
      const atEnd =
        shell.scrollLeft >= shell.scrollWidth - shell.clientWidth - 1;

      if ((movingForward && atEnd) || (!movingForward && atStart)) return;

      event.preventDefault();
      shell.scrollLeft += event.deltaY;
    }, { passive: false });

    shell.addEventListener('keydown', (event) => {
      if (event.target.closest('a, button')) return;

      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        goTo(activeIndex + 1);
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goTo(activeIndex - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(papers.length - 1);
      }
    });

    previousButton.addEventListener('click', () => goTo(activeIndex - 1));
    nextButton.addEventListener('click', () => goTo(activeIndex + 1));
    window.addEventListener('resize', updateGeometry);

    container.replaceChildren(shell);
    updateGeometry();
  }
};
