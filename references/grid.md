# Grid Systems

Based on Josef Müller-Brockmann, *Grid Systems in Graphic Design* (1961).

> "The grid system is an aid, not a guarantee."

The grid is an ordering system. It decides where things go before you decide how they look. In the final interface it is invisible: you feel the order, not the structure.

## Construct the grid first

Before writing components, define four values:

1. **Columns** — 12 on desktop, 6 on tablet, 4 on mobile.
2. **Gutter** — one value from the spacing scale. `--space-2` (16px) on desktop, `--space-1` (8px) on narrow screens.
3. **Margins** — the outer breathing room, taken from the spacing scale.
4. **Baseline** — the vertical rhythm. `--space-base` is 8px; every line-height and vertical gap should land on a multiple of it.

## Place with spans

Use the grid to position regions. Never give layout regions fixed pixel widths.

```css
.layout {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--space-2);
}

.content { grid-column: span 8; }
.aside   { grid-column: span 4; }
.full    { grid-column: 1 / -1; }
```

## Baseline rhythm

A grid is also vertical. For an 8px baseline:

| Text size | Line-height | Line box |
|-----------|-------------|----------|
| 12.8px (`--step--1`) | 1.25 | 16px |
| 16px (`--step-0`) | 1.5 | 24px |
| 20px (`--step-1`) | 1.2 | 24px |
| 24px | 1.333 | 32px |

Spacing between blocks should also come from the scale: 8, 16, 24, 32, 48.

## Responsive reduction

Reduce the number of columns instead of compressing them:

- 12 columns → 6 at tablet → 4 at mobile.
- Keep the same gutter logic. Do not introduce a second grid.
- Let content spans collapse to `1 / -1` on narrow screens.

## Rules

- Define the grid before the first component.
- Use spans and `gap`; avoid `width`, `margin-left` and magic numbers for placement.
- Keep one baseline for the whole page.
- Keep the grid invisible. Never render grid lines as decoration.
- Break the grid only for a functional reason, such as full-bleed media.

## Anti-patterns

- Five-column or arbitrary grids with no mathematical relationship.
- Nested grids with different gutters.
- Centering everything as a substitute for alignment.
- Optical nudges accumulated until the layout no longer lines up.
- Visible grid lines, cards or borders used to fake structure.
