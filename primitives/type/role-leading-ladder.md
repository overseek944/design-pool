---
id: role-leading-ladder
category: type
tags: [type,tokens,scale,rhythm,precision]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 10
requires: []
conflicts: []
completes: []
tension: [grid-counted-leading]
---
Leading is a function of role, not of size, and the ladder is steeper than most
scales admit: display wants less than single, prose wants noticeably more.
Name the rungs after what they set so a component picks a role instead of
inventing a number, and a multi-line display block closes into a single mass
while body copy stays open.
```css
:root { --lead-display: .9;  --lead-display-soft: .95; --lead-body: 1.2;
        --lead-text: 1.3;    --lead-prose: 1.45 }
h1 { line-height: var(--lead-display) }
```
⚠ Below ~.9 descenders foul the next line's caps and accented uppercase clips —
safe only on short, known display lines. Buttons and single-line labels want
just under 1, not 1, or the box rounds a pixel taller than the control.

Range — the display rung is a function of the face, not one number. `.9` suits a
tight geometric with short extenders; a large-x-height grotesque at 3rem+ wants
`1.0–1.1` before the lines stop colliding, and taking it to `.9` there fouls
descenders on the very block the rung exists for. Treat `.9–1.1` as the display
band and pick inside it by setting the real headline, not by inheriting the
token from another project.

Leading alone is half a role. A role that names only `line-height` still leaves
size, weight and tracking to be picked per component, which is exactly where a
scale drifts. Ship them as a matched set — `--type-{size,weight,leading,tracking}`
per role — and let one class bind all four plus the family, so a component asks
for `display`, `title`, `body`, `prose`, `control` or `caption` and cannot
half-apply one.
```css
.type-body { font-family: var(--font-sans);  font-size: var(--type-size-body);
  font-weight: var(--type-weight-body); line-height: var(--type-leading-body);
  letter-spacing: var(--type-tracking-body) }
```
⚠ Roles should outnumber sizes, not match them. Two roles resolving to the same
size is ordinary; two sizes inside one role means it is really two roles.
