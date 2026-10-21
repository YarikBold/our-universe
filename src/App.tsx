import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { CinematicFinale } from './chapters/CinematicFinale'
import { GiftBox, GIFT_PROGRESS_STORAGE_KEY } from './chapters/GiftBox'
import HeartGame from './chapters/HeartGame'
import { OurStory } from './chapters/OurStory'
import { Universe } from './chapters/Universe'
import { LoveLetterModal } from './components/LoveLetterModal'
import { MusicPlayer } from './components/MusicPlayer'
import { ProgressIndicator } from './components/ProgressIndicator'
import { RelationshipCounter } from './components/RelationshipCounter'
import { SecretButton } from './components/SecretButton'
import { loveStory } from './data/loveStory'

const chapterLabels = ['Вселенная', 'Наша история', 'Сад сердец', 'Сюрприз', 'Финал']

function readNumber(key: string, fallback: number) { try { const raw = localStorage.getItem(key); return raw ? Number(raw) : fallback } catch { return fallback } }
function readBoolean(key: string) { try { return localStorage.getItem(key) === 'true' } catch { return false } }

export default function App() {
  const [chapter, setChapter] = useState(() => Math.min(5, Math.max(1, readNumber('our-universe:chapter', 1))))
  const [musicActive, setMusicActive] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(() => readBoolean('our-universe:secret'))
  const [gameFound, setGameFound] = useState(0)

  useEffect(() => { localStorage.setItem('our-universe:chapter', String(chapter)); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [chapter])
  const advance = (next: number) => setChapter((current) => Math.max(current, Math.min(5, next)))
  const restart = () => { if (window.confirm('Начать нашу историю заново? Прогресс и найденные сердечки будут сброшены.')) { localStorage.removeItem('our-universe:chapter'); localStorage.removeItem('our-universe:heart-game'); localStorage.removeItem('our-universe:secret'); localStorage.removeItem(GIFT_PROGRESS_STORAGE_KEY); setChapter(1); setSecretUnlocked(false); setGameFound(0) } }
  const openSecret = () => { setSecretOpen(true) }
  return <main className="app-shell">
    <a className="skip-link" href="#main-content">Перейти к содержимому</a>
    <header className="app-topbar">
      <span className="app-brand">Наша маленькая вселенная</span>
      <ProgressIndicator currentChapter={chapter} labels={chapterLabels} onChapterSelect={(value) => value <= chapter && setChapter(value)} />
      <div className="app-right-tools"><RelationshipCounter startDate={loveStory.startDate} compact/><MusicPlayer src={loveStory.musicPath} active={musicActive}/><SecretButton unlocked={secretUnlocked} onClick={openSecret}/></div>
    </header>
    <div className="chapter-shell" id="main-content">
      {chapter === 1 && <Universe onNext={() => advance(2)} onMusicStart={() => setMusicActive(true)} />}
      {chapter === 2 && <OurStory onNext={() => advance(3)} />}
      {chapter === 3 && <section className="universe-scene"><div className="scene-inner"><HeartGame messages={loveStory.gameMessages} initialFound={gameFound} onProgress={setGameFound} onComplete={() => advance(4)} /></div></section>}
      {chapter === 4 && <GiftBox onNext={() => advance(5)} />}
      {chapter === 5 && <CinematicFinale onLetter={() => setLetterOpen(true)} />}
    </div>
    <footer className="app-footer"><button className="reset-button" onClick={restart}><Heart size={13}/> Пройти нашу историю заново</button></footer>
    <LoveLetterModal open={letterOpen} title={loveStory.letter.title} body={loveStory.letter.body} onClose={() => setLetterOpen(false)} onRead={() => { setSecretUnlocked(true); localStorage.setItem('our-universe:secret','true') }} />
    <LoveLetterModal open={secretOpen} title={secretUnlocked ? loveStory.secret.title : 'Маленький секрет'} body={secretUnlocked ? loveStory.secret.body : loveStory.secret.teaser} onClose={() => setSecretOpen(false)} onRead={() => undefined} />
  </main>
}
