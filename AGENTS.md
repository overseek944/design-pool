# design-pool — agent entry point

A vocabulary of styling, motion and shader primitives mined from high-quality
websites. Every entry is **source-free**: nothing records which site it came
from, so nothing here can be cloned. Primitives are atoms to compose, never
layouts to reproduce.

This repo is navigable by tool, not by reading. **Do not read `primitives/`
wholesale.** Use the CLI.

```bash
bin/pool stats                    # size, distribution, current structure tier
bin/pool query --tags glow --max-cost 3
bin/pool near <id>                # closest in axis-space — combination candidates
bin/pool show <id> [id...]        # full text of specific primitives
bin/pool check <id> [id...]       # REQUIRED GATE — see below
```

## Read first

`axes.md` — the four aesthetic axes and the coherence rule. Everything below
assumes it.

## Build protocol

**1. Fix a position, not a mood.** Before querying, state target values on all
four axes and say what the project is. `energy 2, density 2, weight 4, finish 4
— a technical product page that should feel engineered and still.`

**2. Query, don't browse.** Pull candidates around that position:

```bash
bin/pool query --energy 1-3 --weight 3-5 --finish 4-5
bin/pool query --neutral --tags accessibility,correctness
```

**3. Expand with `near`.** For each strong candidate, run `bin/pool near <id>`.
This surfaces primitives in the same aesthetic region *across categories* —
where cross-domain recombination actually comes from. It is computed from axis
distance, not from any record of what appeared together, so it will suggest
combinations no site has ever shipped.

**4. Deliberately break the cluster once.** Pull exactly one primitive from a
distant axis position. A selection with no contrast axis is safe and forgettable.

**5. Run the gate.**

```bash
bin/pool check <every id you selected>
```

It verifies axis coherence, hard conflicts, correctness dependencies
(`completes`) and performance budget. **Paste its full output before writing
any code.** If it exits non-zero, fix the selection — do not proceed and do not
explain around it.

**6. State your reasoning.** Each chosen primitive, one clause on why, plus the
contrast axis and what you rejected. Then build.

**7. Parameters are ranges.** Every number in a primitive is a starting point
to tune. Two projects using the same primitive at the same value is a failure
of the method, not reuse.

## Hard rules

- Nothing in this repo records composition. `completes` is **correctness**
  ("this is broken without that"), `conflicts` is **technical incompatibility**,
  `tension` is **opposed intent**. None of them mean "these looked nice
  together somewhere" — that knowledge is deliberately absent so that
  composition is decided fresh every time.
- Honour every ⚠ line. They mark real accessibility and performance limits.
- `bin/pool query --rare` returns primitives seen in ≤2 sites. Reach for these
  when the work needs to be distinctive; common primitives are safe defaults.

## Non-negotiable regardless of selection

Visible keyboard focus · body text contrast ≥ 4.5:1 · a
`prefers-reduced-motion` branch · no layout shift on load · works at 390px.

## Growing the pool

`agents/harvest.md` — the brief for mining a new site. Run it with the site URL.
Never commit raw site assets; the harvester works in scratch and discards.

## Structure tiers

`bin/pool stats` reports the current tier and warns before a threshold.

| Primitives | Structure | Agent behaviour |
|---|---|---|
| < 100 | category dirs, flat | may read all of `MANIFEST.md` |
| 100–400 | + generated manifest | manifest + targeted `show` |
| 400+ | + sharded manifests | `query`/`near` only, never bulk read |

Projected ceiling is ~800 primitives at 500 sites — vocabulary saturates, it
does not grow linearly. Run `scripts/migrate.mjs` when `stats` says to.
