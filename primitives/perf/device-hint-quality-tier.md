---
id: device-hint-quality-tier
category: perf
tags: [performance,webgl,capability,progressive-enhancement,correctness]
axes: none
cost: 2
seen: 20
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

`hardwareConcurrency` does not belong in the same disjunction as `deviceMemory`.
Plenty of ordinary desktops and most of the last decade of laptops report four
cores and render the full scene without complaint, so an `<= 4` test tiers them
down for nothing while catching almost no device that needed it. Memory tracks
the constraint that actually bites, and input class is its own ladder. Leave
core count out unless work is genuinely being sharded across workers.
⚠ Where it is used at all the threshold is not 4 — a machine reporting 2 is a
real signal, 4 is noise.

Render scale is not capped at 1 in the other direction either. The case that
variant excludes — hairlines, glyphs, hard silhouettes, anything procedural
with an edge — is the one that wants scale *above* 1: render into a target
1.15–1.5× the display box and let the compositor downsample. It is cheaper
than MSAA on a fullscreen pass, works where the fragment stage cannot ask for
a derivative, and stacks with the pixel-ratio clamp rather than fighting it.
```js
rt.setSize(Math.ceil(w * SS), Math.ceil(h * SS))   // SS 1.15–1.5
```
⚠ Fragment cost is the square of the factor, so 1.5 is 2.25× the shading —
budget it on the top tier only, and fall to 1.0 rather than below it.

Hints predict; the frame clock knows. Time the render itself, push each duration
into a rolling window of 20–30 frames, and demote the tier when the window's
95th percentile crosses the budget — or when achieved rate falls under ~16fps,
which catches a machine that is fast per frame and starved of them. A high
percentile, never the mean: one 40ms frame in thirty is the stutter a reader
sees and the mean hides it. Demote one way only and clear the window at each
step, or the tier oscillates across the threshold all session.
```js
const p95 = [...times].sort((a,b) => a-b)[Math.ceil(times.length * .95) - 1]
if (tier === 0 && (p95 > 12 || fps < 16)) { tier = 1; times.length = 0 }  // 8–16ms
```
⚠ Discard the window after anything that legitimately stalls a frame — a resize,
a tab returning to the foreground, a context restore — or the next gate demotes
on a cost that was never the renderer's.

Demote-only is a safe default and a permanent tax: one slow stretch during page
load — a font swap, a hydration burst, a competing tab — pins the reader on the
low tier for the session. Let it climb, but make the two directions
deliberately asymmetric. Start one rung below the cap so load never pays for
the top tier, drop after a handful of consecutive over-budget frames, and
promote only after hundreds of clean ones. The ladder then settles in seconds
and cannot oscillate, because the cost of a wrong promotion is bounded by how
long the next demotion takes.
```js
ms = ms ? ms * .9 + cost * .1 : cost                      // EWMA, 0.85–0.95
if (ms > HIGH && ++slow >= 6)    { step(-1); slow = 0; ms = 0 }   // ~6 frames
if (ms < LOW  && ++fast >= 180)  { step(+1); fast = 0; ms = 0 }   // ~3s
```
⚠ The two thresholds must not touch — leave a dead band of at least 2× between
`LOW` and `HIGH`, or a tier whose own cost sits between them promotes and
demotes forever. Reset the average on every step; it was measured at a
resolution that no longer exists.

Network class is a third ladder and does not belong in the same expression as
the others. Resolve viewport, memory and connection separately, then take the
*floor*: a fast machine on a throttled link must not keep the tier its memory
earned, and a phone on fibre must not keep the tier its bandwidth earned.
`effectiveType` alone over-promotes — pair it with `downlink`, since a nominal
4g under 4–6Mbit/s is a medium rung, not the top one.
```js
const c = navigator.connection
const net = c?.effectiveType === '4g' && (c.downlink ?? 0) > 5 ? 2
          : /4g|3g/.test(c?.effectiveType ?? '') ? 1 : 2      // absent → optimistic
tier = Math.min(viewTier, memTier, net)
```
⚠ Absent must resolve to the *top* rung, not zero — the API is Chromium-only, so
a falsy default tiers down every other engine. Read it once: re-reading
mid-session downgrades assets already fetched at the higher tier.

The ladder need not be resolved in script at all. Author every expensive
constant as a *unitless* root custom property — field resolution, pixel-ratio
cap, bloom amount, a per-frame budget in ms — and let a media query restate only
the ones a weaker class of device should lower. The renderer reads them once
with a literal fallback, so input class, width and a motion preference compose
in the cascade rather than inside one boolean expression, and the ladder sits
beside the breakpoints where it can be retuned without opening the renderer.
```css
:root { --dpr-max: 2; --field-res: 256; --bloom: .18; --frame-budget-ms: 8 }
@media (pointer: coarse) { :root { --dpr-max: 1.25; --field-res: 128; --bloom: 0 } }
```
```js
const n = (k, f) => { const v = parseFloat(cs.getPropertyValue(k))
                      return Number.isFinite(v) ? v : f }
```
⚠ Unitless is what makes the read safe — a length token hands back its literal
`clamp()` text. Nothing re-reads on its own either: subscribe to the same
queries with `matchMedia`, or the tier stays whatever the first frame resolved.

Variant — a render-on-demand scene has idle gaps that read as slow frames.
Sample frame deltas only while the scene is being driven (input within the last
~250ms), discard deltas over 250ms, and demote along an ordered list of the
cheapest-to-lose effects first — antialias pass, bloom, pixel ratio 1.5, then 1.
Persist the reached rung in `sessionStorage` so a reload starts there instead of
re-paying the ramp.
```js
if (now - lastInput > 250) return            // idle: not a measurement
if (++n >= 30 && ema > 24) demote()          // ema of deltas, 20–30ms
```

Resolve the tier in an inline `<head>` script and write it to the root
(`data-art="raster"`) so CSS picks a still image or the live vector art before
first paint — no swap flash. Add `connection.saveData` and a `2g`
`effectiveType` to the weak test, and let a persisted runtime verdict override
the hints on the next visit.
