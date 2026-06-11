# LUMIÈRE — Luxury Perfumery Website

A visually stunning, animated luxury perfume store website built with vanilla HTML, CSS, and JavaScript — featuring AI-generated product photography and cinematic animations.

## ✅ Completed Features

- **Animated Preloader** — Branded loading screen with progress bar and fade-out
- **Custom Cursor** — Gold dot + ring follower cursor with hover scaling effects
- **Hero Section** — Full-screen cinematic hero with slow zoom animation, floating gold particles, and scroll indicator
- **Animated Marquee Band** — Infinite scrolling product name ticker
- **Fragrance Categories** — 4 scent family cards with icon flip and gold underline animations
- **Product Collection Grid** — 6 AI-generated perfume products with:
  - Image hover zoom effect
  - Quick View overlay button
  - Animated product filter tabs (All / Woody / Floral / Fresh)
  - Add to Cart with button confirmation animation
  - Product badges (Bestseller, New, Limited)
- **About / Our Story Section** — Split-layout with parallax image, accent border, and floating stat card
- **Stats Counter Band** — Animated count-up numbers (120 fragrances, 50k+ customers, 25 years, 40 countries)
- **Testimonials Slider** — Auto-playing testimonial carousel with dot navigation
- **Newsletter Section** — Email subscription form with watermark background text
- **Contact Section** — Contact info + message form with social links
- **Shopping Cart Drawer** — Slide-in cart panel with:
  - Add/remove items
  - Persistent cart via localStorage
  - Live total calculation
  - Cart count badge animation
- **Quick View Modal** — Product detail popup with add-to-cart
- **Toast Notifications** — Bottom-center feedback messages
- **Scroll Reveal Animations** — Intersection Observer-driven fade-up, fade-left, fade-right animations
- **Parallax Hero Image** — Subtle scroll parallax on hero background
- **Mobile Responsive** — Hamburger menu, stacked layouts for all screen sizes
- **Keyboard Accessibility** — ESC key closes modals and cart

## 🗂️ File Structure

```
index.html              Main page
css/
  style.css             All styles, animations, responsive
js/
  main.js               All interactivity and logic
images/                 (Directory for local assets if needed)
README.md
```

## 🎨 Design System

- **Colors**: Deep dark backgrounds (`#0d0b08`), warm gold (`#c9a96e`), cream text (`#f7f3ed`)
- **Fonts**: Cormorant Garamond (serif headings), Jost (sans-serif body)
- **Animations**: CSS keyframes, cubic-bezier easing, IntersectionObserver reveals
- **Images**: AI-generated via Flux 2 Pro

## 🚀 Products

| Name            | Family          | Price |
|-----------------|-----------------|-------|
| Velvet Noir     | Woody · Oriental | $189  |
| Rose Divine     | Floral · Romantic | $210 |
| Ocean Mist      | Fresh · Aquatic  | $165  |
| Golden Oud      | Woody · Spicy    | $340  |
| Midnight Bloom  | Floral · Nocturnal | $225 |
| Cedar Sage      | Fresh · Earthy   | $178  |

## 📋 Not Yet Implemented

- Real checkout / payment processing (requires backend)
- User accounts and order history
- Product search functionality
- Wishlist feature
- Product detail pages (individual routes)
- Reviews submission

## 🔧 Recommended Next Steps

1. Add your store's real name and branding
2. Connect to a payment provider (Stripe, PayPal)
3. Add more products and categories
4. Implement a real email service for the newsletter
5. Add a product search bar
6. Create individual product detail pages
