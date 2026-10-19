import { MessageCircle, Phone } from 'lucide-react'
import { Logo, InstagramIcon, GisBadge } from '../ui'
import { useNavItems } from '../../hooks/useNavItems'
import { useLocale } from '../../i18n/useLocale'
import { GIS_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL, waLink } from '../../config/site'

const CURRENT_YEAR = new Date().getFullYear()
const ICON_LINK_CLASS = 'rounded-full bg-paper p-2.5 ring-1 ring-line transition hover:ring-brand-300'

export function Footer() {
  const { t } = useLocale()
  const nav = useNavItems()

  return (
    <footer className="border-t border-line bg-surface pb-28 pt-12 lg:pb-12">
      <div className="container-x grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">{t.footer.about}</p>
          <div className="mt-5 flex gap-2">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={ICON_LINK_CLASS}>
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={waLink(t.common.waDefault)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={ICON_LINK_CLASS}>
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href={PHONE_TEL} aria-label={t.common.call} className={ICON_LINK_CLASS}>
              <Phone className="h-5 w-5" />
            </a>
            <a href={GIS_URL} target="_blank" rel="noopener noreferrer" aria-label={t.common.gis} className={`${ICON_LINK_CLASS} flex items-center`}>
              <GisBadge className="h-5" />
            </a>
          </div>
        </div>

        <nav aria-label={t.footer.sectionsNav}>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{t.footer.sections}</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm font-semibold hover:text-brand-600">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{t.footer.contacts}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={PHONE_TEL} className="font-bold hover:text-brand-600">{PHONE_DISPLAY}</a>
              <span className="block text-ink-soft">{t.footer.phoneSub}</span>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-brand-600">
                {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a href={GIS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold hover:text-brand-600">
                <GisBadge /> {t.common.gis}
              </a>
            </li>
            {t.branches.items.map((b) => (
              <li key={b.id} className="text-ink-soft">
                <span className="font-semibold text-ink">{b.name}:</span> {b.address}
              </li>
            ))}
          </ul>
        </address>
      </div>

      <div className="container-x mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:justify-between">
        <p>© {CURRENT_YEAR} {t.footer.copyright}</p>
        <p>{t.footer.tagline}</p>
      </div>
    </footer>
  )
}
