import { useEffect } from 'react'
import { LOCALES, pathForLocale, type Locale } from '../i18n'
import { useLocale } from '../i18n/useLocale'
import { BRANCH_GEO, GIS_RATING, GIS_URL, INSTAGRAM_URL, PHONE_RAW, SITE_NAME, SITE_URL } from '../config/site'

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const el = document.head.querySelector<HTMLElement>(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Обновляет <title>, description, Open Graph, canonical и JSON-LD
 * при смене языка. Статические теги лежат в index.html.
 */
export function useSeo() {
  const { locale, t } = useLocale()

  useEffect(() => {
    const url = SITE_URL + pathForLocale(locale)

    document.title = t.meta.title
    setMeta('meta[name="description"]', 'content', t.meta.description)
    setMeta('meta[property="og:title"]', 'content', t.meta.ogTitle)
    setMeta('meta[property="og:description"]', 'content', t.meta.ogDescription)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:locale"]', 'content', locale === 'kk' ? 'kk_KZ' : 'ru_KZ')
    setMeta('link[rel="canonical"]', 'href', url)

    // JSON-LD: Schema.org DrivingSchool с филиалами
    const branches = t.branches.items.map((b) => ({
      '@type': 'DrivingSchool',
      name: `${SITE_NAME} — ${b.name}`,
      address: { '@type': 'PostalAddress', streetAddress: b.address, addressLocality: 'Астана', addressCountry: 'KZ' },
      geo: { '@type': 'GeoCoordinates', latitude: BRANCH_GEO[b.id].lat, longitude: BRANCH_GEO[b.id].lng },
    }))

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'DrivingSchool',
      name: SITE_NAME,
      description: t.meta.description,
      url,
      telephone: `+${PHONE_RAW}`,
      sameAs: [INSTAGRAM_URL, GIS_URL],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: GIS_RATING.value, bestRating: 5, ratingCount: GIS_RATING.count },
      areaServed: { '@type': 'City', name: 'Астана' },
      priceRange: '₸₸',
      inLanguage: LOCALES.map((l: Locale) => (l === 'kk' ? 'kk-KZ' : 'ru-KZ')),
      department: branches,
    }

    let script = document.getElementById('json-ld') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = 'json-ld'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)
  }, [locale, t])
}
