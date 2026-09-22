---
id: palette-as-uniforms
category: canvas
tags: [shader,color,system]
axes: none
cost: 2
seen: 18
requires: []
conflicts: []
completes: []
tension: []
---
Pass the site's palette into the shader as named `vec3` uniforms rather than
hard-coding literals in GLSL. The WebGL layer then recolours with the design
system, and one token change propagates to the canvas.
```glsl
uniform vec3 uColorOrange; uniform vec3 uColorPurple; uniform vec3 uColorNavy;
```

Read the token rather than restating it. `getComputedStyle(document
.documentElement).getPropertyValue('--ground')` resolves whatever the cascade
currently says, with a literal only as the fallback — the shader and the
stylesheet then share one definition instead of two that agree today. Re-run the
whole read on theme change and the canvas follows a runtime toggle; subscribe to
both an explicit theme event and `prefers-color-scheme`, because a page with a
manual override has two sources for the same fact.
```js
const tok = (n, f) => new Color(gcs(root).getPropertyValue(n).trim() || f)
const sync = () => u.uPaper.value.copy(tok('--ground', '#f5f3f0'))
addEventListener('themechange', sync)
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync)
```
⚠ `getComputedStyle` is a layout read — do it on theme change, never per frame.

A theme toggled by a *class* on the root emits neither event nor media change,
so both subscriptions above miss it and the canvas keeps the old palette until
something else forces a read. Observe the attribute itself — one
`MutationObserver` on `documentElement` filtered to `class` — and the sync runs
for the toggle, for a restored preference and for a server-rendered theme
alike, with no contract between the canvas and whatever owns the switch.
```js
new MutationObserver(ms => ms.some(m => m.attributeName === 'class') && sync())
  .observe(document.documentElement, { attributes: true })
```
⚠ Fires on every unrelated root class write, and `sync` reads computed style —
filter on the attribute name, and disconnect in teardown.

Where the re-render on theme change is expensive — a resampled image field, not
a uniform write — the canvas is stale or blank for as long as it takes, and
clearing it first turns the swap into a flash. Stack two canvases, draw the new
palette into the hidden one, and flip an attribute the stylesheet cross-fades
on. The old state holds until the new one is complete and the swap costs one
opacity transition.
```css
.stage canvas { opacity: 0; transition: opacity var(--swap) }
.stage[data-layer="0"] canvas:first-of-type,
.stage[data-layer="1"] canvas:last-of-type { opacity: 1 }
```
⚠ Draw into the *inactive* index and flip only once the draw returns — flipping
first reintroduces the blank frame this exists to prevent. Two backing stores at
device resolution is double the memory: for a figure, not a full-bleed field.

The read can also be too *early*. Where the tokens themselves carry a
transition, computed style in the same task as the attribute write still
resolves the outgoing values, and one frame later resolves an intermediate — so
a single sync on the toggle leaves the canvas holding a colour belonging to
neither theme. Read again on the next frame and once more after the swap's own
duration, taking the last answer. Two extra layout reads per toggle is nothing;
per frame it would be the cost this exists to avoid.
```js
sync(); requestAnimationFrame(sync); const id = setTimeout(sync, SWAP + 20)
```
⚠ Cancel the pending timeout on teardown and on a second toggle, or a fast
double-switch lands the stale read after the new one and the canvas keeps the
theme the reader just left.

The palette need not reach the effect at all. Where a chain of passes only ever
produces a tonal field, let them run in whatever colours are convenient and add
one terminal pass that reads luminance and mixes between exactly two token
uniforms. No upstream stage learns the brand, an effect lifted from elsewhere
obeys it unedited, and retinting the whole field is two `uniform3f` calls. Bias
the window low and narrow — only the brightest few percent should reach the
accent — or the ground colour stops governing. Window 0.05–0.15 to 0.25–0.4.
```glsl
float l = dot(texture(tInput, vUv).rgb, vec3(0.299, 0.587, 0.114));
fragColor = vec4(mix(uGround, uAccent, smoothstep(0.08, 0.3, l)), 1.0);
```
⚠ Two tones is the whole output — anything the field must keep separable needs
a third stop or its own layer. Neither token is free to be picked for the
shader: both are the page's, so the field inherits their contrast ratio.

A 2D context has no uniforms to hold the palette between frames: every colour is
re-assigned on the draw, so the naive port puts `getComputedStyle` inside the
loop and pays a style resolution per stroke. Resolve the palette to an array
once, behind the same invalidation the toggle already fires, and let the draw
read that array — the loop then costs nothing and the swap is still immediate.
```js
let pal = null
const palette = () => pal ??= read(TOKENS)          // cleared by the theme observer
```
⚠ Clear the memo *before* the first post-toggle draw, not after it.

A canvas drawn once and left — the reduced-motion branch, a static figure —
has no loop to pick the new palette up, so it keeps the theme the reader left.
Publish the draw as a redraw hook and have whatever owns the toggle call it; the
animated branch gets the same call and simply redraws a frame early.
```js
window.redrawFigure = () => draw(performance.now())
```
⚠ A hook on `window` is a global contract — a second figure on the page needs a
registry, not a second name.
