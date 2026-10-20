import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'
import { CoupleAvatar } from '../components/CoupleAvatar'
import { FallingHearts } from '../components/FallingHearts'
import { PetalField, SceneWipe } from '../components/MotionPrimitives'
import { loveStory } from '../data/loveStory'

export function CinematicFinale({ onLetter }: { onLetter: () => void }) {
 const [scene,setScene]=useState(0)
 const [done,setDone]=useState(false)
 useEffect(()=>{setDone(false);setScene(0)},[])
 const advance=()=>{ if(scene<loveStory.finaleScenes.length-1)setScene(scene+1);else setDone(true) }
 return <section className="finale-scene"><FallingHearts count={10} speed={.45}/><PetalField count={16} /><div className="sakura-branch" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} className="sakura-bloom" style={{left:`${10+(i*37)%85}%`,bottom:`${18+(i*17)%65}%`,transform:`scale(${.55+(i%4)*.15})`}}/>)}</div><SceneWipe className="scene-atmosphere"><div className="scene-inner finale-content">{!done?<div className="finale-scene-copy"><span className="eyebrow">Глава пятая · путешествие в тот самый день</span><p className="finale-line display-serif" key={scene}>{loveStory.finaleScenes[scene]}</p><button className="romantic-button" onClick={advance}>Продолжить ♡</button><div className="finale-dots" aria-label={`Сцена ${scene+1} из 4`}>{loveStory.finaleScenes.map((_,i)=><span key={i} className={i===scene?'is-active':''}/>)}</div></div>:<><span className="eyebrow">С годовщиной</span><h2 className="chapter-title display-serif">{loveStory.chapters.finaleTitle}</h2><p className="chapter-copy">{loveStory.chapters.finaleSubtitle}</p><div className="finale-avatar"><CoupleAvatar imageSrc={loveStory.couplePhoto} girlfriendName={loveStory.girlfriendName} boyfriendName={loveStory.boyfriendName}/></div><div className="finale-signature">Котик ♡ Любимый</div><div className="scene-actions"><button className="romantic-button" onClick={onLetter}><Mail size={16}/> Прочитать моё письмо</button></div></>}</div></SceneWipe></section>
}
