const baseUrl = import.meta.env?.BASE_URL || '/';
const assetPath = (path) => `${baseUrl}${path}`;

export const artifacts = [
  {
    number: '01',
    eyebrow: 'Time + information',
    title: 'Looking both ways in time',
    thesis: 'A system can remember more than its behavior reveals.',
    image: assetPath(
      'assets/images-from-pdfs/prediction-retrodiction/by-hand/forward-reverse-memory-composite.svg'
    ),
    previewImage: assetPath(
      'assets/images-from-pdfs/prediction-retrodiction/by-hand/figure-1.png'
    ),
    imageAlt:
      'A three-state forward model and four-state reverse model connected to an asymmetric diagram of their shared and direction-dependent memory.',
    question:
      'How much of the past is truly stored in the present—and does the answer change when we reason backward from the future?',
    contribution:
      'I helped build a bidirectional computational framework that joins predictive and retrodictive causal states, making several previously tangled information quantities directly calculable.',
    lesson:
      'These two HMM models in the figure describe the same process, but with one looking forward and the other looking back. The asymmetry in state information shows that retrodiction is more memory-intensive than prediction in this case.',
    paperTitle:
      'Prediction, Retrodiction, and the Amount of Information Stored in the Present',
    year: '2009',
    paperHref: 'https://doi.org/10.1007/s10955-009-9808-z',
    imagesHref: '?page=images&view=gallery'
  },
  {
    number: '02',
    eyebrow: 'Frozen fronts',
    title: 'When a moving front stands still',
    thesis: 'A front can stop even while the fluid beneath it keeps moving.',
    image: assetPath(
      'assets/images-from-pdfs/frozen-reaction-fronts-steady-flows/by-hand/figure-4.png'
    ),
    previewImage: assetPath(
      'assets/images-from-pdfs/frozen-reaction-fronts-steady-flows/by-hand/figure-2.png'
    ),
    imageAlt:
      'Two-panel diagram of frozen fronts shifting as wind increases, with a red burning invariant manifold connecting points A and D across a vortex chain.',
    question:
      'When can a propagating reaction front become fixed even though the fluid beneath it continues to flow?',
    contribution:
      'I developed a dynamical systems framework along with a simulation package for understanding how global barriers create frozen fronts and how bifurcations reshape them.',
    lesson:
      'We see the role of generalized invariant manifolds (red) - in this case they stitch together to form a global barrier to propagation. We also see how these manifolds relate to the flow topology.',
    paperTitle:
      'Frozen reaction fronts in steady flows: A burning-invariant-manifold perspective',
    year: '2015',
    paperHref: 'https://doi.org/10.1103/PhysRevE.92.063005',
    imagesHref: '?page=images&view=gallery'
  },
  {
    number: '03',
    eyebrow: 'Quantum compression',
    title: 'Letting similar futures overlap',
    thesis: 'Quantum memory can erase distinctions that classical models must retain.',
    image: assetPath(
      'assets/images-from-pdfs/occams-quantum-strop/by-hand/figure-1.png'
    ),
    previewImage: assetPath(
      'assets/images-from-pdfs/occams-quantum-strop/by-hand/figure-3.png'
    ),
    imageAlt:
      'A classical state machine above plots comparing classical and quantum memory requirements.',
    question:
      'How much memory is needed to synchronize to a classical stochastic process when the synchronization message is encoded in quantum states?',
    contribution:
      'I developed a sequence of quantum encodings and an efficient algorithm for finding their memory advantage. In doing so, we see that the greatest compression is achieved when the quantum states extend to cover the cryptic order.',
    lesson:
      'The state diagram names distinctions a classical model must keep. The curves below show how quantum states allow for a substantial reduction in memory requirements.',
    paperTitle:
      "Occam's Quantum Strop: Synchronizing and Compressing Classical Cryptic Processes via a Quantum Channel",
    year: '2016',
    paperHref: 'https://doi.org/10.1038/srep20495',
    imagesHref: '?page=images&view=gallery'
  }
];
