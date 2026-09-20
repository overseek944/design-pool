---
id: step-held-band-tear
category: reveal
tags: [motion,easing,text,clip-path,reveal,glitch]
axes: {energy: 4, density: 2, weight: 3, finish: 2}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
An arrival that should read as a signal *resolving* rather than fading in.
Slice the element at four or five unrelated horizontal bands with `clip-path:
inset()`, offset its paint in opposite directions per frame, and run the whole
list under `step-end` so nothing interpolates — the eye gets dropped frames,
not motion. Land on `clip-path: none`. Duration 0.12–0.22s total; beyond ~0.3s
it stops being a fault and becomes an effect. Offsets 1.5–6px, scaled to type
size.

```css
.tear { animation: .16s step-end tear }
@keyframes tear { 0%  { clip-path: inset(0 0 62%); text-shadow: -2px 0 #f0a, 2px 0 #0df }
                  50% { clip-path: inset(74% 0 0); text-shadow: 2px 0 #f0a, -2px 0 #0df }
                  to  { clip-path: none; text-shadow: none } }
```
⚠ `step-end` means every authored frame is fully visible — an illegible one is
on screen for its whole share, so check each. Must not run under reduced
motion, and never on a run of body text.
