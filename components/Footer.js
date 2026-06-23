import Link from 'next/link'

const SHOP_LINKS = [
  { href: '/shop?category=bookmarks',      label: 'Bookmarks' },
  { href: '/shop?category=keychains',      label: 'Keychains' },
  { href: '/shop?category=stickers',       label: 'Stickers' },
  { href: '/shop?category=coloring-pages', label: 'Coloring Pages' },
  { href: '/shop?category=bundles',        label: 'Gift Bundles' },
]

const INFO_LINKS = [
  { href: '/about',         label: 'Our Story' },
  { href: '/custom-orders', label: 'Custom Orders' },
  { href: '/faq',           label: 'FAQ' },
  { href: '/contact',       label: 'Contact' },
]

const LEGAL_LINKS = [
  { href: '/privacy',  label: 'Privacy Policy' },
  { href: '/shipping', label: 'Shipping Info' },
  { href: '/returns',  label: 'Returns' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <p className="footer-brand-name">
              A <span>Rae</span> of Light
            </p>
            <p className="footer-brand-desc">
              A small creative shop run by a young artist who believes in the magic of handmade details. Every product is made with love and a whole lot of sparkle.
            </p>
            <div className="social-links" style={{ marginTop: 'var(--space-5)' }}>
              <a href="#" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">📸</a>
              <a href="#" className="social-link" aria-label="TikTok"    target="_blank" rel="noopener noreferrer">🎵</a>
              <a href="#" className="social-link" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">📌</a>
              <a href="mailto:hello@araeoflight.com" className="social-link" aria-label="Email">✉️</a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="footer-col-title">Shop</p>
            <ul className="footer-links" role="list">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="footer-col-title">Explore</p>
            <ul className="footer-links" role="list">
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="footer-col-title">Legal</p>
            <ul className="footer-links" role="list">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} A Rae of Light. All rights reserved. Made with 💜 by Rae.
          </p>
          <p className="footer-copy">
            Handcrafted with heart · Shipped with care
          </p>
        </div>
      </div>
    </footer>
  )
}
