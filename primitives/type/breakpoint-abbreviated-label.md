---
id: breakpoint-abbreviated-label
category: type
tags: [type,accessibility,responsive,navigation,correctness]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
A nav item or a column head that shortens at a narrow width — `Research` to
`RES`, `Documentation` to `Docs` — usually ships both strings and toggles
`display` on a media query. That rewrites the accessible name as well, so a
reader on a phone is announced the abbreviation. Pin the name on the control
with `aria-label` and mark the short span `aria-hidden`; `display: none` on the
visible spans is then correct rather than lossy, because the name no longer
comes from them. Gate 560–760px.

```html
<a href="/research" aria-label="Research">
  <span class="long">Research</span><span class="short" aria-hidden>RES</span></a>
```
```css
.short { display: none }
@media (width <= 40rem) { .long { display: none } .short { display: inline } }
```
⚠ `aria-label` overrides content for assistive tech but not for in-page find or
a runtime translation layer — keep the full word in the DOM, never only the
abbreviation. Where the swap happens inside a row that must not re-flow, reserve
the wider variant's width on the slot.

Neither string exists when the label is derived at runtime from content the
page does not author — a section map built from the rendered DOM, a filter list
from an API. Truncating the text node there is the lossy version of the same
mistake: find-in-page and translation layers see only the stub. Let CSS do it —
`max-width` with `text-overflow: ellipsis` — so the full string stays in the DOM
and no accessible name has to be restated. Where a *semantic* cut beats a
measured one, prefer the label's own punctuation: everything before the first
colon, falling back to the last word boundary inside the budget.
```js
const short = t => { const c = t.indexOf(':')
  if (c > 0 && c <= MAX) return t.slice(0, c)                      // MAX 28–44
  return t.length <= MAX ? t : t.slice(0, t.lastIndexOf(' ', MAX)) + '…' }
```
```css
.map a { display: block; max-width: 14rem; overflow: hidden;
         text-overflow: ellipsis; white-space: nowrap }
```
⚠ The semantic cut and the CSS clip must not both fire on the same label or it
is shortened twice. Pick one per list: punctuation where the source has a
reliable convention, the clip where it does not.

Past the width where even an abbreviation fits, the terminal case is no text at
all: a legend chip or a diagram node becomes its dot or glyph alone. There is no
second string to swap to, so the rule above inverts — move the *only* label into
a 1px clip rather than `display: none`, and no `aria-label` is needed, because
the word is still in the DOM carrying the name, the find and the translation.
Let the mark take what the words vacated: gap to 0, padding equal on all sides,
glyph up 20–40%.
```css
@media (width <= 26rem) {
  .chip { gap: 0; padding: 11px }
  .chip .long { position: absolute; inline-size: 1px; block-size: 1px;
                overflow: hidden; clip-path: inset(50%); white-space: nowrap }
}
```
⚠ That padding around a 10px glyph is a 32px square — under the 44px minimum
target, and the width forcing the shed is the width that can least afford a
missed tap. Pad to the target, not to the mark.
