import { ru, type Dictionary } from './ru'
import { kk } from './kk'

export type Locale = 'ru' | 'kk'

export const LOCALES: readonly Locale[] = ['ru', 'kk']
export const DEFAULT_LOCALE: Locale = 'ru'

export const DICTIONARIES: Record<Locale, Dictionary> = { ru, kk }

export const LOCALE_LABELS: Record<Locale, string> = { ru: 'Рус', kk: 'Қаз' }

/** Базовый путь сайта (`/` на своём домене, `/joltime/` на GitHub Pages) — см. vite.config.ts */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Язык кодируется в URL: `/` — русский, `/kk/` — казахский. Это нужно для SEO. */
export function localeFromPath(pathname: string): Locale {
  const rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  const first = rest.split('/').filter(Boolean)[0]
  return first === 'kk' ? 'kk' : DEFAULT_LOCALE
}

export function pathForLocale(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? `${BASE}/` : `${BASE}/${locale}/`
}

/** Подстановка плейсхолдеров вида {name} */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''))
}

export type { Dictionary }
