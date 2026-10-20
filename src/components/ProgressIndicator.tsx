export interface ProgressIndicatorProps {
  currentChapter: number;
  totalChapters?: number;
  labels?: string[];
  onChapterSelect?: (chapter: number) => void;
}

export function ProgressIndicator({ currentChapter, totalChapters = 5, labels = [], onChapterSelect }: ProgressIndicatorProps) {
  const current = Math.min(totalChapters, Math.max(1, currentChapter));
  return (
    <nav className="progress-indicator" aria-label="Прогресс нашей истории">
      <div className="progress-indicator__meta"><span>Глава {current} из {totalChapters}</span>{labels[current - 1] && <span className="progress-indicator__label">{labels[current - 1]}</span>}</div>
      <ol className="progress-indicator__steps">
        {Array.from({ length: totalChapters }, (_, index) => {
          const chapter = index + 1;
          const active = chapter === current;
          const complete = chapter < current;
          const content = <span aria-hidden="true">{complete ? '♡' : chapter}</span>;
          return (
            <li key={chapter} className={`progress-indicator__step ${active ? 'is-active' : ''} ${complete ? 'is-complete' : ''}`}>
              {onChapterSelect && chapter <= current ? <button type="button" aria-label={`Открыть главу ${chapter}`} aria-current={active ? 'step' : undefined} onClick={() => onChapterSelect(chapter)}>{content}</button> : <span aria-current={active ? 'step' : undefined}>{content}</span>}
              {chapter < totalChapters && <i aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
      <style>{`
        .progress-indicator { width:min(100%,34rem); margin:0 auto; padding:.7rem .9rem; border:1px solid rgba(243,167,212,.2); border-radius:999px; color:var(--muted,#cabbd7); background:rgba(17,13,32,.42); backdrop-filter:blur(16px); }
        .progress-indicator__meta { display:flex; justify-content:space-between; gap:1rem; margin-bottom:.55rem; font-size:.62rem; letter-spacing:.1em; text-transform:uppercase; }
        .progress-indicator__label { color:var(--pink,#f3a7d4); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .progress-indicator__steps { display:flex; align-items:center; width:100%; margin:0; padding:0; list-style:none; }
        .progress-indicator__step { display:flex; align-items:center; flex:1; }
        .progress-indicator__step > button, .progress-indicator__step > span { display:grid; place-items:center; flex:none; width:1.55rem; height:1.55rem; border:1px solid rgba(255,255,255,.2); border-radius:50%; color:var(--muted,#cabbd7); background:rgba(255,255,255,.04); font-size:.65rem; transition: color .35s ease, border-color .35s ease, background-color .35s ease, transform .35s ease, box-shadow .35s ease; }
        .progress-indicator__step > button { cursor:pointer; }
        .progress-indicator__step > button:hover { border-color:var(--pink,#f3a7d4); }
        .progress-indicator__step.is-active > span, .progress-indicator__step.is-active > button { color:var(--night,#110d20); border-color:var(--pink,#f3a7d4); background:var(--pink,#f3a7d4); box-shadow:0 0 .8rem rgba(243,167,212,.55); transform:scale(1.12); }
        .progress-indicator__step.is-complete > span, .progress-indicator__step.is-complete > button { color:var(--warm,#fff6fb); border-color:rgba(243,167,212,.55); }
        .progress-indicator__step > i { flex:1; display:block; height:1px; margin:0 .35rem; background:rgba(255,255,255,.18); }
        @media(max-width:420px){.progress-indicator{padding:.55rem .7rem}.progress-indicator__label{display:none}.progress-indicator__meta{justify-content:center}.progress-indicator__step > button,.progress-indicator__step > span{width:1.35rem;height:1.35rem}}
      `}</style>
    </nav>
  );
}

export default ProgressIndicator;
