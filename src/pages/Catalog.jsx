import Nav from '../assets/Nav.jsx';
import Card from '../assets/Card.jsx';
import { products } from '../../data.js';

export default function Catalog() {
  return (
    <>
    <Nav className="navbar-overlay" />

    <div className="catalog-page">
    <div className="catalog-shell">
      <h1 className="catalog-title">Catalog</h1>
      <p className="catalog-subtitle">Browse our extensive collection of shoes.</p>

      <div className="catalog-grid">
        {products.map(product => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>
    </div>
    </div>
    </>
  );
}