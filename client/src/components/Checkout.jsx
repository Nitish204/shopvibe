import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      alert('Please login first');
      return navigate('/login');
    }
    if (!address) {
      alert('Please enter shipping address');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        products: cart.map(item => ({ product: item._id, qty: item.qty })),
        total: totalPrice(),
        address,
      };
      const { data } = await axios.post('/orders', orderData);
      // Initiate Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: 'INR',
        name: 'ShopVibe',
        description: 'Order Payment',
        order_id: data.order.id,
        handler: async (response) => {
          await axios.post('/payment/verify', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          clearCart();
          alert('Payment successful! Order placed.');
          navigate('/');
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: '#f97316' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold text-xl">Order Summary</h2>
        {cart.map(item => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>{item.name} × {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{totalPrice()}</span>
        </div>
        <div className="mt-6">
          <label className="block font-medium">Shipping Address</label>
          <textarea
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            rows="3"
            placeholder="Enter your delivery address"
          />
        </div>
        <button
          onClick={handlePayment}
          disabled={loading || cart.length === 0}
          className="mt-6 bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay ₹' + totalPrice()}
        </button>
      </div>
    </div>
  );
}