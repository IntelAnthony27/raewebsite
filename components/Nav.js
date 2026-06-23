'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const NAV_LINKS = [
  { href: '/shop',          label: 'Shop' },
  { href: '/custom-orders', label: 'Custom Orders' },
  { href: '/about',         label: 'Our Story' },
  { href: '/faq',           label: 'FAQ' },
  { href: '/contact',       label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const pathname                     = usePathname()
  const { itemCount, setIsOpen }     = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo" aria-label="A Rae of Light home">
            A <span>Rae</span> of Light
          </Link>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${pathname.startsWith(link.href) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <Link href="/shop" className="btn btn-accent btn-sm" aria-label="Shop now">
              Shop Now
            </Link>

            {/* Cart */}
            <button
              id="cart-toggle-btn"
              onClick={() => setIsOpen(true)}
              className="btn btn-ghost btn-icon cart-badge"
              aria-label={`Open cart, ${itemCount} items`}
            >
              🛍️
              {itemCount > 0 && (
                <span className="cart-count" aria-live="polite">{itemCount}</span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="nav-mobile-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div className="overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
            <button
              className="mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>

            <Link href="/" className="nav-logo" style={{ fontSize: 'var(--text-2xl)' }}>
              A <span style={{ color: 'var(--lavender-dark)' }}>Rae</span> of Light
            </Link>

            <nav aria-label="Mobile navigation links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--ink)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link href="/shop" className="btn btn-primary btn-lg">
              Shop Now ✨
            </Link>
          </div>
        </>
      )}
    </>
  )
}
