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
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.button--primary { 
  background-color: #1a1a1a; 
  border: 1px solid #1a1a1a;
  color: #fff; 
}

.button--primary:hover { 
  background-color: #333333; 
}

.button--secondary {
  background-color: transparent;
  border: 1px solid #d1d1d1;
  color: #1a1a1a;
}

.button--secondary:hover {
  border-color: #1a1a1a;
  background-color: #f9f9f9;
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
  margin-bottom: 1.5rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #1a1a1a;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d1d1;
  background: #fff;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 150ms ease;
}

.input:focus {
  outline: none;
  border-color: #1a1a1a;
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
  padding: 2rem;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  /* NO box-shadow used to maintain flatness and simplicity */
}

.card-title {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.card-text {
  color: #555555;
  margin-bottom: 1.5rem;
}
```

## 4. Typography Hierarchy
Use size and weight, not color, to separate information.

```css
h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem; color: #111; }
h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #111; }
p { font-size: 1rem; color: #444; line-height: 1.6; }
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
