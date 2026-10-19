import { Baby, CalendarClock, GraduationCap, HeartHandshake, MapPinned, MonitorSmartphone, Target, Wallet, type LucideIcon } from 'lucide-react'
import { Reveal, SectionTitle } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { SECTION_IDS } from '../../config/site'
import { useSpotlight } from '../../hooks/useSpotlight'

const ICONS: Record<string, LucideIcon> = { Target, CalendarClock, HeartHandshake, MapPinned, Wallet, MonitorSmartphone, Baby, GraduationCap }

export function WhyUs() {
  const { t } = useLocale()
  const w = t.why
  const spotlight = useSpotlight()

  return (
    <section id={SECTION_IDS.why} className="relative scroll-mt-24 overflow-hidden bg-surface py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="container-x">
        <SectionTitle eyebrow={w.eyebrow} title={w.titleStart} accent={w.titleAccent} text={w.text} align="center" />

        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {w.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Target
            return (
              <Reveal key={item.title} delay={(i % 4) * 0.08}>
                <article onMouseMove={spotlight} className="spotlight group relative h-full rounded-3xl bg-paper p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:ring-brand-200 sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold leading-snug">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{item.text}</p>
                  <span className="absolute right-6 top-6 font-display text-sm font-bold text-brand-200 dark:text-brand-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
