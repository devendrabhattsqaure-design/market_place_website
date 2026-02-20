'use client'

import Image from 'next/image'
import { ShoppingCart, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const [imageLoading, setImageLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    setAddingToCart(true)
    
    // Simulate adding to cart
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    onAddToCart?.(product)
    setAddingToCart(false)
  }

  return (
    <div className="card-hover bg-white rounded-lg border border-border overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 scale-in"
          onLoadingComplete={() => setImageLoading(false)}
        />
        {imageLoading && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-auto">{product.description}</p>

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-lg font-bold text-primary">${product.price?.toFixed(2)}</div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={addingToCart}
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all button-hover flex items-center justify-center gap-2 disabled:opacity-75"
        >
          {addingToCart ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}