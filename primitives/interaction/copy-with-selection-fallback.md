---
id: copy-with-selection-fallback
category: interaction
tags: [interaction,clipboard,accessibility,correctness,feedback]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
`navigator.clipboard.writeText` rejects on an insecure origin, a denied
permission and outside a user gesture — and a copy button that silently fails
is worse than no button. Catch it and do the one thing that always works:
select the value's own text node so the reader's own copy shortcut is armed,
and name that shortcut for their platform. Success and failure then differ by
wording, never by whether anything happened. Hold the message 1.2–2s.

```js
try { await navigator.clipboard.writeText(v); say('Copied') }
catch { const r = document.createRange(); r.selectNodeContents(textEl)
  getSelection().removeAllRanges(); getSelection().addRange(r)
  say(/Mac|iP(hone|ad)/.test(navigator.platform) ? 'Press ⌘C' : 'Press Ctrl+C') }
```
⚠ Announce through a live region, not a colour or icon change alone, and clear
the previous timeout on every press or a fast second click reverts the first.

The button and the value drift apart the moment the payload is a string in an
attribute. Point the control at the element that *displays* it and read the
text at click: `textContent` returns the authored source, whitespace and hidden
nodes included, while `innerText` returns what is rendered — which is what the
reader believes they are copying.
```js
const src = document.getElementById(btn.dataset.copyTarget)
write(src.innerText)                    /* rendered, not authored */
```
⚠ `innerText` forces layout on the source and returns an empty string for a
`display: none` block — a copy button beside a collapsed panel silently yields
nothing.
