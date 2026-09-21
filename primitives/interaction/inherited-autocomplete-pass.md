---
id: inherited-autocomplete-pass
category: interaction
tags: [forms,autocomplete,accessibility,third-party,correctness]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A form you did not author — from a page builder, a CMS block, a vendor embed —
almost never ships `autocomplete` tokens, so password managers and platform
autofill have nothing to bind to and every field is typed by hand. Patch it once
at mount: walk `form.elements`, look each field up by its stable `name`, and
assign the WHATWG token. Five entries covers most contact forms. It is a
one-line map, and it is the difference between a form that fills itself and one
that does not.

```js
const MAP = { 'First Name': 'given-name', 'Last Name': 'family-name',
              Company: 'organization', Email: 'email', Country: 'country' }
for (const f of form.elements) if (MAP[f.name]) f.autocomplete = MAP[f.name]
```
⚠ Key on `name`, never on visible label text — the label is translated and the
map silently stops matching. Re-run from the same effect that tears the embed
down, because a re-rendered form arrives unpatched.

Binding the field is half of it; the platform then repaints it. Chromium's
autofill ground is a UA-level style no `background` declaration outranks, and it
drags its own text colour along, so an inverted or tinted field reverts to a
pale block with dark ink the instant it fills. Restore both from the field's own
tokens — an inset `box-shadow` large enough to cover the box for the ground,
`-webkit-text-fill-color` for the ink, because `color` is the property being
overridden — and hold it off with an absurd delay on the one property the UA
animates.
```css
input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px var(--field-bg) inset;
  -webkit-text-fill-color: var(--field-ink); caret-color: var(--field-ink);
  transition: background-color 9999s ease-out }
```
⚠ The covering shadow paints over whatever else the field was carrying — an
inner hairline drawn with `box-shadow` disappears on fill. Re-check the restored
pair for 4.5:1: the contrast that was fine on an empty field is a different pair
once the value is in.
