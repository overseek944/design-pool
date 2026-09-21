---
id: self-painting-theme-scope
category: color
tags: [color,tokens,theming,architecture,dark]
axes: none
cost: 2
seen: 19
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

`color-scheme` is not always enough for autofill — Chromium still forces its own
field background in several states, and no `background-color` beats it. The only
declaration that does is a huge inset shadow repainting the box, the text colour
restored through `-webkit-text-fill-color`, and a transition long enough that
the UA's own fade never arrives. Ugly, and it is the whole fix.
```css
input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--fg); -webkit-box-shadow: 0 0 0 1000px var(--input-bg) inset;
  transition: background-color 5000s ease-in-out 0s }
```
⚠ The shadow paints over any inset bevel or focus ring on the same element, so a
focused autofilled field loses its state. Carry that state on an outline.

A scope whose ground is a *gradient* cannot pick its tokens against one
backdrop value. Every token in the block — text, muted text, rule, focus ring —
has to clear contrast at the worst point along the ramp, not the average, which
in practice means one near-black or near-white foreground for the whole band
rather than a tinted one. Scope the ring too: a global accent ring chosen
against the page ground disappears on a saturated panel.
```css
.tone-warm { --fg: #120a0f; --muted: #4a2838; --line: var(--fg); --ring: var(--fg);
  background-image: linear-gradient(112deg, var(--a), var(--mid) 48%, var(--b)) }
```

Below the full role/palette split sits a scope small enough to write inline on
the element that owns a passage — three or four names, no class, no stylesheet
entry. Ship only the opaque inks and derive every tint, border and wash at the
use site with `color-mix` against `transparent`: one token then yields a whole
alpha ramp, and a section that recolours mid-scroll needs one value changed
rather than a parallel set kept in step.
```html
<section style="--ink:#343434; --card:#fff">
```
```css
.hair { border-color: color-mix(in srgb, var(--ink) 15%, transparent) }
```
⚠ Derived alphas are not contrast-checked by anything — a tint that reads on
the light ground can vanish on the dark one, because the mix follows the ink and
the ground does not. Verify the two extremes, not the token.

Declared in CSS, `color-scheme` cannot reach the first paint — it arrives with
the stylesheet, and a dark page opens on the UA's white canvas until then. The
document-level form is a meta tag, applied as the head is parsed and without
waiting on any stylesheet to download, so the canvas, the scrollbar and the
native controls are dark from the first frame and stay dark if the CSS fails
outright. Pair it with `theme-color` so the mobile browser's own chrome matches
the page instead of framing it in white.
```html
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#060708">
```
⚠ It is a statement about the *document*, so it cannot follow a subtree theme
class or a user toggle. Ship the meta for the default the page loads in and keep
the class form for everything that changes after load.

A scope meaning *lighter than whatever it sits in* is not one block. Under a
light root it declares a light band; under a dark root the same class has to
mean something else entirely, so it needs a second body keyed on the root — and
both belong in `:where()`, so a scope that exists only to set relationships
never outranks a component's own override. One class, two bodies, and the
section keeps its intended relationship to the page across a theme toggle
instead of inverting with it.
```css
.band                           { --fg:#15201a; --surface:#fff; --line:#12281c24 }
:where(:root:not(.light)) .band { --fg:#e9ede9; --surface:#1a1f1c; --line:#ffffff1f }
```
⚠ Two bodies is two contrast audits, and the accent is what breaks: a token
clearing 4.5:1 against the band's light body rarely clears it against the dark
one at the same value.
