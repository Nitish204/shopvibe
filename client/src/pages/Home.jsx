import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('/products?limit=8')
      .then(res => setFeatured(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl p-10 mb-10 text-center">
        <h1 className="text-5xl font-bold">Welcome to ShopVibe</h1>
        <p className="text-xl mt-4">Discover the best deals on fashion, electronics, groceries & more.</p>
        <Link to="/products" className="inline-block mt-6 bg-accent px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition">
          Explore Now
        </Link>
      </section>

      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}