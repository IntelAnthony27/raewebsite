/**
 * A Rae of Light — Product Database
 *
 * This is the central product data store. It is intentionally structured to be
 * swapped for a CMS (Contentful, Sanity) or Shopify Storefront API response later.
 *
 * Each product follows the schema:
 *  id            string  — unique slug used in URLs
 *  name          string
 *  category      string  — 'bookmarks' | 'keychains' | 'stickers' | 'coloring-pages' | 'bundles'
 *  price         number  — in USD cents (e.g. 600 = $6.00)
 *  images        string[] — paths relative to /public
 *  shortDesc     string  — one-liner for cards
 *  description   string  — full description for product detail page
 *  tags          string[]
 *  bestseller    boolean
 *  customizable  boolean
 *  customOptions object  — available when customizable === true
 *  stock         number  — -1 = unlimited (digital), 0 = out of stock, N = quantity
 *  digital       boolean — true for coloring pages (downloadable)
 *  variants      object[] — optional size/style variants
 */

export const CATEGORIES = [
  { id: 'all',           label: 'All Products',    emoji: '✨' },
  { id: 'bookmarks',     label: 'Bookmarks',        emoji: '🔖' },
  { id: 'keychains',     label: 'Keychains',        emoji: '🗝️' },
  { id: 'stickers',      label: 'Stickers',          emoji: '⭐' },
  { id: 'coloring-pages',label: 'Coloring Pages',   emoji: '🎨' },
  { id: 'bundles',       label: 'Bundles',           emoji: '🎁' },
]

export const PRODUCTS = [
  // ─── BOOKMARKS ───────────────────────────────────────────────────────────
  {
    id: 'botanical-bloom-bookmark',
    name: 'Botanical Bloom Bookmark',
    category: 'bookmarks',
    price: 500,
    images: ['/images/bookmarks.png'],
    shortDesc: 'Hand-illustrated wildflower design with gold foil accents.',
    description:
      'A hand-illustrated bookmark featuring delicate wildflowers, soft watercolor washes, and a gold foil touch. Printed on premium 350gsm card stock with a matte finish. Perfect for book lovers who appreciate beautiful details.',
    tags: ['floral', 'gold', 'botanical'],
    bestseller: true,
    customizable: true,
    customOptions: {
      name: { label: 'Personalize with a name', type: 'text', maxLength: 20, placeholder: 'e.g. Emma' },
      color: {
        label: 'Accent color',
        type: 'swatch',
        options: [
          { id: 'lavender', label: 'Lavender', hex: '#C4B5D4' },
          { id: 'blush',    label: 'Blush',    hex: '#F2C4CE' },
          { id: 'sage',     label: 'Sage',     hex: '#B5C9B5' },
          { id: 'gold',     label: 'Gold',     hex: '#D4A96A' },
        ],
      },
    },
    stock: 50,
    digital: false,
  },
  {
    id: 'celestial-night-bookmark',
    name: 'Celestial Night Bookmark',
    category: 'bookmarks',
    price: 500,
    images: ['/images/bookmarks.png'],
    shortDesc: 'Stars, moons & galaxies — for dreamers and night owls.',
    description:
      'A dreamy celestial-themed bookmark featuring moons, stars, and soft galaxy watercolor swirls. Printed on thick card stock with a UV gloss spot finish on the star elements.',
    tags: ['celestial', 'stars', 'galaxy'],
    bestseller: false,
    customizable: true,
    customOptions: {
      name: { label: 'Add your name', type: 'text', maxLength: 20, placeholder: 'e.g. Ava' },
    },
    stock: 30,
    digital: false,
  },
  {
    id: 'rainbow-days-bookmark',
    name: 'Rainbow Days Bookmark',
    category: 'bookmarks',
    price: 450,
    images: ['/images/bookmarks.png'],
    shortDesc: 'Bright arching rainbow with tiny cloud and star details.',
    description:
      'A cheerful rainbow bookmark with soft pastel arches, fluffy clouds, and golden star accents. A wonderful gift for any young reader.',
    tags: ['rainbow', 'cheerful', 'gift'],
    bestseller: false,
    customizable: false,
    stock: 75,
    digital: false,
  },

  // ─── KEYCHAINS ────────────────────────────────────────────────────────────
  {
    id: 'mushroom-magic-keychain',
    name: 'Mushroom Magic Keychain',
    category: 'keychains',
    price: 800,
    images: ['/images/keychains.png'],
    shortDesc: 'Adorable double-sided acrylic mushroom with glitter core.',
    description:
      'A double-sided clear acrylic keychain featuring a hand-illustrated mushroom design with a sparkle glitter fill. Comes with a silver split ring and matching tassel. Approximately 2" tall.',
    tags: ['mushroom', 'glitter', 'cute'],
    bestseller: true,
    customizable: false,
    stock: 40,
    digital: false,
  },
  {
    id: 'moon-phase-keychain',
    name: 'Moon Phase Keychain',
    category: 'keychains',
    price: 850,
    images: ['/images/keychains.png'],
    shortDesc: 'Full moon cycle illustrated on frosted acrylic.',
    description:
      'A beautiful frosted acrylic keychain showing the eight phases of the moon in soft lavender ink. Elegant and minimalist — great for backpacks, keys, or as a gift.',
    tags: ['moon', 'celestial', 'frosted'],
    bestseller: false,
    customizable: true,
    customOptions: {
      name: { label: 'Add initials (up to 3 letters)', type: 'text', maxLength: 3, placeholder: 'e.g. RAE' },
    },
    stock: 25,
    digital: false,
  },
  {
    id: 'sunflower-smile-keychain',
    name: 'Sunflower Smile Keychain',
    category: 'keychains',
    price: 800,
    images: ['/images/keychains.png'],
    shortDesc: 'Sunny yellow sunflower with a hand-drawn happy face.',
    description:
      'Bring a little sunshine wherever you go! This acrylic keychain features a bright sunflower with a charming illustrated face, on a gold-tone chain. Double-sided print.',
    tags: ['sunflower', 'happy', 'yellow'],
    bestseller: true,
    customizable: false,
    stock: 60,
    digital: false,
  },

  // ─── STICKERS ─────────────────────────────────────────────────────────────
  {
    id: 'botanical-garden-sticker-sheet',
    name: 'Botanical Garden Sticker Sheet',
    category: 'stickers',
    price: 400,
    images: ['/images/stickers.png'],
    shortDesc: '15 die-cut botanical stickers on a single sheet.',
    description:
      'A gorgeous sticker sheet with 15 individual die-cut botanical illustrations — ferns, wildflowers, leaves, and berries. Printed on premium vinyl with a matte laminate for durability. Weatherproof and waterproof.',
    tags: ['botanical', 'vinyl', 'sheet'],
    bestseller: true,
    customizable: false,
    stock: 100,
    digital: false,
  },
  {
    id: 'celestial-dreams-sticker-pack',
    name: 'Celestial Dreams Sticker Pack',
    category: 'stickers',
    price: 450,
    images: ['/images/stickers.png'],
    shortDesc: '12 holographic celestial stickers — stars, moons & more.',
    description:
      'A pack of 12 holographic vinyl stickers featuring moons, stars, planets, comets, and constellations. The holographic finish catches the light beautifully. Great for water bottles, laptops, and journals.',
    tags: ['holographic', 'celestial', 'vinyl'],
    bestseller: false,
    customizable: false,
    stock: 80,
    digital: false,
  },

  // ─── COLORING PAGES ───────────────────────────────────────────────────────
  {
    id: 'enchanted-garden-coloring-page',
    name: 'Enchanted Garden Coloring Page',
    category: 'coloring-pages',
    price: 200,
    images: ['/images/coloring-pages.png'],
    shortDesc: 'Intricate garden scene — instant digital download.',
    description:
      'An intricately illustrated garden scene with flowers, butterflies, hidden mushrooms, and a friendly fox. This is an instant digital download — you will receive a high-resolution PDF (A4 + US Letter) ready to print at home.',
    tags: ['digital', 'printable', 'garden'],
    bestseller: false,
    customizable: false,
    stock: -1,
    digital: true,
  },
  {
    id: 'under-the-sea-coloring-page',
    name: 'Under the Sea Coloring Page',
    category: 'coloring-pages',
    price: 200,
    images: ['/images/coloring-pages.png'],
    shortDesc: 'Ocean adventure scene — instant digital download.',
    description:
      'Dive into an underwater world of coral, fish, jellyfish, and a friendly octopus! Intricate enough to be engaging, but approachable for younger artists. Instant PDF download, print as many times as you like.',
    tags: ['digital', 'printable', 'ocean'],
    bestseller: true,
    customizable: false,
    stock: -1,
    digital: true,
  },

  // ─── BUNDLES ──────────────────────────────────────────────────────────────
  {
    id: 'starter-bundle',
    name: 'The Starter Bundle',
    category: 'bundles',
    price: 1800,
    images: ['/images/bookmarks.png'],
    shortDesc: '3 bookmarks + 1 sticker sheet — save 15%.',
    description:
      'The perfect introduction to A Rae of Light! This bundle includes 3 Botanical Bloom Bookmarks and 1 Botanical Garden Sticker Sheet, beautifully packaged with tissue paper and a handwritten note. Save 15% vs. buying separately.',
    tags: ['bundle', 'gift', 'value'],
    bestseller: false,
    customizable: false,
    stock: 20,
    digital: false,
  },
  {
    id: 'ultimate-gift-box',
    name: 'The Ultimate Gift Box',
    category: 'bundles',
    price: 2800,
    images: ['/images/keychains.png'],
    shortDesc: 'The full Rae experience — bookmark, keychain, stickers & more.',
    description:
      'Give someone the full A Rae of Light experience! This curated gift box includes 2 bookmarks, 1 keychain, 1 sticker sheet, and 2 coloring page downloads — all beautifully packaged in a branded gift box with a ribbon and handwritten card.',
    tags: ['bundle', 'gift', 'premium', 'birthday'],
    bestseller: true,
    customizable: true,
    customOptions: {
      giftMessage: { label: 'Personalized gift message', type: 'textarea', maxLength: 120, placeholder: 'Write your heartfelt message here...' },
    },
    stock: 15,
    digital: false,
  },
]

// ─── Helper Functions ────────────────────────────────────────────────────────

/** Get all products */
export function getAllProducts() {
  return PRODUCTS
}

/** Get product by slug/id */
export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null
}

/** Get products by category */
export function getProductsByCategory(category) {
  if (category === 'all') return PRODUCTS
  return PRODUCTS.filter((p) => p.category === category)
}

/** Get bestsellers */
export function getBestsellers() {
  return PRODUCTS.filter((p) => p.bestseller)
}

/** Format price in cents to display string */
export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`
}

/** Get related products (same category, different item) */
export function getRelatedProducts(product, limit = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit)
}
