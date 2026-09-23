---
id: in-place-cta-field-expansion
category: interaction
tags: [form,cta,nav,disclosure,progressive-enhancement,focus]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 2
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

Time the two directions differently. Open with a decelerating width over
0.38–0.45s and opacity immediate, so the field is legible while it grows; close
faster, 0.28–0.34s on a standard ease, and hold opacity at 1 until the width has
finished, dropping it in one step at the end. Fading while narrowing shows a
half-transparent input squeezing its own text.
```css
.form { transition: width .32s cubic-bezier(.4,0,.2,1), opacity 0s linear .36s }
.open .form { transition: width .42s cubic-bezier(.2,0,0,1), opacity 0s }
```
