import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Heart, ArrowUpRight, Play, Settings, Box, Share2, Music, CheckCircle, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import AiAssistant from '../components/AiAssistant';
import '../Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching artifacts:", err));
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor = selectedColor ? p.neonColor === selectedColor : true;
    return matchesSearch && matchesColor;
  });

  const heroProduct = filteredProducts.length > 0 ? filteredProducts[0] : null;
  const sidebarProducts = filteredProducts.slice(1, 4);
  const dbColors = [...new Set(products.map(p => p.neonColor))].slice(0, 5); // dynamically get colors from DB

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
            placeholder="Search artifacts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn icon-bubble">
            <Search size={16} />
          </button>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="icon-btn icon-bubble hover-enlarge">
            <ShoppingBag size={20} />
          </Link>
          <button 
            className="icon-btn heart icon-bubble hover-enlarge"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={20} fill={isLiked ? "#ff4d4f" : "none"} color={isLiked ? "#ff4d4f" : "#1a1a1a"} />
          </button>
          <Link to="/auth" className="user-profile hover:opacity-80 transition-opacity">
            <User size={18} />
          </Link>
        </div>
      </nav>

      {/* Main Grid Layout */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[500px] bg-white rounded-3xl shadow-sm border border-gray-100 mt-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
             <Search size={24} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold">No artifacts found</h2>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          {(searchQuery || selectedColor) && (
            <button 
              onClick={() => { setSearchQuery(''); setSelectedColor(null); }}
              className="mt-4 px-6 py-2 bg-black text-white rounded-full font-medium transition hover:bg-gray-800"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="home-grid">
            {/* Left Hero Section */}
            <div className="main-hero-section">
              <div className="hero-card">
                <div className="hero-content">
                  <div className="music-tag">
                    <Music size={16} /> Featured Artifact
                  </div>
                  
                  <h1 className="hero-title display-font">{heroProduct.title}</h1>
                  
                  <div className="hero-subtitle-container">
                    <span className="hero-number">01</span>
                    <div className="w-16 h-px bg-gray-300"></div>
                    <div className="hero-subtitle-text">
                      <h4>{heroProduct.category}</h4>
                      <p>{heroProduct.description}</p>
                    </div>
                  </div>
                  
                  <Link to={`/product/${heroProduct._id}`} className="view-btn icon-bubble">
                    View Detail
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
                  <div className="floating-dot dot-1 bubble-float-slow"></div>
                  <div className="floating-dot dot-2 bubble-float-alt"></div>
                  <div className="floating-dot dot-3 bubble-float"></div>
                  <div className="floating-dot dot-4 bubble-float-slow"></div>
                  
                  <img src={heroProduct.image} alt={heroProduct.title} className="hero-image" />
                </div>
              </div>
            </div>

            {/* Right Sidebar Section */}
            <div className="right-sidebar">
              <div className="color-card">
                <h3>Filter by Color</h3>
                <div className="color-options flex gap-2">
                  {dbColors.length > 0 ? dbColors.map(color => (
                    <div 
                      key={color}
                      className="color-circle cursor-pointer transition-transform" 
                      style={{
                        background: color,
                        width: '30px', height: '30px', borderRadius: '50%',
                        transform: selectedColor === color ? 'scale(1.3)' : 'none',
                        border: selectedColor === color ? '2px solid #1a1a1a' : '2px solid transparent',
                        boxShadow: selectedColor === color ? `0 0 10px ${color}` : 'none'
                      }}
                      onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                      title="Click to toggle filter"
                    ></div>
                  )) : (
                    <div className="text-gray-400 text-sm">No colors available.</div>
                  )}
                </div>
                {selectedColor && (
                  <button 
                    onClick={() => setSelectedColor(null)} 
                    className="mt-3 text-xs bg-gray-100 px-3 py-1 rounded-full text-black hover:bg-gray-200"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {sidebarProducts.map(product => (
                <ProductCard 
                  key={product._id}
                  product={{
                    id: product._id,
                    title: product.title,
                    subtitle: `$${product.price} - ${product.category}`,
                    image: product.image
                  }} 
                />
              ))}
              
            </div>
          </div>

          {/* Bottom Row */}
          <div className="bottom-cards mt-6">
            <div className="product-card half-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">More Products</h3>
                  <p className="text-xs text-gray-500">{products.length} plus items.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center icon-bubble bubble-float-slow">
                  <Heart size={16} fill="#ff4d4f" color="#ff4d4f" />
                </div>
              </div>
              <div className="mini-products">
                {filteredProducts.slice(4, 7).map(p => (
                  <Link key={p._id} to={`/product/${p._id}`} className="mini-product icon-bubble hover-enlarge">
                    <img src={p.image} alt={p.title} />
                  </Link>
                ))}
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

            <div className="product-card large-card" style={{ background: heroProduct.neonColor }}>
              <div className="flex justify-between mb-4 relative z-10 text-white">
                <div className="pastel-tag bg-black/20 text-white border-0">
                  <Heart size={12} fill="#ff4d4f" color="#ff4d4f" /> Popular
                </div>
                <Link to={`/product/${heroProduct._id}`} className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center icon-bubble bubble-float">
                  <ArrowUpRight size={16} />
                </Link>
              </div>
              <h3 className="font-semibold text-lg relative z-10 w-1/2 text-white">{heroProduct.title} Is Trending Now</h3>
            </div>
          </div>
        </>
      )}
      
      <AiAssistant />
    </div>
  );
};

export default Home;
