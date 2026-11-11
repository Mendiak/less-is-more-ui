Most design review is additive. Someone suggests a shadow to separate two blocks, a badge to make a state clearer, a border to group a section. Each suggestion is locally reasonable. Together they produce an interface that is technically complete and visually exhausting.

The subtractive pass inverts the direction of the review. Instead of asking what is missing, it asks what is not needed — and it does so before anything is polished.

## Step 1 — Identify the noise

Look for elements that exist to fill space rather than to carry information:

- shadows and gradients whose only job is to make a block feel "lifted";
- borders around blocks that are already separated by space;
- icons beside labels that repeat the same word;
- decorative background patterns, dividers and rules;
- multiple accent colours used interchangeably;
- headings that restate the first sentence of the paragraph beneath them;
- empty containers — cards, panels, sections — that hold one line of text.

The list is not exhaustive, and the categories overlap. What matters is the question behind it: *what would break if this disappeared?*

## Step 2 — Remove and re-evaluate

Remove the candidate elements one at a time, not all at once. Removing everything at once produces a page that is clean and unusable, and it becomes impossible to know which removal caused the problem.

After each removal, ask:

1. Is the information still available?
2. Is the grouping still clear?
3. Is the hierarchy still readable at a glance?
4. Does the interaction still communicate its state?

If all four are yes, leave the element out. If one is no, you have found a functional requirement and the element can return — but often in a simpler form. A border that separated two sections can be replaced by a larger gap. A shadow that lifted a card can be replaced by a change of surface. An icon that distinguished a destructive action can be replaced by the word "Delete".

This step is where most reduction fails. It is easy to delete; it is harder to verify that the remaining structure still communicates.

## Step 3 — Restore with type and space

Removal leaves a page that is correct but flat. The third step is not to add decoration back; it is to make typography and spacing carry the hierarchy that the decoration used to fake.

Practical moves:

- increase the difference between heading levels rather than adding colour;
- set body text at a comfortable measure, around 65–75 characters, with line height around 1.5–1.6;
- use gaps from one scale (8, 16, 24, 32, 48) so that grouping is consistent;
- align related elements to one edge or one grid;
- use weight and case for labels instead of pills and badges;
- reduce the number of type sizes rather than increasing them.

The goal is a page where the eye can find the structure without any element announcing it. That is the [silent grid](/less-is-more-ui/notes/the-silent-grid/) in practice.

## A worked example

Take a release-notes block with a title, a date and a paragraph. The noisy version uses a card with a shadow, a coloured date pill, a border around the body and inconsistent gaps. The essential version uses a heading, a small uppercase meta line and body text, all on one baseline.

The essential version is not "less informative". Every fact is still there. What disappeared was the packaging, and with it the cognitive cost of decoding the package before reading the content.

## Run it on one screen

The pass is not a one-time redesign. It is a review habit that can be applied to a single screen in twenty minutes:

1. Screenshot the screen.
2. Circle every element that is not carrying information.
3. Delete one at a time and verify the four questions.
4. Rebalance with type and space.
5. Compare the screenshot in greyscale and at 200% zoom.

Repeat it whenever a screen starts to accumulate "just one more" element. Interfaces do not become noisy in one decision; they become noisy in twenty small ones that were never reviewed.

The full checklist lives in the [substractive method](/less-is-more-ui/#interface) section of the showcase.
