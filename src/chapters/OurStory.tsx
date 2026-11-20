import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { PhotoDialog } from '../components/PhotoDialog'
import { RelationshipCounter } from '../components/RelationshipCounter'
import { FadeIn, SceneWipe } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'

export function OurStory({ onNext }: { onNext: () => void }) {
  const [active, setActive] = useState(0)
  const [openPhoto, setOpenPhoto] = useState<number | null>(null)
  const selected = openPhoto === null ? undefined : loveStory.memories[openPhoto]

  return (
    <section className="story-scene">
      <SceneWipe className="scene-atmosphere">
        <div className="scene-inner">
          <div className="story-heading">
            <FadeIn>
              <span className="eyebrow">Глава вторая · страницы нашей истории</span>
              <h2 className="chapter-title display-serif">{loveStory.chapters.storyTitle}</h2>
              <p className="chapter-copy">{loveStory.chapters.storySubtitle}</p>
            </FadeIn>
          </div>
          <div className="memories-grid">
            {loveStory.memories.map((memory, index) => (
              <button
                key={memory.title}
                type="button"
                className={`memory-card${active === index ? ' is-active' : ''}`}
                onClick={() => {
                  setActive(index)
                  if (memory.image) setOpenPhoto(index)
                }}
                aria-label={`Открыть воспоминание: ${memory.title}`}
                aria-haspopup={memory.image ? 'dialog' : undefined}
                style={{ '--tilt': index % 2 === 0 ? '-1.5deg' : '2deg' } as React.CSSProperties}
              >
                <div className="memory-photo">
                  {memory.image ? (
                    <img
                      src={memory.image}
                      alt={memory.imageAlt ?? memory.title}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: memory.imagePosition, objectFit: memory.imageFit }}
                    />
                  ) : <span className="memory-placeholder">Наше фото<br />♡</span>}
                </div>
                {memory.date && <div className="memory-date">{memory.date}</div>}
                <h3 className="memory-title">{memory.title}</h3>
                <p className="memory-copy">{memory.text}</p>
              </button>
            ))}
          </div>
          <RelationshipCounter startDate={loveStory.startDate} />
          <div className="scene-actions">
            <button className="romantic-button" onClick={onNext}>А теперь небольшая игра для моего Котика <ArrowRight size={16} /></button>
          </div>
        </div>
      </SceneWipe>
      {selected && <PhotoDialog src={selected.image} alt={selected.imageAlt ?? selected.title} onClose={() => setOpenPhoto(null)} />}
    </section>
  )
}
