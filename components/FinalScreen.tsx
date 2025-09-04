
import React from 'react';
import { ScoreEntry } from '../types';

interface FinalScreenProps {
  score: number;
  nickname: string;
  onPlayAgain: () => void;
  scoreHistory: ScoreEntry[];
  correctAnswers: number;
  incorrectAnswers: number;
  pointsGained: number;
  pointsLost: number;
}

const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6c0 1.954 1.145 3.642 2.802 4.593C5.352 13.064 4 14.893 4 17a1 1 0 001 1h10a1 1 0 001-1c0-2.107-1.352-3.936-2.802-4.407C14.855 11.642 16 9.954 16 8a6 6 0 00-6-6zm0 10a4 4 0 110-8 4 4 0 010 8z" />
        <path d="M3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
    </svg>
);

const FinalScreen: React.FC<FinalScreenProps> = ({ score, nickname, onPlayAgain, scoreHistory, correctAnswers, incorrectAnswers, pointsGained, pointsLost }) => {
  const getTitle = () => {
    if (score > 2000) return "Certified Social Engineering Slayer";
    if (score > 500) return "Cyber Jeopardy Champion";
    if (score > 0) return "Threat Neutralizer";
    return "Back to the Academy";
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fadeIn">
      <div className="bg-black bg-opacity-50 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-2xl border border-yellow-400/30 w-full max-w-3xl">
        <TrophyIcon />
        <h1 className="text-3xl sm:text-5xl font-orbitron text-yellow-400 tracking-wider uppercase my-4">
          Mission Complete, {nickname}!
        </h1>
        <p className="text-lg text-gray-300 mb-2">Final Score:</p>
        <p className="text-7xl font-orbitron text-yellow-400 mb-6">${score}</p>
        <p className="text-xl text-yellow-400 mb-8 italic">"{getTitle()}"</p>

        <div className="my-6 w-full text-left p-4 bg-black bg-opacity-20 rounded-lg border border-yellow-400/10">
            <h3 className="text-xl font-orbitron text-yellow-400 mb-4 text-center">Mission Debriefing</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Correct Answers</p>
                    <p className="text-2xl font-orbitron text-green-400">{correctAnswers}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Points Gained</p>
                    <p className="text-2xl font-orbitron text-green-400">+{pointsGained}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Incorrect Answers</p>
                    <p className="text-2xl font-orbitron text-red-500">{incorrectAnswers}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Points Lost</p>
                    <p className="text-2xl font-orbitron text-red-500">-{pointsLost}</p>
                </div>
            </div>
        </div>
        
        <button
          onClick={onPlayAgain}
          className="font-orbitron text-xl sm:text-2xl bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold py-4 px-12 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-[0_0_15px_rgba(255,204,0,0.6)] mt-4"
        >
          Play Again
        </button>

        {scoreHistory && scoreHistory.length > 0 && (
            <div className="mt-10 w-full">
                <h2 className="text-2xl font-orbitron text-yellow-400 mb-4">Past Missions</h2>
                <div className="max-h-48 overflow-y-auto bg-black bg-opacity-30 rounded-lg p-2 sm:p-4 space-y-2 text-left">
                    {scoreHistory.map((entry, index) => (
                        <div key={index} className={`flex justify-between items-center p-2 rounded ${entry.score === score && entry.nickname === nickname ? 'bg-yellow-400/20' : 'bg-zinc-800/50'}`}>
                            <div className="flex items-center">
                                <span className="font-orbitron text-lg text-yellow-400 mr-4 w-6">{index + 1}.</span>
                                <span className="text-white text-md sm:text-lg truncate">{entry.nickname}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-orbitron text-lg text-yellow-400 mr-2 sm:mr-4">${entry.score}</span>
                                <span className="text-gray-400 text-xs sm:text-sm w-24 sm:w-28 text-right">{formatDate(entry.date)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default FinalScreen;
