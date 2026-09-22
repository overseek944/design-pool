---
id: script-swapped-placeholder-payload
category: media
tags: [media,embed,third-party,fallback,progressive-enhancement,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A vendor widget that replaces an element in place — a quote block, a post card,
a gist — hands you one decision: what exists when it never runs. Blocked by an
extension, refused at a consent gate, or simply slow, the placeholder *is* the
page. Author it as the finished article rather than as a hook: the quoted text,
an attributed link to the source, a reserved height so the swap costs no shift.
An element carrying nothing but a vendor class is a hole in the content for
every reader who declines the script, and for every crawler.

```html
<blockquote class="vendor-embed" cite="https://…" style="min-block-size:22rem">
  <p>The full quoted passage, readable with no script at all.</p>
  <a href="https://…">— Author, 12 March</a>
</blockquote>
```
⚠ The vendor decides when it swaps and may never do so, so the placeholder has
to be presentable indefinitely — style it rather than leaving it at UA
defaults, and keep its text the real text, not a summary that will disagree
with the embed once both are on screen.
