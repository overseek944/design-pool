---
id: slug-mapped-locale-switch
category: interaction
tags: [interaction,navigation,i18n,url,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A language switcher built by prefixing the current path works only while the
translations share slugs. The moment a route's slug is localised — which is the
point of translating it — the prefixed path 404s or lands the reader on the
home page, losing their place at exactly the moment they asked to keep it. Map
every localised slug to its counterpart in each language, key it on the path
with the prefix stripped so either direction resolves, and fall back to
prefixing for routes that do share a slug.

```js
const bare = path.replace(/^\/es(?=\/)/, '') || '/'
const next = ALIAS[bare]?.[lang] ?? (lang === 'en' ? bare : '/es' + bare)
params.delete('lang'); location.assign(next + qs(params) + hash)
```
⚠ Carry query and hash across, dropping only the parameter the switch itself
consumes. Both slugs must be keys or the reader is stranded on the translated
page; past 20–30 routes the literal is a second router. A `<button>` rather
than an `<a href>` reaches no crawler.
