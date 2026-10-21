import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { FallingHearts } from '../components/FallingHearts'
import { SceneWipe } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'

export function GiftBox({ onNext }: { onNext: () => void }) {
 const [open,setOpen]=useState(false)
 const [revealedCount,setRevealedCount]=useState(0)
 const reasons = loveStory.loveReasons
 const allReasonsRevealed = revealedCount >= reasons.length

 const openGift = () => {
   setOpen(true)
   setRevealedCount(1)
 }

 const revealNext = () => setRevealedCount((count) => Math.min(reasons.length, count + 1))

 return <section className="gift-scene"><FallingHearts count={open?18:7} speed={.7}/><SceneWipe className="scene-atmosphere"><div className="gift-inner"><span className="eyebrow">Глава четвёртая · коробочка сюрпризов</span><h2>{loveStory.chapters.giftTitle}</h2><p>{loveStory.chapters.giftText}</p><div className="gift-stage-label"><span>✦</span> a small collection of reasons <span>✦</span></div><div className="gift-stage"><div className="gift-stage__halo" aria-hidden="true"/><div className="gift-stage__sparkles" aria-hidden="true"><i>✦</i><i>·</i><i>✧</i><i>·</i><i>✦</i></div><div className={`gift-box-wrap ${open?'open':''}`}><div className="gift-box"><span className="gift-box__inside" aria-hidden="true"/><span className="gift-box__ribbon" aria-hidden="true"/></div><div className="gift-lid"><span className="gift-lid__edge" aria-hidden="true"/></div><div className="gift-ribbon" aria-hidden="true"><span className="gift-ribbon__loop gift-ribbon__loop--left"/><span className="gift-ribbon__loop gift-ribbon__loop--right"/><span className="gift-ribbon__knot"/></div>{open&&<div className="gift-heart-burst" aria-hidden="true">{Array.from({length:16},(_,i)=><span key={i} style={{'--i':i} as React.CSSProperties}>♥</span>)}</div>}</div></div>{!open&&<button className="romantic-button gift-open-button" onClick={openGift}>Развязать ленточку 🎀</button>}{open&&<div className="reasons-deck" aria-live="polite"><div className="reasons-deck__header"><span className="reasons-deck__eyebrow">карточка {revealedCount} из {reasons.length}</span><span className="reasons-deck__line"><i style={{width:`${(revealedCount/reasons.length)*100}%`}}/></span></div><div className="reasons-grid">{reasons.slice(0,revealedCount).map((reason,i)=><article className="reason-card" key={reason} style={{'--i':i} as React.CSSProperties}><span className="reason-card__number">{String(i+1).padStart(2,'0')}</span><span className="reason-card__ornament" aria-hidden="true">♡</span><p>{reason}</p></article>)}</div>{!allReasonsRevealed&&<button className="romantic-button card-draw-button" onClick={revealNext}>Достать ещё карточку ♡</button>}{allReasonsRevealed&&<><p className="reasons-note">И это только двадцать причин. На самом деле их гораздо больше…</p><div className="scene-actions"><button className="romantic-button" onClick={onNext}>Последняя глава нашей истории ♡ <ArrowRight size={16}/></button></div></>}</div>}</div></SceneWipe></section>
}
