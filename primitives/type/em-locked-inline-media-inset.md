---
id: em-locked-inline-media-inset
category: type
tags: [typography,image,display-type,inline,responsive]
axes: {energy: 1, density: 3, weight: 4, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A display line that ends short leaves a rectangle of dead measure, and the usual
answers — balance the wrap, hang a word — only move the hole. Set media into the
line instead: `inline-block` panels sized entirely in `em`, so they track the
type through every clamp and breakpoint with no second set of rules. The
headline is then justified by pictures rather than by word spacing. Height
0.7–0.9em, width 1.1–1.7em, dropped onto the optical baseline by 0.03–0.05em.

```css
.inset { display: inline-block; block-size: .75em; inline-size: 1.4em;
  overflow: hidden; border-radius: .065em; transform: translateY(.035em) }
.inset img { inline-size: 100%; block-size: 100%; object-fit: cover }
```
⚠ These sit inside the heading's text: `alt=""` on each, and the sentence has to
read without them. At 0.75em there is room for one crop and no detail.
