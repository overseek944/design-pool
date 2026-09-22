---
id: native-rounded-face-stack
category: type
tags: [type, font, performance, system-font]
axes: {energy: 2, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A rounded display face softens an interface without shipping a byte: lead the
stack with the `ui-rounded` generic and it resolves to the platform's own
rounded variant where one exists, falling through to the neutral system face
elsewhere. No font request, no swap, no layout shift. Rounding reads only at
weight — use 600–800 for headings and tighten display tracking by
−0.02 to −0.05em.

```css
:root { --font-ui: ui-rounded, system-ui, -apple-system, "Segoe UI",
  Roboto, sans-serif }
h1 { font: 750 clamp(2.5rem, 6vw, 4.5rem)/1 var(--font-ui); letter-spacing: -.04em }
```
⚠ Most readers outside one platform family get the fallback, not the rounded
face. Design against the fallback first; the rounding is a bonus, never the
identity.
