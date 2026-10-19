import { useCallback, useRef, useState } from 'react'
import { ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, Maximize2, MapPin, MessageCircle, Star } from 'lucide-react'
import { GisBadge, InstagramIcon, Lightbox, Reveal, SectionTitle } from '../ui'
import { useLocale } from '../../i18n/useLocale'
import { format } from '../../i18n'
import { GIS_REVIEWS_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, SECTION_IDS } from '../../config/site'
import { REVIEWS, type Review } from '../../config/reviews'

const ARROW_CLASS = 'rounded-full bg-surface p-3 ring-1 ring-line transition hover:ring-brand-300'

export function Reviews() {
  const { t } = useLocale()
  const r = t.reviews
  const trackRef = useRef<HTMLDivElement>(null)
  const [opened, setOpened] = useState<Review | null>(null)

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    track.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16), behavior: 'smooth' })
  }, [])

  const closeLightbox = useCallback(() => setOpened(null), [])

  return (
    <section id={SECTION_IDS.reviews} className="scroll-mt-24 py-14 sm:py-24">
      <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow={r.eyebrow} title={r.titleStart} accent={r.titleAccent} text={r.text} />
        <Reveal delay={0.1} className="hidden shrink-0 gap-2 sm:flex">
          <button type="button" onClick={() => scrollByCard(-1)} className={ARROW_CLASS} aria-label={r.prev}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scrollByCard(1)} className={ARROW_CLASS} aria-label={r.next}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <div ref={trackRef} className="track-pad flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} onOpen={() => setOpened(review)} />
          ))}

          <div className="flex w-[70vw] max-w-xs shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-3xl bg-brand-50 p-6 text-center ring-1 ring-brand-100 sm:w-64">
            <div>
              <span className="font-display block text-xl font-bold text-brand-700 dark:text-brand-300">{r.moreTitle}</span>
              <span className="mt-1 block text-sm text-ink-soft">{r.moreText}</span>
            </div>
            <a
              href={GIS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-paper transition hover:-translate-y-0.5"
            >
              <GisBadge /> {r.allOnGis}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand-600">
              <InstagramIcon className="h-4 w-4" /> {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>
      </Reveal>

      <Lightbox
        src={opened?.image ?? null}
        alt={opened ? format(r.screenshotAlt, { name: opened.name }) : ''}
        closeLabel={r.close}
        onClose={closeLightbox}
      />
    </section>
  )
}

function ReviewCard({ review, onOpen }: { review: Review; onOpen: () => void }) {
  const { t } = useLocale()
  const r = t.reviews
  const SourceIcon = review.source === '2gis' ? MapPin : MessageCircle

  return (
    <article
      data-card
      lang={review.lang}
      className="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:ring-brand-200 sm:w-[22rem]"
    >
      {review.image ? (
        /* Превью скриншота — кликабельное, с подписью */
        <button
          type="button"
          onClick={onOpen}
          aria-label={r.openScreenshot}
          className="group relative block h-36 w-full overflow-hidden bg-brand-50 text-left"
        >
          <img
            src={review.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0f1626]/70 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#0f1626] shadow-card transition group-hover:bg-brand-500 group-hover:text-white">
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" /> {r.openScreenshot}
          </span>
        </button>
      ) : (
        /* Без скриншота — ссылка на страницу отзывов в 2GIS */
        <a
          href={GIS_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 bg-brand-50 px-6 py-3 text-xs font-bold text-ink transition hover:bg-brand-100 sm:px-7"
        >
          <span className="inline-flex items-center gap-2">
            <GisBadge /> {r.readOnGis}
          </span>
          <ArrowUpRight className="h-4 w-4 text-brand-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      )}

      <div className="flex flex-1 flex-col p-6 pt-5 sm:px-7">
      <div className="flex items-center justify-between gap-3">
        <div className="flex text-brand-500" role="img" aria-label={format(r.rating, { n: 5 })}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
          ))}
        </div>
        {review.firstTry && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> {r.firstTry}
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">{review.text}</p>

      <footer className="mt-6 flex items-center gap-3">
        <div className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:text-brand-300">
          {review.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{review.name}</p>
          <p className="flex items-center gap-1 text-xs text-ink-soft">
            <SourceIcon className="h-3 w-3" aria-hidden="true" /> {r.source[review.source]}
          </p>
        </div>
      </footer>
      </div>
    </article>
  )
}
