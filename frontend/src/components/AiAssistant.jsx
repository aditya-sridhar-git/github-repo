import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, X, MessageSquareQuote, Shuffle } from 'lucide-react';
import { getAiResponse } from '../utils/aiEngine';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('FUTURISTIC_ZEN');
  const [message, setMessage] = useState("I'm scanning the matrix for the best deals...");

  const cycleMode = () => {
    const modes = ['CYBER_MINIMALIST', 'FUTURISTIC_ZEN', 'MAXIMALIST_Hype'];
    const next = modes[(modes.indexOf(mode) + 1) % modes.length];
    setMode(next);
    const resp = getAiResponse(next);
    setMessage(resp.greeting);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const resp = getAiResponse(mode);
      setMessage(resp.tip);
    }, 10000);
    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass-morphism p-6 mb-4 w-72 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-full animate-pulse-glow">
                  <BrainCircuit size={20} className="text-cyan-400" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">Nebula Guide</span>
              </div>
              <button 
                onClick={cycleMode}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-500 hover:text-white"
                title="Shift Personality Matrix"
              >
                <Shuffle size={14} />
              </button>
            </div>
            
            <div className="text-[10px] text-magenta-500 mb-2 uppercase font-black">{mode.replace('_', ' ')}</div>
            
            <p className="text-sm italic text-gray-300 leading-relaxed font-medium">
              "{message}"
            </p>
            <div className="absolute top-4 right-4">
              <button onClick={() => setIsOpen(false)}>
                <X size={16} className="text-gray-500 hover:text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/50 flex items-center justify-center"
      >
        <MessageSquareQuote className="text-white" />
      </motion.button>
    </div>
  );
};

export default AiAssistant;
