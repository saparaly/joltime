import { useCallback, useState } from 'react'
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
const groupId = (g: Group) => `${SECTION_IDS.pricing}-${g}`
const rowId = (g: Group, i: number) => `${groupId(g)}-${i}`

/**
 * Цены в формате прайс-листа: три направления, в каждом — строки «название · суть · цена».
 * Ничего не спрятано во вкладках и не листается вбок; подробности пакета раскрываются по тапу.
 * Открыта только одна строка за раз, чтобы список оставался коротким.
 */
export function Pricing() {
  const { t } = useLocale()
  const p = t.pricing
  const [open, setOpen] = useState<string | null>(null)
  const spotlight = useSpotlight()

  const toggle = useCallback((id: string) => setOpen((cur) => (cur === id ? null : id)), [])

  /** Спецпредложение: раскрыть нужный пакет и проскроллить к нему */
  const jumpTo = useCallback((group: Group, index: number) => {
    const id = rowId(group, index)
    setOpen(id)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [])

  return (
    <section id={SECTION_IDS.pricing} className="scroll-mt-24 bg-surface py-14 sm:py-24">
      <div className="container-x">
        <SectionTitle eyebrow={p.eyebrow} title={p.titleStart} accent={p.titleAccent} text={p.text} align="center" />

        {GROUP_ORDER.map((g, gi) => (
          <div key={g} id={groupId(g)} className="mt-10 grid scroll-mt-24 gap-4 sm:mt-14 lg:grid-cols-[0.3fr_0.7fr] lg:gap-10">
            <Reveal className="flex items-start gap-3 lg:sticky lg:top-28 lg:self-start">
              <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-base font-extrabold text-white">{gi + 1}</span>
              <div>
                <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">{p.tabs[g]}</h3>
                <p className="mt-1 text-sm text-ink-soft">{p.tabHints[g]}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-paper ring-1 ring-line">
                {p.groups[g].map((pkg, i) => (
                  <PackageRow key={pkg.name} id={rowId(g, i)} pkg={pkg} dict={p} open={open === rowId(g, i)} onToggle={toggle} />
                ))}
              </ul>
            </Reveal>
          </div>
        ))}

        {/* Спецпредложения */}
        <Reveal className="mt-12 sm:mt-20">
          <div className="text-center">
            <Eyebrow>{p.offers.eyebrow}</Eyebrow>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-6">
            {p.offers.items.map((offer, i) => {
              const Icon = i === 0 ? KeyRound : RotateCcw
              return (
                <article key={offer.question} onMouseMove={spotlight} className="spotlight flex items-start gap-4 rounded-3xl bg-paper p-5 ring-1 ring-line transition hover:ring-brand-200 sm:p-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft sm:h-12 sm:w-12">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug">{offer.question}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{offer.text}</p>
                    <button
                      type="button"
                      onClick={() => jumpTo(offer.group, offer.index)}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
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

type RowProps = { id: string; pkg: Package; dict: PricingDict; open: boolean; onToggle: (id: string) => void }

function PackageRow({ id, pkg, dict, open, onToggle }: RowProps) {
  const panelId = `${id}-details`
  return (
    <li id={id} className={`scroll-mt-28 ${pkg.featured ? 'bg-brand-50/70' : ''}`}>
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-brand-50/60 sm:p-6"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-display text-lg font-bold leading-tight sm:text-xl">{pkg.name}</h4>
            {pkg.featured && (
              <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">{dict.popular}</span>
            )}
          </div>
          <p className="mt-1 text-sm text-ink-soft">{pkg.tagline}</p>
          {pkg.volume && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-0.5 text-xs font-bold text-brand-700 ring-1 ring-brand-100 dark:text-brand-300">
              <Gift className="h-3.5 w-3.5" aria-hidden="true" /> {pkg.volume}
            </span>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{pkg.price}</p>
          {pkg.priceNote && <p className="text-xs font-semibold text-ink-soft">{pkg.priceNote}</p>}
          <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400">
            {open ? dict.less : dict.details}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 sm:px-6">
              <p className="text-[15px] leading-relaxed text-ink-soft">{pkg.desc}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-soft">{dict.included}</p>
              <ul className="mt-2 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {pkg.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic leading-relaxed text-ink-soft">{pkg.audience}</p>
              <WhatsAppButton
                label={dict.choose}
                message={format(dict.waMessage, { title: pkg.name, price: pkg.price + (pkg.priceNote ?? '') })}
                variant={pkg.featured ? 'primary' : 'ghost'}
                className="mt-5 w-full !py-3 !text-sm sm:w-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
