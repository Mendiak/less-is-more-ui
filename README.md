# Less Is More UI

> "Good design is as little design as possible." — Dieter Rams

A specialized design skill for AI agents to generate calm, high-quality, and functional web interfaces. 

## The Problem
Most AI-generated UIs suffer from "visual noise": excessive shadows, generic gradients, and cluttered layouts. They often lack a clear typographic hierarchy and rational structure because LLMs tend to default to "over-designed" or generic components.

## The Solution
`less-is-more-ui` provides a set of modernist constraints that force the agent to prioritize content and function. It transforms the agent from a generic coder into a senior designer with a Miesian perspective, focusing on:

- **Rational Layouts:** Using grid systems and generous whitespace instead of decorative containers.
- **Typography-First Hierarchy:** Letting text carry the weight of the interface.
- **Subtle Palettes:** Using color to support, not dominate.
- **Systematic Spacing:** A predefined variable-based scale for consistent rhythm.

## Installation

Install using the skills CLI:

```bash
npx skills add Mendiak/less-is-more-ui
```

## How to Use with AI Agents

Once activated, you can direct your agent with high-level design intent. The agent will use the bundled resources (`principles.md`, `references/components.md`, etc.) to make informed decisions.

**Example Prompts:**
- *"Refactor this dashboard following the Less Is More manifesto."*
- *"Simplify this landing page. Use only the scale variables and remove all decorative elements."*
- *"Build a contact form using the 'Honest Materials' precept (semantic HTML only)."*

## Demo
Visit the [Museum of the Essential](https://mendiak.github.io/less-is-more-ui/) for a curated showcase of these principles in action.

## Repository Structure

- `SKILL.md` – Main entry point and agent instructions.
- `docs/principles.md` – Core design philosophy (Mies, Sullivan, Rams).
- `docs/design-manifesto.md` – High-level goals and aesthetic standards.
- `docs/design-process.md` – Step-by-step method for minimal interface design.
- `docs/accessibility.md` – Minimalist standards for inclusive design.
- `docs/typography.md` – Typographic pairing and technical standards.
- `docs/anti-patterns.md` – Visual friction to identify and remove.
- `docs/design-checklist.md` – Final UI quality verification.
- `assets/css/style.css` – The core design system implementation.
- `index.html` – The "Museum of the Essential" documentation and demo.
- `references/`
  - `axioms.md` – Foundational truths of minimal design.
  - `case-studies.md` – Analysis of successful minimal interfaces.
  - `components.md` – Pattern library for buttons, inputs, and cards.
  - `tokens.css` – Design tokens and scale variables.
- `evals/` – Performance benchmarks and evaluation sets.
- `assets/css/reset.css` – Tiny modernist reset for a clean start.

## Philosophy

1. **Less is more.** (Reduction to the essential)
2. **Form follows function.** (Logic over decoration)
3. **Less but better.** (Instinctive simplicity)

---

Developed for clarity and purpose by [Mendiak](https://github.com/Mendiak).
