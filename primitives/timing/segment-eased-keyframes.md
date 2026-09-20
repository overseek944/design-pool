---
id: segment-eased-keyframes
category: timing
tags: [motion,easing,keyframes,choreography,loop]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`animation-timing-function` declared *inside* a keyframe block sets the curve
for the segment starting there, so one animation can leave rest on an ease-out,
cross the middle on `linear` and settle on an ease-in. With a single curve
stretched over every beat, a long multi-stop loop reads rubbery — the travel
decelerates where it should be steady. Spend 0.15–0.3 of the cycle entering on a
strong out-curve, hold the sustain `linear`, exit in 0.08–0.15.
```css
@keyframes stream {
  0%  { opacity: 0; translate: 0 10px; animation-timing-function: cubic-bezier(.23,1,.32,1) }
  7%  { opacity: 1; translate: 0 0;    animation-timing-function: linear }
  84% { opacity: 1;                    animation-timing-function: cubic-bezier(.4,0,1,1) }
  93% { opacity: 0 }
}
```
⚠ The function on the last keyframe is ignored, and the shorthand's easing
becomes only a default — it silently loses to any keyframe declaring its own.
