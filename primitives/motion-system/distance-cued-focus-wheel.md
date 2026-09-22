---
id: distance-cued-focus-wheel
category: motion-system
tags: [list,rotation,blur,depth,mask,custom-property]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
A rotating list that only fades its neighbours reads flat. Stack the items on
one line, give each its signed distance from the focus, and derive offset,
scale, opacity *and* blur from it — neighbours recede on four cues at
once and the set turns like a wheel past a reading line. Wrap the distance
the short way round: no seam.

```css
.item { transform: translateY(calc(-50% + var(--d) * var(--step))) scale(var(--s,1));
        opacity: var(--o,1); filter: blur(var(--b,0px)) }
.item.d1 { --s:.93; --o:.42; --b:.5px }   /* d2: .86 / .13 / 1.1px */
```
⚠ Blur is no hierarchy a screen reader sees — keep source order, no live region.
Mask the band's ends or the wheel stops on hard edges.

Publish the distance as a quantised attribute rather than a continuous variable
and the falloff becomes authorable. Script writes one clamped integer per item;
CSS owns the ramp as a short list of steps, so the curve is tuned in the
stylesheet, the values are inspectable in devtools, and a transition on opacity
alone carries every change. Clamp at 3–5 steps — past that the difference stops
being visible and the tail can share one value.
```js
items.forEach((el, i) => el.dataset.dist = String(Math.min(Math.abs(i - focus), 4)))
```
```css
.item              { opacity: .06; transition: opacity .55s }
.item[data-dist="0"]{ opacity: 1 }    /* 1: .55  2: .28  3: .12 */
```
⚠ Discrete steps read as stepping unless the transition is longer than the
advance interval's gap — or the wheel ticks rather than turns.

The distance can come from the pointer rather than a focus index, and then one
more channel becomes mandatory: displacement. A member that scales up under the
cursor overlaps its neighbours unless they step away from it, so derive a signed
shift as well and the row reads as one elastic object instead of one item
growing. Fall off geometrically, each step 0.3–0.6 of the last — lift 2–6px,
scale 1.03–1.10, 0.25–0.40s.
```css
.item { transform: translateY(calc(var(--lift) * var(--f,0))) scale(var(--s,1)) }
```
⚠ Reduced motion wants the transform gone, not shortened — here the
displacement *is* the motion. A pointer-only distance strands the keyboard: the
same scalar has to answer to `:focus-visible`.

The recession can be real rather than derived. Give the band a `perspective` and
rotate each step out of the plane on X: the far items shrink, converge and
foreshorten from one declaration instead of three, and the falloff belongs to
the projection rather than to a table you tuned. Perspective 600–1200px, ±45–60°
at the band's edge, `backface-visibility: hidden` so the far face never flashes
through.
```css
.band { perspective: 700px; transform-style: preserve-3d }
.item[data-dist="1"] { transform: rotateX(58deg) scale(.92); filter: blur(.35px) }
```
⚠ Rotated glyphs are resampled — past about 60° text goes soft and its hit area
shears away from what is drawn. Keep the focused item at 0°, unrotated and
unblurred, and hold the band's height so the rotation cannot reflow the page.

Masking the ends leaves the band's *height* unstated, and a wheel sized by its
content shows a half-row at the bottom edge that reads as a clipping fault.
Quantise it to whole slots: rows × slot, floored at a small minimum so a short
list still looks like a wheel, capped by what the viewport has left after the
chrome around it. The list then travels in whole slots too, and the mask's two
fade depths become the only soft edges — and they need not match, a shallower
one at the top where the next item is about to be read. Slot 28–36px, floor 5
slots, fades 10–18%.
```css
.wheel { --slot: 30px;
  height: min(calc(var(--rows) * var(--slot)),
              max(calc(5 * var(--slot)), calc(100dvh - var(--reserved))));
  mask-image: linear-gradient(#0000, #000 var(--fade-top, 14%),
              #000 calc(100% - var(--fade-bottom, 14%)), #0000) }
.wheel > ul { transform: translate3d(0, var(--shift), 0) }
```
⚠ `100dvh` changes as mobile chrome slides, so the cap re-seats the wheel
mid-scroll. Hold the reserved space as a token and put the cap behind a
pointer-and-keyboard width rather than tuning the number.
