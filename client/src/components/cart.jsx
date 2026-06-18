import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">Your cart is empty.</p>
        <Link to="/products" className="text-accent underline">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div key={item._id} className="flex items-center gap-4 border-b pb-4">
          <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1">
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-gray-500">₹{item.price}</p>
            <div className="flex items-center gap-2 mt-1">
              <button onClick={() => updateQuantity(item._id, -1)} className="px-2 border rounded">-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQuantity(item._id, 1)} className="px-2 border rounded">+</button>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500 text-sm ml-4">Remove</button>
            </div>
          </div>
          <div className="font-bold">₹{item.price * item.qty}</div>
        </div>
      ))}
      <div className="text-right font-bold text-xl mt-4">
        Total: ₹{totalPrice()}
      </div>
      <Link to="/checkout" className="inline-block bg-accent text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
        Proceed to Checkout
      </Link>
    </div>
  );
}
