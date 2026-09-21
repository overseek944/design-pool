---
id: rejected-file-input-reset
category: interaction
tags: [correctness,form,input,file,detail]
axes: none
cost: 1
seen: 1
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
