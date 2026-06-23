'use client'

import { useState } from 'react'

export default function NewsletterBanner() {
  const [email, setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // TODO: connect to email provider (Mailchimp, ConvertKit, etc.)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="section" aria-labelledby="newsletter-heading">
      <div className="container">
        <div className="newsletter-section">
          {submitted ? (
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)', animation: 'float 2s ease-in-out infinite' }}>🎉</div>
              <h2
                className="newsletter-title"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--cream)' }}
              >
                You're on the list!
              </h2>
              <p className="newsletter-subtitle">
                Thank you for joining! Check your inbox for a little welcome gift from Rae 🌟
              </p>
            </div>
          ) : (
            <>
              <h2 id="newsletter-heading" className="newsletter-title">
                Join the Rae of Light Circle ✨
              </h2>
              <p className="newsletter-subtitle">
                Be the first to know about new products, limited drops, and behind-the-scenes peeks at the studio. Plus — a 10% discount on your first order!
              </p>
              <form
                className="newsletter-form"
                onSubmit={handleSubmit}
                aria-label="Newsletter signup form"
              >
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="newsletter-input"
                  required
                  aria-required="true"
                />
                <button
                  type="submit"
                  className="btn btn-accent"
                  disabled={loading}
                  id="newsletter-submit-btn"
                  aria-label="Subscribe to newsletter"
                >
                  {loading ? <span className="spinner" /> : 'Subscribe'}
                </button>
              </form>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'rgba(253,250,246,0.45)', position: 'relative', zIndex: 1 }}>
                No spam, ever. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
