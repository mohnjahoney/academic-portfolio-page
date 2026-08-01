import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { GENERATED_GEORGIA_GLYPHS } from './generated/georgiaTitleGlyphs.js';

gsap.registerPlugin(MorphSVGPlugin, SplitText);

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

const BUILT_IN_GEORGIA_GLYPHS = {
  unitsPerEm: 2048,
  ascender: 1878,
  descender: -449,
  glyphs: {
    M: {
      advanceWidth: 1899,
      path:
        'M1806-71L1806 0L1179 0L1179-71Q1213-72 1266.5-78Q1320-84 1340-95Q1371-114 1385.5-138.5Q1400-163 1400-200L1400-1232L1385-1232L901-23L851-23L390-1257L377-1257L377-410Q377-287 392.5-223Q408-159 440-131Q462-110 531-91Q600-72 621-71L621 0L48 0L48-71Q93-75 142.5-86Q192-97 219-119Q254-147 267-205Q280-263 280-399L280-1125Q280-1188 265-1228Q250-1268 222-1293Q191-1320 146-1333Q101-1346 57-1348L57-1419L541-1419L947-355L1294-1245Q1313-1294 1326.5-1347.5Q1340-1401 1341-1419L1804-1419L1804-1348Q1776-1347 1732.5-1339Q1689-1331 1669-1324Q1635-1312 1623-1284Q1611-1256 1611-1223L1611-200Q1611-165 1623-141Q1635-117 1669-99Q1687-89 1733-80.5Q1779-72 1806-71'
    },
    N: {
      advanceWidth: 1571,
      path:
        'M1554-1419L1554-1348Q1526-1347 1468-1332Q1410-1317 1385-1301Q1349-1276 1336.5-1205Q1324-1134 1324-1025L1324 14L1237 14L377-1147L377-415Q377-292 392.5-226Q408-160 440-132Q463-110 535-91Q607-72 630-71L630 0L48 0L48-71Q75-73 139-90.5Q203-108 219-122Q254-150 267-207.5Q280-265 280-404L280-1103Q280-1149 264-1195Q248-1241 221-1266Q185-1299 123.5-1322.5Q62-1346 24-1348L24-1419L429-1419L1227-337L1227-1012Q1227-1136 1211-1202.5Q1195-1269 1165-1291Q1137-1310 1073.5-1328Q1010-1346 977-1348L977-1419'
    },
    b: {
      advanceWidth: 1147,
      path:
        'M1073-494Q1073-272 933-121Q793 30 608 30Q527 30 448.5 5Q370-20 301-62L227 53L165 39Q170-35 172-139Q174-243 174-340L174-1316Q174-1350 158.5-1384Q143-1418 119-1433Q100-1446 55.5-1452.5Q11-1459-16-1461L-16-1525L346-1548L360-1533L360-883L367-881Q429-947 502.5-980Q576-1013 647-1013Q829-1013 951-869Q1073-725 1073-494M864-487Q864-561 848-638Q832-715 798-772Q764-830 709-866Q654-902 577-902Q507-902 454.5-874.5Q402-847 360-800L360-226Q366-202 383.5-170Q401-138 431-109Q461-81 499-63.5Q537-46 592-46Q714-46 789-164Q864-282 864-487'
    },
    d: {
      advanceWidth: 1176,
      path:
        'M1152-83L1152-18L808 4L793-10L793-102L785-104Q733-46 656.5-9Q580 28 499 28Q415 28 336.5-9.5Q258-47 200-115Q141-184 106.5-281Q72-378 72-495Q72-602 109-698Q146-794 211-866Q272-933 360.5-973Q449-1013 541-1013Q610-1013 676.5-995.5Q743-978 791-951L791-1294Q791-1336 777-1370.5Q763-1405 738-1423Q710-1442 662.5-1450.5Q615-1459 560-1463L560-1525L963-1548L978-1533L978-203Q978-168 991.5-143.5Q1005-119 1031-102Q1050-90 1086-87Q1122-84 1152-83M791-191L791-768Q783-794 765-824Q747-854 720-879Q691-904 652-920.5Q613-937 561-937Q501-937 450.5-906Q400-875 361-817Q324-761 302.5-674.5Q281-588 281-483Q281-399 297-330.5Q313-262 351-203Q386-147 440.5-113Q495-79 570-79Q650-79 702.5-114Q755-149 791-191'
    },
    u: {
      advanceWidth: 1178,
      path:
        'M1129-83L1129-18L808 4L793-10L793-135L787-135Q763-110 733-81.5Q703-53 664-30Q619-3 577 11Q535 25 458 25Q327 25 258.5-60.5Q190-146 190-309L190-781Q190-817 176.5-841.5Q163-866 137-884Q119-896 92-901.5Q65-907 35-909L35-974L364-998L379-984L379-299Q379-192 427-138Q475-84 542-84Q597-84 640-101Q683-118 712-141Q739-162 759.5-185.5Q780-209 791-229L791-788Q791-821 777-846.5Q763-872 738-890Q720-902 684.5-904.5Q649-907 605-909L605-974L963-998L978-984L978-201Q978-167 992-143Q1006-119 1031-102Q1049-91 1074-87.5Q1099-84 1129-83'
    },
    v: {
      advanceWidth: 1017,
      path:
        'M1046-986L1046-925Q1001-917 960.5-892.5Q920-868 891-806Q832-672 769-526.5Q706-381 638-221Q618-175 595.5-112Q573-49 554 9L476 9Q381-226 301-419.5Q221-613 135-816Q115-862 70.5-887.5Q26-913-19-920L-19-986L437-986L437-916Q407-915 362-903.5Q317-892 317-872Q317-869 322-856.5Q327-844 332-828Q373-726 448-543Q523-360 570-248Q606-334 660.5-462Q715-590 778-748Q788-775 797-798.5Q806-822 806-846Q806-863 789.5-876.5Q773-890 750-900Q727-910 705-915Q683-920 669-922L669-986'
    },
    i: {
      advanceWidth: 600,
      path:
        'M551-66L551 0L74 0L74-66Q97-68 121.5-70Q146-72 164-78Q192-87 205.5-109.5Q219-132 219-168L219-777Q219-809 204.5-835.5Q190-862 164-880Q145-892 109-900.5Q73-909 43-911L43-976L391-998L405-984L405-180Q405-145 418.5-122Q432-99 461-88Q483-79 504-73.5Q525-68 551-66M425-1387Q425-1330 387.5-1287.5Q350-1245 295-1245Q244-1245 206.5-1285.5Q169-1326 169-1378Q169-1433 206.5-1474Q244-1515 295-1515Q352-1515 388.5-1476.5Q425-1438 425-1387'
    },
    j: {
      advanceWidth: 598,
      path:
        'M431-984L431-60Q431 50 399 146.5Q367 243 314 306Q257 373 185.5 408.5Q114 444 28 444Q-61 444-106 408.5Q-151 373-151 325Q-151 282-127 249.5Q-103 217-57 217Q-26 217-2 230Q22 243 40 264Q56 282 72.5 308.5Q89 335 104 360Q180 360 212.5 268Q245 176 245-27L245-769Q245-801 229.5-830.5Q214-860 189-878Q173-889 112.5-900Q52-911 21-914L21-976L417-998L431-984M446-1388Q446-1331 408.5-1288.5Q371-1246 316-1246Q265-1246 227.5-1286.5Q190-1327 190-1379Q190-1434 227.5-1475Q265-1516 316-1516Q373-1516 409.5-1477.5Q446-1439 446-1388'
    }
  }
};

export const GEORGIA_GLYPHS = {
  ...GENERATED_GEORGIA_GLYPHS,
  glyphs: {
    ...BUILT_IN_GEORGIA_GLYPHS.glyphs,
    ...GENERATED_GEORGIA_GLYPHS.glyphs
  }
};

export const defineTitleMorph = (
  from,
  to,
  { font = GEORGIA_GLYPHS } = {}
) => {
  const fromCharacters = Array.from(from);
  const toCharacters = Array.from(to);

  if (fromCharacters.length !== toCharacters.length) {
    throw new Error(
      `Title morph strings must have equal lengths: ` +
        `${fromCharacters.length} !== ${toCharacters.length}.`
    );
  }

  const replacements = fromCharacters.flatMap((correct, index) => {
    const alternate = toCharacters[index];
    const correctIsWhitespace = /\s/u.test(correct);
    const alternateIsWhitespace = /\s/u.test(alternate);

    if (correctIsWhitespace !== alternateIsWhitespace) {
      throw new Error(
        `Title morph cannot add, remove, or move whitespace at index ${index}.`
      );
    }

    if (correct === alternate) {
      return [];
    }

    if (!font.glyphs[correct] || !font.glyphs[alternate]) {
      throw new Error(
        `Title morph requires SVG glyphs for "${correct}" and ` +
          `"${alternate}" at index ${index}.`
      );
    }

    return [{ index, correct, alternate }];
  });

  return Object.freeze({
    from,
    to,
    replacements: Object.freeze(replacements)
  });
};

const createSvgElement = (tagName) =>
  document.createElementNS(SVG_NAMESPACE, tagName);

export const attachGlyphMorph = ({
  element,
  text,
  replacements,
  font = GEORGIA_GLYPHS,
  duration = 0.9,
  stage = 'morph'
}) => {
  const replacementByIndex = new Map(
    replacements.map((replacement) => [replacement.index, replacement])
  );
  const entries = [];
  element.textContent = text;

  const split = SplitText.create(element, {
    type: 'words, chars',
    tag: 'span',
    wordsClass: 'glyph-morph-word',
    charsClass: 'glyph-morph-char',
    aria: 'auto'
  });

  if (stage === 'split') {
    let splitCharacterIndex = 0;

    Array.from(text).forEach((character, textIndex) => {
      if (/\s/u.test(character)) {
        return;
      }

      const characterElement = split.chars[splitCharacterIndex];
      splitCharacterIndex += 1;

      if (replacementByIndex.has(textIndex)) {
        characterElement.classList.add('glyph-morph-selected');
      }
    });

    return {
      element,
      canMorph: false,
      get isAlternateVisible() {
        return false;
      },
      setAlternate() {
        return false;
      },
      toggle() {
        return false;
      },
      destroy() {
        split.revert();
      }
    };
  }

  let splitCharacterIndex = 0;

  Array.from(text).forEach((character, textIndex) => {
    if (/\s/u.test(character)) {
      return;
    }

    const characterElement = split.chars[splitCharacterIndex];
    splitCharacterIndex += 1;
    const replacement = replacementByIndex.get(textIndex);

    if (!replacement) {
      return;
    }

    const correctGlyph = font.glyphs[replacement.correct];
    const alternateGlyph = font.glyphs[replacement.alternate];

    if (!correctGlyph || !alternateGlyph || replacement.correct !== character) {
      throw new Error(`Invalid glyph replacement at character ${textIndex}.`);
    }

    const fontSize = Number.parseFloat(
      window.getComputedStyle(characterElement).fontSize
    );
    const characterRect = characterElement.getBoundingClientRect();
    const measuredWidth = characterRect.width;
    const widthInEms =
      fontSize > 0 ? measuredWidth / fontSize : correctGlyph.advanceWidth / font.unitsPerEm;
    const baselineProbe = document.createElement('span');
    const svg = createSvgElement('svg');
    const path = createSvgElement('path');

    baselineProbe.className = 'glyph-morph-baseline-probe';
    characterElement.append(baselineProbe);
    const baselineFromTop =
      baselineProbe.getBoundingClientRect().top - characterRect.top;
    baselineProbe.remove();

    characterElement.style.setProperty('--glyph-width', `${widthInEms}em`);
    characterElement.style.setProperty(
      '--glyph-baseline',
      `${baselineFromTop}px`
    );

    svg.setAttribute(
      'viewBox',
      `0 ${-font.ascender} ${font.unitsPerEm} ${font.ascender - font.descender}`
    );
    svg.style.setProperty(
      '--glyph-ascent',
      `${font.ascender / font.unitsPerEm}em`
    );
    svg.style.setProperty(
      '--glyph-descent',
      `${Math.abs(font.descender) / font.unitsPerEm}em`
    );
    svg.setAttribute('focusable', 'false');
    path.setAttribute(
      'd',
      stage === 'overlay' ? alternateGlyph.path : correctGlyph.path
    );
    svg.append(path);

    if (stage === 'overlay') {
      characterElement.classList.add(
        'glyph-morph-selected',
        'glyph-morph-overlay-host'
      );
      svg.classList.add('glyph-morph-overlay');
      path.setAttribute('fill', 'currentColor');
      characterElement.append(svg);
      entries.push({ path, correctGlyph, alternateGlyph });
      return;
    }

    characterElement.classList.add('glyph-morph-target');
    path.setAttribute('fill', 'currentColor');
    characterElement.replaceChildren(svg);

    entries.push({ path, correctGlyph, alternateGlyph });
  });

  let alternateIsVisible = stage === 'overlay';

  const setAlternate = (nextState, { animate = true } = {}) => {
    alternateIsVisible = Boolean(nextState);
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    entries.forEach(({ path, correctGlyph, alternateGlyph }, index) => {
      const target = alternateIsVisible ? alternateGlyph : correctGlyph;
      gsap.killTweensOf(path);

      if (!animate || reducedMotion) {
        path.setAttribute('d', target.path);
        return;
      }

      gsap.to(path, {
        duration,
        delay: index * 0.07,
        ease: 'power2.inOut',
        morphSVG: {
          shape: target.path,
          type: 'rotational'
        }
      });
    });

    return alternateIsVisible;
  };

  return {
    element,
    canMorph: true,
    get isAlternateVisible() {
      return alternateIsVisible;
    },
    setAlternate,
    toggle(options) {
      return setAlternate(!alternateIsVisible, options);
    },
    destroy() {
      entries.forEach(({ path }) => gsap.killTweensOf(path));
      split.revert();
    }
  };
};

const createMeasurementLayer = (text, className) => {
  const layer = document.createElement('span');
  layer.className = `glyph-morph-measure ${className}`;
  layer.textContent = text;
  layer.setAttribute('aria-hidden', 'true');
  return layer;
};

const splitMeasurementLayer = (layer) =>
  SplitText.create(layer, {
    type: 'words, chars',
    tag: 'span',
    wordsClass: 'glyph-morph-word',
    charsClass: 'glyph-morph-char',
    aria: 'none'
  });

const measureCharacters = ({
  elementRect,
  layer,
  split,
  text
}) => {
  const measurements = new Map();
  let splitCharacterIndex = 0;

  Array.from(text).forEach((character, textIndex) => {
    if (/\s/u.test(character)) {
      return;
    }

    const characterElement = split.chars[splitCharacterIndex];
    splitCharacterIndex += 1;
    const characterRect = characterElement.getBoundingClientRect();
    const baselineProbe = document.createElement('span');

    baselineProbe.className = 'glyph-morph-baseline-probe';
    characterElement.append(baselineProbe);
    const baseline = baselineProbe.getBoundingClientRect().top;
    baselineProbe.remove();

    measurements.set(textIndex, {
      baseline: baseline - elementRect.top,
      character,
      width: characterRect.width,
      x: characterRect.left - elementRect.left
    });
  });

  return {
    characters: measurements,
    height: layer.getBoundingClientRect().height
  };
};

export const attachMeasuredGlyphMorph = ({
  element,
  titleMorph,
  font = GEORGIA_GLYPHS,
  duration = 0.9
}) => {
  const fromCharacters = Array.from(titleMorph.from);
  const toCharacters = Array.from(titleMorph.to);
  const fromLayer = createMeasurementLayer(
    titleMorph.from,
    'is-source'
  );
  const toLayer = createMeasurementLayer(titleMorph.to, 'is-target');
  const visualLayer = document.createElement('span');

  visualLayer.className = 'glyph-morph-visual';
  visualLayer.setAttribute('aria-hidden', 'true');
  element.classList.add('glyph-morph-stage');
  element.setAttribute('aria-label', titleMorph.to);
  element.replaceChildren(fromLayer, toLayer, visualLayer);

  const fromSplit = splitMeasurementLayer(fromLayer);
  const toSplit = splitMeasurementLayer(toLayer);
  const entries = [];

  fromCharacters.forEach((character, textIndex) => {
    if (/\s/u.test(character)) {
      return;
    }

    const alternate = toCharacters[textIndex];
    const correctGlyph = font.glyphs[character];
    const alternateGlyph = font.glyphs[alternate];

    if (!correctGlyph || !alternateGlyph) {
      throw new Error(
        `Missing measured morph glyphs for "${character}" and ` +
          `"${alternate}" at index ${textIndex}.`
      );
    }

    const svg = createSvgElement('svg');
    const path = createSvgElement('path');

    svg.classList.add('glyph-morph-positioned-glyph');
    svg.classList.add(
      correctGlyph.path === alternateGlyph.path
        ? 'is-static'
        : 'is-changing'
    );
    svg.setAttribute(
      'viewBox',
      `0 ${-font.ascender} ${font.unitsPerEm} ${font.ascender - font.descender}`
    );
    svg.setAttribute('focusable', 'false');
    svg.style.setProperty(
      '--glyph-ascent',
      `${font.ascender / font.unitsPerEm}em`
    );
    svg.style.setProperty(
      '--glyph-descent',
      `${Math.abs(font.descender) / font.unitsPerEm}em`
    );
    path.setAttribute('d', alternateGlyph.path);
    path.setAttribute('fill', 'currentColor');
    svg.append(path);
    visualLayer.append(svg);
    entries.push({
      alternateGlyph,
      correctGlyph,
      path,
      svg,
      textIndex
    });
  });

  let alternateIsVisible = true;
  let activeTimeline = null;
  let lastMeasuredWidth = -1;

  const layout = ({ force = false } = {}) => {
    const elementRect = element.getBoundingClientRect();

    if (!force && Math.abs(elementRect.width - lastMeasuredWidth) < 0.25) {
      return;
    }

    lastMeasuredWidth = elementRect.width;
    activeTimeline?.kill();
    const fontSize = Number.parseFloat(
      window.getComputedStyle(element).fontSize
    );
    const ascent = (font.ascender / font.unitsPerEm) * fontSize;
    const fromLayout = measureCharacters({
      elementRect,
      layer: fromLayer,
      split: fromSplit,
      text: titleMorph.from
    });
    const toLayout = measureCharacters({
      elementRect,
      layer: toLayer,
      split: toSplit,
      text: titleMorph.to
    });

    element.style.height = `${Math.max(
      fromLayout.height,
      toLayout.height
    )}px`;

    entries.forEach((entry) => {
      const source = fromLayout.characters.get(entry.textIndex);
      const target = toLayout.characters.get(entry.textIndex);

      entry.source = source;
      entry.target = target;
      entry.svg.style.left = `${source.x}px`;
      entry.svg.style.top = `${source.baseline - ascent}px`;
      gsap.set(entry.svg, {
        x: alternateIsVisible ? target.x - source.x : 0,
        y: alternateIsVisible ? target.baseline - source.baseline : 0
      });
    });
  };

  const setAlternate = (nextState, { animate = true } = {}) => {
    alternateIsVisible = Boolean(nextState);
    element.setAttribute(
      'aria-label',
      alternateIsVisible ? titleMorph.to : titleMorph.from
    );
    activeTimeline?.kill();

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!animate || reducedMotion) {
      entries.forEach((entry) => {
        const position = alternateIsVisible
          ? {
              x: entry.target.x - entry.source.x,
              y: entry.target.baseline - entry.source.baseline
            }
          : { x: 0, y: 0 };
        const glyph = alternateIsVisible
          ? entry.alternateGlyph
          : entry.correctGlyph;

        entry.path.setAttribute('d', glyph.path);
        gsap.set(entry.svg, position);
      });
      return alternateIsVisible;
    }

    activeTimeline = gsap.timeline();
    entries.forEach((entry, index) => {
      const delay = index * 0.012;
      const position = alternateIsVisible
        ? {
            x: entry.target.x - entry.source.x,
            y: entry.target.baseline - entry.source.baseline
          }
        : { x: 0, y: 0 };
      const glyph = alternateIsVisible
        ? entry.alternateGlyph
        : entry.correctGlyph;

      activeTimeline.to(
        entry.svg,
        {
          ...position,
          duration,
          ease: 'power2.inOut'
        },
        delay
      );

      if (entry.correctGlyph.path !== entry.alternateGlyph.path) {
        activeTimeline.to(
          entry.path,
          {
            duration,
            ease: 'power2.inOut',
            morphSVG: {
              shape: glyph.path,
              type: 'rotational'
            }
          },
          delay
        );
      }
    });

    return alternateIsVisible;
  };

  layout({ force: true });
  const resizeObserver = new ResizeObserver(() => layout());
  resizeObserver.observe(element);
  document.fonts?.ready.then(() => layout({ force: true }));

  return {
    element,
    canMorph: true,
    get isAlternateVisible() {
      return alternateIsVisible;
    },
    setAlternate,
    toggle(options) {
      return setAlternate(!alternateIsVisible, options);
    },
    destroy() {
      activeTimeline?.kill();
      resizeObserver.disconnect();
      entries.forEach(({ path, svg }) => {
        gsap.killTweensOf(path);
        gsap.killTweensOf(svg);
      });
      fromSplit.revert();
      toSplit.revert();
      element.classList.remove('glyph-morph-stage');
      element.removeAttribute('aria-label');
      element.style.removeProperty('height');
      element.textContent = titleMorph.from;
    }
  };
};
