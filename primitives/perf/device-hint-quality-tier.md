---
id: device-hint-quality-tier
category: perf
tags: [performance,webgl,capability,progressive-enhancement,correctness]
axes: none
cost: 2
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Resolve one integer tier at startup and let every expensive decision read it,
rather than scattering capability checks through the scene. `deviceMemory` and
`hardwareConcurrency` at or below 4 mean a low tier; below the mobile breakpoint
means the lowest. Shadows, post-processing, texture sizes and pixel ratio all
key off that one number, so the ladder can be reviewed as a table instead of
hunted for. Clamp pixel ratio per tier too — 1.5 on phones, 2 elsewhere; a 3×
panel triples fragment cost for detail nobody resolves.

```js
const weak = (navigator.deviceMemory ?? 8) <= 4 ||
             (navigator.hardwareConcurrency ?? 8) <= 4
const tier = narrow ? 0 : weak ? 1 : 2
```
⚠ Default the hints *optimistically*. Both are Chromium-only; `?? 4` puts every
Safari and Firefox reader on the low tier. Add a URL override so a tier can be
forced for review.

Input class is a separate ladder from compute class and wants its own cascade,
because a laptop with a touchscreen and a phone report the same `deviceMemory`
but need opposite hover, target-size and drag decisions. Ask the specific signal
first and fall through: `userAgentData.mobile`, then `(pointer: coarse) and
(hover: none)`, then a screen-width threshold. Guard each probe — privacy
builds throw on reading these rather than returning undefined, so one
unprotected access takes the whole startup path down.
```js
const ask = f => { try { return f() } catch { return undefined } }
const m = ask(() => navigator.userAgentData?.mobile)
        ?? ask(() => matchMedia('(pointer: coarse) and (hover: none)').matches)
        ?? ask(() => screen.width < 768) ?? false
```

A canvas has no media queries, so the same integer answers *layout* as well as
quality: resolve the tier from the drawing surface's own width, then index
per-tier literal arrays for every dimension in the scene — box sizes, gaps,
font sizes, label sets. The breakpoints live in one line and each dimension's
three values sit side by side where they can be compared, which no scattered
`width < 620 ? … : …` chain allows. Two breakpoints is usually enough; a fourth
tier stops being reviewable.
```js
const z = w < 620 ? 0 : w < 940 ? 1 : 2
const boxW = [46, 54, 62][z], pad = [12, 18, 30][z]
const labels = [['sim', 'synth'], ['simulate', 'synthesize']][Math.min(z, 1)]
```
⚠ Tier off the container, never the viewport — the same scene in a sidebar and
a full-bleed plate must resolve differently. Rebuild on resize across a bound.

Pixel ratio clamps at 1; render scale does not have to. A decorative field with
no edges to alias — particles, noise, a fog volume — can be rendered at a
*fraction* of its display size and upscaled by the compositor with no visible
loss, which cuts fragment work quadratically. Scale 0.4–0.6 on the tier that
would otherwise drop the effect, 0.2–0.3 below it. Anything with a straight
line, a glyph or a hard silhouette in it stays at 1 and takes the pixel-ratio
clamp instead.
```js
renderer.setSize(w * SCALE[tier], h * SCALE[tier], false)   // false: keep CSS size
```
⚠ Read the tier at the size the canvas is *laid out*, not the window — a scene
in a half-width panel is already paying a quarter of the full-bleed cost.
