'use client'

import Link from 'next/link'

export default function CollectionCard({ cat }) {
  return (
    <Link
      href={`/shop?category=${cat.id}`}
      id={`collection-${cat.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-3)',
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8) var(--space-4)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--duration) var(--ease)',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
      }}
    >
      <span style={{ fontSize: '2.5rem' }}>{cat.emoji}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--ink)' }}>
        {cat.label}
      </span>
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--lavender-dark)', fontWeight: 500 }}>
        Shop now →
      </span>
    </Link>
  )
}
