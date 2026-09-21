---
id: masked-line-rise
category: reveal
tags: [type,motion,reveal]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: [revert-split-on-resize, will-change-on-split-children]
tension: []
---
Split to lines, wrap each in an `overflow-hidden` outer with a transform-only
inner. Lines rise out of their own mask — no fade needed, and the crop edge
gives the motion a physical boundary. The canonical headline entrance.
```js
const outer = SplitText.create(el, { type:"lines", linesClass:"overflow-hidden line-outer" })
const inner = SplitText.create(outer.lines, { type:"lines", linesClass:"line-inner inline-block w-full" })
gsap.from(inner.lines, { yPercent: 110, duration: .9, ease: "power3.out", stagger: .07 })
```
Two nested splits — one to mask, one to move. One split can't do both.

The mask crops everything, including what was meant to overhang: a mark seated
on a glyph, a badge riding an ascender, a swash past the cap line all vanish
into the `overflow: hidden` that makes the effect work. Open headroom on the
mask and take it straight back as an equal negative margin — the crop grows, the
line's layout box does not, so nothing below moves. Headroom in `em` so it
tracks a `clamp()`ed display size. 0.3–0.6em is usually enough.
```css
.line-outer { overflow: hidden; padding-block-start: .5em; margin-block-start: -.5em }
```
⚠ Only headroom is free. Padding on the *bottom* edge reopens the crop the rise
travels out of, and the line is then visible before it starts.

Current split utilities own the mask themselves — `mask: "lines"` generates the
wrapper — and size it to the line's font-metric box, which crops descenders on
`g`, `y`, `p`, `j`. The headroom trick still applies, on the other edge and much
smaller: 0.08–0.12em of bottom padding taken straight back as a negative margin.
Target the generated wrapper through `:has(> .lineClass)` rather than the
library's internal class name, which is not part of its contract.
```css
[data-lines] :has(> .split-line) { padding-block-end: .1em; margin-block-end: -.1em }
```
⚠ This is the edge the rise travels out of, so every pixel of it shows the line
early. Keep it under 0.12em, and prefer a face whose descenders sit inside the
metric box to opening the crop further.
