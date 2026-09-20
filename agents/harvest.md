# Harvest agent

Mine one site for reusable technique and merge it into the pool. The site is a
source, not an entry. Nothing site-specific survives.

**Input:** a URL. **Output:** new primitive files, sharpened existing ones, a
ledger line, a regenerated index.

## 1. Check the ledger

```bash
grep -F "<url>" ledger.jsonl && echo "ALREADY HARVESTED — stop"
```

## 2. Pull material into scratch (never committed)

```bash
S=.cache/harvest-$(date +%s); mkdir -p $S; cd $S
curl -sSL -o page.html "<url>"
grep -oE 'href="[^"]+\.css"|src="[^"]+\.js"' page.html | grep -oE '/[^"]+' | sort -u > assets.txt
while read -r u; do curl -sSL -o "$(echo $u | tr / _)" "<origin>$u"; done < assets.txt
```

## 3. Extract mechanically

| Target | Command |
|---|---|
| Libraries | `grep -l 'gsap\|lenis\|three\|ScrollTrigger\|SplitText\|motion' *.js` |
| Tokens | `grep -ohE '\--[a-z0-9-]+:[^;]*;' *.css \| sort -u` |
| Timing | `grep -ohE 'ease:"[^"]+"\|duration:[0-9.]+\|stagger:[0-9.]+' *.js \| sort \| uniq -c \| sort -rn` |
| Scroll | `grep -ohE 'scrollTrigger:\{[^}]{0,180}' *.js` |
| Advanced CSS | `grep -ohE 'mix-blend-mode:[a-z-]+\|backdrop-filter:[^;]*\|mask-image:[^;]*\|clip-path:[^;]*\|background-clip:text\|text-wrap:[a-z]+\|contain:[a-z ]+\|@container[^{]*' *.css` |
| Shaders | `grep -ohE 'uniform [a-z0-9]+ u[A-Za-z]+' *.js \| sort -u` |
| Hooks | `grep -ohE 'data-[a-z-]+=' page.html \| sort \| uniq -c \| sort -rn` |

Screenshot 8–12 scroll positions at 1440px and 3 at 390px (Playwright Chromium
is cached locally) and read them — composition, rhythm and density are not
recoverable from code.

## 4. Decompose

For each finding: **what is the underlying capability, independent of this
site?** If the description needs their content, brand or page structure to make
sense, it is not decomposed. Discard their layout, copy, palette-as-such and
component tree. Keep the capability.

## 5. Deduplicate — the step that decides whether this works

Never read the whole pool. Narrow by tag, then compare:

```bash
bin/pool query --tags <candidate tags>
bin/pool show <the 3–5 plausible neighbours>
```

- **Already present** → `seen: n+1`. Nothing else. This is the common outcome.
- **A variant** → append a variant line to the existing file. Widen a parameter
  range if this site falls outside it.
- **Genuinely new** → write it.

A great site yielding three new primitives is success. Yield falls off fast by
design — site 1 gave 48, site 50 will give 2–4.

## 6. Write

`primitives/<category>/<id>.md`:

```markdown
---
id: kebab-case-id
category: one of the 14 dirs
tags: [comma, separated]
axes: {energy: 3, density: 2, weight: 4, finish: 4}   # or: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Two to four sentences: the capability, and when it earns its place. Generic.
No site names, no brand, no "they".

```css
2–8 lines of minimal demonstrating code.
```
⚠ Real failure mode, a11y limit or performance cost. Omit only if none exists.
```

Rules: **≤ 120 words** · one idea per entry · parameters as ranges, never one
frozen value · `axes: none` for pure correctness/architecture primitives ·
`completes`/`conflicts`/`tension` only for objective technical relationships,
**never** because two things appeared together on this site.

Assigning axes: score the *technique's* character, not the site's. A glow
primitive is heavy and refined wherever it is used.

## 7. Close out

```bash
rm -rf .cache/harvest-*
echo '{"url":"<url>","date":"<iso>","new":N,"sharpened":M}' >> ledger.jsonl
bin/pool lint && bin/pool index
```

Report: new primitives (with ids), entries sharpened, candidates rejected as
duplicates, new pool total, and whether `stats` crossed a structure threshold.
