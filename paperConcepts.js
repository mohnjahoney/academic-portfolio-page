export const paperConcepts = {
  'prediction-retrodiction': {
    doorway: 'A paper about why prediction and memory are not always the same thing.',
    question: 'How much of the past does a system really keep in the present?',
    reframe: 'Memory looks different when a process is viewed forward and backward in time.',
    pitch:
      'This paper looks at stochastic systems from both the forward-time and reverse-time directions. It shows that familiar measures of organization can be understood through both predictive and retrodictive causal states. The result is a time-symmetric picture that clarifies what information is stored, what information is accessible, and how irreversible a process is.',
    detail: `Many models of complex systems are built around prediction: given the past, what can we say about the future? This paper asks what changes when we also take retrodiction seriously: given the future, what can we infer about the past?

The paper shows that the excess entropy can be understood not only as shared information between past and future, but also through the relationship between predictive and retrodictive causal states. That creates a bridge between forward-time and reverse-time descriptions of the same process.

The payoff is a compressed, time-symmetric representation that brings several quantities into one frame, including crypticity and causal irreversibility. Conceptually, the paper helps separate information that a system stores internally from information that is directly visible in observations.`,
    haiku: `Past speaks to future
Hidden states face both timeways
Memory turns around`,
    limerick: `A process looked backward through time
And found that its states did not rhyme
What memory can show
Is not all we know
When prediction and hindsight align`,
    aphorism:
      'What a system stores is not always what its behavior lets us see.',
    koan: 'If the future remembers the past, where is the present stored?'
  },
  'turnstile-mechanism-fronts-fluid-flows': {
    doorway: 'A paper about how moving boundaries find pathways through flowing systems.',
    question: 'What happens to transport barriers when the thing moving can also spread?',
    reframe:
      'Front propagation needs its own geometry, not just the geometry of passive flow.',
    pitch:
      'Classical turnstiles explain how passive material moves through periodically stirred flows. This paper adapts that idea to reacting fronts, where the moving boundary is not just carried by the fluid but also burns forward. The result is an active turnstile built from burning invariant manifolds, giving a geometric way to understand and control front propagation.',
    detail: `In passive fluid transport, turnstiles describe the lobes of material that move across a transport boundary when a flow is periodically perturbed. Reaction fronts are different because they have their own propagation speed and direction, so the passive picture does not fully describe what crosses where.

This paper develops an active version of the turnstile mechanism using stable and unstable burning invariant manifolds. These structures act as one-way barriers for front propagation, but their projections can self-intersect and fail to preserve areas in the way passive turnstiles do.

The construction gives a concrete way to reason about control. In the paper's algae-bloom example, the active turnstile identifies regions that must be treated to prevent invasion, showing how the geometry of front motion can guide intervention.`,
    haiku: `Burning fronts drift through
Turnstile lobes open and close
Barriers choose paths`,
    limerick: `A front in a flow tried to pass
Through lobes that reshuffled the mass
But burning could steer
Where paths would appear
And draw its own gates as a class`,
    aphorism:
      'A spreading front does not merely ride the flow; it redraws the map of passage.',
    koan: 'When a barrier burns forward, which side has been crossed?'
  },
  'occams-quantum-strop': {
    doorway:
      'A paper about using quantum descriptions to store less information about classical patterns.',
    question:
      'How much memory is really needed when synchronization can happen through quantum states?',
    reframe:
      'Quantum compression can reveal hidden simplicity in processes that look costly classically.',
    pitch:
      'This paper asks how much information is needed to synchronize one model of a stochastic process to another when the communication channel is quantum. It builds on the idea that quantum states can represent similarities between classical causal states more compactly than classical labels can. The paper gives constructions and an algorithm for calculating the quantum advantage, while also showing that this compression is tied to the process\'s cryptic order. The result is a clearer view of when quantum representations can reduce memory and what tradeoffs that reduction brings.',
    detail: `Classical models of stochastic processes often require memory to keep track of causal states: the information needed to stay synchronized with what the process is doing. This paper asks what happens when that synchronization is allowed to use a quantum channel instead of a purely classical one.

The central move is to represent causal similarity through quantum state indistinguishability. When two classical histories lead to similar futures, quantum states can sometimes encode that overlap more efficiently than distinct classical states. The paper generalizes this idea using extended causal structures and connects the maximum compression to cryptic order, a topological property of the process.

The takeaway is not simply that quantum is smaller. The paper also notes a tradeoff between prediction and generation complexity, so the compression has structure and cost. Conceptually, it shows how quantum representations can expose a kind of simplicity that is hidden from classical representations.`,
    haiku: `Cryptic histories
Fold into quantum shadows
Less memory speaks`,
    limerick: `A process with histories long
Found classical memory too strong
Quantum states blurred
What labels had heard
And compressed what had seemed to belong`,
    aphorism:
      'Quantum memory can make classical distinctions fade without making the process disappear.',
    koan: 'When two histories become one state, which past was forgotten?'
  },
  'finite-time-barriers-front-propagation': {
    doorway:
      'A paper about finding temporary barriers that guide spreading fronts through changing flows.',
    question:
      'Can a moving front have a barrier when the flow itself keeps changing?',
    reframe:
      'Front barriers can be identified from finite-time flow data, not only from ideal repeated motion.',
    pitch:
      'Earlier work identified burning invariant manifolds as one-way barriers for reaction fronts in steady or periodic flows. This paper asks how to find similar barriers when the available velocity field only covers a finite time interval and may change arbitrarily. It develops the idea of a burning Lagrangian coherent structure, adapting tools from passive transport to fronts that also propagate. Numerical tests show that this finite-time barrier can closely track the known burning invariant manifold in a benchmark flow.',
    detail: `Reaction fronts in fluid flows do not simply drift with the fluid; they also propagate through it. Previous work showed that burning invariant manifolds can act as one-way barriers to such fronts, but those barriers were defined in settings with steady or periodic flow.

This paper develops a finite-time version of the idea. Using velocity data over a limited interval, it identifies prominent one-way barriers called burning Lagrangian coherent structures. The method adapts variational tools from Lagrangian coherent structures, which are commonly used to study passive advection, to the more active problem of front propagation.

The conceptual shift is practical and geometric: one can look for meaningful barriers even when the flow is not available forever or does not repeat neatly. That makes the barrier idea better suited to time-dependent data while preserving the core intuition that certain curves organize where fronts can and cannot go.`,
    haiku: `Brief currents reveal
Where a burning front may stop
Time draws its barrier`,
    limerick: `A front met a flow for a while
With barriers hidden in style
Finite-time traces
Marked one-way places
And mapped where the flame could not file`,
    aphorism:
      'A temporary flow can still leave a durable instruction for where a front may pass.',
    koan: 'If a barrier exists only for a while, when does it stop guiding the front?'
  }
};
