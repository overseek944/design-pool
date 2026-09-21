---
id: override-released-system-preference
category: interaction
tags: [theme,preference,accessibility,correctness,state]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A page that mirrors `prefers-color-scheme` and also ships a toggle has two
sources for one fact, and the system usually keeps winning: someone picks light
at midnight, the OS flips on schedule, and the page changes under them.
Subscribe to the media query only while no stored choice exists, and drop the
listener the moment one is written. The system supplies the default, never the
override. Same shape for reduced motion and contrast wherever the product ships a switch.

```js
if (read() === null) {                        // null until the user picks
  const mq = matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', follow)
  return () => mq.removeEventListener('change', follow)
}
```
⚠ Storage throws in partitioned and private contexts — treat a failed read as no
choice and a failed write as did not persist, never as a reason to skip applying
the value. Offer a way back to the default.
