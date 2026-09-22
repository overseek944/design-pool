---
id: transition-shed-demo-handoff
category: interaction
tags: [affordance,drag,transition,correctness,demo]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A control whose only affordance is a drag can advertise itself by walking its
range on an idle loop — two to four positions, 2.5–5s apart, eased by a CSS
transition so it glides. That transition is latency once a hand is on it: a
dragged thing must track the pointer with no easing. On first input, cancel the
loop permanently and strip the transition in the same tick, before the new
position is written.

```js
on('input', () => { if (live) { live = false; clearInterval(loop)
  for (const n of [fill, handle]) n.style.transition = 'none' } write() })
```
⚠ Never re-arm on a later idle: a control that resumes moving under someone
who has touched it reads broken.

Where the affordance already has a hover state worth showing, the advertisement
costs no new animation: raise a class on the container for one beat shortly
after mount and add it to the *existing* hover selector list. The element plays
the real state — the same slide, ring and glow it will give under a pointer —
then returns, and the promise is exact rather than a mime of it. 0.6–1s before
it fires, 0.6–1.2s held. Skip the whole effect if a reduced-motion query matches
or the reader has already engaged, and never arm it twice.
```js
if (matchMedia('(prefers-reduced-motion: reduce)').matches || active) return
const a = setTimeout(() => set(true), 700), b = setTimeout(() => set(false), 1500)
```
⚠ Tie it to mount only if the thing is above the fold. Below it, the beat is
spent before the reader arrives and the control is never advertised at all —
arm on intersection instead.
