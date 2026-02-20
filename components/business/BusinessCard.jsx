'use client'

import Link from 'next/link'
import { Star, ShoppingBag } from 'lucide-react'
import VerifiedBadge from '@/components/ui/VerifiedBadge'

export default function BusinessCard({ business }) {
  return (
    <Link href={`/buyer/${business.id}`}>
      <div className="card-hover bg-white rounded-lg border border-border overflow-hidden h-full flex flex-col">

        <div className="h-32 bg-gradient-to-br from-primary to-primary/70"></div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg line-clamp-2">
              {business.name}
            </h3>
            <VerifiedBadge verified={business.verified} />
          </div>

          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-semibold text-foreground">
                {business.rating}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <ShoppingBag className="w-4 h-4" />
              <span>{business.totalSales} sales</span>
            </div>
          </div>

          <div className="flex items-center gap-2 py-3 border-t border-b border-border mb-3">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-sm">
              <span className="font-semibold text-primary">
                {business.products.length}
              </span>{' '}
              products
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-success">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span>Trusted Seller</span>
          </div>
        </div>

        <div className="p-4 pt-0 mt-auto">
          <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
            View Products
          </button>
        </div>
      </div>
    </Link>
  )
}