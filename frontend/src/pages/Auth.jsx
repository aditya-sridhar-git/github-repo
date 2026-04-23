import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, Mail, Lock, User, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-magenta-500/10 pointer-events-none" />
      
      <motion.div 
        layout
        className="glass-morphism w-full max-w-md p-10 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-4">
          <Terminal size={14} className="text-white/20" />
        </div>

        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-400/30"
          >
            <Unlock className="text-cyan-400" />
          </motion.div>
          <h1 className="text-3xl font-bold nebula-font mb-2">
            {isLogin ? "Neural Access" : "Consciousness Registration"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin ? "Provide your decryption keys." : "Welcome to the collective."}
          </p>
        </div>

        <form className="space-y-6">
          {!isLogin && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Entity Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="X-742-NEO"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all text-white"
                />
              </div>
            </motion.div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Coordinate ID (Email)</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="nomad@nebula.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Access Protocol (Password)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all text-white"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgb(0, 243, 255)", color: "black" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl border border-cyan-500/50 text-cyan-400 font-bold tracking-widest flex items-center justify-center gap-2 transition-colors"
          >
            {isLogin ? "INITIATE LOGIN" : "START REGISTRATION"} <ArrowRight size={18} />
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
          >
            {isLogin ? "Request New Coordinates?" : "Already Synchronized?"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
