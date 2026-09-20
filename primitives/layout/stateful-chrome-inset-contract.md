---
id: stateful-chrome-inset-contract
category: layout
tags: [layout,chrome,tokens,custom-property,architecture,overlay,correctness]
axes: none
cost: 2
seen: 1
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
