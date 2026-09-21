---
id: opaque-navigation-cover
category: motion-system
tags: [motion,navigation,transition,overlay,accessibility,correctness]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch, backstopped-transition-handoff]
tension: []
---
Where View Transitions are unavailable or too coarse, cross a scripted route
change behind an opaque plate in the page's own ground colour: fade it up over
the outgoing view, swap underneath, fade it back down. The plate is not
decoration, it is the load window — start fetching the destination on the same
event that starts the fade, and an unstyled half-rendered arrival becomes a
deliberate wipe. Fade 180–260ms each way; much longer and the cover becomes the
wait it was hiding.

```css
.cover { position: fixed; inset: 0; z-index: 100; background: var(--bg);
  opacity: 0; pointer-events: none; transition: opacity .22s cubic-bezier(.4,0,.2,1) }
.cover[data-state=covering], .cover[data-state=navigating] { opacity: 1; pointer-events: auto }
@media (prefers-reduced-motion: reduce) { .cover { display: none } }
```
⚠ Covered content is still tabbable and still read aloud: mark it `inert` for
the whole crossing, and when the new view lands move focus to its `main` or
`h1` with `tabindex="-1"` and `preventScroll`, or the keyboard stays on the page
that left. Bail out of the interception on cross-origin hrefs, on the current
path, and on any modifier key.
