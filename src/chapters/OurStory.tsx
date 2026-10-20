import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { CoupleAvatar } from '../components/CoupleAvatar'
import { RelationshipCounter } from '../components/RelationshipCounter'
import { FadeIn, SceneWipe } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'

export function OurStory({ onNext }: { onNext: () => void }) {
 const [active, setActive] = useState(0)
 return <section className="story-scene"><SceneWipe className="scene-atmosphere"><div className="scene-inner"><div className="story-heading"><FadeIn><span className="eyebrow">Глава вторая · страницы нашей истории</span><h2 className="chapter-title display-serif">{loveStory.chapters.storyTitle}</h2><p className="chapter-copy">{loveStory.chapters.storySubtitle}</p></FadeIn></div><div className="memories-grid">{loveStory.memories.map((memory,i)=><button key={memory.title} className={`memory-card ${active===i?'is-active':''}`} onClick={()=>setActive(i)} aria-label={`Открыть воспоминание: ${memory.title}`} style={{'--tilt': `${i%2===0?-1.5:2}deg`} as React.CSSProperties}><div className="memory-photo">{memory.image?<img src={memory.image} alt={memory.title} width={640} height={720} loading="lazy"/>:<span className="memory-placeholder">Наше фото<br/>♡</span>}</div>{memory.date&&<div className="memory-date">{memory.date}</div>}<h3 className="memory-title">{memory.title}</h3><p className="memory-copy">{memory.text}</p></button>)}</div><RelationshipCounter startDate={loveStory.startDate}/><div className="scene-actions"><button className="romantic-button" onClick={onNext}>А теперь небольшая игра для моего Котика <ArrowRight size={16}/></button></div></div></SceneWipe></section>
}
