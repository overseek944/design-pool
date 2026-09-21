---
id: stateful-chrome-inset-contract
category: layout
tags: [layout,chrome,tokens,custom-property,architecture,overlay,correctness]
axes: none
cost: 2
seen: 6
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
