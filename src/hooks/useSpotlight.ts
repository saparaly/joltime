import { useCallback, type MouseEvent } from 'react'

/**
 * «Фонарик» под курсором: записывает координаты в CSS-переменные --sx/--sy,
 * а класс `spotlight` рисует по ним мягкий радиальный блик.
 */
export function useSpotlight() {
  return useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--sy', `${e.clientY - rect.top}px`)
  }, [])
}
