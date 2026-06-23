# A Rae of Light — Ecommerce Website

A premium boutique ecommerce website for a young student entrepreneur selling artistic custom products.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Vanilla CSS (custom design system in `app/globals.css`)
- **State**: React Context + localStorage (cart)
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/                    # Next.js App Router pages
  layout.js             # Root layout (nav, footer, cart context)
  page.js               # Home page
  shop/page.js          # Shop page (all products + filters)
  shop/[slug]/page.js   # Product detail page
  custom-orders/page.js # Custom order inquiry form
  about/page.js         # Creator story page
  faq/page.js           # FAQ accordion
  contact/page.js       # Contact form
  cart/page.js          # Cart + checkout

components/             # Reusable React components
  Nav.js                # Sticky navigation with mobile menu
  Footer.js             # Site footer
  ProductCard.js        # Product grid card with quick-add
  CartDrawer.js         # Slide-in cart sidebar
  ReviewCard.js         # Customer review card
  NewsletterBanner.js   # Email signup section
  CustomizationForm.js  # Reusable product personalization form
  CollectionCard.js     # Category collection card

context/
  CartContext.js        # Cart state + localStorage persistence

data/
  products.js           # Product database (12 products, 5 categories)

lib/
  cart.js               # Pure cart logic functions
  checkout.js           # Checkout abstraction (Stripe/Shopify ready)
```

## Integrating Stripe or Shopify

See `lib/checkout.js` for full instructions. In short:

**Stripe:**
1. `npm install stripe @stripe/stripe-js`
2. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` to `.env.local`
3. Create `app/api/checkout/route.js`
4. Set `NEXT_PUBLIC_CHECKOUT_PROVIDER=stripe` in env

**Shopify:**
1. `npm install @shopify/buy-button-js`
2. Add `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
3. Set `NEXT_PUBLIC_CHECKOUT_PROVIDER=shopify` in env

## Deploying to Vercel

1. Push to GitHub
2. Import repo at vercel.com/new
3. Framework auto-detected as Next.js
4. Deploy!

## Replacing Placeholder Content

- **Creator image**: Replace `public/images/creator.png`
- **Product images**: Replace files in `public/images/`
- **Social links**: Update `components/Footer.js` href values
- **Email**: Search for `hello@araeoflight.com` and replace
- **Product data**: Edit `data/products.js`
