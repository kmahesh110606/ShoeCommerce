import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiArrowLeft, PiQrCode, PiCreditCard, PiTruck, PiCheckCircle, PiBookmarkSimple, PiLightbulb, PiSpinnerGap } from 'react-icons/pi';
import { QRCodeSVG } from 'qrcode.react';
import Nav from '../assets/Nav.jsx';
import DotGrid from '../assets/DotGrid.jsx';
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

function PaymentGateway() {
    const [method, setMethod] = useState('upi');
    const [paymentState, setPaymentState] = useState('idle');
    const navigate = useNavigate();
    const { cartItems, placeOrder } = useCart();

    const cartPreview = useMemo(() => {
        const items = cartItems
            .map((ci) => {
                const product = products.find((p) => p.id === ci.productId);
                return product ? { product, qty: ci.qty } : null;
            })
            .filter(Boolean);

        const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
        const delivery = items.length ? 99 : 0;
        return { items, subtotal, delivery, total: subtotal + delivery };
    }, [cartItems]);

    const upiUri = `upi://pay?pa=shoecommerce@upi&pn=ShoeCommerce&am=${cartPreview.total}&cu=INR`;

    function handleConfirm() {
        if (cartPreview.items.length === 0 || paymentState !== 'idle') return;
        setPaymentState('processing');
        setTimeout(() => {
            placeOrder(method, cartPreview.items, cartPreview.total);
            setPaymentState('success');
        }, 2500);
    }

    if (paymentState === 'processing') {
        return (
            <div className="payment-page">
                <DotGrid dotSize={5} gap={13} baseColor="#121212" activeColor="#939296" proximity={120} shockRadius={250} shockStrength={5} resistance={750} returnDuration={1.5} />
                <Nav className="navbar-overlay" />
                <div className="payment-anim-container">
                    <div className="payment-anim-card">
                        <PiSpinnerGap size={48} className="payment-spinner" />
                        <h2 className="payment-anim-title">Processing payment...</h2>
                        <p className="muted">Please wait while we confirm your {method.toUpperCase()} payment.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (paymentState === 'success') {
        return (
            <div className="payment-page">
                <DotGrid dotSize={5} gap={13} baseColor="#121212" activeColor="#939296" proximity={120} shockRadius={250} shockStrength={5} resistance={750} returnDuration={1.5} />
                <Nav className="navbar-overlay" />
                <div className="payment-anim-container">
                    <div className="payment-anim-card payment-success-card">
                        <div className="payment-success-icon">
                            <PiCheckCircle size={64} />
                        </div>
                        <h2 className="payment-anim-title">Payment Successful!</h2>
                        <p className="muted">Your order has been placed. Thank you for shopping with us!</p>
                        <div className="payment-success-actions">
                            <Link className="btn btn-confirm" to="/catalog">Continue shopping</Link>
                            <Link className="btn btn-ghost" to="/">Go home</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                                <div className="qr-center">
                                    <div className="qr-frame">
                                        <QRCodeSVG value={upiUri} size={164} bgColor="#ffffff" fgColor="#000000" level="M" />
                                    </div>
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
                            <button type="button" className="btn btn-confirm" onClick={handleConfirm} disabled={cartPreview.items.length === 0}>
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