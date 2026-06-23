'use client'

import { useState } from 'react'

const CONTACT_METHODS = [
  { icon: '✉️', label: 'Email', value: 'hello@araeoflight.com', href: 'mailto:hello@araeoflight.com' },
  { icon: '📸', label: 'Instagram', value: '@araeoflight', href: '#' },
  { icon: '🎵', label: 'TikTok', value: '@araeoflight', href: '#' },
  { icon: '⏰', label: 'Response Time', value: 'Within 24 hours', href: null },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: connect to email API / Resend / SendGrid
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-eyebrow">Say Hello</span>
          <h1 className="section-title">Get in Touch</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '44ch', margin: '0 auto' }}>
            I love hearing from customers, collaborators, and curious people alike. Drop me a message and I'll be back in touch within 24 hours!
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Left — Contact Info */}
            <div>
              <span className="section-eyebrow">Contact Details</span>
              <h2 className="section-title" style={{ marginBottom: 'var(--space-6)' }}>
                Let's connect
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
                Whether you have a question about an order, want to collaborate, or just want to say hi — my inbox is always open. I read and respond to every single message myself. 💜
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
                {CONTACT_METHODS.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      padding: 'var(--space-4) var(--space-5)',
                      background: 'var(--white)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{m.icon}</span>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 2 }}>
                        {m.label}
                      </p>
                      {m.href ? (
                        <a href={m.href} style={{ fontWeight: 500, color: 'var(--ink)', fontSize: 'var(--text-sm)' }}>
                          {m.value}
                        </a>
                      ) : (
                        <p style={{ fontWeight: 500, color: 'var(--ink)', fontSize: 'var(--text-sm)' }}>{m.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ reminder */}
              <div
                style={{
                  background: 'linear-gradient(135deg, var(--lavender-light) 0%, var(--blush-light) 100%)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', color: 'var(--ink)', marginBottom: 'var(--space-2)' }}>
                  💡 Quick tip
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                  Many common questions are answered in our FAQ! Check there first — you might get an instant answer.
                </p>
                <a href="/faq" className="btn btn-outline btn-sm" id="contact-faq-link">
                  Browse the FAQ
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="success-page" style={{ minHeight: 'unset', padding: 'var(--space-16) var(--space-8)' }}>
                  <div className="success-icon">💌</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--ink)', marginBottom: 'var(--space-4)' }}>
                    Message received!
                  </h2>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '36ch', marginBottom: 'var(--space-8)' }}>
                    Thank you for reaching out! I'll get back to you within 24 hours. Have a beautiful day! ☀️
                  </p>
                  <button
                    className="btn btn-outline"
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    background: 'var(--white)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-10)',
                    boxShadow: 'var(--shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-5)',
                  }}
                  aria-label="Contact form"
                >
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--ink)', marginBottom: 'var(--space-1)' }}>
                      Send a message
                    </h2>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>I'd love to hear from you!</p>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="label" htmlFor="contact-name">Your Name *</label>
                      <input id="contact-name" type="text" className="input" required placeholder="Your name" value={form.name} onChange={update('name')} />
                    </div>
                    <div className="form-group">
                      <label className="label" htmlFor="contact-email">Email Address *</label>
                      <input id="contact-email" type="email" className="input" required placeholder="your@email.com" value={form.email} onChange={update('email')} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="label" htmlFor="contact-subject">Subject *</label>
                    <select id="contact-subject" className="input" required value={form.subject} onChange={update('subject')}>
                      <option value="">What's this about?</option>
                      <option>Order question</option>
                      <option>Custom order inquiry</option>
                      <option>Collaboration / Partnership</option>
                      <option>Press or media inquiry</option>
                      <option>General feedback</option>
                      <option>Something else</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="label" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      className="input"
                      required
                      placeholder="Hi Rae! I wanted to reach out because…"
                      value={form.message}
                      onChange={update('message')}
                      style={{ minHeight: 160 }}
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                    style={{ justifyContent: 'center' }}
                  >
                    {loading ? <><span className="spinner" /> Sending…</> : 'Send Message 💌'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
