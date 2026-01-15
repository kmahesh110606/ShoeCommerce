import { Link } from 'react-router-dom';
import Nav from '../assets/Nav.jsx';
import '../styles/styles.css';
import { products } from '../../data.js';
import { getCategoryTheme } from '../utils/categoryTheme';

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

export default function Cart() {
  const cartItems = [
    { product: products.find((p) => p.id === 1), qty: 1 },
    { product: products.find((p) => p.id === 2), qty: 2 },
  ].filter((x) => Boolean(x.product));

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const delivery = cartItems.length ? 99 : 0;
  const total = subtotal + delivery;

  const recommendations = products.slice(6, 9);

  return (
    <div className="cart-page">
      <Nav className="navbar-overlay" />

      <div className="cart-shell">
        <div className="cart-header">
          <div>
            <h1 className="cart-title">Your Cart</h1>
            <p className="cart-subtitle">Black aesthetic checkout, clean and fast.</p>
          </div>
          <Link className="cart-link" to="/catalog">
            Continue shopping
          </Link>
        </div>

        <div className="cart-grid">
          <section className="ui-panel cart-panel">
            <div className="cart-panel-head">
              <h2 className="cart-panel-title">Items</h2>
              <span className="cart-muted">{cartItems.length} items</span>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is empty.</p>
                <Link className="btn btn-primary" to="/catalog">
                  Browse catalog
                </Link>
              </div>
            ) : (
              <div className="cart-list">
                {cartItems.map(({ product, qty }) => (
                  <article
                    key={product.id}
                    className="cart-row"
                    style={{ '--glow-color': getCategoryTheme(product.category)['secondary-color'] }}
                  >
                    <img className="cart-thumb" src={product.image} alt={product.name} loading="lazy" />

                    <div className="cart-row-main">
                      <div className="cart-row-top">
                        <div>
                          <div className="cart-item-name">{product.name}</div>
                          <div className="cart-item-meta">Category: {product.category}</div>
                        </div>
                        <div className="cart-item-price">{formatRupees(product.price)}</div>
                      </div>

                      <div className="cart-row-bottom">
                        <div className="cart-qty">
                          <button type="button" className="qty-btn" disabled>
                            −
                          </button>
                          <span className="qty-pill">{qty}</span>
                          <button type="button" className="qty-btn" disabled>
                            +
                          </button>
                        </div>

                        <button type="button" className="btn btn-ghost" disabled>
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className="ui-panel cart-panel">
            <h2 className="cart-panel-title">Order Summary</h2>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span className="cart-muted">Subtotal</span>
                <span>{formatRupees(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span className="cart-muted">Delivery</span>
                <span>{formatRupees(delivery)}</span>
              </div>
              <div className="cart-divider" />
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>{formatRupees(total)}</span>
              </div>
            </div>

            <Link className="btn btn-primary" to="/payment">
              Proceed to payment
            </Link>

            <div className="cart-note">
              <div className="cart-note-title">Secure checkout</div>
              <div className="cart-muted">Your payment details stay encrypted.</div>
            </div>
          </aside>
        </div>

        <section className="cart-reco">
          <h2 className="cart-panel-title">You may also like</h2>
          <div className="cart-reco-grid">
            {recommendations.map((p) => (
              <Link
                key={p.id}
                className="cart-reco-card"
                to={`/product/${p.id}`}
                style={{ '--glow-color': getCategoryTheme(p.category)['secondary-color'] }}
              >
                <img className="cart-reco-img" src={p.image} alt={p.name} loading="lazy" />
                <div className="cart-reco-name">{p.name}</div>
                <div className="cart-muted">{formatRupees(p.price)}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}