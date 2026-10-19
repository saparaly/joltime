import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { motion } from 'motion/react'
import { Button, GisBadge, Reveal, SectionTitle, WhatsAppButton } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { format } from '../../i18n'
import { BRANCH_GEO, BRANCH_GIS_URL, mapEmbedUrl, mapRouteUrl, SECTION_IDS, type BranchId } from '../../config/site'

export function Branches() {
  const { t, locale } = useLocale()
  const b = t.branches
  const [activeId, setActiveId] = useState<BranchId>(b.items[0].id)
  const [mapLoaded, setMapLoaded] = useState(false)

  const active = b.items.find((item) => item.id === activeId) ?? b.items[0]
  const multiple = b.items.length > 1
  const geo = BRANCH_GEO[active.id]

  return (
    <section id={SECTION_IDS.branches} className="scroll-mt-24 bg-surface py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle eyebrow={b.eyebrow} title={b.titleStart} accent={b.titleAccent} text={b.text} />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-3">
            {b.items.map((item, i) => {
              const isActive = item.id === activeId
              return (
                <Reveal key={item.id} delay={i * 0.08}>
                  <button
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={isActive}
                    className={`relative w-full rounded-3xl p-5 text-left ring-1 transition-all duration-300 sm:p-6 ${
                      isActive ? 'bg-paper ring-brand-300 shadow-card' : 'bg-surface ring-line hover:ring-brand-200'
                    }`}
                  >
                    {multiple && isActive && <motion.span layoutId="branch-dot" className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-brand-500" />}
                    {multiple && (
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                        {b.label} {i + 1}
                      </span>
                    )}
                    <h3 className="font-display text-lg font-bold">{item.name}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                      <li className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                        <span>
                          {item.address}
                          <span className="block text-xs opacity-80">{item.landmark}</span>
                        </span>
                      </li>
                    </ul>
                  </button>
                </Reveal>
              )
            })}

            <Reveal delay={0.2} className="mt-2 flex flex-col gap-3">
              <Button href={BRANCH_GIS_URL[active.id]} target="_blank" rel="noopener noreferrer" variant="dark" className="w-full">
                <GisBadge /> {b.gis}
              </Button>
              <Button href={mapRouteUrl(geo.lat, geo.lng)} target="_blank" rel="noopener noreferrer" variant="ghost" className="w-full">
                <Navigation className="h-4 w-4" aria-hidden="true" /> {b.route}
              </Button>
              <WhatsAppButton label={b.directions} message={format(b.directionsWa, { name: active.name })} variant="ghost" className="w-full" />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative min-h-[320px] overflow-hidden rounded-3xl bg-brand-50 ring-1 ring-line sm:min-h-[420px]">
            {mapLoaded ? (
              <iframe
                key={active.id}
                title={format(b.mapTitle, { name: active.name })}
                src={mapEmbedUrl(geo.lat, geo.lng, locale)}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setMapLoaded(true)}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
                aria-label={b.loadMap}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgb(255 107 0 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 107 0 / 0.08) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-soft transition group-hover:scale-105">
                  <MapPin className="h-6 w-6" />
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400" />
                </span>
                <span className="relative font-display text-base font-bold">{b.showMap}</span>
                <span className="relative text-sm text-ink-soft">{active.address}</span>
              </button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
