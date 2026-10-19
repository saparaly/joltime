import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Gift, KeyRound, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Eyebrow, Reveal, SectionTitle, WhatsAppButton } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { format, type Dictionary } from '../../i18n'
import { SECTION_IDS } from '../../config/site'
import { EASE_OUT } from '../../lib/motion'
import { useSpotlight } from '../../hooks/useSpotlight'

type PricingDict = Dictionary['pricing']
type Group = keyof PricingDict['groups']
type Package = PricingDict['groups'][Group][number]

const GROUP_ORDER: Group[] = ['courses', 'driving', 'retake']
const VISIBLE_BULLETS = 6

export function Pricing() {
  const { t } = useLocale()
  const p = t.pricing
  const [group, setGroup] = useState<Group>('courses')
  const [highlight, setHighlight] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const spotlight = useSpotlight()

  /** Спецпредложение: переключить вкладку, подсветить и проскроллить к пакету */
  const jumpTo = useCallback((target: Group, index: number) => {
    setGroup(target)
    setHighlight(index)
    requestAnimationFrame(() => {
      gridRef.current?.querySelectorAll<HTMLElement>('[data-package]')[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }, [])

  useEffect(() => {
    if (highlight === null) return
    const id = window.setTimeout(() => setHighlight(null), 2500)
    return () => window.clearTimeout(id)
  }, [highlight])

  return (
    <section id={SECTION_IDS.pricing} className="scroll-mt-24 bg-surface py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle eyebrow={p.eyebrow} title={p.titleStart} accent={p.titleAccent} text={p.text} align="center" />

        {/* Вкладки */}
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <div role="tablist" aria-label={p.eyebrow} className="flex w-full max-w-2xl gap-1 rounded-full bg-paper p-1 ring-1 ring-line">
            {GROUP_ORDER.map((g) => {
              const active = g === group
              return (
                <button
                  key={g}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`pricing-panel-${g}`}
                  onClick={() => setGroup(g)}
                  className={`relative flex-1 rounded-full px-3 py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                    active ? 'text-white' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span layoutId="pricing-tab" className="absolute inset-0 rounded-full bg-brand-500 shadow-soft" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{p.tabs[g]}</span>
                </button>
              )
            })}
          </div>
        </Reveal>
        <p className="mt-3 text-center text-sm text-ink-soft">{p.tabHints[group]}</p>

        {/* Карточки */}
        <div ref={gridRef} id={`pricing-panel-${group}`} role="tabpanel" className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="wait" initial={false}>
            {p.groups[group].map((pkg, i) => (
              <motion.div
                key={`${group}-${pkg.name}`}
                data-package
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.05 }}
              >
                <PackageCard pkg={pkg} dict={p} highlighted={highlight === i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Спецпредложения */}
        <Reveal className="mt-14 sm:mt-20">
          <div className="text-center">
            <Eyebrow>{p.offers.eyebrow}</Eyebrow>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-6">
            {p.offers.items.map((offer, i) => {
              const Icon = i === 0 ? KeyRound : RotateCcw
              return (
                <article key={offer.question} onMouseMove={spotlight} className="spotlight flex items-start gap-4 rounded-3xl bg-paper p-6 ring-1 ring-line transition hover:ring-brand-200 sm:p-7">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug">{offer.question}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{offer.text}</p>
                    <button
                      type="button"
                      onClick={() => jumpTo(offer.group, offer.index)}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                    >
                      {offer.cta} →
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PackageCard({ pkg, dict, highlighted }: { pkg: Package; dict: PricingDict; highlighted: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const spotlight = useSpotlight()
  const hidden = pkg.bullets.length - VISIBLE_BULLETS
  const bullets = expanded ? pkg.bullets : pkg.bullets.slice(0, VISIBLE_BULLETS)

  return (
    <article
      onMouseMove={spotlight}
      className={`spotlight relative flex h-full flex-col rounded-3xl p-6 ring-1 transition-all duration-500 sm:p-7 ${
        pkg.featured ? 'border-glow bg-paper ring-transparent shadow-card' : 'bg-paper ring-line hover:-translate-y-1 hover:shadow-card'
      } ${highlighted ? 'ring-2 ring-brand-500 shadow-[0_0_0_6px_rgb(255_107_0/0.15)]' : ''}`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
          {dict.popular}
        </span>
      )}

      {pkg.volume && (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100 dark:text-brand-300">
          <Gift className="h-3.5 w-3.5" aria-hidden="true" /> {pkg.volume}
        </span>
      )}
      <h3 className="font-display mt-3 text-2xl font-bold leading-tight">{pkg.name}</h3>
      <p className="mt-1 font-semibold text-ink">{pkg.tagline}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{pkg.desc}</p>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-soft">{dict.included}</p>
      <ul className="mt-2 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 inline-flex items-center gap-1 self-start text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          {expanded ? dict.less : format(dict.more, { n: hidden })}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      )}

      <p className="mt-5 text-sm italic leading-relaxed text-ink-soft">{pkg.audience}</p>

      {/* Цена — в конце карточки */}
      <div className="mt-auto border-t border-line pt-5">
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-extrabold tracking-tight text-ink">{pkg.price}</span>
          {pkg.priceNote && <span className="text-sm font-semibold text-ink-soft">{pkg.priceNote}</span>}
        </p>
        <WhatsAppButton
          label={dict.choose}
          message={format(dict.waMessage, { title: pkg.name, price: pkg.price + (pkg.priceNote ?? '') })}
          variant={pkg.featured ? 'primary' : 'ghost'}
          className="mt-4 w-full !py-3 !text-sm"
        />
      </div>
    </article>
  )
}
