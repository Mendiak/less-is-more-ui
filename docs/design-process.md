# Interface Design Process

Follow this process when generating interfaces.

## Step 1 — Define the main task

Identify the primary purpose of the interface.

Examples:

- reading content
- exploring data
- submitting a form
- navigating information

The layout should revolve around this task.

---

## Step 2 — Construct the grid

Define the structure before writing components, following Müller-Brockmann:

- **Columns:** 12 on desktop, 6 on tablet, 4 on mobile.
- **Gutters:** one value from the spacing scale (16px desktop, 8px mobile).
- **Baseline:** an 8px vertical rhythm. Every line-height and gap lands on it.
- **Placement:** use grid spans, not arbitrary widths.

Prefer a single-column reading measure inside the grid. Avoid unnecessary nesting of containers.

---

## Step 3 — Typography first

Let typography define the hierarchy.

Use:

- clear headings
- readable paragraph text
- limited font variations

---

## Step 4 — Use whitespace

Whitespace improves:

- readability
- focus
- structure

Avoid dense layouts.

---

## Step 5 — Simplify

After generating the interface:

- remove unnecessary elements
- reduce visual noise
- increase whitespace
- keep only essential components

---

## Step 6 — Polish the details

"God is in the details." — Mies van der Rohe.

A minimalist interface requires precise execution. Ensure all interactive elements feel high-quality through subtle micro-interactions.

- Add `transition: 0.2s ease-in-out` for all `:hover` and `:focus` states.
- Ensure consistent focus states for keyboard navigation.
- Refine padding and margins to follow a consistent 8px or 12px grid.