import { CalendarClock, GraduationCap, HeartHandshake, MapPinned, MonitorSmartphone, Target, Wallet, type LucideIcon } from 'lucide-react'
import { Reveal, SectionTitle } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { SECTION_IDS } from '../../config/site'
import { useSpotlight } from '../../hooks/useSpotlight'

const ICONS: Record<string, LucideIcon> = { Target, CalendarClock, HeartHandshake, MapPinned, Wallet, MonitorSmartphone, GraduationCap }

export function WhyUs() {
  const { t } = useLocale()
  const w = t.why
  const spotlight = useSpotlight()

  return (
    <section id={SECTION_IDS.why} className="relative scroll-mt-24 overflow-hidden py-14 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 hidden h-96 w-96 rounded-full bg-brand-100/70 blur-3xl lg:block" />
      <div className="container-x">
        <SectionTitle eyebrow={w.eyebrow} title={w.titleStart} accent={w.titleAccent} text={w.text} align="center" />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {w.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Target
            return (
              <Reveal key={item.title} delay={(i % 4) * 0.08}>
                <article onMouseMove={spotlight} className="spotlight group relative h-full rounded-2xl bg-surface p-4 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:ring-brand-200 sm:rounded-3xl sm:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 sm:h-12 sm:w-12 sm:rounded-2xl text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-4 text-[15px] font-bold leading-snug sm:mt-5 sm:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft sm:mt-2 sm:text-[15px]">{item.text}</p>
                  <span className="absolute right-4 top-4 hidden font-display text-sm font-bold text-brand-200 sm:right-6 sm:top-6 sm:block dark:text-brand-700">
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
