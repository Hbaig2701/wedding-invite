import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Restrained scroll reveal: a short rise and fade, once. Stagger with `index`.
 * After the envelope the page should feel calm, so this is deliberately quiet.
 */
export function Reveal({ children, index = 0, className, as = 'div', y = 18 }: { children: ReactNode; index?: number; className?: string; as?: 'div' | 'section' | 'li' | 'p' | 'h2' | 'h3'; y?: number }) {
  const reduce = useReducedMotion()
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.85, delay: index * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </M>
  )
}
