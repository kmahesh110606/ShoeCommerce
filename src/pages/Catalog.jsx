import { PiSquaresFour } from 'react-icons/pi';
import Nav from '../assets/Nav.jsx';
import Card from '../assets/Card.jsx';
import DotGrid from '../assets/DotGrid.jsx';
import { products } from '../../data.js';

export default function Catalog() {
  return (
    <>
      <Nav className="navbar-overlay" />
      <div className="catalog-page">
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
        <div className="catalog-shell">
          <div className="catalog-header">
            <PiSquaresFour size={28} />
            <h1 className="catalog-title">Catalog</h1>
          </div>
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