import { useEffect } from 'react'

/**
 * Вызывает `close`, когда окно становится шире `lg` (64rem).
 * Нужно, чтобы открытое мобильное меню не оставалось «висеть» с заблокированным скроллом
 * после поворота планшета или смены размера окна в DevTools.
 */
export function useCloseOnDesktop(close: () => void) {
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) close()
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [close])
}
