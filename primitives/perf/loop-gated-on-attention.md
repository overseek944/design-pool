---
id: loop-gated-on-attention
category: perf
tags: [performance,animation,intersection-observer,visibility,battery,correctness]
axes: none
cost: 2
seen: 14
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

Fold the motion preference into the same predicate rather than leaving it to a
separate media query, and subscribe to the query's `change` — a reader reaching
for the OS switch mid-session should stop the loop, not wait for a reload. The
same predicate is where a reader's explicit pause belongs, so one attribute
carries every reason the thing is not running.
```js
const run = () => el.dataset.running = String(onScreen && visible && !rm.matches && !userPaused)
rm.addEventListener('change', run); document.addEventListener('visibilitychange', run)
```

Geometry and page visibility miss a third case: content that is on screen and
in a visible tab but *authored* as absent — the inactive panel of a tab set, a
carousel slide out of view. Ask the accessibility state, not the layout.
```css
[role="tabpanel"][aria-hidden="true"] * { animation-play-state: paused !important }
```

Fold teardown into the same predicate rather than relying on cancellation. A
frame already queued when the view unmounts still fires, so the flag the cleanup
sets must be one of the terms — and the predicate has to be consulted again at
the *top of the callback*, not only where frames are requested.
```js
const run = () => !destroyed && !rm.matches && onScreen && !document.hidden
const frame = t => { raf = null; if (!run()) return; draw(t); raf = requestAnimationFrame(frame) }
```

A reader-facing motion switch belongs in the same predicate, but it is not
symmetrical with the OS preference: it may turn motion *off*, never back on over
a standing `reduce`. Disable the control in that state and put the reason in its
title, so it reads as already honoured rather than broken. Both sources
resolving to one attribute on the root keeps the query and the toggle on a
single path — the CSS reset is one rule list, selected two ways.
```html
<button aria-pressed="false" disabled title="Reduced motion is on in your system settings">
```
```css
@media (prefers-reduced-motion: reduce) { .page *, .page ::before {
  animation: none !important; transition: none !important } }
.page[data-reduced-motion=true] *, .page[data-reduced-motion=true] ::before { /* same */ }
```

When the loop stands in for a media element — a level meter, a waveform, a
spinner over a stream — the transport is the term, and its truth lives in the
element's events, not in the control that started it. `ended`, `pause`,
`waiting` and `seeking` all arrive with no click, so a visualiser wired to the
button keeps dancing over silence.
```js
['play','playing','pause','ended','waiting','seeking'].forEach(t =>
  audio.addEventListener(t, () => el.dataset.running = String(!audio.paused && !audio.seeking)))
```
⚠ Bind the element, not the page: several players on one surface each own their
own meter, and a shared flag stops all of them when any one ends.
