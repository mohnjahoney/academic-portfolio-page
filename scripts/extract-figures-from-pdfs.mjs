import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { papers } from '../papers.js';

const root = new URL('..', import.meta.url).pathname;
const imageRoot = join(root, 'images-from-pdfs');
const renderDpi = 200;
const maxFiguresPerPaper = 8;
const force = process.argv.includes('--force');

const decodeEntities = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#160;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

const stripTags = (text) => text.replace(/<[^>]+>/g, '');

const run = (command, args, options = {}) =>
  execFileSync(command, args, {
    cwd: root,
    encoding: options.encoding || 'utf8',
    stdio: options.stdio || ['ignore', 'pipe', 'pipe']
  });

const parseAttributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([a-z]+)="([^"]*)"/gi)].map(([, key, value]) => [
      key,
      Number.isNaN(Number(value)) ? value : Number(value)
    ])
  );

const pageBlocks = (xml) =>
  [...xml.matchAll(/<page\b([^>]*)>([\s\S]*?)<\/page>/g)].map((match) => ({
    attrs: parseAttributes(match[1]),
    body: match[2]
  }));

const textItemsForPage = (page) =>
  [...page.body.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)]
    .map((match) => ({
      ...parseAttributes(match[1]),
      text: decodeEntities(stripTags(match[2])).replace(/\s+/g, ' ').trim()
    }))
    .filter((item) => item.text);

const lineItemsForPage = (page) => {
  const grouped = new Map();

  for (const item of textItemsForPage(page)) {
    const top = Math.round(item.top / 4) * 4;
    const line = grouped.get(top) || [];
    line.push(item);
    grouped.set(top, line);
  }

  return [...grouped.entries()]
    .map(([top, items]) => {
      const sorted = items.sort((a, b) => a.left - b.left);
      const left = Math.min(...sorted.map((item) => item.left));
      const right = Math.max(...sorted.map((item) => item.left + item.width));
      const bottom = Math.max(...sorted.map((item) => item.top + item.height));

      return {
        top,
        left,
        right,
        bottom,
        width: right - left,
        text: sorted.map((item) => item.text).join(' ').replace(/\s+/g, ' ').trim()
      };
    })
    .sort((a, b) => a.top - b.top || a.left - b.left);
};

const captionStartsForPage = (page) =>
  lineItemsForPage(page)
    .filter((line) =>
      /^(fig\.|fig|figure)\s*\d+\s*[:.]/i.test(line.text)
    )
    .map((line) => {
      const pageMid = page.attrs.width / 2;
      const margin = page.attrs.width * 0.065;
      const gutter = page.attrs.width * 0.025;
      const columnLeft = line.left < pageMid ? margin : pageMid + gutter;
      const columnRight = line.left < pageMid ? pageMid - gutter : page.attrs.width - margin;
      const captionLines = lineItemsForPage(page).filter(
        (candidate) =>
          candidate.top >= line.top &&
          candidate.top <= line.top + 95 &&
          candidate.left >= columnLeft - page.attrs.width * 0.02 &&
          candidate.right <= columnRight + page.attrs.width * 0.04
      );
      const captionBottom = Math.max(...captionLines.map((candidate) => candidate.bottom));
      const captionRight = Math.max(...captionLines.map((candidate) => candidate.right));
      const captionLeft = Math.min(...captionLines.map((candidate) => candidate.left));
      const captionText = captionLines.map((candidate) => candidate.text).join(' ');

      return {
        ...line,
        captionBottom,
        captionLeft,
        captionRight,
        captionText
      };
    });

const cropForCaption = (caption, page) => {
  const pageWidth = page.attrs.width;
  const pageHeight = page.attrs.height;
  const mid = pageWidth / 2;
  const margin = pageWidth * 0.065;
  const gutter = pageWidth * 0.025;
  const isFullWidth =
    caption.width > pageWidth * 0.55 ||
    (caption.left < mid && caption.right > mid);

  const columnLeft = caption.left < mid ? margin : mid + gutter;
  const columnRight = caption.left < mid ? mid - gutter : pageWidth - margin;
  const x0 = isFullWidth ? margin : columnLeft;
  const x1 = isFullWidth ? pageWidth - margin : columnRight;
  const captionHeight = Math.max(45, caption.captionBottom - caption.top + 18);
  const figureHeight = isFullWidth ? pageHeight * 0.38 : pageHeight * 0.34;
  const y0 = Math.max(0, caption.top - figureHeight);
  const y1 = Math.min(pageHeight, caption.captionBottom + 18);

  return {
    x: Math.round(x0),
    y: Math.round(y0),
    width: Math.round(x1 - x0),
    height: Math.round(Math.max(120, y1 - y0, captionHeight + 120))
  };
};

const imageInfo = (path) => {
  const output = run('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', path]);
  return {
    width: Number(output.match(/pixelWidth:\s*(\d+)/)?.[1]),
    height: Number(output.match(/pixelHeight:\s*(\d+)/)?.[1])
  };
};

const cropPageImage = ({ pageImage, page, crop, outputPath }) => {
  const info = imageInfo(pageImage);
  const scaleX = info.width / page.attrs.width;
  const scaleY = info.height / page.attrs.height;
  const x = Math.max(0, Math.round(crop.x * scaleX));
  const y = Math.max(0, Math.round(crop.y * scaleY));
  const width = Math.min(info.width - x, Math.round(crop.width * scaleX));
  const height = Math.min(info.height - y, Math.round(crop.height * scaleY));

  run(
    'sips',
    [
      '--cropToHeightWidth',
      String(height),
      String(width),
      '--cropOffset',
      String(y),
      String(x),
      pageImage,
      '--out',
      outputPath
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );
};

const pageImageFor = (tempDir, pageIndex) => {
  const suffix = `${pageIndex}.png`;
  const padded2 = String(pageIndex).padStart(2, '0');
  const padded3 = String(pageIndex).padStart(3, '0');
  const candidates = [
    join(tempDir, `page-${suffix}`),
    join(tempDir, `page-${padded2}.png`),
    join(tempDir, `page-${padded3}.png`)
  ];
  const direct = candidates.find((candidate) => existsSync(candidate));

  if (direct) return direct;

  return join(
    tempDir,
    readdirSync(tempDir).find((file) => file.endsWith(`-${suffix}`)) || `page-${suffix}`
  );
};

const paperPdfPath = (paper) => {
  const pdf = paper.arXivPdf || paper.journalPdf;
  if (!pdf) return null;
  return join(root, pdf.replace(/^\//, ''));
};

mkdirSync(imageRoot, { recursive: true });

for (const paper of papers) {
  if (paper.id === 'times-barbed-arrow') continue;

  const pdfPath = paperPdfPath(paper);
  if (!pdfPath || !existsSync(pdfPath)) {
    console.log(`${paper.id}: skipped, no local PDF`);
    continue;
  }

  const outDir = join(imageRoot, paper.id);
  mkdirSync(outDir, { recursive: true });

  const existingFigures = readdirSync(outDir).filter((file) => /^figure-\d+\.png$/.test(file));
  if (existingFigures.length > 0 && !force) {
    console.log(`${paper.id}: skipped, figures already exist`);
    continue;
  }

  const tempDir = mkdtempSync(join(tmpdir(), `${paper.id}-figures-`));

  try {
    const xml = run('pdftohtml', ['-xml', '-i', '-stdout', pdfPath]);
    const pages = pageBlocks(xml);
    const captions = pages.flatMap((page, pageIndex) =>
      captionStartsForPage(page).map((caption) => ({
        page,
        pageIndex: pageIndex + 1,
        caption
      }))
    );

    if (captions.length === 0) {
      console.log(`${paper.id}: no figure captions found`);
      continue;
    }

    run('pdftoppm', ['-png', '-r', String(renderDpi), pdfPath, join(tempDir, 'page')]);

    const selected = captions.slice(0, maxFiguresPerPaper);

    selected.forEach(({ page, pageIndex, caption }, index) => {
      const pageImage = pageImageFor(tempDir, pageIndex);
      const outputPath = join(outDir, `figure-${index + 1}.png`);
      cropPageImage({
        pageImage,
        page,
        crop: cropForCaption(caption, page),
        outputPath
      });
    });

    console.log(`${paper.id}: ${selected.length} figure crop(s)`);
  } catch (error) {
    console.log(`${paper.id}: failed (${error.message})`);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
}
