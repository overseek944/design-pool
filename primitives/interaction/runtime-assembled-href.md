---
id: runtime-assembled-href
category: interaction
tags: [interaction,correctness,accessibility,link,progressive-enhancement]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A destination you would rather not serve in the markup can be split across data
attributes and joined by script. The trap is the placeholder: `href="#"`
announces a link to nowhere, and middle-click, copy-link and open-in-new-tab all
resolve it without ever reaching a click handler. Ship the element with no
`href` and write the real one the moment script runs, rather than intercepting
the click. Until then it is announced as text, which is what it is.

```js
for (const a of document.querySelectorAll('[data-user]'))
  a.href = `mailto:${a.dataset.user}@${a.dataset.host}`
```
⚠ Script off means no address at all — print a fallback route in the markup.
This defeats naive harvesters only; treat it as friction, never protection.
