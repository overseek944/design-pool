---
id: endpoint-named-fluid-tokens
category: scale
tags: [tokens,fluid,naming,architecture,responsive]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Name a fluid token after the two pixel values it interpolates between —
`--text-fluid-20-80` — so the range is legible at the call site and nobody has
to open the definition to learn what a step does. The body is one `clamp()` in
`vi` rather than `vw`, which follows the writing mode's inline axis and ignores
a vertical scrollbar. A flat list of named ranges replaces an abstract scale
nobody can hold in their head.

```css
--text-fluid-20-80:  clamp(1.25rem, -5.1786rem + 10.7143vi, 5rem);
--space-fluid-16-24: clamp(1rem, .1429rem + 1.4286vi, 1.5rem);
```
⚠ Generate the middle term from the endpoints and a fixed viewport band —
360–1600px is a usable default. Hand-written slopes drift and then the name
lies, which is worse than no name at all.

A ramp that runs negative — a fluid overlap pulling a block up under the one
above — reverses which endpoint is which. `clamp()` reads minimum, preferred,
maximum in that order, so the *deeper* pull goes first and the shallower one
last. Get the order backwards and it is not an error: clamp silently returns the
first argument at every width, and the overlap is frozen.
```css
.visual { margin-block-start: clamp(-80px, -5vw, -48px) }   /* -80 is the min */
```
⚠ Carry the signs into the name for the same reason the positive ramps carry
their endpoints — otherwise the next reader repairs the order the wrong way round.
