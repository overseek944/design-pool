---
id: device-hint-quality-tier
category: perf
tags: [performance,webgl,capability,progressive-enhancement,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Resolve one integer tier at startup and let every expensive decision read it,
rather than scattering capability checks through the scene. `deviceMemory` and
`hardwareConcurrency` at or below 4 mean a low tier; below the mobile breakpoint
means the lowest. Shadows, post-processing, texture sizes and pixel ratio all
key off that one number, so the ladder can be reviewed as a table instead of
hunted for. Clamp pixel ratio per tier too — 1.5 on phones, 2 elsewhere; a 3×
panel triples fragment cost for detail nobody resolves.

```js
const weak = (navigator.deviceMemory ?? 8) <= 4 ||
             (navigator.hardwareConcurrency ?? 8) <= 4
const tier = narrow ? 0 : weak ? 1 : 2
```
⚠ Default the hints *optimistically*. Both are Chromium-only; `?? 4` puts every
Safari and Firefox reader on the low tier. Add a URL override so a tier can be
forced for review.

Input class is a separate ladder from compute class and wants its own cascade,
because a laptop with a touchscreen and a phone report the same `deviceMemory`
but need opposite hover, target-size and drag decisions. Ask the specific signal
first and fall through: `userAgentData.mobile`, then `(pointer: coarse) and
(hover: none)`, then a screen-width threshold. Guard each probe — privacy
builds throw on reading these rather than returning undefined, so one
unprotected access takes the whole startup path down.
```js
const ask = f => { try { return f() } catch { return undefined } }
const m = ask(() => navigator.userAgentData?.mobile)
        ?? ask(() => matchMedia('(pointer: coarse) and (hover: none)').matches)
        ?? ask(() => screen.width < 768) ?? false
```
