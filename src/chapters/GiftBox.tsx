import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { FallingHearts } from '../components/FallingHearts'
import { SceneWipe } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'

export function GiftBox({ onNext }: { onNext: () => void }) {
 const [open,setOpen]=useState(false)
 return <section className="gift-scene"><FallingHearts count={open?18:7} speed={.7}/><SceneWipe className="scene-atmosphere"><div className="gift-inner"><span className="eyebrow">Глава четвёртая · коробочка сюрпризов</span><h2>{loveStory.chapters.giftTitle}</h2><p>{loveStory.chapters.giftText}</p><div className="gift-stage-label">a small collection of reasons</div><div className={`gift-box-wrap ${open?'open':''}`}><div className="gift-box"/><div className="gift-lid"/><div className="gift-ribbon"/>{open&&<div className="gift-heart-burst" aria-hidden="true">{Array.from({length:12},(_,i)=><span key={i} style={{'--i':i} as React.CSSProperties}>♥</span>)}</div>}</div>{!open&&<button className="romantic-button" onClick={()=>setOpen(true)}>Развязать ленточку</button>}{open&&<><div className="reasons-grid">{loveStory.loveReasons.map((reason,i)=><div className="reason-card" key={reason} style={{'--i':i} as React.CSSProperties}>{reason}</div>)}</div><p className="reasons-note">И это только двадцать причин. На самом деле их гораздо больше…</p><div className="scene-actions"><button className="romantic-button" onClick={onNext}>Последняя глава нашей истории ♡ <ArrowRight size={16}/></button></div></>}</div></SceneWipe></section>
}
