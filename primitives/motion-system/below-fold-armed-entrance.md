---
id: below-fold-armed-entrance
category: motion-system
tags: [motion,correctness,progressive-enhancement,observer,reveal]
axes: none
cost: 1
seen: 26
requires: []
conflicts: []
completes: []
tension: []
---
An entrance system that hides content in CSS and un-hides it from script must be
defended against script that never arrives. Invert it: ship nothing hidden, and
at setup add the hidden class only to elements whose top already sits past the
fold — one `getBoundingClientRect` read, armed at 85–95% of viewport height — the low
end where entrances are short and the fold is soft, the high end where an
arming mistake would be visible.
Everything already visible renders settled, so a dead runtime costs the
entrances rather than the page, and the observer gets a smaller set to watch.

```js
els.forEach(el => {
  if (el.getBoundingClientRect().top <= innerHeight * .92) return
  el.classList.add('pre'); io.observe(el) })
```
⚠ Read positions before any layout the entrance itself causes, and in one pass —
arming element by element reflows per element. Content that starts below the
fold is still hidden, so a runtime that dies *after* setup needs a watchdog.

The two halves can take different runtimes. Content above the fold needs no
observer at all and no script either — give it a plain CSS `animation` with its
delay inline, and it plays from the stylesheet before hydration, on a dead
bundle, and on the first paint rather than a frame after it. Script then owns
only the below-fold set, which is the half that genuinely needs to watch for an
intersection.
```jsx
eager ? <div className="reveal-eager" style={{ animationDelay: `${d}s` }}>…</div>
      : <Observed delay={d}>…</Observed>
```
⚠ The CSS path must carry its own `reduce` branch — it is not reached by the
runtime's check. Collapse its duration rather than cancelling the animation, or
`both` fill leaves the element at its 0% frame.

Order decides it when the gate is a single class on the root rather than a class
per element. Mark the eager set settled *first*, then add the flag that arms the
transition rules: the stylesheet cannot hide anything until everything already on
screen is holding its finished state, so no paint catches an above-fold element
mid-transition even if the two writes land in different frames.
```js
eager.forEach(el => el.classList.add('is-visible'))
document.documentElement.classList.add('reveal-ready')   // arms the rules
```
⚠ Reversing the two lines reviews identically and flashes in the field.

Cheapest of all where one region is above the fold at every viewport: name it in
the stylesheet and neutralise the entrance inside it. No measurement pass, no
arming, no second markup path — authors keep putting the same class on
everything and the opening screen simply never carries a pre-state, so it paints
settled on the first frame and the largest element on the page is never gated on
a script.
```css
.reveal      { opacity: 0; transform: translateY(12px) }
.hero .reveal{ opacity: 1; transform: none }
```
⚠ Only sound where the exemption is a real guarantee. A region that falls below
the fold on a short landscape phone loses its entrance there for nothing, and
one that grows past the fold later exempts content nobody has looked at.

Where the hide has to live in CSS anyway — an animation engine that owns the
from-state and cannot be told about it before it loads — gate the hiding rule
on the engine's own *ready* class rather than on a js-present class. The
content un-hides the moment the runtime registers, so a bundle that downloads
and then throws before initialising still settles visible, which a js-present
gate never does.
```css
html.js:not(.fx-ready) [data-enter] { visibility: hidden }
```
⚠ Use `visibility`, not `display` — it holds the box, so nothing shifts when
the class lands and the engine can still measure. Scope the selector to an
opt-in attribute: applied broadly it is a blank page for the length of the
bundle.

The split can be one class rather than two markup paths. Author the entrance as
an ordinary animation utility, and let a second, additive marker class be what
withholds it: alone, the utility plays from the stylesheet at parse; with the
marker, the from-state is pinned and `transition: none` holds it until script
adds a third class that reinstates the animation. Authors then write the same
utility everywhere and opt an element into waiting by adding one word — no
component fork, and forgetting the marker degrades to playing immediately rather
than to never playing.
```css
.rise              { animation: rise .45s var(--ease) both }
.wait.rise         { opacity: 0; transform: translateY(22px); animation: none }
.wait.seen.rise    { animation: rise .45s var(--ease) both }
```
⚠ The gate is specificity, so the utility and the reinstating rule must stay in
one layer — a utility hoisted into `@layer utilities` outranks the pin and the
element never waits.

Whatever arms the eager set must decide visibility the way the observer will,
or the two gates disagree on the boundary case: a tall element whose top sits
at 90% of the viewport passes a `top <= 92%` arming and fails a
`threshold: 0.15` observer. Compute the real intersecting fraction — the
clamped overlap rect over the element's own area — against the same threshold
the observer is constructed with, and run it in a layout effect so the verdict
lands before the first paint rather than a frame into it.
```js
const b = el.getBoundingClientRect()
const vw = Math.min(b.right, innerWidth) - Math.max(b.left, 0)
const vh = Math.min(b.bottom, innerHeight) - Math.max(b.top, 0)
if (vw > 0 && vh > 0 && (vw * vh) / (b.width * b.height) >= THRESHOLD) settle()
```
⚠ Zero-area elements divide by zero — guard on `b.width * b.height` before the
ratio. Keep the observer for everything the check declines; it is the arming
pass that is redundant afterwards, not the observer.
