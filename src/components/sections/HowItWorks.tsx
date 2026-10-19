import { motion } from 'motion/react'
import { Reveal, SectionTitle, WhatsAppButton, RichText } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { SECTION_IDS } from '../../config/site'

export function HowItWorks() {
  const { t } = useLocale()
  const h = t.how

  return (
    <section id={SECTION_IDS.how} className="scroll-mt-24 bg-surface py-14 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle eyebrow={h.eyebrow} title={h.titleStart} accent={h.titleAccent} text={<RichText text={h.text} />} />
          <Reveal delay={0.15} className="mt-8 hidden lg:block">
            <WhatsAppButton label={h.cta} />
          </Reveal>
        </div>

        <div>
          <ol className="relative space-y-4 sm:space-y-6">
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
              className="absolute bottom-6 left-[1.35rem] top-6 w-0.5 origin-top bg-gradient-to-b from-brand-500 to-brand-200 sm:left-7"
            />
            {h.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} y={30}>
                <li className="relative flex gap-4 rounded-3xl bg-surface p-5 ring-1 ring-line sm:gap-6 sm:p-7">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.08 + 0.15 }}
                    className="font-display relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-soft sm:h-14 sm:w-14 sm:text-base"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </motion.div>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft sm:text-base">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-6 lg:hidden">
            <WhatsAppButton label={h.cta} className="w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
