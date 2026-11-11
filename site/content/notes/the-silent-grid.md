A grid is usually presented as a drawing: columns, gutters, guides over a layout. That is a teaching aid. In a finished interface, a grid should be invisible. You should feel that the page is ordered without being able to point at the mechanism.

When the mechanism becomes visible — cards inside cards, dividers between every row, background colours marking sections — the grid has failed as a grid and been replaced by decoration.

## What alignment does that borders cannot

A border says: *these two things are separate*. Alignment says: *these things belong to the same system*. The first is local and repeated; the second is global and free.

Consider a product specification list. The noisy version uses a table with alternating row colours, a border around each cell and icons next to the labels. The essential version uses two columns of text aligned on the same left edge and a generous gap between rows. Both communicate the same facts. One of them requires the user to read past its structure; the other lets the structure disappear.

Alignment is also more robust. Borders multiply when content changes: a new row needs a new line, a new section needs a new container. Alignment scales because it is a property of the grid, not of the content inside it.

## Constructing the invisible grid

Following Müller-Brockmann, the grid is decided before anything is styled. Four numbers are enough:

1. **Columns** — 12 on desktop, 6 on tablet, 4 on mobile.
2. **Gutter** — one value from the spacing scale, usually 16px on desktop and 8px on narrow screens.
3. **Margins** — the outer breathing room, also from the scale.
4. **Baseline** — the vertical rhythm. In this system, 8px.

Placement is expressed as spans, never as fixed widths:

```css
.layout {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--space-2);
}

.content { grid-column: span 8; }
.aside   { grid-column: span 4; }
```

The important part is not the CSS. It is that there is one grid for the page, and every decision refers to it. A layout with five arbitrary column widths is not more flexible; it is a set of local decisions that no longer compose.

## The vertical grid is the one people forget

Horizontal alignment is easy to see. Vertical rhythm is what separates a page that looks designed from a page that looks assembled.

Every line box and every vertical gap should land on the same baseline. With an 8px base:

| Text size | Line height | Line box |
|-----------|-------------|----------|
| 12.8px | 1.25 | 16px |
| 16px | 1.5 | 24px |
| 20px | 1.2 | 24px |
| 24px | 1.333 | 32px |

Gaps then come from the same scale: 8, 16, 24, 32, 48. The difference between a 7px gap and an 8px gap is invisible in isolation and cumulative across a page. This is the point made by [Case Study 08](/less-is-more-ui/#case-studies): arbitrary spacing looks fine element by element and subtly unstable as a whole.

## When to break it

A grid is an aid, not a guarantee. Full-bleed images, editorial pull quotes and data visualisations can leave the grid for a functional reason. The rule is that breaking the grid must communicate something the grid cannot: scale, focus, or a change of mode. Breaking it because a heading looks better 13px to the left is not a design decision; it is a rounding error that will be copied into every future screen.

## A test

Take a screenshot of a page and blur it until the text is unreadable. The blocks that remain should still be aligned. If the blurred image looks like a scatter of rectangles, the order was being carried by borders, shadows or colour, and the grid was never doing the work.

Invisible structure is harder to demonstrate in a portfolio and easier to trust in use. That trade is the whole argument.
