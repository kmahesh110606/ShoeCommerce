import { Link } from 'react-router-dom';
import { PiHouse, PiWarningCircle } from 'react-icons/pi';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="ambient-bg" aria-hidden="true" />
      <PiWarningCircle size={72} className="not-found-icon" />
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="not-found-link">
        <PiHouse size={18} /> Back to Home
      </Link>
    </div>
  );
}