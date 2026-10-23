# Modernist Typography & Pairing

In a minimalist interface, typography is not just a carrier of information—it **is** the interface. When you remove shadows, gradients, and borders, the weight, scale, and rhythm of your type must carry the entire visual hierarchy.

## 1. The "Invisible" System Stack
For the ultimate minimalist approach, use the fonts already installed on the user's device. They require zero load time and feel native to the OS.

- **macOS/iOS**: San Francisco (SF Pro)
- **Windows**: Segoe UI
- **Linux**: Ubuntu / Cantarell
- **Android**: Roboto

**Modernist System Stack:**
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
```

## 2. Geometric Open-Source Alternatives
If a specific brand voice is needed, choose fonts with high legibility and geometric rigor.

- **Sans-Serif (Workhorses)**: 
    - **Inter**: Designed for screens, highly functional.
    - **Public Sans**: Strong, neutral, and stable.
    - **Space Grotesk**: For a more "Swiss" or technical feel.
- **Monospace (Utility)**: 
    - **JetBrains Mono**: Exceptional clarity.
    - **IBM Plex Mono**: Elegant and modernist.
- **Serif (Contrast)**:
    - **Playfair Display**: For high-end, editorial headers.
    - **Fraunces**: Soft but structured.

## 3. Typographic Pairing Patterns

### A. The "Swiss" Utility (Sans + Mono)
Highly functional, technical, and clean. Use Sans for content and Mono for metadata, labels, or secondary actions.
- **Primary**: Inter (Semi-bold)
- **Secondary**: JetBrains Mono (Regular)

### B. The Modernist Editorial (Serif + Sans)
Creates a sense of prestige and history while remaining clean.
- **Headers**: Playfair Display (Bold)
- **Body**: Public Sans (Regular)

### C. The Mono-Centric (Mono-only)
For developer tools or brutalist-minimalist designs.
- **Headers**: IBM Plex Mono (Bold)
- **Body**: IBM Plex Mono (Light/Regular)

## 4. Technical Constants

- **Line Height**: Use `1.5` for body text and `1.2` for headings. Never use unit-based line heights (like `24px`).
- **Letter Spacing**: 
    - Large Headers: `-0.02em` (tightens the visual impact).
    - Small Caps/Labels: `0.05em` (increases legibility).
- **Weight as Hierarchy**: Limit yourself to two weights (e.g., 400 and 600). Use size and whitespace to differentiate before adding more weights.

## 5. Implementation in Tokens
Reference these in your `tokens.css`:

```css
:root {
  --ui-font-sans: 'Inter', -apple-system, sans-serif;
  --ui-font-mono: 'JetBrains Mono', monospace;
  --ui-font-serif: 'Playfair Display', serif;
  
  --ui-leading-tight: 1.2;
  --ui-leading-body: 1.5;
  --ui-tracking-tight: -0.02em;
  --ui-tracking-wide: 0.05em;
}
```

## 6. Baseline Grid

Müller-Brockmann's grid is horizontal and vertical. A layout only has rhythm when text and spacing share one baseline.

Use an 8px baseline and make every `line-height` land on a multiple of it:

| Size | Line-height | Line box |
|------|-------------|----------|
| 12.8px | 1.25 | 16px |
| 16px | 1.5 | 24px |
| 20px | 1.2 | 24px |
| 24px | 1.333 | 32px |

Spacing between blocks should come from the same scale: 8, 16, 24, 32, 48.

If line boxes and gaps do not share the baseline, the page feels subtly unstable even when every element looks right on its own. See `references/grid.md` for the full construction method.
