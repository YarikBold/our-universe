import type { CSSProperties, ReactNode } from 'react'

import '../styles/motion.css'

type MotionStyle = CSSProperties & Record<`--${string}`, string | number>

export interface MotionPrimitiveProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

const revealStyle = (delay: number, duration: number, extra: Record<string, string | number> = {}): MotionStyle => ({
  '--motion-delay': `${Math.max(0, delay)}s`,
  '--motion-duration': `${Math.max(0.01, duration)}s`,
  ...extra,
})

function primitiveClass(name: string, className?: string) {
  return `motion-primitive ${name} ${className ?? ''}`.trim()
}

/** A quiet editorial reveal: it arrives like a curtain lifting, never a template fade. */
export function FadeIn({ children, className, delay = 0, duration = 0.85 }: MotionPrimitiveProps) {
  return <div className={primitiveClass('motion-fade-in', className)} style={revealStyle(delay, duration)}>{children}</div>
}

/** A clipped line reveal for chapter copy and cinematic captions. */
export function Reveal({ children, className, delay = 0, duration = 1 }: MotionPrimitiveProps) {
  return <div className={primitiveClass('motion-reveal', className)} style={revealStyle(delay, duration)}><div className="motion-reveal__content">{children}</div></div>
}

/** Soft depth entrance for the few hero elements that deserve a camera push. */
export function ScaleIn({ children, className, delay = 0, duration = 0.95 }: MotionPrimitiveProps) {
  return <div className={primitiveClass('motion-scale-in', className)} style={revealStyle(delay, duration)}>{children}</div>
}

export interface StaggerProps extends MotionPrimitiveProps { itemDelay?: number }

export function Stagger({ children, className, delay = 0, duration = 0.72, itemDelay = 0.08 }: StaggerProps) {
  return <div className={primitiveClass('motion-stagger', className)} style={revealStyle(delay, duration, { '--motion-item-delay': `${Math.max(0, itemDelay)}s` })}>{children}</div>
}

/** A full-bleed light wash used as a scene hinge. */
export function SceneWash({ children, className, delay = 0, duration = 1.1 }: MotionPrimitiveProps) {
  return <div className={primitiveClass('motion-scene-wash', className)} style={revealStyle(delay, duration)}>{children}</div>
}

/** A directional wipe that can be keyed by a chapter index for replay. */
export function SceneWipe({ children, className, delay = 0, duration = 1.05 }: MotionPrimitiveProps) {
  return <div className={primitiveClass('motion-scene-wipe', className)} style={revealStyle(delay, duration)}>{children}</div>
}

/** Adds a restrained camera drift to atmospheric backgrounds. */
export function CameraDrift({ children, className, delay = 0, duration = 16 }: MotionPrimitiveProps) {
  return <div className={primitiveClass('motion-camera-drift', className)} style={revealStyle(delay, duration)}>{children}</div>
}

/** A depth wrapper for parallax layers. The value is intentionally subtle on mobile. */
export function ParallaxLayer({ children, className, depth = 1 }: { children: ReactNode; className?: string; depth?: number }) {
  const safeDepth = Math.max(-2, Math.min(2, depth))
  return <div className={`motion-parallax-layer ${className ?? ''}`.trim()} style={{ '--parallax-depth': safeDepth } as MotionStyle}>{children}</div>
}

/** Delicate sakura/dust particles for the finale. CSS handles all movement. */
export function PetalField({ count = 12, className }: { count?: number; className?: string }) {
  const safeCount = Math.max(0, Math.min(24, Math.floor(count)))
  return <div className={`motion-petal-field ${className ?? ''}`.trim()} aria-hidden="true">{Array.from({ length: safeCount }, (_, index) => <span key={index} style={{ '--petal-left': `${(index * 37 + 9) % 100}%`, '--petal-delay': `${-((index * 1.37) % 10)}s`, '--petal-duration': `${9 + (index % 5) * 1.6}s`, '--petal-drift': `${((index * 17) % 30) - 15}vw`, '--petal-rotate': `${(index * 29) % 180 - 90}deg` } as MotionStyle}>✦</span>)}</div>
}
