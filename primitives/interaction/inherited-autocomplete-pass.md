---
id: inherited-autocomplete-pass
category: interaction
tags: [forms,autocomplete,accessibility,third-party,correctness]
axes: none
cost: 1
seen: 1
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
