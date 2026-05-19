export const paperConcepts = {
  'times-barbed-arrow': {
    doorway:
      'A paper about why observed organization and internal memory can come apart in time series.',
    question: 'When does a process store more information than its past–future link reveals?',
    reframe:
      'Irreversibility and hidden state information determine whether “stored” and “shared” information coincide.',
    pitch:
      'This paper revisits a classic puzzle in information theory: the information shared between past and future does not always match the information a system stores to predict. Using computational mechanics, it derives closed-form expressions that connect excess entropy to forward and reverse causal models. The result is a framework that explains when these quantities agree, when they diverge, and what that says about irreversibility and crypticity.',
    detail: `Excess entropy measures how much the past tells you about the future in observations. Statistical complexity measures how much information an optimal predictive model must store internally. If prediction needs memory, it is tempting to assume these are the same quantity.

This paper shows why they are not generally equal. By expressing excess entropy in terms of forward and reverse-time causal state representations (epsilon-machines), it makes precise how “what you must remember” differs from “what you can see”.

The key ingredients are causal irreversibility and crypticity: properties that describe how time-asymmetry and hidden state information shape what is accessible in observations. With these in hand, the paper provides a classification of when stored and shared information align—and when a system’s present hides part of its own memory.`,
    haiku: `Past meets future’s hint
But memory sits in shadow
Time keeps a secret`,
    limerick: `A process looked tidy and neat,
With past and future that meet.
But what it must store
Was hidden from score—
So “shared” and “saved” don’t compete.`,
    aphorism:
      'A system can remember more than it is willing to show in its data.',
    koan: 'If the future knows the past, why must the present still keep a model?'
  },

  'information-accessibility': {
    doorway:
      'A paper about measuring how much of a system’s internal state is invisible in observations.',
    question: 'How hidden can a hidden process be, even when its model is finite?',
    reframe:
      'Crypticity quantifies not randomness, but the inaccessibility of a process’s internal information.',
    pitch:
      'This paper develops crypticity as a way to ask how much internal state information remains inaccessible in a stationary process. It introduces a systematic expansion of crypticity that leads to a hierarchy of k-cryptic processes, including finite-state examples with infinite crypticity. Along the way, it connects crypticity to Markov order and gives an efficient, exact expansion for computing excess entropy in finite-order cryptic cases.',
    detail: `Even when a process has a compact hidden-state model, the information in those states may not be recoverable from finite observation windows. Crypticity is introduced to measure that gap: how much state information is effectively “locked away” from what you can see.

The paper builds a step-by-step (k-cryptic) expansion that characterizes how far into an observation sequence the hidden information is spread. This yields a hierarchy that distinguishes processes where the hidden information becomes accessible after a finite length from those where it persists across arbitrarily long observations.

One payoff is computational: the expansion provides a direct way to compute excess entropy exactly for finite-order cryptic processes. Conceptually, it separates two notions that are often conflated—finite memory and accessible memory—showing that a process can be finite-state and still indefinitely cryptic.`,
    haiku: `States behind the mask
Seen only in long shadows
Access takes its time`,
    limerick: `A model had states you could name,
Yet data concealed them the same.
With crypticity’s chart,
The hidden took part—
But stayed out of reach of the frame.`,
    aphorism:
      'A finite model does not guarantee that its memory is observable.',
    koan: 'If the state is there, but cannot be inferred, is it truly “known”?'
  },

  'natural-time-scales': {
    doorway:
      'A paper about the intrinsic lengths of time it takes to learn where a process is.',
    question:
      'How long must an observer watch before it can synchronize to a process’s hidden state?',
    reframe:
      'Synchronization time scales are structural and topological, not merely probabilistic.',
    pitch:
      'This paper studies two time scales that govern synchronization to a finitary stochastic process: Markov order and cryptic order. It shows how to compute both exactly, most efficiently from the process’s epsilon-machine. A key surprise is that Markov order is not a simple probabilistic property; it is a topological feature that can depend on the specific representation used.',
    detail: `To predict well, an observer needs to align with the process’s internal organization. Two questions naturally arise: how far back must the observer look for the future to become conditionally independent (Markov order), and how far must it look before hidden state information is fully revealed (cryptic order)?

This paper treats those questions as concrete, computable time scales. It shows that both orders can be calculated exactly and that the epsilon-machine—the minimal unifilar model—provides the right representation for doing so.

The conceptual message is that “memory length” is not always what it seems. Markov order, often introduced as a probabilistic notion, turns out to be topological and representation-sensitive, and the paper’s survey emphasizes that infinite orders are common even among finite-memory processes.`,
    haiku: `Watching long enough
Some patterns still won’t confess
Topology waits`,
    limerick: `An observer tried hard to sync,
Counting past bits in a blink.
But order, it seems,
Lives in modelled seams—
Not only in probabilistic ink.`,
    aphorism:
      'How long you must watch depends on the process’s structure, not just its noise.',
    koan: 'If memory is finite, why can synchronization require infinite patience?'
  },

  'information-accessibility-linear-combinations': {
    doorway:
      'A paper about building a reverse-time model of a hidden process from its forward-time structure.',
    question:
      'How can you reconstruct a process backward in time when you only know its forward causal states?',
    reframe:
      'Time reversal can be computed as a transformation on causal states, not as a separate modeling problem.',
    pitch:
      'This working paper shows how to derive the time-reversed representation of a stationary hidden stochastic process using linear combinations of forward-time epsilon-machine causal states. It makes the reverse-time model constructive rather than conceptual. As a byproduct, it provides a way to check the k-cryptic expansion that describes how internal state information is spread across observations.',
    detail: `Forward-time epsilon-machines are designed for prediction: they group past histories that lead to the same future statistics. But retrodiction asks a different question: what structure is required to “predict” the past from the future?

This paper shows that you do not necessarily need to start from scratch. Under the hood, the reverse-time representation can be obtained from the forward-time causal states via linear combinations, giving a concrete procedure for building the reversed model.

Conceptually, the result emphasizes that temporal direction is not just a narrative choice: it can change the model you need. And the construction interacts naturally with crypticity expansions, offering checks on how much internal information remains inaccessible at a given observation length.`,
    haiku: `Backward-facing map
Built from forward-state shadows
Time turns in a sum`,
    limerick: `A modeller looked to reverse,
But found that it needn’t be worse.
With states in a blend,
The time arrow can bend—
And cryptic expansions rehearse.`,
    aphorism:
      'To reverse a process, sometimes you recombine its states rather than reinvent them.',
    koan: 'When a past is rebuilt from mixtures, which history was ever singular?'
  },

  'synchronization-control-intrinsic-designed-computation': {
    doorway:
      'A paper about how learning a system’s hidden state depends on both the system and the model you use.',
    question:
      'What does it mean to synchronize to a process when your representation may be competing, not unique?',
    reframe:
      'Synchronization is a joint property of process structure and observer model, with a dual notion of controllability.',
    pitch:
      'This paper adapts information-theoretic tools to analyze how an observer synchronizes to the hidden states of a finitary stationary process. It studies entropy convergence not only for observed blocks, but also for blocks paired with model states. From these convergences it introduces a hierarchy of information measures, and uses them to classify alternative process representations by minimality, synchronizability, and unifilarity, while highlighting a duality between synchronization and controllability.',
    detail: `When you model a stochastic process, you pick a representation—sometimes one of several that can generate the same observed statistics. This paper asks: how does that choice affect the observer’s ability to synchronize to the process’s hidden state?

To answer, it examines how different entropies converge with block length, including entropies that involve both observation blocks and model states. These convergence curves act like signatures of how quickly and how reliably an observer can lock onto the underlying state.

The paper also draws a dual connection to control: if synchronization is about inferring the state from outputs, controllability is about steering the state through inputs. Together, these ideas support a classification of models that separates “minimal” from merely “correct”, and “synchronizable” from merely “generative”.`,
    haiku: `Models watch a stream
Some learn the hidden quickly
Some never align`,
    limerick: `A process had states out of sight,
And models that argued all night.
Some synced with a glance,
Some missed every chance—
So structure and observer must write.`,
    aphorism:
      'A process does not synchronize to you; your model synchronizes to the process.',
    koan: 'If two models agree on data, which one truly “knows” the hidden state?'
  },

  'how-hidden-are-hidden-processes': {
    doorway:
      'A paper about making “hiddenness” measurable, using geometry to understand entropy convergence.',
    question:
      'How can we tell whether a process is slightly hidden or deeply hidden from finite observations?',
    reframe:
      'Crypticity becomes a geometric story about how information unfolds with observation length.',
    pitch:
      'This paper serves as a primer on crypticity and cryptic order, connecting them to how block entropies converge. By recasting entropy convergence in a geometric setting, it provides a more intuitive way to see how hidden state information differs from observed information. It develops results such as convexity of block–causal-state entropy, analyzes spin chains in detail, and surveys processes by cryptic and Markov orders using new information-diagram visualizations.',
    detail: `“Hidden process” can mean many things: hidden states, long-range correlations, or simply that finite data does not reveal the mechanism. This paper focuses on a specific gap: the difference between internal state information and what observations make accessible.

By reframing block entropy and block-state entropy convergence geometrically, it turns technical limits into shapes you can reason about. In that view, crypticity and cryptic order become natural descriptors of how quickly hidden information is exposed as you observe longer blocks.

The paper connects these quantities to synchronization and provides concrete analyses (including spin chains) that show how cryptic and Markov orders vary across processes. The overall effect is to make “how hidden” feel like a graded, structural property rather than a vague label.`,
    haiku: `Hiddenness has depth
Entropy curves bend and rise
Geometry speaks`,
    limerick: `A process seemed hidden by chance,
But diagrams gave it a stance.
With crypticity’s slope,
One could measure the hope—
Of seeing the state at a glance.`,
    aphorism:
      'Hiddenness is not a mystery; it is a rate at which information becomes accessible.',
    koan: 'If the entropy curve is smooth, where does the hidden state hide?'
  },

  'information-symmetries-irreversible-processes': {
    doorway:
      'A paper about why running a process backward in time can demand a different amount of memory.',
    question:
      'Why can generating a process in reverse require more structure than generating it forward?',
    reframe:
      'Irreversibility shows up as asymmetry between forward and reverse causal models, not just as unequal probabilities.',
    pitch:
      'This paper studies dynamical reversibility in stationary stochastic processes through an information-theoretic lens. Focusing on finitary processes generated by finite-state hidden Markov models, it finds that temporal asymmetries are pervasive: the computational resources needed to generate a process forward and backward typically differ. Using forward-time and reverse-time epsilon-machines, it constructs a bidirectional (generally nonunifilar) generator that enables direct calculation of key information properties.',
    detail: `Reversibility is often introduced via detailed balance or symmetric transition structure, especially for Markov chains. This paper asks what reversibility looks like for more general stationary processes, including those with long conditional correlations.

The central observation is practical: the smallest model that generates the process forward in time may not be the smallest model that generates it backward. Forward and reverse epsilon-machines can differ in size and topology, and the paper surveys how common that mismatch is.

To compute information measures that otherwise require large samples, the paper introduces the bidirectional machine, built from the forward and reverse representations. That construction makes irreversibility concrete: it becomes a statement about which direction admits a simpler generator, and how information is organized across time.`,
    haiku: `Forward time is cheap
Backward time can cost more state
Asymmetry lives`,
    limerick: `A process ran forward with ease,
But backward it buckled the keys.
The states rearranged,
The topology changed—
So time has asymmetric fees.`,
    aphorism:
      'A process can be stationary and still have a preferred modeling direction.',
    koan: 'If the statistics are the same, why does the reverse need more memory?'
  },

  'moving-frames-transfer-entropy': {
    doorway:
      'A paper about how what counts as “information transfer” depends on the observer’s frame of reference.',
    question:
      'If a structure moves past you, is it transferring information—or are you just standing still?',
    reframe:
      'Information dynamics in lattices can be “relativized” by shifting the observer’s frame, changing what looks like transfer versus storage.',
    pitch:
      'This paper reinterprets local information dynamics measures—especially transfer entropy—by introducing a moving frame of reference for lattice systems. Inspired by Galilean transformations, it examines how shifting the observer’s frame changes spatiotemporal measurements of information transfer and storage in cellular automata. The results show that the measures remain meaningful, but what they highlight depends on whether the frame shift retains or discards relevant interaction information.',
    detail: `Local transfer entropy is often used to identify where information is flowing across space and time. But in lattice systems with coherent moving structures, “flow” can be tangled with motion: what looks like transfer in a fixed frame may be a stable structure simply passing by.

This paper proposes a moving observer. By applying Galilean-like shifts to the data, it studies how information-dynamics fields change with the chosen frame and uses cellular automata as a testbed.

The conceptual takeaway is not that the measures are arbitrary, but that they are observer-dependent in a principled way. In a frame where a structure is stationary, it tends to register as information storage; in a frame where it moves, it can register as information transfer—unless the frame shift itself removes the relevant source–destination interaction.`,
    haiku: `Shift the watching eye
Motion becomes stored pattern
Transfer rearranged`,
    limerick: `A glider went speeding along,
And transfer looked clear and strong.
But move with its pace,
And in that new place,
Storage was where it belonged.`,
    aphorism:
      'Information flow is partly a story about how you choose to stand and watch.',
    koan: 'When you chase the signal, what remains of “transfer”?'
  },

  'front-propagation-fluid-flows': {
    doorway:
      'A paper about the geometric curves that act as one-way gates for spreading fronts in flows.',
    question:
      'What structures guide a front when it is both carried by a flow and burning forward?',
    reframe:
      'Front propagation can be treated as a low-dimensional dynamics whose invariant manifolds become one-sided barriers.',
    pitch:
      'This paper analyzes burning invariant manifolds (BIMs), one-sided invariant barriers that constrain reaction-diffusion fronts in quasi-two-dimensional flows. It develops criteria for when BIMs exist, classifies their stability, formalizes what “barrier” means for a front that can advance under its own speed, and describes mechanisms by which a front can circumvent such barriers. The treatment assumes a sharp-front limit with negligible feedback on the velocity field and builds the theory from front-element dynamics.',
    detail: `In passive transport, invariant manifolds explain how material stretches and mixes. For reactive fronts, the boundary is not passive: it also propagates normal to itself. That extra motion changes what “invariant” means and what can serve as a barrier.

This paper recasts advection–reaction–diffusion front motion as an ordinary differential equation for front elements, including position and orientation. In that reduced description, BIMs appear as invariant manifolds that a front can approach but cannot cross in the forbidden direction.

Beyond identifying BIMs, the paper clarifies how barriers can fail: geometry and dynamics can create routes around them. The result is a more complete picture of front propagation as a blend of flow advection, intrinsic front speed, and the invariant structures that organize both.`,
    haiku: `Front leans into flow
Manifolds burn one-way gates
Paths open, paths close`,
    limerick: `A front in a vortexy brew
Found barriers nobody knew.
They blocked in one way,
Yet gave routes to stray—
So geometry mattered, not glue.`,
    aphorism:
      'A front’s barrier is directional: it forbids crossing one way, not all ways.',
    koan: 'If a barrier can be bypassed, what was it truly barring?'
  },

  'invariant-barriers-reactive-front-propagation': {
    doorway:
      'A paper about experimentally finding one-sided curves that stop a reaction front from advancing.',
    question:
      'Can a moving front be constrained by structures that behave like invariant manifolds in mixing?',
    reframe:
      'Front propagation has its own “invariant manifold” barriers once you model the front as an active dynamical object.',
    pitch:
      'This paper presents theory and experiments showing that reaction fronts in two-dimensional vortex-dominated flows are organized by one-sided barriers. In steady flows these barriers are fixed in the lab frame; in periodically driven flows they oscillate. The paper calls them burning invariant manifolds (BIMs), since they play a role for fronts analogous to invariant manifolds for passive advection, and confirms their barrier role by measuring BIM locations in laboratory flows.',
    detail: `A reaction front is not just a dye line—it advances. That makes “transport across a boundary” a different problem than passive mixing, because the boundary itself has dynamics.

The paper develops a dynamical-systems description by turning advection–reaction–diffusion front motion into a front-element ODE. In that state space, BIMs emerge as invariant structures that block front propagation in one direction.

What makes the paper distinctive is that the barrier idea is not only theoretical. It reports experimental measurements of these BIMs in laboratory flows and compares them to observed front motion, supporting the claim that the geometry of BIMs predicts where the front can and cannot invade.`,
    haiku: `One-sided boundary
In vortices, flame hesitates
Manifolds appear`,
    limerick: `A front met a swirling affair,
And tried to go through if it dared.
But BIMs drew a line,
One-sided by design—
And experiments showed they were there.`,
    aphorism:
      'For an active front, the relevant barriers are not walls but directions.',
    koan: 'When a curve blocks only one way, is it a barrier or a rule of motion?'
  },

  'frozen-reaction-fronts-steady-flows': {
    doorway:
      'A paper about why some reaction fronts stop moving and settle into a fixed shape inside a flow.',
    question:
      'When can a propagating front become “frozen” even though the fluid keeps moving?',
    reframe:
      'A frozen front is not an accident; it is built from invariant-manifold segments that form a global barrier.',
    pitch:
      'This paper studies time-invariant flows where a reaction front can reach a steady state and appear frozen. It shows that such frozen fronts are composed of segments of burning invariant manifolds in the front-element state space. It also analyzes bifurcations that create frozen states and that change their topology, supported by experiments and numerics in a vortex-chain channel flow with an imposed wind.',
    detail: `In steady flows, it might seem that an advancing reaction front should either sweep through or be washed away. Yet experiments show a third outcome: the reacted region can settle into a static shape, with a front that no longer advances.

This paper explains that geometry using burning invariant manifolds. In the front-element dynamics (including orientation), BIMs are local one-way barriers. Under appropriate conditions, collections of BIM segments can stitch together into a global barrier that permanently separates reacted from unreacted regions, producing a frozen front.

The paper also treats frozen fronts as dynamical states that can appear or disappear through bifurcations. That framing turns a visually striking phenomenon into a structured story: frozen profiles correspond to changes in invariant structures and their connections.`,
    haiku: `Flow keeps circling on
Yet the flame draws a still line
Frozen by geometry`,
    limerick: `A front in a steady regime
Turned static, against the stream’s theme.
BIM segments aligned,
Made barriers that bind—
And “frozen” became more than dream.`,
    aphorism:
      'A front can stop moving when the invariant geometry gives it nowhere to go.',
    koan: 'If the fluid moves and the front does not, which one is truly “flowing”?'
  },

  'quantum-encoded-cryptic-processes': {
    doorway:
      'A paper about computing how much quantum communication can compress a process’s causal structure.',
    question:
      'How much less memory is needed when causal states are sent as quantum states?',
    reframe:
      'Finite-length quantum compression is governed by classical structure—especially cryptic order—even in the quantum setting.',
    pitch:
      'This paper studies how efficiently a stochastic process’s causal structure can be transmitted through a quantum channel. It shows that the quantum advantage typically grows with codeword length and derives closed-form expressions, via spectral decomposition, for the quantum communication cost at all lengths, including the infinite-length limit. The results clarify how finite-codeword compression is controlled by the classical process’s cryptic order and how to analyze cases with infinite cryptic and Markov orders.',
    detail: `Quantum models can sometimes represent overlaps between classical predictive states more compactly than any classical encoding. But quantifying that advantage across finite encoding lengths can be technically difficult.

This paper provides a direct computational route: using spectral decomposition, it expresses the quantum communication cost in closed form for all codeword lengths, not just in limiting regimes. That makes the “quantum advantage versus length” curve something you can calculate rather than guess.

Conceptually, the work ties quantum compressibility back to classical structure. Cryptic order—how hidden information is distributed across observations—controls how much compression is available at finite lengths, and the framework helps interpret behavior even when classical orders are infinite.`,
    haiku: `Quantum codewords grow
Classical hiddenness still rules
Compression unfolds`,
    limerick: `A process was costly to send,
So quantum encodings could bend.
With spectra in hand,
Costs fell as planned—
And cryptic order steered the trend.`,
    aphorism:
      'Quantum compression depends on the overlaps your classical structure already contains.',
    koan: 'If the codeword length grows without bound, what does “memory” mean then?'
  },

  'ambiguity-of-simplicity': {
    doorway:
      'A paper about why “simple” can flip meaning when you change from classical to quantum descriptions.',
    question:
      'Can one system be simpler than another in classical terms, but more complex in quantum terms?',
    reframe:
      'Simplicity is not a total order: classical and quantum measures can rank the same systems differently.',
    pitch:
      'This paper argues that a system’s apparent simplicity depends on the descriptive framework used. It shows that relative simplicity between two systems can change sign when moving between classical and quantum representations, implying that “minimal structure” does not always define a single, consistent ordering. The result complicates appeals to Ockham’s Razor in model choice and suggests that experiments may be needed to resolve which notion of simplicity is relevant in practice.',
    detail: `Scientists often lean on simplicity to choose between models: fewer parameters, less memory, less structure. But simplicity is measured inside a framework, and classical and quantum descriptions emphasize different kinds of structure.

This paper demonstrates that the notion is ambiguous in a sharp way: two systems can swap their simplicity ranking depending on whether you evaluate them with classical or quantum simulation measures. That means there is no guarantee of an “absolute” simplicity order that everyone must agree on.

The takeaway is not that simplicity is useless, but that it is partial and context-dependent. When classical and quantum notions disagree, the paper suggests that deciding which simplicity matters may require experimental access to the relevant resource costs.`,
    haiku: `Razor in two hands
One blade cuts, the other flips
Simple changes sign`,
    limerick: `Two systems were judged by their price,
And “simple” seemed easy and nice.
But quantum would claim
The reverse of the same—
So ranking was not so precise.`,
    aphorism:
      'Simplicity is a comparison you make inside a theory, not a property a system carries alone.',
    koan: 'When two razors disagree, which one is cutting the truth?'
  },

  'extreme-quantum-advantage-strongly-coupled-systems': {
    doorway:
      'A paper about quantum simulators that can use far less memory than classical ones for strongly coupled systems.',
    question:
      'How can a quantum simulator stay finite-memory when the best classical simulator’s memory diverges?',
    reframe:
      'Strong coupling can make classical predictive memory blow up while quantum encodings remain bounded.',
    pitch:
      'This paper examines quantum memory advantages for simulating strongly coupled classical spin systems, focusing on a Dyson-like one-dimensional Ising chain with variable interaction length. It finds that the quantum advantage grows with interaction range and temperature, and can become unbounded: some cases require infinite classical memory but only finite quantum memory. The work emphasizes that quantum simulators can efficiently generate classical stochastic processes that are prohibitively memory-hungry for classical hidden-state models.',
    detail: `Simulating a classical stochastic process typically requires storing enough information to reproduce its long-range dependencies. In strongly coupled systems, those dependencies can stretch far, driving up the memory required by classical generators.

This paper compares classical and quantum simulators for a family of long-range Ising spin chains. It reports that as coupling range increases (and with temperature effects), the gap between classical and quantum required memory can grow without bound, including regimes where the classical memory requirement diverges.

The conceptual point is that “hard to simulate” is framework-dependent. Quantum encodings can exploit state overlap to keep memory finite even when classical models need ever more distinct states to track the same process.`,
    haiku: `Long-range spins bind
Classical memory swells wide
Quantum stays compact`,
    limerick: `A spin chain with coupling held tight
Made classical models take flight—
To infinite store.
But quantum said “No more,”
And kept a finite memory light.`,
    aphorism:
      'Quantum models can keep memory bounded by letting distinctions blur without losing predictability.',
    koan: 'If the process is classical, where does the quantum memory savings come from?'
  },

  'extreme-quantum-memory-rare-event-sampling': {
    doorway:
      'A paper about sampling rare behaviors of a process using far less quantum memory than classical memory.',
    question:
      'When you bias a process toward rare events, why can classical sampling memory explode?',
    reframe:
      'Rare-event classes can amplify memory costs, and quantum encodings can soften that amplification.',
    pitch:
      'This paper introduces a quantum algorithm for memory-efficient biased sampling of rare events generated by classical memoryful stochastic processes. It compares quantum and classical resources using memory ratios for fixed processes and scaling rates for families of processes. The results show that there are infinitely many rare-event classes with arbitrarily large classical-to-quantum memory ratios, and that in many cases classical memory diverges while quantum memory remains bounded.',
    detail: `Rare-event sampling changes the question you ask of a process. Instead of reproducing typical behavior, you bias sampling toward unlikely trajectories—effectively selecting a different “rare-event class” of the same underlying dynamics.

The paper proposes a quantum algorithm for this biased sampling and compares it to classical approaches using memory-based efficiency metrics. For a fixed process, it studies how large the classical-to-quantum memory ratio can become across rare-event classes; for process families indexed by size, it studies how the two required memories scale as size grows.

The key message is that biasing toward rare events can be a memory amplifier, pushing classical models into divergence even when quantum models retain a finite bound. This reframes rare-event sampling not just as a computational challenge, but as a setting where representational advantages become extreme.`,
    haiku: `Chasing rare pathways
Classical memory inflates
Quantum stays steady`,
    limerick: `To sample the rare, one must lean,
Biasing what’s usually seen.
Classical grew huge,
Quantum found a subterfuge—
And memory stayed tight and clean.`,
    aphorism:
      'When you tilt a process toward the rare, you can turn memory into the limiting resource.',
    koan: 'If a rare event becomes typical under bias, what “process” are you sampling?'
  },

  'causal-asymmetry-quantum-world': {
    doorway:
      'A paper about how quantum models can erase the usual asymmetry between predicting forward and backward in time.',
    question:
      'Why should the future be harder to model than the past, and can quantum models remove that bias?',
    reframe:
      'Causal asymmetry is a memory effect of classical models that quantum representations can eliminate.',
    pitch:
      'This paper studies causal asymmetry: the phenomenon that predicting the future and retrodicting the past can require different memory costs. In classical settings there is often a privileged temporal direction with minimal memory, while the opposite direction incurs overhead that can be unbounded. The paper shows that allowing quantum models can make that overhead vanish, with quantum models outperforming optimal classical models even when classical asymmetry diverges.',
    detail: `In many stochastic processes, the “best” forward-time predictive model and the “best” reverse-time retrodictive model do not match in memory cost. That mismatch suggests a kind of temporal privilege: one direction is cheaper to model.

This paper asks whether that privilege is fundamental or representational. It reports that when quantum models are allowed, the extra memory cost of modeling in the less-natural direction can disappear. In other words, the asymmetry can be a feature of classical representations rather than of the process itself.

The conceptual impact is that “causal direction” can be entangled with the modeling language. A process that forces classical models into expensive reverse-time representations can admit quantum models that treat the two directions on equal footing, sometimes with unbounded advantage over any classical reverse-time model.`,
    haiku: `Time seems one-way hard
Memory favors a direction
Quantum levels it`,
    limerick: `A modeller ran time in reverse,
And paid a steep memory curse.
But quantum would glide
With overhead denied—
And made the asymmetry terse.`,
    aphorism:
      'Some temporal arrows are drawn by the models we use, not by the data alone.',
    koan: 'If quantum memory makes past and future symmetric, where did the arrow go?'
  },

  'prediction-generation-binary-markov-processes': {
    doorway:
      'A paper about the surprising gap between modeling a process to predict and building a machine to generate it.',
    question:
      'If you can predict a Markov process easily, why might the smallest generator be harder to build?',
    reframe:
      'Prediction and generation have different minimal costs, even for simple binary Markov dynamics.',
    pitch:
      'This paper derives the minimal generator for an arbitrary binary Markov process and finds an unexpected structure: different regions of parameter space require three distinct minimal generator topologies. It shows that a previously proposed generator for a subset of binary Markov processes is not minimal. The analysis provides quantitative evidence that the minimal costs of prediction and generation can differ substantially, with the gap maximized near the i.i.d.-like regime.',
    detail: `A Markov process is often introduced as “easy”: the next step depends only on a finite recent history. Predictive models for binary Markov processes are well understood. But generating a process—constructing a minimal mechanism that produces the same statistics—can be a different problem.

This paper identifies the minimal generator for any binary Markov process and shows that minimality is not uniform across parameter space. Instead, the generator’s topology changes across regions, and three distinct minimal structures are required to cover all cases.

The work also clarifies that prediction and generation are not interchangeable costs. In particular, it highlights regimes where prediction is relatively cheap but generation demands more structure, giving a concrete setting where “modeling for forecasting” and “building a simulator” part ways.`,
    haiku: `Markov seems so small
Yet generators change their shape
Costs split in two`,
    limerick: `A fox chased a Markov-made mouse,
Expecting a simple small house.
But generators vary,
By parameter ferry—
And minimal forms won’t arouse.`,
    aphorism:
      'Knowing how to predict a process does not automatically tell you how to generate it minimally.',
    koan: 'If two machines predict the same, which one truly creates the process?'
  },

  'mode-locking-advection-reaction-diffusion': {
    doorway:
      'A paper about why reaction fronts in periodically driven flows can lock into repeating shapes and speeds.',
    question:
      'How does a front decide to march in step with a periodic flow, rather than drift irregularly?',
    reframe:
      'Mode-locking can be read from invariant manifolds attached to relative periodic orbits in front-element dynamics.',
    pitch:
      'This paper explains mode-locking of reaction fronts in spatially and temporally periodic advection–reaction–diffusion systems using burning invariant manifolds (BIMs). It shows that a mode-locked front profile is delineated by a BIM attached to a relative periodic orbit of the front-element dynamics. Changes in mode-locking type and its loss are interpreted through local and global bifurcations of these orbits and their manifolds, illustrated numerically in a vortex-chain channel geometry.',
    detail: `In periodically driven flows, a propagating front can sometimes “lock” to the forcing: it repeats its shape and advances by a fixed amount each cycle. This looks like a resonance phenomenon, but the front is an extended object with geometry, not a point oscillator.

The paper describes front motion using front-element dynamics and identifies relative periodic orbits (RPOs) that represent repeating front behavior up to spatial shift. Burning invariant manifolds attached to these RPOs then trace out the mode-locked profile, turning the locked front into an invariant-structure problem.

When mode-locking changes or disappears, the explanation is dynamical: bifurcations modify or destroy the relevant RPOs and their BIMs. The result is a geometric language for predicting and organizing mode-locking regimes in ARD systems.`,
    haiku: `Periodic currents
Front falls into steady cadence
Manifolds keep time`,
    limerick: `A front in a driven canal
Would sometimes repeat without fail.
An orbit would guide,
With a manifold tied—
And locking became geometrical.`,
    aphorism:
      'When a front locks to a flow, it is because its invariant geometry has found a rhythm.',
    koan: 'If the front repeats while shifting, is it the same front returning?'
  },

  // Uncertain: proceedings-style abstract; terminology (“light-cone model”, “distance in a food web”) is broad in scope.
  'computational-mechanics-food-webs': {
    doorway:
      'A paper about inferring predator–prey structure from time series using information and causal-state ideas.',
    question:
      'Can time-series information measures reveal who influences whom in a changing ecological network?',
    reframe:
      'Food-web “distance” can be treated as an information-dynamic relationship, not just a static graph link.',
    pitch:
      'This proceedings paper reconstructs predator–prey relationships from biomass time series of a simulated ecosystem. To move beyond static food-web diagrams, it introduces a model that accounts for both population and interaction dynamics, described as derived from a light-cone approach. It compares information-theoretic distances—mutual information and transfer entropy—against a new measure based on causal states of point and patch predictors, and evaluates how well these measures infer actual predator–prey links.',
    detail: `A static food web is a picture of who eats whom, but real ecosystems are dynamical: populations fluctuate and interactions vary over time. This paper asks whether time-series data can be used to reconstruct those relationships, treating inference as a problem of detecting directed influence.

It introduces the idea of a distance between species in a food web, computed from time series using information-theoretic measures such as mutual information and transfer entropy. It also proposes a new distance measure grounded in causal states of predictors that operate at different scales (point and patch), aiming to capture structured dependencies beyond simple correlations.

To assess the approach, the paper compares inferred distances to an underlying “minimum distance” derived from the known simulated food web and examines link-recovery accuracy under thresholding. The conceptual theme is that food-web structure can be treated as an information-processing network whose edges are inferred from dynamics, not assumed from a fixed diagram.`,
    haiku: `Biomass rises, falls
Information traces links
Webs inferred in time`,
    limerick: `A food web was drawn as a chart,
But time made it hard to take part.
With transfer and state,
They measured a weight—
And guessed who was feeding from start.`,
    aphorism:
      'To infer a web from data, measure influence, not just coincidence.',
    koan: 'If interaction is dynamic, where does the food web “exist”?'
  }
};

