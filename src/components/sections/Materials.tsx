import { Check, Sparkles } from 'lucide-react'
import { Reveal, WhatsAppButton } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { format } from '../../i18n'
import { SECTION_IDS } from '../../config/site'

/** Секция всегда тёмная (bg-night) независимо от темы. */
export function Materials() {
  const { t } = useLocale()
  const m = t.materials

  return (
    <section id={SECTION_IDS.materials} className="relative scroll-mt-24 overflow-hidden bg-night py-20 text-white sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
      </div>

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-300 ring-1 ring-white/15">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {m.eyebrow}
          </span>
          <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {m.titleStart} <span className="text-brand-400">{m.titleAccent}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{m.text}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:gap-6">
          {m.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article
                className={`relative flex h-full flex-col rounded-3xl p-6 ring-1 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${
                  item.featured
                    ? 'bg-brand-500 text-white shadow-[0_30px_60px_-25px_rgb(255_107_0/0.7)] ring-brand-400'
                    : 'bg-white/[0.06] ring-white/10'
                }`}
              >
                {item.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wider text-brand-600">
                    {m.popular}
                  </span>
                )}
                <span className={`text-xs font-bold uppercase tracking-wider ${item.featured ? 'text-white/80' : 'text-brand-300'}`}>{item.tag}</span>
                <h3 className="font-display mt-2 text-xl font-bold">{item.title}</h3>
                <p className={`mt-3 text-[15px] leading-relaxed ${item.featured ? 'text-white/90' : 'text-white/65'}`}>{item.text}</p>
                <ul className="mt-5 space-y-2.5">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${item.featured ? 'text-white' : 'text-brand-400'}`} aria-hidden="true" />
                      <span className={item.featured ? 'text-white' : 'text-white/85'}>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <WhatsAppButton
                    label={t.common.writeWa}
                    message={format(m.waMessage, { title: item.title })}
                    variant={item.featured ? 'dark' : 'primary'}
                    className={`w-full !py-3 !text-sm ${item.featured ? '!bg-[#0f1626] !text-white' : ''}`}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
