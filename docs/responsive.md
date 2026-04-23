# Reductive Responsive Design

In a minimalist design system, responsive design is not about stacking everything in a single column on small screens. It is about **reduction**.

## The Philosophy of Reduction

When the screen gets smaller, do not just make elements smaller or pile them up. Ask: **What can be hidden? What is secondary?**

1. **Prioritize Content**: The main task must remain perfectly clear. Secondary actions or meta-information can be tucked away.
2. **Avoid Clutter**: A crowded mobile screen is stressful. Maintain generous whitespace, even on mobile.

## Implementation Strategies

### 1. Hide Secondary Information
On smaller screens, consider hiding non-essential text labels, dates, or secondary stats, keeping only the primary data.

```css
.meta-info {
  display: block; /* Desktop */
}

@media (max-width: 768px) {
  .meta-info {
    display: none; /* Hide on mobile to maintain clean UI */
  }
}
```

### 2. Simplify Navigation
Instead of a hamburger menu that reveals a massive list of links, prioritize the 2-3 most important actions. Move the rest to a dedicated "Settings" or "More" view.

### 3. Maintain Touch Targets
Even if the screen is small, buttons and inputs must remain large enough for touch (minimum `44px` or `48px` tall). Do not shrink the padding inside interactive elements.

```css
.button {
  padding: 12px 24px; /* Ensure sufficient height for touch */
  width: 100%; /* Often full width on mobile for easier tapping */
}

@media (min-width: 768px) {
  .button {
    width: auto; /* Fit content on desktop */
  }
}
```

### 4. Fluid Typography
Use fluid typography or step down font sizes cleanly so headings don't overwhelm the screen, but maintain strong contrast in font weights to preserve hierarchy.
