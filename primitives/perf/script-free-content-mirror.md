---
id: script-free-content-mirror
category: perf
tags: [perf,progressive-enhancement,correctness,content,architecture]
axes: none
cost: 2
seen: 6
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

Where the enhancement is a *control over content the page already renders* —
a search box over a list, a filter over a strip of names — there is nothing to
mirror and nothing to drift. Read the seed out of the visible nodes on setup,
build the control from that, and replace the data with the authoritative fetch
when it lands. Without script the content is simply there; with it, the control
works before the request resolves and still works if it fails.
```js
let items = [...track.querySelectorAll('[data-item]')].map(el => el.textContent.trim())
fetch('/api/items').then(r => r.json()).then(live => { items = live; render() })
```
⚠ The markup is now load-bearing and no longer purely decorative — a change to
the visible list changes the control's fallback, so keep the parse tolerant of
separators and whitespace the design may add later.

A mirror clipped to 1px is still laid out, so its text is still shaped — and
shaping pulls whatever family the cascade hands it. A display face declared on
`h1, h2, h3` and a body face on the root then download in full to set type at
1×1 that nobody will ever see, on every route including the ones using neither
family. Force the block and its descendants onto a system stack: `.mirror *` is
(0,1,0) and out-specifies the bare element rules with no `!important`.
```css
.mirror, .mirror * { font-family: system-ui, sans-serif }
```
⚠ Whether the fetch fires at all is a race against the script that removes the
block, so the cost appears and disappears between loads and no single trace
proves it. Measure on the routes that do *not* use the display face — there the
whole download is waste, and a per-page audit is the last place it shows.

Where the framework clears its mount node on first render — a client root
replacing its children — the mirror can live *inside* the root as a
`display:none; aria-hidden` block and needs no teardown script: the render that
paints the app is the removal.
⚠ `display:none` text is the weakest-weighted form for crawlers that do parse
the DOM; use it only where the clipped variant's duplication is unacceptable.
