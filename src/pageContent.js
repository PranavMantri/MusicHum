import titleThesis from '../content/00-title-thesis.md?raw';
import introduction from '../content/01-introduction-style-vs-system.md?raw';
import coreInputs from '../content/02-abstract-core-inputs.md?raw';
import motifs from '../content/03-motifs-function-like-modules.md?raw';
import hybridSound from '../content/04-hybrid-sound-processing-layer.md?raw';
import feedback from '../content/05-feedback-loops-create-consistency.md?raw';
import inception from '../content/06-case-study-inception.md?raw';
import darkKnight from '../content/07-case-study-the-dark-knight.md?raw';
import interstellar from '../content/08-case-study-interstellar.md?raw';
import dune from '../content/09-case-study-dune.md?raw';
import conclusion from '../content/10-conclusion.md?raw';

function parseMarkdown(raw, eyebrow) {
  const lines = raw.trim().split('\n');
  const title = lines.find((line) => line.startsWith('# '))?.replace('# ', '').trim() || '';
  const body = lines
    .filter((line) => line.trim() && !line.startsWith('# '))
    .map((line) => {
      if (line.startsWith('## ')) {
        return { type: 'heading', text: line.replace('## ', '').trim() };
      }
      return { type: 'paragraph', text: line.trim() };
    });

  return { eyebrow, title, body };
}

export const pageContent = [
  parseMarkdown(titleThesis, 'Title + Thesis'),
  parseMarkdown(introduction, 'Page 1'),
  parseMarkdown(coreInputs, 'Page 2'),
  parseMarkdown(motifs, 'Page 3'),
  parseMarkdown(hybridSound, 'Page 4'),
  parseMarkdown(feedback, 'Page 5'),
  parseMarkdown(inception, 'Page 6'),
  parseMarkdown(darkKnight, 'Page 7'),
  parseMarkdown(interstellar, 'Page 8'),
  parseMarkdown(dune, 'Page 9'),
  parseMarkdown(conclusion, 'Page 10'),
];
