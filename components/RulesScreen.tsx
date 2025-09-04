
import React, { useState } from 'react';
import { GAME_DATA } from '../constants';

interface RulesScreenProps {
  onStart: () => void;
}

const RuleCard: React.FC<{ category: string, points: number[] }> = ({ category, points }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="perspective w-full h-48" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
            <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden bg-zinc-800 border-2 border-yellow-400 rounded-lg flex items-center justify-center p-4">
                    <h3 className="text-2xl font-orbitron text-center text-yellow-400">{category}</h3>
                </div>
                <div className="absolute w-full h-full backface-hidden bg-zinc-700 border-2 border-yellow-400 rounded-lg flex flex-col items-center justify-center p-4 rotate-y-180">
                     <h3 className="text-lg font-bold text-white mb-2">{category}</h3>
                     <div className="flex flex-wrap gap-2 justify-center">
                        {points.map(p => <span key={p} className="bg-yellow-400 text-zinc-900 font-bold px-3 py-1 rounded-md text-sm">{p}</span>)}
                     </div>
                </div>
            </div>
        </div>
    );
};

const RulesScreen: React.FC<RulesScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fadeIn">
       <h2 className="text-4xl font-orbitron text-yellow-400 mb-6">Mission Briefing</h2>

       <div className="w-full max-w-5xl bg-black bg-opacity-30 rounded-lg p-6 mb-8 text-left text-gray-300 border border-yellow-400/20">
         <h3 className="text-2xl font-orbitron text-yellow-400 mb-4">How to Play:</h3>
         <ul className="list-disc list-inside space-y-2 text-md sm:text-lg">
           <li>Your objective is to score as many points as possible by answering cybersecurity questions correctly.</li>
           <li>Select a category and point value from the board to reveal a question.</li>
           <li><span className="text-green-400 font-semibold">Correct answers</span> add the question's value to your score.</li>
           <li><span className="text-red-500 font-semibold">Incorrect answers</span> or running out of time will deduct the value from your score.</li>
           <li>The game has three rounds of increasing difficulty. Higher point values unlock as you progress.</li>
           <li>Watch out for special <span className="text-yellow-400 font-semibold">Risk/Reward</span> questions where you must wager a portion of your score!</li>
         </ul>
       </div>
       
       <h3 className="text-3xl font-orbitron text-yellow-400 mb-6">Threat Categories</h3>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mb-12">
            {GAME_DATA.map(category => (
                <RuleCard key={category.title} category={category.title} points={category.questions.map(q => q.points)} />
            ))}
       </div>

       <button
          onClick={onStart}
          className="font-orbitron text-xl sm:text-2xl bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 shadow-[0_0_15px_rgba(212,5,17,0.6)]"
        >
          Go to the Board
        </button>
    </div>
  );
};

export default RulesScreen;
