Less Is More UI is not a utility framework and it is not a component library in the Bootstrap sense. It is a small set of decisions — tokens, a reset, and a handful of components — that keep an interface calm. Comparing it to Tailwind or Bootstrap is only useful if the comparison is about the problem each one solves.

## At a glance

| | Less Is More UI | Tailwind CSS | Bootstrap |
|---|---|---|---|
| **Model** | Design tokens plus opinionated patterns | Utility classes | Component library |
| **Size** | ~12 KB of CSS, no build step | Build step and a generated stylesheet | ~200 KB with JS components |
| **Customisation** | Change tokens | Configure the theme | Override variables and components |
| **Opinionated** | Strongly, about restraint | Neutral; the team decides the look | Strongly, about a familiar look |
| **JavaScript** | None required | None | Required for most components |
| **Best for** | Calm content and product UI where hierarchy comes from type | Teams that want utilities and full control | Fast prototypes of conventional interfaces |

## What this system does well

- **Hierarchy from typography and space.** The scale, spacing and baseline are defined once, so pages stay coherent as they grow.
- **A small, memorable vocabulary.** Six axioms and a dozen components are easier to apply consistently than a full framework.
- **No build step.** Import three files and you are done; the CSS is readable and meant to be read.
- **Agents and humans share the same rules.** The rules are written down as prose, which is what makes the skill version useful.

## Where Tailwind is the better choice

Tailwind is a tool for people who already know what they want to build. It gives you the primitives and gets out of the way; the consistency comes from your team's conventions, not from the framework. If you have a design system of your own, or a team comfortable owning one, Tailwind will not fight you.

This project makes more decisions for you. That is an advantage on a small team and a limitation on a large one with an established visual language.

## Where Bootstrap is the better choice

Bootstrap is a complete, familiar product with modals, carousels, forms and accessibility behaviour already implemented and tested. If you need a conventional admin interface next week, Bootstrap is faster and its components are more complete.

The trade-off is the opposite of this system's premise: Bootstrap's default look is recognisable, and the work of making it feel like your product usually means overriding a large part of it.

## When not to use Less Is More UI

- **Data-dense applications** — dashboards, tables with dozens of columns, and tools where density is a feature. Minimalism here can hide information that experts rely on.
- **Marketing pages that need visual persuasion** — large imagery, motion and expressive colour are legitimate there. This system will make them quiet, which may not be the goal.
- **Teams without design ownership** — no system replaces the need to decide what matters on a screen.

## Using them together

Nothing prevents combining approaches. The tokens are plain custom properties and can sit alongside Tailwind's theme; the reset is small enough to be replaced by your own; the components are plain CSS classes that can be scoped.

The part worth keeping in any stack is the reasoning: one grid, one spacing scale, one accent colour, and a default answer of "remove it" when an element cannot justify itself.

Start with the [documentation](/less-is-more-ui/docs/) and decide after the principles, not after the screenshots.
