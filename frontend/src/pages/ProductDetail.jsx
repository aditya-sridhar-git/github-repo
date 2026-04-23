import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Heart, Shield, Battery, Music } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import '../ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct({
          ...data,
          specs: data.specs && data.specs.length > 0 ? data.specs : ["Standard issue tech", "Optimized specs"]
        });
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      setAddedMessage('Please login to add to cart.');
      setTimeout(() => setAddedMessage(''), 3000);
      return;
    }

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId: product._id, quantity: 1 })
      });
      const data = await res.json();
      if (res.ok) {
        setAddedMessage('Added to cart!');
        setTimeout(() => setAddedMessage(''), 3000);
      } else {
        setAddedMessage(data.message || 'Error adding to cart.');
      }
    } catch (err) {
      setAddedMessage('Network error.');
    }
  };

  if (loading || !product) return (
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
          style={{ background: product.neonColor ? product.neonColor + '20' : 'var(--pastel-blue)' }}
        >
          <img src={product.image} alt={product.title} className="product-image-large bubble-float" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="product-info"
        >
          <div className="pastel-tag mb-4">
            <Music size={14} /> {product.category}
          </div>
          
          <h1 className="display-font">{product.title}</h1>
          
          <div className="product-price">
            ${product.price}
            <span className="stock-tag">In Stock</span>
          </div>

          <p className="product-desc">{product.description}</p>
          <p className="text-gray-500 italic mt-2">"{product.aiInsight}"</p>

          <div className="specs-grid mt-4">
            {product.specs.map((spec, i) => (
              <div key={i} className="spec-item icon-bubble bubble-float-alt">
                <div className="spec-icon">
                  {i % 2 === 0 ? <Shield size={16} /> : <Battery size={16} />}
                </div>
                <span style={{fontSize: '14px', fontWeight: 500}}>{spec}</span>
              </div>
            ))}
          </div>

          {addedMessage && (
            <div className={`mt-4 p-2 rounded text-center font-bold ${addedMessage.includes('error') || addedMessage.includes('Please') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {addedMessage}
            </div>
          )}

          <div className="action-buttons mt-4">
            <button className="add-to-cart-btn icon-bubble" onClick={handleAddToCart}>
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
