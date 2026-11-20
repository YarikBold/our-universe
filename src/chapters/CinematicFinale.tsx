import { useState } from 'react'
import { Mail } from 'lucide-react'
import { CoupleAvatar } from '../components/CoupleAvatar'
import { FallingHearts } from '../components/FallingHearts'
import { PetalField, SceneWipe } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'

export function CinematicFinale({ onLetter }: { onLetter: () => void }) {
  const [scene, setScene] = useState(0)
  const [done, setDone] = useState(false)
  const sceneCount = loveStory.finaleScenes.length
  const background = loveStory.finalePhotos[scene]

  const advance = () => {
    if (scene + 1 < sceneCount) setScene(scene + 1)
    else setDone(true)
  }

  return (
    <section className="finale-scene">
      {background && (
        <div className="finale-photo" aria-hidden="true">
          <img key={background.src} src={background.src} alt="" style={{ objectPosition: background.position }} onError={(event) => { event.currentTarget.hidden = true }} />
        </div>
      )}
      <FallingHearts count={10} speed={.45} />
      <PetalField count={16} />
      <div className="sakura-branch" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <i key={index} className="sakura-bloom" style={{
            left: `${10 + (index * 37) % 85}%`,
            bottom: `${18 + (index * 17) % 65}%`,
            transform: `scale(${.55 + (index % 4) * .15})`,
          }} />
        ))}
      </div>
      <SceneWipe className="scene-atmosphere">
        <div className="scene-inner finale-content">
          {!done ? (
            <div className="finale-scene-copy">
              <span className="eyebrow">Глава пятая · путешествие в тот самый день</span>
              <p className="finale-line display-serif" key={scene}>{loveStory.finaleScenes[scene]}</p>
              <button className="romantic-button" onClick={advance}>Продолжить ♡</button>
              <div className="finale-dots" aria-label={`Сцена ${scene + 1} из ${sceneCount}`}>
                {loveStory.finaleScenes.map((line, index) => <span key={line} className={index === scene ? 'is-active' : ''} />)}
              </div>
            </div>
          ) : (
            <>
              <span className="eyebrow">С годовщиной</span>
              <h2 className="chapter-title display-serif">{loveStory.chapters.finaleTitle}</h2>
              <p className="chapter-copy">{loveStory.chapters.finaleSubtitle}</p>
              <div className="finale-avatar">
                <CoupleAvatar imageSrc={loveStory.couplePhoto} girlfriendName={loveStory.girlfriendName} boyfriendName={loveStory.boyfriendName} />
              </div>
              <div className="finale-signature">Котик ♡ Любимый</div>
              <div className="scene-actions">
                <button className="romantic-button" onClick={onLetter}><Mail size={16} /> Прочитать моё письмо</button>
              </div>
            </>
          )}
        </div>
      </SceneWipe>
    </section>
  )
}
