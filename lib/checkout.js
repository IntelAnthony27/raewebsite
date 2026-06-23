/**
 * A Rae of Light — Checkout Abstraction Layer
 *
 * This adapter isolates all checkout provider logic behind a single interface.
 * To integrate Stripe or Shopify later, only this file needs to change.
 *
 * Current mode: STUB — logs to console and redirects to /cart
 *
 * ─── Future Integration Points ───────────────────────────────────────────────
 *
 * STRIPE:
 *   1. Install: npm install stripe @stripe/stripe-js
 *   2. Add env vars: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY
 *   3. Create API route: /app/api/checkout/route.js
 *   4. Replace initiateCheckout() below to call that route and redirect to Stripe Checkout
 *
 * SHOPIFY:
 *   1. Install: npm install @shopify/buy-button-js
 *   2. Add env vars: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
 *   3. Map products by Shopify variant ID
 *   4. Replace initiateCheckout() to create a Shopify checkout and redirect
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Environment flags — set these when integrating
const CHECKOUT_PROVIDER = process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER || 'stub' // 'stripe' | 'shopify' | 'stub'

/**
 * Main checkout entry point.
 * @param {Array} cartItems - Array of { product, quantity, selectedOptions }
 * @param {object} options  - Optional metadata (coupon, email pre-fill, etc.)
 * @returns {Promise<{ success: boolean, redirectUrl?: string, error?: string }>}
 */
export async function initiateCheckout(cartItems, options = {}) {
  if (!cartItems || cartItems.length === 0) {
    return { success: false, error: 'Cart is empty' }
  }

  switch (CHECKOUT_PROVIDER) {
    case 'stripe':
      return initiateStripeCheckout(cartItems, options)
    case 'shopify':
      return initiateShopifyCheckout(cartItems, options)
    case 'stub':
    default:
      return initiateStubCheckout(cartItems, options)
  }
}

// ─── STUB (Development) ──────────────────────────────────────────────────────

async function initiateStubCheckout(cartItems, options) {
  console.group('🛒 [Checkout Stub] Cart Contents')
  cartItems.forEach((item) => {
    console.log(`  ${item.quantity}x ${item.product.name} @ $${(item.product.price / 100).toFixed(2)}`)
    if (Object.keys(item.selectedOptions || {}).length > 0) {
      console.log('    Options:', item.selectedOptions)
    }
  })
  const total = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0)
  console.log(`  Total: $${(total / 100).toFixed(2)}`)
  console.groupEnd()

  // Simulate async payment processing delay
  await new Promise((r) => setTimeout(r, 800))

  return { success: true, redirectUrl: '/checkout-success' }
}

// ─── STRIPE (Future) ─────────────────────────────────────────────────────────

async function initiateStripeCheckout(cartItems, options) {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems, options }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
      return { success: true, redirectUrl: data.url }
    }
    return { success: false, error: data.error || 'Stripe checkout failed' }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

// ─── SHOPIFY (Future) ─────────────────────────────────────────────────────────

async function initiateShopifyCheckout(cartItems, options) {
  // TODO: Map cartItems to Shopify line items and create checkout
  console.warn('[Checkout] Shopify integration not yet configured.')
  return { success: false, error: 'Shopify not configured' }
}

/**
 * Build a human-readable order summary string.
 * Useful for email receipts or confirmation pages.
 */
export function buildOrderSummary(cartItems) {
  const lines = cartItems.map(
    (item) => `${item.quantity}x ${item.product.name} — $${((item.product.price * item.quantity) / 100).toFixed(2)}`
  )
  const total = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0)
  return {
    lines,
    total: `$${(total / 100).toFixed(2)}`,
    provider: CHECKOUT_PROVIDER,
  }
}
