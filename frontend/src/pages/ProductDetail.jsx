import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, Shield, Target, Cpu } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock fetch for now
  useEffect(() => {
    // In a real app, this would be axios.get(`/api/products/${id}`)
    setTimeout(() => {
      setProduct({
        id,
        title: "Nebula Glass Pro",
        price: 899,
        description: "Augmented reality eyewear with 16K retinal display and neural link integration. The Nebula Glass Pro is designed for high-density information environments, providing real-time data overlays and atmospheric synchronization.",
        image: "https://images.unsplash.com/photo-1573148195900-7845fcc9992a?auto=format&fit=crop&q=80&w=800",
        hypeLevel: 92,
        specs: ["16K Retinal", "Neural Sync", "8h Battery", "Titanium Frame"]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-black">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:px-32">
      <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-12 group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        <span className="nebula-font text-xs">Return to Catalog</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Visuals */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-magenta-500 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
            <img src={product.image} alt={product.title} className="relative w-full rounded-2xl border border-white/10 shadow-2xl" />
            
            {/* Holographic Overlay Effects */}
            <div className="absolute top-4 left-4 p-3 glass-morphism border-cyan-500/30 animate-pulse-glow">
              <span className="text-[10px] text-cyan-400 font-bold block">SCANNING...</span>
              <span className="text-[12px] text-white">AUTHENTIC ARTIFACT</span>
            </div>
          </div>
        </motion.div>

        {/* Narrative */}
        <div className="flex flex-col">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold mb-4">{product.title}</motion.h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-cyan-400">${product.price}</span>
            <div className="px-3 py-1 rounded-full border border-magenta-500 text-magenta-500 text-xs font-bold">LIMITED EDITION</div>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed mb-10">{product.description}</p>

          {/* AI Tech Specs */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-3 p-4 glass-morphism hover:bg-white/5 transition-colors">
                <div className="p-2 bg-white/5 rounded-lg">
                  {i === 0 ? <Cpu size={18} className="text-cyan-400" /> : <Shield size={18} className="text-magenta-400" />}
                </div>
                <span className="text-sm font-medium">{spec}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors"
            >
              <Zap size={20} /> INITIALIZE ACQUISITION
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-morphism font-bold hover:border-cyan-500 transition-colors"
            >
              SAVE TO MATRIX
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
