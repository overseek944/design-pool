---
id: supported-feature-as-scalar
category: scale
tags: [progressive-enhancement,feature-detection,tokens,correctness,architecture]
axes: none
cost: 1
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
A feature query usually swaps a rule block. Have it write a number instead:
default a root property to 0, let `@supports` raise it to 1, then read it
through `calc()`. Enhancement becomes an amount rather than a branch, so one
declaration serves both browsers and the adjustment can be partial — which is
what a new feature that changes an optical value rather than replacing one
needs. Squircle corners read smaller than round ones at the same radius; the
flag pays back 2–6px only where they land.

```css
:root { --has-squircle: 0 }
@supports (corner-shape: superellipse(2)) { :root { --has-squircle: 1 } }
.card { corner-shape: superellipse(2);
        border-radius: calc(16px + 4px * var(--has-squircle)) }
```
⚠ Only arithmetic values can be flagged this way — a keyword still needs the
rule block. `@supports` tests parsing, not quality: a browser that parses the
feature and renders it poorly raises the flag anyway.

The scalar is arithmetic-only, but the same inversion reaches keywords if the
property is left *unset* rather than zeroed. An undefined custom property falls
through to the `var()` fallback slot, so the modern value lives at every call
site and the feature query only has to define the override — one `@supports`
block serving hundreds of declarations with no rule duplication and no
specificity to manage. It runs in either polarity: `@supports not` to install a
fallback, plain `@supports` to release a hardcoded one.
```css
@supports not (overflow: clip) { :root { --clip-fb: hidden } }
@supports (aspect-ratio: 1)    { :root { --ar-h: auto } }
.panel { overflow: var(--clip-fb, clip); height: var(--ar-h, 520px) }
```
⚠ Any value at all consumes the slot, including an empty one — `--clip-fb: ;`
is legal and is what a build step emits for a blank token. It substitutes
nothing, and the declaration is then dropped as invalid at computed-value time.
