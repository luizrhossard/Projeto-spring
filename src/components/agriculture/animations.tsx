'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface Card3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Card3D({ children, className = '', intensity = 15 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Floating animation for icons
export function Float3D({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -8, 0],
        rotateY: [0, 360]
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        },
        rotateY: {
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

// Pulse glow effect
export function GlowPulse({ children, className = '', color = 'emerald' }: { children: ReactNode; className?: string; color?: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'rgba(16, 185, 129, 0.4)',
    amber: 'rgba(245, 158, 11, 0.4)',
    sky: 'rgba(14, 165, 233, 0.4)',
    red: 'rgba(239, 68, 68, 0.4)'
  }
  
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 20px ${colorMap[color] || colorMap.emerald}`,
          `0 0 40px ${colorMap[color] || colorMap.emerald}`,
          `0 0 20px ${colorMap[color] || colorMap.emerald}`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered fade in animation for lists
export function FadeInStagger({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  )
}

// Scale on hover with 3D effect
export function Scale3D({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.05,
        rotateX: 5,
        rotateY: -5
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

// Counter animation for numbers
export function AnimatedNumber({ value, duration = 1 }: { value: number; duration?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      key={value}
      transition={{ duration: duration * 0.3, ease: 'easeOut' }}
    >
      {value}
    </motion.span>
  )
}

// Progress bar with 3D effect
export function Progress3D({ value, color = '#22c55e' }: { value: number; color?: string }) {
  return (
    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ 
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          boxShadow: `0 0 10px ${color}80, inset 0 1px 2px rgba(255,255,255,0.3)`
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full opacity-50"
        style={{ 
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%)'
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  )
}

// Bounce animation for badges
export function BounceBadge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}

// Rotate 3D on hover
export function Rotate3D({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{
        rotateY: 180,
        transition: { duration: 0.6 }
      }}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {children}
    </motion.div>
  )
}

// Slide in from side
export function SlideIn({ children, direction = 'left', delay = 0 }: { 
  children: ReactNode; 
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number 
}) {
  const initialPosition = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    top: { y: -100, opacity: 0 },
    bottom: { y: 100, opacity: 0 }
  }
  
  return (
    <motion.div
      initial={initialPosition[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  )
}
