---
id: measured-convergence-vector
category: motion-system
tags: [motion,measurement,responsive,choreography,diagram]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 3
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
