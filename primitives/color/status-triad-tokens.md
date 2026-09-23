---
id: status-triad-tokens
category: color
tags: [color,tokens,accessibility,contrast,correctness,state]
axes: none
cost: 1
seen: 17
requires: []
conflicts: []
completes: []
tension: []
---
A status is three tokens, not one, because the same hue is asked to do three
jobs with three different contrast obligations. The saturated cut is the *mark*
— a rule, a dot, an icon — and owes 3:1 against the ground. The text cut is two
to three steps darker and owes 4.5:1 against the wash. The wash is the tinted
ground and owes nothing. Spending the mark colour on the label is the default
mistake and it fails at every size.
```css
--notice:#f5b50a; --notice-fg:#99710a; --notice-bg:#fff8e3;
.note { background:var(--notice-bg); color:var(--notice-fg);
        border-inline-start:3px solid var(--notice) }   /* rule 2–4px */
```
⚠ Keep the three roles fixed across every status or the set stops being
readable as a system. Colour alone never carries state — pair it with a word or
a shape.

On a dark ground the triad inverts. The wash cannot be a tint toward white —
take the hue down to 10–16% lightness, still unmistakably itself beside the page
ground. The text cut then goes *lighter* rather than darker, and against a wash
that dark the mark colour usually clears 4.5:1 already, so mark and label
collapse into one token where the light version needs two. Verify per hue: a
green or amber mark passes, a mid blue does not.
```css
--go: #4fd08a; --go-bg: #173a2a;   /* on dark, the label may take --go */
```

On a page carrying several ground depths — a card on a panel on a near-black
page, a log well darker than both — a solid wash is tied to the one ground it
was mixed against and goes muddy or invisible on the others. Express the wash
and the rule as alphas of the mark token instead: one token per status, and the
chip picks up whatever it lands on. Wash .05–.09, rule .4–.55, mark full.
```css
.chip { color: var(--sev); border: 1px solid rgb(from var(--sev) r g b / .5);
        background: rgb(from var(--sev) r g b / .07) }
```
⚠ Alphas stack — the same chip over a translucent panel above a glow is a third
colour again. The label is the one cut here that owes a ratio, so it stays
opaque: it cannot owe one against a backdrop this arrangement leaves unknown.

Where the label must keep a *known* ratio, mix the hue into the surface token
instead of layering an alpha: `color-mix(in oklab, …)` resolves to an opaque
colour, so contrast is checkable per theme, yet one `--hue` still drives every
status. Wash 7–12%, rule 18–28%, icon disc 14–20%.
```css
.toast { --fill: color-mix(in oklab, var(--hue) 9%, var(--surface));
         --edge: color-mix(in oklab, var(--hue) 22%, var(--line)) }
.toast[data-type=error] { --hue: var(--danger) }
```
⚠ Gate the mix behind `@supports`, falling back to the neutral surface — not to
the raw hue.
