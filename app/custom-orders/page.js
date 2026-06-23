'use client'

import { useState } from 'react'
import Link from 'next/link'

const STEPS = [
  {
    number: '01',
    icon: '💡',
    title: 'Share Your Idea',
    desc: 'Fill out the form below with your vision — the product type, personalization details, colors, and any inspiration you have.',
  },
  {
    number: '02',
    icon: '🎨',
    title: 'Rae Designs It',
    desc: `I'll bring your idea to life with a custom illustration or layout. You'll receive a digital proof to approve before anything is printed.`,
  },
  {
    number: '03',
    icon: '✅',
    title: 'You Approve & Pay',
    desc: `Once you're happy with the design, you'll receive an invoice. Production begins after payment is confirmed.`,
  },
  {
    number: '04',
    icon: '📦',
    title: 'Receive Your Order',
    desc: 'Your handcrafted custom piece is carefully packaged and shipped to you — usually within 5–10 business days.',
  },
]

const POPULAR_IDEAS = [
  '🎂 Birthday bookmarks with a name',
  '📚 Custom book club sticker sets',
  '🎓 Graduation keychains with initials',
  '🎁 Personalized gift box bundles',
  '💌 Custom coloring pages for parties',
  '⭐ Bulk orders for schools or events',
]

export default function CustomOrdersPage() {
  const [form, setForm] = useState({
    name: '', email: '', productType: '', description: '', budget: '', timeline: '', hearAbout: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: send to email API or form handler
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="page-enter">
      {/* Page Header */}
      <div
        className="page-header"
        style={{
          background: 'linear-gradient(160deg, var(--lavender-light) 0%, var(--blush-light) 100%)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span className="section-eyebrow">Bespoke Creations</span>
          <h1 className="section-title">Custom Orders</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '52ch', margin: '0 auto var(--space-8)' }}>
            Have something special in mind? I love bringing unique ideas to life. Every custom order is a collaboration — your vision, my art.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-6)', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['✉️ Response within 24 hours', '🎨 Digital proof included', '💜 Made with care'].map((b) => (
              <span key={b} style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--lavender-dark)' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="section" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">The Process</span>
            <h2 id="process-heading" className="section-title">How Custom Orders Work</h2>
          </div>
          <div className="grid-4">
            {STEPS.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <div style={{ fontSize: '1.75rem', marginBottom: 'var(--space-3)' }}>{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Ideas */}
      <section style={{ background: 'var(--cream-dark)' }} className="section" aria-labelledby="ideas-heading">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-eyebrow">Inspiration</span>
          <h2 id="ideas-heading" className="section-title">Popular Custom Ideas</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center', marginTop: 'var(--space-6)' }}>
            {POPULAR_IDEAS.map((idea) => (
              <span
                key={idea}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.625rem 1.25rem',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {idea}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section" aria-labelledby="form-heading">
        <div className="container" style={{ maxWidth: 680 }}>
          {submitted ? (
            <div className="success-page">
              <div className="success-icon">🎉</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--ink)', marginBottom: 'var(--space-4)' }}>
                Request Received!
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '44ch', marginBottom: 'var(--space-8)' }}>
                Thank you so much! I'll review your request and get back to you within 24 hours. I'm so excited to create something special for you! 💜
              </p>
              <Link href="/shop" className="btn btn-primary">Browse the Shop</Link>
            </div>
          ) : (
            <>
              <div className="section-header">
                <span className="section-eyebrow">Let's Create Together</span>
                <h2 id="form-heading" className="section-title">Tell Me About Your Idea</h2>
                <p className="section-subtitle">Fill out the form below and I'll get back to you within 24 hours with next steps and pricing.</p>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
                aria-label="Custom order inquiry form"
              >
                <div className="grid-2">
                  <div className="form-group">
                    <label className="label" htmlFor="co-name">Your Name *</label>
                    <input id="co-name" type="text" className="input" required placeholder="Your name" value={form.name} onChange={update('name')} />
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="co-email">Email Address *</label>
                    <input id="co-email" type="email" className="input" required placeholder="your@email.com" value={form.email} onChange={update('email')} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="co-product">Product Type *</label>
                  <select id="co-product" className="input" required value={form.productType} onChange={update('productType')}>
                    <option value="">Select a product type</option>
                    <option>Bookmarks</option>
                    <option>Keychains</option>
                    <option>Stickers / Sticker Sheet</option>
                    <option>Coloring Pages</option>
                    <option>Gift Bundle / Box</option>
                    <option>Something else</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="co-description">Describe Your Idea *</label>
                  <textarea
                    id="co-description"
                    className="input"
                    required
                    placeholder="Tell me about your vision! What do you want it to look like? Any names, quotes, themes, or colors to include?"
                    value={form.description}
                    onChange={update('description')}
                    style={{ minHeight: 140 }}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="label" htmlFor="co-budget">Budget Range</label>
                    <select id="co-budget" className="input" value={form.budget} onChange={update('budget')}>
                      <option value="">Select a range</option>
                      <option>Under $20</option>
                      <option>$20 – $50</option>
                      <option>$50 – $100</option>
                      <option>$100 – $250</option>
                      <option>$250+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="co-timeline">When do you need it?</label>
                    <select id="co-timeline" className="input" value={form.timeline} onChange={update('timeline')}>
                      <option value="">Select a timeline</option>
                      <option>ASAP (rush order)</option>
                      <option>Within 2 weeks</option>
                      <option>Within a month</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="co-hear">How did you hear about us?</label>
                  <select id="co-hear" className="input" value={form.hearAbout} onChange={update('hearAbout')}>
                    <option value="">Select an option</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Pinterest</option>
                    <option>Word of mouth / friend</option>
                    <option>Google search</option>
                    <option>Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  id="submit-custom-order-btn"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  style={{ alignSelf: 'stretch', justifyContent: 'center' }}
                >
                  {loading ? <><span className="spinner" /> Sending…</> : 'Submit My Request ✨'}
                </button>

                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', textAlign: 'center' }}>
                  I read every message personally and respond within 24 hours. 💜
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
