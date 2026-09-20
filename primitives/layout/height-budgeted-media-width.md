---
id: height-budgeted-media-width
category: layout
tags: [layout,container-query,aspect,fit,cls]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When a card must fit one screen exactly — media plus chrome, nothing clipped —
width is the derived quantity, not the given one. Declare the chrome height as
a token, make the scroller a *size* container, and solve for width from
container height: subtract the chrome, multiply by the media ratio. Clamp both
ends. Chrome budget 8–12rem.

```css
.scroller { container: feed / size; --chrome: 10rem }
.card { width: clamp(22rem, (100cqh - var(--chrome)) * 16 / 9, min(40rem, 100%)) }
```
⚠ `container-type: size` needs a definite height from the layout above and
cannot be sized by its contents. The token is a promise: one extra line
inside the chrome and the card no longer fits.
