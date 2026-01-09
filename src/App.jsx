import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Card from "./assets/Card.jsx"
import PaymentGateway from "./pages/PaymentGateway.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/payment" element={<PaymentGateway />} />
      </Routes>
    </Router>
  )
}

export default App;
