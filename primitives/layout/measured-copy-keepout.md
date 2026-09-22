---
id: measured-copy-keepout
category: layout
tags: [layout,measurement,legibility,canvas]
axes: none
cost: 2
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
Background art told to keep clear of the copy is usually given a fraction —
"the left 45% is text". That fraction is wrong at the first long headline, the
first translated string, the first reader at 200% zoom. Measure instead: the
block's own rectangle plus its computed sticky offset, taken as the max across
every block sharing the stage so the art does not jump between scenes, handed
to the renderer as one number. Clearance 24–72px beyond it.
```js
const keepout = Math.max(...blocks.map(b => b.getBoundingClientRect().height
  + (parseFloat(getComputedStyle(b).top) || 0)))
```
⚠ Observe the blocks, not the window — a reflow with no resize still moves the
box. Measure on resize and cache; reading geometry inside the frame loop
thrashes layout.

The number is half the job — what the art does with it decides whether the
keepout is visible. Clamping every offending element to the boundary line packs
them into a flat row along it, which draws more attention than the collision
would have. Push each one back along its own direction from the composition's
centre instead, or drop it and resample; either keeps the field's distribution
intact. Where the art is a connected structure, move the whole subgraph rather
than its members, or the links stretch into a visible fan at the edge.

An element that is `display: none` has no box to measure, and the scenes a
scrubbed stage has not reached yet are usually exactly that. Rather than
building a parallel model of what their layout would be, borrow it: set
`display` for the length of one synchronous read, take the offsets, put the
previous value back. The write and the read are in the same task, so nothing
paints — the cost is one forced reflow, not a flash.
```js
const prev = el.style.display; el.style.display = 'block'
const centre = el.offsetTop + el.offsetHeight / 2
el.style.display = prev
```
⚠ Once per resize, cached per element, never in the frame loop — this is the
most expensive reflow on the page. Read every measurement needed in one pass;
alternating writes and reads across several elements forces one each time.

`getBoundingClientRect` reports the *painted* box, so any element mid-entrance —
sliding in, scaled, settling — measures where it currently is rather than where
it belongs. Anything laying connectors, hit regions or a coordinate table over
animated nodes should read `offsetLeft`/`offsetTop` instead: they are layout
positions and transforms do not touch them. The geometry is then correct on the
first frame of the entrance rather than after it settles.
```js
const cx = el.offsetLeft, cy = el.offsetTop      // immune to the slide-in
```
⚠ Offsets are relative to `offsetParent`, so the container needs its own
positioning context — and they round to integers, which shows on hairlines.

A field spanning the whole document has no single copy block to measure, and
measuring each section's separately makes the keepout breathe as the reader
scrolls. The constant to exclude is the reading column itself — the same
`min(max-width, viewport × fraction)` the layout already centres on — held for
the document's full height. One rectangle, recomputed only on resize, and the
corridor never moves relative to the text inside it.
```js
const half = Math.min(MAXW, W * 0.55) / 2, cx = W / 2
const inCorridor = x => x > cx - half - M && x < cx + half + M    // M 40–80px
```
⚠ A corridor is wider than any one section needs, so the field loses real
estate on every narrow section. Worth it only where the art is ambient; art
that carries meaning should be measured per scene.

Where the field is a connected structure, testing only the members leaves the
links: two kept nodes on opposite sides of the keepout still draw a line
straight across it, and a line over the copy is worse than a node. Test each
link at its midpoint against the same rectangle and drop it. The subgraph tears
cleanly into two halves either side, which is the right reading anyway —
cheaper than relocating whole components and it cannot push anything off-canvas.
```js
if (inCorridor((a.x + b.x) / 2)) continue        // no link spans the column
```
⚠ A midpoint test passes a long link that bows across the corridor with both
ends clear of it. Sample two or three points along anything longer than the
corridor is wide.

Where the art's extent is itself authored as a formula rather than measured, the
keepout needs no script at all: publish the art's height as the same token that
sizes it, and start the copy at `calc(var(--art-h) + var(--gap))`. The clearance
is correct on the first frame — before script, before fonts — and survives a
rotation with no listener and no cache to invalidate. It holds only for art
whose box is declared: a cloud bank, a band, a fixed-ratio plate. A field placed
at runtime still has to be measured.
```css
.art  { height: var(--art-h) }
.copy { top: calc(var(--art-h) + var(--gap)) }
/* --art-h: min(.46 * var(--stage), max(.245 * 100vw, .2 * var(--stage))) */
```
⚠ It clears the art's *box*, not its ink — artwork with transparent margin
reserves space it does not use and the gap reads as double. Crop the asset to
its subject before trusting the number.

Where the art is *one* element rather than a field, invert the search instead of
pushing back. Enumerate the lattice of legal positions once — the pitch the
ground is already drawn on — drop every cell inside the padded copy rect, and
choose from what survives. The result is always on the grid and always clear of
the text, with no displacement vector to tune and no chance of landing half over
a descender. Pad 24–40px beyond the measured box.
```js
const free = cells.filter(c => !(c.x > t.left - pad && c.x < t.right + pad &&
                                 c.y > t.top - pad && c.y < t.bottom + pad))
place(free[Math.floor(seed * free.length)])
```
⚠ Re-run on `document.fonts.ready` as well as on resize. The fallback face and
the real one give different copy rects, and a position chosen against the
fallback can end up sitting on the headline once the webfont lands.

Nothing has to move. Where the decoration is a CSS layer rather than a renderer
— a rule lattice, a grid, a hatch — publish the band on the shared ancestor as
two custom properties, top offset and height taken from the content block's rect
minus the ancestor's, and let the layer subtract itself over exactly that span
with a mask. The decoration never learns the layout and the content never learns
it is being avoided; a `ResizeObserver` on both is the whole coupling.
```css
.layer { mask-image: linear-gradient(to bottom, #000 0 var(--cover-top),
  transparent var(--cover-top),
  transparent calc(var(--cover-top) + var(--cover-height)), #000 0) }
```
⚠ A hard stop pair cuts the lattice on a visible line. Feather 8–24px either
side, or align the stops to a band the content already has — a section edge, the
hero's own fade — so the cut has a reason to be there.

Where the art is a repeating *field* rather than placed objects, the keepout
needs no measurement at all: mask the field with an ellipse whose centre is
transparent, sized in percentages of its own box. The hole then tracks the box
through every width, so a headline that grows a line is still standing in cleared
ground and a translated string cannot break it — one declaration, no script, and
a browser that ignores it gets a full-strength field rather than a broken one.
Ellipse 30–45% by 40–55%, transparent to opaque across 55–80% of the radius.
```css
.field::before { content: ""; position: absolute; inset: 0;
  background: radial-gradient(var(--speck) 1.5px, #0000 1.5px) 0 0 / 26px 26px;
  -webkit-mask-image: var(--hole); mask-image: var(--hole);
  --hole: radial-gradient(ellipse 36% 44% at 50% 52%, #0000 58%, #000 80%) }
```
⚠ Only for a field with no features worth placing, and only while the copy is
centred — the hole is centred on the box, not on the text, so an off-centre
column leaves the ellipse showing as a soft blob beside it.

Where the field spans the whole document the keepout is an *axis*, not a shape:
one `linear-gradient(to right, …)` whose stops sit at the measure's own share of
the viewport clears a full-height corridor and carries no vertical geometry at
all, so it is correct at every scroll depth where a centred ellipse is correct
at one. Attenuate rather than clear — hold the corridor at 25–40% and the field
stays continuous across the page, where a true hole makes the corridor itself
read as a drawn shape. Gutter stops 10–14% and 86–90%, plateau across 35–65%.
```css
.field { --keep: 35%;
  mask-image: linear-gradient(to right, #000 0 12%, #0006 var(--keep),
              #0006 calc(100% - var(--keep)), #000 88% 100%) }
```
⚠ The corridor alpha is a legibility budget, not a look — score body text
against the field at that strength, never at full. A wide viewport widens the
gutters and leaves the plateau where it was, so re-check the ratio at the
narrowest width, where the corridor takes most of the box.
