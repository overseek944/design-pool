---
id: focus-held-chrome-retraction
category: interaction
tags: [interaction,correctness,accessibility,focus,keyboard,scroll,chrome,navigation]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A bar that retracts on downward scroll must ask more than which way the page
moved. While it contains `document.activeElement` or an open panel it must
stay — focus moving through its links scrolls the page, and the bar hides
out from under the focused control. Gate the direction test on that boolean,
and re-baseline only past a 4–8px delta, or jitter flips it.

```js
const held = bar.contains(document.activeElement) || bar.querySelector('[open]')
const hide = !held && y > FLOOR && (Math.abs(y - last) >= 5 ? y > last : hidden)
```
⚠ Restore the bar when the behaviour is torn down at a breakpoint — a retracted
bar whose listener is removed on resize never comes back.

One delta for both directions is the wrong shape: hiding should be easy and
showing should be asked for. Give the two tests different thresholds — 4–6px of
downward movement retracts, 10–16px of upward movement restores — and a drifting
trackpad stops flashing the bar back at every wobble while a deliberate flick up
still lands instantly. The floor below which it never hides can be content
rather than a constant: derive it from the bottom edge of whatever section the
bar must stay legible over, so the bar is pinned through an opening scene and
free below it without a magic number.
```js
const floor = Math.max(TOP, sectionBottom + scrollY - bar.offsetHeight)
```
⚠ Re-derive the floor on resize and after fonts load — measured once at
`DOMContentLoaded` it is wrong by however much the section reflowed.

Focus is not held for the whole of the movement it starts. A click on an in-page
anchor moves focus out of the bar and *then* scrolls the page several viewports
down, so the bar retracts during exactly the jump the reader asked for and the
destination arrives with no navigation on it. Raise a suppression flag from a
capture-phase click on any `a[href^="#"]` with a real fragment, and clear it on a
timer longer than the smooth scroll. Downward movement then does nothing while
it is set, while upward still restores — a reader who changes their mind mid-jump
is not locked out. 1.5–2.5s.
```js
addEventListener('click', e => { if (!e.target.closest?.('a[href^="#"]')?.hash) return
  clearTimeout(t); jumping = true; t = setTimeout(() => jumping = false, 2200) }, true)
```
⚠ A timer, not a `scrollend` listener: support is partial, and a jump that lands
inside one frame never fires the direction test the flag exists to suppress.
