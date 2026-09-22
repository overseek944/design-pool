---
id: zone-derived-regional-ordering
category: interaction
tags: [interaction,i18n,privacy,ordering,progressive-enhancement,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A list whose useful entries differ by country can be ordered for the reader
with no IP lookup, no permission prompt and no request: the IANA zone the
browser already resolved is a coarse region. Spend it on ordering only — never
on filtering — so a wrong guess costs a scroll rather than the answer, and keep
a search that always covers the whole set. Test specific zones before
continental catch-alls.

```js
const z = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
const hit = RULES.find(([re]) => re.test(z))        // [/^Asia\/Kolkata$/, 'in']
render(hit ? [...local(hit[1]), ...rest] : everywhere)
```
⚠ A blanket `/^America\//` tells a reader in São Paulo their brokers are
American. Zones are set by hand and travel with the laptop, so this can never
gate content, pricing or compliance copy — only sequence it.
