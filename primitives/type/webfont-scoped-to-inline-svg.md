---
id: webfont-scoped-to-inline-svg
category: type
tags: [type,svg,correctness,architecture,progressive-enhancement]
axes: none
cost: 1
seen: 1
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
