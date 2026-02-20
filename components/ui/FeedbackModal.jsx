'use client'

import { useState } from 'react'
import { Sparkle } from './Sparkle'

export function FeedbackModal({
  isOpen,
  onClose,
  title = 'We value your feedback',
  message = 'Help us improve your experience',
  context,
}) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 })
  const [showSparkle, setShowSparkle] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    setSparklePos({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })
    setShowSparkle(true)

    const feedbackData = {
      context,
      rating,
      feedback,
      timestamp: new Date().toISOString(),
    }

    const existing = JSON.parse(localStorage.getItem('user-feedback') || '[]')
    existing.push(feedbackData)
    localStorage.setItem('user-feedback', JSON.stringify(existing))

    setTimeout(() => {
      setSubmitted(false)
      setRating(0)
      setFeedback('')
      setShowSparkle(false)
      onClose()
    }, 1500)
  }

  return (
    <>
      {showSparkle && (
        <Sparkle x={sparklePos.x} y={sparklePos.y} color="#10B981" />
      )}

      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {!submitted ? (
            <>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground mb-6">{message}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Rate your experience
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl transition-all duration-200 hover:scale-110 ${
                          star <= rating
                            ? 'text-accent scale-110'
                            : 'text-muted'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your feedback (optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you think..."
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={rating === 0}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">✓</div>
              <h4 className="text-xl font-bold text-primary mb-2">
                Thank you!
              </h4>
              <p className="text-muted-foreground">
                Your feedback helps us improve
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}