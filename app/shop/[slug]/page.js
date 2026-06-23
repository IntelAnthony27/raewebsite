'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById, getRelatedProducts, formatPrice, PRODUCTS } from '@/data/products'
import { useCart } from '@/context/CartContext'
import CustomizationForm from '@/components/CustomizationForm'
import ProductCard from '@/components/ProductCard'

export default function ProductDetailPage({ params }) {
  const product = getProductById(params.slug)
  if (!product) notFound()

  const related  = getRelatedProducts(product, 4)
  const { add }  = useCart()
  const [qty, setQty]               = useState(1)
  const [options, setOptions]       = useState({})
  const [adding, setAdding]         = useState(false)
  const [added, setAdded]           = useState(false)

  const isOutOfStock = product.stock === 0
  const isUnlimited  = product.stock === -1

  const handleAddToCart = async () => {
    if (isOutOfStock) return
    setAdding(true)
    await new Promise((r) => setTimeout(r, 400))
    add(product, qty, options)
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="page-enter">
      {/* ─── PRODUCT DETAIL ──────────────────────────────────── */}
      <div
        className="container"
        style={{ paddingTop: 'calc(var(--nav-height) + var(--space-8))', paddingBottom: 'var(--space-16)' }}
      >
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/" className="footer-link">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/shop" className="footer-link">Shop</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href={`/shop?category=${product.category}`} className="footer-link">
            {product.category.replace('-', ' ')}
          </Link>
          <span className="breadcrumb-sep">›</span>
          <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          {/* ── Gallery ── */}
          <div className="product-gallery">
            <div className="product-gallery-main">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={600}
                height={600}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {product.bestseller   && <span className="badge badge-bestseller">⭐ Best Seller</span>}
              {product.digital      && <span className="badge badge-digital">📥 Instant Download</span>}
              {product.customizable && <span className="badge badge-new">✏️ Customizable</span>}
            </div>
          </div>

          {/* ── Info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Category + Name */}
            <div>
              <span className="product-card-category" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                {product.category.replace('-', ' ')}
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))', lineHeight: 1.15, marginBottom: 'var(--space-3)', color: 'var(--ink)' }}>
                {product.name}
              </h1>
              <p className="product-info-price">{formatPrice(product.price)}</p>
            </div>

            {/* Description */}
            <p className="product-info-desc">{product.description}</p>

            {/* Customization */}
            {product.customizable && product.customOptions && (
              <CustomizationForm
                customOptions={product.customOptions}
                values={options}
                onChange={setOptions}
              />
            )}

            {/* Quantity + Add to Cart */}
            {!isOutOfStock ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {!product.digital && (
                  <div>
                    <span className="product-section-label">Quantity</span>
                    <div className="qty-selector">
                      <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
                      <span className="qty-value" aria-live="polite">{qty}</span>
                      <button className="qty-btn" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                )}

                <button
                  id={`add-to-cart-${product.id}`}
                  className="btn btn-primary btn-lg w-full"
                  onClick={handleAddToCart}
                  disabled={adding}
                  aria-label={`Add ${product.name} to cart`}
                  style={{ justifyContent: 'center' }}
                >
                  {adding ? (
                    <><span className="spinner" /> Adding…</>
                  ) : added ? (
                    '✓ Added to Bag!'
                  ) : product.digital ? (
                    '📥 Add to Bag — Instant Download'
                  ) : (
                    `Add to Bag — ${formatPrice(product.price * qty)}`
                  )}
                </button>

                <Link href="/custom-orders" className="btn btn-outline btn-lg w-full" style={{ textAlign: 'center' }}>
                  ✏️ Request Custom Version
                </Link>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)', background: 'var(--cream-dark)', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ fontWeight: 500, color: 'var(--ink-muted)' }}>Currently out of stock</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)', marginTop: 'var(--space-2)' }}>
                  Sign up below to be notified when it's back!
                </p>
              </div>
            )}

            {/* Trust signals */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--cream-dark)',
              }}
            >
              {[
                { icon: '🚚', label: 'Free shipping', sub: 'over $35' },
                { icon: '💜', label: 'Handmade', sub: 'with love' },
                { icon: '↩️', label: 'Easy returns', sub: '30-day policy' },
              ].map((t) => (
                <div key={t.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: 4 }}>{t.icon}</div>
                  <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--ink)' }}>{t.label}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>{t.sub}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                {product.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ cursor: 'default', fontSize: 'var(--text-xs)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ─── RELATED PRODUCTS ──────────────────────────────── */}
        {related.length > 0 && (
          <section style={{ marginTop: 'var(--space-20)' }} aria-labelledby="related-heading">
            <hr className="divider" />
            <div className="section-header" style={{ marginTop: 'var(--space-12)' }}>
              <span className="section-eyebrow">You might also love</span>
              <h2 id="related-heading" className="section-title">More from {product.category.replace('-', ' ')}</h2>
            </div>
            <div className="grid-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
