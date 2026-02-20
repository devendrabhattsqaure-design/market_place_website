'use client'

import { CheckCircle2 } from 'lucide-react'

export default function VerifiedBadge({ verified, className = '' }) {
  if (!verified) return null

  return (
    <div className={`flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
      <CheckCircle2 className="w-3 h-3" />
      Verified
    </div>
  )
}