---
id: progress-keyed-copy-retreat
category: scroll
tags: [scroll,overlay,reveal,choreography,pin]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [hysteretic-lock-zone]
tension: []
---
Copy framing a pinned stage has done its work by the time the stage starts
moving, and holding it for the whole pin means the payload is watched from
behind a headline. Key its departure to the stage's own progress rather than to
a scroll distance: publish a boolean past 12–20% and let CSS fade it and lift it
8–24px out. Derived, not latched, so it comes back on the way up for free and
the threshold survives any runway length.

```css
.copy                     { transition: opacity .24s, transform .24s }
[data-copy-out=true] .copy { opacity: 0; transform: translateY(-18px) }
```
```js
el.dataset.copyOut = progress > .16
```
⚠ Fade it, never `display: none` — the departing block is often the stage's only
heading, and the section is named by it.
