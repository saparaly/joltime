import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Reveal } from './Reveal'
import { EASE_OUT } from '../../lib/motion'

type SectionTitleProps = {
  eyebrow: string
  /** Обычная часть заголовка */
  title: string
  /** Акцентная (оранжевая) часть заголовка */
  accent?: string
  text?: ReactNode
  align?: 'left' | 'center'
}

export function SectionTitle({ eyebrow, title, accent, text, align = 'left' }: SectionTitleProps) {
  const words = [
    ...title.split(' ').map((w) => ({ w, accent: false })),
    ...(accent ? accent.split(' ').map((w) => ({ w, accent: true })) : []),
  ]

  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
        {words.map(({ w, accent: isAccent }, i) => (
          <motion.span
            key={`${w}-${i}`}
            initial={{ opacity: 0, y: '0.4em' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 * i }}
            className={`inline-block ${isAccent ? 'text-brand-500' : ''}`}
          >
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        ))}
      </h2>
      {text && <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{text}</p>}
    </Reveal>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  )
}
