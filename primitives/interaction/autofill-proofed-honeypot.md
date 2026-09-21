---
id: autofill-proofed-honeypot
category: interaction
tags: [accessibility,correctness,form,detail,progressive-enhancement]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A decoy field is the alternative to a visible challenge widget and costs a
reader nothing: a submission arriving with it filled was not typed by a person.
Three details decide whether it holds. Hide it by clipping rather than
`display: none`, which the cheapest scripts already skip. Take it out of the tab
order *and* the accessibility tree, or a keyboard reader fills it and is
rejected with no explanation. And give it a name no password manager recognises
— a field called `website` or `address` gets autofilled for a real person, who
is then dropped in silence.

```html
<label class="trap" aria-hidden="true">
  <input name="ref_hp" tabindex="-1" autocomplete="off"></label>
```
```css
.trap { position: absolute; width: 1px; height: 1px; clip-path: inset(50%) }
```
⚠ Every rejection here is silent by design, so a false positive is invisible to
you and terminal for the user. Log them rather than only counting, and never
leave it the sole gate on a form someone has to get through.
