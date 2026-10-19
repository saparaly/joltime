import { Quote } from 'lucide-react'
import { Reveal, SectionTitle, RichText } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { SECTION_IDS } from '../../config/site'

export function Mission() {
  const { t } = useLocale()
  const m = t.mission

  return (
    <section id={SECTION_IDS.about} className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionTitle eyebrow={m.eyebrow} title={m.titleStart} accent={m.titleAccent} />
        <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          <p><RichText text={m.p1} /></p>
          <p><RichText text={m.p2} /></p>
          <figure className="relative mt-2 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:p-8">
            <Quote className="absolute -top-4 left-6 h-9 w-9 rounded-full bg-brand-500 p-2 text-white" aria-hidden="true" />
            <blockquote className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">{m.quote}</blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-brand-700 dark:text-brand-300">{m.quoteAuthor}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
