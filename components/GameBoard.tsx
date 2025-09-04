
import React from 'react';
import { Category, Question } from '../types';

interface GameBoardProps {
  categories: Category[];
  onSelectQuestion: (question: Question, catIndex: number, qIndex: number) => void;
  currentRound: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ categories, onSelectQuestion, currentRound }) => {

  const pointThresholds: { [key: number]: number[] } = {
    1: [100, 200],
    2: [300, 400],
    3: [500],
  };

  const getVisiblePointsForRound = () => {
    let visiblePoints: number[] = [];
    for(let i = 1; i <= currentRound; i++) {
        visiblePoints = [...visiblePoints, ...pointThresholds[i]];
    }
    return visiblePoints;
  };
  
  const visiblePoints = getVisiblePointsForRound();

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 bg-black bg-opacity-40 rounded-lg h-full">
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="flex flex-col gap-2 sm:gap-4">
          <div className="h-24 sm:h-32 bg-red-600 text-white rounded-md flex items-center justify-center p-2 text-center font-orbitron text-sm sm:text-xl md:text-2xl uppercase">
            {category.title}
          </div>
          {category.questions.map((question, qIndex) => {
            const isVisible = visiblePoints.includes(question.points);
            
            if (!isVisible) {
              return (
                 <div key={qIndex} className="h-16 sm:h-24 bg-zinc-900 rounded-md flex items-center justify-center cursor-not-allowed opacity-50">
                 </div>
              );
            }

            return (
              <div
                key={qIndex}
                onClick={() => !question.answered && onSelectQuestion(question, catIndex, qIndex)}
                className={`
                  h-16 sm:h-24 rounded-md flex flex-col items-center justify-center p-1 transition-all duration-300
                  ${question.answered
                    ? 'bg-zinc-900 text-zinc-700 cursor-not-allowed'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-yellow-400 cursor-pointer transform hover:scale-105'
                  }
                `}
              >
                {question.answered ? '' : (
                  <>
                    <span className="font-orbitron text-2xl sm:text-4xl">{`$${question.points}`}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      question.difficulty === 'easy' ? 'text-green-400' :
                      question.difficulty === 'medium' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {question.difficulty}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;