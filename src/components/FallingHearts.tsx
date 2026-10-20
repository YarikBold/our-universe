import { useMemo } from 'react'
import type { CSSProperties } from 'react'

import '../styles/motion.css'

export interface FallingHeartsProps {
  /** Number of hearts in the background layer. Keep this modest on phones. */
  count?: number
  /** Optional palette. A color is chosen deterministically for each heart. */
  colors?: string[]
  /** Animation speed multiplier. Values below one are slower. */
  speed?: number
  className?: string
  /** Render the layer above or below nearby content. */
  zIndex?: number
}

type HeartVars = CSSProperties & Record<`--${string}`, string | number>

const DEFAULT_COLORS = ['#f3a7d4', '#bea7f2', '#f3d59a', '#fff6fb']

/**
 * A lightweight decorative heart layer. It is intentionally CSS driven so it
 * remains smooth on mobile Safari and does not require a motion runtime.
 */
export function FallingHearts({
  count = 16,
  colors = DEFAULT_COLORS,
  speed = 1,
  className = '',
  zIndex,
}: FallingHeartsProps) {
  const hearts = useMemo(() => {
    const safeCount = Math.max(0, Math.min(40, Math.floor(count)))
    const safeSpeed = Math.max(0.35, speed)

    return Array.from({ length: safeCount }, (_, index) => {
      // A tiny deterministic sequence avoids hydration/layout jumps while
      // still distributing hearts naturally across the viewport.
      const seed = (index * 47 + 17) % 101
      const size = 0.72 + ((index * 13) % 70) / 100
      const duration = (9 + ((index * 11) % 80) / 10) / safeSpeed
      const delay = -((index * 1.73) % 12)
      const drift = ((seed % 31) - 15) / 2

      return {
        id: `${index}-${seed}`,
        style: {
          '--heart-left': `${seed}%`,
          '--heart-size': `${size}rem`,
          '--heart-duration': `${duration}s`,
          '--heart-delay': `${delay}s`,
          '--heart-drift': `${drift}vw`,
          '--heart-opacity': `${0.24 + ((index * 17) % 50) / 100}`,
          '--heart-color': colors[index % Math.max(1, colors.length)] ?? DEFAULT_COLORS[0],
        } as HeartVars,
      }
    })
  }, [colors, count, speed])

  return (
    <div
      className={`falling-hearts ${className}`.trim()}
      aria-hidden="true"
      style={zIndex === undefined ? undefined : ({ zIndex } as CSSProperties)}
    >
      {hearts.map(({ id, style }) => (
        <span className="falling-heart" key={id} style={style}>
          ♥
        </span>
      ))}
    </div>
  )
}

export default FallingHearts
