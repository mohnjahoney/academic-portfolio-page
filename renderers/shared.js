export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }

  if (options.text !== undefined) {
    element.textContent = options.text;
  }

  if (options.html !== undefined) {
    element.innerHTML = options.html;
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

export const createLink = (label, url, className = '') =>
  createElement('a', {
    className,
    text: label,
    attrs: { href: url }
  });

export const joinInline = (items, separator = ' | ') => {
  const fragment = document.createDocumentFragment();

  items.forEach((item, index) => {
    if (index > 0) {
      fragment.append(separator);
    }

    fragment.append(item);
  });

  return fragment;
};

export const externalLinksFor = (paper) => {
  const links = [];

  if (paper.journalLink) {
    links.push(createLink('Journal', paper.journalLink));
  }

  if (paper.arXivLink) {
    links.push(createLink('arXiv', paper.arXivLink));
  }

  paper.otherLinks?.forEach((url, index) => {
    links.push(createLink(`Other ${index + 1}`, url));
  });

  return links;
};

export const pdfLinksFor = (paper) => {
  const links = [];

  if (paper.journalPdf) {
    links.push(createLink('Journal PDF', paper.journalPdf));
  }

  if (paper.arXivPdf) {
    links.push(createLink('arXiv PDF', paper.arXivPdf));
  }

  return links;
};

export const linkLine = (label, links, className = 'link-line') => {
  const line = createElement('p', { className });
  line.append(`${label}: `);

  if (links.length === 0) {
    line.append('Not listed');
  } else {
    line.append(joinInline(links));
  }

  return line;
};

export const metadataLine = (label, value, className = 'metadata-line') =>
  createElement('p', {
    className,
    text: `${label}: ${value || 'Not listed'}`
  });

export const paperLinks = (paper, className = 'paper-links') =>
  createElement('div', {
    className,
    children: [
      linkLine('Links', externalLinksFor(paper)),
      ...(pdfLinksFor(paper).length > 0
        ? [linkLine('PDFs', pdfLinksFor(paper))]
        : [])
    ]
  });

export const groupBy = (items, getKey) =>
  items.reduce((groups, item) => {
    const key = getKey(item);
    groups[key] ||= [];
    groups[key].push(item);
    return groups;
  }, {});

export const sortedYears = (papers) =>
  [...new Set(papers.map((paper) => paper.year))].sort((a, b) => b - a);

export const getEraLabel = (era) => {
  const labels = {
    fluid: 'Fluid Fronts',
    'info-theory': 'Information Theory',
    quantum: 'Quantum Complexity'
  };

  return labels[era] || era || 'Unsorted';
};
