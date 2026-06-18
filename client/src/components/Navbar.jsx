import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Shop<span className="text-accent">Vibe</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/products" className="hover:text-accent transition">Products</Link>
          {user?.role === 'admin' && (
            <>
              <Link to="/dashboard" className="hover:text-accent transition">Dashboard</Link>
              <Link to="/sales" className="hover:text-accent transition">Analytics</Link>
            </>
          )}
          <Link to="/cart" className="relative hover:text-accent transition">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-accent text-white text-xs rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <button onClick={logout} className="bg-accent px-4 py-1 rounded-full hover:bg-orange-600 transition">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-accent px-4 py-1 rounded-full hover:bg-orange-600 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}