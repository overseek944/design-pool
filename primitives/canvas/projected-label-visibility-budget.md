---
id: projected-label-visibility-budget
category: canvas
tags: [webgl,label,projection,density,correctness]
axes: none
cost: 3
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Projecting a 3D point to screen coordinates gives a position for every anchor,
including the ones behind the camera — the maths happily returns a mirrored
point in front of the viewer. A DOM label layer over a scene needs its own
visibility policy, in three parts: drop anything behind the near plane, drop
anything outside the viewport plus a 100–200px margin, then cap what is left by
distance *rank* rather than by a distance threshold. Sort the candidates and
take the nth nearest as the cutoff and the layer holds a constant label count
whether the camera is in a crowd or an empty field.

```js
const cut = dists.sort((a,b) => a-b)[Math.min(N-1, dists.length-1)]
el.style.opacity = (behind || d > cut) ? 0 : fade(d)
```
⚠ N between 8 and 14; past that the labels win and the scene disappears.

Depth and viewport are camera tests; neither can tell that an anchor sits on
the far side of the object it names. Where the subject is a feature on a
surface, carry its outward normal beside its position and rotate both — a
negative z means the reader is being pointed at something the geometry is
hiding. Dim rather than drop: the position is still true, and a label
vanishing on a slow turn reads as a fault. Propagate the same factor to
whatever names it outside the scene, so the leader and its row in a list go
quiet together.
```js
const facing = rot(feature.n)[2] > 0.05
leader.setAttribute('opacity', facing ? .8 : .25)
row.classList.toggle('dimmed', !facing)              // the DOM label agrees
```
⚠ Threshold slightly above zero, never at it — exactly edge-on the sign flips
every frame and the label strobes.

The same projection that places a marker can size it, which matters where the
overlay draws a box *around* the subject rather than a label beside it. Carry
the object's bounding-sphere radius, and its screen radius is that over the
camera distance, times half the viewport height over `tan(fov/2)` — the
perspective divide the renderer already performs, done once on the CPU. Clamp
the result: a distant subject still needs a box big enough to read as a mark
rather than a speck. Floor 24–32px, ceiling 120–160px.

```js
const px = (r / cam.position.distanceTo(world)) * (h * .5) / Math.tan(fov * Math.PI / 360)
el.style.width = el.style.height = Math.min(MAX, Math.max(MIN, px * 1.7)) + 'px'
```
⚠ `fov` is vertical, so the height is the right term — pairing it with width
makes every box wrong by the aspect ratio, and correctly so only at 1:1.

Where the overlay draws a ring around a region of world space, size it by
projecting two points rather than by formula: the centre, and the centre plus
the camera's right vector times the world radius. The pixel distance between
them is the screen radius under any projection — including an offset viewport
or a moving FOV — with no trigonometry to keep in sync. Ring 1.5–2.5× the
cluster's radius; fade it on the same factor as the copy that names it.
```js
const r = [view[0], view[4], view[8]]               // camera right, column-major
const px = dist(proj(c), proj(add(c, scale(r, R))))
```
