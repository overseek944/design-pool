---
id: palette-as-uniforms
category: canvas
tags: [shader,color,system]
axes: none
cost: 2
seen: 8
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
