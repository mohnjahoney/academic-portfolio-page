

export const papers = [
  {
    id: 'times-barbed-arrow',
    era: 'info-theory',
    featured: true,

    title: "Time's Barbed Arrow: Irreversibility, Crypticity, and Stored Information",

    authors: [
      'James P. Crutchfield',
      'Christopher J. Ellison',
      'John R. Mahoney'
    ],

    institutions: ['UC Davis'],

    year: 2009,
    journal: 'Physical Review Letters',
    journalLink: 'https://doi.org/10.1103/PhysRevLett.103.094101',
    arXivLink: 'https://arxiv.org/abs/0902.1209',
    arXivPdf: '/assets/article-pdfs/times-barbed-arrow-arXiv.pdf',

    abstract: `We show why the amount of information communicated between the past and future--the excess entropy--is not in general the amount of information stored in the present--the statistical complexity. This is a puzzle, and a long-standing one, since the latter is what is required for optimal prediction, but the former describes observed behavior. We layout a classification scheme for dynamical systems and stochastic processes that determines when these two quantities are the same or different. We do this by developing closed-form expressions for the excess entropy in terms of optimal causal predictors and retrodictors--the epsilon-machines of computational mechanics. A process's causal irreversibility and crypticity are key determining properties.`,

    tags: [
      'information theory',
      'irreversibility',
      'crypticity',
      'hidden processes',
      'time series'
    ],

    shortDescription:
      'Research on irreversibility and hidden information in stochastic processes using computational mechanics and information theory.',

    assetIdeas: [
      'entropy convergence plots',
      'epsilon-machine diagrams',
      'state synchronization animations'
    ]
  },

  {
    id: 'prediction-retrodiction',
    era: 'info-theory',

    title:
      'Prediction, Retrodiction, and the Amount of Information Stored in the Present',

    authors: [
      'Christopher J. Ellison',
      'John R. Mahoney',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2009,
    journal: 'Journal of Statistical Physics',
    journalLink: 'https://doi.org/10.1007/s10955-009-9808-z',
    journalPdf: '/assets/article-pdfs/prediction-retrodiction.pdf',
    arXivLink: 'https://arxiv.org/abs/0905.3587',
    arXivPdf: '/assets/article-pdfs/prediction-retrodiction-arXiv.pdf',

    abstract: `We introduce an ambidextrous view of stochastic dynamical systems, comparing their forward-time and reverse-time representations and then integrating them into a single time-symmetric representation. The perspective is useful theoretically, computationally, and conceptually. Mathematically, we prove that the excess entropy--a familiar measure of organization in complex systems--is the mutual information not only between the past and future, but also between the predictive and retrodictive causal states. Practically, we exploit the connection between prediction and retrodiction to directly calculate the excess entropy. Conceptually, these lead one to discover new system invariants for stochastic dynamical systems: crypticity (information accessibility) and causal irreversibility. Ultimately, we introduce a time-symmetric representation that unifies all these quantities, compressing the two directional representations into one. The resulting compression offers a new conception of the amount of information stored in the present.`,

    tags: [
      'prediction',
      'retrodiction',
      'information theory',
      'causal states'
    ],

    shortDescription:
      'Analysis of how information about past and future is represented in stochastic systems.',

    assetIdeas: [
      'causal-state diagrams',
      'information flow graphics',
      'time-direction illustrations'
    ]
  },

  {
    id: 'information-accessibility',
    era: 'info-theory',

    title: 'Information Accessibility and Cryptic Processes',

    authors: [
      'John R. Mahoney',
      'Christopher J. Ellison',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2009,
    journal: 'Journal of Physics A: Mathematical and Theoretical',
    journalLink: 'https://doi.org/10.1088/1751-8113/42/36/362002',
    arXivLink: 'https://arxiv.org/abs/0905.4787',
    arXivPdf: '/assets/article-pdfs/information-accessibility-arXiv.pdf',

    abstract: `We give a systematic expansion of the crypticity--a recently introduced measure of the inaccessibility of a stationary process's internal state information. This leads to a hierarchy of $$k$$-cryptic processes and allows us to identify finite-state processes that have infinite crypticity--the internal state information is present across arbitrarily long, observed sequences. The crypticity expansion is exact in both the finite- and infinite-order cases. It turns out that $$k$$-crypticity is complementary to the Markovian finite-order property that describes state information in processes. One application of these results is an efficient expansion of the excess entropy--the mutual information between a process's infinite past and infinite future--that is finite and exact for finite-order cryptic processes.`,

    tags: [
      'crypticity',
      'hidden markov models',
      'information accessibility'
    ],

    shortDescription:
      'Work examining how internal process structure can remain hidden from direct observation.',

    assetIdeas: [
      'hidden-state visualizations',
      'entropy diagrams'
    ]
  },

  {
    id: 'natural-time-scales',
    era: 'info-theory',

    title: 'Many roads to synchrony: Natural time scales and their algorithms',

    authors: [
      'Ryan G. James',
      'John R. Mahoney',
      'Christopher J. Ellison',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2014,
    journal: 'Physical Review E',
    journalLink: 'https://doi.org/10.1103/PhysRevE.89.042135',
    arXivLink: 'https://arxiv.org/abs/1010.5545',
    arXivPdf: '/assets/article-pdfs/natural-time-scales-arXiv.pdf',

    abstract: `We consider two important time scales---the Markov and cryptic orders---that monitor how an observer synchronizes to a finitary stochastic process. We show how to compute these orders exactly and that they are most efficiently calculated from the epsilon-machine, a process's minimal unifilar model. Surprisingly, though the Markov order is a basic concept from stochastic process theory, it is not a probabilistic property of a process. Rather, it is a topological property and, moreover, it is not computable from any finite-state model other than the epsilon-machine. Via an exhaustive survey, we close by demonstrating that infinite Markov and infinite cryptic orders are a dominant feature in the space of finite-memory processes. We draw out the roles played in statistical mechanical spin systems by these two complementary length scales.`,

    tags: [
      'time scales',
      'algorithms',
      'stochastic processes',
      'synchronization'
    ],

    shortDescription:
      'Research into identifying intrinsic temporal structure in complex processes.',

    assetIdeas: [
      'timescale plots',
      'algorithm diagrams',
      'synchronization graphics'
    ]
  },

  {
    id: 'information-accessibility-linear-combinations',
    era: 'info-theory',

    title:
      'Information Accessibility and Cryptic Processes: Linear Combinations of Causal States',

    authors: [
      'John R. Mahoney',
      'Christopher J. Ellison',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2009,
    journal: 'Santa Fe Institute Working Paper 09-06-019',
    arXivLink: 'https://arxiv.org/abs/0906.5099',
    arXivPdf: '/assets/article-pdfs/information-accessibility-linear-combinations-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/iacplcocs.htm'
    ],

    abstract: `We show in detail how to determine the time-reversed representation of a stationary hidden stochastic process from linear combinations of its forward-time $$\\epsilon$$-machine causal states. This also gives a check for the $$k$$-cryptic expansion recently introduced to explore the temporal range over which internal state information is spread.`,

    tags: [
      'crypticity',
      'causal states',
      'hidden markov models',
      'information accessibility'
    ],

    shortDescription:
      'Work on time-reversed representations of stationary hidden stochastic processes using linear combinations of causal states.',

    assetIdeas: [
      'causal-state diagrams',
      'time-reversal diagrams'
    ]
  },

  {
    id: 'synchronization-control-intrinsic-designed-computation',
    era: 'info-theory',

    title:
      'Synchronization and control in intrinsic and designed computation: An information-theoretic analysis of competing models of stochastic computation',

    authors: [
      'James P. Crutchfield',
      'Christopher J. Ellison',
      'Ryan G. James',
      'John R. Mahoney'
    ],

    institutions: ['UC Davis'],

    year: 2010,
    journal: 'Chaos',
    journalLink: 'https://doi.org/10.1063/1.3489888',
    arXivLink: 'https://arxiv.org/abs/1007.5354',
    arXivPdf: '/assets/article-pdfs/synchronization-control-intrinsic-designed-computation-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/ruro2.htm'
    ],

    abstract: `We adapt tools from information theory to analyze how an observer comes to synchronize with the hidden states of a finitary, stationary stochastic process. We show that synchronization is determined by both the process's internal organization and by an observer's model of it. We analyze these components using the convergence of state-block and block-state entropies, comparing them to the previously known convergence properties of the Shannon block entropy. Along the way, we introduce a hierarchy of information quantifiers as derivatives and integrals of these entropies, which parallels a similar hierarchy introduced for block entropy. We also draw out the duality between synchronization properties and a process's controllability. The tools lead to a new classification of a process's alternative representations in terms of minimality, synchronizability, and unifilarity.`,

    tags: [
      'synchronization',
      'control',
      'stochastic computation',
      'information theory'
    ],

    shortDescription:
      'Information-theoretic analysis of synchronization, controllability, and competing stochastic computation models.',

    assetIdeas: [
      'synchronization diagrams',
      'entropy convergence plots'
    ]
  },

  {
    id: 'how-hidden-are-hidden-processes',
    era: 'info-theory',

    title:
      'How hidden are hidden processes? A primer on crypticity and entropy convergence',

    authors: [
      'John R. Mahoney',
      'Christopher J. Ellison',
      'Ryan G. James',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2011,
    journal: 'Chaos',
    journalLink: 'https://doi.org/10.1063/1.3637502',
    arXivLink: 'https://arxiv.org/abs/1108.1510',
    arXivPdf: '/assets/article-pdfs/how-hidden-are-hidden-processes-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/iacp2.htm'
    ],

    abstract: `We investigate a stationary process's crypticity---a measure of the difference between its hidden state information and its observed information---using the causal states of computational mechanics. Here, we motivate crypticity and cryptic order as physically meaningful quantities that monitor how hidden a hidden process is. This is done by recasting previous results on the convergence of block entropy and block-state entropy in a geometric setting, one that is more intuitive and that leads to a number of new results. For example, we connect crypticity to how an observer synchronizes to a process. We show that the block-causal-state entropy is a convex function of block length. We give a complete analysis of spin chains. We present a classification scheme that surveys stationary processes in terms of their possible cryptic and Markov orders. We illustrate related entropy convergence behaviors using a new form of foliated information diagram. Finally, along the way, we provide a variety of interpretations of crypticity and cryptic order to establish their naturalness and pervasiveness. Hopefully, these will inspire new applications in spatially extended and network dynamical systems.`,

    tags: [
      'crypticity',
      'entropy convergence',
      'hidden processes',
      'information theory'
    ],

    shortDescription:
      'Primer on crypticity, cryptic order, and entropy convergence in stationary stochastic processes.',

    assetIdeas: [
      'entropy convergence plots',
      'information diagrams',
      'spin-chain examples'
    ]
  },

  {
    id: 'information-symmetries-irreversible-processes',
    era: 'info-theory',

    title: 'Information symmetries in irreversible processes',

    authors: [
      'Christopher J. Ellison',
      'John R. Mahoney',
      'Ryan G. James',
      'James P. Crutchfield',
      'Jorg Reichardt'
    ],

    institutions: ['UC Davis'],

    year: 2011,
    journal: 'Chaos',
    journalLink: 'https://doi.org/10.1063/1.3637490',
    arXivLink: 'https://arxiv.org/abs/1107.2168',
    arXivPdf: '/assets/article-pdfs/information-symmetries-irreversible-processes-arXiv.pdf',

    abstract: `We study dynamical reversibility in stationary stochastic processes from an information theoretic perspective. Extending earlier work on the reversibility of Markov chains, we focus on finitary processes with arbitrarily long conditional correlations. In particular, we examine stationary processes represented or generated by edge-emitting, finite-state hidden Markov models. Surprisingly, we find pervasive temporal asymmetries in the statistics of such stationary processes with the consequence that the computational resources necessary to generate a process in the forward and reverse temporal directions are generally not the same. In fact, an exhaustive survey indicates that most stationary processes are irreversible. We study the ensuing relations between model topology in different representations, the process's statistical properties, and its reversibility in detail. A process's temporal asymmetry is efficiently captured using two canonical unifilar representations of the generating model, the forward-time and reverse-time epsilon-machines. We analyze example irreversible processes whose epsilon-machine presentations change size under time reversal, including one which has a finite number of recurrent causal states in one direction, but an infinite number in the opposite. From the forward-time and reverse-time epsilon-machines, we are able to construct a symmetrized, but nonunifilar, generator of a process---the bidirectional machine. Using the bidirectional machine, we show how to directly calculate a process's fundamental information properties, many of which are otherwise only poorly approximated via process samples. The tools we introduce and the insights we offer provide a better understanding of the many facets of reversibility and irreversibility in stochastic processes.`,

    tags: [
      'irreversibility',
      'information theory',
      'hidden markov models',
      'causal states'
    ],

    shortDescription:
      'Study of temporal asymmetries and information properties in irreversible stationary stochastic processes.',

    assetIdeas: [
      'forward-reverse process diagrams',
      'bidirectional machine diagrams'
    ]
  },

  {
    id: 'moving-frames-transfer-entropy',
    era: 'info-theory',

    title:
      'Moving frames of reference, relativity and invariance in transfer entropy and information dynamics',

    authors: [
      'Joseph T. Lizier',
      'John R. Mahoney'
    ],

    institutions: ['UC Davis', 'UC Merced'],

    year: 2013,
    journal: 'Entropy',
    journalLink: 'https://doi.org/10.3390/e15010177',

    abstract: `We present a new interpretation of a local framework for information dynamics, including the transfer entropy, by defining a moving frame of reference for the observer of dynamics in lattice systems. This formulation is inspired by the idea of investigating "relativistic" effects on observing the dynamics of information - in particular, we investigate a Galilean transformation of the lattice system data. In applying this interpretation to elementary cellular automata, we demonstrate that using a moving frame of reference certainly alters the observed spatiotemporal measurements of information dynamics, yet still returns meaningful results in this context. We find that, as expected, an observer will report coherent spatiotemporal structures that are moving in their frame as information transfer, and structures that are stationary in their frame as information storage. Crucially, the extent to which the shifted frame of reference alters the results depends on whether the shift of frame retains, adds or removes relevant information regarding the source-destination interaction.`,

    tags: [
      'transfer entropy',
      'information dynamics',
      'cellular automata',
      'relativity'
    ],

    shortDescription:
      'Analysis of how moving frames of reference affect transfer entropy and local information dynamics.',

    assetIdeas: [
      'cellular automata spacetime plots',
      'moving-frame diagrams'
    ]
  },

  {
    id: 'front-propagation-fluid-flows',
    era: 'fluid',
    featured: true,

    title:
      'Invariant Manifolds and the Geometry of Front Propagation in Fluid Flows',

    authors: ['Kevin A. Mitchell', 'John R. Mahoney'],

    institutions: ['UC Merced'],

    year: 2012,
    journal: 'Chaos',
    journalLink: 'https://doi.org/10.1063/1.4746039',
    arXivLink: 'https://arxiv.org/abs/1205.1258',
    arXivPdf: '/assets/article-pdfs/front-propagation-fluid-flows-arXiv.pdf',

    abstract: `Recent theoretical and experimental work has demonstrated the existence of one-sided, invariant barriers to the propagation of reaction-diffusion fronts in quasi-two-dimensional periodically-driven fluid flows. These barriers were called burning invariant manifolds (BIMs). We provide a detailed theoretical analysis of BIMs, providing criteria for their existence, a classification of their stability, a formalization of their barrier property, and mechanisms by which the barriers can be circumvented. This analysis assumes the sharp front limit and negligible feedback of the front on the fluid velocity. A low-dimensional dynamical systems analysis provides the core of our results.`,

    tags: [
      'fluid dynamics',
      'front propagation',
      'topology',
      'reaction dynamics',
      'invariant manifolds'
    ],

    shortDescription:
      'Research on geometric structures governing reactive front propagation in two-dimensional fluid flows.',

    assetIdeas: [
      'burning invariant manifold animations',
      'fluid flow simulations',
      'reaction front videos',
      'topological barrier diagrams'
    ]
  },

  {
    id: 'invariant-barriers-reactive-front-propagation',
    era: 'fluid',

    title: 'Invariant barriers to reactive front propagation in fluid flows',

    authors: [
      'John R. Mahoney',
      'Dylan Bargteil',
      'Mark Kingsbury',
      'Kevin A. Mitchell',
      'Tom Solomon'
    ],

    institutions: ['UC Merced', 'Bucknell University'],

    year: 2012,
    journal: 'EPL',
    journalLink: 'https://doi.org/10.1209/0295-5075/98/44005',
    arXivLink: 'https://arxiv.org/abs/1108.1142',
    arXivPdf: '/assets/article-pdfs/invariant-barriers-reactive-front-propagation-arXiv.pdf',
    otherLinks: [
      'https://digitalcommons.bucknell.edu/fac_journ/279/'
    ],

    abstract: `We present theory and experiments on the dynamics of reaction fronts in two-dimensional, vortex-dominated flows, for both time-independent and periodically driven cases. We find that the front propagation process is controlled by one-sided barriers that are either fixed in the laboratory frame (time-independent flows) or oscillate periodically (periodically driven flows). We call these barriers burning invariant manifolds (BIMs), since their role in front propagation is analogous to that of invariant manifolds in the transport and mixing of passive impurities under advection. Theoretically, the BIMs emerge from a dynamical systems approach when the advection-reaction-diffusion dynamics is recast as an ODE for front element dynamics. Experimentally, we measure the location of BIMs for several laboratory flows and confirm their role as barriers to front propagation.`,

    tags: [
      'fluid dynamics',
      'reactive fronts',
      'burning invariant manifolds',
      'front propagation'
    ],

    shortDescription:
      'Theory and experiments identifying one-sided invariant barriers that control reactive front propagation in fluid flows.',

    assetIdeas: [
      'burning invariant manifold diagrams',
      'reaction-front experiments',
      'vortex flow figures'
    ]
  },

  {
    id: 'turnstile-mechanism-fronts-fluid-flows',
    era: 'fluid',

    title: 'A turnstile mechanism for fronts propagating in fluid flows',

    authors: [
      'John R. Mahoney',
      'Kevin A. Mitchell'
    ],

    institutions: ['UC Merced'],

    year: 2013,
    journal: 'Chaos',
    journalLink: 'https://doi.org/10.1063/1.4824675',
    arXivLink: 'https://arxiv.org/abs/1305.5005',
    arXivPdf: '/assets/article-pdfs/turnstile-mechanism-fronts-fluid-flows-arXiv.pdf',

    abstract: `We consider the propagation of fronts in a periodically driven flowing medium. It is shown that the progress of fronts in these systems may be mediated by a turnstile mechanism akin to that found in chaotic advection. We first define the modified ("active") turnstile lobes according to the evolution of point sources across a transport boundary. We then show that the lobe boundaries may be constructed from stable and unstable burning invariant manifolds---one-way barriers to front propagation analogous to traditional invariant manifolds for passive advection. Because the burning invariant manifolds (BIMs) are one-dimensional curves in a three-dimensional ($$xy\\theta$$) phase space, their projection into $$xy$$-space exhibits several key differences from their advective counterparts: (lobe) areas are not preserved, BIMs may self-intersect, and an intersection between stable and unstable BIMs does not map to another such intersection. These differences must be accommodated in the correct construction of the new turnstile. As an application, we consider a lobe-based treatment protocol for protecting an ocean bay from an invading algae bloom.`,

    tags: [
      'fluid dynamics',
      'front propagation',
      'turnstile mechanism',
      'burning invariant manifolds'
    ],

    shortDescription:
      'Work describing active turnstile lobes and their role in mediating front propagation in fluid flows.',

    assetIdeas: [
      'turnstile lobe diagrams',
      'fluid flow simulations',
      'transport barrier animations'
    ]
  },

  {
    id: 'finite-time-barriers-front-propagation',
    era: 'fluid',

    title:
      'Finite-time barriers to front propagation in two-dimensional fluid flows',

    authors: [
      'John R. Mahoney',
      'Kevin A. Mitchell'
    ],

    institutions: ['UC Merced'],

    year: 2015,
    journal: 'Chaos',
    journalLink: 'https://doi.org/10.1063/1.4922026',
    arXivLink: 'https://arxiv.org/abs/1503.08240',
    arXivPdf: '/assets/article-pdfs/finite-time-barriers-front-propagation-arXiv.pdf',

    abstract: `Recent theoretical and experimental investigations have demonstrated the role of certain invariant manifolds, termed burning invariant manifolds (BIMs), as one-way dynamical barriers to reaction fronts propagating within a flowing fluid. These barriers form one-dimensional curves in a two-dimensional fluid flow. In prior studies, the fluid velocity field was required to be either time-independent or time-periodic. In the present study, we develop an approach to identify prominent one-way barriers based only on fluid velocity data over a finite time interval, which may have arbitrary time-dependence. We call such a barrier a burning Lagrangian coherent structure (bLCS) in analogy to Lagrangian coherent structures (LCSs) commonly used in passive advection. Our approach is based on the variational formulation of LCSs using curves of stationary "Lagrangian shear", introduced by Farazmand, Blazevski, and Haller [Physica D 278-279, 44 (2014)] in the context of passive advection. We numerically validate our technique by demonstrating that the bLCS closely tracks the BIM for a time-independent, double-vortex channel flow with an opposing "wind".`,

    tags: [
      'fluid dynamics',
      'front propagation',
      'finite-time barriers',
      'burning lagrangian coherent structures'
    ],

    shortDescription:
      'Development of finite-time one-way barriers for reaction fronts using fluid velocity data over finite intervals.',

    assetIdeas: [
      'finite-time barrier visualizations',
      'lagrangian coherent structure plots',
      'double-vortex simulations'
    ]
  },

  {
    id: 'frozen-reaction-fronts-steady-flows',
    era: 'fluid',

    title:
      'Frozen reaction fronts in steady flows: A burning-invariant-manifold perspective',

    authors: [
      'John R. Mahoney',
      'John Li',
      'Carleen Boyer',
      'Tom Solomon',
      'Kevin A. Mitchell'
    ],

    institutions: ['UC Davis', 'UC Merced', 'Bucknell University'],

    year: 2015,
    journal: 'Physical Review E',
    journalLink: 'https://doi.org/10.1103/PhysRevE.92.063005',
    arXivLink: 'https://arxiv.org/abs/1503.08233',
    arXivPdf: '/assets/article-pdfs/frozen-reaction-fronts-steady-flows-arXiv.pdf',

    abstract: `The dynamics of fronts, such as chemical reaction fronts, propagating in two-dimensional fluid flows can be remarkably rich and varied. For time-invariant flows, the front dynamics may simplify, settling in to a steady state in which the reacted domain is static, and the front appears "frozen." Our central result is that these frozen fronts in the two-dimensional fluid are composed of segments of burning invariant manifolds, invariant manifolds of front-element dynamics in $$xy\\theta$$ space, where $$\\theta$$ is the front orientation. Burning invariant manifolds (BIMs) have been identified previously as important local barriers to front propagation in fluid flows. The relevance of BIMs for frozen fronts rests in their ability, under appropriate conditions, to form global barriers, separating reacted domains from nonreacted domains for all time. The second main result of this paper is an understanding of bifurcations that lead from a nonfrozen state to a frozen state, as well as bifurcations that change the topological structure of the frozen front. Although the primary results of this study apply to general fluid flows, our analysis focuses on a chain of vortices in a channel flow with an imposed wind. For this system, we present both experimental and numerical studies that support the theoretical analysis developed here.`,

    tags: [
      'fluid dynamics',
      'reaction fronts',
      'steady flows',
      'burning invariant manifolds'
    ],

    shortDescription:
      'Study of frozen reaction fronts in steady flows through the geometry of burning invariant manifolds.',

    assetIdeas: [
      'frozen-front diagrams',
      'channel-flow experiments',
      'bifurcation figures'
    ]
  },

  {
    id: 'occams-quantum-strop',
    era: 'quantum',
    featured: true,

    title:
      "Occam's Quantum Strop: Synchronizing and Compressing Classical Cryptic Processes via a Quantum Channel",

    authors: [
      'John R. Mahoney',
      'Cina Aghamohammadi',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2016,
    journal: 'Scientific Reports',
    journalLink: 'https://doi.org/10.1038/srep20495',
    journalPdf: '/assets/article-pdfs/occams-quantum-strop.pdf',
    arXivLink: 'https://arxiv.org/abs/1508.02760',
    arXivPdf: '/assets/article-pdfs/occams-quantum-strop-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/oqs.htm',
      'https://csc.ucdavis.edu/~jmahoney/occams-quantum-strop.html'
    ],

    abstract: `A stochastic process's statistical complexity stands out as a fundamental property: the minimum information required to synchronize one process generator to another. How much information is required, though, when synchronizing over a quantum channel? Recent work demonstrated that representing causal similarity as quantum state-indistinguishability provides a quantum advantage. We generalize this to synchronization and offer a sequence of constructions that exploit extended causal structures, finding substantial increase of the quantum advantage. We demonstrate that maximum compression is determined by the process's cryptic order---a classical, topological property closely allied to Markov order, itself a measure of historical dependence. We introduce an efficient algorithm that computes the quantum advantage and close noting that the advantage comes at a cost---one trades off prediction for generation complexity.`,

    tags: [
      'quantum information',
      'compression',
      'cryptic processes',
      'quantum representations'
    ],

    shortDescription:
      'Exploration of how quantum representations can compress predictive models of classical stochastic systems.',

    assetIdeas: [
      'quantum state diagrams',
      'classical-vs-quantum comparison graphics',
      'compression illustrations'
    ]
  },

  {
    id: 'quantum-encoded-cryptic-processes',
    era: 'quantum',

    title:
      'Minimized state complexity of quantum-encoded cryptic processes',

    authors: [
      'P. M. Riechers',
      'J. R. Mahoney',
      'Cina Aghamohammadi',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2016,
    journal: 'Physical Review A',
    journalLink: 'https://doi.org/10.1103/PhysRevA.93.052317',
    arXivLink: 'https://arxiv.org/abs/1510.08186',
    arXivPdf: '/assets/article-pdfs/quantum-encoded-cryptic-processes-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/eqc.htm'
    ],

    abstract: `The causal structure of a stochastic process can be more efficiently transmitted via a quantum channel than a classical one, an advantage that increases with codeword length. While previously difficult to compute, we express the quantum advantage in closed form using spectral decomposition, leading to direct computation of the quantum communication cost at all encoding lengths, including infinite. This makes clear how finite-codeword compression is controlled by the classical process' cryptic order and allows us to analyze structure within the length-asymptotic regime of infinite-cryptic order (and infinite Markov order) processes.`,

    tags: [
      'quantum encoding',
      'state complexity',
      'information theory'
    ],

    shortDescription:
      'Research on reducing predictive model complexity through quantum encoding methods.',

    assetIdeas: [
      'state-space figures',
      'quantum encoding diagrams'
    ]
  },

  {
    id: 'ambiguity-of-simplicity',
    era: 'quantum',

    title: 'The ambiguity of simplicity in quantum and classical simulation',

    authors: [
      'Cina Aghamohammadi',
      'John R. Mahoney',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2017,
    journal: 'Physics Letters A',
    journalLink: 'https://doi.org/10.1016/j.physleta.2016.12.036',
    arXivLink: 'https://arxiv.org/abs/1602.08646',
    arXivPdf: '/assets/article-pdfs/ambiguity-of-simplicity-arXiv.pdf',

    abstract: `A system's apparent simplicity depends on whether it is represented classically or quantally. This is not so surprising, as classical and quantum physics are descriptive frameworks built on different assumptions that capture, emphasize, and express different properties and mechanisms. What is surprising is that, as we demonstrate, simplicity is ambiguous: the relative simplicity between two systems can change sign when moving between classical and quantum descriptions. Thus, notions of absolute physical simplicity---minimal structure or memory---at best form a partial, not a total, order. This suggests that appeals to principles of physical simplicity, via Ockham's Razor or to the "elegance" of competing theories, may be fundamentally subjective, perhaps even beyond the purview of physics itself. It also raises challenging questions in model selection between classical and quantum descriptions. Fortunately, experiments are now beginning to probe measures of simplicity, creating the potential to directly test for ambiguity.`,

    tags: [
      'simplicity',
      'quantum systems',
      'classical systems',
      'complexity'
    ],

    shortDescription:
      'Comparison of notions of simplicity and complexity across classical and quantum representations.',

    assetIdeas: [
      'complexity comparison graphics',
      'representation diagrams'
    ]
  },

  {
    id: 'extreme-quantum-advantage-strongly-coupled-systems',
    era: 'quantum',

    title:
      'Extreme Quantum Advantage when Simulating Strongly Coupled Classical Systems',

    authors: [
      'Cina Aghamohammadi',
      'John R. Mahoney',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2017,
    journal: 'Scientific Reports',
    journalLink: 'https://doi.org/10.1038/s41598-017-04928-7',
    journalPdf: '/assets/article-pdfs/extreme-quantum-advantage-strongly-coupled-systems.pdf',
    arXivLink: 'https://arxiv.org/abs/1609.03650',
    arXivPdf: '/assets/article-pdfs/extreme-quantum-advantage-strongly-coupled-systems-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/isingcql.htm'
    ],

    abstract: `Classical stochastic processes can be generated by quantum simulators instead of the more standard classical ones, such as hidden Markov models. One reason for using quantum simulators has recently come to the fore: they generally require less memory than their classical counterparts. Here, we examine this quantum advantage for strongly coupled spin systems--the Dyson-like one-dimensional Ising spin chain with variable interaction length. We find that the advantage scales with both interaction range and temperature, growing without bound as interaction increases. In particular, it is impossible to classically simulate Dyson's original spin chain since it requires infinite memory, while quantum simulators can do so since they use only finite memory. Thus, quantum systems can very efficiently simulate strongly coupled classical systems.`,

    tags: [
      'quantum advantage',
      'quantum simulation',
      'ising model',
      'stochastic processes'
    ],

    shortDescription:
      'Study of quantum memory advantages for simulating strongly coupled spin systems and long-range classical processes.',

    assetIdeas: [
      'ising chain diagrams',
      'classical-vs-quantum memory plots',
      'interaction-range scaling figures'
    ]
  },

  {
    id: 'extreme-quantum-memory-rare-event-sampling',
    era: 'quantum',

    title: 'Extreme Quantum Memory Advantage for Rare-Event Sampling',

    authors: [
      'Cina Aghamohammadi',
      'Samuel P. Loomis',
      'John R. Mahoney',
      'James P. Crutchfield'
    ],

    institutions: ['UC Davis'],

    year: 2018,
    journal: 'Physical Review X',
    journalLink: 'https://doi.org/10.1103/PhysRevX.8.011025',
    arXivLink: 'https://arxiv.org/abs/1707.09553',
    arXivPdf: '/assets/article-pdfs/extreme-quantum-memory-rare-event-sampling-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/eqafbs.htm'
    ],

    abstract: `We introduce a quantum algorithm for memory-efficient biased sampling of rare events generated by classical memoryful stochastic processes. Two efficiency metrics are used to compare quantum and classical resources for rare-event sampling. For a fixed stochastic process, the first is the classical-to-quantum ratio of required memory. We show for two example processes that there exists an infinite number of rare-event classes for which the memory ratio for sampling is larger than $$r$$, for any large real number $$r$$. Then, for a sequence of processes each labeled by an integer size $$N$$, we compare how the classical-to-quantum required memory ratio scales with $$N$$. In this setting, since both memories can diverge as $$N \\to \\infty$$, the efficiency metric tracks how fast they diverge. An extreme quantum memory advantage exists when the classical memory diverges in the limit $$N \\to \\infty$$, but the quantum memory has a finite bound. We then show that finite-state Markov processes and spin chains exhibit extreme memory advantage for sampling of almost all of their rare-event classes.`,

    tags: [
      'quantum advantage',
      'rare-event sampling',
      'biased sampling',
      'stochastic processes'
    ],

    shortDescription:
      'Quantum algorithm work showing large memory advantages for biased sampling of rare events.',

    assetIdeas: [
      'rare-event sampling diagrams',
      'memory-scaling plots',
      'spin-chain examples'
    ]
  },

  {
    id: 'causal-asymmetry-quantum-world',
    era: 'quantum',

    title: 'Causal Asymmetry in a Quantum World',

    authors: [
      'Jayne Thompson',
      'Andrew J. P. Garner',
      'John R. Mahoney',
      'James P. Crutchfield',
      'Vlatko Vedral',
      'Mile Gu'
    ],

    institutions: [
      'National University of Singapore',
      'UC Davis',
      'University of Oxford',
      'Nanyang Technological University'
    ],

    year: 2018,
    journal: 'Physical Review X',
    journalLink: 'https://doi.org/10.1103/PhysRevX.8.031013',
    arXivLink: 'https://arxiv.org/abs/1712.02368',
    arXivPdf: '/assets/article-pdfs/causal-asymmetry-quantum-world-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/caqw.htm'
    ],

    abstract: `Causal asymmetry is one of the great surprises in predictive modeling: The memory required to predict the future differs from the memory required to retrodict the past. There is a privileged temporal direction for modeling a stochastic process where memory costs are minimal. Models operating in the other direction incur an unavoidable memory overhead. Here, we show that this overhead can vanish when quantum models are allowed. Quantum models forced to run in the less-natural temporal direction not only surpass their optimal classical counterparts but also any classical model running in reverse time. This holds even when the memory overhead is unbounded, resulting in quantum models with unbounded memory advantage.`,

    tags: [
      'causal asymmetry',
      'quantum models',
      'prediction',
      'retrodiction'
    ],

    shortDescription:
      'Quantum modeling result showing that classical temporal memory asymmetry can disappear with quantum models.',

    assetIdeas: [
      'prediction-retrodiction diagrams',
      'memory-cost comparisons',
      'temporal direction graphics'
    ]
  },

  {
    id: 'prediction-generation-binary-markov-processes',
    era: 'info-theory',

    title:
      'Prediction and Generation of Binary Markov Processes: Can a Finite-State Fox Catch a Markov Mouse?',

    authors: [
      'Joshua B. Ruebeck',
      'Ryan G. James',
      'John R. Mahoney',
      'James P. Crutchfield'
    ],

    institutions: ['Carleton College', 'UC Davis'],

    year: 2018,
    journal: 'Chaos',
    journalLink: 'https://doi.org/10.1063/1.5003041',
    arXivLink: 'https://arxiv.org/abs/1708.00113',
    arXivPdf: '/assets/article-pdfs/prediction-generation-binary-markov-processes-arXiv.pdf',
    otherLinks: [
      'https://csc.ucdavis.edu/~cmg/compmech/pubs/gmc.htm'
    ],

    abstract: `Understanding the generative mechanism of a natural system is a vital component of the scientific method. Here, we investigate one of the fundamental steps toward this goal by presenting the minimal generator of an arbitrary binary Markov process. This is a class of processes whose predictive model is well known. Surprisingly, the generative model requires three distinct topologies for different regions of parameter space. We show that a previously proposed generator for a particular set of binary Markov processes is, in fact, not minimal. Our results shed the first quantitative light on the relative minimal costs of prediction and generation. We find, for instance, that the difference between prediction and generation is maximized when the process is approximately independently, identically distributed.`,

    tags: [
      'markov processes',
      'prediction',
      'generation',
      'computational mechanics'
    ],

    shortDescription:
      'Analysis of the minimal generators needed for arbitrary binary Markov processes.',

    assetIdeas: [
      'markov process diagrams',
      'generator topology maps',
      'prediction-vs-generation comparisons'
    ]
  },

  {
    id: 'mode-locking-advection-reaction-diffusion',
    era: 'fluid',

    title:
      'Mode-locking in advection-reaction-diffusion systems: An invariant manifold perspective',

    authors: [
      'Rory A. Locke',
      'John R. Mahoney',
      'Kevin A. Mitchell'
    ],

    institutions: ['UC Merced'],

    year: 2018,
    journal: 'Chaos',
    journalLink: 'https://doi.org/10.1063/1.5004699',
    arXivLink: 'https://arxiv.org/abs/1709.05415',
    arXivPdf: '/assets/article-pdfs/mode-locking-advection-reaction-diffusion-arXiv.pdf',

    abstract: `Fronts propagating in two-dimensional advection-reaction-diffusion (ARD) systems exhibit rich topological structure. When the underlying fluid flow is periodic in space and time, the reaction front can lock to the driving frequency. We explain this mode-locking phenomenon using so-called burning invariant manifolds (BIMs). In fact, the mode-locked profile is delineated by a BIM attached to a relative periodic orbit (RPO) of the front element dynamics. Changes in the type and loss of mode-locking can be understood in terms of local and global bifurcations of the RPOs and their BIMs. We illustrate these concepts numerically using a chain of alternating vortices in a channel geometry.`,

    tags: [
      'fluid dynamics',
      'mode-locking',
      'advection-reaction-diffusion',
      'burning invariant manifolds'
    ],

    shortDescription:
      'Invariant-manifold explanation of mode-locking behavior in advection-reaction-diffusion fronts.',

    assetIdeas: [
      'mode-locking diagrams',
      'alternating-vortex simulations',
      'relative periodic orbit figures'
    ]
  },

  {
    id: 'computational-mechanics-food-webs',
    era: 'info-theory',

    title: 'Computational mechanics and information measures in food webs',

    authors: [
      'O. Bochmann',
      'Joseph T. Lizier',
      'John R. Mahoney',
      'G. Obernosterer',
      'J. Pahle'
    ],

    institutions: ['Santa Fe Institute'],

    year: 2007,
    journal:
      'Proceedings of the Santa Fe Institute Complex Systems Summer School',
    otherLinks: [
      'https://wiki.santafe.edu/images/9/99/FoodWeb.pdf'
    ],

    abstract: `In this study we reconstruct predator-prey relationships from biomass time series of a simulated system of interacting species. To overcome the shortcomings of a static food webs representation we introduce a new model which accounts for both population and interaction dynamics. It is a derived version of the light-cone model from special relativity theory. To identify the existence of predator-prey relationships in the system we quantify the notion of distance in a food web. We use known measures from information theory, namely mutual information and transfer entropy, and we introduce a new measure based on causal states of point and patch predictors. To evaluate our results we compare the distances measured with a minimum distance measure from the underlying food web, and examine the accuracy of the measures in inferring the existence of the actual predator-prey relationships. First results show that our new measure based on causal states of point and patch predictors together with the transfer entropy measure outperform the mutual information measure in terms of distance accuracy. A threshold based method to estimate adjacent links shows similar results.`,

    tags: [
      'computational mechanics',
      'information measures',
      'food webs',
      'complex systems'
    ],

    shortDescription:
      'Complex Systems Summer School proceedings paper applying computational mechanics and information measures to food webs.',

    assetIdeas: [
      'food web network diagrams',
      'information-measure comparison plots'
    ]
  }
]
