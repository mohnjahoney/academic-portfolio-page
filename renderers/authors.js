import { authorLocations } from '../authorLocations.js';
import { createElement } from './shared.js';

const naturalEarthMapUrl = new URL(
  '../assets/maps/natural-earth-land-50m.svg',
  import.meta.url
).href;

const AUTHOR_LAYOUT_NODE_RADIUS = 15;
const AUTHOR_LAYOUT_NODE_PADDING = 20;
const AUTHOR_LAYOUT_COLLISION_ITERATIONS = 10;
const AUTHOR_LAYOUT_MAX_ANCHOR_DISTANCE = 300;
const AUTHOR_MAP_WIDTH = 1000;
const AUTHOR_MAP_HEIGHT = 520;
const AUTHOR_LAYOUT_LEADER_LINE_THRESHOLD = 10;
const AUTHOR_ANCHOR_DOT_RADIUS = 4;

const authorCurrentInstitution = (author) =>
  author.currentPosition?.organization ||
  author.latestAcademicPosition?.organization ||
  author.institutions?.[0] ||
  'Not listed';

const authorCurrentEmail = (author) => author.emails?.[0] || 'Not listed';

export const sortedAuthorsByPaperCount = (authors) =>
  [...authors].sort((a, b) => {
    const paperCountDifference =
      b.authoredPaperIds.length - a.authoredPaperIds.length;

    if (paperCountDifference !== 0) {
      return paperCountDifference;
    }

    return a.name.localeCompare(b.name);
  });

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

const renderAuthorsListPage = ({ container, authors }) => {
  const list = createElement('ol', {
    className: 'authors-list',
    children: authors.map(createAuthorItem)
  });

  container.replaceChildren(
    createElement('section', {
      className: 'authors-page',
      children: [list]
    })
  );
};

const drawingMapProjection = ({ lat, lng }) => ({
  x: ((lng + 180) / 360) * 100,
  y: ((90 - lat) / 180) * 100
});

const politicalMapProjection = ({ lat, lng }) => {
  const clampedLat = Math.max(Math.min(lat, 66.4), -66.4);
  const latitudeRadians = (clampedLat * Math.PI) / 180;
  const mercatorY =
    (1 -
      Math.log(Math.tan(latitudeRadians) + 1 / Math.cos(latitudeRadians)) /
        Math.PI) /
    2;

  return {
    x: ((lng + 180) / 360) * 100,
    y: ((mercatorY - 0.25) / 0.5) * 100
  };
};

const authorMapPoints = (authors, mapStyle) => {
  const project =
    mapStyle === 'political' ? politicalMapProjection : drawingMapProjection;
  const withLocations = authors
    .map((author) => ({
      author,
      location: authorLocations[author.id]
    }))
    .filter((entry) => entry.location);

  return withLocations.map((entry) => {
    const { location } = entry;
    const projected = project(location);
    const anchorX = projected.x;
    const anchorY = projected.y;

    return {
      ...entry,
      anchorX,
      anchorY,
      x: anchorX,
      y: anchorY
    };
  });
};

const percentToPixelPoint = (point) => ({
  ...point,
  anchorPx: (point.anchorX / 100) * AUTHOR_MAP_WIDTH,
  anchorPy: (point.anchorY / 100) * AUTHOR_MAP_HEIGHT,
  px: (point.anchorX / 100) * AUTHOR_MAP_WIDTH,
  py: (point.anchorY / 100) * AUTHOR_MAP_HEIGHT
});

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const clampToMap = (node) => {
  node.px = clamp(
    node.px,
    AUTHOR_LAYOUT_NODE_RADIUS,
    AUTHOR_MAP_WIDTH - AUTHOR_LAYOUT_NODE_RADIUS
  );
  node.py = clamp(
    node.py,
    AUTHOR_LAYOUT_NODE_RADIUS,
    AUTHOR_MAP_HEIGHT - AUTHOR_LAYOUT_NODE_RADIUS
  );
};

const tetherToAnchor = (node) => {
  const dx = node.px - node.anchorPx;
  const dy = node.py - node.anchorPy;
  const distance = Math.hypot(dx, dy);

  if (distance <= AUTHOR_LAYOUT_MAX_ANCHOR_DISTANCE) return;

  const scale = AUTHOR_LAYOUT_MAX_ANCHOR_DISTANCE / distance;
  node.px = node.anchorPx + dx * scale;
  node.py = node.anchorPy + dy * scale;
};

const anchoredCollisionLayout = (points) => {
  const nodes = points.map(percentToPixelPoint);
  const minimumNodeDistance =
    AUTHOR_LAYOUT_NODE_RADIUS * 2 + AUTHOR_LAYOUT_NODE_PADDING;
  const minimumAnchorDistance =
    AUTHOR_LAYOUT_NODE_RADIUS + AUTHOR_ANCHOR_DOT_RADIUS + AUTHOR_LAYOUT_NODE_PADDING;

  for (
    let iteration = 0;
    iteration < AUTHOR_LAYOUT_COLLISION_ITERATIONS;
    iteration += 1
  ) {
    nodes.forEach((nodeA, index) => {
      nodes.slice(index + 1).forEach((nodeB) => {
        const dx = nodeA.px - nodeB.px;
        const dy = nodeA.py - nodeB.py;
        const distance = Math.hypot(dx, dy);

        if (distance >= minimumNodeDistance) return;

        const fallbackAngle =
          (Math.PI * 2 * (index + iteration)) / nodes.length;
        const directionX =
          distance === 0 ? Math.cos(fallbackAngle) : dx / distance;
        const directionY =
          distance === 0 ? Math.sin(fallbackAngle) : dy / distance;
        const correction = (minimumNodeDistance - distance) / 2;

        nodeA.px += directionX * correction;
        nodeA.py += directionY * correction;
        nodeB.px -= directionX * correction;
        nodeB.py -= directionY * correction;
      });
    });

    nodes.forEach((node) => {
      nodes.forEach((anchorNode, anchorIndex) => {
        if (node === anchorNode) return;

        const dx = node.px - anchorNode.anchorPx;
        const dy = node.py - anchorNode.anchorPy;
        const distance = Math.hypot(dx, dy);

        if (distance >= minimumAnchorDistance) return;

        const fallbackAngle =
          (Math.PI * 2 * (anchorIndex + iteration)) / nodes.length;
        const directionX =
          distance === 0 ? Math.cos(fallbackAngle) : dx / distance;
        const directionY =
          distance === 0 ? Math.sin(fallbackAngle) : dy / distance;
        const correction = minimumAnchorDistance - distance;

        node.px += directionX * correction;
        node.py += directionY * correction;
      });
    });

    nodes.forEach((node) => {
      tetherToAnchor(node);
      clampToMap(node);
    });
  }

  return nodes.map((node) => {
    const x = (node.px / AUTHOR_MAP_WIDTH) * 100;
    const y = (node.py / AUTHOR_MAP_HEIGHT) * 100;

    return {
      ...node,
      x,
      y,
      displacementDistance: Math.hypot(
        node.px - node.anchorPx,
        node.py - node.anchorPy
      )
    };
  });
};

const layoutAuthorMapPoints = (points) => {
  // To disable anchored collision layout, replace the next line with:
  // return points.map(percentToPixelPoint);
  return anchoredCollisionLayout(points);
};

const createWorldMapLayer = () =>
  createElement('img', {
    className: 'author-world-map',
    attrs: {
      alt: 'Simplified two-tone world map',
      draggable: 'false',
      src: naturalEarthMapUrl
    }
  });

const createPoliticalMapLayer = () =>
  createElement('div', {
    className: 'author-political-map',
    attrs: {
      'aria-hidden': 'true'
    },
    children: [1, 2].flatMap((tileY) =>
      [0, 1, 2, 3].map((tileX) =>
        createElement('img', {
          attrs: {
            alt: '',
            draggable: 'false',
            src: `https://tile.openstreetmap.org/2/${tileX}/${tileY}.png`
          }
        })
      )
    )
  });

const createSvgLayer = (className) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('viewBox', `0 0 ${AUTHOR_MAP_WIDTH} ${AUTHOR_MAP_HEIGHT}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('preserveAspectRatio', 'none');

  return svg;
};

const createGuideLine = (point, className) => {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('class', className);
  line.dataset.authorId = point.author.id;
  line.setAttribute('x1', point.anchorPx);
  line.setAttribute('y1', point.anchorPy);
  line.setAttribute('x2', point.px);
  line.setAttribute('y2', point.py);

  return line;
};

const createAnchorDot = (point, className) => {
  const anchorDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  anchorDot.setAttribute('class', className);
  anchorDot.dataset.authorId = point.author.id;
  anchorDot.setAttribute('cx', point.anchorPx);
  anchorDot.setAttribute('cy', point.anchorPy);
  anchorDot.setAttribute('r', AUTHOR_ANCHOR_DOT_RADIUS);

  return anchorDot;
};

const createAuthorGuideLayers = (points) => {
  const inactiveTethers = createSvgLayer('author-guide-layer author-tether-layer');
  const inactiveAnchors = createSvgLayer('author-guide-layer author-anchor-layer');
  const activeTether = createSvgLayer('author-guide-layer author-active-tether-layer');
  const activeAnchor = createSvgLayer('author-guide-layer author-active-anchor-layer');

  points.forEach((point) => {
    if (!Number.isFinite(point.anchorPx) || !Number.isFinite(point.px)) return;

    if (point.displacementDistance > AUTHOR_LAYOUT_LEADER_LINE_THRESHOLD) {
      inactiveTethers.append(createGuideLine(point, 'author-anchor-line'));
      activeTether.append(createGuideLine(point, 'author-anchor-line author-active-guide'));
    }

    inactiveAnchors.append(createAnchorDot(point, 'author-anchor-dot'));
    activeAnchor.append(createAnchorDot(point, 'author-anchor-dot author-active-guide'));
  });

  return [inactiveTethers, inactiveAnchors, activeTether, activeAnchor];
};

const setAuthorMapHoverState = (button, authorId, isHovered) => {
  const mapFrame = button.closest('.author-map-frame');

  if (!mapFrame) return;

  mapFrame.dataset.activeAuthorId = isHovered ? authorId : '';
  button.classList.toggle('is-active-node', isHovered);
  mapFrame
    .querySelectorAll(`.author-guide-layer [data-author-id="${authorId}"]`)
    .forEach((element) => element.classList.toggle('is-active-guide', isHovered));
};

const createAuthorToggle = ({ activeValue, ariaLabel, className, onChange, options }) =>
  createElement('div', {
    className,
    attrs: { 'aria-label': ariaLabel },
    children: options.map(([value, label]) => {
      const button = createElement('button', {
        text: label,
        attrs: {
          type: 'button',
          'aria-pressed': value === activeValue ? 'true' : 'false'
        }
      });

      button.addEventListener('click', () => onChange(value));

      return button;
    })
  });

const createAuthorMapStyleToggle = (activeStyle, onChange) =>
  createAuthorToggle({
    activeValue: activeStyle,
    ariaLabel: 'Map style',
    className: 'author-map-toggle author-map-style-toggle',
    onChange,
    options: [
      ['drawing', 'Drawing'],
      ['political', 'Political']
    ]
  });

const updateAuthorMapStyleUrl = (mapStyle) => {
  const nextParams = new URLSearchParams(window.location.search);
  nextParams.set('page', 'authors');
  nextParams.set('view', 'map');
  nextParams.set('map', mapStyle);
  nextParams.delete('nodeStyle');
  window.history.replaceState(null, '', `?${nextParams.toString()}`);
};

const createAuthorMapButton = (point, panel) => {
  const { author, location } = point;
  const button = createElement('button', {
    className: 'author-map-dot',
    attrs: {
      type: 'button',
      'data-author-id': author.id,
      'aria-label': `${author.name}, ${location.label}`
    }
  });

  button.style.setProperty('--x', `${point.x}%`);
  button.style.setProperty('--y', `${point.y}%`);

  const updatePanel = () => {
    panel.replaceChildren(
      createElement('p', {
        className: 'author-map-panel-kicker',
        text:
          location.confidence === 'low'
            ? 'Best-effort location'
            : 'Current / recent location'
      }),
      createElement('h2', { text: author.name }),
      createElement('p', {
        text: `${author.authoredPaperIds.length} paper${
          author.authoredPaperIds.length === 1 ? '' : 's'
        } co-authored`
      }),
      createElement('p', { text: location.label }),
      createElement('p', { text: authorCurrentEmail(author) })
    );
  };

  button.addEventListener('mouseenter', () => {
    updatePanel();
    setAuthorMapHoverState(button, author.id, true);
  });
  button.addEventListener('mouseleave', () => {
    setAuthorMapHoverState(button, author.id, false);
  });
  button.addEventListener('focus', () => {
    updatePanel();
    setAuthorMapHoverState(button, author.id, true);
  });
  button.addEventListener('blur', () => {
    setAuthorMapHoverState(button, author.id, false);
  });
  button.addEventListener('click', updatePanel);

  return button;
};

const renderAuthorsMapPage = ({ container, authors, mapStyle = 'political' }) => {
  let activeMapStyle = mapStyle === 'political' ? 'political' : 'drawing';

  if (new URLSearchParams(window.location.search).has('nodeStyle')) {
    updateAuthorMapStyleUrl(activeMapStyle);
  }

  const panel = createElement('aside', {
    className: 'author-map-panel',
    children: [
      createElement('p', {
        className: 'author-map-panel-kicker',
        text: 'Author Map'
      }),
      createElement('h2', { text: 'Hover or focus a dot' }),
      createElement('p', {
        text: 'Dots use best-known current or recent institutional locations.'
      })
    ]
  });

  const mapMain = createElement('div', {
    className: 'author-map-main'
  });

  const renderMap = () => {
    const points = authorMapPoints(authors, activeMapStyle);
    const layoutPoints = layoutAuthorMapPoints(points);
    const mapFrame = createElement('div', {
      className: `author-map-frame is-${activeMapStyle}`,
      children: [
        activeMapStyle === 'political'
          ? createPoliticalMapLayer()
          : createWorldMapLayer(),
        ...createAuthorGuideLayers(layoutPoints),
        ...layoutPoints.map((point) => createAuthorMapButton(point, panel))
      ]
    });

    const toggle = createAuthorMapStyleToggle(activeMapStyle, (style) => {
      if (style === activeMapStyle) return;

      activeMapStyle = style;
      updateAuthorMapStyleUrl(activeMapStyle);
      renderMap();
    });

    const controls = createElement('div', {
      className: 'author-map-controls',
      children: [toggle]
    });

    mapMain.replaceChildren(controls, mapFrame);
  };

  renderMap();

  container.replaceChildren(
    createElement('section', {
      className: 'author-map-page',
      children: [mapMain, panel]
    })
  );
};

export const authorRenderers = [
  {
    id: 'list',
    name: 'List',
    render: renderAuthorsListPage
  },
  {
    id: 'map',
    name: 'Map',
    render: renderAuthorsMapPage
  }
];
