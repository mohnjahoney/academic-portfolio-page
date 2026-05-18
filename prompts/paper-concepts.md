# Paper Concept Summaries

You are generating an interpretive concept layer for an academic paper portfolio.
The output is not citation metadata and should not read like an abstract.
It should help a curious reader understand what conceptual door the paper opens.

Use only the supplied paper data.
Do not invent results, applications, collaborators, institutions, or historical context.
If the supplied abstract is not enough to support a claim, make the language more cautious.

## Audience

Write for a curious, educated non-specialist.
Avoid unnecessary jargon.
When technical terms are central to the paper, keep them but surround them with plain-language context.
Avoid hype, sales language, and claims that the paper "solves" more than the source supports.

## Generation Order

Generate `pitch` and `detail` first.
Then derive `doorway`, `question`, `reframe`, and the playful fields from that interpretation.
Do not output intermediate reasoning.

## Output Shape

Return one JavaScript object entry keyed by paper ID:

```js
'paper-id': {
  doorway: '',
  question: '',
  reframe: '',
  pitch: '',
  detail: ``,
  haiku: ``,
  limerick: ``,
  aphorism: '',
  koan: ''
}
```

## Serious Fields

`doorway`

- One short sentence.
- 8 to 22 words.
- Give the reader an extremely high-level orientation.
- Do not simply restate the title.
- Prefer plain language over technical completeness.
- This should feel like a doorway into the idea.

`question`

- One short question.
- 8 to 22 words.
- Frame the puzzle, tension, or curiosity that motivates the paper.
- Use plain language where possible.

`reframe`

- One short sentence.
- 8 to 24 words.
- Express the conceptual takeaway or how the paper changes the reader's perspective.
- This can be slightly more technical than `doorway`, but should still be readable.

`pitch`

- Three to four sentences.
- Give minimal context, the central problem, and what the paper contributes.
- Mention a technical term only when it is essential.

`detail`

- Two or three short paragraphs.
- Explain the conceptual setup, the paper's move, and the takeaway.
- Keep paragraphs compact.
- Stay interpretive but grounded in the supplied title and abstract.

## Playful Fields

`haiku`

- Three lines.
- Aim for the spirit of a haiku rather than perfect syllable counting.
- It should still summarize the paper in miniature, not just decorate it.

`limerick`

- Five lines.
- Playful but not flippant.
- It should preserve a recognizable idea from the paper.
- Do not force a perfect rhyme if doing so distorts the paper.

`aphorism`

- One memorable sentence.
- Compact, sharp, and conceptually faithful.
- It may be poetic, but it should not become vague.

`koan`

- One short koan-like question or statement.
- It should create productive conceptual tension.
- Avoid parody; keep it quiet, strange, and connected to the paper.

## Style Checks

Before finalizing, check that:

- The doorway is not a subtitle or a copied phrase from the title.
- The question creates curiosity without overpromising.
- The reframe states a real conceptual shift supported by the paper data.
- The pitch can be understood without reading the abstract.
- The detail field does not add unsupported claims.
- The playful fields are clearly playful but still connected to the paper.
- The generated text can be pasted into `paperConcepts.js` without additional formatting work.
