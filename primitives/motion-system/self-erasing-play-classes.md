---
id: self-erasing-play-classes
category: motion-system
tags: [architecture,progressive-enhancement,svg,accessibility,correctness,entrance]
axes: none
cost: 1
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
Author the finished frame as the markup, then take it away to play it. Script
adds `armed` to un-draw the moving parts, `play` to run them once, and drops
both when the run ends — leaving exactly the file that shipped. No "complete"
state is authored, and with the script dead, inside an `<img>` or under reduced
motion the reader still gets the whole thing. Await the real animations, not a
duration you retyped.

```js
el.classList.add('armed')     /* .armed .curve { stroke-dashoffset: 1 } */
el.classList.add('play')
Promise.all(el.getAnimations({ subtree: true }).map(a => a.finished))
  .then(() => el.classList.remove('armed', 'play'), () => {})
```
⚠ Arm before first paint or the settled frame flashes. Re-arm only at ratio 0;
at 0.1–0.3 it replays mid-view.

Classes can only undo what CSS did. A sequence that types into nodes, scrolls
a pane, injects rows or writes inline styles has no class to remove, and the
second play starts from wherever the first stopped. Snapshot the subtree's
`innerHTML` once at setup — the shipped, settled markup — and restore it to
rewind: one assignment returns text, scroll offsets, attributes and injected
nodes together, and the settled frame is by construction exactly what was
served. Re-query every node after the write; the old references address a
detached tree.
```js
const settled = stage.innerHTML              // the end state, as shipped
const rewind = () => { stage.innerHTML = settled; delete stage.dataset.phase }
```
⚠ Listeners, observers and running animations inside the subtree die with it —
delegate from the container or re-bind after each rewind. Never over a subtree
holding an iframe, a media element or the focused node.

A ladder that is purely declarative — a dozen `nth-child` delays off one class —
has no handle at all: re-adding the class restarts nothing without a forced
reflow, and pausing parks it on its last frame. Replace the subtree's node
identity instead and every animation under it restarts together, from one state
change and no per-element bookkeeping. In a component framework that is a key
bump on a wrapper; in plain DOM, `replaceWith(cloneNode(true))`. Cycle 6–10s,
long enough that the settled card is what is on screen most of it.
```jsx
<Fragment key={runId}>{…}</Fragment>   /* runId++ on an interval */
```
⚠ It is a remount: focus, scroll position and listeners inside die with it.

Under `reduce` the *arm* class is the one that has to be neutralised, not the
play class. Cancelling the animations alone leaves every moving part sitting in
the un-drawn state the arming rule wrote — stroke undrawn, scale at 0.4 — which
is worse than the motion it replaced. Restore the settled values from the armed
selector itself, so the scene is correct whether or not the play class ever
lands.
```css
@media (prefers-reduced-motion: reduce) {
  .stage[data-armed] .part { opacity: 1 !important; transform: none !important } }
```
⚠ `!important` is load-bearing here: the armed rules it overrides are equally
specific and come later in the sheet.

In a state-driven render the same idea is the initial value: start the machine
at `step = length, mode = 'complete'`, so the server and the reduced-motion
reader both get the finished thread, and rewind to 0 only on the first qualified
view. Make each step's timeout an effect of `active = inView && tabVisible` —
exit clears it, re-entry reschedules the *same* step, so the sequence pauses
rather than resets. Per-step delays 600–1800ms, arm at 0.3–0.5.
```js
const [s, set] = useState({ step: n, mode: 'complete' })
useEffect(() => { if (!active || s.step >= n) return
  const t = setTimeout(() => set({ step: s.step + 1 }), delays[s.step]); return () => clearTimeout(t) }, [active, s.step])
```
⚠ The rewind blanks a visible block — gate it on the ratio so it happens as the
block arrives, never under a reader already looking at it.
