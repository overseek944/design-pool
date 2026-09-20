---
id: near-black-single-ramp
category: color
tags: [color,palette,dark,restraint]
axes: {energy: 2, density: 2, weight: 4, finish: 4}
cost: 1
seen: 5
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
