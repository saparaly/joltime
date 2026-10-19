import { Fragment, useMemo } from 'react'
import { motion } from 'motion/react'

type RichTextProps = {
  text: string
  strongClassName?: string
  /** Подсветить жирные слова «маркером», когда они появляются на экране */
  highlight?: boolean
}

/**
 * Рендерит строку словаря, где **текст** превращается в <strong>.
 * Позволяет держать выделения жирным внутри переводов.
 */
export function RichText({ text, strongClassName = 'font-extrabold text-ink', highlight = true }: RichTextProps) {
  const parts = useMemo(() => text.split('**'), [text])
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          highlight ? (
            <motion.strong
              key={i}
              initial={{ backgroundSize: '0% 38%' }}
              whileInView={{ backgroundSize: '100% 38%' }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className={`${strongClassName} rounded-sm bg-[linear-gradient(var(--brand-200),var(--brand-200))] bg-[position:0_88%] bg-no-repeat px-0.5`}
            >
              {part}
            </motion.strong>
          ) : (
            <strong key={i} className={strongClassName}>
              {part}
            </strong>
          )
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
