import { bareRenderer } from './bare.js';
import { compactRenderer } from './compact.js';
import { dossierRenderer } from './dossier.js';
import { chronicleRenderer } from './chronicle.js';
import { constellationRenderer } from './constellation.js';
import { specimenRenderer } from './specimen.js';

export const renderers = [
  bareRenderer,
  compactRenderer,
  dossierRenderer,
  chronicleRenderer,
  constellationRenderer,
  specimenRenderer
];
