---
id: synthetic-application-chrome
category: surface
tags: [frame,chrome,media,mock,product,decoration]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
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
