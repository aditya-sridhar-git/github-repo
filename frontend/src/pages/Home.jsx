import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NebulaCard from '../components/NebulaCard';
import AiAssistant from '../components/AiAssistant';
import { Sparkles, TrendingUp } from 'lucide-react';

const Home = () => {
  const [products] = useState([
    {
      id: 1,
      title: "Nebula Glass Pro",
      price: 899,
      description: "Augmented reality eyewear with 16K retinal display and neural link integration.",
      image: "https://images.unsplash.com/photo-1573148195900-7845fcc9992a?auto=format&fit=crop&q=80&w=800",
      hypeLevel: 92
    },
    {
      id: 2,
      title: "Pulse Sneakers",
      price: 249,
      description: "Self-lacing biometric footwear with reactive kinetic cushioning and RGB trim.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      hypeLevel: 78
    },
    {
      id: 3,
      title: "Quantum Drive v4",
      price: 1599,
      description: "Tetrabyte storage module with instantaneous data retrieval and zero-latency.",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
      hypeLevel: 85
    },
    {
      id: 4,
      title: "Cipher Key",
      price: 120,
      description: "Unbreakable hardware encryption for the modern nomad. Titanium finish.",
      image: "https://images.unsplash.com/photo-1633265486064-086b21935fcc?auto=format&fit=crop&q=80&w=800",
      hypeLevel: 64
    }
  ]);

  return (
    <div className="min-h-screen px-4 py-8 md:px-12 lg:px-24">
      <header className="mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-4"
        >
          <Sparkles className="text-cyan-400" />
          <span className="nebula-font text-cyan-400 text-sm tracking-widest">Nexus Marketplace</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          THE <span className="neon-text-gradient">FUTURE</span> <br/> 
          OF COMMERCE.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 max-w-xl text-lg leading-relaxed"
        >
          Welcome to the Nebula Shop. We don't just sell products; we curate the tools for your evolution. 
          Powered by hyper-intelligent AI and decentralized commerce.
        </motion.p>
      </header>

      {/* Hype Section */}
      <section className="mb-16 overflow-hidden">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="text-magenta-500" />
          <h2 className="text-xl">Trending in the Multiverse</h2>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-8 mask-gradient no-scrollbar">
          {products.map((product) => (
            <NebulaCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Main Catalog */}
      <section>
        <h2 className="text-xl mb-8 flex items-center gap-2">
          <div className="w-12 h-[1px] bg-cyan-500" /> All Artifacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <NebulaCard key={`cat-${product.id}`} product={product} />
          ))}
          {products.map((product) => (
            <NebulaCard key={`cat2-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <AiAssistant />
      
      {/* Dynamic Background Noise/Film Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default Home;
