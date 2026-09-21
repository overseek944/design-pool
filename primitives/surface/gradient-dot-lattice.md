---
id: gradient-dot-lattice
category: surface
tags: [surface,texture,pattern,blueprint,cheap]
axes: {energy: 1, density: 3, weight: 1, finish: 4}
cost: 1
seen: 27
requires: []
conflicts: []
completes: []
tension: []
---
One `radial-gradient` plus a `background-size` gives a dot lattice at any pitch,
and the pitch decides what it means: 2–4px reads as paper tooth, a surface that
is simply not flat; 20–40px reads as ruled ground the layout can be measured
against. Run the fine pitch on a pseudo-element in `multiply` so it darkens what
it covers instead of laying a film over it, and the coarse pitch on the page
itself. No image request, no tile seam, and it retints from a token.

```css
.tooth { position: relative }
.tooth::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  mix-blend-mode: multiply;
  background: radial-gradient(var(--speck) 1px, transparent 1px) 0 0 / 3px 3px }
```
⚠ Speck alpha 3–8%. Past that a fine pitch moirés against small text and against
the device pixel grid at fractional DPR. `multiply` needs an opaque backdrop.

Swap the generator and the same pitch logic gives other marks.
`repeating-linear-gradient` at 45° is hatching — it reads as a cut or an
excluded region the way it does on a technical drawing, so it marks a band as
structure rather than content. Run it at 1px of line per 10–14px of gap; tighter
and it moirés, looser and it stops reading as a fill. Dropped to `to bottom` at
2px on, 2px off it becomes a scanline instead, which reads as signal.
```css
background: repeating-linear-gradient(45deg, transparent 0 10px, var(--line) 10px 11px)
```

Two `linear-gradient`s and one `background-size` give the third generator: an
orthogonal rule grid, one hairline stop per axis. Run it over a coloured ground
rather than a flat one and drop the alpha to 2–4% — the ground shows through
every cell, so the grid reads as scale reference for the surface instead of as a
pattern on it. Pitch 40–80px, wider than the dot lattice tolerates because lines
carry further than specks.
```css
background-image: linear-gradient(90deg,  var(--rule) 1px, transparent 0),
                  linear-gradient(180deg, var(--rule) 1px, transparent 0);
background-size: 60px 60px;
```

`repeating-conic-gradient` is the generator the pitch logic does *not*
transfer to. Its stops are angular, so a fan of hairline rays self-graduates —
dense at the origin, opening out with distance — and the origin must be pushed
outside the box or the convergence point sits in the layout as a visible knot.
Anchor it past one corner, mask the near end, and the ground reads as
perspective rather than as pattern. Ray every 5–8°, line 0.05–0.1° of that.
```css
background: repeating-conic-gradient(from 258deg at 38% 112%,
  transparent 0deg 5.8deg, var(--rule) 5.86deg 5.92deg);
mask-image: linear-gradient(transparent 12%, #000)
```

Beat two of them together and the lattice stops being a lattice.
`repeating-radial-gradient` puts the pitch in the gradient rather than in
`background-size`, so a second layer can carry a *different* period — make the
two mutually prime (11×13 against 17×19) and they realign only every few hundred
pixels, which is far enough that the eye finds no tile. The result reads as
grain, not as ruling, for the price of two paint layers: no filter to rasterise,
no data URI, no request. Dot stop 0.3–0.5px into a 4–6px gap, white at 8–12%.
```css
background-image:
  repeating-radial-gradient(circle at 17% 29%, #ffffff1a 0 .4px, #0000 .7px 4px),
  repeating-radial-gradient(circle at 73% 61%, #ffffff14 0 .3px, #0000 .6px 5px);
background-size: 11px 13px, 17px 19px
```
⚠ Sub-pixel stops resolve against the device ratio — the field thins to nothing
at 1x and doubles at 3x. Check both, and raise the alpha rather than the radius.

Where a framed figure sits on a ruled page, tie the two rulings by integer ratio
rather than choosing each pitch on its own merits: the plate's grid at exactly a
half or a third of the page's, same generator, same token. The frame then reads
as a magnified detail of the sheet it lies on instead of an object carrying its
own drawing convention, and the boundary needs no extra emphasis to be
understood. Page 40–60px, plate 1/2 or 1/3 of it.
```css
body   { background-size: 44px 44px }
.plate { background-size: 22px 22px }   /* the same two gradients, half pitch */
```
⚠ A non-integer ratio beats against the outer grid along the frame's edge. Two
tiers is the ceiling — a third nested ruling reads as moiré, not as structure.

One pitch is a texture; two are a drawing. Stack the orthogonal rule generator
at a coarse and a fine pitch in a single `background-image` — an integer ratio,
the coarse pair at roughly double the alpha — and the ground reads as a drafting
sheet with major and minor divisions rather than as a uniform mesh. Close the
stack with a flat wash so the whole field tints from one declaration. Fine
24–40px, coarse 4× that, alphas near 20% and 10%.
```css
background-image:
  linear-gradient(90deg, var(--major) 1px, #0000 1px), linear-gradient(var(--major) 1px, #0000 1px),
  linear-gradient(90deg, var(--minor) 1px, #0000 1px), linear-gradient(var(--minor) 1px, #0000 1px),
  linear-gradient(var(--wash), var(--wash));
background-size: 128px 128px, 128px 128px, 32px 32px, 32px 32px, 100% 100%;
```
⚠ A non-integer ratio walks the coarse lines off the fine ones and no two cells
come out the same size. Both pitches need whole-pixel values or the two layers
alias differently and the majors look heavier on one axis.
