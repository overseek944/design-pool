---
id: pseudo-element-pictogram-set
category: media
tags: [icon,css-only,pseudo-element,tokens,diagram]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
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
