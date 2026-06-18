import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-light">
      <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category?.name || 'Uncategorized'}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-accent font-bold">₹{product.price}</span>
          <span className="text-xs text-gray-400">{product.stock} left</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Link to={`/product/${product._id}`} className="text-primary underline text-sm">View</Link>
          <button
            onClick={() => addToCart(product)}
            className="ml-auto bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-primary/80"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}