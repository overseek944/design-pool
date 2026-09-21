---
id: quantised-tick-arc
category: surface
tags: [svg,data,measurement,precision,geometry,detail]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A filled arc is a percentage the eye misjudges by ten points. A ring of discrete
ticks is an instrument: the reader counts. Place the marks by polar arithmetic
across a shallow arc, lengthen and thicken every fourth into a major gradation,
and carry the value in *how many are lit* rather than in a sweep — so the
readout states its own resolution and cannot claim precision it does not have.
30–60 ticks over a 110–150° span, minor arms 4–5% of the radius against major
at 7–8%, unlit held near 15% of the lit weight.

```jsx
const a = (START + i / (N - 1) * SPAN) * Math.PI / 180, arm = i % 4 ? 23 : 40
<line x1={cx + R * Math.cos(a)}         y1={cy + R * Math.sin(a)}
      x2={cx + (R - arm) * Math.cos(a)} y2={cy + (R - arm) * Math.sin(a)}
      opacity={i < Math.round(N * v) ? .9 : .14} />
```
⚠ The count quantises, so any value under `1/N` lights nothing and reads as
broken — floor it at one tick whenever the value is non-zero. Decoration unless
it carries `role="meter"`; the figure belongs beside it either way.
