---
id: withheld-value-reveal
category: interaction
tags: [interaction,disclosure,redaction,accessibility,state]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 2
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

Where the withholding is against harvesters rather than for rhetoric, a
`data-` attribute is no protection at all — it ships in the HTML and reads
exactly like the text would. The value must never exist as one contiguous
string anywhere in the bundle: keep the parts in an array and join them at
call time, so the served document, the source map and a regex over either
contain fragments and no address. The control stays a real button with a
spoken label; only the composition is deferred.
```js
const p = ['first', 'last', 'example', 'com']
const addr = () => `${p[0]}.${p[1]}@${p[2]}.${p[3]}`
btn.onclick = () => { location.href = `mailto:${addr()}` }
```
⚠ A reader with script disabled gets a dead button — give it an accessible
name that says what it does and a working fallback route, a contact form or a
social profile. This raises the cost of harvesting, it does not prevent it.
