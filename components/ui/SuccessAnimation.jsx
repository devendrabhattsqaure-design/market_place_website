'use client'

import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SuccessAnimation({
  message,
  onComplete,
  duration = 2000,
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-success text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50">
      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium">{message}</span>
    </div>
  )
}