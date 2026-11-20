import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function MusicPlayer({ src, active }: { src: string; active: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(false)
  const [available, setAvailable] = useState(true)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (!active) {
      audio.pause()
      return
    }
    audio.volume = 0.28
    audio.play().catch(() => undefined)
  }, [active])
  if (!available) return null
  return <><audio ref={audioRef} src={src} loop preload="none" onError={() => setAvailable(false)} />{active && <button className="music-toggle" aria-label={muted ? 'Включить музыку' : 'Выключить музыку'} onClick={() => { const a = audioRef.current; if (!a) return; if (muted) { a.muted = false; a.play().catch(() => undefined) } else a.muted = true; setMuted(!muted) }}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}<span>{muted ? 'Музыка выключена' : 'Музыка'}</span></button>}</>
}
