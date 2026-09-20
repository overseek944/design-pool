---
id: withheld-value-reveal
category: interaction
tags: [interaction,disclosure,redaction,accessibility,state]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Withholding a figure claims more than printing it, but only if the withholding
is real. Keep the value in a `data-` attribute and write it in on activate:
until then it is absent from the DOM, from copy-paste and from the
accessibility tree. The blank must be a genuine button, and its resting fill
derived from the band beneath it — a black bar disappears on a black section.
Block 3–8 characters wide.

```html
<button class="withheld" data-value="1,240">████</button>
```
```js
b.onclick = () => { b.textContent = b.dataset.value; b.classList.add("on") }
```
⚠ `color: transparent` over a filled background is not redaction — the text
stays selectable and is still read aloud.
