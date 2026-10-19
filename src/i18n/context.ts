import { createContext } from 'react'
import type { Dictionary, Locale } from './index'

export type LocaleContextValue = {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
