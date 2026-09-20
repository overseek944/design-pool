---
id: receding-bar-plate
category: surface
tags: [surface,chrome,scroll,opacity,accessibility]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Invert the usual scroll chrome: a floating bar starts fully opaque and *loses*
alpha once the page moves, so it stops competing with the content passing beneath
it. The move only works if the plate and the labels are separate layers — fade
the plate, never the group, or the labels go with it and the bar reads as broken
rather than recessive.

```css
.bar   { position: fixed; display: grid; place-items: center }
.plate { grid-area: 1/1; inset: 0; background: var(--brand); border-radius: 999px;
         opacity: 1; transition: opacity .3s }
.bar[data-scrolled] .plate { opacity: .45 }   /* .35–.65 */
.labels{ grid-area: 1/1; opacity: 1 }
```
⚠ At reduced alpha the label contrast is decided by whatever scrolls under it.
Check the label against the plate composited over both the lightest and darkest
ground on the page, and raise the floor until the worse of the two clears 4.5:1.
