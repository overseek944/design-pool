---
id: autofill-proofed-honeypot
category: interaction
tags: [accessibility,correctness,form,detail,progressive-enhancement]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A decoy field is the alternative to a visible challenge widget and costs a
reader nothing: a submission arriving with it filled was not typed by a person.
Three details decide whether it holds. Hide it by clipping rather than
`display: none`, which the cheapest scripts already skip. Take it out of the tab
order *and* the accessibility tree, or a keyboard reader fills it and is
rejected with no explanation. And give it a name no password manager recognises
— a field called `website` or `address` gets autofilled for a real person, who
is then dropped in silence.

```html
<label class="trap" aria-hidden="true">
  <input name="ref_hp" tabindex="-1" autocomplete="off"></label>
```
```css
.trap { position: absolute; width: 1px; height: 1px; clip-path: inset(50%) }
```
⚠ Every rejection here is silent by design, so a false positive is invisible to
you and terminal for the user. Log them rather than only counting, and never
leave it the sole gate on a form someone has to get through.

A second gate is free and independent of the first: stamp when the form mounted
and drop a submission that arrives faster than a person could have typed it.
Scripts post in milliseconds; a reader on the shortest form takes seconds.
Answer both gates with the same success state a real sender sees, so a bot
learns nothing to tune against.
```js
const t0 = performance.now()                                  // at mount
if (hp || performance.now() - t0 < 1500) return showSuccess() // 1.5–3s
```
⚠ A password manager can complete a short form in well under a second — keep
the floor where a fast human still clears it, and stamp at mount rather than
at first paint or a bfcache restore rejects a returning reader.
