# ShoeCommerce

A modern, responsive shoe e-commerce frontend built with React + Vite.

This project includes a themed home carousel, interactive catalog with search and filters, product detail pages, cart management, and a multi-method payment flow.

## Live Demo

Add your deployed URL here:

- https://your-demo-link-here

## Tech Stack

- React 19
- React Router
- Vite
- React Icons
- QRCode React
- CSS (custom, responsive, animated UI)

## Core Features

- Dynamic home carousel with category-based gradients and featured products
- Product catalog with:
	- Search
	- Type/category filtering
	- Price and rating sorting
	- Active filter chips with one-click removal
	- Sticky control toolbar on scroll
- Product details page with add-to-cart and buy-now flow
- Cart page with:
	- Quantity controls
	- Order summary
	- Recommendations
	- Payment guard (cannot proceed when cart is empty)
- Payment gateway with UPI/QR, card, and COD options
- Not Found page (404)

## UI/UX Highlights

- Mobile-responsive layout across all pages
- Custom hover animations and visual highlights for catalog cards
- Consistent focus styling for input controls
- Lightweight animated ambient background layer across pages
- Lazy-loaded routes for faster initial load

## Performance Notes

Recent improvements include:

- Route-based lazy loading for non-home pages
- Removed heavy canvas-based background and replaced with lightweight CSS ambient layer
- Removed unused GSAP dependency
- Image lazy loading in product cards

## Project Structure

```text
src/
	assets/
		Card.jsx
		Nav.jsx
	pages/
		Home.jsx
		Catalog.jsx
		ProductDetails.jsx
		Cart.jsx
		PaymentGateway.jsx
		NotFound.jsx
	styles/
		styles.css
	utils/
		CartContext.jsx
		categoryTheme.js
data.js
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Available Scripts

- npm run dev: Start local dev server
- npm run build: Build production assets
- npm run preview: Preview production build
- npm run lint: Run ESLint
- npm run deploy: Deploy dist using gh-pages

## Deployment

This project is configured for GitHub Pages.

1. Update base path in [vite.config.js](vite.config.js) if your repo name changes.
2. Run:

```bash
npm run deploy
```

## Future Enhancements

- Wishlist and favorites
- Backend/API integration for real products and orders
- Authentication and user profile
- Coupon/discount engine
- Inventory and stock status

## Author

Built by Shivam.

If you like this project, consider starring the repo.