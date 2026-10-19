/**
 * Нелокализуемые настройки сайта: контакты, ссылки, координаты.
 * Тексты живут в src/i18n/{ru,kk}.ts
 */

/** Домен без завершающего слэша. На GitHub Pages подставляется из VITE_SITE_URL (см. workflow). */
export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://joltime.kz' // TODO: заменить на реальный домен
export const SITE_NAME = 'JOLTIME'

export const PHONE_DISPLAY = '+7 702 583 7735'
export const PHONE_RAW = '77025837735'
export const PHONE_TEL = `tel:+${PHONE_RAW}`

export const INSTAGRAM_URL = 'https://www.instagram.com/joltime01'
export const INSTAGRAM_HANDLE = '@joltime01'

export const waLink = (text: string) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(text)}`

/** Карточка школы на 2GIS (правый берег). Левый берег: https://2gis.kz/astana/geo/70000001113683667 */
export const GIS_URL = 'https://2gis.kz/astana/geo/70000001110073025'
export const GIS_REVIEWS_URL = `${GIS_URL}/tab/reviews`
/** Рейтинг на 2GIS — обновлять вручную (октябрь 2026: 5,0 по 96 оценкам). */
export const GIS_RATING = { value: 5, count: 96 }

export const SECTION_IDS = {
  top: 'top',
  about: 'about',
  why: 'why',
  how: 'how',
  materials: 'materials',
  pricing: 'pricing',
  reviews: 'reviews',
  branches: 'branches',
  faq: 'faq',
} as const

export type BranchId = 'right-bank'

/** Координаты филиалов (ул. Ильяса Жансугурова, 8/2 — БЦ «Аружан»). */
export const BRANCH_GEO: Record<BranchId, { lat: number; lng: number }> = {
  'right-bank': { lat: 51.1602934, lng: 71.484161 },
}

/** Ссылки на карточки филиалов в 2GIS. */
export const BRANCH_GIS_URL: Record<BranchId, string> = {
  'right-bank': GIS_URL,
}

export const mapEmbedUrl = (lat: number, lng: number, hl: string) =>
  `https://www.google.com/maps?q=${lat},${lng}&z=15&hl=${hl}&output=embed`

export const mapRouteUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
