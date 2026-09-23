---
id: subthreshold-photographic-ground
category: surface
tags: [surface,texture,ground,section,photography,cheap]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 4
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

Filter the photograph instead of washing over it and the ground survives a theme
flip. In its own `::before` layer, `saturate()` takes the source down to a hint
of its palette, a half-pixel `blur()` kills the detail that would read as
content, and `opacity` sets how far under threshold it sits — so switching theme
changes two numbers rather than a baked gradient's stops. Saturate .3–.5,
brightness 1.0–1.15 on light and .5–.55 on dark, opacity .3–.5.
```css
.panel::before { content:""; position:absolute; inset:0; z-index:0;
  background: url(ground.webp) 50%/cover; opacity:.42;
  filter: saturate(.5) contrast(.9) brightness(1.14) blur(.5px) }
.dark .panel::before { opacity:.34; filter: saturate(.45) contrast(.9) brightness(.55) blur(.5px) }
```
⚠ The blur reaches for pixels outside the box and reveals the panel's ground at
the edges — scale the layer slightly, or crop it with `overflow: hidden` and
`isolation: isolate` on the panel.

Screening the source to one bit before it ships is the third route, and the only
one that cannot muddy type. A dithered plate has no midtones — it is dots on
paper — so dropping it to .10–.16 alpha leaves structure with no tonal mass
under the text, where a washed continuous-tone photograph still carries a soft
dark field that eats a point of contrast wherever it lands. Hold the subject's
silhouette, not its detail; 1-bit PNG, `image-rendering: pixelated`, and a
radial mask so the plate has no edge of its own.
```css
.ground { background: url(dither.png) no-repeat 44% 52%/cover; opacity: .145;
  image-rendering: pixelated;
  mask-image: radial-gradient(100% 62% at 86% 50%, #000, transparent 85%) }
```
⚠ Dot pitch is fixed at authoring, so the plate coarsens as the section grows —
re-screen per breakpoint rather than scaling one file, or the dots go from
texture to pattern. Under a responsive-image pipeline it is smeared to grey
before the page ever sees it.
