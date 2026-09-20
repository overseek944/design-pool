---
id: runtime-shade-derivation
category: color
tags: [color,tokens,theming,architecture]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Derive hover, active and disabled shades from a colour you will not know until
runtime — a per-tenant brand, a supplied logo, a user pick — with `color-mix()`
rather than an authored ramp. One token in, a whole state set out, and the
relationships hold whatever arrives. Mix toward black or white by 8–25% for
adjacent steps; beyond that, hue shift breaks the family.

```css
.mark { --shade: color-mix(in oklab, var(--brand) 85%, #000);
        --wash:  color-mix(in oklab, var(--brand) 12%, transparent) }
```
⚠ `srgb` mixing darkens unevenly across hues — `oklab` holds perceived lightness
far better. Derivation cannot guarantee a ratio: a mid-tone input still needs a
checked, non-derived text colour on top of it.

Where the colour arrives as a JS string and tints are inline, the same family
comes from appending hex-alpha bytes — `${c}12` a wash, `${c}45` a border.
Only on 6-digit hex: a named colour, `hsl()` or a shorthand silently yields an
invalid value and paints untinted, so normalise at the boundary.
