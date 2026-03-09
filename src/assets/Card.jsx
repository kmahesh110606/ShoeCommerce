import { Link } from 'react-router-dom';
import { PiEye, PiShoppingBag, PiStar, PiStarFill } from 'react-icons/pi';
import { getCategoryTheme } from '../utils/categoryTheme';

function StarRating({ rating }) {
  return (
    <span className="product-stars">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating ? <PiStarFill key={i} size={14} /> : <PiStar key={i} size={14} />
      )}
    </span>
  );
}

function Card({ id, name, price, rating, image, category }) {
  const theme = getCategoryTheme(category);
  const cardStyle = {};

  return (
    <div className="card" style={cardStyle}>
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-content">
        <div className="product-name">{name}</div>
        <div className="product-rating">
          <StarRating rating={rating} />
          <div className="product-price">₹{price}</div>
        </div>
        <div className="product-card-actions">
          <Link className="cta" to={`/product/${id}`}>
            <PiEye size={16} /> View
          </Link>
          <a className="cta cta-secondary" href="#">
            <PiShoppingBag size={16} /> Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;