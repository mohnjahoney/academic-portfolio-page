const baseUrl = import.meta.env?.BASE_URL || '/';
const assetPath = (path) => `${baseUrl}${path}`;

export const artifacts = [
  {
    number: '01',
    eyebrow: 'Time + information',
    title: 'Looking both ways in time',
    thesis:
      'Predictive and retrodictive models can describe the same process while remembering different things.',
    image: assetPath(
      'assets/images-from-pdfs/prediction-retrodiction/by-hand/forward-reverse-memory-composite-v2.svg'
    ),
    previewImage: assetPath(
      'assets/images-from-pdfs/prediction-retrodiction/by-hand/forward-reverse-memory-information.svg'
    ),
    imageAlt:
      'A three-state forward model and four-state reverse model connected to an asymmetric diagram of their shared and direction-dependent memory.',
    question:
      'How do predictive and retrodictive models differ, and what does that difference reveal about predictive power?',
    contribution:
      'I built a bidirectional computational framework that joins predictive and retrodictive causal states, making several previously tangled information quantities directly calculable.',
    lesson:
      'Two different HMMs describe the same process, with one looking forward and the other looking backward. Their difference shows how retrodiction can require more memory than prediction.',
    paperTitle:
      'Prediction, Retrodiction, and the Amount of Information Stored in the Present',
    year: '2009',
    paperHref: 'https://doi.org/10.1007/s10955-009-9808-z',
    imagesHref: '?page=images&view=gallery'
  },
  {
    number: '02',
    eyebrow: 'Frozen fronts',
    title: 'When moving fronts stand still',
    thesis: 'Propagating fronts in complex fluid flows can stabilize.',
    image: assetPath(
      'assets/images-from-pdfs/frozen-reaction-fronts-steady-flows/by-hand/figure-4-cleaned.png'
    ),
    previewImage: assetPath(
      'assets/images-from-pdfs/frozen-reaction-fronts-steady-flows/by-hand/figure-4-cleaned preview.png'
    ),
    imageAlt:
      'Two-panel diagram of frozen fronts shifting as wind increases, with a red burning invariant manifold connecting points A and D across a vortex chain.',
    question:
      'When can a propagating reaction front become fixed even though the fluid beneath it continues to flow?',
    contribution:
      'I developed a dynamical systems framework with custom software for understanding how global barriers create frozen fronts and how bifurcations reshape them.',
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
    thesis: 'Quantum models can represent similar futures with less memory than classical models.',
    image: assetPath(
      'assets/images-from-pdfs/occams-quantum-strop/by-hand/figure-1.png'
    ),
    previewImage: assetPath(
      'assets/images-from-pdfs/occams-quantum-strop/by-hand/figure-3 preview.png'
    ),
    imageAlt:
      'A classical state machine above plots comparing classical and quantum memory requirements.',
    question:
      'Can quantum models make do with less memory than classical models—and, if so, how can we construct them? What feature of a process makes that difference possible?',
    contribution:
      'I developed a sequence of quantum encodings and an efficient algorithm for finding their memory advantage. The greatest compression is achieved when the quantum states extend to cover the cryptic order of the stochastic process.',
    lesson:
      'Classical models must keep some predictive futures distinct even when they are similar. Quantum models can let those futures overlap, reducing the memory needed to synchronize with the process.',
    paperTitle:
      "Occam's Quantum Strop: Synchronizing and Compressing Classical Cryptic Processes via a Quantum Channel",
    year: '2016',
    paperHref: 'https://doi.org/10.1038/srep20495',
    imagesHref: '?page=images&view=gallery'
  }
];
