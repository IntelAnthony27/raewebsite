'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'
import { initiateCheckout } from '@/lib/checkout'

export default function CartPage() {
  const { items, update, remove, clear, subtotal, itemCount } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const shippingFree = subtotal >= 3500 // $35 threshold
  const shipping     = shippingFree ? 0 : 495
  const total        = subtotal + shipping

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    const result = await initiateCheckout(items)
    if (result.success && result.redirectUrl) {
      window.location.href = result.redirectUrl
    } else {
      setError(result.error || 'Checkout failed. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="page-enter" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="success-page">
          <div className="success-icon">🛍️</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--ink)', marginBottom: 'var(--space-4)' }}>
            Your bag is empty
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '36ch', marginBottom: 'var(--space-8)' }}>
            Looks like you haven't added anything yet. Head to the shop to find something beautiful!
          </p>
          <Link href="/shop" className="btn btn-primary btn-lg" id="empty-cart-shop-btn">
            Browse the Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-8))' }}>
      <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))', marginBottom: 'var(--space-8)', color: 'var(--ink)' }}>
          Your Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 'var(--space-10)', alignItems: 'start' }}>
          {/* Items */}
          <div>
            {items.map((item) => (
              <CartPageItem key={item.key} item={item} onUpdate={update} onRemove={remove} />
            ))}

            <div style={{ marginTop: 'var(--space-4)' }}>
              <button
                onClick={clear}
                style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear bag
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              boxShadow: 'var(--shadow)',
              position: 'sticky',
              top: 'calc(var(--nav-height) + var(--space-4))',
            }}
            aria-label="Order summary"
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)', color: 'var(--ink)' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row
                label="Shipping"
                value={shippingFree ? 'FREE 🎉' : formatPrice(shipping)}
                valueStyle={{ color: shippingFree ? 'var(--sage-dark)' : 'var(--ink)' }}
              />
            </div>

            {!shippingFree && (
              <div
                style={{
                  background: 'var(--sage-light)',
                  borderRadius: 'var(--radius)',
                  padding: 'var(--space-3) var(--space-4)',
                  marginBottom: 'var(--space-5)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--sage-dark)',
                  fontWeight: 500,
                }}
              >
                🚚 Add {formatPrice(3500 - subtotal)} more for free shipping!
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
              <Row label="Total" value={formatPrice(total)} bold />
            </div>

            {error && (
              <p style={{ color: 'var(--blush-dark)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', background: 'var(--blush-light)', padding: 'var(--space-3)', borderRadius: 'var(--radius)' }}>
                {error}
              </p>
            )}

            <button
              id="checkout-btn"
              className="btn btn-primary btn-lg w-full"
              onClick={handleCheckout}
              disabled={loading}
              style={{ justifyContent: 'center', marginBottom: 'var(--space-3)' }}
              aria-label="Proceed to checkout"
            >
              {loading ? <><span className="spinner" /> Processing…</> : 'Checkout Securely →'}
            </button>

            <Link href="/shop" className="btn btn-ghost w-full" style={{ justifyContent: 'center', fontSize: 'var(--text-sm)' }}>
              ← Continue Shopping
            </Link>

            {/* Trust */}
            <div style={{ marginTop: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {['🔒 Secure checkout', '💜 Handmade with love', '📦 Carefully packaged'].map((t) => (
                <p key={t} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {t}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, bold, valueStyle }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 'var(--text-sm)', color: bold ? 'var(--ink)' : 'var(--text-muted)', fontWeight: bold ? 600 : 400 }}>
        {label}
      </span>
      <span style={{ fontSize: bold ? 'var(--text-lg)' : 'var(--text-sm)', fontWeight: bold ? 700 : 500, color: 'var(--ink)', fontFamily: bold ? 'var(--font-display)' : undefined, ...valueStyle }}>
        {value}
      </span>
    </div>
  )
}

function CartPageItem({ item, onUpdate, onRemove }) {
  const { product, quantity, selectedOptions } = item
  const optionLabels = Object.entries(selectedOptions || {})
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)

  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr auto',
        gap: 'var(--space-5)',
        alignItems: 'start',
        padding: 'var(--space-5) 0',
        borderBottom: '1px solid var(--cream-dark)',
      }}
    >
      <Link href={`/shop/${product.id}`}>
        <div style={{ width: 100, height: 100, borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--cream-dark)', position: 'relative' }}>
          <Image src={product.images[0]} alt={product.name} fill sizes="100px" style={{ objectFit: 'cover' }} />
        </div>
      </Link>

      <div>
        <Link href={`/shop/${product.id}`} style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 'var(--text-md)', fontFamily: 'var(--font-display)', display: 'block', marginBottom: 'var(--space-1)' }}>
          {product.name}
        </Link>
        {optionLabels.length > 0 && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginBottom: 'var(--space-3)' }}>
            {optionLabels.join(' · ')}
          </p>
        )}
        <div className="qty-selector">
          <button className="qty-btn" onClick={() => onUpdate(item.key, quantity - 1)} aria-label="Decrease quantity">−</button>
          <span className="qty-value">{quantity}</span>
          <button className="qty-btn" onClick={() => onUpdate(item.key, quantity + 1)} aria-label="Increase quantity">+</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)' }}>
        <span style={{ fontWeight: 600, fontSize: 'var(--text-md)', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          {formatPrice(product.price * quantity)}
        </span>
        <button
          onClick={() => onRemove(item.key)}
          style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Remove
        </button>
      </div>
    </article>
  )
}
