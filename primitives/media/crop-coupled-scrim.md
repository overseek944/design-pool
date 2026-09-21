---
id: crop-coupled-scrim
category: media
tags: [media,video,legibility,overlay,accessibility,responsive]
axes: none
cost: 1
seen: 18
requires: []
conflicts: []
completes: []
tension: []
---
Footage behind a headline crops differently at every width, so a scrim tuned
once is wrong everywhere else. Two values move together: `object-position`
holds the subject in frame as the crop narrows, and the overlay's alpha rises
on the side the copy occupies — a narrow viewport puts text over the busiest
part of the picture. Roughly +0.2–0.35 alpha across the range.

```css
.shot  { object-fit: cover; object-position: 58% 50% }
.scrim { background: linear-gradient(90deg, rgb(0 0 0/var(--a,.9)), transparent 74%) }
@media (min-width: 40rem) {
  .shot { object-position: center } .scrim { --a: .58 } }
```
⚠ Measure contrast at both ends and against the brightest frame — a loop that
passes on frame one can fail mid-play.

The gradient's *angle* is a layout fact, not an art-direction one. Where copy
sits beside the picture the scrim runs along the inline axis; at the width where
the copy stacks above it, the same scrim must be restated block-wise or it
darkens the edge nobody is reading over. Stack a second, shorter gradient from
the page ground at the trailing edge — 15–25% — and the frame fuses into the
section instead of ending on a seam.
```css
.scrim { background: linear-gradient(90deg, #000c, #0002 60%, transparent 80%),
                     linear-gradient(0deg, var(--ground), transparent 21%) }
@media (width <= 50rem) { .scrim { background:
  linear-gradient(180deg, var(--ground), transparent 30%),
  linear-gradient(0deg, var(--ground), transparent 20%) } }
```
⚠ The two layers compound where they meet — measure the corner they share, not
the average, and against the brightest frame.

Where the copy is centred *on* the picture rather than beside it, the scrim is
a pool and not a ramp: a radial ellipse of the section's own ground colour,
solid under the words and gone by 75–85%, so the frame keeps full strength at
its corners — where it was doing the work — and no plate appears anywhere. The
ellipse is a layout fact exactly as the angle is. A centred copy block goes
from wide-and-short to narrow-and-tall as the viewport closes, so restate the
ellipse where the headline rewraps, not where the picture crops.
```css
.wash { background: radial-gradient(ellipse 62% 58% at 50% 52%,
  var(--page) 0, rgb(from var(--page) r g b / .38) 62%, transparent 80%) }
@media (width <= 38rem) { .wash { …ellipse 94% 56% at 50% 47%… } }
```
⚠ Only over a flat, known ground — against a gradient section the pool's centre
matches and its shoulder smears. Score the text against the image at the pool's
*edge*, since that is where alpha is lowest and detail highest.

On a stage whose picture *changes* under fixed copy, the scrim has no single
correct polarity: the ramp that rescues white type over a dark frame turns into
a grey plate over a pale one. Let each frame declare its own ground and switch
the whole gradient with it, transitioned over 500–800ms so the change lands as
lighting rather than as a swap. The copy's colour has to travel on the same
clock or it crosses the frame it is being read against.
```css
.veil[data-ground=dark]  { background: linear-gradient(90deg, #0008, transparent 55%) }
.veil[data-ground=light] { background: linear-gradient(90deg, #f4efe6d1, transparent 55%) }
.veil { transition: background .7s }
```
⚠ Score each polarity against its own frame, not the pair — and the crossfade
passes through a mix of the two, which is the moment both are weakest.

Invert that radial and it protects the picture rather than the copy: clear
through the subject, the section's own ground by the rim, so an unframed image
dissolves into the page on every side at once while the one thing it is a
picture *of* stays untouched. Centre the ellipse on the subject, not the box,
and move it with `object-position` — they are the same fact, and a hole tuned at
one crop drifts off the subject at the next. Clear to 40–50%, ground by 95–100%.
```css
.plate { background:
  radial-gradient(circle at 78% 44%, #0000 0 42%,
                  rgb(from var(--page) r g b / .34) 82%, var(--page) 100%),
  linear-gradient(rgb(from var(--page) r g b / .78), #0000 32% 62%, var(--page)) }
```
⚠ The hole is where alpha is lowest and detail highest, so any copy reaching
into it is being read against raw picture. Keep the text on the ramped side and
re-measure the hole's *position* at each crop, not only its size.

Where the copy is short — a headline and a line under it — the scrim can be
dropped and legibility carried per glyph instead. A wide, soft `text-shadow` in
a dark tint of the picture's *own* hue, never black, darkens only the pixels the
letterforms sit on: the frame keeps full strength everywhere, nothing has to be
restated when the copy rewraps, and there is no layer to re-tune at each crop.
Blur 12–24px, 2–4px down, alpha 0.4–0.6.
```css
.head { color: #f4f2ec; text-shadow: 0 3px 18px rgb(4 47 46 / .5) }
```
⚠ It protects glyph edges, not counters and gaps, so it holds only at heavy
display weights — a light or thin face has too little ink to cast enough shadow.
No contrast tool scores it either; sample the rendered pixels against the
brightest frame by hand.
