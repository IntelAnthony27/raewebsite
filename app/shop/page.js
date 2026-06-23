'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS, CATEGORIES } from '@/data/products'

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [sort, setSort] = useState('default')

  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    setActiveCategory(cat)
  }, [searchParams])

  const filtered = PRODUCTS.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'bestseller') return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)
    return 0
  })

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <span className="section-eyebrow">The Shop</span>
          <h1 className="section-title">All Products</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '48ch', margin: '0 auto' }}>
            Every piece is handcrafted with care. Browse bookmarks, keychains, stickers, and coloring pages — or filter to find exactly what you're looking for.
          </p>
        </div>
      </div>

      <div className="container section">
        {/* Filter + Sort Bar */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-8)',
            paddingBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--cream-dark)',
          }}
        >
          {/* Category filters */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }} role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`filter-${cat.id}`}
                className={`tag ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Sort:
            <select
              id="sort-select"
              className="input"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: 'var(--text-sm)' }}
              aria-label="Sort products"
            >
              <option value="default">Featured</option>
              <option value="bestseller">Best Sellers First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </label>
        </div>

        {/* Results count */}
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
          Showing {sorted.length} {sorted.length === 1 ? 'product' : 'products'}
          {activeCategory !== 'all' && ` in "${CATEGORIES.find(c => c.id === activeCategory)?.label}"`}
        </p>

        {/* Grid */}
        {sorted.length > 0 ? (
          <div className="grid-4">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-24) 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🔍</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--ink)' }}>
              No products found
            </p>
            <p>Try a different filter or{' '}
              <button
                onClick={() => setActiveCategory('all')}
                style={{ color: 'var(--lavender-dark)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                view all products
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default function ShopPage() {
  return (
    <div className="page-enter">
      <Suspense fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="spinner" style={{ width: 32, height: 32, borderColor: 'var(--lavender)', borderTopColor: 'var(--lavender-dark)' }} />
        </div>
      }>
        <ShopContent />
      </Suspense>
    </div>
  )
}
