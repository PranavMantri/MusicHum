import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { pageContent, referencesPageIndex } from './pageContent';
import './styles.css';

const pageEmbeds = {
  2: [
    {
      title: 'Page 2 Spotify Listening Reference',
      src: 'https://open.spotify.com/embed/track/4WmB04GBqS4xPMYN9dHgBw?utm_source=generator',
      height: 152,
      afterHeading: 'Please play the soundtrack below before Beginning (Day One)',
    },
  ],
  3: [
    {
      title: 'Half Remembered Dream',
      src: 'https://open.spotify.com/embed/track/7DU7DNVDZouvJ34tPcPxBj?utm_source=generator',
      height: 152,
    },
    {
      title: 'Time',
      src: 'https://open.spotify.com/embed/track/6ZFbXIJkuI1dVNWvzJzown?utm_source=generator',
      height: 152,
    },
  ],
  6: [
    {
      title: 'Time: Please press play and let the music accompany the following analysis.',
      src: 'https://open.spotify.com/embed/track/6ZFbXIJkuI1dVNWvzJzown?utm_source=generator',
      height: 152,
      afterHeading: '“Time”: Expansion and Emotional Accumulation',
    },
    {
      title: 'Dream Is Collapsing: Please pause the previous track, then press play before continuing.',
      type: 'youtube',
      src: 'https://www.youtube.com/embed/Ten_gA_Fp6Q',
      height: 315,
      warning: 'Content warning: this video contains some violence, including guns. If you are uncomfortable with that, use the Spotify audio-only embed below instead.',
      companionEmbeds: [
        {
          title: 'Dream Is Collapsing: Audio-only Spotify alternative.',
          src: 'https://open.spotify.com/embed/track/5xKVYMxOHB2XRLCUafFrz6?utm_source=generator',
          height: 152,
        },
      ],
      afterHeading: '“Dream Is Collapsing”: Compression and Rhythmic Urgency',
    },
    {
      title: 'Mombasa: Please pause the previous track, then press play before continuing.',
      src: 'https://open.spotify.com/embed/track/77QDBf1zTvyegtTpAO5EpH?utm_source=generator',
      height: 152,
      afterHeading: '“Mombasa”: Layered Motion and Temporal Disorientation',
    },
  ],
  7: [
    {
      title: 'Why So Serious?: Please press play before beginning this case study.',
      src: 'https://open.spotify.com/embed/track/1G4VFKAV5bFupGsQWcCfxS?utm_source=generator',
      height: 152,
      placement: 'beforeBody',
    },
    {
      title: 'Introduce a Little Anarchy: Please pause the previous track, then press play before continuing.',
      src: 'https://open.spotify.com/embed/track/1kQRGry732dd9KZLsfjKWm?utm_source=generator',
      height: 152,
      afterHeading: '“Introduce a Little Anarchy”: Rhythmic and Textural Escalation',
    },
  ],
  8: [
    {
      title: 'Cornfield Chase: Please press play and let the music accompany the following analysis.',
      src: 'https://open.spotify.com/embed/track/6pWgRkpqVfxnj3WuIcJ7WP?utm_source=generator',
      height: 152,
      afterHeading: '“Cornfield Chase”: Intimacy and Repetition',
    },
    {
      title: 'No Time for Caution: Please pause the previous track, then press play before continuing.',
      src: 'https://open.spotify.com/embed/track/5aaXqH8rgKZxg61HjECldi?utm_source=generator',
      height: 152,
      afterHeading: '“No Time for Caution”: Scale Through Orchestration and Register',
    },
    {
      title: 'S.T.A.Y.: Please pause the previous track, then press play before continuing.',
      src: 'https://open.spotify.com/embed/track/6GUq9y0Iy5QrAuPYxTrFp2?utm_source=generator',
      height: 152,
      afterHeading: '“S.T.A.Y.”: Recurrence and Emotional Transformation',
    },
  ],
};

function SpotifyEmbed({ embed }) {
  if (embed.type === 'youtube') {
    return (
      <div className="spotify-block">
        <p>{embed.title}</p>
        {embed.warning && <div className="content-warning">{embed.warning}</div>}
        <iframe
          title={embed.title}
          src={embed.src}
          width="100%"
          height={embed.height}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
        {embed.companionEmbeds?.map((companion) => (
          <SpotifyEmbed key={companion.src} embed={companion} />
        ))}
      </div>
    );
  }

  return (
    <div className="spotify-block">
      <p>{embed.title}</p>
      <iframe
        data-testid="embed-iframe"
        title={embed.title}
        style={{ borderRadius: '12px' }}
        src={embed.src}
        width="100%"
        height={embed.height}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

function renderInlineMarkdown(text, onInternalLink) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (linkMatch) {
      if (linkMatch[2] === 'page:references') {
        return (
          <button
            key={`${part}-${index}`}
            type="button"
            className="text-link"
            onClick={() => onInternalLink(referencesPageIndex)}
          >
            {linkMatch[1]}
          </button>
        );
      }

      return (
        <a key={`${part}-${index}`} href={linkMatch[2]} target="_blank" rel="noreferrer">
          {linkMatch[1]}
        </a>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

function Page({ page, index, onPrevious, onNext, onNavigatePage, referenceReturnPage, onReturnFromReferences }) {
  const nextIndex = Math.min(index + 1, pageContent.length - 1);
  const previousIndex = Math.max(index - 1, 0);
  const sectionRef = useRef(null);
  const embeds = pageEmbeds[index] || [];
  const inlineEmbeds = embeds.filter((embed) => embed.afterHeading);
  const beforeBodyEmbeds = embeds.filter((embed) => embed.placement === 'beforeBody');
  const bottomEmbeds = embeds.filter((embed) => !embed.afterHeading && embed.placement !== 'beforeBody');

  useEffect(() => {
    sectionRef.current?.scrollTo({ top: 0, left: 0 });
  }, [index]);

  return (
    <section ref={sectionRef} className="page-section" aria-live="polite">
      <div className="page-shell">
        <article className="content-panel">
          <p className="page-number">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          {index === referencesPageIndex && referenceReturnPage !== null && (
            <button type="button" className="return-button" onClick={onReturnFromReferences}>
              Back to {referenceReturnPage === 0 ? 'Thesis' : `Page ${referenceReturnPage}`}
            </button>
          )}
          {beforeBodyEmbeds.map((embed) => (
            <SpotifyEmbed key={embed.src} embed={embed} />
          ))}
          <div className="page-body">
            {page.body.map((block, blockIndex) => {
              const shouldRenderEmbedAfterHeading =
                block.type === 'heading' && inlineEmbeds.some((embed) => block.text === embed.afterHeading);
              const matchingInlineEmbeds = inlineEmbeds.filter((embed) => block.text === embed.afterHeading);

              return (
                <React.Fragment key={`${block.text}-${blockIndex}`}>
                  {block.type === 'heading'
                    ? <h2>{renderInlineMarkdown(block.text, onNavigatePage)}</h2>
                    : <p>{renderInlineMarkdown(block.text, onNavigatePage)}</p>}
                  {shouldRenderEmbedAfterHeading && matchingInlineEmbeds.map((embed) => (
                    <SpotifyEmbed key={embed.src} embed={embed} />
                  ))}
                </React.Fragment>
              );
            })}
            {bottomEmbeds.length > 0 && (
              <div className="spotify-pair">
                {bottomEmbeds.map((embed) => (
                  <SpotifyEmbed key={embed.src} embed={embed} />
                ))}
              </div>
            )}
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
  const [referenceReturnPage, setReferenceReturnPage] = useState(null);
  const page = pageContent[activePage];
  const goPrevious = () => setActivePage((current) => Math.max(current - 1, 0));
  const goNext = () => setActivePage((current) => (current + 1 >= pageContent.length ? 0 : current + 1));
  const goToPage = (index) => {
    setReferenceReturnPage(null);
    setActivePage(index);
  };
  const goToInternalPage = (index) => {
    if (index === referencesPageIndex) {
      setReferenceReturnPage(activePage);
    }
    setActivePage(index);
  };
  const returnFromReferences = () => {
    if (referenceReturnPage !== null) {
      setActivePage(referenceReturnPage);
      setReferenceReturnPage(null);
    }
  };

  return (
    <main>
      <nav className="page-nav" aria-label="Page navigation">
        {pageContent.map((page, index) => (
          <button
            key={page.title}
            type="button"
            onClick={() => goToPage(index)}
            className={activePage === index ? 'active' : ''}
          >
            {index === 0 ? 'Thesis' : page.eyebrow}
          </button>
        ))}
      </nav>

      <Page
        key={page.title}
        page={page}
        index={activePage}
        onPrevious={goPrevious}
        onNext={goNext}
        onNavigatePage={goToInternalPage}
        referenceReturnPage={referenceReturnPage}
        onReturnFromReferences={returnFromReferences}
      />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
