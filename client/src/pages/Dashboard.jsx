import { useEffect, useState } from 'react';
import axios from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, users: 0, products: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    axios.get('/admin/stats').then(res => setStats(res.data));
    axios.get('/admin/orders?limit=5').then(res => setRecentOrders(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow"><h3>Orders</h3><p className="text-2xl">{stats.orders}</p></div>
        <div className="bg-white p-4 rounded shadow"><h3>Revenue</h3><p className="text-2xl">₹{stats.revenue}</p></div>
        <div className="bg-white p-4 rounded shadow"><h3>Users</h3><p className="text-2xl">{stats.users}</p></div>
        <div className="bg-white p-4 rounded shadow"><h3>Products</h3><p className="text-2xl">{stats.products}</p></div>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <ul>
          {recentOrders.map(o => (
            <li key={o._id} className="border-b py-2 flex justify-between">
              <span>Order #{o._id.slice(-6)}</span>
              <span>₹{o.total}</span>
              <span className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
        <Link to="/sales" className="text-accent underline mt-4 inline-block">View Sales Analytics →</Link>
      </div>
    </div>
  );
}