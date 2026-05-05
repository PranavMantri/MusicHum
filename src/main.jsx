import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { pageContent } from './pageContent';
import './styles.css';

function Page({ page, index, onPrevious, onNext }) {
  const nextIndex = Math.min(index + 1, pageContent.length - 1);
  const previousIndex = Math.max(index - 1, 0);
  const sectionRef = useRef(null);

  useEffect(() => {
    sectionRef.current?.scrollTo({ top: 0, left: 0 });
  }, [index]);

  return (
    <section ref={sectionRef} className="page-section" aria-live="polite">
      <div className="page-shell">
        <article className="content-panel">
          <p className="page-number">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <div className="page-body">
            {page.body.map((block, blockIndex) => (
              block.type === 'heading'
                ? <h2 key={`${block.text}-${blockIndex}`}>{block.text}</h2>
                : <p key={`${block.text}-${blockIndex}`}>{block.text}</p>
            ))}
          </div>
        </article>

        <div className="page-controls" aria-label="Page controls">
          {index > 0 ? <button type="button" onClick={onPrevious}>Previous</button> : <span />}
          <span className="position-label">
            {String(index).padStart(2, '0')} / {String(pageContent.length - 1).padStart(2, '0')}
          </span>
          {index < pageContent.length - 1 ? <button type="button" onClick={onNext}>Next page</button> : <button type="button" onClick={onNext}>Back to start</button>}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activePage, setActivePage] = useState(0);
  const page = pageContent[activePage];
  const goPrevious = () => setActivePage((current) => Math.max(current - 1, 0));
  const goNext = () => setActivePage((current) => (current + 1 >= pageContent.length ? 0 : current + 1));

  return (
    <main>
      <nav className="page-nav" aria-label="Page navigation">
        {pageContent.map((page, index) => (
          <button
            key={page.title}
            type="button"
            onClick={() => setActivePage(index)}
            className={activePage === index ? 'active' : ''}
          >
            {index === 0 ? 'Thesis' : `Page ${index}`}
          </button>
        ))}
      </nav>

      <Page
        key={page.title}
        page={page}
        index={activePage}
        onPrevious={goPrevious}
        onNext={goNext}
      />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
