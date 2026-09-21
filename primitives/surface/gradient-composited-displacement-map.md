---
id: gradient-composited-displacement-map
category: surface
tags: [svg-filter,displacement-map,glass,refraction,backdrop-filter,declarative]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A displacement map is normally a canvas rebuilt per element on every resize.
Build it in declarative SVG instead and hand it to `feImage` as a data URI:
fill black, lay a horizontal gradient into red and a vertical one into blue
over the same rounded rect under `mix-blend-mode: difference`, then blur an
inset rect across the centre to null it. Red carries x, blue carries y, and
both ramp only at the rim. The map rescales with the filter region, so one
filter serves every size with no JavaScript. Inset 8–14% of the short side,
centre blur 15–30px.

```html
<feImage result="map" width="100%" height="100%" href="data:image/svg+xml,
 <svg viewBox='0 0 200 100'><rect width='200' height='100' fill='black'/>
 <rect rx='100' width='200' height='100' fill='url(%23xr)'/>
 <rect rx='100' width='200' height='100' fill='url(%23yb)' style='mix-blend-mode:difference'/>
 <rect x='11' y='11' width='178' height='78' rx='100' fill='%23adadad' style='filter:blur(22px)'/></svg>"/>
```
⚠ The map rasterises at filter-region size every repaint — keep it to chips and
pills, not full-bleed panels.
