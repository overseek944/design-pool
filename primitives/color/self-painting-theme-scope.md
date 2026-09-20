---
id: self-painting-theme-scope
category: color
tags: [color,tokens,theming,architecture,dark]
axes: none
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A theme is one class that both defines the semantic colour tokens and paints
itself from them. Components read only semantic names, never a swatch, so the
class inverts any subtree it lands on and a nested scope flips back — no
per-component dark rules, no duplicated selectors.
```css
.theme-dark { --bg:#141413; --fg:#faf9f5; --line:#faf9f51a; color-scheme:dark;
              background-color:var(--bg); color:var(--fg) }
.card { background:var(--bg); border:var(--hair) solid var(--line) }
```
⚠ `color-scheme` has to ride along or form controls, scrollbars and autofill
stay on the old ground. Any component that hardcodes a colour survives one theme
and breaks in the other, silently — audit for literals, not for themes.

Two levels of naming buy a third theme almost free: components read a role
namespace, the role namespace is a block of aliases pointing at a palette
namespace, and a variant theme redefines only the palette. `--panel:
var(--slate-panel)` becomes `var(--carbon-panel)` in one place, and a theme that
is a darker cut of an existing one costs a palette block rather than a fork of
every role. Keep the two namespaces in separate files — the moment a role
aliases another role, the indirection stops being traceable.

A single inverted band inside an otherwise light page does not need a whole
theme — redeclare only the tokens whose relationship to the ground changed
(muted text, rules, any accent that must lift off a dark field) and let the rest
cascade. Three or four declarations on the section, and every component inside
inverts untouched.

Where the ground is *drawn* rather than declared — a canvas or a video
dissolving from light to dark under the copy — the DOM flip and the render have
to share one threshold, read from the same progress value. Two independently
tuned numbers leave the text on the wrong ground for a few hundred pixels of
scroll, which reads as a bug and not a transition. Give the copy a colour
transition slightly longer than the dissolve, 250–600ms, so it trails the
ground instead of racing it.
```js
stage.dataset.sceneDark = String(progress > DARK_AT)   // the renderer's own constant
```
