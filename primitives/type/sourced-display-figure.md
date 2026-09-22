---
id: sourced-display-figure
category: type
tags: [type,figures,provenance,correctness,editorial,accessibility]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A number set at display size stops being prose and becomes a claim, so it needs
a route to its source in the same section — not a page of fine print. Mark each
figure with a superscript reference resolving to a short numbered list under the
row, and carry one scope line naming what the figures describe. The unit rides
as a smaller span so the figure stays one accessible string.

```html
<p class="figure">74<span class="unit">%</span><a href="#r1"><sup>1</sup></a></p>
```
⚠ A bare `<sup>` is announced as part of the number — "seventy-four percent
one". Give the link an `aria-label` naming it a reference. Hold the list and the
scope line at body contrast: dropping them to 3:1 turns a qualifier into
decoration.

A forecast inverts the "not a page of fine print" rule: nothing is being cited,
so the note has to carry the whole derivation — the assumptions, the arithmetic,
the extrapolation — and a numbered one-liner cannot. What keeps a paragraph of
working from reading as a disclaimer is typographic apparatus rather than
brevity: a hairline rule down the inside edge, the ordinal hung in mono against
sans prose, and exactly one step down in size and tone. One step, not two — the
second is where a qualifier becomes decoration. Note at 0.78–0.85em, rule at
one hairline, marker and target each named by `aria-label`.
```css
.note { border-inline-start: 1px solid var(--rule); padding-inline-start: 1rem;
        font-size: .82em; color: var(--ink-faint) }
```
⚠ The reader arrives here from a `<sup>` mid-sentence and has to get back —
`:target` styling alone does not return them. Give the note a link home, or
accept that a long derivation costs the reader their place in the argument.

Where the source is one document rather than a list of references, the locator
*is* the reference and needs no resolution step: set the section or clause
address in mono directly inside the value it justifies — a chip, a table cell —
one tier down in size and ink. The reader gets the route without leaving the
value, and a page full of derived figures stays auditable with no footnote
apparatus at all. Locator at 0.72–0.82em, and the same address marked on the
quoted passage so the pair is findable in both directions.
```html
<span class="term">Payment terms <b>Net 60</b><cite>§3.2</cite></span>
```
⚠ `§3.2` is announced as "section three point two" at best and as punctuation at
worst — carry the spoken form in an `aria-label` on the `<cite>`. A locator
pointing at a passage not shown on the page is a claim, not a citation.
