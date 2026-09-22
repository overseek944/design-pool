---
id: struck-superseded-figure
category: type
tags: [type,figures,comparison,hierarchy,decoration]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A before/after figure pair usually spends a label on each side. Strike the old
one instead: `text-decoration` takes its own colour and thickness, so the rule
can run in the accent while the number stays in muted ink — an annotation drawn
*over* the figure rather than a change of type. The new value then carries the
accent as its ink and one size step, and nothing has to say which is which.
Thickness 1.5–2.5px, struck value 70–80% the size of the live one.

```css
.was { color: var(--ink-muted); text-decoration: line-through 2px var(--accent) }
.now { color: var(--accent); font-size: 1.3em; text-decoration: none }
```
⚠ The strike is invisible to a screen reader — the pair needs `<s>`/`<ins>` or
prose naming the direction. Thickness under 1.5px disappears against a display
serif's own stems.

The pair need not be figures, or a pair. Run two parallel columns of terms — the
vocabulary being rejected and the vocabulary replacing it — striking every entry
on the left and dropping it to 35–50% ink, leaving the right plain at full. Read
down, it argues once rather than row by row, and the strike carries no accent at
all: the dimming is the claim and the rule only marks the term as withdrawn. A
short mono uppercase header over each column names the two vocabularies.
```css
.was li { color: var(--ink-40); text-decoration: line-through 1.5px currentColor }
.now li { color: var(--ink);    text-decoration: none }
```
⚠ Dimmed *and* struck is two signals for one state, and the left column is
still text someone has to read — one or two words per entry, and hold it at
4.5:1 rather than treating it as decoration.
