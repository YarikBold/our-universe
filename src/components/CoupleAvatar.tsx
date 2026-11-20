import { useState } from 'react'
import { PhotoDialog } from './PhotoDialog'

export interface CoupleAvatarProps {
  imageSrc?: string
  girlfriendName?: string
  boyfriendName?: string
  size?: 'sm' | 'lg'
  onOpen?: () => void
  className?: string
}

export function CoupleAvatar({ imageSrc = '/images/us.jpg', girlfriendName = 'Котик', boyfriendName = 'Любимый', size = 'lg', onOpen, className = '' }: CoupleAvatarProps) {
  const [broken, setBroken] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const showZoom = () => { setZoomed(true); onOpen?.() }
  const alt = `Совместная фотография: ${girlfriendName} и ${boyfriendName}`
  return <>
    <div className={`couple-avatar couple-avatar--${size} ${className}`.trim()}>
      <span className="couple-avatar__name">{girlfriendName}</span>
      <button type="button" className="couple-avatar__button" aria-label="Открыть нашу фотографию" aria-haspopup="dialog" onClick={showZoom}>
        <span className="couple-avatar__halo" aria-hidden="true" />
        <span className="couple-avatar__image">
          {!broken && imageSrc ? <img src={imageSrc} alt={alt} width={480} height={480} fetchPriority="high" onError={() => setBroken(true)} /> : <span className="couple-avatar__placeholder" aria-hidden="true">♡</span>}
        </span>
        <span className="couple-avatar__sparkle couple-avatar__sparkle--one" aria-hidden="true">✦</span>
        <span className="couple-avatar__sparkle couple-avatar__sparkle--two" aria-hidden="true">·</span>
      </button>
      <span className="couple-avatar__name">{boyfriendName}</span>
    </div>
    {zoomed && <PhotoDialog src={broken ? undefined : imageSrc} alt={alt} onClose={() => setZoomed(false)} />}
  </>
}

export default CoupleAvatar
