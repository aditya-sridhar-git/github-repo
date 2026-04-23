import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';

const NebulaCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass-morphism p-4 relative overflow-hidden group cursor-pointer"
      style={{ width: '300px' }}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative">
        <img 
          src={product.image || "https://premium-images.com/placeholder"} 
          alt={product.title} 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl mb-2 neon-text-gradient">{product.title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <div className="flex gap-2">
            <button className="p-2 glass-morphism hover:bg-cyan-500/20 transition-colors">
              <ShoppingCart size={20} />
            </button>
            <button className="p-2 glass-morphism hover:bg-magenta-500/20 transition-colors">
              <Zap size={20} />
            </button>
          </div>
        </div>
        
        {/* Hype Indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${product.hypeLevel}%` }}
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
            />
          </div>
          <span className="text-[10px] uppercase text-cyan-400">Hype: {product.hypeLevel}%</span>
        </div>
      </div>
    </motion.div>
    </Link>
  );
};

export default NebulaCard;
