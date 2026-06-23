import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

export const metadata = {
  title: {
    default: 'A Rae of Light — Handcrafted Art & Gifts',
    template: '%s | A Rae of Light',
  },
  description:
    'Beautiful handcrafted bookmarks, keychains, stickers, and coloring pages made by a young artist. Shop premium, personalized gifts for book lovers and creatives.',
  keywords: ['bookmarks', 'keychains', 'stickers', 'coloring pages', 'handmade', 'custom', 'gifts', 'art', 'boutique'],
  openGraph: {
    type: 'website',
    siteName: 'A Rae of Light',
    title: 'A Rae of Light — Handcrafted Art & Gifts',
    description: 'Beautiful handcrafted bookmarks, keychains, stickers, and coloring pages made by a young artist.',
    images: [{ url: '/images/hero.png', width: 1200, height: 630, alt: 'A Rae of Light products' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Rae of Light — Handcrafted Art & Gifts',
    description: 'Beautiful handcrafted bookmarks, keychains, stickers, and coloring pages.',
    images: ['/images/hero.png'],
  },
  metadataBase: new URL('https://araeoflight.vercel.app'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FDFAF6" />
      </head>
      <body>
        <CartProvider>
          <Nav />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
