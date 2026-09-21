---
id: runtime-shade-derivation
category: color
tags: [color,tokens,theming,architecture]
axes: none
cost: 1
seen: 12
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

Relative colour syntax does what no mix can: decompose a colour into its own
channels and re-author only the ones you want. `oklch(from <c> l c h / a)`
exposes `l`, `c`, `h` and `alpha` as numbers inside the function, so a highlight
can be *the same hue, lighter* rather than a step toward white — and the seed
can be `currentColor`, which no token has to name. A component then tints itself
from whatever ink it inherits, in every context, with one declaration.
```css
--hi: oklch(from currentColor max(.82, calc(l + .34)) c h / calc(alpha * .9));
--wash: oklch(from currentColor l calc(c * .4) h / calc(alpha * .12));
```
⚠ Unsupported engines drop the whole declaration, so the property must already
hold a usable value — declare the fallback first, never rely on the cascade
below it. Clamp derived lightness with `min()`/`max()`: `l + .4` on an already
pale ink silently exceeds 1 and flattens to white.

The *direction* of a derived step is the part that has to be themed, not the
colour. Hold the lightness delta as a signed token — negative on a light theme,
positive on a dark one — and one derivation rule gives every control a border
darker than its own face in light mode and lighter in dark, with no second
declaration and no per-theme colour table. It generalises: any component that
derives a neighbour shade reads the same token.
```css
:root { --step: -8% }            /* dark theme: +9% */
.btn { --edge: hsl(var(--fill));  /* fallback first */
       --edge: hsl(from hsl(var(--fill)) h s calc(l + var(--step)) / alpha) }
```
⚠ Near either end of the lightness range the step runs out of room and clamps,
so the border vanishes on a near-white or near-black fill — the two faces most
likely to need one.
