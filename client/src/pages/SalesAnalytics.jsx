import { useEffect, useState } from 'react';
import axios from '../services/api';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function SalesAnalytics() {
  const [salesData, setSalesData] = useState({ labels: [], revenue: [], orders: [] });
  const [period, setPeriod] = useState('7d');

  useEffect(() => {
    axios.get(`/admin/sales?period=${period}`).then(res => {
      const data = res.data;
      setSalesData({
        labels: data.map(d => d._id),
        revenue: data.map(d => d.revenue),
        orders: data.map(d => d.orders),
      });
    });
  }, [period]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sales Analytics</h1>
      <div className="mb-4">
        <select value={period} onChange={e => setPeriod(e.target.value)} className="border rounded p-2">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Revenue</h2>
          <Line data={{
            labels: salesData.labels,
            datasets: [{ label: 'Revenue (₹)', data: salesData.revenue, borderColor: '#f97316', fill: false }]
          }} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Orders</h2>
          <Bar data={{
            labels: salesData.labels,
            datasets: [{ label: 'Orders', data: salesData.orders, backgroundColor: '#1e293b' }]
          }} />
        </div>
      </div>
    </div>
  );
}