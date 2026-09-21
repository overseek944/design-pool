---
id: mono-as-ui-texture
category: type
tags: [type,ui,technical,register]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 38
requires: []
conflicts: []
completes: []
tension: []
---
Run a monospace face for all *chrome* — nav, labels, captions, counters, metadata
— and a proportional face only for headlines and prose. The mono carries a
technical register without a single skeuomorphic terminal frame, and its fixed
advance makes small-caps labels align for free.

Dosage — the narrow end runs mono on the metadata tier alone (dates, categories,
counters, field labels) with nav and buttons left in the sans. The technical
register still lands and the chrome stops reading as a terminal; reach for the
full-chrome dose only when the product itself is a tool.

The label tier should not scale. Everything else on the page can be fluid, but a
mono eyebrow is a constant-size annotation — it marks a section, it is not read
as a heading — so fix it at 10–12px with an explicit px line-height rather than
a ratio. The explicit leading is what makes it align with the icons, rules and
counters beside it; a 1.5 default at 12px opens a gap those can't sit in.
Tracking 0.08–0.14em, uppercase, and one size for the whole product.
```css
.label { font: 12px/14px var(--font-mono); letter-spacing: .12em;
         text-transform: uppercase }
```

The full dose runs mono for prose as well, and it costs the two devices a type
system usually leans on. A fixed advance and one usable weight make size steps
read as noise rather than rank, so the whole page collapses into a 3–4px range —
11px apparatus, 13–15px for body and headings alike — and hierarchy moves to
case, underline and position: uppercase for labels, underlined sentence case for
headings, order and indentation for the rest. Mono also sets 10–15% wider than a
proportional face at the same size, so drop the measure to 60–68 characters.
⚠ Below 15px a mono body measurably slows reading. This dose suits pages that
are scanned rather than read at length, and every line-height wants 1.4–1.6 to
stay open.
