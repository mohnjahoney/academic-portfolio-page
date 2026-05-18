An FTLE Analysis of Active Fluids
Presented at Dynamics Days 2013 - Denver, CO

See our "Finite-time barriers to front propagation in two-dimensional fluid flows" for a substantial revision of this work.

When analyzing a flow, you might just want to know something about the "big features", and not necessarily all of the details. In simple systems, this amounts to locating fixed points and separatrices. However, these constructs are not even defined for non-autonomous flows and finite-time flows. One idea, then, is to look at the "FTLE-field" or Finite-Time-Lyapunov-Exponent field. This is a scalar field that characterizes the rate of separation between nearby trajectories. The apparent "ridges" in this field say something about manifold-type structures that have some local significance. (The FTLE field has its plusses and minuses, but we can talk about that later.)

Our goal was to adapt this FTLE approach to the study of reaction fronts in flows. Building on the intuition developed in our study of "burning invariant manifolds", it is not a big stretch to imagine that there would be FTLE ridges corresponding to BIMs, and that these ridges would generalize where BIMs did not. Part of this projects' technical difficulty is in computation / visualization. While canonical FTLE studies are for 2D (nonreacting) flows, our reaction fronts introduce a third (local front orientation) coordinate. This means that the FTLE must be computed in 3D. However, the ridge of interest "ought to" lie within a certain 2D submanifold.





Reacting Flows and Turnstiles
Best Poster Award at Mathematisches Forschungsinstitut Oberwolfach 2014 - Oberwolfach, Germany

The turnstile is a classical structure which can be thought of as a "skeleton of transport" (of a passive scalar). When a system with an invariant manifold (surface) is subjected to a periodic perturbation, this surface is "broken" into a turnstile structure. Before perturbation, there is no transport across the invariant surface. After perturbation, not only is there transport, but the turnstile describes exactly which phase-space (fluid) parcels go from one side to the other.

In our reacting flow system with time-independent fluid flow, we know that BIMs are one-way barriers to front propagation. When this flow is periodically perturbed, the BIMs form a structure analogous to a turnstile - let's call this a burnstile. While the motivation is analogous, there are several important differences that arise from the irreversibility of the dynamics.

Here we use this burnstile construct to analyze a problem. We consider the invasion of an ocean bay by an algae bloom. The ocean flow at the mouth of the bay is modeled as a periodically perturbed separatrix. That is, the flow of water in and out of the bay is governed by the turnstile mechanism.

What structure governs the transport of algae?
How do we use this structure to efficiently protect the bay from the invading algae?
We show that the (passive) turnstile is not the correct structure. We then show some augmentations that are also not sufficient. Finally, we demonstrate that the areas prescribed by the burnstile are exactly those areas which must be treated with algaecide in order to prevent invasion.