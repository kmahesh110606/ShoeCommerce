import { Suspense, lazy } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/styles.css'
import { CartProvider } from './utils/CartContext.jsx'
import Home from "./pages/Home.jsx"
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"))
const Catalog = lazy(() => import("./pages/Catalog.jsx"))
const NotFound = lazy(() => import("./pages/NotFound.jsx"))
const Cart = lazy(() => import("./pages/Cart.jsx"))
const PaymentGateway = lazy(() => import("./pages/PaymentGateway.jsx"))

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#050505',
      color: '#fff',
      fontSize: '1.2rem'
    }}>Loading...</div>
  )
}

function App() {
  return (
    <Router>
      <CartProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<PaymentGateway />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </Router>
  )
}

export default App;
