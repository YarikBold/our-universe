import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { FallingHearts } from '../components/FallingHearts'
import { SceneWipe } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'

export const GIFT_PROGRESS_STORAGE_KEY = 'our-universe:gift-progress'

type GiftProgress = { opened: boolean; revealedCount: number; twentyRead: boolean }
const totalCards = loveStory.loveReasons.length
const ordinaryReasons = loveStory.loveReasons.slice(0, -1)
const emptyProgress: GiftProgress = { opened: false, revealedCount: 0, twentyRead: false }

function readProgress(): GiftProgress {
  try {
    const saved = JSON.parse(localStorage.getItem(GIFT_PROGRESS_STORAGE_KEY) ?? 'null') as Partial<GiftProgress> | null
    if (!saved) return emptyProgress
    return { opened: Boolean(saved.opened), revealedCount: Math.min(totalCards, Math.max(0, Number(saved.revealedCount) || 0)), twentyRead: Boolean(saved.twentyRead) }
  } catch { return emptyProgress }
}

export function GiftBox({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState<GiftProgress>(() => readProgress())
  const [specialPhase, setSpecialPhase] = useState<'hidden' | 'intro' | 'reveal'>(() => progress.twentyRead ? 'reveal' : 'hidden')
  const [leaving, setLeaving] = useState(false)
  const isSpecialCard = progress.revealedCount === totalCards
  const currentReason = progress.revealedCount > 0 && !isSpecialCard ? ordinaryReasons[progress.revealedCount - 1] : undefined

  useEffect(() => {
    try { localStorage.setItem(GIFT_PROGRESS_STORAGE_KEY, JSON.stringify(progress)) } catch { /* The story remains playable when storage is unavailable. */ }
  }, [progress])

  useEffect(() => {
    if (!isSpecialCard) { setSpecialPhase('hidden'); return }
    if (progress.twentyRead) { setSpecialPhase('reveal'); return }
    setSpecialPhase('intro')
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1800
    const timer = window.setTimeout(() => setSpecialPhase('reveal'), delay)
    return () => window.clearTimeout(timer)
  }, [isSpecialCard, progress.twentyRead])

  const openGift = () => setProgress({ opened: true, revealedCount: 1, twentyRead: false })
  const revealNext = () => setProgress((current) => ({ ...current, revealedCount: Math.min(totalCards, current.revealedCount + 1) }))
  const readFinalCard = () => setProgress((current) => ({ ...current, twentyRead: true }))
  const openFinale = () => { if (progress.twentyRead) { setLeaving(true); const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 900; window.setTimeout(onNext, delay) } }

  return <section className={`gift-scene${progress.opened ? ' gift-scene--opened' : ''}${isSpecialCard ? ' gift-scene--final-card' : ''}${leaving ? ' is-leaving' : ''}`}>
    <FallingHearts count={isSpecialCard ? 7 : progress.opened ? 18 : 7} speed={isSpecialCard ? .42 : .7} />
    <SceneWipe className="scene-atmosphere"><div className="gift-inner">
      <span className="eyebrow">Глава четвёртая · коробочка сюрпризов</span><h2>{loveStory.chapters.giftTitle}</h2><p>{loveStory.chapters.giftText}</p>
      <div className="gift-stage-label"><span>✦</span> a small collection of reasons <span>✦</span></div>
      <div className="gift-stage"><div className="gift-stage__halo" aria-hidden="true"/><div className="gift-stage__sparkles" aria-hidden="true"><i>✦</i><i>·</i><i>✧</i><i>·</i><i>✦</i></div>
        <div className={`gift-box-wrap${progress.opened ? ' open' : ''}${isSpecialCard ? ' final-card' : ''}`}><div className="gift-box"><span className="gift-box__inside" aria-hidden="true"/><span className="gift-box__ribbon" aria-hidden="true"/></div><div className="gift-lid"><span className="gift-lid__edge" aria-hidden="true"/></div><div className="gift-ribbon" aria-hidden="true"><span className="gift-ribbon__loop gift-ribbon__loop--left"/><span className="gift-ribbon__loop gift-ribbon__loop--right"/><span className="gift-ribbon__knot"/></div>{progress.opened && <div className="gift-heart-burst" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} style={{ '--i': i } as React.CSSProperties}>♥</span>)}</div>}</div>
      </div>
      {!progress.opened && <button className="romantic-button gift-open-button" onClick={openGift}>Развязать ленточку 🎀</button>}
      {progress.opened && <div className="reasons-deck" aria-live="polite"><div className="reasons-deck__header"><span className="reasons-deck__eyebrow">карточка {progress.revealedCount} из {totalCards}</span><span className="reasons-deck__line"><i style={{ width: `${(progress.revealedCount / totalCards) * 100}%` }} /></span></div>
        <div className="reason-card-stage">{currentReason && <article className="reason-card" key={progress.revealedCount}><div className="reason-card__inner"><div className="reason-card__back" aria-hidden="true"><span>♡</span><small>маленькая причина</small></div><div className="reason-card__face"><span className="reason-card__number">{String(progress.revealedCount).padStart(2, '0')}</span><span className="reason-card__ornament" aria-hidden="true">♡</span><p>{currentReason}</p></div></div></article>}
          {isSpecialCard && <article className="reason-card reason-card--special" key="special-card"><div className="reason-card__inner"><div className="reason-card__back" aria-hidden="true"><span>✦</span><small>{loveStory.giftFinalCard.back}</small></div><div className="reason-card__face"><span className="reason-card__number">20</span><span className="reason-card__ornament" aria-hidden="true">✦</span><p className="special-card__intro">{loveStory.giftFinalCard.intro}</p>{specialPhase === 'reveal' && <p className="special-card__reveal">{loveStory.giftFinalCard.reveal}</p>}</div></div>{specialPhase === 'reveal' && <span className="special-card__heart" aria-hidden="true">♥</span>}</article>}
        </div>
        {!isSpecialCard && <button className="romantic-button card-draw-button" onClick={revealNext}>{progress.revealedCount === totalCards - 1 ? 'Достать последнюю карточку ✦' : 'Достать ещё карточку ♡'}</button>}
        {isSpecialCard && specialPhase === 'reveal' && !progress.twentyRead && <button className="romantic-button special-read-button" onClick={readFinalCard}>Прочитать признание ♡</button>}
        {isSpecialCard && progress.twentyRead && <div className="special-finale-cta"><p>Это ещё не всё, моя любимая… ♡</p><button className="romantic-button" onClick={openFinale}>Открыть последнее признание 💌 <ArrowRight size={16} /></button></div>}
      </div>}
    </div></SceneWipe>
  </section>
}
