---
id: accelerating-tremor-release
category: motion-system
tags: [anticipation,idle,release,ambient,loop]
axes: {energy: 4, density: 2, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
To make a change read as caused rather than scheduled, spend time before it.
Hold the element still and shake it with amplitude and frequency both climbing
— amplitude on a square term, so the build is barely there at first and
unmistakable by the end — then cut to the move, decaying the tremor to nothing
across the arrival. An ease-out alone is a transition; the charge lands it.
Build 2–3.5s ambient, 250–500ms on a control; amplitude peaking at 8–14%.

```js
const q = t / BUILD, amp = 1 + q * q * 10, w = t * (.025 + q * .07)
p[i] = rest[i] + axis[i] * amp * Math.sin(w + phase[i])
p[i] = lerp(p[i], to[i], easeOut(r)) + axis[i] * amp * (1 - r)
```
⚠ A long build holds the eye on something that has not happened — keep it for
motion that starts itself, never as a response to a click. Fix each axis and
phase once or it reads as noise.
