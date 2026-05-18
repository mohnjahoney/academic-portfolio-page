export const paperFigureCounts = {
  'ambiguity-of-simplicity': 8,
  'causal-asymmetry-quantum-world': 6,
  'extreme-quantum-advantage-strongly-coupled-systems': 7,
  'extreme-quantum-memory-rare-event-sampling': 8,
  'finite-time-barriers-front-propagation': 8,
  'front-propagation-fluid-flows': 8,
  'frozen-reaction-fronts-steady-flows': 8,
  'how-hidden-are-hidden-processes': 8,
  'information-accessibility': 8,
  'information-accessibility-linear-combinations': 8,
  'information-symmetries-irreversible-processes': 8,
  'invariant-barriers-reactive-front-propagation': 8,
  'mode-locking-advection-reaction-diffusion': 8,
  'natural-time-scales': 8,
  'occams-quantum-strop': 6,
  'prediction-generation-binary-markov-processes': 8,
  'prediction-retrodiction': 8,
  'quantum-encoded-cryptic-processes': 8,
  'synchronization-control-intrinsic-designed-computation': 8,
  'times-barbed-arrow': 2,
  'turnstile-mechanism-fronts-fluid-flows': 8
};

export const figuresForPaper = (paper) =>
  Array.from({ length: paperFigureCounts[paper.id] || 0 }, (_, index) => ({
    src: `/images-from-pdfs/${paper.id}/figure-${index + 1}.png`,
    alt: `Figure ${index + 1} from ${paper.title}.`
  }));
