import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useVelocity } from 'motion/react'
import { MousePointerClick } from 'lucide-react'
import { useLocale } from '../../i18n/useLocale'

const BASE_SPEED = 110 // px/с при спокойной езде
const GAS_BOOST = 2.4 // во сколько раз быстрее при зажатой дороге
const TAP_BOOST_MS = 1400 // сколько держится ускорение после тапа по машинке
const DASH_PERIOD = 72 // длина штриха + пробела разметки

/**
 * Фишка сайта: интерактивная дорога.
 * — машинка едет сама; при прокрутке страницы ускоряется;
 * — с мышью: клик по машинке — «би-бип» и короткое ускорение, зажать дорогу — «газ», машинка едет за курсором.
 * На тач-устройствах дорога только декоративная (едет и ускоряется от скролла), чтобы не мешать прокрутке.
 * Всё считается в одном requestAnimationFrame через motion values — без перерисовок React.
 */
export function RoadStrip() {
  const { t } = useLocale()
  const reduced = useReducedMotion()
  const [hasMouse] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const stripRef = useRef<HTMLDivElement>(null)
  const signsRef = useRef<HTMLDivElement>(null)

  const signsX = useMotionValue(0)
  const dashX = useMotionValue(0)
  const wheel = useMotionValue(0)
  const tilt = useSpring(0, { stiffness: 120, damping: 14 })
  const carX = useSpring(0, { stiffness: 80, damping: 18 })

  const speed = useRef(1)
  const gas = useRef(false)
  const boostUntil = useRef(0)
  const [gasOn, setGasOn] = useState(false)
  const [fast, setFast] = useState(false) // для пыли из-под колёс
  const fastRef = useRef(false)
  const [honk, setHonk] = useState(false)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  useAnimationFrame((now, delta) => {
    if (reduced) return
    const dt = Math.min(delta, 50) / 1000
    const scrollBoost = Math.min(Math.abs(scrollVelocity.get()) / 1200, 2.5)
    const boosting = gas.current || now < boostUntil.current
    const target = 1 + (boosting ? GAS_BOOST : 0) + scrollBoost
    speed.current += (target - speed.current) * 0.07

    const px = BASE_SPEED * speed.current * dt
    const half = (signsRef.current?.scrollWidth ?? 0) / 2
    let nextSigns = signsX.get() - px
    if (half > 0 && nextSigns <= -half) nextSigns += half
    signsX.set(nextSigns)
    dashX.set((dashX.get() - px * 1.3) % DASH_PERIOD)
    wheel.set(wheel.get() + px * 2.6)
    tilt.set(-(speed.current - 1) * 1.6)

    const isFast = speed.current > 1.8
    if (isFast !== fastRef.current) {
      fastRef.current = isFast
      setFast(isFast)
    }
  })

  const setGas = useCallback((on: boolean) => {
    gas.current = on
    setGasOn(on)
  }, [])

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!stripRef.current) return
      const rect = stripRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - 52
      carX.set(Math.max(0, Math.min(x - rect.width * 0.08, rect.width * 0.8)))
    },
    [carX],
  )

  const onHonk = useCallback(() => {
    boostUntil.current = performance.now() + TAP_BOOST_MS
    setHonk(true)
  }, [])
  useEffect(() => {
    if (!honk) return
    const id = window.setTimeout(() => setHonk(false), 900)
    return () => window.clearTimeout(id)
  }, [honk])

  // Обработчики дороги вешаем только там, где есть мышь: на телефоне они мешали бы скроллу
  const mouseHandlers = hasMouse
    ? {
        onPointerDown: () => setGas(true),
        onPointerUp: () => setGas(false),
        onPointerCancel: () => setGas(false),
        onPointerLeave: () => {
          setGas(false)
          carX.set(0)
        },
        onPointerMove,
      }
    : {}

  const signs = [...t.marquee, ...t.marquee]

  return (
    <div ref={stripRef} {...mouseHandlers} className={`relative mt-16 overflow-hidden bg-night sm:mt-24 ${hasMouse ? 'cursor-pointer select-none' : ''}`}>
      {/* Подсказка — только там, где есть мышь */}
      {hasMouse && (
        <div className="pointer-events-none absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/15 backdrop-blur sm:right-6 sm:text-xs">
          <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" /> {gasOn ? t.road.gas : t.road.hint}
        </div>
      )}

      <div aria-hidden="true">
        {/* Луна и огни вдали */}
        <div className="absolute right-[12%] top-4 h-10 w-10 rounded-full bg-brand-400/80 blur-[1px]" />
        <div className="absolute inset-x-0 bottom-14 h-10 bg-[radial-gradient(circle,rgb(255_255_255/0.08)_1px,transparent_1.5px)] bg-[size:28px_10px] opacity-60" />

        <div className="relative h-36 sm:h-40">
          {/* Знаки на обочине */}
          <motion.div ref={signsRef} style={{ x: signsX }} className="absolute bottom-14 left-0 flex w-max items-end gap-14 will-change-transform sm:gap-20">
            {signs.map((text, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="whitespace-nowrap rounded-md border-2 border-white/90 bg-[#1d5fd1] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md sm:px-4 sm:text-xs">
                  {text}
                </span>
                <span className="h-7 w-1 bg-slate-400 sm:h-9" />
              </div>
            ))}
          </motion.div>

          {/* Полотно */}
          <div className="absolute inset-x-0 bottom-0 h-14 border-t-[3px] border-white/60 bg-[#232c42]">
            <motion.div
              style={{ backgroundPositionX: dashX }}
              className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#ffb067_0_36px,transparent_36px_72px)] opacity-90"
            />
          </div>

          {/* Машинка */}
          <motion.div style={{ x: carX, rotate: tilt }} className="absolute bottom-3 left-[8%] origin-bottom will-change-transform sm:left-[10%]">
            <AnimatePresence>
              {honk && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.8 }}
                  animate={{ opacity: 1, y: -6, scale: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="font-display absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-extrabold text-ink shadow-card"
                >
                  {t.road.honk}
                </motion.span>
              )}
            </AnimatePresence>
            {/* Пыль из-под колёс при газе */}
            <AnimatePresence>
              {fast && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0.5, 0.2, 0.5], scale: [0.8, 1.2, 0.8] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute -left-5 bottom-0 h-5 w-10 rounded-full bg-white/25 blur-sm"
                />
              )}
            </AnimatePresence>
            {hasMouse ? (
              <button type="button" onClick={onHonk} aria-label={t.road.honk} className="block cursor-pointer">
                <Car wheel={wheel} honk={honk} />
              </button>
            ) : (
              <Car wheel={wheel} honk={false} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function Car({ wheel, honk }: { wheel: ReturnType<typeof useMotionValue<number>>; honk: boolean }) {
  return (
    <svg width="104" height="46" viewBox="0 0 104 46" className="drop-shadow-[0_8px_10px_rgb(0_0_0/0.45)]" aria-hidden="true">
      <path d="M6 30 L10 18 Q12 14 17 14 L36 14 L46 5 Q48 3 52 3 L74 3 Q79 3 82 7 L92 18 L98 20 Q102 21 102 25 L102 31 Q102 34 99 34 L8 34 Q5 34 5 31 Z" fill="#FF6B00" />
      <path d="M40 15 L48 7 L62 7 L62 15 Z" fill="#1b2540" opacity="0.85" />
      <path d="M66 7 L76 7 L84 15 L66 15 Z" fill="#1b2540" opacity="0.85" />
      <rect x="96" y="22" width="6" height="5" rx="1.5" fill="#fff5e6" />
      <rect x="2" y="22" width="5" height="4" rx="1.5" fill={honk ? '#ff8080' : '#ff3b3b'} />
      <path d="M102 24 L104 22 L104 27 Z" fill="#fff5e6" opacity={honk ? 1 : 0.6} />
      <motion.g style={{ rotate: wheel, transformOrigin: '24px 36px' }}>
        <circle cx="24" cy="36" r="8" fill="#0f1626" />
        <circle cx="24" cy="36" r="4" fill="#cbd5e1" />
        <path d="M24 29 V43 M17 36 H31" stroke="#0f1626" strokeWidth="1.5" />
      </motion.g>
      <motion.g style={{ rotate: wheel, transformOrigin: '80px 36px' }}>
        <circle cx="80" cy="36" r="8" fill="#0f1626" />
        <circle cx="80" cy="36" r="4" fill="#cbd5e1" />
        <path d="M80 29 V43 M73 36 H87" stroke="#0f1626" strokeWidth="1.5" />
      </motion.g>
    </svg>
  )
}
