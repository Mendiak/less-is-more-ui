---
name: less-is-more-ui
description: >
  Use when designing, refactoring, or reviewing web interfaces that should feel calm, precise,
  functional, and visually restrained. Applies minimalist UI principles inspired by Ludwig Mies
  van der Rohe, Louis Sullivan, Massimo Vignelli, Dieter Rams, and Jony Ive, with emphasis on
  strong typography, structured layouts, semantic HTML, restrained motion, and removal of visual
  noise.
metadata:
  tags: [ui, ux, web-design, minimalism, modernist, layout, typography, frontend]
---

# Less Is More UI

This skill helps AI agents design clean, functional, and calm web interfaces by applying universal design axioms.

The goal is to create interfaces where **reduction is the primary value**. Every element must be justified, or it must be removed.

## Pillars of the Essential

### 1. Foundations (Origins)
Understand the philosophical roots of minimalist design. Detailed in `docs/principles.md` and `docs/design-manifesto.md`.
- **Miesian Clarity**: Remove all decorative elements. Let the content speak.
- **Sullivan's Logic**: Form follows function. Every element must reflect its purpose.
- **Vignelli's Discipline**: Use grids, type, scale, and alignment as a complete visual system.
- **Rams' Systemic Simplicity**: Good design is understandable and unobtrusive.

### 2. Methodology (The Axioms)
Apply these universal laws (detailed in `references/axioms.md`) as your reasoning engine:
1.  **Justification**: Every pixel must earn its right to exist.
2.  **Typographic Dominance**: Typography is the interface. Use size and weight, not boxes.
3.  **Material Honesty**: No fake depth, shadows, or skeuomorphism.
4.  **Proximity and Void**: Whitespace is your most powerful structural tool.
5.  **The Silent Grid**: Alignment creates order without visible borders.
6.  **Paradox of Choice**: Limit options to increase clarity and intent.

### 3. Interface (Implementation)
Execute the "Subtractive Pass" and follow the process in `docs/design-process.md`:
1.  **Identify Noise**: Look for shadows, gradients, redundant icons, and decorative borders.
2.  **Remove & Re-evaluate**: Delete the noise. If the interface still functions, leave it out.
3.  **Refine Typography**: Compensate by improving typographic hierarchy and whitespace.

## Bundled Resources

- `index.html`: The "Museum of the Essential" - a live showcase and playground for all principles.
- `assets/css/reset.css`: The mandatory modernist base for all CSS.
- `assets/css/style.css`: The core implementation of the system's aesthetics.
- `references/tokens.css`: The Essential Design System tokens. **Always use these semantic variables instead of hardcoded hex values or generic units.**
- `references/axioms.md`: The logical foundation for design decisions.
- `references/case-studies.md`: Examples of noisy vs. essential patterns.
- `references/components.md`: Minimalist code snippets using Essential tokens.
- `docs/principles.md`: Deep dive into the philosophical foundations (Mies, Sullivan, Vignelli, Rams).
- `docs/design-manifesto.md`: The high-level vision for calm and rational interfaces.
- `docs/design-process.md`: Step-by-step methodology for building minimalist UIs.
- `docs/animations.md`: Standards for subtle, functional micro-interactions.
- `docs/accessibility.md`: How to maintain WCAG compliance without adding visual noise.
- `docs/typography.md`: Modernist pairing guides for system and open-source fonts.
- `docs/responsive.md`: How to handle smaller screens via reduction, not stacking.
- `docs/anti-patterns.md`: Fast checklist of visual noise to remove.
- `docs/design-checklist.md`: Final verification checklist before presenting a UI.

Load only the resources needed for the task. Start with `references/axioms.md` for reasoning,
`references/tokens.css` before writing CSS, and `references/components.md` before implementing
buttons, forms, cards, navigation, or other interface primitives. Use `index.html` as a reference
for the final visual quality expected.

## When to Use This Skill

Use this skill for UI, frontend, and web design tasks where clarity, restraint, and professional
polish matter. It is particularly effective for:
- Building dashboards, internal tools, or data-heavy views.
- Creating landing pages that need to feel professional, high-intent, and calm.
- Simplifying complex user flows or refactoring "noisy" existing codebases.
- Designing any layout where clarity and speed are prioritized over visual decoration.
