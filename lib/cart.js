/**
 * A Rae of Light — Cart Logic
 *
 * Pure functions for cart state management. The cart is an array of CartItem:
 *   { product, quantity, selectedOptions }
 *
 * This module is framework-agnostic — all state management is done in CartContext.
 */

/** Add or increment a product in the cart */
export function addToCart(cartItems, product, quantity = 1, selectedOptions = {}) {
  // Use a composite key so different options = different line items
  const key = `${product.id}::${JSON.stringify(selectedOptions)}`
  const existing = cartItems.find((item) => item.key === key)

  if (existing) {
    return cartItems.map((item) =>
      item.key === key ? { ...item, quantity: item.quantity + quantity } : item
    )
  }

  return [...cartItems, { key, product, quantity, selectedOptions }]
}

/** Update the quantity of a specific line item (by key) */
export function updateQuantity(cartItems, key, quantity) {
  if (quantity <= 0) return removeFromCart(cartItems, key)
  return cartItems.map((item) => (item.key === key ? { ...item, quantity } : item))
}

/** Remove a line item from the cart */
export function removeFromCart(cartItems, key) {
  return cartItems.filter((item) => item.key !== key)
}

/** Clear the entire cart */
export function clearCart() {
  return []
}

/** Calculate cart subtotal in cents */
export function getSubtotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

/** Get total item count */
export function getItemCount(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0)
}

/** Serialize cart for localStorage persistence */
export function serializeCart(cartItems) {
  try {
    return JSON.stringify(cartItems)
  } catch {
    return '[]'
  }
}

/** Deserialize cart from localStorage */
export function deserializeCart(raw) {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
