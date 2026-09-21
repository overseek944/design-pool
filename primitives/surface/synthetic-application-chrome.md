---
id: synthetic-application-chrome
category: surface
tags: [frame,chrome,media,mock,product,decoration]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 13
requires: []
conflicts: []
completes: []
tension: []
---
A screenshot dropped into a page is an image; the same screenshot under a title
bar is an application. Three hairline parts do it — a strip in the surface
colour, a rule beneath, two or three 10–12px discs inset from the left — and any
embed placed inside reads as the product's own interface rather than borrowed
media. Hold the strip near twice the disc diameter and square the inner corners
where they meet it, or the chrome reads as a sticker over the content instead of
one object with it. Strip 28–40px.

```css
.chrome { display: grid; grid-template-rows: var(--bar, 34px) 1fr;
  border-radius: 12px; overflow: clip; background: var(--surface) }
.chrome::before { content: ''; border-block-end: 1px solid var(--rule);
  background: radial-gradient(circle 5px at 18px 50%, var(--d1) 98%, #0000 0),
              radial-gradient(circle 5px at 38px 50%, var(--d2) 98%, #0000 0) }
```
⚠ The discs are button-shaped and button-coloured. Mark the strip `aria-hidden`
and `pointer-events: none`, or assistive tech announces unlabelled controls and
a reader tries to close the page.

Invert it where the payload is *evidence* rather than interface — a trace, a
log excerpt, a captured frame. Chrome would claim it is an application; what it
needs is a name. Caption the block from inside: a small uppercase mono label on
a hairline that runs the panel's full inner width, the payload beneath it. The
rule does the framing the title bar was doing, the label says what was captured
rather than which window it came from, and there are no disc-shaped
non-controls to hide from assistive tech. Label 10–12px, tracking .08–.14em,
6–10px above the rule.
```css
.record > .label { display:block; font: 11px/1 var(--mono); letter-spacing:.12em;
  text-transform:uppercase; color: var(--ink-faint);
  border-block-end: 1px solid var(--rule); padding-block-end: 6px; margin-block-end: 8px }
```
⚠ The label is content, not decoration — it must not be `aria-hidden`, and a
sample meant to be copied should sit outside the element the reader drags over.

At phone width the mock's own chrome should be *deleted*, not reflowed. Sort
its regions once into evidence — the figures, the rows, the states the section
is actually claiming — and apparatus: a sidebar of invented nav labels, a
breadcrumb, a toolbar. Apparatus reflowed into a stacked column reads as a
badly-built application and costs a third of the viewport to say nothing;
dropped, the evidence pane runs full width and the mock stays an illustration.
Evidence still reflows, and its internal rules have to be re-cut for the new
column count or the seams double.
```css
@media (width <= 45rem) { .mock-nav { display: none }
  .mock-stats { grid-template-columns: 1fr 1fr } }
```
⚠ Only where the apparatus is invented. Chrome a reader is meant to learn —
a real product tour — has to survive, because hiding it changes the claim.

A title bar is not the only synthetic chrome, and it is the wrong one where the
claim is *inside* the product rather than a window of it. A fixed rail of
sections down one side, a breadcrumb strip across the content, and the embed
reads as a workspace with no desktop OS implied — which also survives being
reproduced at container widths a window frame cannot. Rail 8–14rem, breadcrumb
strip the same height as the rail's first row so the two corners agree.
```css
.shell { display: grid; grid-template-columns: clamp(8rem, 18%, 14rem) minmax(0, 1fr) }
```
⚠ Breadcrumb depth is a claim about navigation. Two levels read as a location;
four imply a hierarchy the reader will look for and not find.

The caption above reads better as a pair than as a line. The uppercase label
names what was captured; a second line under it, sentence case and one tier
down, states the *operation* rather than the noun — what went in and what came
out, or the states the thing moves through. The panel then makes its claim
without a paragraph beside it, which is what lets several of them run down a
page as evidence instead of as decoration under repeated prose. Gloss 4–9 words,
no terminal full stop.
```css
.record > .gloss { font-size: .92em; color: var(--ink-2); margin-block-start: 4px }
```
⚠ Two lines of apparatus is the ceiling — a third turns the panel's header into
a section header and the evidence starts reading as a subsection.
