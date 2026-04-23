# Animation & Micro-interactions

Minimalism rejects unnecessary visual noise, but the interface must still feel responsive, alive, and functional. Animations should be used strictly to provide feedback or spatial context.

## Core Principles for Animations

1. **Subtle and Fast**: Animations should never make the user wait. Keep transitions between `100ms` and `200ms`.
2. **Functional, Not Decorative**: Only animate elements to show a change in state (e.g., hover, focus, loading, opening/closing).
3. **Opacity over Movement**: Prefer fading elements in and out rather than sliding them across the screen. If movement is needed, keep the distance very short (e.g., `translateY(2px)`).

## Hover and Focus States

Provide immediate visual feedback when interacting with clickable elements.

```css
/* Quick, subtle background and text color changes */
.button {
  transition: background-color 150ms ease, color 150ms ease;
}

/* Subtle elevation (using borders/opacity, not heavy shadows) */
.card-interactive {
  transition: border-color 150ms ease, opacity 150ms ease;
}
.card-interactive:hover {
  border-color: #a0a0a0;
}
```

## State Changes (Opening / Closing)

When revealing hidden content (like a dropdown or modal), avoid bouncy or elastic easings. Use a crisp `ease-out` or `ease-in-out`.

```css
/* Clean fade-in for modals or dropdowns */
.dropdown {
  opacity: 0;
  visibility: hidden;
  transition: opacity 150ms ease-out, visibility 150ms ease-out;
}

.dropdown.is-open {
  opacity: 1;
  visibility: visible;
}
```

## Anti-patterns in Animation

- ❌ Bounce or elastic easings.
- ❌ Long animations (>300ms) that block the user.
- ❌ Continuous pulsing or shaking elements.
- ❌ Complex staggering effects on list items.
