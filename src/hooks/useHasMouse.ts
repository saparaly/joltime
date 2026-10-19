import { useState } from 'react'

/**
 * true, если у устройства есть «точный» указатель (мышь/трекпад).
 * Используется, чтобы включать тяжёлые или hover-эффекты только на десктопе.
 * Значение читается один раз при монтировании — смена устройства на лету не нужна.
 */
export function useHasMouse(): boolean {
  const [hasMouse] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  return hasMouse
}
