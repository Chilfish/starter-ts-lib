# Writing style

Applies to the README, `docs/`, `CHANGELOG.md`, code comments, script output, CI messages, pull requests, and issues. The goal is to state things clearly: no selling, no flourishes, no jargon.

## Tone

- Write facts and actions: what is true now, why, and how to do it. No vision statements or "we believe".
- One idea per sentence. Split anything that runs long, or turn it into a list.
- Prefer concrete subjects: page, script, route, component, store.
- Do not draw conclusions for the reader. State limits and trade-offs and let them judge.
- Numbers the author cannot verify are marked with a date, or left out.

## Word choice

- No stacked adjectives: intuitive, powerful, effortless, deep, seamless, one-stop, at a glance, perfect.
- No product or design jargon: enable, close the loop, anchor, narrative, reduce noise, granularity, align as a verb.
- No slogan pairs: "not A but B", "more than A, B", "from A to B".
- No filler: "it is worth noting", "it is easy to see", "as everyone knows".
- Do not translate English idioms literally. Describe the actual thing.

## Sentences and punctuation

- Use a dash sparingly. At most once per paragraph.
- Headings are noun or verb phrases, never questions.
- List items share one grammatical shape, one idea each. Three short lines beat one long paragraph.
- Link text says where it points (`docs/engineering/git-workflow.md`), not "click here" or "see above".

## Interface copy

- Buttons and labels are verbs or noun phrases: `Save settings`, `Clear filters`, `Retry`.
- Empty states say three things: what this is, why it is empty, and what to do next. Not just "No data".
- Error messages give the next step (retry, check the configuration, read the log), not only an exception name.
- Do not explain obvious interactions and do not describe the same number twice.
- Numbers carry units: `3 records`, `1.2 MB`, `150 ms`.

## Terminology

One concept, one word. Pick the word, then use it in both docs and code.

| Use | Avoid | Meaning |
| --- | --- | --- |
| gate | check, validation (mixed) | the fixed typecheck / lint / build / test combination |
| export surface | public API (mixed) | what `package.json#exports` publishes |
| artifact | output, bundle (mixed) | files produced by the build in `dist/` |
| contract | spec, rule (mixed) | a checkable statement about the package |

## Documentation is the truth

- Paths, commands, routes, and field names in the docs must match the current code. Run them if unsure.
- When renaming files, routes, or script arguments, search for the old form before committing.
- Do not write plans as if they were current state. Unfinished work goes in a backlog or todo file; the main text states only what already holds.
- Screenshots, numbers, and performance figures carry a date. Replace or delete stale images instead of leaving broken links.
- The documentation index lists only files that exist. Update `docs/README.md` when adding, moving, or deleting a document.

## Bad examples

| Bad | Rewrite |
| --- | --- |
| An out-of-the-box, effortlessly elegant scaffold. | A scaffold with routing, theme, component, and test configuration. |
| Not a lack of features, but a lack of experience. | The features are enough; what is missing is interaction detail. |
| Homepage noise reduction and overflow fix. | Homepage layout and overflow fix. |
| It is worth noting that the loader runs first. | The loader runs before the page renders. |
| No data. | No records yet. The first one will show up here. |
| Click here to open settings. | Open settings. |

## Working with AI

- Do not restate the obvious. No "in summary" boilerplate.
- Report verification as it happened: which command ran, pass or fail, and what was not run and why.
- Write "not verified" when unsure. Do not guess numbers, durations, or effects.
- Do not use "done" to hide what was not verified.

## Before committing

```bash
# Hits are for human review; not every match needs a change.
rg -n "seamless|effortless|powerful|one-stop|at a glance|close the loop|leverage|robust|cutting-edge" README.md docs
```

- Can a new paragraph be summarized in one sentence? If not, split it.
- Can an adjective be deleted without losing information? If so, delete it.
- Does interface copy say what it is, why, and the next step?
- Does every number carry a unit, a date, and a source?
- Do the paths, commands, and routes in the docs still match the code?
