'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

export default function CartDrawer() {
  const { items, remove, update, subtotal, itemCount, isOpen, setIsOpen } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="overlay"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        id="cart-overlay"
      />

      {/* Drawer */}
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        id="cart-drawer"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            Your Bag{' '}
            {itemCount > 0 && (
              <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontWeight: 400 }}>
                ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button
            id="cart-close-btn"
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost btn-icon"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛍️</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--ink)' }}>
                Your bag is empty
              </p>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Add something beautiful to get started!
              </p>
              <Link
                href="/shop"
                className="btn btn-accent"
                onClick={() => setIsOpen(false)}
              >
                Browse the Shop
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <CartItem key={item.key} item={item} onUpdate={update} onRemove={remove} />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--ink)' }}>
                {formatPrice(subtotal)}
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', textAlign: 'center' }}>
              Shipping & taxes calculated at checkout
            </p>

            <Link
              href="/cart"
              className="btn btn-primary w-full"
              onClick={() => setIsOpen(false)}
              id="proceed-to-checkout-btn"
            >
              Proceed to Checkout →
            </Link>

            <button
              className="btn btn-ghost w-full"
              onClick={() => setIsOpen(false)}
              style={{ fontSize: 'var(--text-sm)' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

function CartItem({ item, onUpdate, onRemove }) {
  const { product, quantity, selectedOptions } = item
  const optionLabels = Object.values(selectedOptions || {}).filter(Boolean)

  return (
    <article className="cart-item">
      {/* Image */}
      <div style={{ position: 'relative', width: 80, height: 80, borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--cream-dark)', flexShrink: 0 }}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="80px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', minWidth: 0 }}>
        <Link
          href={`/shop/${product.id}`}
          className="cart-item-name"
          style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {product.name}
        </Link>

        {optionLabels.length > 0 && (
          <p className="cart-item-options">{optionLabels.join(' · ')}</p>
        )}

        {/* Qty */}
        <div className="qty-selector" style={{ marginTop: 'var(--space-2)' }}>
          <button
            className="qty-btn"
            onClick={() => onUpdate(item.key, quantity - 1)}
            aria-label="Decrease quantity"
          >−</button>
          <span className="qty-value">{quantity}</span>
          <button
            className="qty-btn"
            onClick={() => onUpdate(item.key, quantity + 1)}
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      {/* Price + remove */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)', flexShrink: 0 }}>
        <span className="cart-item-price">{formatPrice(product.price * quantity)}</span>
        <button
          onClick={() => onRemove(item.key)}
          style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
          aria-label={`Remove ${product.name} from cart`}
        >
          Remove
        </button>
      </div>
    </article>
  )
}
