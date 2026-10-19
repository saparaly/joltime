import { useEffect } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

type LightboxProps = {
  src: string | null
  alt: string
  closeLabel: string
  onClose: () => void
}

/** Простой просмотр картинки на весь экран. Закрывается по Esc, клику на фон и кнопке. */
export function Lightbox({ src, alt, closeLabel, onClose }: LightboxProps) {
  const open = src !== null
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0f1626]/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.img
            src={src}
            alt={alt}
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90dvh] max-w-full rounded-2xl shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
