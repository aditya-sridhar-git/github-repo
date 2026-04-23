import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Heart, Shield, Battery, Music } from 'lucide-react';
import '../ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    setTimeout(() => {
      setProduct({
        id,
        title: "Sequoia Headphones",
        price: 299,
        description: "Experience the clear sounds. Making your dream music come true, stay with Sequoia Sounds. Designed for comfort and unparalleled audio fidelity.",
        image: "/blue_headphones.png",
        specs: ["Active Noise Cancelling", "40h Battery Life", "Spatial Audio", "Premium Cushioning"]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return (
    <div className="app-container" style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="icon-bubble bubble-float" style={{width: 50, height: 50, background: 'var(--pastel-blue)'}}></div>
    </div>
  );

  return (
    <div className="app-container page-container">
      <Link to="/" className="back-link icon-bubble">
        <ChevronLeft size={20} /> Return to Home
      </Link>

      <div className="product-detail-grid">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-image-container icon-bubble bubble-float-slow"
        >
          <img src={product.image} alt={product.title} className="product-image-large bubble-float" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="product-info"
        >
          <div className="pastel-tag mb-4">
            <Music size={14} /> Studio Quality
          </div>
          
          <h1 className="display-font">{product.title}</h1>
          
          <div className="product-price">
            ${product.price}
            <span className="stock-tag">In Stock</span>
          </div>

          <p className="product-desc">{product.description}</p>

          <div className="specs-grid">
            {product.specs.map((spec, i) => (
              <div key={i} className="spec-item icon-bubble bubble-float-alt">
                <div className="spec-icon">
                  {i % 2 === 0 ? <Shield size={16} /> : <Battery size={16} />}
                </div>
                <span style={{fontSize: '14px', fontWeight: 500}}>{spec}</span>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn icon-bubble">
              <ShoppingBag size={20} /> Add to Cart
            </button>
            <button className="wishlist-btn icon-bubble bubble-float-slow">
              <Heart size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
