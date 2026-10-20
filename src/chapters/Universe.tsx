import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { CoupleAvatar } from '../components/CoupleAvatar'
import { CameraDrift, FadeIn, SceneWipe } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'

export function Universe({ onNext, onMusicStart }: { onNext: () => void; onMusicStart: () => void }) {
  const [opened, setOpened] = useState(false)
  const [stars, setStars] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const all = stars.length === loveStory.universe.stars.length
  const enter = () => { setOpened(true); onMusicStart() }
  if (!opened) return <section className="universe-scene"><div className="scene-orb scene-orb--pink"/><div className="scene-orb scene-orb--lavender"/><CameraDrift className="scene-atmosphere"><div className="scene-inner universe-intro"><FadeIn><span className="eyebrow">Наша маленькая вселенная</span><h1 className="display-serif">{loveStory.universe.intro}</h1><p>{loveStory.universe.introSecond}</p><div className="scene-actions"><button className="romantic-button" onClick={enter}>Открыть наше маленькое чудо ♡</button></div></FadeIn></div></CameraDrift></section>
  return <section className="universe-scene"><div className="scene-orb scene-orb--pink"/><div className="scene-orb scene-orb--lavender"/><SceneWipe className="scene-atmosphere"><div className="scene-inner universe-main"><FadeIn><span className="eyebrow">Глава первая · звёздное начало</span><h2 className="chapter-title display-serif">{loveStory.universe.title}</h2><p className="chapter-copy">{loveStory.universe.subtitle}</p><div className="avatar-wrap"><CoupleAvatar imageSrc={loveStory.couplePhoto} girlfriendName={loveStory.girlfriendName} boyfriendName={loveStory.boyfriendName}/></div></FadeIn><div className="star-field">{loveStory.universe.stars.map((star, i) => { const isOpen=stars.includes(i); return <button key={star.title} className={`star-button ${isOpen?'is-open':''}`} onClick={() => { setSelected(i); if(!isOpen) setStars([...stars,i]) }}><span aria-hidden="true">{isOpen?'✦':'✧'}</span><strong>{star.title}</strong></button> })}</div>{selected !== null && <div className="star-message" role="status"><Sparkles size={15} color="var(--gold)"/> {loveStory.universe.stars[selected].text}</div>}{all && <><p className="star-complete">А теперь давай вспомним, с чего всё началось…</p><div className="scene-actions"><button className="romantic-button" onClick={onNext}>Наша история <ArrowRight size={16} /></button></div></>}</div></SceneWipe></section>
}
