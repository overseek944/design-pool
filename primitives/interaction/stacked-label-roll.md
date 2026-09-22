---
id: stacked-label-roll
category: interaction
tags: [interaction,hover,button,label,motion,clip]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A button can acknowledge the pointer without changing colour or size: stack two
copies of its label one line apart inside a clipped box, and on hover move both
up by one line so the resting copy exits the top as its twin rises into place.
It reads as the control turning over, keeps the fill still, and costs two
transforms. Travel 100–120% of line height, 300–450ms, strong ease-out.

```css
.btn { overflow: clip; position: relative }
.btn .roll { display: grid; transition: translate .4s cubic-bezier(.4,0,.1,1) }
.btn .roll > * { grid-area: 1 / 1 }
.btn .roll > :last-child { translate: 0 110% }
.btn:is(:hover, :focus-visible) .roll { translate: 0 -110% }
```
⚠ `aria-hidden` the second copy or the name is read twice; drop the travel under reduced motion.
