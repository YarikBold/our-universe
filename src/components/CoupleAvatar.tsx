import { useState } from 'react'

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
  return <>
    <div className={`couple-avatar couple-avatar--${size} ${className}`.trim()}>
      <span className="couple-avatar__name">{girlfriendName}</span>
      <button type="button" className="couple-avatar__button" aria-label="Открыть нашу фотографию" onClick={showZoom}>
        <span className="couple-avatar__halo" aria-hidden="true" />
        <span className="couple-avatar__image">
          {!broken && imageSrc ? <img src={imageSrc} alt={`Совместная фотография: ${girlfriendName} и ${boyfriendName}`} width={480} height={480} fetchPriority="high" onError={() => setBroken(true)} /> : <span className="couple-avatar__placeholder" aria-hidden="true">♡</span>}
        </span>
        <span className="couple-avatar__sparkle couple-avatar__sparkle--one" aria-hidden="true">✦</span>
        <span className="couple-avatar__sparkle couple-avatar__sparkle--two" aria-hidden="true">·</span>
      </button>
      <span className="couple-avatar__name">{boyfriendName}</span>
    </div>
    {zoomed && <div className="couple-avatar-modal" role="dialog" aria-modal="true" aria-label="Наша фотография" onClick={() => setZoomed(false)}>
      <button className="couple-avatar-modal__close" type="button" aria-label="Закрыть фотографию" onClick={() => setZoomed(false)}>×</button>
      <div className="couple-avatar-modal__frame" onClick={(event) => event.stopPropagation()}>
        {!broken && imageSrc ? <img src={imageSrc} alt={`Совместная фотография: ${girlfriendName} и ${boyfriendName}`} width={900} height={900} /> : <span className="couple-avatar__placeholder" aria-hidden="true">♡</span>}
      </div>
    </div>}
  </>
}

export default CoupleAvatar
