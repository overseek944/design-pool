---
id: absence-conditioned-child-default
category: scale
tags: [tokens,specificity,component-api,utility,cascade,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A component wants to size the icons and rules handed to it, then lose to a
caller who states a size — and specificity cannot express *lose to an equal
sibling declaration*. Put the condition in the selector instead: match the
child only while its class list carries no value of that kind. The default then
applies by absence, so no `!important` ladder and no override prop. Guard the
substring against false hits — a bare `*=` matches `min-h-8` when testing `h-`,
so pair a leading-token test with a whitespace-prefixed one.

```css
.ctl :where(svg):not([class*="size-"])           { inline-size: .875rem }
.sep:not([class^="h-"]):not([class*=" h-"])      { align-self: stretch }
```
⚠ It reads the class attribute, not computed style, so a size arriving from a
stylesheet or an inline style is invisible to it and gets overridden anyway.
Only honest for values the system names as classes.
