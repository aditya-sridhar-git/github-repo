import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Cart.css';

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch(`/api/cart/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setCart(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const handleRemove = async (productId) => {
    if (!user) return;
    try {
      const res = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId })
      });
      if (res.ok) fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="cart-container flex items-center justify-center">
        <div className="icon-bubble bubble-float" style={{width: 50, height: 50, background: 'var(--pastel-blue)'}}></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="cart-container flex flex-col items-center justify-center text-center">
        <h1 className="display-font mb-4">You must log in</h1>
        <p className="mb-8">Access your personalized inventory.</p>
        <Link to="/auth" className="checkout-btn icon-bubble w-64 text-center">Login Now</Link>
      </div>
    );
  }

  const items = cart?.items || [];
  const subtotal = items.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <Link to="/" className="back-link icon-bubble">
          <ChevronLeft size={20} /> Continue Shopping
        </Link>
        <h1 className="display-font">Your Cart ({items.length})</h1>
      </div>

      <div className="cart-grid">
        <div className="cart-items-section">
          {items.length === 0 ? (
            <div className="empty-cart icon-bubble bubble-float-slow">
              <p>Your dimension is empty.</p>
              <Link to="/" className="mt-4 text-blue-500 font-bold hover:underline">Explore Artifacts</Link>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item._id || item.productId._id} 
                  className="cart-item icon-bubble"
                >
                  <div className="item-img-container bubble-float-alt">
                    <img src={item.productId.image} alt={item.productId.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.productId.title}</h3>
                    <p className="item-cat">{item.productId.category}</p>
                    <div className="item-price">${item.productId.price}</div>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemove(item.productId._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-summary-section">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="summary-card icon-bubble bubble-float-slow"
          >
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                alert("Checkout Authorized: Your artifacts will be shipped via deep-space transport within 2 cycles.");
                window.location.href = '/';
              }}
              className="checkout-btn icon-bubble hover-enlarge"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
