import { motion, useReducedMotion } from 'motion/react'
import { SECTION_IDS } from '../../config/site'
import { useLocale } from '../../i18n/useLocale'

/**
 * Логотип-вордмарк: оранжевый значок дороги + JOLTIME.
 * При загрузке дорога «рисуется», при наведении значок чуть наклоняется, а разметка бежит.
 */
export function Logo({ className = '' }: { className?: string }) {
  const { t } = useLocale()
  const reduced = useReducedMotion()

  return (
    <a href={`#${SECTION_IDS.top}`} aria-label={t.common.toHome} className={`group flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="16" fill="#FF6B00" />
        <motion.path
          d="M20 46 L32 14 L44 46"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        />
        <path
          d="M32 30v16"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="4 6"
          className="group-hover:animate-logo-dash motion-reduce:animate-none"
        />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight text-ink">
        JOL
        <span className="inline-block text-brand-500 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">TIME</span>
      </span>
    </a>
  )
}
