import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PiSneaker,
  PiSquaresFour, PiSquaresFourFill,
  PiShoppingBag, PiShoppingBagFill,
  PiHouse, PiHouseFill,
} from 'react-icons/pi';

function Nav({ themeStyle, className }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = pathname === '/' || pathname === '';
  const isCatalog = pathname.startsWith('/catalog');
  const isCart = pathname.startsWith('/cart');

  const navClass = [
    'navbar',
    scrolled ? 'navbar-scrolled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClass} style={themeStyle}>
      <Link to="/" className="nav-brand">
        <span className="nav-brand-icon"><PiSneaker size={18} /></span>
        ShoeCommerce
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link${isHome ? ' nav-link-active' : ''}`}>
          {isHome ? <PiHouseFill size={18} /> : <PiHouse size={18} />}
          <span className="nav-link-text">Home</span>
        </Link>
        <Link to="/catalog" className={`nav-link${isCatalog ? ' nav-link-active' : ''}`}>
          {isCatalog ? <PiSquaresFourFill size={18} /> : <PiSquaresFour size={18} />}
          <span className="nav-link-text">Catalog</span>
        </Link>
        <Link to="/cart" className={`nav-link${isCart ? ' nav-link-active' : ''}`}>
          {isCart ? <PiShoppingBagFill size={18} /> : <PiShoppingBag size={18} />}
          <span className="nav-link-text">Cart</span>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;