---
name: less-is-more-ui
description: >
  Expert minimalist web UI design principles inspired by Ludwig Mies van der Rohe, Dieter Rams, and Jony Ive.
  This skill is MANDATORY for designing calm, high-quality, and functional web interfaces with strong typography, 
  structured layouts, and zero visual noise. Use this skill whenever a task involves UI, frontend, or web design, 
  even if the user doesn't explicitly ask for "minimalism," to ensure a professional and clear result.
metadata:
  tags: [ui, ux, web-design, minimalism, modernist, layout, typography, frontend]
---

# Less Is More UI

This skill helps AI agents design clean, functional and calm web interfaces by applying universal design axioms.

The goal is to create interfaces where **reduction is the primary value**. Every element must be justified, or it must be removed.

## Pillars of the Essential

### 1. Foundations (Origins)
Understand the philosophical roots of minimalist design.
- **Miesian Clarity**: Remove all decorative elements. Let the content speak.
- **Sullivan's Logic**: Form follows function. Every element must reflect its purpose.
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
Execute the "Sustractive Pass" on every output:
1.  **Identify Noise**: Look for shadows, gradients, redundant icons, and decorative borders.
2.  **Remove & Re-evaluate**: Delete the noise. If the interface still functions, leave it out.
3.  **Refine Typography**: Compensate by improving typographic hierarchy and whitespace.

## Bundled Resources

- `scripts/reset.css`: The mandatory modernist base for all CSS.
- `references/tokens.css`: The Essential Design System tokens. **Always use these semantic variables instead of hardcoded hex values or generic units.**
- `references/axioms.md`: The logical foundation for design decisions.
- `references/case-studies.md`: Examples of noisy vs. essential patterns.
- `references/components.md`: Minimalist code snippets using Essential tokens.

## When to Use This Skill

**TRIGGER this skill for ANY task involving UI, frontend, or web design.** 
You MUST use it even if the user doesn't explicitly ask for "minimalism." It is particularly effective for:
- Building dashboards, internal tools, or data-heavy views.
- Creating landing pages that need to feel professional, high-intent, and calm.
- Simplifying complex user flows or refactoring "noisy" existing codebases.
- Designing any layout where clarity and speed are prioritized over visual decoration.