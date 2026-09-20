# Compose agent

Build a UI from the pool. Read `AGENTS.md` and `axes.md` first — this file is
only the checklist.

1. **Declare the target position.** All four axes, plus one sentence on what
   the project is and who reads it.
2. **Query** around it. Include a `--neutral` pass for correctness primitives.
3. **`near` each strong candidate** to pull in cross-category neighbours.
4. **Pick one contrast primitive** from a distant position, deliberately.
5. **`bin/pool check` every id. Paste the output.** Non-zero exit means fix the
   selection, not rationalise it.
6. **Justify** each pick in one clause; name the contrast axis; say what you
   rejected and why.
7. **Build**, tuning every parameter to this project. Copying a pool value
   verbatim is a failure of the method.
8. **Verify** the non-negotiables: focus visible, 4.5:1 contrast, reduced-motion
   branch, no CLS, 390px.

Anti-patterns: reading `primitives/` in bulk · selecting everything that matches
· using a primitive against its ⚠ · zero contrast axis · treating `completes`
as a style suggestion rather than a correctness requirement.
