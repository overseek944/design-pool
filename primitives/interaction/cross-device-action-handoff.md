---
id: cross-device-action-handoff
category: interaction
tags: [interaction,cta,progressive-enhancement,accessibility,responsive]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Where the thing on offer can only be used on a device class the reader may not
be on — a desktop binary, a large-screen editor — hiding or disabling the
action on the wrong device simply loses them. Change what the control *does*
instead: on a capable device it performs the action, elsewhere it opens a
handoff that sends the link to one. Ship both labels in the markup and let the
breakpoint choose, so the wording never flashes or reflows after hydration.

```html
<button data-get>
  <span class="at-wide">Download for macOS</span>
  <span class="at-narrow">Send me the link</span>
</button>
```
⚠ One element is a navigation in one branch and a dialog trigger in the other,
so `aria-haspopup="dialog"` and `aria-expanded` belong to the branch, not to the
element — announcing a dialog that never opens is worse than announcing nothing.
Branch on a capability or a media query, never on the user-agent string.

Where the product exists only as a phone app, the wide branch hands off with no
round-trip: one scannable code per store in place of the store badges, each
80–140px with its platform named beneath it, and the badges return below the
breakpoint where a camera cannot scan its own screen.
⚠ Each code still needs a plain link beside or under it — a reader on a
desktop with no phone to hand has no other way through.
