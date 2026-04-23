import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <motion.div
        whileHover={{ y: -5 }}
        className="product-card"
      >
        <div className="card-arrow icon-bubble bubble-float-alt">
          <ArrowUpRight size={20} />
        </div>
        
        <div className="card-content">
          <h3 className="product-card-title">{product.title}</h3>
          {product.subtitle && (
            <p className="product-card-subtitle">{product.subtitle}</p>
          )}
        </div>
        
        <div className="card-img-container bubble-float-slow">
          <img 
            src={product.image || "https://premium-images.com/placeholder"} 
            alt={product.title} 
            className="card-img"
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
