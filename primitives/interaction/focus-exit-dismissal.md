---
id: focus-exit-dismissal
category: interaction
tags: [accessibility,interaction,focus,correctness,state]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A panel that closes on an outside click and on Escape is still broken for the
keyboard: Tab walks focus past its last item into the page behind, firing no
pointer event and no key the handler reads, so the panel stays open behind the
reader. `focusin` on the document is the third signal. Escape needs the opposite
handoff — return focus to the trigger before the panel unmounts, or focus falls
to `<body>`. Bind them on open and drop them on close.

```js
const out = e => panel.contains(e.target) || close()
const key = e => e.key === 'Escape' && (close(), trigger.focus())
for (const t of ['pointerdown', 'focusin']) document.addEventListener(t, out)
document.addEventListener('keydown', key)      // remove all three on close
```
⚠ `pointerdown`, not `click` — a click arrives after the press has moved focus,
so the two handlers race. `focusin` bubbles where `focus` does not; on the
document, `focus` catches nothing.

Where binding document listeners per open is unwanted, `focusout` on the menu
wrapper does the same work locally: close unless `relatedTarget` is still
inside. It fires as focus leaves, so nothing has to be torn down on close.
```js
wrap.addEventListener('focusout', e => wrap.contains(e.relatedTarget) || close())
```
⚠ `relatedTarget` is `null` when focus goes to the browser chrome or to a
non-focusable click target. That still closes, which is usually right, but the
outside `pointerdown` listener remains necessary.
