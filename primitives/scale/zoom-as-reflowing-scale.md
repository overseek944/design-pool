---
id: zoom-as-reflowing-scale
category: scale
tags: [unit,scale,architecture,responsive,correctness]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: [fixed-canvas-root-scale]
---
`zoom` is the one scale that reflows. `transform: scale()` leaves the original
box behind, so neighbours hold their old positions and the scaled thing either
overlaps them or strands whitespace; `zoom` resizes the layout itself. That
makes it the graft — a subtree authored at one scale dropped into a page built
at another without rewriting a token. Useful range 0.7–1.15, and it nests, so
one child can opt back out.
```css
.section { zoom: .8 }
.section .full-size { zoom: 1 }
```
⚠ Media queries and viewport units still resolve against the real viewport, so
every breakpoint inside a zoomed subtree fires at the wrong content width.
Redefine tokens instead wherever you own them.

Answer that warning rather than avoiding it: put the factor on `:root` as a
custom property *and* as the `zoom` value, then divide every viewport unit by
it at the point of use. The token is the single density dial for the whole
document — one edit retunes type, spacing, hairlines and radii together without
a token rewrite — and `calc(100svh / var(--zoom))` is again a real full-height
section. 0.78–0.9 reads as denser, above 1.05 as an accessibility setting.
```css
:root { --zoom: .81; zoom: var(--zoom) }
.full { min-height: calc(100svh / var(--zoom, 1)) }
```
⚠ Pointer coordinates arrive in the zoomed space, so any canvas or hit test
under it is wrong by the factor. Recover it from the element itself —
`offsetWidth / getBoundingClientRect().width` — rather than reading the token,
which misses browser zoom and any nested opt-out.

The factor need not be authored. Where a block must fit a height it does not
own, solve for it: clear the property, measure the real overflow against the
budget, set `zoom` to the ratio, and repeat two or three times because the
reflow changes the measurement. Floor it — under about 0.6 the content is no
longer readable and the section should drop something instead — and remove the
property outright when a pass says it already fits, so nothing pays for a scale
of 1.
```js
for (let i = 0; i < 3; i++) {
  const top = el.getBoundingClientRect().top, room = budget - top
  const need = bottomOf(el) - top                    // deepest descendant
  if (need <= room + 2) break
  el.style.zoom = (z = Math.max(.6, room / need * z)).toFixed(3) }
```
⚠ `getBoundingClientRect().bottom` is the element's own box — a descendant
overflowing it is not in that number. Walk the subtree for the true bottom, and
re-run on `fonts.ready`, not only on resize.

`zoom` on a descendant does not opt out of an ancestor's — the used factor is
the product down the tree, so `zoom: 1` inside a scaled subtree still renders
scaled. Publish the reciprocal as a second token next to the factor and true
size becomes a class: anything that must match real pixels rather than the
document's density — an overlay sized against OS chrome, a QR code, a map tile,
a portalled popover — cancels back out with it. Viewport units inside that
subtree are then unmultiplied again and must lose the division.
```css
:root       { --z: .85; --unz: 1.17647; zoom: var(--z) }   /* 1 / --z */
.true-size  { zoom: var(--unz) }
```
⚠ The pair is one number written twice and nothing checks it. Derive it —
`calc(1 / var(--z))` is valid for `zoom` — or a retune of the factor silently
leaves every cancelling layer at the wrong scale.
