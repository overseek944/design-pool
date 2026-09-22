---
id: synthesised-hover-keyboard-proxy
category: interaction
tags: [accessibility,keyboard,third-party,observer,correctness,page-builder]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A menu or disclosure emitted by a page builder often listens for pointer events
only, so it cannot be opened from the keyboard and exposes no state to read.
Drive it through the input it does accept: give the trigger `role="button"`,
`tabindex="0"` and a keydown handler that dispatches the pointer sequence it
expects. Never track open or closed yourself — watch the panel's own `style`
and `class` with a `MutationObserver` and mirror what you find onto
`aria-expanded`. Escape closes and returns focus to the trigger.

```js
t.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return
  e.preventDefault()
  ;['pointerover','mouseover','mouseenter','click'].forEach(n =>
    t.dispatchEvent(new MouseEvent(n, { bubbles: true, view: window }))) })
new MutationObserver(sync).observe(panel,
  { attributes: true, attributeFilter: ['style','class'] })
```
⚠ Synthetic events carry `isTrusted: false` and no user activation, so anything
the widget gates on that — `play()`, fullscreen, clipboard — still refuses.
Strip the trigger's `href` first, or Enter navigates before the handler runs.
