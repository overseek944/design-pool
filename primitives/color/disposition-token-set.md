---
id: disposition-token-set
category: color
tags: [color,tokens,state,correctness,accessibility]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: [status-triad-tokens]
tension: []
---
A review queue is not a severity display, and borrowing `success`/`warning`/
`error` for one makes every item still awaiting judgement read as a fault. Name
the tokens after outcomes instead — cleared, blocked, needs-input, undecided —
and keep undecided off the good–bad axis entirely: a blue, not an amber, or a
queue that is mostly unread looks like a queue that is mostly wrong. Four
outcomes covers most workflows; a fifth is usually two that should merge.

```css
--d-clear: #15803d;  --d-block: #991b1b;
--d-ask:   #92400e;  --d-open:  #1e40af;   /* undecided: neutral hue, not amber */
```
⚠ Each outcome still needs its mark, text and wash cuts — one hex used as label
colour fails contrast. Colour is never the only carrier: an auditable decision
owes the word itself in the DOM.

The contrast obligation above is best discharged in the token set rather than
at every call site: publish each outcome as three prepared forms — the solid
for marks and text, a wash at 8–16% for the chip fill, a border at 30–45% —
because a status chip always needs all three and deriving them where they are
used means every component invents its own alpha. Naming is the whole benefit:
`--s-blocked-soft` is unambiguous where `color-mix(… 24%, transparent)` in a
rule is a decision nobody else can find.
```css
--s-blocked: #f97316; --s-blocked-soft: #f9731624; --s-blocked-border: #f9731666;
```
⚠ Three forms per outcome multiplies fast — four outcomes is twelve tokens, and
a fifth state is usually the signal to merge two rather than to add a column.
