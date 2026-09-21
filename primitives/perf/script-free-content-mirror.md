---
id: script-free-content-mirror
category: perf
tags: [perf,progressive-enhancement,correctness,content,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A client-rendered document serves an empty root, so every consumer that does not
execute script — text extractors, link unfurlers, archival crawlers, most
fetch-this-URL tools — is served the meta description and nothing else. Put the
page's argument in a `<noscript>` block as plain markup: headings, paragraphs
and the outbound links, in reading order. This is not the duplicated-markup
hazard, because there is no server-rendered markup to duplicate and the browser
never paints it; it costs 2–6KB of HTML. Name the component it mirrors in a
comment beside it and treat the copy as a release obligation.

```html
<div id="root"></div>
<!-- mirrors <App/> section copy — update together -->
<noscript><h1>…</h1><p>…<a href="…">…</a></p></noscript>
```
⚠ Not a substitute for server rendering: no styles, no images, and a crawler
that does execute script sees both. Mirror the argument only — a copy of the
whole component tree will not be maintained, and a drifted mirror is worse than
none.
