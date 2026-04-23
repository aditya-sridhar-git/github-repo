import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Looking for the perfect sound?");

  useEffect(() => {
    const tips = [
      "The new Gen X-Bud has an incredible 40h battery life.",
      "Match your headphones with your outfit—check our Popular Colors.",
      "Need immersive gaming? The Light Grey Surface Headphone is top-tier."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setMessage(tips[i]);
      i = (i + 1) % tips.length;
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="card p-5 mb-4 w-72 relative shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-pastel-mint flex items-center justify-center">
                <Sparkles size={16} className="text-emerald-700" />
              </div>
              <span className="font-semibold text-sm">Nitec Guide</span>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
              {message}
            </p>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-accent-lime shadow-md flex items-center justify-center text-text-primary icon-bubble bubble-float"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default AiAssistant;
