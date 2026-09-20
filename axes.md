# Axes

Every primitive carries a position in a shared 4-dimensional aesthetic space,
plus a cost. This is what lets an agent evaluate a combination it has never
seen instead of trial-and-error.

| Axis | 1 | 5 |
|---|---|---|
| **energy**  | still, composed        | kinetic, restless |
| **density** | sparse, airy           | packed, layered, ornamental |
| **weight**  | delicate, hairline     | heavy, massive, high-contrast |
| **finish**  | raw, exposed, utilitarian | refined, engineered, glossy |

**cost** (1–5) is not aesthetic: implementation effort + runtime expense.

## Neutral primitives

Correctness and architecture primitives (`axes: none`) have no aesthetic
position — cleanup, resize handling, accessibility branches, naming
conventions. They are excluded from coherence maths and should be selected on
necessity, never on mood.

## The coherence rule

For any selection, compute spread (max − min) per axis:

- spread ≤ 1 — cohesive
- spread = 2 — acceptable range
- spread ≥ 3 — a **contrast axis**

**Cluster on three axes, deviate on at most one.** One deliberate contrast axis
is what makes a design interesting: delicate type against heavy light, or still
layout against kinetic motion. Two or more wide axes is not boldness, it is
noise — the selection has no point of view.

Declare your contrast axis before building. `pool check` enforces this.
