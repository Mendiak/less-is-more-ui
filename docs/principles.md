# Design Principles

## Less Is More

Inspired by Ludwig Mies van der Rohe.

Reduce elements to the essential.  
Every UI component must justify its presence.

If removing an element does not break the interface, remove it.

---

## Form Follows Function

Inspired by Louis Sullivan.

Interface elements must exist only if they serve a clear purpose.

Ask:

- What function does this element serve?
- Does it help the user accomplish a task?
- Does it improve clarity?

If not, remove it.

---

## Less But Better

Inspired by Dieter Rams and Jony Ive.

Good design is:

- useful
- understandable
- unobtrusive
- long-lasting
- instinctively simple

Avoid visual excess.

---

## Typography

Typography should carry the visual hierarchy.

Prefer:

- strong headings
- readable body text
- maximum two font families

---

## Subtle Color Palettes

Colors should support the interface without dominating it.

Recommended approach:

- neutral base colors
- soft accent colors
- muted tones

Avoid highly saturated or neon colors.

---

## Honest Materials (Semantic HTML)

Inspired by the modernist respect for materials.

In web design, "materials" are HTML elements. Do not hide structure behind excessive `<div>` nesting. Use elements for their intended purpose.

Prefer:
- `<main>` for primary content.
- `<nav>` for navigation.
- `<header>` and `<footer>` for structure.
- `<article>` and `<section>` for content organization.
- `<button>` for actions, `<a>` for navigation.

---

## Key elements (what to use)

Use only the UI elements needed to support the task. Prefer simple, consistent patterns.

### Layout

- grid-based layouts (rows + columns) for clear structure
- generous whitespace / padding to separate sections
- consistent alignment (left, center, right) across elements

### Navigation

- simple, predictable navigation bars or tabs
- clear labels and focus states
- avoid deep nested menus when possible

### Controls

- primary actions as a single, prominent button
- secondary actions as subtle text links or small buttons
- inputs with clear labels, placeholder text, and visible borders

### Content containers

- cards or panels with subtle borders / elevation
- headings that establish hierarchy (H1, H2, H3)
- concise paragraphs and bulleted lists for scannability

### Feedback

- immediate response to user actions (button states, loading indicators)
- minimal but clear error messages and confirmations
