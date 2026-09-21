---
id: transfer-table-gradient-map
category: media
tags: [media,color,filter,svg,normalisation]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A filter chain lays one hue over a photograph; a transfer table gives the
shadows, the mids and the highlights each their own. Collapse the source to
luminance with an `feColorMatrix` carrying the Rec.709 weights in all three
rows, then hand each channel a `type="table"` ramp — stops are sampled evenly
from black to white, so three is a split-tone and five a full grade. CSS filter
functions still trim the result. Keep each ramp monotonic; 3–5 stops.

```html
<filter id="grade" color-interpolation-filters="sRGB">
 <feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0
                                      .2126 .7152 .0722 0 0 0 0 0 1 0"/>
 <feComponentTransfer><feFuncR type="table" tableValues="0.09 0.56 1"/>
  <feFuncG type="table" tableValues="0.06 0.36 0.91"/>
  <feFuncB type="table" tableValues="0.03 0.03 0.77"/></feComponentTransfer>
</filter>
```
```css
.graded { filter: url(#grade) saturate(.5) contrast(1.07) }
```
⚠ `color-interpolation-filters="sRGB"` is not optional — the default is
linearRGB and every stop lands darker than authored. The filter must sit in the
same document as the image, or the `url()` resolves to nothing and the picture
paints ungraded rather than failing.
