import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, CreditCard, Box, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Nebula Glass Pro",
      price: 899,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1573148195900-7845fcc9992a?auto=format&fit=crop&q=80&w=800",
      status: "Synchronized"
    },
    {
      id: 2,
      title: "Pulse Sneakers",
      price: 249,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      status: "Analyzing..."
    }
  ]);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:px-32">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2 nebula-font">Personal Inventory</h1>
          <p className="text-cyan-400 text-xs tracking-widest uppercase">Encryption Status: Active</p>
        </div>
        <Link to="/" className="text-xs text-gray-500 hover:text-white uppercase tracking-tighter">Back to Catalog</Link>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="xl:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="glass-morphism p-4 flex items-center gap-6 group hover:border-cyan-500/30 transition-colors"
              >
                <img src={item.image} className="w-24 h-24 object-cover rounded-lg border border-white/10" alt={item.title} />
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-400 font-bold">${item.price}</span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${item.status === 'Synchronized' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-2 rounded-xl">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-cyan-400 transition-colors"><Minus size={18} /></button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-cyan-400 transition-colors"><Plus size={18} /></button>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
              <Box size={48} className="mx-auto mb-4 text-gray-700" />
              <p className="text-gray-500 italic">No artifacts detected in local inventory.</p>
              <Link to="/" className="text-cyan-400 hover:underline mt-4 block">Initiate Search</Link>
            </div>
          )}
        </div>

        {/* Summary Sideboard */}
        <div className="relative">
          <div className="sticky top-12 glass-morphism p-8 border-cyan-500/20">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <CreditCard className="text-cyan-400" /> Transaction Hub
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal Artifacts</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Quantum Shipping</span>
                <span>$0.00 <span className="text-[10px] text-cyan-400">(FREE)</span></span>
              </div>
              <div className="h-[1px] bg-white/10 w-full" />
              <div className="flex justify-between text-2xl font-bold">
                <span>Total Matrix</span>
                <span className="text-cyan-400">${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,243,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl mb-4 tracking-widest flex items-center justify-center gap-2"
            >
              FINALIZE ACQUISITION
            </motion.button>
            <p className="text-[10px] text-center text-gray-500 tracking-tighter">
              By proceeding, you agree to the Nebula Terms of Multiversal Exchange.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
