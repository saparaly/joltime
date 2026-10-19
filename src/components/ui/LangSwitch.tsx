import { LOCALES, LOCALE_LABELS } from '../../i18n'
import { useLocale } from '../../i18n/useLocale'

export function LangSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div role="group" aria-label={t.common.langSwitch} className={`flex rounded-full bg-surface p-0.5 ring-1 ring-line ${className}`}>
      {LOCALES.map((l) => {
        const active = l === locale
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors ${
              active ? 'bg-brand-500 text-white' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        )
      })}
    </div>
  )
}
