import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Gift } from 'lucide-react';
import '../styles/heart-game.css';
import { loveStory } from '../data/loveStory';

export type HeartGameProps = {
  /** Called when the player chooses to open the surprise after finding all five hearts. */
  onComplete?: () => void;
  /** Optional callback for the chapter-level progress indicator. */
  onProgress?: (found: number) => void;
  /** Restore a previously found-heart count when the parent owns persistence. */
  initialFound?: number;
  /** Override the default five messages without touching the chapter component. */
  messages?: readonly string[];
  /** Set false to let the player start over after returning to the chapter. */
  persist?: boolean;
  storageKey?: string;
};

type Heart = {
  id: number;
  left: string;
  top: string;
  rotate: number;
  size: 'small' | 'medium' | 'large';
  plant: 'flower' | 'leaf' | 'bush' | 'lantern' | 'moon';
};

const storyCopy = loveStory.chapters

const DEFAULT_MESSAGES = [
  'Ты делаешь мои дни счастливее.',
  'Я люблю твой голос, твою улыбку и то, какая ты настоящая.',
  'Мне хочется делиться с тобой всем хорошим.',
  'Если бы я мог выбрать кого угодно, я всё равно выбрал бы тебя.',
  'Моё сердце нашло свой дом. И этот дом — ты, Котик.',
];

/** Deliberately irregular positions make the scene feel like a little illustrated garden. */
const HEARTS: Heart[] = [
  { id: 0, left: '14%', top: '66%', rotate: -12, size: 'medium', plant: 'flower' },
  { id: 1, left: '29%', top: '25%', rotate: 11, size: 'small', plant: 'leaf' },
  { id: 2, left: '53%', top: '63%', rotate: -7, size: 'large', plant: 'bush' },
  { id: 3, left: '75%', top: '30%', rotate: 14, size: 'medium', plant: 'lantern' },
  { id: 4, left: '87%', top: '71%', rotate: -17, size: 'small', plant: 'moon' },
];

const clampFound = (value: number) => Math.max(0, Math.min(HEARTS.length, Math.floor(value)));

function loadSavedIds(key: string, fallback: number) {
  const fallbackIds = HEARTS.slice(0, clampFound(fallback)).map((heart) => heart.id)
  if (typeof window === 'undefined') return fallbackIds
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallbackIds
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      const ids = parsed.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < HEARTS.length)
      return [...new Set(ids)]
    }
    return HEARTS.slice(0, clampFound(Number(parsed))).map((heart) => heart.id)
  } catch {
    return fallbackIds
  }
}

/**
 * A no-fail, touch-first hide-and-seek scene. Hearts are large invisible hit areas
 * around a small illustrated glyph, so finding one is comfortable on a phone.
 */
export default function HeartGame({
  onComplete,
  onProgress,
  initialFound = 0,
  messages = DEFAULT_MESSAGES,
  persist = true,
  storageKey = 'our-universe:heart-game',
}: HeartGameProps) {
  const [found, setFound] = useState<Set<number>>(() => {
    const ids = persist ? loadSavedIds(storageKey, initialFound) : HEARTS.slice(0, clampFound(initialFound)).map((heart) => heart.id);
    return new Set(ids);
  });
  const [lastFound, setLastFound] = useState<number | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const completionCalled = useRef(false);
  const messageList = useMemo(() => [...DEFAULT_MESSAGES].map((item, i) => messages[i] || item), [messages]);

  useEffect(() => {
    onProgress?.(found.size);
    if (persist && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify([...found]));
      } catch {
        // Storage may be disabled in private browsing; the game still works in memory.
      }
    }
    if (found.size === HEARTS.length && !completionCalled.current) {
      completionCalled.current = true;
      setShowCompletion(true);
    }
  }, [found, onComplete, onProgress, persist, storageKey]);

  const discover = useCallback((id: number) => {
    setFound((previous) => {
      if (previous.has(id)) return previous;
      const next = new Set(previous);
      next.add(id);
      setLastFound(id);
      setBurstId((value) => value + 1);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    completionCalled.current = false;
    setShowCompletion(false);
    setLastFound(null);
    setFound(new Set());
    if (persist && typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // Ignore unavailable storage.
      }
    }
  }, [persist, storageKey]);

  const isComplete = found.size === HEARTS.length;

  return (
    <section className="heart-game" aria-labelledby="heart-game-title">
      <div className="heart-game__mist heart-game__mist--one" aria-hidden="true" />
      <div className="heart-game__mist heart-game__mist--two" aria-hidden="true" />
      <div className="heart-game__header">
        <span className="heart-game__eyebrow">Глава третья · тайный сад</span>
        <h2 id="heart-game-title">{storyCopy.gameTitle}</h2>
        <p>{storyCopy.gameSubtitle}</p>
        <div className="heart-game__progress" aria-live="polite">
          <span className="heart-game__progress-label">Найдено сердец</span>
          <span className="heart-game__progress-value">{found.size}<span aria-hidden="true">/</span>5</span>
          <span className="heart-game__progress-track" aria-hidden="true">
            <span style={{ width: `${(found.size / HEARTS.length) * 100}%` }} />
          </span>
        </div>
      </div>

      <div className={`heart-garden${isComplete ? ' heart-garden--complete' : ''}`}>
        <div className="heart-garden__sky" aria-hidden="true">
          <span className="garden-star garden-star--one">✦</span>
          <span className="garden-star garden-star--two">·</span>
          <span className="garden-star garden-star--three">✦</span>
          <span className="garden-moon">☾</span>
        </div>
        <div className="heart-garden__hill heart-garden__hill--back" aria-hidden="true" />
        <div className="heart-garden__hill heart-garden__hill--front" aria-hidden="true" />
        <div className="garden-tree" aria-hidden="true">
          <span className="garden-tree__trunk" />
          <span className="garden-tree__crown garden-tree__crown--one" />
          <span className="garden-tree__crown garden-tree__crown--two" />
          <span className="garden-tree__crown garden-tree__crown--three" />
          {Array.from({ length: 13 }, (_, i) => <i key={i} style={{ '--petal-index': i } as React.CSSProperties} />)}
        </div>
        <div className="garden-ground-flower garden-ground-flower--one" aria-hidden="true">✿</div>
        <div className="garden-ground-flower garden-ground-flower--two" aria-hidden="true">✿</div>
        <div className="garden-lantern" aria-hidden="true"><span>✧</span></div>

        {HEARTS.map((heart) => {
          const discovered = found.has(heart.id);
          return (
            <button
              key={heart.id}
              type="button"
              className={`hidden-heart hidden-heart--${heart.size}${discovered ? ' hidden-heart--found' : ''}`}
              style={{ left: heart.left, top: heart.top, '--heart-rotation': `${heart.rotate}deg` } as React.CSSProperties}
              onClick={() => discover(heart.id)}
              aria-label={discovered ? `Сердечко ${heart.id + 1} найдено` : `Найти сердечко ${heart.id + 1}`}
              aria-pressed={discovered}
            >
              <span className={`hidden-heart__camouflage hidden-heart__camouflage--${heart.plant}`} aria-hidden="true" />
              <span className="hidden-heart__glyph" aria-hidden="true">♡</span>
            </button>
          );
        })}

        {lastFound !== null && (
          <div key={`${lastFound}-${burstId}`} className="heart-burst" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ '--burst-index': i } as React.CSSProperties}>♥</i>)}
          </div>
        )}
        {isComplete && (
          <div className="heart-constellation" aria-hidden="true">
            <span className="heart-constellation__line heart-constellation__line--one" />
            <span className="heart-constellation__line heart-constellation__line--two" />
            <span className="heart-constellation__line heart-constellation__line--three" />
            <span className="heart-constellation__glow">♥</span>
          </div>
        )}
      </div>

      <div className={`heart-game__message${lastFound !== null ? ' heart-game__message--visible' : ''}`} aria-live="polite">
        {lastFound !== null && !isComplete && <><span className="heart-game__message-heart" aria-hidden="true">♥</span><p>{messageList[lastFound]}</p></>}
        {isComplete && showCompletion && (
          <div className="heart-game__complete">
            <span className="heart-game__complete-kicker">✦ всё найдено ✦</span>
            <p>Ты нашла все сердечки. Но самый главный подарок ещё впереди…</p>
          </div>
        )}
      </div>

      {isComplete && (
        <div className="heart-game__actions">
          <button type="button" className="heart-game__continue" onClick={onComplete}>
            Открыть мой сюрприз <Gift size={16} aria-hidden="true" />
          </button>
          <button type="button" className="heart-game__reset" onClick={reset}>Найти сердечки ещё раз</button>
        </div>
      )}
      {!isComplete && <p className="heart-game__hint"><span aria-hidden="true">✦</span> Осмотрись внимательно — сад хранит маленькие секреты</p>}
    </section>
  );
}

