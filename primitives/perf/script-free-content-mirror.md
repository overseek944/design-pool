---
id: script-free-content-mirror
category: perf
tags: [perf,progressive-enhancement,correctness,content,architecture]
axes: none
cost: 2
seen: 3
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

An edge worker can do better than `<noscript>`: inject the real markup *into the
mount node* for the routes that have something to say, and crawlers that do run
script see a populated document rather than an empty root. That markup then has
to be torn down before the deferred bundle renders, or it flashes and is
replaced. A synchronous script after the root element, keyed off an attribute
the worker sets, is the whole teardown — and a no-op on every route without it.
```html
<div id="root" data-seo-injected>…</div>
<script>var r = document.querySelector('#root[data-seo-injected]')
  if (r) { r.innerHTML = ''; r.removeAttribute('data-seo-injected') }</script>
```
⚠ It must be a blocking inline script above the module bundle, not `defer`ed —
ordering is the only thing preventing the flash.

`<noscript>` is invisible to precisely the consumers that matter most now —
anything that *does* execute script sees the empty root and never the fallback.
Ship the mirror as ordinary markup instead, clipped to a 1px box and marked
`aria-hidden`, so it is in the document for every consumer and painted for none.
The cost is that it is real content: duplicated headings and links now sit in
the same document the app renders, and `aria-hidden` is the only thing keeping
the copy out of the accessibility tree.
```html
<div aria-hidden="true" style="position:absolute;clip:rect(0 0 0 0);
     width:1px;height:1px;overflow:hidden;border:0">…</div>
```
⚠ Not the visually-hidden recipe used for screen-reader-only text — that one is
deliberately *in* the tree. Keep the mirror's wording identical to the visible
copy rather than a paraphrase: in-page find still matches clipped text in some
engines, and a reader jumped to an invisible match has nothing to look at.
