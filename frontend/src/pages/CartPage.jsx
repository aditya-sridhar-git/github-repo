import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, CreditCard, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Cart.css';

const CartPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Sequoia Headphones",
      price: 299,
      quantity: 1,
      image: "/blue_headphones.png"
    },
    {
      id: 2,
      title: "New Gen X-Bud",
      price: 149,
      quantity: 2,
      image: "/white_earbuds.png"
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
    <div className="app-container" style={{padding: '40px 24px'}}>
      <Link to="/" className="back-link icon-bubble">
        <ChevronLeft size={20} /> Continue Shopping
      </Link>

      <h1 className="display-font" style={{fontSize: '40px'}}>Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items-container">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -50 }}
                className="cart-item icon-bubble"
              >
                <div className="cart-item-img bubble-float-slow">
                  <img src={item.image} alt={item.title} />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <div className="cart-item-price">${item.price}</div>
                </div>

                <div className="cart-qty-controls">
                  <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn icon-bubble"><Minus size={14} /></button>
                  <span style={{fontWeight: 600, width: '20px', textAlign: 'center'}}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn icon-bubble"><Plus size={14} /></button>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="remove-btn icon-bubble bubble-float-alt"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="card" style={{padding: '60px', textAlign: 'center'}}>
              <h3 className="display-font" style={{fontSize: '24px', marginBottom: '16px'}}>Your cart is empty</h3>
              <p style={{color: 'var(--text-secondary)'}}>Looks like you haven't added any products yet.</p>
            </div>
          )}
        </div>

        <div className="cart-summary icon-bubble bubble-float">
          <h2 className="summary-title display-font">Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span style={{fontWeight: 600, color: 'var(--text-primary)'}}>${subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{color: '#166534', fontWeight: 600}}>Free</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span>${subtotal}</span>
          </div>

          <button className="checkout-btn icon-bubble">
            <CreditCard size={20} /> Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
