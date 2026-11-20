import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Star } from 'lucide-react'
import { CoupleAvatar } from '../components/CoupleAvatar'
import { FadeIn } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'
import '../styles/universe.css'

type StarNote = (typeof loveStory.universe.stars)[number]

function StarLetter({ star, onClose }: { star: StarNote; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="star-letter"
      aria-labelledby="star-letter-title"
      aria-describedby="star-letter-copy"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="star-letter__paper">
        <span className="star-letter__seal" aria-hidden="true">✦</span>
        <h3 id="star-letter-title">{star.title}</h3>
        <p id="star-letter-copy">{star.text}</p>
        <button type="button" className="star-letter__return" onClick={() => dialogRef.current?.close()}>
          К звёздам
        </button>
      </div>
    </dialog>
  )
}

const heartStars = [[60, 29], [25, 16], [16, 43], [34, 65], [60, 87], [86, 65], [104, 43], [95, 16]]

function HeartConstellation() {
  return (
    <svg className="heart-constellation-map" viewBox="0 0 120 104" aria-hidden="true">
      <path d="M60 29 25 16 16 43 34 65 60 87 86 65 104 43 95 16Z" />
      {heartStars.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={2.6} />)}
    </svg>
  )
}

export function Universe({ onNext, onMusicStart }: { onNext: () => void; onMusicStart: () => void }) {
  const [opened, setOpened] = useState(false)
  const [visited, setVisited] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { universe } = loveStory
  const allVisited = visited.length === universe.stars.length

  useEffect(() => {
    if (opened) titleRef.current?.focus({ preventScroll: true })
  }, [opened])

  const closeLetter = () => {
    setSelected(null)
    triggerRef.current?.focus({ preventScroll: true })
  }

  return (
    <section className={`universe-scene universe-scene--chapter${opened ? ' universe-scene--reading' : ''}`}>
      <div className="scene-orb scene-orb--pink" aria-hidden="true" />
      <div className="scene-orb scene-orb--lavender" aria-hidden="true" />
      {!opened ? (
        <div className="scene-inner universe-intro">
          <time dateTime={loveStory.startDate}>20.11.2025</time>
          <h1 className="display-serif">{universe.intro}</h1>
          <p>{universe.introSecond}</p>
          <button type="button" className="universe-cta" onClick={() => { setOpened(true); onMusicStart() }}>
            Открыть наше маленькое чудо ♡
          </button>
        </div>
      ) : (
        <div className="scene-inner universe-main">
          <div className="universe-hero">
            <FadeIn className="universe-hero__copy">
              <span className="eyebrow">Глава первая · звёздное начало</span>
              <h2 ref={titleRef} tabIndex={-1} className="chapter-title">{universe.title}</h2>
              <p className="chapter-copy">{universe.subtitle}</p>
            </FadeIn>
            <div className="universe-portrait">
              <span className="universe-portrait__orbit" aria-hidden="true" />
              <CoupleAvatar imageSrc={loveStory.couplePhoto} girlfriendName={loveStory.girlfriendName} boyfriendName={loveStory.boyfriendName} />
            </div>
          </div>

          <section className="star-gallery" aria-labelledby="star-gallery-title">
            <div className="star-gallery__heading">
              <h3 id="star-gallery-title">Пять звёзд для тебя</h3>
              <p className="star-gallery__count" role="status">Открыто {visited.length} из {universe.stars.length}</p>
            </div>
            <p className="star-gallery__hint">Коснись звезды, чтобы прочитать послание.</p>
            <div className="star-field">
              {universe.stars.map((star, index) => {
                const isVisited = visited.includes(index)
                return (
                  <button
                    key={star.title}
                    type="button"
                    className={`star-button${isVisited ? ' star-button--visited' : ''}`}
                    aria-haspopup="dialog"
                    aria-label={isVisited ? `${star.title} (открыто)` : star.title}
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget
                      setSelected(index)
                      setVisited((previous) => previous.includes(index) ? previous : [...previous, index])
                    }}
                  >
                    <Star className="star-button__symbol" size={24} strokeWidth={1.4} aria-hidden="true" />
                    <span className="star-button__title">{star.title}</span>
                    <span className="star-button__indicator" aria-hidden="true">
                      {isVisited ? <Check size={15} /> : <ArrowRight size={15} />}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {allVisited && (
            <div className="star-complete">
              <HeartConstellation />
              <div>
                <p>А теперь давай вспомним, с чего всё началось…</p>
                <button type="button" className="universe-cta" onClick={onNext}>Наша история <ArrowRight size={17} aria-hidden="true" /></button>
              </div>
            </div>
          )}
          {selected !== null && <StarLetter star={universe.stars[selected]} onClose={closeLetter} />}
        </div>
      )}
    </section>
  )
}
