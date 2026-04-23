import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Heart, ArrowUpRight, Play, Settings, Box, Share2, Music, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import AiAssistant from '../components/AiAssistant';
import '../Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');

  const handleSearch = () => {
    if (searchQuery) alert('Searching for: ' + searchQuery);
  };

  return (
    <div className="home-wrapper">
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center font-bold text-lg">N</div>
          nitec.
        </Link>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-btn icon-bubble" onClick={handleSearch}>
            <Search size={16} />
          </button>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="icon-btn icon-bubble bubble-float-slow">
            <ShoppingBag size={20} />
          </Link>
          <button 
            className="icon-btn heart icon-bubble bubble-float-alt"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={20} fill={isLiked ? "#ff4d4f" : "none"} color={isLiked ? "#ff4d4f" : "#1a1a1a"} />
          </button>
          <Link to="/auth" className="user-profile hover:opacity-80 transition-opacity">
            <span>Ryman Alex</span>
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
              alt="User profile" 
              className="user-avatar"
            />
          </Link>
        </div>
      </nav>

      {/* Main Grid Layout */}
      <div className="home-grid">
        {/* Left Hero Section */}
        <div className="main-hero-section">
          <div className="hero-card">
            <div className="hero-content">
              <div className="music-tag">
                <Music size={16} /> Music is Classic
              </div>
              
              <h1 className="hero-title display-font">Sequoia Inspiring Musico.</h1>
              
              <div className="hero-subtitle-container">
                <span className="hero-number">01</span>
                <div className="w-16 h-px bg-gray-300"></div>
                <div className="hero-subtitle-text">
                  <h4>Clear Sounds</h4>
                  <p>Making your dream music come true stay with Sequios Sounds!</p>
                </div>
              </div>
              
              <Link to="/product/1" className="view-btn icon-bubble">
                View All Products
                <span className="btn-arrow icon-bubble bubble-float-alt">
                  <ArrowUpRight size={20} />
                </span>
              </Link>

              <div className="social-links mt-auto">
                <span>Follow us on:</span>
                <div className="social-icon icon-bubble bubble-float-slow"><span className="text-sm font-bold">X</span></div>
                <div className="social-icon icon-bubble bubble-float"><Play size={14} /></div>
                <div className="social-icon icon-bubble bubble-float-alt"><Share2 size={14} /></div>
                <div className="social-icon icon-bubble bubble-float-slow"><span className="text-sm font-bold">in</span></div>
              </div>
            </div>

            <div className="hero-image-container bubble-float">
              {/* Floating decorative bubbles */}
              <div className="floating-dot dot-1 bubble-float-slow"></div>
              <div className="floating-dot dot-2 bubble-float-alt"></div>
              <div className="floating-dot dot-3 bubble-float"></div>
              <div className="floating-dot dot-4 bubble-float-slow"></div>
              
              <img src="/blue_headphones.png" alt="Sequoia Headphones" className="hero-image" />
            </div>
          </div>
        </div>

        {/* Right Sidebar Section */}
        <div className="right-sidebar">
          {/* Popular Colors */}
          <div className="color-card">
            <h3>Popular Colors</h3>
            <div className="color-options">
              {['#3b82f6', '#f97316', '#22c55e', '#ef4444', '#06b6d4'].map(color => (
                <div 
                  key={color}
                  className="color-circle" 
                  style={{
                    background: color,
                    transform: selectedColor === color ? 'scale(1.2)' : 'none',
                    borderColor: selectedColor === color ? '#1a1a1a' : 'white'
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Product Cards */}
          <ProductCard 
            product={{
              id: 2,
              title: "New Gen X-Bud",
              image: "/white_earbuds.png"
            }} 
          />
          
          <ProductCard 
            product={{
              id: 3,
              title: "Light Grey Surface Headphone",
              subtitle: "Boosted with bass",
              image: "/vr_headset.png"
            }} 
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bottom-cards mt-6">
        <div className="product-card half-card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">More Products</h3>
              <p className="text-xs text-gray-500">460 plus items.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center icon-bubble bubble-float-slow">
              <Heart size={16} fill="#ff4d4f" color="#ff4d4f" />
            </div>
          </div>
          <div className="mini-products">
            <Link to="/product/2" className="mini-product icon-bubble hover-enlarge"><img src="/white_earbuds.png" alt="item" /></Link>
            <Link to="/product/3" className="mini-product icon-bubble hover-enlarge"><img src="/vr_headset.png" alt="item" /></Link>
            <Link to="/product/1" className="mini-product icon-bubble hover-enlarge"><img src="/blue_headphones.png" alt="item" /></Link>
          </div>
        </div>

        <div className="stats-card">
          <div className="avatars">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="user" />
            <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100" alt="user" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="user" />
          </div>
          <div className="stat-circle icon-bubble bubble-float-alt">
            <h3>5m+</h3>
            <p>Downloads</p>
          </div>
          <div className="rating-pill mt-4 icon-bubble bubble-float-slow">
            <Star size={14} fill="#fbbf24" color="#fbbf24" /> 4.6 reviews
          </div>
        </div>

        <div className="product-card large-card">
          <div className="flex justify-between mb-4 relative z-10">
            <div className="pastel-tag bg-white">
              <Heart size={12} fill="#ff4d4f" color="#ff4d4f" /> Popular
            </div>
            <Link to="/product/1" className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm icon-bubble bubble-float">
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <h3 className="font-semibold text-lg relative z-10 w-1/2">Listening Has Been Released</h3>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden rounded-r-xl bubble-float-slow bg-gradient-to-br from-pastel-mint to-blue-200 flex items-center justify-center">
            <img src="/blue_headphones.png" alt="hand holding device" className="w-[80%] h-[80%] object-contain" />
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              <Star size={12} fill="#fbbf24" color="#fbbf24" /> 4.7
            </div>
          </div>
          <div className="flex gap-2 mt-auto relative z-10">
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 bubble-float">
               <img src="/white_earbuds.png" className="w-full h-full object-cover" alt="item" />
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 bubble-float-alt">
               <img src="/vr_headset.png" className="w-full h-full object-cover" alt="item" />
            </div>
          </div>
        </div>
      </div>
      
      <AiAssistant />
    </div>
  );
};

export default Home;
