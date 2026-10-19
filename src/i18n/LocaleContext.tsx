import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DICTIONARIES, localeFromPath, pathForLocale, type Locale } from './index'
import { LocaleContext, type LocaleContextValue } from './context'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => localeFromPath(window.location.pathname))

  // Назад/вперёд в браузере
  useEffect(() => {
    const onPop = () => setLocaleState(localeFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    if (next === localeFromPath(window.location.pathname)) return
    window.history.pushState(null, '', pathForLocale(next) + window.location.hash)
    setLocaleState(next)
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: DICTIONARIES[locale], setLocale }),
    [locale, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

