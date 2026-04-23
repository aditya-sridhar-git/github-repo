const PERSPECTIVES = {
  CYBER_MINIMALIST: {
    greeting: "Direct communication established. Efficiency is non-negotiable.",
    tips: [
      "Less is more. Your current cart is optimal.",
      "Aesthetics are secondary to performance. Choose wisely.",
      "Energy consumption detected. Buying this may increase your power bill."
    ]
  },
  FUTURISTIC_ZEN: {
    greeting: "The digital universe breathes with you. Find your center.",
    tips: [
      "Let go of the items that no longer serve your higher digital self.",
      "The Quantum Drive holds not just data, but possibilities.",
      "Patience is a virtue. The Hype Level will settle... but will your soul?"
    ]
  },
  MAXIMALIST_Hype: {
    greeting: "WAKE UP NEO! THE HYPE IS REAL! BUY BUY BUY!",
    tips: [
      "IF IT GLOWS, IT GOES! ADD TO CART NOW!",
      "YOUR FRIENDS ARE ALREADY AUGMENTED. DON'T BE A PEASANT.",
      "THE NEBULA GLASS PRO WILL MAKE YOU A GOD IN THE METAVERSE!"
    ]
  }
};

export const getAiResponse = (mode = 'FUTURISTIC_ZEN') => {
  const personality = PERSPECTIVES[mode] || PERSPECTIVES.FUTURISTIC_ZEN;
  return {
    greeting: personality.greeting,
    tip: personality.tips[Math.floor(Math.random() * personality.tips.length)]
  };
};
