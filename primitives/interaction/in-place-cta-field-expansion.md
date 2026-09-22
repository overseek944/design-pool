---
id: in-place-cta-field-expansion
category: interaction
tags: [form,cta,nav,disclosure,progressive-enhancement,focus]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [focus-exit-dismissal]
tension: []
---
A header CTA can open into its own single-field form where it stands instead of
scrolling to one. Pin the trigger to the wrapper's trailing edge absolutely and
grow the form beside it from width 0, so neither moves during open or close.
Keep the trigger a real anchor to the page's main form — the no-script path.
Collapsed controls sit at `tabindex="-1"`; release them on open, then focus
after 100–180ms with `preventScroll`. Open width 240–360px, capped against the
viewport.
```css
.req.open .form { width: min(320px, 100vw - 160px); opacity: 1 }
```
```js
setTimeout(() => input.focus({ preventScroll: true }), 140)
```
⚠ Plain `focus()` scrolls the page and can trip scroll-armed reveals.
