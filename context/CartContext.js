'use client'

import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getSubtotal,
  getItemCount,
  serializeCart,
  deserializeCart,
} from '@/lib/cart'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return addToCart(state, action.product, action.quantity, action.selectedOptions)
    case 'UPDATE':
      return updateQuantity(state, action.key, action.quantity)
    case 'REMOVE':
      return removeFromCart(state, action.key)
    case 'CLEAR':
      return clearCart()
    case 'HYDRATE':
      return action.items
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [isOpen, setIsOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('arae-cart')
    if (stored) {
      dispatch({ type: 'HYDRATE', items: deserializeCart(stored) })
    }
    setIsHydrated(true)
  }, [])

  // Persist to localStorage on every change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('arae-cart', serializeCart(items))
    }
  }, [items, isHydrated])

  const add = (product, quantity = 1, selectedOptions = {}) => {
    dispatch({ type: 'ADD', product, quantity, selectedOptions })
    setIsOpen(true) // open drawer on add
  }

  const update = (key, quantity) => dispatch({ type: 'UPDATE', key, quantity })
  const remove = (key) => dispatch({ type: 'REMOVE', key })
  const clear = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        update,
        remove,
        clear,
        subtotal: getSubtotal(items),
        itemCount: getItemCount(items),
        isOpen,
        setIsOpen,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
