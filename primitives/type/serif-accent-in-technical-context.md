---
id: serif-accent-in-technical-context
category: type
tags: [type,contrast,editorial,restraint]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 13
requires: []
conflicts: []
completes: []
tension: []
---
One high-contrast serif, used sparingly against a geometric sans + mono base.
Applied to a single word or phrase per section it reads as editorial confidence;
applied broadly it collapses the technical register entirely. Strictly an accent.

The accent needs its own tracking. A display sans running at −.05 to −.07em
hands that letter-spacing straight to any `<em>` inside it, and a serif — wider
sidebearings, real terminals — collides at those values. Set the accent back to
−.02 to −.05em so it sits marginally looser than the sans it interrupts. Italic
rather than roman when the accent is a phrase inside a headline: it separates
the two voices without reaching for a second weight, and the slope reads as a
change of register rather than an emphasis.

Inverted dose — serif takes every heading, mono holds all chrome, sans drops to
body copy alone. The register flips to *editorial with technical apparatus*.
Needs a true display serif; a text serif at 48px+ reads as a document, not a
voice.

Between the accent phrase and the full inversion sits the lede. One serif
paragraph under a sans headline, 18–22px with leading near 1.6, reads as a
subtitle in a second voice while every other paragraph on the page stays sans. A
whole sentence establishes the register where a single word only decorates it,
and the dose stays countable: one element per section.

Mono is the other accent face, and it needs a *size* correction where the serif
needed a tracking one. A monospace cut set at the sans's font-size reads a step
too large and a shade too heavy, because its glyphs are drawn to a fixed advance
and its stems are even. Set the run at `0.7–0.85em` of the headline and drop it
one weight; the cap-heights then agree and the switch reads as a change of
voice, not a change of size.
```css
h1 .mono { font-family: var(--font-mono); font-size: .78em; font-weight: 300 }
```

Past the lede sits the full dose in the other direction: sans keeps every
headline, label and control, and the serif takes *all* running prose. The page
reads as a technical voice quoting a written one, which suits an argument long
enough to need paragraphs. It only holds if the sans keeps every non-prose
string — one serif byline or metadata line and the two voices stop mapping to
roles and start looking arbitrary. A text serif, not a display cut, at 16–18px.

The narrowest dose of all: hold the serif for *annotation only* — the labels
inside a diagram, a figure caption, an axis year — and let every word of chrome
and body stay sans. Italic at 9–11px it reads as a draughtsman's hand written
onto the drawing rather than as interface text, which separates what the figure
says about itself from what the page says about the figure. The same stack has
to be named twice where the figure is a canvas, because `fillText` resolves
against the canvas font string, not inherited CSS.
```js
ctx.font = `italic 10px Georgia, "Times New Roman", serif`
```
⚠ Under about 9px the italic loses its terminals and reads as noise; below that
set the annotation upright, or in the sans.
