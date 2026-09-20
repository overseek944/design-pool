---
id: runtime-shade-derivation
category: color
tags: [color,tokens,theming,architecture]
axes: none
cost: 1
seen: 9
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

Store the *hue* as a bare number and a semantic family falls out of fixed
saturation/lightness pairs — `--icon: hsl(var(--h) 46% 51%)`, `--ring: hsl(var(--h)
44% 68%)` — each holding its relationship while one scalar retints all of them.
`color-mix()` cannot do this: it walks toward black or white, never around the
wheel.

Where the hover state only needs to move, not to be named, `filter:
brightness()` skips the colour arithmetic entirely — and unlike any mix it works
on a gradient, an image or a multi-layer fill, where there is no single colour
to derive from. 1.04–1.08 on a light fill, and pair it with the transform rather
than a second token. It cannot express a *disabled* step, so the ramp above
still owns the semantic states.
```css
.btn:hover { filter: brightness(1.06) }
```
⚠ `filter` promotes the element and clips any `position: fixed` descendant to
it — wrong on a control that opens a menu from inside itself.

Mixing toward black and white is the wrong pair on a page that is neither. Mix
toward the *ground* and the *highlight* the page already defines and every
derived shade stays inside its own atmosphere — a wash sits in the page's
near-black rather than greying toward it, and one seed retints a whole surface
family without a second decision. Two stops each way covers most needs:
25%/60% toward ground, 45% toward highlight.
```js
const set = { dark: mix(ground, seed, .25), muted: mix(ground, seed, .6),
              light: mix(seed, highlight, .45) }
for (const [k, v] of Object.entries(set)) root.style.setProperty(`--brand-${k}`, v)
```
⚠ Ground-mixed shades carry no contrast guarantee at all — two of these three
will fail against the ground they were mixed from. Check each before use.
