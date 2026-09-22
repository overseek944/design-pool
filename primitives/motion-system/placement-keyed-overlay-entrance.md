---
id: placement-keyed-overlay-entrance
category: motion-system
tags: [motion,popover,tooltip,menu,overlay,entrance,exit,placement]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A floating panel should arrive travelling away from its trigger. When collision
handling may flip it to the other side, an entrance authored for one side
slides it in *toward* the trigger. Key the keyframe on the resolved side the
positioner writes back, not the side requested. Travel 2–8px, 0.15–0.4s on an
expo-out; leave faster than you arrive — 60–70% of the entrance, ease-in.
```css
[data-side=bottom] { animation: from-top .3s cubic-bezier(.16,1,.3,1) }
[data-side=top]    { animation: from-bottom .3s cubic-bezier(.16,1,.3,1) }
@keyframes from-top { from { opacity: 0; translate: 0 -4px } }
```
⚠ Under reduced motion keep the fade and drop the travel.
