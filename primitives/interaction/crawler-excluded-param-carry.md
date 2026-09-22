---
id: crawler-excluded-param-carry
category: interaction
tags: [links,navigation,analytics,seo,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
The params that identify a visit — campaign, referrer, experiment — live
only on the landing URL, so a conversion two pages later attributes to nothing.
Rewrite same-origin `href`s once at load to carry the current search string
forward, merged so a key the destination already declares wins and the fragment
survives. Exclude crawlers and automation: a spider following tagged links
indexes a second URL per page and splits its own ranking signal. Hold 1–4
internal keys off the carry list.

```js
const skip = /bot|crawl|spider|google-|yandex/iu
if (location.search && !navigator.webdriver && !skip.test(navigator.userAgent))
  for (const a of document.querySelectorAll('a[data-carry-params]')) {
    const u = new URL(a.href)                    // absolute, hash preserved
    for (const [k, v] of new URLSearchParams(location.search))
      if (!u.searchParams.has(k) && !RESERVED.has(k)) u.searchParams.append(k, v)
    a.href = u }
```
⚠ Whatever is carried reaches the destination's address bar and the `Referer`
of every third party it loads — opaque campaign keys only, never a token or an
address. The rewrite is one-shot; re-run it for markup added after load.
