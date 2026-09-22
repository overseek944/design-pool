---
id: circumference-fitted-seal-ring
category: type
tags: [type,svg,ornament,mark,watermark,rotation]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An authority mark can be typeset rather than drawn: a legend set along a closed
circular path, concentric rules, a centred glyph. `<textPath>` needs a real
`<path>` — a `<circle>` is not a valid target — so build the ring from two half
arcs. Text past the circumference is dropped, never wrapped: repeat the legend
with a separator and widen tracking until the run overfills `2πr`, so the seam
lands on a divider. As a ground mark: 3–6% ink, bled a third past the section
edge, one turn per 40–90s.

```svg
<path id="r" d="M250,250 m-200,0 a200,200 0 1,1 400,0 a200,200 0 1,1 -400,0"/>
<text letter-spacing="4"><textPath href="#r">LEGEND · LEGEND · </textPath></text>
<circle cx="250" cy="250" r="180" stroke="currentColor" fill="none"/>
```
⚠ The legend is live text in the reading order: `aria-hidden` the group,
`pointer-events: none`. An unconditional turn is perpetual peripheral motion —
gate it behind `prefers-reduced-motion: no-preference`.

A ring *divided* into labelled segments wants one arc path per segment, not one
closed path. Draw each arc with its sweep reversed for the segments whose
centre falls in the lower half, so those labels run left-to-right along the
inside of the curve instead of upside down; `startOffset="50%"` with
`text-anchor="middle"` centres each on its arc whatever its length.
```js
const low = mid > 0 && mid < 180   // degrees, 0 = 3 o'clock
d = `M ${p(low ? b : a)} A ${r} ${r} 0 0 ${low ? 0 : 1} ${p(low ? a : b)}`
```
⚠ Reversed arcs sit on the other side of the baseline — use
`dominant-baseline: central` or lower labels drift off the band.
