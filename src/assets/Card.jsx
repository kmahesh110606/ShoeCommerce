import '../styles/styles.css';
import { Link } from 'react-router-dom';
import { getCategoryTheme } from '../utils/categoryTheme';
//import product from '../../data.js'

function Card({ id, name, price, rating, image, category }) {
  const theme = getCategoryTheme(category);
  const cardStyle = {
    '--glow-color': theme['secondary-color'],
  };

  return ( 
    <>
      <div className="card" style={cardStyle}>
        <div className="product-image">
          <img src={image} alt={`${name} image`} />
        </div>
        <div className="product-content">
          <div className="product-name">{name}</div>
          <div className="product-rating">
            <span>{rating} ⭐</span>
            <div className="product-price">₹{price}</div>
          </div>
          <div className="product-card-actions">
            <Link className="cta" to={`/product/${id}`}>
              View details
            </Link>
            <a className="cta cta-secondary" href="#">
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;