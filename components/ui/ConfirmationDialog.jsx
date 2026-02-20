'use client'

import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface ConfirmationDialogProps {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'warning' | 'success' | 'info'
  onConfirm: () => void
  onCancel?: () => void
}

export default function ConfirmationDialog({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setIsOpen(false)
  }

  if (!isOpen) return null

  const colors = {
    warning: {
      icon: 'text-accent',
      button: 'bg-accent',
      bg: 'bg-accent/10',
      border: 'border-accent',
    },
    success: {
      icon: 'text-success',
      button: 'bg-success',
      bg: 'bg-success/10',
      border: 'border-success',
    },
    info: {
      icon: 'text-primary',
      button: 'bg-primary',
      bg: 'bg-primary/10',
      border: 'border-primary',
    },
  }

  const color = colors[type]
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 scale-in">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-in fade-in scale-in">
        <div className={`${color.bg} ${color.border} border rounded-lg p-4 mb-4 flex items-start gap-3`}>
          <Icon className={`${color.icon} w-6 h-6 flex-shrink-0 mt-0.5`} />
          <div>
            <h2 className="font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground font-semibold hover:bg-muted transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2 ${color.button} text-white rounded-lg font-semibold hover:opacity-90 transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
