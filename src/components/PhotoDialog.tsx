import { useEffect, useRef } from 'react'

export function PhotoDialog({ src, alt, onClose }: { src?: string; alt: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="photo-dialog"
      aria-label="Фотография"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="photo-dialog__frame">
        <button type="button" className="photo-dialog__close" aria-label="Закрыть фотографию" onClick={() => dialogRef.current?.close()}>×</button>
        {src ? <img src={src} alt={alt} /> : <span className="couple-avatar__placeholder" aria-hidden="true">♡</span>}
      </div>
    </dialog>
  )
}
