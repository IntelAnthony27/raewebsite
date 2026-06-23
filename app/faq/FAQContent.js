'use client'

import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  {
    category: 'Orders & Products',
    items: [
      {
        q: 'How long does it take to process my order?',
        a: 'Most orders are processed within 1–3 business days. Custom and personalized orders may take up to 5–7 business days before shipping. You\'ll receive an email confirmation when your order ships!',
      },
      {
        q: 'Are your products handmade?',
        a: 'Every design is hand-illustrated by me! Physical products like bookmarks and keychains are printed on premium materials using professional printing services, then quality-checked and packaged by hand here at my home studio.',
      },
      {
        q: 'What materials do you use?',
        a: 'Bookmarks are printed on 350gsm card stock with matte or gloss laminate. Keychains are made from 3mm clear or frosted acrylic. Stickers are printed on premium vinyl with matte laminate — waterproof and weatherproof. Coloring pages are high-resolution PDF files for home printing.',
      },
      {
        q: 'Can I see a preview before my order ships?',
        a: 'For custom orders, absolutely — I always send a digital proof before going to print. For standard shop items, the images you see online are accurate representations of the finished product.',
      },
    ],
  },
  {
    category: 'Personalization & Custom Orders',
    items: [
      {
        q: 'How do I place a custom order?',
        a: 'Head to the Custom Orders page and fill out the inquiry form. Tell me about your idea — the product type, any names or text to include, your color preferences, and your timeline. I\'ll get back to you within 24 hours!',
      },
      {
        q: 'What\'s the minimum quantity for custom orders?',
        a: 'There\'s no minimum for personalized versions of existing products (like adding a name to a bookmark). For fully custom designs, I typically require a minimum of 10 units. Contact me if you need something smaller — I\'ll always try to help!',
      },
      {
        q: 'How long does a custom order take?',
        a: 'Custom orders typically take 7–14 business days from approval to shipping. Rush orders may be possible for an additional fee — just mention your deadline in the inquiry form.',
      },
      {
        q: 'Can I customize any product from the shop?',
        a: 'Products marked with the "Customizable" badge can be personalized on the product page itself. For deeper customization (different designs, bulk orders, event themes), please submit a custom order inquiry.',
      },
    ],
  },
  {
    category: 'Shipping & Returns',
    items: [
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! All domestic US orders over $35 ship for free. Orders under $35 have a flat $4.95 shipping fee. Digital products (coloring pages) are instant downloads — no shipping required!',
      },
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping typically takes 3–7 business days within the US. I\'ll email you a tracking number once your order ships. International shipping is available — please contact me for rates.',
      },
      {
        q: 'What is your return policy?',
        a: 'I want you to love your order! If something arrives damaged or isn\'t right, contact me within 30 days and I\'ll make it right — either a replacement or a full refund. Because all products are made to order, I can\'t accept returns for change of mind on personalized items, but I\'ll always work with you to find a solution.',
      },
      {
        q: 'My order arrived damaged. What should I do?',
        a: 'I\'m so sorry! Please email me at hello@araeoflight.com with your order number and a photo of the damage within 7 days of delivery. I\'ll send a replacement right away.',
      },
    ],
  },
  {
    category: 'Digital Downloads',
    items: [
      {
        q: 'How do digital coloring pages work?',
        a: 'After purchase, you\'ll receive an email with a download link. Click to download your high-resolution PDF (includes both A4 and US Letter sizes). You can print it as many times as you like at home or at a print shop!',
      },
      {
        q: 'What paper should I print coloring pages on?',
        a: 'For the best results, use white cardstock (90–110gsm) or heavy copy paper. Avoid super thin paper as markers can bleed through. Cardstock holds up great for colored pencils, markers, and even watercolors!',
      },
    ],
  },
]

function FAQSection({ category, items }) {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div style={{ marginBottom: 'var(--space-10)' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--ink)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-3)', borderBottom: '2px solid var(--lavender-light)' }}>
        {category}
      </h2>
      {items.map((item, i) => (
        <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
          <button
            id={`faq-${category.replace(/\s+/g, '-').toLowerCase()}-${i}`}
            className="faq-question"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            {item.q}
            <span className="faq-icon" aria-hidden="true">+</span>
          </button>
          <div className="faq-answer" aria-hidden={openIndex !== i}>
            <p className="faq-answer-inner">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FAQContent() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-eyebrow">Got Questions?</span>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '48ch', margin: '0 auto' }}>
            Everything you need to know about orders, products, customization, and shipping. Can't find your answer?{' '}
            <Link href="/contact" style={{ color: 'var(--lavender-dark)', fontWeight: 500 }}>Just ask!</Link>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          {FAQS.map((section) => (
            <FAQSection key={section.category} {...section} />
          ))}

          {/* Contact CTA */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--lavender-light) 0%, var(--blush-light) 100%)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-10)',
              textAlign: 'center',
              marginTop: 'var(--space-10)',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>💌</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--ink)', marginBottom: 'var(--space-3)' }}>
              Still have questions?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
              I read every message personally and respond within 24 hours!
            </p>
            <Link href="/contact" className="btn btn-primary" id="faq-contact-btn">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
