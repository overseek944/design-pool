---
id: inert-blur-sealed-preview
category: interaction
tags: [interaction,gate,blur,preview,accessibility,state]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Content that waits on a step — a sign-in, a key, a setup command — can stay on
the page as its own preview rather than a placeholder: blurred 5–9px, dimmed to
70–85%, scaled 0.99–0.998. The reader sees the shape of what they will get, and
unsealing transitions all three back over 0.5–0.8s so it reads as focus
arriving, not a swap.

```css
.gate { transition: filter .7s, opacity .7s, scale .7s }
.gate[inert] { filter: blur(7px); opacity: .78; scale: .994; user-select: none }
```
⚠ Blur is not a lock: `pointer-events: none` still lets Tab reach every
control. Use `inert`, and never ship real secrets in sealed markup.

Where nothing unseals it — an announced page not yet public — the preview is
scenery, and it can sink much further: opacity .3–.45 with the same 6–9px blur,
a slight overscale (1.01–1.02) so the blurred edge never shows the box, and a
notice card laid over it on a thin veil of the page ground. The reader still
reads the page's shape and scale; only the notice is legible.
```css
.embargo { filter: blur(7px); opacity: .38; scale: 1.015; user-select: none }
.embargo + .notice { position: absolute; inset: 0; display: grid; place-items: start center }
```
⚠ Mark the scenery `inert` *and* `aria-hidden` — hidden alone leaves its links
tabbable into an unannounced void. Under 6px blur the real copy is readable.
