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
  'causal-asymmetry-quantum-world': 7,
  'extreme-quantum-advantage-strongly-coupled-systems': 10
};

const baseUrl = import.meta.env?.BASE_URL || '/';
const assetPath = (path) => `${baseUrl}${path}`;

export const figuresForPaper = (paper) =>
  Array.from(
    {
      length: Math.max(
        byHandFigureCounts[paper.id] || 0,
        autoFigureCounts[paper.id] || 0
      )
    },
    (_, index) => ({
      src: assetPath(
        `images-from-pdfs/${paper.id}/by-hand/figure-${index + 1}.png`
      ),
      fallbackSrc:
        index < (autoFigureCounts[paper.id] || 0)
          ? assetPath(`images-from-pdfs/${paper.id}/auto/figure-${index + 1}.png`)
          : undefined,
      alt: `Figure ${index + 1} from ${paper.title}.`
    })
  );
