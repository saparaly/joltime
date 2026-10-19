import type { ComponentProps } from 'react'
import { MessageCircle } from 'lucide-react'
import { waLink } from '../../config/site'
import { useLocale } from '../../i18n/useLocale'

export type ButtonVariant = 'primary' | 'ghost' | 'dark'

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn-shine bg-brand-500 text-white shadow-soft hover:bg-brand-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'bg-surface text-ink ring-1 ring-line hover:ring-brand-300 hover:bg-brand-50 hover:-translate-y-0.5 active:translate-y-0',
  dark: 'bg-ink text-paper hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0',
}

const BASE_CLASS =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3.5 text-sm font-bold transition-all duration-200 sm:px-6 sm:text-base'

type ButtonProps = ComponentProps<'a'> & { variant?: ButtonVariant }

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <a className={`${BASE_CLASS} ${VARIANT_CLASS[variant]} ${className}`} {...rest}>
      {children}
    </a>
  )
}

type WhatsAppButtonProps = {
  label: string
  /** Текст, который подставится в поле ввода WhatsApp. По умолчанию — из словаря. */
  message?: string
  variant?: ButtonVariant
  className?: string
}

export function WhatsAppButton({ label, message, variant = 'primary', className = '' }: WhatsAppButtonProps) {
  const { t } = useLocale()
  return (
    <Button href={waLink(message ?? t.common.waDefault)} target="_blank" rel="noopener noreferrer" variant={variant} className={className}>
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </Button>
  )
}
