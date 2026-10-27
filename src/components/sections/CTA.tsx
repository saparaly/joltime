import { Phone } from 'lucide-react'
import { Reveal, WhatsAppButton } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { PHONES } from '../../config/site'

export function CTA() {
  const { t } = useLocale()
  const c = t.cta

  return (
    <section className="pb-14 sm:pb-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#ff6b00,#ff8a33_55%,#e85a00)] px-6 py-12 text-center text-white shadow-[0_40px_80px_-30px_rgb(255_107_0/0.6)] sm:px-12 sm:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
              <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand-700/40 blur-2xl" />
              <div className="absolute inset-x-0 bottom-7 h-1 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.5)_0_36px,transparent_36px_72px)]" />
            </div>
            <h2 className="font-display relative text-balance text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {c.titleLine1}
              <br />
              {c.titleLine2}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">{c.text}</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton label={t.common.signUpWa} variant="dark" className="!bg-[#0f1626] !text-white" />
              {PHONES.map((p) => (
                <a
                  key={p.raw}
                  href={p.tel}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3.5 text-sm font-bold ring-1 ring-white/30 transition hover:bg-white/25 sm:text-base"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" /> {p.display}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
