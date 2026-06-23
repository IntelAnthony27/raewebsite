import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import ReviewCard from '@/components/ReviewCard'
import NewsletterBanner from '@/components/NewsletterBanner'
import CollectionCard from '@/components/CollectionCard'
import { getBestsellers, CATEGORIES } from '@/data/products'

export const metadata = {
  title: 'A Rae of Light — Handcrafted Art & Gifts',
  description:
    'Beautiful handcrafted bookmarks, keychains, stickers, and coloring pages made by a young artist. Shop premium, personalized gifts for book lovers and creatives.',
}

const REVIEWS = [
  {
    name: 'Sophia M.',
    initials: 'SM',
    rating: 5,
    text: 'My daughter LOVES her personalized bookmark. The quality is incredible — it feels so premium for the price. We\'ll definitely be ordering more!',
    product: 'Botanical Bloom Bookmark',
    date: 'June 2025',
    location: 'New York',
  },
  {
    name: 'Emma K.',
    initials: 'EK',
    rating: 5,
    text: 'The mushroom keychain is absolutely adorable. It arrived beautifully packaged with a little handwritten note. Felt like opening a gift!',
    product: 'Mushroom Magic Keychain',
    date: 'May 2025',
    location: 'California',
  },
  {
    name: 'Lily T.',
    initials: 'LT',
    rating: 5,
    text: 'I ordered the sticker sheets for my class and my students went crazy for them! Such beautiful artwork. You can really tell how much love went into these.',
    product: 'Botanical Garden Sticker Sheet',
    date: 'April 2025',
    location: 'Texas',
  },
  {
    name: 'Anna P.',
    initials: 'AP',
    rating: 5,
    text: 'Bought the Ultimate Gift Box for my niece\'s birthday and she hasn\'t stopped talking about it. The packaging alone is worth it!',
    product: 'The Ultimate Gift Box',
    date: 'June 2025',
    location: 'Florida',
  },
]

const SHOP_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'all')

export default function HomePage() {
  const bestsellers = getBestsellers().slice(0, 4)

  return (
    <div className="page-enter">
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-heading">
        {/* Background orbs */}
        <div
          className="hero-bg-orb"
          style={{ width: 600, height: 600, top: '-100px', right: '-150px', background: 'var(--lavender)' }}
          aria-hidden="true"
        />
        <div
          className="hero-bg-orb"
          style={{ width: 400, height: 400, bottom: '-50px', left: '-100px', background: 'var(--blush)' }}
          aria-hidden="true"
        />

        <div style={{ width: '100%' }}>
          <div className="hero-content">
            {/* Eyebrow */}
            <div className="hero-eyebrow animate-fade-in">
              ✨ Handcrafted with heart · by a young creator
            </div>

            {/* Headline */}
            <h1 id="hero-heading" className="hero-title animate-fade-up delay-100">
              Art that{' '}
              <em className="text-gradient" style={{ fontStyle: 'italic' }}>
                brightens
              </em>{' '}
              your world
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle animate-fade-up delay-200">
              Bookmarks, keychains, stickers, and coloring pages — each one designed with love and made for the moments that matter most.
            </p>

            {/* CTA */}
            <div className="hero-actions animate-fade-up delay-300">
              <Link href="/shop" className="btn btn-primary btn-lg" id="hero-shop-btn">
                Shop the Collection
              </Link>
              <Link href="/custom-orders" className="btn btn-outline btn-lg" id="hero-custom-btn">
                Custom Orders ✏️
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div
            className="hero-image-strip animate-fade-up delay-400"
            style={{ maxWidth: 900, margin: 'var(--space-12) auto 0', position: 'relative' }}
          >
            <Image
              src="/images/hero.png"
              alt="A Rae of Light product flatlay — bookmarks, keychains, stickers and coloring pages on a cream background"
              width={900}
              height={506}
              priority
              style={{ borderRadius: 'var(--radius-xl)', width: '100%', height: 'auto' }}
            />

            {/* Trust badges */}
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-5)',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 'var(--space-3)',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {['🚚 Free shipping over $35', '💜 Handmade with love', '⭐ 5-star reviews'].map((badge) => (
                <span
                  key={badge}
                  style={{
                    background: 'rgba(253,250,246,0.92)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.4rem 1rem',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED COLLECTIONS ─────────────────────────────────────── */}
      <section className="section" aria-labelledby="collections-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Explore</span>
            <h2 id="collections-heading" className="section-title">Shop by Collection</h2>
            <p className="section-subtitle">
              Each category is thoughtfully designed — from whimsical to elegant — because every book reader and creative deserves something special.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {SHOP_CATEGORIES.map((cat) => (
              <CollectionCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--cream-dark)' }} aria-labelledby="bestsellers-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Customer Favorites</span>
            <h2 id="bestsellers-heading" className="section-title">Best Sellers</h2>
            <p className="section-subtitle">
              These are the pieces that keep flying off the shelves. Loved by readers, gifters, and collectors alike.
            </p>
          </div>

          <div className="grid-4">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link href="/shop" className="btn btn-outline btn-lg" id="view-all-btn">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CREATOR STORY ────────────────────────────────────────────── */}
      <section
        className="section"
        aria-labelledby="creator-heading"
        style={{
          background: 'linear-gradient(160deg, var(--lavender-light) 0%, var(--blush-light) 100%)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-16)',
              alignItems: 'center',
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative' }}>
              <div className="creator-image-wrapper" style={{ width: 320, height: 320, margin: '0 auto' }}>
                <Image
                  src="/images/creator.png"
                  alt="Rae — the creator behind A Rae of Light"
                  width={320}
                  height={320}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Floating accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'var(--white)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4) var(--space-5)',
                  boxShadow: 'var(--shadow-md)',
                  textAlign: 'center',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  animation: 'float 3s ease-in-out infinite',
                }}
                aria-hidden="true"
              >
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🎨</div>
                Making art<br />since age 6
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="section-eyebrow">Meet the Creator</span>
              <h2 id="creator-heading" className="section-title">
                Hi, I'm Rae 👋
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 'var(--space-4)', fontSize: 'var(--text-md)' }}>
                I started A Rae of Light because I believe that beautiful, handmade things shouldn't just be for grown-ups. I'm a student, an artist, and a small business owner — all at once!
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
                Every product I design is something I'd want to own myself. I pour hours into each illustration, picking just the right colors, making sure every detail is perfect — because you deserve nothing less.
              </p>
              <Link href="/about" className="btn btn-primary" id="meet-rae-btn">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CUSTOM ORDERS CTA ────────────────────────────────────────── */}
      <section className="section" aria-labelledby="custom-heading">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-eyebrow">Something Unique</span>
          <h2 id="custom-heading" className="section-title">
            Can't find exactly what you need?
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-8)' }}>
            I love bringing custom ideas to life! Whether it's a personalized gift, a special design, or a bulk order for an event — let's create something magical together.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-12)' }}>
            {['🎂 Birthday Gifts', '🎓 Graduation Surprises', '📚 Book Club Sets', '🎁 Party Favors'].map((item) => (
              <span key={item} className="tag active" style={{ cursor: 'default', fontSize: 'var(--text-sm)' }}>
                {item}
              </span>
            ))}
          </div>

          <Link href="/custom-orders" className="btn btn-accent btn-lg" id="custom-orders-cta-btn">
            Request a Custom Order ✏️
          </Link>
        </div>
      </section>

      {/* ─── REVIEWS ──────────────────────────────────────────────────── */}
      <section
        className="section"
        style={{ background: 'var(--cream-dark)' }}
        aria-labelledby="reviews-heading"
      >
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Happy Customers</span>
            <h2 id="reviews-heading" className="section-title">
              What people are saying ⭐
            </h2>
          </div>

          <div className="grid-4">
            {REVIEWS.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────────────── */}
      <NewsletterBanner />
    </div>
  )
}
