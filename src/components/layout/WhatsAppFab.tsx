import { MessageCircle, Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useScrolled } from '../../hooks/useScrolled'
import { useLocale } from '../../i18n/useLocale'
import { PHONE_TEL, waLink } from '../../config/site'

/** Мобильная липкая панель внизу + плавающая кнопка WhatsApp на десктопе. */
export function WhatsAppFab() {
  const show = useScrolled(400)
  const { t } = useLocale()
  const href = waLink(t.common.waDefault)

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-2xl bg-surface p-2 shadow-[0_-4px_30px_-10px_rgb(0_0_0/0.3)] ring-1 ring-line lg:hidden"
            style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
          >
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> {t.common.signUpFree}
            </a>
            <a href={PHONE_TEL} aria-label={t.common.call} className="flex items-center justify-center rounded-xl bg-ink px-4 text-paper">
              <Phone className="h-5 w-5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.common.writeWa}
        className="group fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-soft transition hover:scale-105 hover:bg-brand-600 lg:flex"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400" aria-hidden="true" />
        <MessageCircle className="relative h-6 w-6" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-paper opacity-0 transition group-hover:opacity-100">
          {t.common.writeWa}
        </span>
      </a>
    </>
  )
}
