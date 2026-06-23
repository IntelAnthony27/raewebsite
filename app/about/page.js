import Image from 'next/image'
import Link from 'next/link'
import NewsletterBanner from '@/components/NewsletterBanner'

export const metadata = {
  title: 'About the Creator',
  description: 'Meet Rae — the young artist and entrepreneur behind A Rae of Light. Learn about her story, her inspiration, and her mission to spread creativity.',
}

const TIMELINE = [
  { year: 'Age 6', emoji: '🖍️', event: 'Started drawing and doodling everything in sight — notebooks, margins, even paper bags.' },
  { year: 'Age 9', emoji: '🎨', event: 'Discovered watercolor painting and fell completely in love with botanicals and florals.' },
  { year: 'Age 11', emoji: '🔖', event: 'Made a set of bookmarks for friends as birthday gifts. They went absolutely wild for them.' },
  { year: 'Age 12', emoji: '💡', event: 'Had the idea: "What if I sold these?" Started planning A Rae of Light as a real business.' },
  { year: 'Today', emoji: '✨', event: 'Running a boutique creative shop while going to school — learning something new every single day.' },
]

const VALUES = [
  { icon: '🎨', title: 'Art is for Everyone', desc: 'Beautiful things shouldn\'t just be for adults. Every child deserves access to art that feels special and premium.' },
  { icon: '🌱', title: 'Quality Over Quantity', desc: 'I\'d rather make 10 perfect things than 100 mediocre ones. Every detail matters to me.' },
  { icon: '💜', title: 'Small Business, Big Heart', desc: 'Being young doesn\'t mean thinking small. I treat every customer\'s order as if it were for someone I love.' },
]

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section
        className="about-hero"
        style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}
        aria-labelledby="about-heading"
      >
        <div className="container" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          {/* Creator image */}
          <div className="creator-image-wrapper" style={{ width: 220, height: 220 }}>
            <Image
              src="/images/creator.png"
              alt="Rae — creator of A Rae of Light"
              width={220}
              height={220}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <span className="section-eyebrow">The Story Behind the Shop</span>
          <h1 id="about-heading" className="section-title" style={{ marginBottom: 'var(--space-5)' }}>
            Hi, I'm Rae 👋<br />
            <em className="text-gradient">A young artist with a big dream.</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 'var(--text-md)', maxWidth: '52ch', margin: '0 auto' }}>
            I started A Rae of Light because I believe that handmade art can make everyday moments feel magical. I'm a student, a creator, and a small business owner — all at the same time!
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          <span className="section-eyebrow">My Story</span>
          <h2 id="story-heading" className="section-title">Where it all began</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 'var(--text-md)' }}>
            <p>
              I've been drawing for as long as I can remember. When I was six, I would fill entire notebooks with doodles — flowers, animals, tiny worlds. My parents had to buy me sketchbooks in bulk!
            </p>
            <p>
              It wasn't until my friend's birthday that I had my "lightbulb moment." I made her a set of hand-illustrated bookmarks, and when she opened them, her face completely lit up. That feeling — watching someone love something I made — was everything.
            </p>
            <p>
              I started A Rae of Light because I wanted more of that feeling. And I wanted to prove that you don't have to be a grown-up to build something real. Every product I sell is something I'd want to own myself, designed with the same care I'd put into a gift for my best friend.
            </p>
            <p>
              Running a small business while going to school is a lot — but I wouldn't trade it for anything. I'm learning business, design, customer service, and packaging all at once. And I get to do it through art. How amazing is that?
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="section"
        style={{ background: 'linear-gradient(160deg, var(--lavender-light) 0%, var(--cream) 100%)' }}
        aria-labelledby="timeline-heading"
      >
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="section-header">
            <span className="section-eyebrow">The Journey</span>
            <h2 id="timeline-heading" className="section-title">My Creative Timeline</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px auto',
                  gap: 'var(--space-6)',
                  alignItems: 'start',
                  padding: 'var(--space-5) 0',
                  borderBottom: i < TIMELINE.length - 1 ? '1px solid var(--cream-dark)' : 'none',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: 'var(--space-1)' }}>{item.emoji}</div>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--lavender-dark)', fontFamily: 'var(--font-display)' }}>
                    {item.year}
                  </p>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, paddingTop: 'var(--space-2)' }}>
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">What I Stand For</span>
            <h2 id="values-heading" className="section-title">My Values</h2>
          </div>

          <div className="values-grid">
            {VALUES.map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--ink)', marginBottom: 'var(--space-3)' }}>
                  {v.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: 'var(--text-sm)' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--cream-dark)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 'var(--space-4)' }}>
            Ready to find something beautiful?
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '40ch', margin: '0 auto var(--space-8)' }}>
            Every purchase supports a young artist and her dream. Thank you for being here. 💜
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" className="btn btn-primary btn-lg" id="about-shop-btn">Shop the Collection</Link>
            <Link href="/custom-orders" className="btn btn-outline btn-lg" id="about-custom-btn">Request a Custom Order</Link>
          </div>
        </div>
      </section>

      <NewsletterBanner />
    </div>
  )
}
