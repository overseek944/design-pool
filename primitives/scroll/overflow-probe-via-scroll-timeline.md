---
id: overflow-probe-via-scroll-timeline
category: scroll
tags: [scroll,overflow,progressive-enhancement,correctness]
axes: none
cost: 2
seen: 1
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
