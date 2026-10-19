import { useMemo } from 'react'
import { SECTION_IDS } from '../config/site'
import { useLocale } from '../i18n/useLocale'

const NAV_ORDER = ['about', 'how', 'pricing', 'materials', 'reviews', 'branches'] as const
type NavKey = (typeof NAV_ORDER)[number]

/** В шапке — только ключевые пункты, в подвале — все. */
const HEADER_KEYS: readonly NavKey[] = ['how', 'pricing', 'materials', 'reviews', 'branches']

export function useNavItems(scope: 'header' | 'footer' = 'footer') {
  const { t } = useLocale()
  return useMemo(() => {
    const keys = scope === 'header' ? HEADER_KEYS : NAV_ORDER
    return keys.map((key) => ({ key, href: `#${SECTION_IDS[key]}`, label: t.nav[key] }))
  }, [t, scope])
}
