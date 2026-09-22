---
id: platform-narrowed-download-set
category: interaction
tags: [progressive-enhancement,navigation,correctness,accessibility,architecture]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An artifact built for five targets should not ship five equal buttons, and must
not ship one. Author every build as a real link, then let script promote the
match and sweep the rest into a disclosure that stays hidden until the
narrowing has happened: with no script, a failed probe or an unrecognised
platform, the reader gets the full list — which is also what someone fetching a
build for another machine wants. Architecture is half the answer and resolves
asynchronously, so await it before promoting.
```js
const { architecture } = await navigator.userAgentData?.getHighEntropyValues(['architecture']) ?? {}
for (const a of links) if (a.dataset.target !== pick) {
  overflow.append(a.cloneNode(true))        // clone first — it is the reachable one
  a.hidden = true; a.inert = true }
```
⚠ Hiding must carry `inert`, or the rejected builds stay in the tab order
behind a visually single button.

Narrow on *input capability* before platform, or a tablet is handed a desktop
disk image: iPadOS reports a laptop platform string and is indistinguishable
from one by name alone, and Android reports the same token as a Linux
workstation. A handheld's honest answer is not a smaller build, it is a
different call to action — route it to the walkthrough and say where the
download lives, rather than offering a 180MB artifact the device cannot run.
```js
const handheld = matchMedia('(hover: none) and (pointer: coarse)').matches
  || (navigator.maxTouchPoints > 1 && /mac/i.test(platformString()))
```
⚠ The touch-points clause is what catches a tablet claiming to be a desktop;
without it the media query alone still misses a stylus-first device. Keep the
full list reachable — someone on a phone is often fetching for another machine.
