---
id: dismissal-escalated-reprompt
category: interaction
tags: [interaction,prompt,cadence,persistence,restraint,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A recurring prompt — install, subscribe, upgrade — needs a cadence, not a
boolean. Persist two values per prompt: when it last appeared, and how many
times it was dismissed in a row. Below the cooldown, stay silent; past two
consecutive dismissals, switch to the long cooldown; on acceptance, reset the
count. A session key caps it to once per visit regardless. Short cooldown
6–24h, long 3–14 days.

```js
const s = read(key)                                  // {lastShownAt, dismissals}
const wait = s.dismissals >= 2 ? LONG : SHORT        // escalate, do not silence
const due = !sessionStorage.getItem(seen) && Date.now() - s.lastShownAt > wait
```
⚠ Storage throws in private modes and partitioned frames — wrap every read and
write, and let a throw mean *do not show*, never *show again*.
