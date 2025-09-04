
import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fadeIn">
      <div className="bg-black bg-opacity-50 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-2xl border border-yellow-400/30">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-orbitron text-yellow-400 tracking-widest uppercase mb-4" style={{textShadow: '0 0 10px #ffcc00, 0 0 20px #ffcc00'}}>
          Cyber Jeopardy
        </h1>
        <p className="max-w-3xl text-lg sm:text-xl text-gray-300 leading-relaxed mx-auto my-8">
          You are stepping into the shoes of a CISO under pressure. Each correct answer earns you points and defenses. Each wrong answer weakens your defenses. Can you survive the breach?
        </p>
        <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-sm mx-auto">
          <label htmlFor="nickname-input" className="sr-only">Enter your Nickname</label>
          <input
            id="nickname-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Nickname..."
            className="font-orbitron text-xl text-center bg-zinc-800/50 border-2 border-yellow-400/50 rounded-lg py-3 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 w-full"
            aria-label="Enter your nickname"
            autoComplete="off"
          />
          <button
            onClick={() => onStart(name)}
            disabled={!name.trim()}
            className="font-orbitron text-xl sm:text-2xl bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold py-4 px-12 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-[0_0_15px_rgba(255,204,0,0.6)] disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
          >
            Begin Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;