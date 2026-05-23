import { papers } from './papers.js';
import { authors } from './authors.js';
import {
  authorRenderers,
  sortedAuthorsByPaperCount
} from './renderers/authors.js';
import { renderers } from './renderers/index.js';
import { createElement } from './renderers/shared.js';
import { figureSetsForPaper } from './paperFigures.js';

const DEFAULT_RENDERER = 'specimen';
const DEFAULT_IMAGE_RENDERER = 'gallery';
const DEFAULT_AUTHOR_RENDERER = 'list';

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
const requestedAuthorRenderer = params.get('view') || DEFAULT_AUTHOR_RENDERER;
const requestedAuthorMapStyle = params.get('map') || 'political';
const activeAuthorRenderer =
  authorRenderers.find((renderer) => renderer.id === requestedAuthorRenderer) ||
  authorRenderers.find((renderer) => renderer.id === DEFAULT_AUTHOR_RENDERER);

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
  if (activePage === 'authors') {
    const label = document.createElement('span');
    label.className = 'switcher-label';
    label.textContent = 'View';

    const options = document.createElement('div');
    options.className = 'switcher-options';

    authorRenderers.forEach((renderer) => {
      const link = document.createElement('a');
      link.href = `?page=authors&view=${renderer.id}`;
      link.textContent = renderer.name;

      if (renderer.id === activeAuthorRenderer.id) {
        link.setAttribute('aria-current', 'page');
      }

      options.append(link);
    });

    switcher.replaceChildren(label, options);
    return;
  }

  if (activePage === 'images') {
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

const imageEntriesForPaper = (paper, sourceOverrides = {}) => {
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
};

const justifiedRowsLayout = ({ items, width, height, gap }) => {
  if (!items.length || width <= 0 || height <= 0) return [];

  const targetRowHeight = Math.min(
    320,
    Math.max(115, height / Math.max(1.8, Math.ceil(Math.sqrt(items.length))))
  );
  const rows = [];
  let row = [];
  let rowAspectRatio = 0;

  items.forEach((item) => {
    row.push(item);
    rowAspectRatio += item.aspectRatio;

    const projectedWidth = rowAspectRatio * targetRowHeight + gap * (row.length - 1);

    if (projectedWidth >= width * 0.92) {
      rows.push(row);
      row = [];
      rowAspectRatio = 0;
    }
  });

  if (row.length) rows.push(row);

  const rowLayouts = rows.map((layoutRow, rowIndex) => {
    const aspectRatioSum = layoutRow.reduce(
      (sum, item) => sum + item.aspectRatio,
      0
    );
    const availableWidth = width - gap * (layoutRow.length - 1);
    const isLastRow = rowIndex === rows.length - 1;
    const unboundedHeight = availableWidth / aspectRatioSum;
    const rowHeight = isLastRow
      ? Math.min(targetRowHeight, unboundedHeight)
      : unboundedHeight;

    return {
      height: rowHeight,
      items: layoutRow.map((item) => ({
        ...item,
        width: item.aspectRatio * rowHeight,
        height: rowHeight
      }))
    };
  });

  const contentHeight =
    rowLayouts.reduce((sum, rowLayout) => sum + rowLayout.height, 0) +
    gap * Math.max(0, rowLayouts.length - 1);
  let y = Math.max(0, (height - contentHeight) / 2);
  const positionedItems = [];

  rowLayouts.forEach((rowLayout) => {
    const rowWidth =
      rowLayout.items.reduce((sum, item) => sum + item.width, 0) +
      gap * Math.max(0, rowLayout.items.length - 1);
    let x = Math.max(0, (width - rowWidth) / 2);

    rowLayout.items.forEach((item) => {
      positionedItems.push({
        ...item,
        x,
        y
      });
      x += item.width + gap;
    });

    y += rowLayout.height + gap;
  });

  return positionedItems;
};

const imageGalleryRenderer = {
  id: 'gallery',
  name: 'Gallery',
  render({ container, papers: paperList }) {
    const sourceOverrides = {};
    let activePaperIndex = 0;
    let activeImageIndex = 0;
    // let activeLayout = 'filmstrip';
    let activeLayout = 'light-table';
    let resizeObserver = null;

    const onFilmstripKeydown = (event) => {
      if (
        activeLayout !== 'filmstrip' ||
        (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
      ) {
        return;
      }

      const entries = imageEntriesForPapers(paperList, sourceOverrides);
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      const nextIndex = Math.min(
        Math.max(activeImageIndex + direction, 0),
        entries.length - 1
      );

      if (nextIndex === activeImageIndex) return;

      event.preventDefault();
      activeImageIndex = nextIndex;
      renderPaper();
    };

    window.addEventListener('keydown', onFilmstripKeydown);

    const papersWithImages = paperList.filter(
      (paper) => imageEntriesForPaper(paper).length > 0
    );

    const renderPaper = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }

      const paper = papersWithImages[activePaperIndex];

      if (!paper) {
        container.replaceChildren(
          createElement('section', {
            className: 'image-placeholder-page'
          })
        );
        return;
      }

      const isJustifiedRows = activeLayout === 'justified';
      const entries = isJustifiedRows
        ? imageEntriesForPaper(paper, sourceOverrides)
        : imageEntriesForPapers(paperList, sourceOverrides);
      const stage = createElement('div', {
        className: isJustifiedRows
          ? 'image-paper-stage'
          : `image-paper-stage is-${activeLayout}`
      });

      const renderJustifiedRows = () => {
        stage.replaceChildren();

        const loadedItems = [];
        let pending = entries.length;
        let shouldRerender = false;

        const applyLayout = () => {
          const rect = stage.getBoundingClientRect();
          const positionedItems = justifiedRowsLayout({
            items: loadedItems,
            width: rect.width,
            height: rect.height,
            gap: 12
          });

          positionedItems.forEach((item) => {
            item.figure.style.setProperty('--x', `${item.x}px`);
            item.figure.style.setProperty('--y', `${item.y}px`);
            item.figure.style.setProperty('--w', `${item.width}px`);
            item.figure.style.setProperty('--h', `${item.height}px`);
          });
        };

        entries.forEach((entry) => {
          const image = createElement('img', {
            attrs: {
              alt: entry.alt
            }
          });
          const figure = createElement('figure', {
            className: 'image-paper-figure',
            children: [image]
          });

          stage.append(figure);

          image.addEventListener('load', () => {
            loadedItems.push({
              ...entry,
              aspectRatio: image.naturalWidth / image.naturalHeight,
              figure
            });
            pending -= 1;

            if (pending === 0 && !shouldRerender) applyLayout();
          });

          image.addEventListener('error', () => {
            pending -= 1;

            if (entry.source === 'by-hand' && entry.hasAutoFallback) {
              sourceOverrides[entry.paperId] = 'auto';
              shouldRerender = true;
              renderPaper();
              return;
            }

            figure.remove();
            if (pending === 0 && !shouldRerender) applyLayout();
          });

          image.src = entry.src;
        });

        resizeObserver = new ResizeObserver(applyLayout);
        resizeObserver.observe(stage);
      };

      const renderLightTable = () => {
        const tableEntries = shuffled(entries);
        const lightbox = createElement('dialog', {
          className: 'image-lightbox'
        });

        lightbox.addEventListener('click', (event) => {
          if (event.target === lightbox) lightbox.close();
        });

        const openLightbox = (entry) => {
          const image = createElement('img', {
            attrs: {
              src: entry.src,
              alt: entry.alt
            }
          });

          image.addEventListener('error', () => {
            if (entry.source === 'by-hand' && entry.hasAutoFallback) {
              sourceOverrides[entry.paperId] = 'auto';
              lightbox.close();
              renderPaper();
            }
          });

          lightbox.replaceChildren(
            createElement('figure', {
              className: 'image-lightbox-figure',
              children: [
                image,
                createElement('figcaption', {
                  text: entry.paperTitle
                })
              ]
            })
          );
          lightbox.showModal();
        };

        stage.replaceChildren(
          createElement('div', {
            className: 'image-light-table',
            children: tableEntries.map((entry) => {
              const image = createElement('img', {
                attrs: {
                  src: entry.src,
                  alt: entry.alt,
                  loading: 'lazy'
                }
              });
              const button = createElement('button', {
                className: 'image-light-table-item',
                attrs: {
                  type: 'button',
                  title: entry.paperTitle
                },
                children: [image]
              });

              button.addEventListener('click', () => {
                openLightbox(entry);
              });

              image.addEventListener('error', () => {
                if (entry.source === 'by-hand' && entry.hasAutoFallback) {
                  sourceOverrides[entry.paperId] = 'auto';
                  renderPaper();
                  return;
                }

                button.remove();
              });

              return button;
            })
          }),
          lightbox
        );
      };

      const renderFilmstrip = () => {
        if (!entries.length) return;

        activeImageIndex = Math.min(Math.max(activeImageIndex, 0), entries.length - 1);
        const activeEntry = entries[activeImageIndex];
        const activeImage = createElement('img', {
          attrs: {
            src: activeEntry.src,
            alt: activeEntry.alt
          }
        });
        const previousImageButton = createElement('button', {
          text: 'Previous',
          attrs: {
            type: 'button',
            disabled: activeImageIndex === 0 ? 'true' : null
          }
        });
        const nextImageButton = createElement('button', {
          text: 'Next',
          attrs: {
            type: 'button',
            disabled: activeImageIndex === entries.length - 1 ? 'true' : null
          }
        });

        previousImageButton.addEventListener('click', () => {
          activeImageIndex -= 1;
          renderPaper();
        });
        nextImageButton.addEventListener('click', () => {
          activeImageIndex += 1;
          renderPaper();
        });
        activeImage.addEventListener('error', () => {
          if (activeEntry.source === 'by-hand' && activeEntry.hasAutoFallback) {
            sourceOverrides[activeEntry.paperId] = 'auto';
            renderPaper();
            return;
          }

          activeImage.remove();
        });

        const thumbnails = entries.map((entry, index) => {
          const thumbnail = createElement('img', {
            attrs: {
              src: entry.src,
              alt: ''
            }
          });
          const button = createElement('button', {
            className:
              index === activeImageIndex
                ? 'image-filmstrip-thumbnail is-active'
                : 'image-filmstrip-thumbnail',
            attrs: {
              type: 'button',
              'aria-label': `View ${entry.alt}`,
              'aria-pressed': index === activeImageIndex ? 'true' : 'false'
            },
            children: [thumbnail]
          });

          button.addEventListener('click', () => {
            activeImageIndex = index;
            renderPaper();
          });

          return button;
        });

        stage.replaceChildren(
          createElement('div', {
            className: 'image-filmstrip-focus',
            children: [
              createElement('div', {
                className: 'image-filmstrip-display',
                children: [activeImage]
              }),
              createElement('div', {
                className: 'image-filmstrip-caption',
                children: [
                  createElement('p', { text: activeEntry.paperTitle }),
                  createElement('span', {
                    text: `${activeImageIndex + 1} / ${entries.length}`
                  }),
                  createElement('div', {
                    className: 'image-filmstrip-nav',
                    children: [previousImageButton, nextImageButton]
                  })
                ]
              }),
              createElement('div', {
                className: 'image-filmstrip-thumbnails',
                children: thumbnails
              })
            ]
          })
        );
      };

      const layoutButtons = [
        ['justified', 'Justified Rows'],
        ['light-table', 'Light Table'],
        ['filmstrip', 'Filmstrip / Focus']
      ].map(([layout, label]) => {
        const button = createElement('button', {
          text: label,
          attrs: {
            type: 'button',
            'aria-pressed': activeLayout === layout ? 'true' : 'false'
          }
        });

        button.addEventListener('click', () => {
          if (layout === activeLayout) return;

          activeLayout = layout;
          renderPaper();
        });

        return button;
      });

      const previousButton = createElement('button', {
        text: 'Previous',
        attrs: {
          type: 'button',
          disabled: activePaperIndex === 0 ? 'true' : null
        }
      });
      const nextButton = createElement('button', {
        text: 'Next',
        attrs: {
          type: 'button',
          disabled:
            activePaperIndex === papersWithImages.length - 1 ? 'true' : null
        }
      });

      previousButton.addEventListener('click', () => {
        activePaperIndex = Math.max(0, activePaperIndex - 1);
        renderPaper();
      });
      nextButton.addEventListener('click', () => {
        activePaperIndex = Math.min(
          papersWithImages.length - 1,
          activePaperIndex + 1
        );
        renderPaper();
      });

      container.replaceChildren(
        createElement('section', {
          className: 'image-paper-carousel-page',
          children: [
            createElement('div', {
              className: 'image-paper-carousel-toolbar',
              children: [
                createElement('div', {
                  className: 'image-paper-layout-toggle',
                  attrs: { 'aria-label': 'Paper image layout' },
                  children: layoutButtons
                }),
                ...(isJustifiedRows
                  ? [
                      createElement('div', {
                        className: 'image-paper-carousel-nav',
                        children: [
                          previousButton,
                          createElement('span', {
                            text: `${activePaperIndex + 1} / ${papersWithImages.length}`
                          }),
                          nextButton
                        ]
                      })
                    ]
                  : [])
              ]
            }),
            createElement('article', {
              className: 'image-paper-carousel-card',
              children: [
                createElement('header', {
                  className: 'image-paper-carousel-header',
                  children: [
                    createElement('h2', {
                      text:
                        activeLayout === 'light-table'
                          ? 'Light Table'
                          : activeLayout === 'filmstrip'
                            ? 'Filmstrip / Focus'
                            : paper.title
                    }),
                    createElement('p', {
                      text: isJustifiedRows
                        ? `${entries.length} image${
                            entries.length === 1 ? '' : 's'
                          } from ${entries[0]?.source || 'available'} extraction`
                        : `${entries.length} images from all papers`
                    })
                  ]
                }),
                stage
              ]
            })
          ]
        })
      );

      if (activeLayout === 'justified') {
        renderJustifiedRows();
      } else if (activeLayout === 'light-table') {
        renderLightTable();
      } else {
        renderFilmstrip();
      }
    };

    renderPaper();
  }
};

const imageRenderers = [
  imageGalleryRenderer
];

const activeImageRenderer =
  imageRenderers.find((renderer) => renderer.id === requestedImageRenderer) ||
  imageRenderers.find((renderer) => renderer.id === DEFAULT_IMAGE_RENDERER);

renderSwitcher();
renderSiteNav();

if (activePage === 'authors') {
  document.documentElement.dataset.page = 'authors';
  document.documentElement.dataset.renderer = activeAuthorRenderer.id;
  pageTitle.textContent = 'Authors';
  activeAuthorRenderer.render({
    container: app,
    authors: sortedAuthorsByPaperCount(authors),
    mapStyle: requestedAuthorMapStyle
  });
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
