---
id: stateful-chrome-inset-contract
category: layout
tags: [layout,chrome,tokens,custom-property,architecture,overlay,correctness]
axes: none
cost: 2
seen: 21
requires: []
conflicts: []
completes: []
tension: []
---
Fixed chrome should publish the space it takes as root custom properties rather
than keep it inside its own rules. Page padding, scroll-padding, docked bars and
toast positions each read one variable, so collapsing a rail or dropping the bar
below a breakpoint is a single reassignment and no consumer is touched. The
contract is what makes a new overlay correct by construction instead of by
remembering. Rail 12–16rem open, 3–4rem collapsed.

```css
:root { --nav-inline: 0rem; --nav-block: 3rem }
:root[data-shell=rail] { --nav-block: 0rem }
@media (min-width: 80rem) { :root[data-shell=rail] { --nav-inline: 15rem } }
.toast { left: calc(var(--nav-inline) + 1rem);
         max-width: calc(100vw - var(--nav-inline) - 2rem) }
```
⚠ An unregistered custom property does not interpolate — transition the
consumer's own `padding-inline-start`, or the page snaps while the rail slides.

One measurement, two numbers. Height and *current* offset are different
questions: page padding, `scroll-padding-top` and anchor targets want the space
the chrome reserves and must not move, while a sticky panel below it wants the
space the chrome is occupying right now — which is zero the moment a hide-on-
scroll bar has retracted. Publish both and each consumer reads the one it means;
publish one and sticky panels hold a gap under a bar that is no longer there.
```js
root.style.setProperty('--nav-h', h + 'px')                 // reserved, stable
root.style.setProperty('--nav-offset', hidden ? '0px' : h + 'px')
```
```css
.panel { position: sticky; top: var(--nav-offset, var(--nav-h)) }
```
⚠ Add the class that enables transitions one frame *after* the first write, or
every consumer animates from zero on load.

A banner stacked above pinned chrome inverts which number is the stable one. The
banner scrolls away and never comes back, so the height anchors and focus must
clear is the pinned bar alone — publish the pair and every in-page jump lands
with a banner-sized hole above it for the rest of the session. Sticky offsets
still want the pair while the banner is on screen, which is the occupying value,
not the reserved one.
```css
:root { --pin-h: 4rem; --banner-h: 2.75rem }
html { scroll-padding-block-start: var(--pin-h) }
.bar { position: sticky; inset-block-start: 0 }
```
⚠ A dismissible banner makes the occupying value change without a scroll event —
rewrite it on dismiss, or every sticky panel below holds a gap under a bar that
is gone.

Chrome that script mounts and unmounts — a bar armed past a scroll threshold,
a banner shown once — has to own the reassignment inside the same lifecycle
that owns the element, and the teardown is the half that gets forgotten. Write
the reserve when it mounts, clear it when it unmounts, and the page never
carries a hole under chrome that is not there. Declaring the reserve
statically instead leaves dead space for the whole session before the bar ever
appears.
```js
useEffect(() => { root.style.setProperty('--dock-h', shown ? H : '0px')
                  return () => root.style.removeProperty('--dock-h') }, [shown])
```
⚠ The reserve is page-end padding, not margin — margin collapses through the
last child and the bar covers the footer anyway. And it accumulates with
`env(safe-area-inset-bottom)` rather than maximising against it.

The contract needs both sides, and some chrome will never hold up its end — a
consent bar, a vendor pill, anything mounted by a branch that never sees the
root. Test for its *presence* from a common ancestor and let the offset fall out
of the selector: nothing to publish, no lifecycle to own, no teardown to forget,
and it is correct the frame the element appears.
```css
body:has([data-sticky-cta]) [data-consent] {
  inset-block-end: calc(4.5rem + env(safe-area-inset-bottom)) }   /* bar 3.5–5.5rem */
```
⚠ The selector hard-codes the other overlay's height, so the two drift the first
time one is restyled. Fine for a pair; past that the published value is the only
thing that scales.

The occupying value is not always a boolean. A banner that sits in normal flow
above pinned chrome is consumed continuously as the page moves — publish
`max(0, bannerHeight − scrollY)` from the same passive scroll handler and the
bar's `top` rides the banner out instead of snapping to zero at a threshold
somebody picked. The reserved number stays the pinned bar's own height
throughout, so anchors and `scroll-padding` never see the banner at all.
```js
root.style.setProperty('--banner-occupied',
  Math.max(0, banner.offsetHeight - scrollY) + 'px')
```
⚠ It is a layout read per scroll frame — cache `offsetHeight` and refresh it on
resize and on dismiss, not inside the handler. Write `0px` the moment the
banner is dismissed or the bar holds a gap under nothing.

Padding is only half the contract wherever anything is measured in viewport
units. A banner that pushes the document down does not shorten `100dvh`, so
every full-height section, snap stop and pinned stage overflows by exactly the
published height and the last snap point lands below the fold. Consumers that
*fill* the viewport subtract the reserve; consumers that follow the flow add it.
Both read one variable, and the state class is what arms the subtraction — a
page without the chrome then carries no `calc` at all.
```css
html.has-banner #root          { padding-block-start: var(--banner-h) }
html.has-banner .snap-viewport { height: calc(100dvh - var(--banner-h)) }
html.has-banner .snap-stop     { min-height: calc(100dvh - var(--banner-h)) }
```
⚠ The snap container and its stops must subtract the *same* term. Shorten only
the container and every stop overshoots by the reserve, which reads as snapping
being broken rather than as a sizing bug.

Chrome of constant height can be published once; chrome that *wraps* — a footer
row of links that becomes two rows, a bar reflowing under a long label — has no
constant, and `resize` misses most of what changes it. Re-measure on four
signals: resize, `orientationchange`, `document.fonts.ready` (a swapped face
re-wraps the row), and a `ResizeObserver` on the bar, which is the only one that
sees text-zoom and in-page translation. Keep a static fallback in the `var()`
slot for the paint before the first measure — one to two rows' worth.
```js
const set = () => root.style.setProperty('--bar-h', bar.offsetHeight + 'px')
set(); addEventListener('resize', set, { passive: true })
document.fonts?.ready.then(set); new ResizeObserver(set).observe(bar)
```
```css
.content { padding-block-end: calc(var(--bar-h, 7rem) + 1.5rem) }
```
⚠ Read the height off the element, never off the property it writes — where the
bar's own size depends on that variable the observer re-fires on its own reflow.

Publish the number only in the state that needs it. Chrome that reserves space
at one breakpoint and none at another can write the property on entering that
state and *remove* it on leaving, so the stylesheet's own declaration resumes
instead of being shadowed by a stale inline value. `removeProperty` is the
fallback; there is no second place to keep the default, and the measurement
exists for exactly as long as it is true.
```js
if (!wraps) { root.style.removeProperty('--nav-block'); return }
const write = () => root.style.setProperty('--nav-block', el.offsetHeight + 16 + 'px')
write(); const ro = new ResizeObserver(write); return () => ro.disconnect()
```
⚠ An inline property on `:root` outranks every stylesheet rule, media queries
included — written once at any width it pins that value at every other until
something removes it.

The bottom edge mirrors all of this with one addition. Chrome floating over the
page end has no fixed obstruction to clear — it has an in-flow element rising
into the viewport — so the number is the intrusion, `innerHeight` minus the
element's `top`, floored at zero and rewritten from one rAF-coalesced passive
scroll handler. Consumers take it through `max()` rather than adding it, which
gives the base inset for free while the value is 0 and, with `0px` in the
`var()` slot, a correct position on the paint before any script has run.
```js
const y = el.getBoundingClientRect().top
root.style.setProperty('--end-intrusion', Math.max(0, innerHeight - y) + 'px')
```
```css
.fab { inset-block-end: max(28px, var(--end-intrusion, 0px) + 28px) }
```
⚠ Any panel the floating control opens must subtract the same term from its own
`max-height`, or it lifts off the page end and is clipped by the top of the
viewport instead.
