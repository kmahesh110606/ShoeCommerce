import { Link } from 'react-router-dom';
import { PiArrowLeft, PiMinus, PiPlus, PiTrash, PiShieldCheck, PiShoppingBag, PiArrowRight } from 'react-icons/pi';
import Nav from '../assets/Nav.jsx';
import { products } from '../../data.js';
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

export default function Cart() {
  const { cartItems, updateQty, removeFromCart } = useCart();

  const resolved = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { product, qty: item.qty } : null;
    })
    .filter(Boolean);

  const subtotal = resolved.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const delivery = resolved.length ? 99 : 0;
  const total = subtotal + delivery;

  const recommendations = products.slice(6, 9);

  return (
    <div className="cart-page">
      <div className="ambient-bg" aria-hidden="true" />
      <Nav className="navbar-overlay" />

      <div className="cart-shell">
        <div className="cart-header">
          <div>
            <h1 className="cart-title">Your Cart</h1>
            <p className="cart-subtitle">Clean and fast checkout experience.</p>
          </div>
          <Link className="cart-link" to="/catalog">
            <PiArrowLeft size={16} /> Continue shopping
          </Link>
        </div>

        <div className="cart-grid">
          <section className="ui-panel cart-panel">
            <div className="cart-panel-head">
              <h2 className="cart-panel-title">Items</h2>
              <span className="cart-muted">{resolved.length} items</span>
            </div>

            {resolved.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is empty.</p>
                <Link className="btn btn-primary" to="/catalog">
                  <PiShoppingBag size={16} /> Browse catalog
                </Link>
              </div>
            ) : (
              <div className="cart-list">
                {resolved.map(({ product, qty }) => (
                  <article
                    key={product.id}
                    className="cart-row cart-row-animate"
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
                          <button type="button" className="qty-btn" onClick={() => updateQty(product.id, qty - 1)} disabled={qty <= 1}>
                            <PiMinus size={14} />
                          </button>
                          <span className="qty-pill">{qty}</span>
                          <button type="button" className="qty-btn" onClick={() => updateQty(product.id, qty + 1)}>
                            <PiPlus size={14} />
                          </button>
                        </div>

                        <button type="button" className="btn btn-ghost" onClick={() => removeFromCart(product.id)}>
                          <PiTrash size={14} /> Remove
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

            {resolved.length === 0 ? (
              <button
                className="btn btn-primary"
                disabled
                title="Add items to your cart to proceed"
              >
                <PiArrowRight size={16} /> Proceed to payment
              </button>
            ) : (
              <Link className="btn btn-primary" to="/payment">
                <PiArrowRight size={16} /> Proceed to payment
              </Link>
            )}

            <div className="cart-note">
              <PiShieldCheck size={20} className="cart-note-icon" />
              <div>
                <div className="cart-note-title">Secure checkout</div>
                <div className="cart-muted">Your payment details stay encrypted.</div>
              </div>
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