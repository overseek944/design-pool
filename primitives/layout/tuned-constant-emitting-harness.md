---
id: tuned-constant-emitting-harness
category: layout
tags: [tooling,authoring,architecture,debug,composition]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Placement only the eye can judge — a cut-out registered against a rendered
frame, a crop, a pivot, a scale — is normally tuned by editing a number,
reloading and repeating. Ship the tuner instead: controls seeded from the same
constants module the component imports, gated behind a query flag, printing
their live state as the literal source to paste back. The eye sets the values,
the repo keeps them, and nothing is transcribed by hand. 6–14 scalars in one
flat object; express them as percentages of the box, not pixels.

```jsx
const [c, set] = useState(ALIGN)                 // the committed module
<pre>{Object.entries(c).map(([k, v]) => `${k}: ${v}`).join(', ')}</pre>
```
⚠ Lazy-load the panel behind the flag or its controls and labels ship in the
main chunk for every reader. Values tuned at one viewport are wrong at another
unless the constants are ratios — check at both extremes before pasting.
