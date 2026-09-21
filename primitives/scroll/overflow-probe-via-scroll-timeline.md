---
id: overflow-probe-via-scroll-timeline
category: scroll
tags: [scroll,overflow,progressive-enhancement,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: [conditional-token-space-toggle]
tension: []
---
A scroll-driven animation only advances if its scroll port can actually scroll,
so an empty keyframe attached to `scroll(inline self)` becomes a pure-CSS "am I
overflowing?" test. No ResizeObserver, no layout read, and it re-evaluates free
on resize, font swap and content change. Show edge fades or scroll buttons
only when content genuinely spills.

```css
@keyframes probe { from, to { --spills: ; } }
.rail { overflow: auto; animation: probe linear; animation-timeline: scroll(inline self);
        --fade-on: var(--spills) 1; --fade-off: 0 }
.rail .edge { opacity: var(--fade-on, var(--fade-off)) }
```
⚠ Gate on `@supports (animation-timeline: scroll())`. Unsupported engines never
run the keyframe, so the fallback must be the *non*-overflowing state —
affordances stay hidden rather than stuck on.

The same timeline gives a *continuous per-end* readout, not only a boolean.
Register two `<number>` properties and animate one 0→1 and the other 1→0 across
`scroll(self)`, then multiply each into its own end of the mask stop list: the
lead fade grows in as the rail leaves its start and the trail fade retracts as
it reaches the end, so one declaration replaces a scroll listener, a resize
observer and two threshold classes. Fade 12–24px.
```css
@property --lead { syntax: "<number>"; inherits: false; initial-value: 0 }
.rail { animation: lead linear both, tail linear both;
  animation-timeline: scroll(self x), scroll(self x);
  mask-image: linear-gradient(90deg, #0000, #000 calc(var(--lead) * var(--fade)),
    #000 calc(100% - var(--tail) * var(--fade)), #0000) }
```
⚠ An inactive timeline falls back to the registered initial values, so both must
be `0` — set them to `1` for the scrolling case and a rail that fits, or an
engine without support, is permanently dimmed at both ends.
