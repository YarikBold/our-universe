import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId } from 'react'
import { X } from 'lucide-react'

type LoveLetterModalProps = {
  open: boolean
  title: string
  body: string
  onClose: () => void
  onRead: () => void
}

export function LoveLetterModal({ open, title, body, onClose, onRead }: LoveLetterModalProps) {
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="letter-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            initial={{ y: 30, scale: .96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: .97 }}
          >
            <button type="button" className="modal-close" onClick={onClose} aria-label="Закрыть письмо"><X size={19} /></button>
            <div className="letter-seal" aria-hidden="true">♡</div>
            <h2 id={`${id}-title`}>{title}</h2>
            <div className="letter-body">
              {body.split('\n').map((line, index) => <p key={index}>{line || '\u00A0'}</p>)}
            </div>
            <button
              type="button"
              className="primary-button"
              onClick={() => { onRead(); onClose() }}
            >
              Обнимаю тебя ♡
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
