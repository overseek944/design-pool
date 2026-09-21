---
id: keyboard-modality-stilled-ui
category: motion-system
tags: [motion,accessibility,keyboard,input,correctness,transition]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A reader tabbing through a page outruns transitions authored for a pointer:
every stop waits on an ease nobody chose, and smooth scrolling parks the
focused control after the eye has already arrived. Track which device last
drove the page — `keydown` writes keyboard, `pointerdown` writes pointer —
publish it on the root, and let the keyboard branch flatten transition,
animation and scroll behaviour. Exempt decorative art by selector: the point is
latency between two controls, not silencing the page.

```css
html[data-input=keyboard] :not([data-art], [data-art] *) {
  transition: none !important; animation: none !important }
html[data-input=keyboard] { scroll-behavior: auto }
```
⚠ Not a stand-in for `prefers-reduced-motion`, which is a stated preference
rather than an inference. Write the flag in the event handler, before focus
moves, or the first stop after a switch still eases.

Flattening every transition is more than the problem asks for. What actually
punishes a keyboard reader is the scroll-linked class — scrubbed parallax,
reveal triggers, a page transition — because Space and PageDown move the
viewport in jumps no scrub was authored for, while a hover ease costs nothing.
Suspend that class alone and leave the rest. Restore on `wheel` and
`touchstart` as well as `pointerdown`: a trackpad reader who never presses
anything is a pointer reader too.
```js
addEventListener('keydown', () => { kbd = true; apply() }, { capture: true })
for (const n of ['pointerdown', 'wheel', 'touchstart'])
  addEventListener(n, () => { if (kbd) { kbd = false; apply() } }, { passive: true })
```
⚠ Publish the result as one root attribute so the CSS-only motion reads it too —
a scroll-timeline animation is untouched by tearing down the script's tweens.
