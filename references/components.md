# Modernist Component Guide

Follow these minimal patterns to ensure consistency and lack of noise. Always use semantic HTML.

## 1. Buttons (Form Follows Function)
Avoid gradients and heavy shadows. Use border, background, and padding for clarity.

```html
<button class="button button--primary">Save Changes</button>
<a href="#" class="button button--secondary">Cancel</a>
```

```css
.button {
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  font-family: inherit;
  font-size: var(--step-0);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.button--primary { 
  background-color: var(--ui-text);
  border: 1px solid var(--ui-text);
  color: var(--ui-bg);
}

.button--primary:hover { 
  background-color: var(--ui-text-para);
  border-color: var(--ui-text-para);
}

.button--secondary {
  background-color: transparent;
  border: 1px solid var(--ui-border-strong);
  color: var(--ui-text);
}

.button--secondary:hover {
  border-color: var(--ui-text);
  background-color: var(--ui-surface-alt);
}
```

## 2. Form Inputs (Honest Materials)
Clear borders and generous spacing. Focus states must be accessible but not glowing.

```html
<div class="form-group">
  <label for="email" class="label">Email Address</label>
  <input type="email" id="email" class="input" placeholder="name@example.com">
</div>
```

```css
.form-group {
  margin-bottom: var(--space-3);
}

.label {
  display: block;
  margin-bottom: var(--space-1);
  font-weight: 500;
  color: var(--ui-text);
}

.input {
  width: 100%;
  padding: var(--space-2);
  border: 1px solid var(--ui-border-strong);
  background: var(--ui-surface);
  font-family: inherit;
  font-size: var(--step-0);
  transition: border-color 150ms ease;
}

.input:focus {
  outline: none;
  border-color: var(--ui-text);
}
```

## 3. Cards & Containers (Structure)
Use subtle borders or background shifts. Avoid "floating" cards with large shadows.

```html
<article class="card">
  <h2 class="card-title">Project Overview</h2>
  <p class="card-text">A brief summary of the current project status.</p>
  <div class="card-actions">
    <button class="button button--secondary">View Details</button>
  </div>
</article>
```

```css
.card {
  padding: var(--space-4);
  border: 1px solid var(--ui-border-silent);
  background-color: var(--ui-surface);
  /* NO box-shadow used to maintain flatness and simplicity */
}

.card-title {
  margin-top: 0;
  margin-bottom: var(--space-2);
  font-size: var(--step-1);
  font-weight: 600;
}

.card-text {
  color: var(--ui-text-para);
  margin-bottom: var(--space-3);
}
```

## 4. Typography Hierarchy
Use size and weight, not color, to separate information.

```css
h1 { font-size: var(--step-5); font-weight: 700; margin-bottom: var(--space-3); color: var(--ui-text); }
h2 { font-size: var(--step-2); font-weight: 600; margin-bottom: var(--space-2); color: var(--ui-text); }
p { font-size: var(--step-0); color: var(--ui-text-para); line-height: 1.6; }
```

## 5. Icons (Functional Symbols)
Use icons only when they provide immediate clarity that text alone cannot. Follow a geometric, consistent style (like Lucide).

- **Geometric:** Use thin, consistent stroke weights (e.g., 1.5px or 2px).
- **Functional:** Never use icons as purely decorative elements.
- **Subtle:** Icons should be smaller than or equal to the associated text size.

```css
.icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  vertical-align: middle;
}
```
