---
id: synthetic-application-chrome
category: surface
tags: [frame,chrome,media,mock,product,decoration]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 5
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
