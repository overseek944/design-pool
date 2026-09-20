---
id: loop-gated-on-attention
category: perf
tags: [performance,animation,intersection-observer,visibility,battery,correctness]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
An `infinite` decorative animation never stops — it keeps compositing while
scrolled past and while the tab is buried, on battery. Gate it on both facts at
once: intersecting the viewport **and** `document.visibilityState === 'visible'`.
Publish the result as one attribute on the container and let CSS pause the whole
subtree; declarative motion needs no other wiring. Arm at 0.3–0.5 of the element,
0.2–0.35 below the mobile breakpoint where a tall visual never reaches the higher
ratio.
```js
el.toggleAttribute('data-paused', !(onScreen && visible))
el.querySelectorAll('svg').forEach(s => onScreen && visible ? s.unpauseAnimations() : s.pauseAnimations())
```
```css
[data-paused] *, [data-paused] *::before { animation-play-state: paused !important }
```
⚠ SMIL ignores `animation-play-state` — it needs the `pauseAnimations()` call.
Pausing holds the current frame, so anything mid-wipe freezes visibly cropped.

A script-driven render loop is not reached by `animation-play-state` — the gate
must stop requesting frames and restart on re-entry. Reset the loop's clock on
resume, or motion driven from elapsed time jumps by however long it sat
offscreen.
