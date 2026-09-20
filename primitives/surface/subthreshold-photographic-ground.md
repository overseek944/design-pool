---
id: subthreshold-photographic-ground
category: surface
tags: [surface,texture,ground,section,photography,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A section ground that should not be flat and should not be a picture either:
stack a near-opaque wash of the page colour over a photograph in one
`background-image` list. Past ~90% the image stops being content and survives
as uneven tone — grain with structure, which no gradient or tile fakes, and no
second element. Two stops a few points apart drift the wash. Wash .88–.97;
only tone survives, so 8–20KB of WebP is enough.
```css
.band { background: linear-gradient(rgb(246 244 239/.90), rgb(246 244 239/.96)),
        url(ground.webp) top/cover }
```
⚠ Nothing in the picture can carry meaning at this alpha, and a background has
no alt text. Still a download for decoration — drop it under
`prefers-reduced-data: reduce`.
