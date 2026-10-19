import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, BadgeCheck, Star } from 'lucide-react'
import { Button, WhatsAppButton, InstagramIcon, RichText, TiltCard } from '../ui'
import { EASE_OUT } from '../../lib/motion'
import { useLocale } from '../../i18n/useLocale'
import { useHasMouse } from '../../hooks/useHasMouse'
import { format } from '../../i18n'
import { GIS_RATING, GIS_REVIEWS_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, SECTION_IDS } from '../../config/site'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
})

export function Hero() {
  const { t } = useLocale()
  const h = t.hero

  return (
    <section id={SECTION_IDS.top} className="relative overflow-hidden pt-24 sm:pt-32">
      <HeroBackground />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-xs font-bold text-ink shadow-card ring-1 ring-line sm:text-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
            </span>
            {h.badge}
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="font-display mt-6 text-balance text-[2.1rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]"
          >
            {h.titleStart}{' '}
            <span className="text-brand-500">{h.titleAccent}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.18)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            <RichText text={h.lead} />
          </motion.p>

          <motion.div {...fadeUp(0.26)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton label={h.ctaPrimary} />
            <Button href={`#${SECTION_IDS.pricing}`} variant="ghost">
              {h.ctaSecondary}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-soft">
            <a href={GIS_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-brand-600">
              <span className="flex text-brand-500" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              {format(h.trustReviews, { rating: GIS_RATING.value.toLocaleString('ru-KZ', { minimumFractionDigits: 1 }) })}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-brand-500" aria-hidden="true" /> {h.trustNoFees}
            </span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-brand-600">
              <InstagramIcon className="h-4 w-4" /> {INSTAGRAM_HANDLE}
            </a>
          </motion.div>
        </div>

        <HeroVisual />
      </div>

      <div className="container-x mt-14 sm:mt-20">
        <motion.dl
          {...fadeUp(0.5)}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line lg:grid-cols-4"
        >
          {h.stats.map((s) => (
            <div key={s.label} className="bg-surface px-5 py-5 sm:px-8 sm:py-7">
              <dd className="font-display text-2xl font-bold text-ink sm:text-3xl">{s.value}</dd>
              <dt className="text-xs font-semibold text-ink-soft sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

function HeroBackground() {
  // Лёгкий параллакс: пятна фона уезжают медленнее контента. Только на десктопе —
  // на телефоне движение размытых слоёв заметно нагружает GPU при скролле.
  const parallax = useHasMouse()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, 160])
  const y2 = useTransform(scrollY, [0, 800], [0, -90])
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <motion.div style={parallax ? { y: y1 } : undefined} className="absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-brand-200/60 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
      <motion.div style={parallax ? { y: y2 } : undefined} className="absolute left-[-15%] top-1/3 h-72 w-72 rounded-full bg-brand-100 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgb(255 107 0 / 0.14) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse at 70% 20%, black 20%, transparent 70%)',
        }}
      />
    </div>
  )
}


/** Иллюстрация: тёмная «дорога» с плавающей карточкой удостоверения. TODO: заменить на фото. */
function HeroVisual() {
  const { t } = useLocale()
  const h = t.hero

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <TiltCard>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-night shadow-[0_30px_80px_-30px_rgb(0_0_0/0.5)]">
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--night-2)" />
              <stop offset="1" stopColor="var(--night)" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#hero-sky)" />
          <path d="M0 300 L170 120 L230 120 L400 300 Z" fill="#232c42" />
          <motion.path
            d="M200 125 V 300"
            stroke="#FF6B00"
            strokeWidth="5"
            strokeDasharray="18 22"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -80 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
          <circle cx="300" cy="70" r="30" fill="#FF6B00" opacity="0.9" />
          <circle cx="300" cy="70" r="52" fill="#FF6B00" opacity="0.12" />
          <RoadCar />
        </svg>

        <div className="absolute left-1/2 top-[54%] w-[72%] animate-float rounded-2xl bg-white p-4 text-[#0f1626] shadow-2xl ring-1 ring-white/40 sm:top-1/2 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:text-xs">{h.cardTitle}</span>
            <span className="rounded-md bg-brand-500 px-1.5 py-0.5 text-[10px] font-black text-white">KZ</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-[#ffcfa3] to-brand-400 sm:h-14 sm:w-14" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-3/4 rounded bg-slate-900/10" />
              <div className="h-2.5 w-1/2 rounded bg-slate-900/10" />
              <div className="h-2.5 w-2/3 rounded bg-slate-900/10" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-display text-xl font-bold">B</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              <BadgeCheck className="h-3.5 w-3.5" /> {h.cardPassed}
            </span>
          </div>
        </div>
      </div>
      </TiltCard>

      <FloatingBadge side="left" label={h.badgeTrialLabel} value={h.badgeTrialValue} accent delay={0.7} />
      <FloatingBadge side="right" label={h.badgeBranchesLabel} value={h.badgeBranchesValue} delay={0.85} />
    </motion.div>
  )
}

function FloatingBadge({ side, label, value, accent = false, delay }: { side: 'left' | 'right'; label: string; value: string; accent?: boolean; delay: number }) {
  const pos = side === 'left' ? '-left-1 -top-4 sm:-left-6' : '-right-1 -bottom-4 sm:-right-6'
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE_OUT }}
      className={`absolute rounded-2xl bg-surface px-3.5 py-2.5 shadow-card ring-1 ring-line ${pos}`}
    >
      <p className="text-[11px] font-semibold text-ink-soft">{label}</p>
      <p className={`font-display text-base font-bold ${accent ? 'text-brand-600 dark:text-brand-400' : 'text-ink'}`}>{value}</p>
    </motion.div>
  )
}

/** Машинка, уезжающая по дороге вдаль (цикл). */
function RoadCar() {
  return (
    <motion.g
      initial={{ y: 300, scale: 1, opacity: 0 }}
      animate={{ y: [300, 240, 150], scale: [1, 0.7, 0.3], opacity: [0, 1, 0] }}
      transition={{ duration: 5, times: [0, 0.3, 1], repeat: Infinity, repeatDelay: 1.5, ease: 'easeOut' }}
      style={{ transformOrigin: '200px 0px' }}
    >
      <rect x="178" y="-26" width="44" height="26" rx="8" fill="#FF8A33" />
      <rect x="186" y="-22" width="28" height="10" rx="3" fill="#1b2540" opacity="0.7" />
      <rect x="180" y="-8" width="8" height="5" rx="2" fill="#fff5e6" />
      <rect x="212" y="-8" width="8" height="5" rx="2" fill="#fff5e6" />
    </motion.g>
  )
}
