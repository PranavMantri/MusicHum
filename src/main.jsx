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
  9: [
    {
      title: 'Bene Gesserit: Please press play and let the music accompany the following analysis.',
      src: 'https://open.spotify.com/embed/track/5Jwajocn1leNg7A3310iFB?utm_source=generator',
      height: 152,
      afterHeading: '“The Bene Gesserit”: Voice as Power and Control',
    },
    {
      title: 'Ripples in the Sand: Please press play and let the music accompany the following analysis.',
      src: 'https://open.spotify.com/embed/track/1gqCO3x2MO4KbQfN9pGUlH?utm_source=generator',
      height: 152,
      afterHeading: '“Ripples in the Sand”: Texture and Environmental Sound',
    },
    {
      title: 'Leaving Caladan: Please pause the previous track, then press play before continuing.',
      src: 'https://open.spotify.com/embed/track/5glKprpzpGW5Pf4wB9gNPq?utm_source=generator',
      height: 152,
      afterHeading: '“Leaving Caladan”: Scale and Transformation',
    },
  ],
};

const modules = [
  {
    id: 'inputs',
    nav: 'Inputs',
    title: 'Inputs / Abstraction',
    summary: 'The film is reduced to an abstract narrative pressure: time, chaos, scale, longing, or otherness.',
    pages: [2],
    cases: [6, 9],
    nodes: ['Director brief', 'Film world', 'Emotional arc', 'Core pressure'],
  },
  {
    id: 'modularity',
    nav: 'Modularity',
    title: 'Modularity / Leitmotif',
    summary: 'Compact motifs behave like reusable modules that can stretch, distort, layer, and survive transformation.',
    pages: [3],
    cases: [6, 7],
    nodes: ['Motif', 'Repetition', 'Transformation', 'Identity'],
  },
  {
    id: 'processing',
    nav: 'Processing',
    title: 'Processing Layer / Timbre',
    summary: 'Orchestra, synthesizers, percussion, organ, voice, and sound design convert concepts into physical sensation.',
    pages: [4],
    cases: [8, 9],
    nodes: ['Timbre', 'Texture', 'Orchestration', 'World'],
  },
  {
    id: 'feedback',
    nav: 'Feedback',
    title: 'Feedback / Iteration',
    summary: 'Cues adapt through directors, edits, timing, temp tracks, and repeated testing against picture.',
    pages: [5],
    cases: [],
    nodes: ['Cue', 'Cut', 'Response', 'Revision'],
  },
];

const viewOrder = ['home', ...modules.map((module) => module.id), 'references'];
const caseStudies = [
  { id: 'inception', title: 'Inception', page: 6, relatedModules: ['inputs', 'modularity'] },
  { id: 'dark-knight', title: 'The Dark Knight', page: 7, relatedModules: ['modularity'] },
  { id: 'interstellar', title: 'Interstellar', page: 8, relatedModules: ['processing'] },
  { id: 'dune', title: 'Dune', page: 9, relatedModules: ['inputs', 'processing'] },
];
const suggestedNextByView = {
  inputs: 'modularity',
  modularity: 'processing',
  processing: 'feedback',
  feedback: 'inception',
  inception: 'dark-knight',
  'dark-knight': 'interstellar',
  interstellar: 'dune',
  dune: 'home',
};

function SpotifyEmbed({ embed }) {
  if (embed.type === 'youtube') {
    return (
      <div className="embed-block">
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
    <div className="embed-block">
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
            onClick={() => onInternalLink('references')}
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

function MarkdownPage({ pageIndex, plain = false, onInternalLink }) {
  const page = pageContent[pageIndex];
  const embeds = pageEmbeds[pageIndex] || [];
  const inlineEmbeds = embeds.filter((embed) => embed.afterHeading);
  const beforeBodyEmbeds = embeds.filter((embed) => embed.placement === 'beforeBody');
  const bottomEmbeds = embeds.filter((embed) => !embed.afterHeading && embed.placement !== 'beforeBody');

  return (
    <article className={plain ? 'plain-page-content' : 'content-card'}>
      <p className="eyebrow">{page.eyebrow}</p>
      <h2>{page.title}</h2>
      {beforeBodyEmbeds.map((embed) => (
        <SpotifyEmbed key={embed.src} embed={embed} />
      ))}
      <div className="article-body">
        {page.body.map((block, blockIndex) => {
          const matchingInlineEmbeds = inlineEmbeds.filter((embed) => block.text === embed.afterHeading);

          return (
            <React.Fragment key={`${block.text}-${blockIndex}`}>
              {block.type === 'heading'
                ? <h3>{renderInlineMarkdown(block.text, onInternalLink)}</h3>
                : <p>{renderInlineMarkdown(block.text, onInternalLink)}</p>}
              {matchingInlineEmbeds.map((embed) => (
                <SpotifyEmbed key={embed.src} embed={embed} />
              ))}
            </React.Fragment>
          );
        })}
        {bottomEmbeds.length > 0 && (
          <div className="embed-pair">
            {bottomEmbeds.map((embed) => (
              <SpotifyEmbed key={embed.src} embed={embed} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Landing({ onNavigate }) {
  const titlePage = pageContent[0];
  const introPage = pageContent[1];

  return (
    <section className="site-view landing-view">
      <div className="hero-copy">
        <p className="eyebrow">Interactive system map</p>
        <h1>{titlePage.title}</h1>
        <div className="intro-copy">
          {introPage.body.map((block) => (
            block.type === 'heading'
              ? <h2 key={block.text}>{renderInlineMarkdown(block.text, onNavigate)}</h2>
              : <p key={block.text}>{renderInlineMarkdown(block.text, onNavigate)}</p>
          ))}
        </div>
        <div className="site-guide">
          <h2>How to use this site</h2>
          <p>
            This site is organized like the system it describes. Start with one of the four process modules below, then follow the related case-study branches to see how that part of Zimmer’s method operates in specific films.
          </p>
          <p>
            Use the module cards to move through the main argument, the case-study cards to branch into film examples, and the menu button in the upper-right to jump anywhere at any time. Citation links open the References page and provide a return button back to where you came from.
          </p>
        </div>
      </div>

      <div className="module-grid">
        {modules.map((module) => (
          <button key={module.id} type="button" className={`module-card module-${module.id}`} onClick={() => onNavigate(module.id)}>
            <span>{module.nav}</span>
            <h2>{module.title}</h2>
            <p>{module.summary}</p>
          </button>
        ))}
      </div>

      <section className="hub-cases">
        <p className="eyebrow">Case-study branches</p>
        <div className="case-link-grid">
          {caseStudies.map((study) => (
            <button key={study.id} type="button" className={`case-link-card case-${study.id}`} onClick={() => onNavigate(study.id)}>
              <span>{study.relatedModules.map((moduleId) => modules.find((module) => module.id === moduleId)?.nav).join(' + ')}</span>
              <h2>{study.title}</h2>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

function ModulePage({ module, onNavigate, onInternalLink }) {
  return (
    <section className="site-view module-view">
      <header className="module-header">
        <button type="button" className="back-home" onClick={() => onNavigate('home')}>
          System map
        </button>
        <p className="eyebrow">System module</p>
        <h1>{module.title}</h1>
        <p>{module.summary}</p>
      </header>

      <div className="reader-layout">
        <div className="argument-stack">
          {module.pages.map((pageIndex) => (
            <MarkdownPage key={pageIndex} pageIndex={pageIndex} plain onInternalLink={onInternalLink} />
          ))}
        </div>

        <aside className="related-branch">
          <p className="eyebrow">Related case studies</p>
          <div className="case-link-list">
            {module.cases.map((pageIndex) => {
              const study = caseStudies.find((caseStudy) => caseStudy.page === pageIndex);
              if (!study) return null;

              return (
                <button key={pageIndex} type="button" className="case-link-card" onClick={() => onNavigate(study.id)}>
                  <span>Open case study</span>
                  <h2>{study.title}</h2>
                  <p>{pageContent[pageIndex].title}</p>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}

function CaseStudyPage({ study, onNavigate, onInternalLink }) {
  return (
    <section className="site-view case-view">
      <header className="module-header">
        <button type="button" className="back-home" onClick={() => onNavigate('home')}>
          System map
        </button>
        <p className="eyebrow">Case-study branch</p>
        <h1>{study.title}</h1>
        <p>
          Connected modules: {study.relatedModules.map((moduleId) => modules.find((module) => module.id === moduleId)?.title).join(' + ')}
        </p>
        <div className="branch-nodes case-module-links">
          {study.relatedModules.map((moduleId) => {
            const module = modules.find((candidate) => candidate.id === moduleId);

            return (
              <button key={moduleId} type="button" onClick={() => onNavigate(moduleId)}>
                {module.title}
              </button>
            );
          })}
        </div>
      </header>

      <MarkdownPage pageIndex={study.page} plain onInternalLink={onInternalLink} />
    </section>
  );
}

function SuggestedNextButton({ activeView, onNavigate }) {
  const nextView = suggestedNextByView[activeView];

  if (!nextView) return null;

  const nextModule = modules.find((module) => module.id === nextView);
  const nextStudy = caseStudies.find((study) => study.id === nextView);
  const label = nextView === 'home' ? 'System Map' : nextModule?.title || nextStudy?.title;

  return (
    <button type="button" className="suggested-next" onClick={() => onNavigate(nextView)}>
      <span>Suggested next element</span>
      {label}
    </button>
  );
}

function ReferencesPage({ returnView, onReturn, onNavigate }) {
  return (
    <section className="site-view">
      <div className="references-shell">
        <button type="button" className="back-home" onClick={() => onNavigate('home')}>
          System map
        </button>
        {returnView && (
          <button type="button" className="return-button" onClick={onReturn}>
            Back to {returnView === 'home' ? 'System map' : modules.find((module) => module.id === returnView)?.nav}
          </button>
        )}
        <MarkdownPage pageIndex={referencesPageIndex} plain onInternalLink={onNavigate} />
      </div>
    </section>
  );
}

function App() {
  const [activeView, setActiveView] = useState('home');
  const [referenceReturnView, setReferenceReturnView] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const viewRef = useRef(null);

  useEffect(() => {
    viewRef.current?.scrollTo({ top: 0, left: 0 });
  }, [activeView]);

  const goToView = (view) => {
    setReferenceReturnView(null);
    setActiveView(view);
    setIsMenuOpen(false);
  };

  const goToInternalView = (view) => {
    if (view === 'references') {
      setReferenceReturnView(activeView);
    }
    setActiveView(view);
    setIsMenuOpen(false);
  };

  const activeModule = modules.find((module) => module.id === activeView);
  const activeCaseStudy = caseStudies.find((study) => study.id === activeView);

  return (
    <main>
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-controls="site-menu"
      >
        Menu
      </button>
      {isMenuOpen && <button type="button" className="menu-scrim" aria-label="Close menu" onClick={() => setIsMenuOpen(false)} />}
      <nav id="site-menu" className={`side-menu ${isMenuOpen ? 'open' : ''}`} aria-label="Primary navigation">
        <div className="side-menu-header">
          <span>Navigation</span>
          <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">Close</button>
        </div>
        <div className="side-menu-group">
          <p>Hub</p>
          <button type="button" onClick={() => goToView('home')} className={activeView === 'home' ? 'active' : ''}>
            System Map
          </button>
        </div>
        <div className="side-menu-group">
          <p>System Modules</p>
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              onClick={() => goToView(module.id)}
              className={activeView === module.id ? 'active' : ''}
            >
              {module.title}
            </button>
          ))}
        </div>
        <div className="side-menu-group">
          <p>Case Studies</p>
          {caseStudies.map((study) => (
            <button
              key={study.id}
              type="button"
              onClick={() => goToView(study.id)}
              className={activeView === study.id ? 'active' : ''}
            >
              {study.title}
            </button>
          ))}
        </div>
        <div className="side-menu-group">
          <p>Sources</p>
          <button type="button" onClick={() => goToView('references')} className={activeView === 'references' ? 'active' : ''}>
            References
          </button>
        </div>
      </nav>

      <div ref={viewRef} className="view-scroll">
        {activeView === 'home' && <Landing onNavigate={goToInternalView} />}
        {activeModule && (
          <>
            <ModulePage module={activeModule} onNavigate={goToView} onInternalLink={goToInternalView} />
            <SuggestedNextButton activeView={activeView} onNavigate={goToView} />
          </>
        )}
        {activeCaseStudy && (
          <>
            <CaseStudyPage study={activeCaseStudy} onNavigate={goToView} onInternalLink={goToInternalView} />
            <SuggestedNextButton activeView={activeView} onNavigate={goToView} />
          </>
        )}
        {activeView === 'references' && (
          <ReferencesPage
            returnView={referenceReturnView}
            onReturn={() => {
              setActiveView(referenceReturnView || 'home');
              setReferenceReturnView(null);
            }}
            onNavigate={goToView}
          />
        )}
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
