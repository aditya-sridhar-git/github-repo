import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Authentication failed');
      
      login(data.user, data.token);
      
      if (data.user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-black font-medium transition-colors">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm icon-bubble bubble-float-slow">
          <Home size={18} />
        </div>
        Return Home
      </Link>

      <div className="absolute w-32 h-32 bg-pastel-blue rounded-full blur-xl opacity-50 top-20 left-40 bubble-float"></div>
      <div className="absolute w-40 h-40 bg-pastel-pink rounded-full blur-xl opacity-50 bottom-20 right-40 bubble-float-alt"></div>
      <div className="absolute w-24 h-24 bg-accent-lime rounded-full blur-xl opacity-40 top-1/2 right-1/4 bubble-float-slow"></div>

      <motion.div 
        layout
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="auth-header">
          <div className="auth-icon-container icon-bubble bubble-float-alt">
            <User size={32} />
          </div>
          <h1 className="auth-title display-font">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="auth-subtitle">
            {isLogin ? "Enter your details to access your account." : "Join Nitec to discover premium audio."}
          </p>
        </div>

        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <motion.div className="form-group" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <label>Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="auth-input" 
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  required={!isLogin}
                />
              </div>
            </motion.div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="hello@example.com" 
                className="auth-input"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="auth-input"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-btn icon-bubble">
            {isLogin ? "Sign In" : "Sign Up"} <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
