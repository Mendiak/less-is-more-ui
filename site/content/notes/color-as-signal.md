On a neutral page, colour is the loudest thing you can add. That is precisely why it should be scarce: a signal only works if it is rare enough to mean something.

Most interfaces use colour as a second layer of decoration. Gradients mark containers, badges mark states that do not change behaviour, brand hues appear in five places at once. The result is a page where everything is emphasised, which is another way of saying nothing is.

## The three jobs of colour

In a restrained interface, colour has three legitimate jobs.

**State.** Error, success, warning, selected, disabled. These are conditions the user must be able to detect without reading. A single red for destructive conditions and a single muted accent for active state is usually enough.

**Identity.** A brand colour used in one place — a mark, a primary action, a link — establishes authorship without turning the interface into an advertisement for its palette.

**Legibility.** Selection highlight, focus ring and link treatment are colour doing functional work. They should meet contrast requirements before they meet brand requirements.

Everything else is decoration. A coloured section header, a tinted card, a gradient button and a "new" badge in three different hues are not three signals; they are three claims competing for the same attention.

## One accent, one meaning

The strongest pattern in minimalist systems is a single accent colour used sparingly. The accent becomes a vocabulary word: when the user sees it, something requires attention or action.

That works only if the accent is not also used for aesthetics. If the accent appears on the logo, the active tab, the primary button, the section label and a decorative underline, the user learns to ignore it. If it appears only on the one element that is genuinely active or urgent, the user learns to look for it.

The showcase's [colour restraint case study](/less-is-more-ui/#case-studies) compares a dashboard with five coloured badges against the same dashboard with one accent applied to the only row that needs attention. The difference is not taste; it is how much the user has to decode.

## Neutral does not mean grey

A common failure of "minimal" palettes is a page built entirely from mid-greys, which reads as disabled rather than calm. Neutrals need range: near-black for primary text, a mid tone for secondary text, a light tone for rules and surfaces. The contrast between them is what creates hierarchy.

In this system the tokens encode that range rather than exposing arbitrary greys:

```css
--ui-text: var(--gray-0);
--ui-text-muted: var(--gray-40);
--ui-text-dim: var(--gray-60);
--ui-border-silent: var(--gray-94);
--ui-accent: var(--vignelli-red);
```

Semantic names matter more than the values. `--ui-text-muted` survives a redesign; `#666666` does not.

## Dark mode is not an inversion

Flipping light values to dark ones produces glare: pure white text on pure black vibrates, and saturated accents become fluorescent. A dark theme needs its own decisions — slightly reduced text weight, a softer white, borders that are visible without becoming lines.

The rule stays the same: the accent should be one of the few chromatic elements on the screen. Dark mode is a change of values, not a change of role.

## Accessibility is the constraint, not the afterthought

Colour used as signal must also be readable. Text at 4.5:1 against its background, non-text indicators at 3:1, and never colour alone: an error needs a message and an icon or weight change, not just a red border. The [accessibility guide](/less-is-more-ui/docs/accessibility/) covers the specifics.

This is where minimalist palettes often fail in practice. A beautiful light grey label at 3:1 is not calm; it is unreadable for a meaningful part of the audience. Restraint applies to the number of colours, not to the contrast between them.

## A practical rule

Before adding a colour to a component, answer: *what condition does this colour report?* If the answer is "none, it just looks better", the component should use text, weight, spacing or a border instead.

The interface will lose some visual variety. It will gain something more useful: a palette the user can actually read.
