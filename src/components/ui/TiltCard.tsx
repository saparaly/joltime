import { useCallback, useState, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

const MAX_TILT = 9

/** 3D-наклон за курсором с бликом. Включается только там, где есть мышь. */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), { stiffness: 150, damping: 18 })
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect()
      px.set((e.clientX - r.left) / r.width)
      py.set((e.clientY - r.top) / r.height)
    },
    [px, py],
  )
  const onLeave = useCallback(() => {
    px.set(0.5)
    py.set(0.5)
  }, [px, py])

  if (!enabled) return <div className={className}>{children}</div>

  return (
    <div style={{ perspective: 1100 }} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
        {children}
        <motion.div
          aria-hidden="true"
          style={{ left: glareX, top: glareY }}
          className="pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-3xl"
        />
      </motion.div>
    </div>
  )
}
