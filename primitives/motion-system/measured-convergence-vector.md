---
id: measured-convergence-vector
category: motion-system
tags: [motion,measurement,responsive,choreography,diagram]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 5
requires: []
conflicts: []
completes: [reduced-motion-branch, dead-banded-resize-rebuild]
tension: []
---
Where elements must travel to or from another element the layout places — a hub
in a diagram, a row that wraps, a set whose count varies — an authored translate
is only right at the width it was authored at. Read both centres against the
shared container's box and write the keyframes as *fractions* of that delta, so
one animation holds at every breakpoint. Ramp scale on the same fraction and
the travel reads as distance rather than slide; 0.5–0.65 at arrival.

```js
const b = wrap.getBoundingClientRect()
const mid = el => { const r = el.getBoundingClientRect()
  return [r.left-b.left+r.width/2, r.top-b.top+r.height/2] }
const [hx,hy] = mid(hub), [x,y] = mid(el)
const at = f => `translate(${(hx-x)*f}px,${(hy-y)*f}px) scale(${1-.4*f})`
el.animate([{transform:at(0)}, {transform:at(.62), offset:.72}], 2600)
```
⚠ Read every rect before any write, and refuse to start on a zero-sized box — a
hidden ancestor or a pending webfont returns zeros and the set converges on one
point.

Publish the delta instead of baking it into keyframes and the same measurement
serves a *scrubbed* travel: write `--dx`/`--dy` in pixels onto each element once
and let its transform multiply them by whatever progress variable drives the
scene. Measurement and playback decouple — a resize re-measures and rewrites two
numbers with nothing to cancel or rebuild, where a keyframed version has to be
torn down mid-flight.
```css
.mark { transform: translate3d(calc(var(--dx) * var(--p)), calc(var(--dy) * var(--p)), 0)
                   translate(-50%, -50%) }
```
⚠ Re-measure at progress 0, and off untransformed geometry — `offsetLeft`, not a
rect read while the transform is live, or the delta collapses toward zero on
every resize.

`offsetLeft` is measured against the offset parent, which is the wrong basis the
moment the reference is the viewport — a pointer position, fixed chrome, a
target in another subtree. Zero the transform, read the rect and restore it in
one synchronous block instead: nothing paints in between, and the box comes back
in viewport coordinates with the live transform excluded.
```js
const x = gsap.getProperty(el, 'x'), y = gsap.getProperty(el, 'y')
gsap.set(el, { x: 0, y: 0 })
const r = el.getBoundingClientRect(); gsap.set(el, { x, y })
```
⚠ Only synchronous work may sit between the two writes — an `await` or a frame
boundary lets the untransformed pose reach the screen as a jump.

The fraction stops are a *spatial* easing curve, independent of the timing
function: place the midpoint at 0.55 of the delta but 0.35 of the duration and
the element hangs near its origin then arrives fast, which no easing on its own
expresses. Carry a z term under one `perspective()` and the travel reads as
depth rather than slide. Restore the element to CSS control on `finish` *and*
`cancel` — clear the inline transform, opacity and `will-change` — or `fill:
'both'` pins it at its end pose forever and the compositor layer never retires.
```js
const P = 'perspective(900px)'
el.animate([{ transform: `${P} translate3d(${dx}px,${dy}px,120px) scale(.2)`, opacity: 0 },
  { transform: `${P} translate3d(${dx*.55}px,${dy*.55}px,70px) scale(.75)`, opacity: 1, offset: .35 },
  { transform: 'none', opacity: 1 }], { duration: 560, delay, fill: 'both' })
  .addEventListener('finish', () => el.style.cssText = '')
```
⚠ `cancel` needs the same handler or an interrupted run leaves the start pose
inline. `perspective()` inside `transform` is per-element, so participants at
different screen positions get different vanishing points — fine for an
arrival, wrong for a group that must share one.

Zeroing a transform to measure it is not enough when the element carries a
`transition` on that same property: the rect read forces a style flush with the
neutral value applied, so restoring it animates the element back from origin —
a visible slide every time the layout is measured. Kill the transition for the
whole block, restore the transform, force one reflow so the restored value
commits as the new resting state, and only then hand the transition back.
```js
const t = el.style.transition, p = el.style.transform
el.style.transition = 'none'; el.style.transform = 'none'
const r = el.getBoundingClientRect()                 /* flushes with none applied */
el.style.transform = p; void el.offsetWidth; el.style.transition = t
```
⚠ The reflow must sit between the restore and the re-enable, not after it —
either side and the transition sees the change and runs it.
