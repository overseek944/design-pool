---
id: ground-matched-chrome
category: surface
tags: [chrome,nav,scroll,contrast,theme,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Floating chrome crosses grounds it does not own. Rather than hunting one plate
that survives every section, give the bar two complete treatments — fill,
hairline, ink, focus ring — and let it adopt the one belonging to whatever is
under it. Sections declare their own tone; an observer whose root margin
collapses the viewport to the bar's band reports which is beneath. Cross-fade
140–260ms so the swap reads as passing under a seam.

```css
.bar[data-ground=dark]  { color: #f4f6ff; background: #080b126b; --ring: #4d9bff }
.bar[data-ground=light] { color: #1c1c1c; background: #fcfcfbdb; --ring: #06f }
```
⚠ Each treatment owes the full ratio on its own ground, focus ring included, or
keyboard focus vanishes across half the page. A section shorter than the bar is
never reported — fall back to the last tone, never to none.

An observer cannot report a section shorter than the bar, so measure instead of
subscribe. Read the bar's *live* bottom edge from its own rect — it moves when a
banner above is dismissed or the bar contracts — and test each opted-in section
for overlap with the band above it. Sections declare themselves with an
attribute rather than the bar knowing their selectors, so a new dark section is
correct without touching the chrome.
```js
const b = bar.getBoundingClientRect().bottom
const dark = marked.some(n => { const r = n.getBoundingClientRect()
                                return r.top < b && r.bottom > 0 })
```
⚠ This is a layout read per marked section per scroll frame. Cache the node list
and re-query only on route change, and keep the set under 10–20.

Decoration that crosses the same grounds needs none of this. A full-height
overlay of rules or marks, drawn once in white at 10–20% alpha under
`mix-blend-mode: difference`, inverts itself against whatever passes beneath —
dark on the light sections, light on the dark band — with no observer, no tone
attribute and no second treatment to keep in sync. Wrap it in `isolation:
isolate` so it stops at the page, and keep it `pointer-events: none`.
```css
.rules { position: absolute; inset: 0; pointer-events: none;
         mix-blend-mode: difference }
```
⚠ Only for decoration. The resulting contrast is a function of the ground and
cannot be stated, so nothing carrying text, an icon a reader must identify or a
focus ring may use it — those still owe a ratio on each ground separately. Mid
greys difference toward mid grey and the layer disappears.
