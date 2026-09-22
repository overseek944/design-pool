---
id: frame-pooled-pending-veil
category: light
tags: [light,glow,state,loading,overlay,accessibility]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A document still filling in usually gets an overlay, which blocks the part
already readable, or a spinner per slot, which turns one wait into twenty. Pool
the signal at the viewport edge instead: one root pseudo-element, fixed and
pointer-transparent, carrying nothing but inset shadows glowing inward from the
frame. Content stays legible and clickable throughout, one attribute arms it,
and it costs no node and no layout. Outer wash 60–120px, inner lip 15–30px at
roughly half its alpha; breathe at 1.2–2s.

```css
html[data-busy]::after { content: ''; position: fixed; inset: 0;
  pointer-events: none; z-index: 2147483646;
  box-shadow: inset 0 0 90px rgb(from var(--tint) r g b / .16),
              inset 0 0 22px rgb(from var(--tint) r g b / .10);
  animation: breathe 1.4s ease-in-out infinite }
```
⚠ It announces nothing — pair it with `aria-busy` and a live region for the
outcome. Under `prefers-reduced-motion` hold it at full opacity rather than
removing it. A tint taken from the ground vanishes on one theme and reads as a
fault on the other.
