'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

export default function ProductCard({ product }) {
  const { add } = useCart()

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.customizable) {
      add(product, 1, {})
    }
  }

  const isOutOfStock = product.stock === 0

  return (
    <Link href={`/shop/${product.id}`} className="product-card" aria-label={`View ${product.name}`}>
      {/* Image */}
      <div className="product-card-image">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
        />

        {/* Badges */}
        <div className="product-card-badges">
          {product.bestseller && <span className="badge badge-bestseller">⭐ Best Seller</span>}
          {product.digital   && <span className="badge badge-digital">📥 Digital</span>}
          {product.customizable && !product.digital && (
            <span className="badge badge-new">✏️ Customizable</span>
          )}
        </div>

        {/* Quick add (only for non-customizable items) */}
        {!product.customizable && !isOutOfStock && (
          <div className="product-card-quick-add">
            <button
              id={`quick-add-${product.id}`}
              onClick={handleQuickAdd}
              className="btn btn-primary btn-sm"
              aria-label={`Quick add ${product.name} to cart`}
            >
              + Add
            </button>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(253,250,246,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(2px)',
            }}
          >
            <span className="badge" style={{ background: 'var(--ink)', color: 'var(--cream)', fontSize: '0.7rem' }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="product-card-body">
        <span className="product-card-category">{product.category.replace('-', ' ')}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.shortDesc}</p>

        <div className="product-card-footer">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          {product.customizable && (
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--lavender-dark)', fontWeight: 500 }}>
              Personalize →
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
