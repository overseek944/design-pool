---
id: scroll-beat-live-region
category: scroll
tags: [accessibility,scroll,aria-live,narrative,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When scrolling is what changes the content — a pinned scene, a canvas that
re-stages itself, a section whose visual carries the argument — nothing
announces the change. A visually-hidden `aria-live="polite"` region, written
only on transition into a new section, gives a screen reader the same sense of
position a sighted reader gets for free. Echo the section's own `aria-label`
rather than a second string, so the two cannot drift.

```html
<section id="b2" role="region" aria-label="Autonomous follow-up">
<p class="sr-only" aria-live="polite" id="beat"></p>
```
```js
if (id !== last) { last = id; beat.textContent =
  document.getElementById(id).getAttribute('aria-label') }
```
⚠ Write it on change only. Assigning the same string every scroll event floods
the queue and the reader hears nothing else.
