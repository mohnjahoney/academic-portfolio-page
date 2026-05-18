export const autoFigureCounts = {
  'ambiguity-of-simplicity': 3,
  'causal-asymmetry-quantum-world': 5,
  'extreme-quantum-advantage-strongly-coupled-systems': 4,
  'extreme-quantum-memory-rare-event-sampling': 6,
  'finite-time-barriers-front-propagation': 7,
  'front-propagation-fluid-flows': 8,
  'frozen-reaction-fronts-steady-flows': 8,
  'how-hidden-are-hidden-processes': 8,
  'information-accessibility': 7,
  'information-accessibility-linear-combinations': 6,
  'information-symmetries-irreversible-processes': 8,
  'invariant-barriers-reactive-front-propagation': 8,
  'mode-locking-advection-reaction-diffusion': 8,
  'natural-time-scales': 8,
  'occams-quantum-strop': 5,
  'prediction-generation-binary-markov-processes': 8,
  'prediction-retrodiction': 6,
  'quantum-encoded-cryptic-processes': 8,
  'synchronization-control-intrinsic-designed-computation': 8,
  'times-barbed-arrow': 2,
  'turnstile-mechanism-fronts-fluid-flows': 8
};

export const byHandFigureCounts = {
  'ambiguity-of-simplicity': 6,
  'causal-asymmetry-quantum-world': 5,
  'extreme-quantum-advantage-strongly-coupled-systems': 6,
  'extreme-quantum-memory-rare-event-sampling': 7,
  'finite-time-barriers-front-propagation': 8,
  'front-propagation-fluid-flows': 9,
  'frozen-reaction-fronts-steady-flows': 7,
  'how-hidden-are-hidden-processes': 7,
  'information-accessibility': 3,
  'information-accessibility-linear-combinations': 2,
  'information-symmetries-irreversible-processes': 4,
  'invariant-barriers-reactive-front-propagation': 5,
  'mode-locking-advection-reaction-diffusion': 4,
  'natural-time-scales': 5,
  'occams-quantum-strop': 3,
  'prediction-generation-binary-markov-processes': 4,
  'prediction-retrodiction': 3,
  'quantum-encoded-cryptic-processes': 4,
  'synchronization-control-intrinsic-designed-computation': 4,
  'times-barbed-arrow': 2,
  'turnstile-mechanism-fronts-fluid-flows': 4
};

const baseUrl = import.meta.env?.BASE_URL || '/';
const assetPath = (path) => `${baseUrl}${path}`;

const figuresForSource = (paper, source, count) =>
  Array.from({ length: count }, (_, index) => {
    const figureNumber = index + 1;

    return {
      src: assetPath(
        `assets/images-from-pdfs/${paper.id}/${source}/figure-${figureNumber}.png`
      ),
      alt: `Figure ${figureNumber} from ${paper.title}.`
    };
  });

export const figureSetsForPaper = (paper) => {
  const byHandCount = byHandFigureCounts[paper.id] || 0;
  const autoCount = autoFigureCounts[paper.id] || 0;
  const byHandSet =
    byHandCount > 0
      ? {
          source: 'by-hand',
          figures: figuresForSource(paper, 'by-hand', byHandCount)
        }
      : null;
  const autoSet =
    autoCount > 0
      ? {
          source: 'auto',
          figures: figuresForSource(paper, 'auto', autoCount)
        }
      : null;

  return {
    primary: byHandSet || autoSet,
    fallback: byHandSet ? autoSet : null
  };
};

export const figuresForPaper = (paper) =>
  figureSetsForPaper(paper).primary?.figures || [];
