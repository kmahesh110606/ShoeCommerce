import { Link } from 'react-router-dom';
import '../styles/styles.css';

function Nav({ themeStyle, className }) {
  return (
  <nav className={className ? `navbar ${className}` : 'navbar'} style={themeStyle}>
        <div className="nav-logo">
            <Link to="/" className="nav-brand">ShoeCommerce</Link>
        </div>
        <div className="nav-links">
            <Link to="/catalog" className="nav-link">Catalog</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to="/" className="nav-link">Home</Link>
        </div>
    </nav>
  );
}

export default Nav;