import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Scroll reveal with weight: a longer rise, a slight settle in scale and a
 * slow, eased finish, staggered by `index`. Plays once per element.
 */
export function Reveal({ children, index = 0, className, as = 'div', y = 38 }: { children: ReactNode; index?: number; className?: string; as?: 'div' | 'section' | 'li' | 'p' | 'h2' | 'h3'; y?: number }) {
  const reduce = useReducedMotion()
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.25, delay: index * 0.11, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  )
}
