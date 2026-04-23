import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, Trash2, Home, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Home.css'; // Reuse styles

const AdminDashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '', price: '', description: '', image: '', category: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this artifact?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...formData, price: Number(formData.price) || 0 })
      });
      if (res.ok) {
        setFormData({ title: '', price: '', description: '', image: '', category: '' });
        fetchProducts();
      } else {
        const errorData = await res.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <div className="p-8">Loading Matrix...</div>;

  return (
    <div className="home-wrapper" style={{background: '#f8fafc', minHeight: '100vh', padding: '2rem'}}>
      <nav className="navbar mb-8 bg-white rounded-2xl p-4 shadow-sm">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-black">
          <Home size={20} /> Storefront
        </Link>
        <div className="flex items-center gap-4">
          <div className="pastel-tag bg-blue-100 text-blue-800 border-none">
            <Shield size={14} /> Admin Mode
          </div>
          <span className="font-bold">{user?.username}</span>
          <button onClick={handleLogout} className="icon-btn bg-red-50 text-red-500 hover:bg-red-100 p-2 rounded-full">
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus size={18} /> New Artifact</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <input type="text" placeholder="Title" required className="p-3 border rounded-xl" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <input type="text" placeholder="Category" required className="p-3 border rounded-xl" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              <input type="number" placeholder="Price" required className="p-3 border rounded-xl" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <input type="text" placeholder="Image URL" required className="p-3 border rounded-xl" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
              <textarea placeholder="Description" required className="p-3 border rounded-xl" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              <button type="submit" className="bg-black text-white p-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">Create Product</button>
            </form>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Inventory ({products.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-sm text-gray-500">
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="py-3 flex items-center gap-3">
                        <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" alt="product" />
                        <span className="font-medium">{p.title}</span>
                      </td>
                      <td className="py-3">{p.category}</td>
                      <td className="py-3 font-bold">${p.price}</td>
                      <td className="py-3 text-right">
                        <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
