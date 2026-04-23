import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/signup', { username: name, email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Matrix authentication failed');
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

      {/* Floating decorative bubbles in background */}
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

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4 text-sm bg-red-50 p-2 rounded">{error}</div>}
          
          {!isLogin && (
            <motion.div className="form-group" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <label>Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input type="text" placeholder="John Doe" className="auth-input" value={name} onChange={e => setName(e.target.value)} required={!isLogin} />
              </div>
            </motion.div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input type="email" placeholder="hello@example.com" className="auth-input" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input type="password" placeholder="••••••••" className="auth-input" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="auth-btn icon-bubble flex items-center justify-center gap-2">
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
