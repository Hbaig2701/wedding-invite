const B = import.meta.env.BASE_URL
/**
 * The floral artwork from the printed Save the Date, cut out with the ivory
 * keyed to transparency. Used as page ornament on the solid ivory ground.
 */
export function Swag({ position = 'bottom', className = '' }: { position?: 'top' | 'bottom'; className?: string }) {
  return (
    <div className={`swag swag-${position} ${className}`} aria-hidden="true">
      <img src={`${B}flora/swag-${position}.png`} alt="" loading="lazy" decoding="async" />
    </div>
  )
}

export function Cluster({ className = '' }: { className?: string }) {
  return (
    <div className={`cluster ${className}`} aria-hidden="true">
      <img src={`${B}flora/cluster.png`} alt="" loading="lazy" decoding="async" />
    </div>
  )
}
