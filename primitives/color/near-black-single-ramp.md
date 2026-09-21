---
id: near-black-single-ramp
category: color
tags: [color,palette,dark,restraint]
axes: {energy: 2, density: 2, weight: 4, finish: 4}
cost: 1
seen: 13
requires: []
conflicts: []
completes: []
tension: []
---
Pure `#000` ground, off-white `#ededed` text, and ONE neutral ramp (zinc 950→100)
for everything between. No second neutral, no mid greys from a different family.
Colour appears only as emitted light — glows, gradients, shader output — never as
surface fill. Reads as instrument panel rather than dark-mode-of-a-light-site.

Range — the ground need not be pure `#000`. A near-black around `#0f1011` with a
raised shade near `#191d20` gives one usable elevation step before glow is
needed, and reads less like an OLED void on large panels.

Two raised steps hold as well as one when the ground stays at true `#000` —
around `#191919` for the card and `#333` for anything nested inside it. That is
the ceiling: a third step lands close enough to the second that the eye reads
noise, and a divider is cheaper than another fill.

Range — the ground need not be neutral. Take the accent hue down to roughly 8%
lightness and the near-black is a deep tint of it (`#23000a` under a hot
orange): every surface then reads as the same light source dimmed, and one
saturated block of the accent used once as a full fill lands far harder than it
would on grey. Keep chroma low enough that the ground still reads as black
beside white text, and hold the tint to a single hue — two tinted darks in one
page read as a colour cast, not a decision.

Inverted — one warm off-white ground and ONE ink ramp at three strengths: full
for headings, softened for prose, faint for labels. The ink must be tinted
toward the ground rather than neutral, or it reads as a sticker laid on the
paper instead of printed into it. The faint rung is where this fails: a warm
grey that looks correctly quiet against warm paper is routinely near 3:1, so it
is a rung for decoration and non-essential labels only, and anything that must
be read moves up to the softened rung.

Range — the tint need not be the accent's own hue. Ground the page in a cold
near-black and spend the accent warm: the accent stops being the room dimmed
and becomes the only light in it, one hue carrying structure and the other
attention, with neither competing on saturation. This is the case that needs
the ground lifted — at 4–6% lightness there is no room above it for a five-rung
elevation ramp that still reads as one colour. Put it at 10–14%.

Lifting the ground is not the only way to buy elevation at 4–6% lightness. Climb
a little chroma along one hue with each rung instead — panel, raised panel,
rule, bright rule, each a step further from neutral than the last — and hairline
every boundary. Lightness alone gives two distinguishable surfaces that far
down; lightness plus a chroma ladder gives four or five without the page reading
any lighter.
```css
--panel: #0f111c; --panel-2: #131627; --rule: #21243a; --rule-bright: #2e3252;
```
⚠ Every rung is still near-black, so body contrast is owed against the lightest
surface the text may sit on, not against the page ground — check the type on the
raised panel, not on the field behind it.

A light page that turns over for one band needs a second set of rungs, not the
same ones inverted. Contrast is not symmetric across the flip: the ink ramp's
quiet rung, which passes comfortably against paper, lands near 1.5–2:1 on the
dark ground and the band's supporting copy silently fails. Derive three fresh
rungs against the dark — full, softened, faint — from the same hue, and name
them as their own tokens so no component can reach for the light ones by
habit. Two tokens, not one: the band inverts both ground and ink.
```css
.band { --ground: #22302b; --fg: #dfe6e1; --fg-soft: #b7c3bb; --fg-faint: #a9bcb0 }
```
⚠ Measure the faint rung on the dark ground specifically — it is the rung that
was already marginal on paper, and the flip is where it stops being legible.
