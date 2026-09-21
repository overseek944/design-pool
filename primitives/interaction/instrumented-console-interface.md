---
id: instrumented-console-interface
category: interaction
tags: [instrumentation,analytics,architecture,progressive-enhancement]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page can carry a second interface addressed at nobody who scrolls: a frozen
namespace on `window`, a `%c`-styled banner, `console.table` for structured
rows. It costs no layout, nothing on the critical path and no screen-reader
surface, and it reaches exactly the readers who open devtools. Instrument the
reach rather than the display — put the payload behind a getter and fire one
deduplicated event when it is read.

```js
window.app = Object.freeze({
  get roles() { once('console_opened'); return rows.slice() },
  brief() { once('console_brief'); console.table(rows); return prompt } })
```
⚠ A getter with a side effect also fires when a debugger expands the object, so
the count includes inspection — treat it as a floor. Nothing here is indexed,
translated or announced: it can carry no information the page needs.
