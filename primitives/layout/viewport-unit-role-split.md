---
id: viewport-unit-role-split
category: layout
tags: [layout,viewport,mobile,responsive,correctness]
axes: none
cost: 1
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
A phone has three viewport heights, and picking one for the whole page is wrong
somewhere. Give the units roles instead: a pinned or sticky full-screen box
takes `lvh` so it always *covers*, an in-flow full-screen section takes `svh` so
it always *fits*, and anything anchored to a covering box's bottom edge is
lifted by the difference between them. Publish that difference once as a
constant — never `dvh` — so nothing moves while the address bar slides.
```css
:root { --bar-gap: 0px }
@supports (height: 100svh) { :root { --bar-gap: calc(100lvh - 100svh) } }
.stage   { height: 100lvh }                              /* covers */
.section { min-height: 100svh }                          /* fits */
.stage > .dock { bottom: calc(24px + var(--bar-gap)) }
```
⚠ A single `dvh` in this chain reintroduces the shift the constant exists to
remove. Desktop resolves the gap to zero, so one rule ships everywhere.

Script needs the same role split and has no units to say it with. `innerHeight`
is the *large* viewport — it keeps counting the strip behind a collapsed address
bar — so a scrubber placing its read-line at `scrollY + h * 0.55` puts that line
below what the reader can actually see, by the height of the browser chrome.
Read `visualViewport.height` for anything compared against what is on screen,
and subscribe to its `resize`: the collapse fires there and not always on
`window`.
```js
const vh = () => window.visualViewport?.height ?? window.innerHeight
visualViewport?.addEventListener('resize', onScroll)
```
⚠ Not for measuring the *document* — `scrollHeight - innerHeight` is still the
right scroll maximum, and mixing the two heights in one clamp loses the last
screen of travel.

An in-flow first screen wants a ceiling as well as a fit. `svh` alone hands a
tall desktop window a hero four times the height of its own content, with the
copy stranded mid-void; a px cap inside `min()` lets it fill a laptop and stop
growing after that, while the subtraction keeps fixed chrome out of the
reckoning. Caps 720–900px, and `min-height` rather than `height` so the content
can always win.
```css
.hero { min-height: min(820px, calc(100svh - var(--header))) }
```
⚠ The subtrahend is a second copy of the header's height — take it from the
same token the header is sized from, or a chrome change leaves the first screen
overflowing by exactly the drift.
