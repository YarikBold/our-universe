import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { loveStory } from '../data/loveStory'
import '../styles/epilogue.css'

const stars = [
  [180, 77], [132, 39], [74, 31], [35, 59], [17, 111], [26, 170],
  [47, 227], [76, 286], [124, 339], [180, 387], [237, 338],
  [284, 285], [315, 226], [335, 169], [343, 109], [324, 58], [285, 31], [229, 39],
] as const

const constellationPoints = stars.map(([x, y]) => `${x},${y}`).join(' ')
const { epilogue, letter } = loveStory
const paragraphs = letter.body.split('\n\n')

export function FinaleEpilogue({ playing, audioUnavailable, onToggleMusic, onLetterRead }: {
  playing: boolean
  audioUnavailable: boolean
  onToggleMusic: () => void
  onLetterRead: () => void
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    sectionRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <section ref={sectionRef} tabIndex={-1} className="finale-epilogue" aria-labelledby="epilogue-letter">
      <div className="finale-epilogue__inner">
        <div className="finale-epilogue__frame">
          <img src={epilogue.photo} alt={epilogue.photoAlt} width={960} height={1280} />
          <svg className="finale-epilogue__constellation" viewBox="0 0 360 404" aria-hidden="true">
            <polygon points={constellationPoints} pathLength={1} />
            {stars.map(([x, y], index) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={index % 3 === 0 ? 2.6 : 1.7} style={{ animationDelay: `${.45 + index * .07}s` }} />
            ))}
          </svg>
        </div>
        <div className="finale-epilogue__audio">
          {audioUnavailable ? <p className="finale-epilogue__audio-status" role="status">Музыка недоступна</p> : (
            <button className="finale-epilogue__music" type="button" onClick={onToggleMusic}>
              {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              {playing ? 'Поставить музыку на паузу' : 'Включить музыку'}
            </button>
          )}
        </div>
        <article className="finale-epilogue__letter">
          <span className="letter-seal" aria-hidden="true">♡</span>
          <h2 id="epilogue-letter">{letter.title}</h2>
          <div className="finale-epilogue__body">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className="finale-epilogue__closing">{letter.closing}</p>
            <p className="finale-epilogue__signature">{letter.signature}</p>
          </div>
          <button
            type="button"
            className="finale-epilogue__hug"
            aria-disabled={finished}
            onClick={() => {
              if (finished) return
              onLetterRead()
              setFinished(true)
            }}
          >
            {finished ? 'Обнимаю тебя крепко ♡' : 'Обнимаю тебя ♡'}
          </button>
        </article>
      </div>
    </section>
  )
}
