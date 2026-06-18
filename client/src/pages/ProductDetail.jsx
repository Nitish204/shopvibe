import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from '../services/api';
import { CartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios.get(`/products/${id}`).then(res => setProduct(res.data)).catch(console.error);
  }, [id]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} className="w-full md:w-1/2 rounded-xl object-cover h-96" />
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-1">{product.category?.name}</p>
        <p className="text-2xl text-accent font-bold mt-4">₹{product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <div className="mt-4">
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">Size: {product.size || 'N/A'}</span>
          <span className="ml-4 text-sm bg-gray-100 px-3 py-1 rounded-full">Stock: {product.stock}</span>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center border rounded-full">
            <button onClick={() => setQty(Math.max(1, qty-1))} className="px-4 py-2">-</button>
            <span className="px-4 py-2">{qty}</span>
            <button onClick={() => setQty(qty+1)} className="px-4 py-2">+</button>
          </div>
          <button
            onClick={() => addToCart(product, qty)}
            className="bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}