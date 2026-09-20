---
id: settling-strike-envelope
category: motion-system
tags: [flicker,envelope,keyframe-table,shader,portable,data]
axes: {energy: 4, density: 2, weight: 3, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Something powering on does not fade — it strikes, drops out, catches, holds.
Author that as normalised `[time, value]` pairs whose dropouts get shallower and
whose gaps get longer, then apply it as hard cuts at `start + t * duration`.
Fractional times mean one table plays over 0.3s or 3s, and it compiles into a
shader as a branchless chain of `mix(o, v, step(t, x))` — one envelope, two
renderers.

```js
const E = [[0,.2],[.05,1],[.1,.25],[.17,1],[.26,.4],[.33,1],[.54,1],[.79,1]]
E.forEach(([t, v]) => tl.set(el, { opacity: v }, at + t * dur))
```
⚠ Tween these and the character is gone; they must be cuts. Above ~3Hz this is
seizure-adjacent — under `prefers-reduced-motion` jump straight to the last value.
