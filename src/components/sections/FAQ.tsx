import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { Reveal, SectionTitle } from '../ui'
import { EASE_OUT } from '../../lib/motion'
import { useLocale } from '../../i18n/useLocale'
import { SECTION_IDS } from '../../config/site'

export function FAQ() {
  const { t } = useLocale()
  const f = t.faq
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id={SECTION_IDS.faq} className="scroll-mt-24 py-14 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionTitle eyebrow={f.eyebrow} title={f.titleStart} accent={f.titleAccent} text={f.text} />

        <Reveal delay={0.1} className="divide-y divide-line rounded-3xl bg-surface ring-1 ring-line">
          {f.items.map((item, i) => {
            const isOpen = openIndex === i
            const panelId = `faq-panel-${i}`
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
                >
                  <span className="font-display text-base font-bold sm:text-lg">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      isOpen ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-600 dark:text-brand-300'
                    }`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 text-[15px] leading-relaxed text-ink-soft sm:px-7 sm:text-base">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
