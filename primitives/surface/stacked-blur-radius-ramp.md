---
id: stacked-blur-radius-ramp
category: surface
tags: [surface,blur,glass,scrim,depth,legibility]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Masking one `backdrop-filter` plate fades the *result*, not the radius: the
blur stays uniform and runs out, leaving an edge. To ramp the radius,
stack plates whose blur doubles while their gradient windows advance by half a
window — two neighbours cover every band, so no step shows. Earns its cost
where chrome floats over moving content and a flat scrim reads as a bar. Six
to eight layers, base 6–24px.

```css
.l1 { backdrop-filter: blur(.5px); mask-image: linear-gradient(#0000 0%, #000 12.5% 25%, #0000 37.5%) }
.l7 { backdrop-filter: blur(32px); mask-image: linear-gradient(#0000 75%, #000 87.5%) }
```
⚠ Every layer is its own backdrop root: eight plates, eight readbacks a frame.
Never animate the radius; collapse to one under `prefers-reduced-transparency`.

A simpler construction reaches the same ramp: keep every plate anchored to the
*same* edge, give them one shared mask token, and vary only their extent —
100%, 80%, 60%, 40%, 20% of the fade — while the radius climbs. Blur
accumulates where plates overlap, so the deep end gets every layer and the far
edge gets one, with no window arithmetic to keep in step. Height is then the
only per-plate number, which is what makes the stack editable. Five plates,
radii roughly 1 : 2 : 3.5 : 5.5 : 9.
```css
.foot > div { position: absolute; inset: auto 0 0; mask-image: var(--ramp);
  backdrop-filter: blur(var(--r)) }   /* heights 100/80/60/40/20% */
```
⚠ Overlapping plates blur an already-blurred readback, so the effective radius
at the anchored edge is far past the largest number in the list — tune the top
of the ladder by eye, never by summing it.

The ladder is not only page chrome. Its top rung is set by the height being
faded, so a 32–48px pill wants a top radius near 6–8px and the whole ramp
scales down with it — the construction is the same, the numbers are an order
smaller, and a glass label can sit directly on busy imagery without the flat
scrim that would otherwise be a bar across the picture. Eight plates, top rung
roughly a fifth of the element's height.
⚠ Stop the ladder where the radius stops being visible. Plates under about
0.5px are indistinguishable from no blur and each one still costs a full
backdrop readback every frame — the bottom half of a doubling ladder can be
pure expense, so start it where the eye can first tell two rungs apart.
