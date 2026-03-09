import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiArrowLeft, PiQrCode, PiCreditCard, PiTruck, PiCheckCircle, PiBookmarkSimple, PiLightbulb } from 'react-icons/pi';
import Nav from '../assets/Nav.jsx';
import DotGrid from '../assets/DotGrid.jsx';
import { products } from '../../data.js';

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

function PaymentGateway() {
    const [method, setMethod] = useState('upi');

    const cartPreview = useMemo(() => {
        const p1 = products.find((p) => p.id === 1);
        const p2 = products.find((p) => p.id === 2);
        const items = [
            p1 ? { product: p1, qty: 1 } : null,
            p2 ? { product: p2, qty: 2 } : null,
        ].filter(Boolean);

        const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
        const delivery = items.length ? 99 : 0;
        return { items, subtotal, delivery, total: subtotal + delivery };
    }, []);

    return (
        <div className="payment-page">
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
            <Nav className="navbar-overlay" />

            <div className="payment-shell">
                <header className="payment-header">
                    <div>
                        <h1 className="payment-title">Payment</h1>
                        <p className="payment-subtitle">Choose a method and confirm in seconds.</p>
                    </div>
                    <Link className="cart-link" to="/cart">
                        <PiArrowLeft size={16} /> Back to cart
                    </Link>
                </header>

                <div className="payment-grid">
                    <section className="ui-panel payment-panel">
                        <div className="payment-tabs">
                            <button
                                type="button"
                                className={method === 'upi' ? 'tab tab-active' : 'tab'}
                                onClick={() => setMethod('upi')}
                            >
                                <PiQrCode size={16} /> UPI / QR
                            </button>
                            <button
                                type="button"
                                className={method === 'card' ? 'tab tab-active' : 'tab'}
                                onClick={() => setMethod('card')}
                            >
                                <PiCreditCard size={16} /> Card
                            </button>
                            <button
                                type="button"
                                className={method === 'cod' ? 'tab tab-active' : 'tab'}
                                onClick={() => setMethod('cod')}
                            >
                                <PiTruck size={16} /> COD
                            </button>
                        </div>

                        {method === 'upi' ? (
                            <div className="payment-section">
                                <h2 className="section-title">Pay via QR</h2>
                                <p className="muted">Scan with any UPI app.</p>
                                <div className="qr-frame">
                                    <img src="images/qr.jpeg" alt="QR Code" className="qr-img" />
                                </div>
                                <div className="field">
                                    <label className="label">UPI ID (optional)</label>
                                    <input className="input-dark" placeholder="name@bank" />
                                </div>
                            </div>
                        ) : null}

                        {method === 'card' ? (
                            <div className="payment-section">
                                <h2 className="section-title">Card payment</h2>
                                <div className="field">
                                    <label className="label">Card number</label>
                                    <input className="input-dark" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="field">
                                    <label className="label">Card holder</label>
                                    <input className="input-dark" placeholder="Full name" />
                                </div>
                                <div className="row">
                                    <div className="field">
                                        <label className="label">Expiry</label>
                                        <input className="input-dark" placeholder="MM/YY" />
                                    </div>
                                    <div className="field">
                                        <label className="label">CVV</label>
                                        <input className="input-dark" placeholder="***" type="password" />
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {method === 'cod' ? (
                            <div className="payment-section">
                                <h2 className="section-title">Cash on Delivery</h2>
                                <p className="muted">Pay when the order arrives at your doorstep.</p>
                                <label className="cod-dark">
                                    <input type="checkbox" /> Enable COD for this order
                                </label>
                            </div>
                        ) : null}

                        <div className="payment-actions">
                            <button type="button" className="btn btn-confirm">
                                <PiCheckCircle size={16} /> Confirm payment
                            </button>
                            <button type="button" className="btn btn-ghost">
                                <PiBookmarkSimple size={16} /> Save for later
                            </button>
                        </div>
                    </section>

                    <aside className="ui-panel payment-panel">
                        <h2 className="section-title">Order summary</h2>
                        <div className="summary">
                            {cartPreview.items.map((item) => (
                                <div key={item.product.id} className="summary-row">
                                    <span className="muted">{item.product.name} × {item.qty}</span>
                                    <span>{formatRupees(item.product.price * item.qty)}</span>
                                </div>
                            ))}
                            <div className="summary-row">
                                <span className="muted">Delivery</span>
                                <span>{formatRupees(cartPreview.delivery)}</span>
                            </div>
                            <div className="cart-divider" />
                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <span>{formatRupees(cartPreview.total)}</span>
                            </div>
                        </div>

                        <div className="payment-hint">
                            <PiLightbulb size={20} className="payment-hint-icon" />
                            <div>
                                <div className="hint-title">Tip</div>
                                <div className="muted">Use UPI/QR for the fastest checkout.</div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default PaymentGateway;