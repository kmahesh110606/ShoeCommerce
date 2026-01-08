import '../styles/paymentGateway.css';

function PaymentGateway() {
    return (
    <>
        <div className="payment-card">
            <h2>Payment</h2>
            <div className="section">
                <h3>Pay via QR</h3>
                <div className="qr">
                    <img src="images/qr.jpeg" alt="QR Code"/>
                </div>
                <p >
                    Scan using any UPI app
                </p>
            </div>
        <div className="section">
        <h3>Card Payment</h3>
        <input className="input" type="text" placeholder="Card Number"/>
        <input className="input" type="text" placeholder="Card Holder Name"/>
        <div className="row">
            <input className="input" type="text" placeholder="MM/YY"/>
            <input className="input" type="password" placeholder="CVV"/>
        </div>
    </div>
    <div className="section">
        <h3>Cash on Delivery</h3>
        <label className="cod">
        <input type="checkbox"/> Pay with cash on delivery
        </label>
    </div>
    <button>Confirm Payment</button>
    </div>
    </>

) }

export default PaymentGateway;