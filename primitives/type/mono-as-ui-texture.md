---
id: mono-as-ui-texture
category: type
tags: [type,ui,technical,register]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 48
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

The chrome tier's job is to read as machine-set, and a monospace is not the only
face that does it. A bitmap or pixel cut fills the same slot — labels, counters,
stage numbers, figures inside a metric strip — and lands a different register:
built rather than typed. It also solves the one thing mono is bad at here, since
a pixel face at 11–14px has no thick-thin to lose and stays hard where a mono
goes grey. Keep the proportional face for prose, and keep the pixel tier at
whole-pixel sizes.
```css
.label { font: 12px/14px var(--font-pixel); letter-spacing: .06em;
         text-transform: uppercase }
```
⚠ It is a display cut doing apparatus work — never let it run a sentence, and
check the digits, since many pixel faces draw `1`, `l` and `7` almost alike at
label size.

The full dose need not give up a size-driven hierarchy; it moves it to the other
face. Set body, chrome and code in the mono at one size and let the *display*
tier be the proportional face — a 40–56px heading over a 15px mono page reads as
rank because family changes with size, and the flatness underneath is exactly
what makes the heading land. This is the inverse of the split above and wants
the same discipline: two tiers, and no proportional face anywhere in the body.
⚠ The two faces need different leading and tracking to read as one system. The
display tier wants it tight — 1.0–1.1 leading, −0.02em tracking — against the
mono body's open 1.5–1.6, or the heading reads as the same texture set larger.
