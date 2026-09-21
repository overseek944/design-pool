---
id: webfont-scoped-to-inline-svg
category: type
tags: [type,svg,correctness,architecture,progressive-enhancement]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
An SVG setting live text in a brand face renders in that face only while it is
inlined in the document. Referenced through `<img>` or `background-image` it is
a separate document that cannot see the page's `@font-face` rules, and it falls
back silently — the wordmark ships in the system sans. Inline the markup, and
alias whatever family name the file references to the face actually loaded.

```css
@font-face { font-family: 'Brand-Bold';  /* the name inside the .svg */
             src: url(brand-bold.woff2) format('woff2'); font-display: swap }
```
⚠ Inlined text inherits the page cascade — pin `fill` and `letter-spacing` on
the element. Outlining the glyphs is the other correct answer and costs only
selectability; choose one deliberately.

Nothing else in the page cascade reaches it either — custom properties, the
theme class, `prefers-color-scheme` as the page resolved it — so an `<img>`-
referenced figure has to bake its own ground and ink and cannot follow a theme
swap. One file can still serve both placements: write each presentation
attribute as a `var()` with a literal fallback, so inlined it picks up the
token and referenced it falls back to the baked value. A themed figure then
needs one asset per theme, chosen by `<source media>` rather than by CSS.
```html
<svg font-family="var(--font-sans, Inter), Inter, system-ui" fill="var(--ink, #0f0e0c)">
```
⚠ Two baked assets drift the first time a token moves — generate them from the
tokens, or keep the figure inline and pay the markup.
