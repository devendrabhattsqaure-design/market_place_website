import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ size = 'md', text, fullScreen = false }) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  }

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <Loader2
        className={`${sizeMap[size]} text-primary animate-spin`}
        style={{ animation: 'spin-slow 2s linear infinite' }}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}