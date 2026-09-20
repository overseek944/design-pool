# design-pool

A vocabulary of CSS, styling, motion and shader primitives mined from
high-quality websites. Source-free and atomic: nothing here records which site
it came from, so nothing here can be cloned — only composed.

Point any coding agent at this repo and it can design from a curated palette
instead of its own generic priors.

```bash
bin/pool stats                  # size, saturation, restructure threshold
bin/pool query --tags glow      # find primitives
bin/pool near masked-line-rise  # primitives in the same aesthetic region
bin/pool show <id>              # read one
bin/pool check <id> <id> ...    # does this combination cohere?
```

Agents: read `AGENTS.md`. Humans: read `axes.md` then browse `primitives/`.
