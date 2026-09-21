---
id: rejected-file-input-reset
category: interaction
tags: [correctness,form,input,file,detail]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Check a chosen file's real type and byte length before any upload starts, and
on rejection clear the input's `value`. Skip the reset and the element still
holds the rejected file, so choosing that same file again fires no `change`
event at all — the reader re-picks, nothing happens, and the error stays on
screen with no way to clear it. `accept` only filters the picker; it is a
convenience, never a guarantee.

```js
if (!okType(f) || f.size > MAX) {          // MAX 5–25 MB
  setError(msg); ref.current.value = ''; return }
```
⚠ Clearing `value` also drops a previously accepted file, so validate before
replacing state. On a `required` input a reset field blocks submit with the
browser's own message, which will not say why.

Where the chosen files are copied into state the component owns — a list of
removable chips — the reset stops being a rejection path and becomes
unconditional. Clear `value` on every `change`, accepted or not: the input is now
only a picker, and leaving its `files` populated means a reader who removes a
chip and re-picks that same file fires no event and watches nothing happen.
Deduplicate on name plus size while adding, because the picker will hand you the
same file twice.
```js
onChange = e => { add([...e.target.files]); e.target.value = '' }   // always
```
⚠ An emptied input can no longer submit natively — the files exist only in your
state, so a no-script submit posts the field blank. Keep the real upload on the
path that reads your state, never on the element.
