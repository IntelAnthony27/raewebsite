import Link from 'next/link'

export const metadata = {
  title: 'Order Confirmed!',
  description: 'Thank you for your order from A Rae of Light!',
}

export default function CheckoutSuccessPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="success-page">
        <div className="success-icon">🎉</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))', color: 'var(--ink)', marginBottom: 'var(--space-4)' }}>
          Order Confirmed!
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '44ch', lineHeight: 1.75, marginBottom: 'var(--space-8)', fontSize: 'var(--text-md)' }}>
          Thank you so much for your order! 💜 I'm already excited to make something beautiful for you. You'll receive a confirmation email shortly.
        </p>
        <p style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-8)' }}>
          Questions? Email <a href="mailto:hello@araeoflight.com" style={{ color: 'var(--lavender-dark)', fontWeight: 500 }}>hello@araeoflight.com</a>
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/shop" className="btn btn-primary btn-lg" id="post-checkout-shop-btn">Continue Shopping</Link>
          <Link href="/about" className="btn btn-outline btn-lg">Read Our Story</Link>
        </div>
      </div>
    </div>
  )
}
