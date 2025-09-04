
import React from 'react';

interface RoundSummaryProps {
  round: number;
  message: string;
  onNextRound: () => void;
}

const RoundSummary: React.FC<RoundSummaryProps> = ({ round, message, onNextRound }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40 animate-fadeIn">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg text-center max-w-2xl border-2 border-yellow-400">
        <h2 className="font-orbitron text-4xl text-yellow-400 mb-4">End of Round {round}</h2>
        <p className="text-xl text-gray-300 mb-8">{message}</p>
        <button
          onClick={onNextRound}
          className="font-orbitron text-2xl bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-10 rounded-lg transition-colors duration-300"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default RoundSummary;