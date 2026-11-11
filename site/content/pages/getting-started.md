Less Is More UI ships in two forms: an agent skill that teaches an AI assistant how to design, and a CSS package that applies the same decisions in code. Both use one set of tokens.

## As an AI agent skill

Install the skill into your project:

```bash
npx skills add Mendiak/less-is-more-ui
```

The skill adds a set of instructions and references to your agent. From then on, requests such as "build a settings page" or "review this form" are answered with the axioms, the spacing scale and the component patterns applied by default.

Ask for the behaviour you want, not for a style:

```text
Apply the less-is-more-ui principles to this dashboard.
Prioritise the data, remove decorative containers and establish hierarchy with type.
```

## As a CSS design system

```bash
npm install @mendiak/less-is-more-ui
```

Then import everything, or only the parts you need:

```css
/* Everything: tokens + reset + components */
@import "@mendiak/less-is-more-ui";

/* Or individually */
@import "@mendiak/less-is-more-ui/references/tokens.css";
@import "@mendiak/less-is-more-ui/assets/css/reset.css";
@import "@mendiak/less-is-more-ui/assets/css/components.css";
```

## What is included

| File | Purpose |
|------|---------|
| `references/tokens.css` | Modular type scale, 8px spacing scale, neutral palette, semantic aliases and dark/light themes |
| `assets/css/reset.css` | Minimal box-sizing reset and base element normalisation |
| `assets/css/components.css` | Buttons, inputs, cards, navigation, filters, specification lists and icons |
| `index.css` | Entry point that imports the three files above |

## First steps

1. Read the [principles](/less-is-more-ui/docs/principles/) and decide which of the six axioms your current interface violates most.
2. Replace hard-coded sizes and colours with the semantic tokens (`--ui-text`, `--space-2`, `--step-0`).
3. Run the [subtractive pass](/less-is-more-ui/notes/the-subtractive-pass/) on one screen before touching the rest.
4. Check the result against the [accessibility rules](/less-is-more-ui/docs/accessibility/).

## Requirements

The stylesheet uses custom properties and `color-scheme` support, which every current browser implements. No build step and no JavaScript are required; the showcase uses a little JS for the theme toggle and for copy buttons, and the design works without it.
