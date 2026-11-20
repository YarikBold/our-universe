import { useEffect, useRef } from 'react'
import { Pause, Play } from 'lucide-react'
import { loveStory } from '../data/loveStory'
import '../styles/epilogue.css'

const stars = [
  [30, 130], [45, 64], [108, 31], [182, 51], [254, 28], [317, 66],
  [336, 142], [323, 225], [341, 290], [301, 369], [224, 386],
  [159, 401], [83, 373], [35, 322], [23, 243],
] as const

export function FinaleEpilogue({ playing, audioUnavailable, onToggleMusic }: {
  playing: boolean
  audioUnavailable: boolean
  onToggleMusic: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const { epilogue } = loveStory

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <section className="finale-epilogue" aria-labelledby="epilogue-line">
      <div className="finale-epilogue__inner">
        <div className="finale-epilogue__frame">
          <img src={epilogue.photo} alt={epilogue.photoAlt} width={960} height={1280} />
          <svg className="finale-epilogue__constellation" viewBox="0 0 360 424" aria-hidden="true">
            <polyline points={stars.map(([x, y]) => `${x},${y}`).join(' ')} pathLength={1} />
            {stars.map(([x, y], index) => (
              <circle key={x} cx={x} cy={y} r={index % 3 === 0 ? 2.6 : 1.7} style={{ animationDelay: `${.45 + index * .07}s` }} />
            ))}
          </svg>
        </div>
        <div className="finale-epilogue__copy">
          <h2 ref={headingRef} tabIndex={-1} id="epilogue-line">{epilogue.line}</h2>
          <p>{epilogue.signature}</p>
          {audioUnavailable ? <p className="finale-epilogue__audio-status" role="status">Музыка недоступна</p> : (
            <button className="finale-epilogue__music" type="button" onClick={onToggleMusic}>
              {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              {playing ? 'Поставить музыку на паузу' : 'Включить музыку'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
