---
id: absent-asset-display-plate
category: media
tags: [media,editorial,fallback,card,layout]
axes: {energy: 1, density: 2, weight: 4, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A feed where only some items carry artwork stops being a grid: a card with a
picture and a card without are no longer the same object. Fill the empty slot
with a generated plate at the identical ratio rather than collapsing it — a
tinted ground and one glyph pulled from the item's own title, set in the display
face so it reads as a cover and not as a spinner. Glyph 4–8rem.

```css
.plate { aspect-ratio: 16/9; display: grid; place-items: center;
  background: radial-gradient(circle at 25% 25%, var(--accent), transparent 42%),
              linear-gradient(135deg, var(--ink), var(--ink-2));
  font-family: var(--display); font-size: clamp(4rem, 10vw, 8rem) }
```
⚠ Decorative — the title sits beside it, so `aria-hidden` the plate or the
letter is announced first. Derive the glyph from a stable field; anything
rotating makes the same card change face between renders.
