import { useCallback, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button, Logo, WhatsAppButton, ThemeToggle, LangSwitch } from '../ui'
import { useScrolled } from '../../hooks/useScrolled'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { useCloseOnDesktop } from '../../hooks/useCloseOnDesktop'
import { useNavItems } from '../../hooks/useNavItems'
import { useLocale } from '../../i18n/useLocale'
import { PHONE_DISPLAY, PHONE_TEL } from '../../config/site'

export function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(12)
  const { t } = useLocale()
  const nav = useNavItems('header')
  const close = useCallback(() => setOpen(false), [])
  useLockBodyScroll(open)
  useCloseOnDesktop(close)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-paper/85 shadow-[0_1px_0_0_var(--line)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20 lg:gap-6">
        <Logo className="shrink-0" />

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label={t.common.mainNav}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="whitespace-nowrap text-sm font-semibold text-ink-soft transition-colors hover:text-brand-600">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <LangSwitch />
          <ThemeToggle />
          <WhatsAppButton label={t.common.signUp} className="ml-2 !px-5 !py-2.5 !text-sm" />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-line"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper px-4 pb-10 pt-6 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label={t.common.mobileNav}>
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={close}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="rounded-2xl px-4 py-3.5 text-lg font-bold text-ink hover:bg-brand-50"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3 px-2">
              <LangSwitch className="self-start" />
              <WhatsAppButton label={t.common.signUpWa} />
              <Button href={PHONE_TEL} variant="ghost">
                <Phone className="h-5 w-5" aria-hidden="true" /> {PHONE_DISPLAY}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
