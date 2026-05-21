# Minimalist Accessibility (A11y)

Minimalism must never come at the cost of inclusion. A truly functional interface is accessible to everyone. In modernist design, clarity is the goal, and accessibility is the ultimate expression of clarity.

## 1. Contrast and Color

Minimalism often leans towards subtle grays, but readability requires strict contrast.

- **Text Contrast**: Maintain a minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text.
- **Interactive Elements**: Ensure that borders and icons used to convey meaning (like status indicators) meet the **3:1** contrast ratio against the background.
- **Don't Rely on Color Alone**: Use typography (weight, size) or subtle underlines to indicate links and states, ensuring the UI remains functional for color-blind users.

## 2. Visible Focus States

Focus indicators are often removed for "cleanliness," which breaks keyboard navigation.

- **The Modernist Focus**: Instead of browser-default blue rings, use the system's strict borders or a high-contrast outline that respects the design's geometry.
- **Implementation**: 
  ```css
  /* Example: A clean, high-contrast focus state */
  .input:focus, .button:focus {
    outline: 2px solid var(--ui-text);
    outline-offset: 2px;
  }
  ```

## 3. Touch and Click Targets

White space is a design tool, but it also serves a functional purpose for physical interaction.

- **Minimum Size**: All interactive elements (buttons, links, menu items) must have a minimum target size of **44x44px** (WCAG) or **48x48px** (recommended).
- **Spacing**: Ensure enough "void" between clickable elements to prevent accidental triggers.

## 4. Semantic Structure (Honest HTML)

A minimalist UI is easiest to navigate when its underlying structure is honest and logical.

- **Heading Hierarchy**: Use `<h1>` through `<h6>` in sequential order. Do not skip levels for styling purposes.
- **Landmarks**: Use `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` to provide a clear map for screen readers.
- **Alt Text**: Every functional icon or image must have descriptive `alt` text. Decorative elements (which should be rare in this system) should have `alt=""`.

## 5. Form Clarity

Avoid the "floating" minimalist input look that hides labels or boundaries.

- **Persistent Labels**: Never use placeholders as a replacement for `<label>`. Labels must remain visible to provide context at all times.
- **Error States**: Communicate errors clearly using text and high-contrast borders, not just color shifts.

## 6. Motion Sensitivity

Respect the user's preference for reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-delay: -1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    background-attachment: initial !important;
    scroll-behavior: auto !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
}
```

## Checklist for A11y
- [ ] Does every text element pass the 4.5:1 contrast check?
- [ ] Can I navigate the entire interface using only the keyboard?
- [ ] Are focus states clearly visible and high-contrast?
- [ ] Are all touch targets at least 44x44px?
- [ ] Does the HTML structure follow a logical, semantic order?
