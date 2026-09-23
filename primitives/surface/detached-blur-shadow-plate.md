---
id: detached-blur-shadow-plate
category: surface
tags: [surface,depth,shadow,blur,mock,hero]
axes: {energy: 1, density: 2, weight: 4, finish: 4}
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: [paired-hard-shadow-sheet]
---
Past roughly 40px of blur `box-shadow` stops reading as shadow, and it can never
be moved, scaled or rounded apart from the thing casting it. A sibling plate
can: a flat fill, a large `filter: blur()`, its own radius, pushed down and
scaled in. Two of them — one tight for contact, one wide and faint for ambient —
give a large object real weight under a hero. Tint the fill toward the scene's
hue rather than black; a blue-grey plate under a panel on a cool ground reads as
light, black reads as dirt. Blur 18–72px, scale .90–.96, translateY 8–20%.

```css
.wrap  { position: relative; isolation: isolate }
.plate { position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: #4a649647; border-radius: 44px;
  filter: blur(44px); transform: translateY(20%) scale(.9) }
.card  { position: relative; z-index: 1 }
```
⚠ Each plate is a full-size compositor layer that repaints on resize — keep it
off anything animated and transform the wrapper instead.

Inside a clipping parent the plate must *overhang* the clip, not meet it. A
blur samples transparency beyond its own box, so a plate flush with a card's
`overflow: hidden` edge thins and darkens along all four sides — the tell is a
wash that looks vignetted inward. Inflate the insets past the clip by at least
the blur radius and let the card's radius do the cutting; the fill then reads
as light trapped in the card rather than a shape inside it.
```css
.card  { overflow: hidden; border-radius: 12px; isolation: isolate }
.plate { position: absolute; inset: -20px -58px -26px -45px; filter: blur(100px) }
```

Below the plate's cost, one `box-shadow` gets most of the way under a framed
screenshot: large offset and blur, and a negative spread of 0.55–0.65× the blur.
The shadow then shows only under the lower edge instead of haloing all four
sides. Push the spread to 0.8–0.88× the blur and the shadow thins to a
soft ledge under the bottom edge only — the whole elevation scale can be built
that way, tiers differing by offset and blur rather than by alpha. Tint it with the ground's hue at 25–45% alpha.
```css
.shot { box-shadow: 0 1px #3c281e05, 0 34px 64px -38px #3c281e52 }
```
⚠ Too much negative spread and the shadow vanishes entirely at small card
heights. Check it on the shortest card, not the hero.
