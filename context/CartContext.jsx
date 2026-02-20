'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [carts, setCarts] = useState(new Map())

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('marketplace-carts')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const newCarts = new Map(parsed)
        setCarts(newCarts)
      } catch (error) {
        console.error('Failed to load carts:', error)
      }
    }
  }, [])

  // Save to localStorage whenever carts change
  useEffect(() => {
    localStorage.setItem(
      'marketplace-carts',
      JSON.stringify(Array.from(carts))
    )
  }, [carts])

  const addToCart = (businessId, businessName, businessPhone, product) => {
    setCarts((prevCarts) => {
      const newCarts = new Map(prevCarts)
      const existingCart = newCarts.get(businessId)

      if (existingCart) {
        const existingItem = existingCart.items.find(
          (item) => item.productId === product.productId
        )

        if (existingItem) {
          existingItem.quantity += product.quantity
        } else {
          existingCart.items.push(product)
        }
      } else {
        newCarts.set(businessId, {
          businessId,
          businessName,
          businessPhone,
          items: [product],
        })
      }

      return newCarts
    })
  }

  const removeFromCart = (businessId, productId) => {
    setCarts((prevCarts) => {
      const newCarts = new Map(prevCarts)
      const cart = newCarts.get(businessId)

      if (cart) {
        cart.items = cart.items.filter(
          (item) => item.productId !== productId
        )

        if (cart.items.length === 0) {
          newCarts.delete(businessId)
        }
      }

      return newCarts
    })
  }

  const updateQuantity = (businessId, productId, quantity) => {
    setCarts((prevCarts) => {
      const newCarts = new Map(prevCarts)
      const cart = newCarts.get(businessId)

      if (cart) {
        const item = cart.items.find(
          (item) => item.productId === productId
        )
        if (item) {
          item.quantity = Math.max(1, quantity)
        }
      }

      return newCarts
    })
  }

  const getBusinessCart = (businessId) => {
    return carts.get(businessId)
  }

  const clearBusinessCart = (businessId) => {
    setCarts((prevCarts) => {
      const newCarts = new Map(prevCarts)
      newCarts.delete(businessId)
      return newCarts
    })
  }

  const getCartTotal = (businessId) => {
    const cart = carts.get(businessId)
    if (!cart) return 0

    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeFromCart,
        updateQuantity,
        getBusinessCart,
        clearBusinessCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}