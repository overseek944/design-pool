---
id: panel-free-backdrop-legibility
category: surface
tags: [backdrop-filter,legibility,photography,contrast,surface,type]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 12
requires: []
conflicts: []
completes: []
tension: [backdrop-blur-tier-system]
---
Copy over a photograph usually gets a plate, and the plate breaks the picture.
Give the text block itself a `backdrop-filter` and no background at all: the
image keeps its brightness and its frame, and only the detail beneath the words
goes quiet. Blur is an average, so it removes busyness without removing
luminance — contrast stays unsolved until a second term in the same filter list
commits to it. Blur 8–24px, `brightness(.55–.75)` over light imagery.

```css
.copy { background: none; backdrop-filter: blur(16px) brightness(.65) }
```
⚠ The filter stops at the element's box, printing a rectangle of smooth into a
detailed picture — pad 1–2rem past the text and feather the edge with a mask.
One compositing layer per block, so not for long-form running text.

Fixed chrome over imagery wants the filter only part of the time. At the top of
a page the bar sits on a picture chosen to hold it, and a top-down gradient
scrim — weighted behind the links, gone by the bar's own lower edge — buys
legibility with no edge and no compositing layer at all. Add the
`backdrop-filter` from a scroll-state class past 30–60px, where the bar begins
overlapping content it does not control, so the expensive layer exists only
while it earns its keep.
```css
.bar          { background: linear-gradient(#0d121bcc, #0d121b00);
                transition: background-color .3s }
.bar.scrolled { backdrop-filter: blur(10px); background: #10151ed9 }
```
⚠ Transition the background colour, not the filter — animating
`backdrop-filter` recomposites everything under the bar every frame.

Where the busy ground is not one picture but a full-page generative field, the
veil belongs to the *reading column*, not to each block: one fixed element the
width of the measure, spanning the viewport, feathered to nothing on its left
and right edges. Blur as little as 1px — enough to kill fine texture without
touching luminance — over 15–20% white. One compositing layer serves the whole
document, the field keeps its density everywhere else, and the veil never reads
as a box because it has no edge where the eye looks.
```css
.veil { position: fixed; inset-block: 0; width: min(1040px, 94vw);
  background: #fff3; backdrop-filter: blur(1px);
  mask-image: linear-gradient(to right, transparent, #000 16%, #000 84%, transparent) }
```
⚠ Below the column's own breakpoint the veil is the viewport — drop the mask and
raise the alpha instead, or the feather eats the first and last characters.

Over *moving* footage the argument inverts. A blur is recomposited against every
decoded frame, and an alpha tuned against one frame fails against the brightest —
the two answers above are the expensive and the unreliable one. Take the plate,
and stop it breaking the picture by shrink-wrapping each line instead of the
block: a set of tight opaque runs interrupts the frame in slivers, and the gaps
between them are where the footage still reads. Padding 0.4–0.8em, one radius.
```css
.line { display: table; background: var(--paper); border-radius: .6rem;
        padding: .45em .8em; margin-block-end: .5rem }
```
⚠ `display: table` shrink-wraps but drops out of a flex row — wrap each line in
its own block. Ragged plate edges are the point; centred text makes them noise.

Before the bar earns its filter it is transparent over whatever the opening
frame happens to show, and there neither a plate nor a scrim is wanted. Shadow
the glyphs themselves — `text-shadow` on the links, `drop-shadow()` on a mark
supplied as an image — and scope both to the *un*-glassed state so they are
removed the moment the backdrop filter takes over. A shadow costs no
compositing layer and follows the letterforms, so it holds over any frame; left
under the glass it reads as smudge. Offset 0–1px, blur 5–8px, 40–60% black.
```css
.bar:not(.is-glass) a     { text-shadow: 0 1px 6px #0000008c }
.bar:not(.is-glass) .mark { filter: drop-shadow(0 1px 6px #00000073) }
```
⚠ A shadow is not contrast. Measure the links against the brightest frame the
footage reaches, and darken the frame itself if they fail.

A scrim bar is a decision about one picture, so it cannot be left on for a whole
document. Over a page that alternates dark and light sections the top-down wash
that lit the opening frame becomes a dark smear across white, and the
light-on-dark links inside it vanish the moment the wash has faded out. Bind the
treatment to whatever is under the bar — a one-pixel probe band at the top of the
viewport writing the section's own ground onto it — so the scrim has an off state
as well as an on one.
```js
new IntersectionObserver(([e]) => e.isIntersecting &&
  (bar.dataset.ground = e.target.dataset.ground),
  { rootMargin: '0px 0px -99% 0px' }).observe(section)
```
⚠ One permanent treatment is only safe where every section the bar can reach
shares a ground. Measure the links against the lightest one, not the first.

A masthead's filter box is not its content box. Where the bar's contents are
centred in a capped measure it is tempting to hang the `backdrop-filter` on that
same element, and the blur then stops at the measure's edges: two vertical seams
run down the page with sharp content outside them and smeared content within,
and every scroll drags text across the join. Filter the full-bleed bar and
centre a child inside it.
```css
.bar   { backdrop-filter: blur(8px) }                 /* spans the viewport */
.inner { width: min(100%, var(--measure)); margin-inline: auto }
```
⚠ The seam is invisible against a flat ground and obvious the moment anything
crosses it — check against the widest element the page can scroll under the bar.

The cheapest answer of all costs no filter and no compositing layer: a radial
wash on a pseudo-element behind the text run, inset *negative* on both axes so
the gradient reaches full transparency outside the element's own box. There is
no edge to see because the fade finishes past where anyone is looking, and the
ground keeps its texture everywhere else. Opaque to 0–55%, clear by 80–90%;
bleed 8–12px block, 24–36px inline, wider inline because the rag is there.
```css
.copy { isolation: isolate }
.copy > p::before { content: ""; position: absolute; inset: -9px -28px;
  z-index: -1; background: radial-gradient(#ffffffeb 0%, #ffffffbd 54%, #fff0 84%) }
```
⚠ Flat colour only — it is a fixed tint, so unlike a blur it fails against a
ground whose luminance changes. Measure against the lightest and darkest the
field reaches under the text, not against a screenshot.

Every answer above puts something over the ground. Where the ground is a
decoration you own — a dot field, a ruled grid, a generated texture — the
cheaper move is to take it away: mask the *texture layer* with a radial of
inverted polarity, transparent at the centre and opaque by the edge, so the
field is simply absent under the copy. Nothing to composite, no plate, no edge
anywhere, and the text sits on the page's own ground at full contrast. Stack a
second gradient into the same mask to clear a band or a foot as well.
```css
.field { mask-image: radial-gradient(70% 78% at 50% 50%, transparent 34%, #000 88%) }
```
⚠ Only for decoration you are free to delete — the same mask over a photograph
or a chart removes content, not noise. Size the clear zone from the longest line
the block can wrap to, not from the copy in the design.

The objection to a scrim over footage — an alpha tuned to one frame fails
against the brightest — is an objection to tuning it at the text. Bound the
source instead: drop the clip's own `opacity` and lay one fixed full-viewport
gradient over it, and the ceiling is a number you chose rather than whatever
the grade reaches. Contrast is then settled for every frame before the copy is
placed, which frees the blur to do only the job blur is good at — killing
busyness under the words, feathered by a radial mask so the pool has no edge
and the rest of the picture stays sharp. Footage 0.5–0.7, blur 18–30px.
```css
.clip  { opacity: .6 }
.plate::before { backdrop-filter: blur(26px) saturate(1.12);
  mask-image: radial-gradient(56% 50% at 50% 50%, #000 34%, #0008 62%, #0000 82%) }
```
⚠ Add `saturate()` alongside the blur — averaging neighbouring pixels pulls
colour toward grey, so an unsaturated pool reads as a dirty smudge over graded
footage. An SVG `url()` filter in the same list disables `backdrop-filter`
outright in Chromium.

Shrink-wrapped plates move the ink. Each pads its text inward, so a stack of
them — a kicker, a headline, a standfirst, each with the padding its own size
wants — arrives with three different left edges, and the copy reads as
misaligned even though every plate is placed correctly. Pull each plate back by
exactly its own inline padding: the text returns to one optical edge while the
plates stay ragged, which was the effect wanted. One declaration per plate, and
it has to be restated whenever the padding is.
```css
.kicker { padding-inline: .9rem;  margin-inline-start: -.9rem }
.title  { padding-inline: 1.1rem; margin-inline-start: -1.1rem }
```
⚠ The negative margin pulls the plate outside the container's padding box —
check it at the narrowest width, where the plate reaches the viewport edge and
the blur clips.
