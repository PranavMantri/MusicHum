# Hans Zimmer as a System

A simple Vite + React website that presents editable independent pages about Hans Zimmer's film-score production as a repeatable system. The visible site content is sourced from Markdown files in `content/`.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173/`.

## Build

```bash
npm run build
```

The production build is emitted to `dist/`.

## Editing Page Content

The main written content lives in Markdown files under `content/`, so you can edit the argument without touching React code:

```text
content/
  00-title-thesis.md
  01-introduction-style-vs-system.md
  02-abstract-core-inputs.md
  03-motifs-function-like-modules.md
  04-hybrid-sound-processing-layer.md
  05-feedback-loops-create-consistency.md
  06-case-study-inception.md
  07-case-study-the-dark-knight.md
  08-case-study-interstellar.md
  09-case-study-dune.md
  10-conclusion.md
```

Use `#` for the page title, `##` for a subheading, and normal paragraphs for body copy. Vite imports these files directly, so running `npm run dev` will hot-reload edits.

## Sources and Citations

This site is an interpretive design project, not a documentary transcript. The case-study claims and production details were informed by these sources:

- Hans-Zimmer.com, "Inception" project details and credits: https://hans-zimmer.com/product/inception/
- Hans-Zimmer.com, "The Dark Knight" project details and credits: https://hans-zimmer.com/product/the-dark-knight/
- Hans-Zimmer.com, "Interstellar" project details and credits: https://hans-zimmer.com/product/interstellar/
- Hans-Zimmer.com, "Dune - Part One" project details and credits: https://hans-zimmer.com/product/dune-part-one/
- Hans-Zimmer.com, "Dune - Part Two" project details and credits: https://hans-zimmer.com/product/dune-part-two/

## Notes

- The app currently renders only the independent Markdown pages and their text.
- No film stills, logos, Spotify embeds, or copyrighted audio files are used in the active site UI.
