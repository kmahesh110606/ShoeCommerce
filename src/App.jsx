import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/styles.css'
import { CartProvider } from './utils/CartContext.jsx'
import Home from "./pages/Home.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import Catalog from "./pages/Catalog.jsx"
import NotFound from "./pages/NotFound.jsx"
import Cart from "./pages/Cart.jsx"
import PaymentGateway from "./pages/PaymentGateway.jsx"

function App() {
  return (
    <Router>
      <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </CartProvider>
    </Router>
  )
}

export default App;
