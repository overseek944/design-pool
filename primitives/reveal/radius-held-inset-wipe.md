---
id: radius-held-inset-wipe
category: reveal
tags: [reveal,clip-path,wipe,panel,motion]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A panel widening under `clip-path: inset()` squares its corners off the moment
the clip is tighter than the box, because the clip shape carries no radius of
its own. Put `round` at the element's radius in *both* keyframes and the visible
region stays a rounded rectangle throughout — it reads as one object growing
rather than a mask sliding off one. Start 20–35% inset; under 15% the growth
stops registering. Animate a leading icon's `left` on the same clock so it rides
the opening edge instead of popping in behind it.
```css
@keyframes grow { from { clip-path: inset(0 28% round 8px) } to { clip-path: inset(0 round 8px) } }
@keyframes lead { from { left: calc(28% + 16px) } }
```
⚠ Omit `round` at one end and the radius animates to zero instead of holding.
`clip-path` interpolates only between the same shape function.

Stepped rather than smooth, the same inset is a typewriter: run
`inset(0 100% 0 0)` to `inset(0)` over `steps(n)` with n at the character count.
No monospace face, no `ch` width to measure, and no per-glyph markup — the clip
travels the laid-out text. 12–25 characters per second.
```css
.type { animation: wipe 1.2s steps(26) both }
@keyframes wipe { from { clip-path: inset(0 100% 0 0) } to { clip-path: inset(0) } }
```
⚠ Single line only: a right-side inset clips the whole box, so a wrapped string
reveals every line in parallel. n is per string — one shared value makes short
labels stutter and long ones slide.

`n` per string is a setup read, not an authoring chore: take the run's own
`textContent.length`, clamp it at 35–45, and set `steps(n)` and the duration
together as inline styles. Duration as a constant per character with a ceiling —
40–50ms each, capped near 0.9s — keeps the cadence identical across a two-word
label and a full line while stopping the long one from outstaying its reveal.
```js
const n = Math.min(el.textContent.trim().length, 40)
el.style.transitionDuration = `${Math.min(n * 46, 900)}ms`
el.style.transitionTimingFunction = `steps(${n}, end)`
```
⚠ Give the three edges the clip is *not* travelling a negative inset of a few
percent. At exactly `0` the clip shaves antialiasing off ascenders and
descenders, and the line looks a half-pixel short of the one beside it.

A clip that sits flush on the perpendicular axis shaves whatever the element
paints past its own box — a stroke's cap, a glow, antialiasing on a hairline.
Give the clip negative insets on that axis at both ends and it bleeds instead
of cropping, so a 1px rule draws on cleanly rather than arriving with a trimmed
edge. 2–6px of bleed covers a hairline and its shadow.
```css
@keyframes draw { from { clip-path: inset(-4px 100% -4px 0) }
                  to   { clip-path: inset(-4px 0) } }
```
⚠ Bleed only on the axis the wipe does not travel. Negative inset on the
travelling axis makes the closed state already show a sliver of the element.
