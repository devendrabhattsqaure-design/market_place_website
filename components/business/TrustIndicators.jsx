'use client'

import { ShieldCheck, Award, Users, TrendingUp } from 'lucide-react'

export default function TrustIndicators({
  verified,
  rating,
  totalSales,
  className = '',
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {verified && (
        <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-2 rounded-lg border border-success">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">
            Verified Seller
          </span>
        </div>
      )}

      {rating >= 4.5 && (
        <div className="flex items-center gap-2 bg-warning/10 text-warning px-3 py-2 rounded-lg border border-warning">
          <Award className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">
            Highly Rated
          </span>
        </div>
      )}

      {totalSales >= 100 && (
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg border border-primary">
          <Users className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">
            Trusted by Many
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg border border-border">
        <TrendingUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="text-sm text-muted-foreground">
          {totalSales} successful sales
        </span>
      </div>
    </div>
  )
}