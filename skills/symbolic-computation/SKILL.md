---
name: symbolic-computation
description: "When to reach for SymPy vs Wolfram|Alpha; standard patterns for simplify/solve/integrate/ODE; sanity-checking results."
---

# Symbolic computation

- **SymPy first** via `python_run` — reproducible, scriptable, free. Reach for Wolfram|Alpha only when SymPy stalls.
- Standard idioms: `simplify`, `solve`, `Eq(...)`, `integrate(expr, (x, a, b))`, `dsolve` for ODEs, `nsimplify` to recover closed forms from numeric.
- **Always sanity-check** a symbolic answer numerically at 2–3 points (`lambdify` + plug in floats).
- Show the SymPy input *and* its output in chat; never paraphrase the result.
- If an integral or ODE is intractable, say so explicitly and switch to numerical or asymptotic.
