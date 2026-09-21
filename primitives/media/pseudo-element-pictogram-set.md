---
id: pseudo-element-pictogram-set
category: media
tags: [icon,css-only,pseudo-element,tokens,diagram]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A set of small technical pictograms — a frame, a scatter, a cylinder, a tick —
can be drawn from the two pseudo-elements the element already has. Borders make
outlines, a comma-separated `box-shadow` list repeats one dot at measured
offsets, and a rotated box with two adjacent borders is a tick. They retint from
tokens, scale in `rem` beside the text they label, and cost no request or
sprite. Hold one box (3–5rem) and one stroke across the set or they stop reading
as a family.

```css
.ico--plot::after { width: .55rem; aspect-ratio: 1; border-radius: 50%;
  background: var(--ink); box-shadow: 1.45rem 1.3rem 0 var(--a), 2.9rem .3rem 0 var(--b) }
.ico--ok::after { width: 1.15rem; height: .7rem; rotate: -45deg;
  border-left: 1px solid var(--ink); border-bottom: 1px solid var(--ink) }
```
⚠ `forced-colors` drops backgrounds and shadows but keeps borders, so the set
loses members unevenly. These are decoration — `aria-hidden`, beside a text
label that carries the meaning.

The shadow list repeats the dot at measured offsets; its fourth value resizes
each copy, which is what turns a repeat into a *cluster*. Negative spread
shrinks a clone, positive grows it, so one node can carry a large part and its
two smaller neighbours — a component and its passives, a parent and its
children — in one declaration that retints from a single colour. Spread between
−40% and +25% of the base size; past that the copies stop reading as the same
family of mark.
```css
.part::after { width: 48px; height: 35px; background: var(--ink);
  box-shadow: 60px 18px 0 -8px var(--ink-2), -25px 20px 0 -10px var(--ink-2) }
```
⚠ Clones share the element's `border-radius` and every filter on it, so a set
that needs two shapes still needs two nodes. Spread grows the paint area
without growing the box — the layout knows nothing about the outermost copy.
