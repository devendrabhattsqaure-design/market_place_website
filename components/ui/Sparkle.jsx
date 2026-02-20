'use client'

import { useEffect, useRef } from 'react'

export function Sparkle({ x, y, color = '#FFD700' }) {
  const sparkles = useRef([])

  useEffect(() => {
    const sparkleCount = 20
    const newSparkles = []

    for (let i = 0; i < sparkleCount; i++) {
      const angle = (i / sparkleCount) * Math.PI * 2
      const velocity = 2 + Math.random() * 4
      const dx = Math.cos(angle) * velocity
      const dy = Math.sin(angle) * velocity

      newSparkles.push(
        <div
          key={`sparkle-${i}`}
          className="sparkle fixed w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            backgroundColor: color,
            '--x': `${dx * 50}px`,
            '--y': `${dy * 50}px`,
          }}
        />
      )
    }

    sparkles.current = newSparkles
  }, [x, y, color])

  return <>{sparkles.current}</>
}

export function Confetti() {
  const confetti = useRef([])

  useEffect(() => {
    const confettiCount = 40
    const colors = ['#6D9E51', '#FF5656', '#10B981', '#3B82F6', '#F59E0B']
    const newConfetti = []

    for (let i = 0; i < confettiCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      const randomDelay = Math.random() * 0.2
      const randomLeft = Math.random() * 100
      const randomSize = 5 + Math.random() * 10

      newConfetti.push(
        <div
          key={`confetti-${i}`}
          className="confetti fixed pointer-events-none"
          style={{
            left: `${randomLeft}%`,
            top: '-10px',
            backgroundColor: randomColor,
            width: `${randomSize}px`,
            height: `${randomSize}px`,
            borderRadius: '50%',
            animationDelay: `${randomDelay}s`,
          }}
        />
      )
    }

    confetti.current = newConfetti
  }, [])

  return <>{confetti.current}</>
}