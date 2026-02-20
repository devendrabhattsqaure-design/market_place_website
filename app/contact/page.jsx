'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react'
import { FeedbackModal } from '@/components/ui/FeedbackModal'
import { Sparkle, Confetti } from '@/components/ui/Sparkle'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [showSparkle, setShowSparkle] = useState(false)
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields')
      return
    }

    const submitBtn = e.currentTarget.querySelector('button[type="submit"]')
    if (submitBtn) {
      const rect = submitBtn.getBoundingClientRect()
      setSparklePos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    }

    setShowSparkle(true)
    setShowConfetti(true)

    const contacts = JSON.parse(localStorage.getItem('contact-messages') || '[]')
    contacts.push({
      ...formData,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem('contact-messages', JSON.stringify(contacts))

    setSubmitted(true)

    setTimeout(() => {
      setShowSparkle(false)
      setFeedbackOpen(true)
    }, 600)

    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
      setShowConfetti(false)
    }, 3000)
  }

  return (
    <>
      {showSparkle && <Sparkle x={sparklePos.x} y={sparklePos.y} color="#10B981" />}
      {showConfetti && <Confetti />}

      <div className="min-h-screen bg-background fade-in">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 slide-up">
              Get in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl slide-up">
              Have questions or feedback? We'd love to hear from you. Our team is here to help and will respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 bg-white border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: 'Email',
                  content: 'support@markethub.com',
                },
                {
                  icon: <Phone className="w-8 h-8" />,
                  title: 'Phone',
                  content: '+1 (555) 123-4567',
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: 'Office',
                  content: '123 Commerce St, Tech City, TC 12345',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="text-center card-hover p-6 bg-muted/30 rounded-lg border border-border"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg border border-border p-8 md:p-12 card-hover">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Send us a Message
              </h2>

              {!submitted ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-border rounded-lg"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-border rounded-lg"
                  />

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-3 border border-border rounded-lg"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll respond within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        title="Thank You!"
        message="Your message means a lot to us"
        context="contact"
      />
    </>
  )
}