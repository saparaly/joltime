import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useLocale } from '../../i18n/useLocale'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const { t } = useLocale()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.common.themeLight : t.common.themeDark}
      aria-pressed={isDark}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-line transition hover:ring-brand-300 ${className}`}
    >
      <Sun className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`} />
    </button>
  )
}
