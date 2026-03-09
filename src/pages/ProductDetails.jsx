import { Link, useParams, useNavigate } from 'react-router-dom';
import { PiArrowLeft, PiShoppingBag, PiCreditCard, PiStar, PiStarFill } from 'react-icons/pi';
import Nav from '../assets/Nav.jsx';
import DotGrid from '../assets/DotGrid.jsx';
import { products } from '../../data.js';
import { getCategoryTheme, themeToCssVars } from '../utils/categoryTheme.js';
import { useCart } from '../utils/CartContext.jsx';

function formatRupees(amount) {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount}`;
  }
}

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => String(p.id) === String(productId));

  if (!product) {
    return (
      <>
        <Nav className="navbar-overlay" />
        <div className="product-details-page">
          <div className="product-details-shell">
          <div className="product-details-card">
            <h1 className="product-title">Product not found</h1>
            <p className="product-subtitle">We couldn’t find that product.</p>
            <Link className="product-link" to="/catalog">
              <PiArrowLeft size={16} /> Back to catalog
            </Link>
          </div>
          </div>
        </div>
      </>
    );
  }

  const theme = getCategoryTheme(product.category);
  const themeVars = themeToCssVars(theme);
  const navThemeStyle = {
    ...themeVars,
    fontFamily: 'var(--cat-font-family)',
    '--nav-bg': 'var(--cat-primary)',
    '--nav-border': 'rgba(255,255,255,0.16)',
    '--nav-link': '#ffffff',
    '--nav-link-muted': 'rgba(255,255,255,0.85)',
  };

  const discountedPrice =
    typeof product.discount === 'number'
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  return (
    <>
      <Nav className="navbar-overlay" themeStyle={navThemeStyle} />
      <div className="product-details-page" style={{ ...themeVars, fontFamily: 'var(--cat-font-family)' }}>
        <DotGrid
          dotSize={5}
          gap={13}
          baseColor="#121212"
          activeColor="#939296"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
        <div
          className="product-details-shell"
          style={{
            background: `linear-gradient(135deg, var(--cat-primary) 0%, var(--cat-secondary) 100%)`,
          }}
        >
          <div className="product-details-card">
          <div className="product-topbar">
            <Link className="product-link" to="/catalog">
              <PiArrowLeft size={16} /> Catalog
            </Link>
            <span className="product-badge">{product.category}</span>
          </div>

          <div className="product-details-grid">
            <div className="product-media">
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
                loading="lazy"
              />
            </div>

            <div className="product-info">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-subtitle">
                {[1, 2, 3, 4, 5].map((i) =>
                  i <= product.rating
                    ? <PiStarFill key={i} size={16} color="#fbbf24" />
                    : <PiStar key={i} size={16} color="#fbbf24" />
                )}{' '}
                {product.rating} / 5
              </p>

              <div className="product-pricing">
                <div className="product-price-lg">{formatRupees(discountedPrice)}</div>
                {typeof product.discount === 'number' && product.discount > 0 ? (
                  <div className="product-price-meta">
                    <span className="product-strike">{formatRupees(product.price)}</span>
                    <span className="product-discount">{product.discount}% off</span>
                  </div>
                ) : null}
              </div>

              <div className="product-divider" />

              <p className="product-description">{product.description}</p>

              <div className="product-actions">
                <button type="button" className="product-btn product-btn-primary" onClick={() => addToCart(product.id)}>
                  <PiShoppingBag size={18} /> Add to cart
                </button>
                <button type="button" className="product-btn product-btn-secondary" onClick={() => { addToCart(product.id); navigate('/payment'); }}>
                  <PiCreditCard size={18} /> Buy now
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}