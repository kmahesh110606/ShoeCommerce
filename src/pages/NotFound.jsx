import { Link } from 'react-router-dom';
import { PiHouse, PiWarningCircle } from 'react-icons/pi';
import DotGrid from '../assets/DotGrid.jsx';

export default function NotFound() {
  return (
    <div className="not-found">
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
      <PiWarningCircle size={72} className="not-found-icon" />
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="not-found-link">
        <PiHouse size={18} /> Back to Home
      </Link>
    </div>
  );
}