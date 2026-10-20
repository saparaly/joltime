import { motion, useReducedMotion } from 'motion/react'
import { SECTION_IDS } from '../../config/site'
import { useLocale } from '../../i18n/useLocale'

/**
 * Логотип-вордмарк: JOL + оранжевое TIME, под словом — «дорожка» с разметкой.
 * При загрузке дорожка выезжает слева направо, при наведении разметка бежит (см. .logo-road в index.css).
 * Фавикон — отдельный знак (белая J на оранжевом квадрате, public/favicon.svg).
 */
export function Logo({ className = '' }: { className?: string }) {
  const { t } = useLocale()
  const reduced = useReducedMotion()

  return (
    <a href={`#${SECTION_IDS.top}`} aria-label={t.common.toHome} className={`group inline-flex flex-col gap-[5px] ${className}`}>
      <span className="font-display text-[1.45rem] font-extrabold leading-none tracking-tight text-ink">
        JOL
        <span className="inline-block text-brand-500 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">TIME</span>
      </span>
      <motion.span
        aria-hidden="true"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        className="logo-road relative block h-[5px] origin-left overflow-hidden rounded-full bg-brand-500"
      />
    </a>
  )
}
