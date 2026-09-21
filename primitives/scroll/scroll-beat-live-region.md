---
id: scroll-beat-live-region
category: scroll
tags: [accessibility,scroll,aria-live,narrative,correctness]
axes: none
cost: 1
seen: 3
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

Where the signal is a continuous *value* rather than a position — characters
against a cap, results against a filter — quantise it to two or three named
states and write the empty string between them. Announcing the number floods
the queue on every keystroke; announcing "approaching the limit" once at 85–90%
and "limit reached" at the cap carries the same information in two utterances.
```jsx
<span className="sr-only" aria-live="polite">
  {over ? 'Character limit reached.' : near ? 'Approaching the limit.' : ''}</span>
```
⚠ Returning to the empty string is what re-arms the region. A state that never
clears announces once and stays silent for the rest of the session.
