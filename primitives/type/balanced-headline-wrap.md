---
id: balanced-headline-wrap
category: type
tags: [type,polish]
axes: none
cost: 1
seen: 82
requires: []
conflicts: []
completes: []
tension: []
---
`text-wrap: balance` on every headline so line lengths even out instead of
stranding one word. Free, one declaration, and the single highest
ratio-of-polish-to-effort property in modern CSS.
```css
h1,h2,h3 { text-wrap: balance }
p { text-wrap: pretty }
```

Not headline-only — `balance` earns its place on any short block set to read as
a shape: sub-headings, captions, card titles, 13–17px included. The cap is
mechanical, not editorial: engines abandon balancing past roughly six lines and
the property silently does nothing, so anything longer belongs to `pretty`,
which only fixes the last line but has no line limit.

Hand-set breaks are the other half of this decision and they cancel it —
`balance` cannot rebalance across a `<br>`. Where a headline is broken line by
line on purpose, keep the breaks and drop `balance`, then switch them off below
the width at which they strand single words: `h1 br { display: none }` in a
600–760px query. Authored breaks surviving to 390px are how orphans ship.

Neither `balance` nor a hand break settles a *fluid* heading, where the same
string re-wraps at every step of the clamp. Cap the measure in `ch`: the unit
resolves against the element's own font size, so a heading sized
`clamp(3rem, 8vw, 8rem)` holds the same characters per line — and therefore the
same rag — from 390px to 2560px, with nothing to switch off at a breakpoint.
10–14ch for a two- or three-word display line, 15–20ch where it carries a clause.
```css
h1 { font-size: clamp(3.25rem, 8.6vw, 8.7rem); max-width: 12ch; line-height: .91 }
```
⚠ `1ch` is the `0` advance, narrower than the average letter in a proportional
face — a 12ch cap holds nearer 15 characters. Set it by looking, not by counting.

The break can also run the other way: authored *for* narrow and absent above
it. A display line that fits one line on a desktop but must wrap on a phone
should wrap where the sentence does, not where the measure runs out — so ship
`<br class="narrow">` at `display: none` and switch it to `display: initial`
inside the small query. Same one-element mechanism as dropping a break, opposite
default, and it is the only way to control a phone rag without a second string.
```css
h1 br.narrow { display: none }
@media (width <= 600px) { h1 br.narrow { display: initial } }
```
⚠ A `<br>` is read as a line break by screen readers and copies as a newline —
fine between sentences, wrong mid-clause. Break where you would break aloud.

`text-wrap` is a shorthand over `text-wrap-mode` and `text-wrap-style`, and it
resets both. Setting `text-wrap: balance` on a title nested inside something
deliberately held at `nowrap` therefore turns wrapping back on as a side
effect, which reads as a bug in a control strip or a truncated cell. Reach for
the longhand `text-wrap-style: balance` wherever the mode is someone else's
decision — it changes the rag and leaves the wrapping alone.
```css
.cell   { text-wrap-mode: nowrap }
.cell h5 { text-wrap-style: balance }     /* not text-wrap: balance */
```
⚠ The longhands landed later than the shorthand, so an engine that balances via
`text-wrap` may ignore `text-wrap-style` — the fallback is an unbalanced rag,
never a broken layout, which is why this is safe to ship unguarded.
