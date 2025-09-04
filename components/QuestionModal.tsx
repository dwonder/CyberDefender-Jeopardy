import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';

interface QuestionModalProps {
  question: Question;
  score: number;
  onAnswer: (isCorrect: boolean, points: number, wager?: number) => void;
}

const CountdownTimer: React.FC<{ onTimeUp: () => void }> = ({ onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(30);
    
    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onTimeUp]);

    const percentage = (timeLeft / 30) * 100;
    const barColor = percentage > 50 ? 'bg-green-500' : percentage > 25 ? 'bg-yellow-400' : 'bg-red-500';

    return (
        <div className="w-full">
            <div className="text-4xl font-orbitron text-center mb-2">{timeLeft}</div>
            <div className="w-full bg-gray-700 rounded-full h-4">
                <div className={`${barColor} h-4 rounded-full transition-all duration-1000 ease-linear`} style={{width: `${percentage}%`}}></div>
            </div>
        </div>
    );
};

const QuestionModal: React.FC<QuestionModalProps> = ({ question, score, onAnswer }) => {
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wager, setWager] = useState<string>('');
  const [wagerError, setWagerError] = useState<string | null>(null);
  const isWagerQuestion = question.isWager || question.isDoubleJeopardy;
  const [wagerSet, setWagerSet] = useState(!isWagerQuestion);
  
  const finalJeopardyAudioRef = useRef<HTMLAudioElement>(null);
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement>(null);
  const wagerLockAudioRef = useRef<HTMLAudioElement>(null);

  const maxWager = score > 0 ? score : 0;
  
  useEffect(() => {
    if (isWagerQuestion) {
      setWagerError("Please enter a wager.");
    }
  }, [isWagerQuestion]);

  const handleAnswerClick = (index: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(index);
    const isCorrect = index === question.correctAnswerIndex;
    
    if (isCorrect) {
        correctAudioRef.current?.play().catch(e => console.error("Audio play error", e));
    } else {
        incorrectAudioRef.current?.play().catch(e => console.error("Audio play error", e));
    }

    const points = question.points;
    const effectiveWager = isWagerQuestion ? Number(wager) : 0;
    
    setTimeout(() => {
        onAnswer(isCorrect, points, effectiveWager);
    }, 2000); // Delay to show correct/incorrect status
  };
  
  const handleTimeUp = () => {
    if (answered) return;
    incorrectAudioRef.current?.play().catch(e => console.error("Audio play error", e));
    setAnswered(true);
    const points = question.points;
    const effectiveWager = isWagerQuestion ? Number(wager) : 0;

    setTimeout(() => {
        onAnswer(false, points, effectiveWager);
    }, 1000);
  };

  const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setWager(value); // Update state to show user's input

      const numValue = Number(value);

      if (value.trim() === '') {
          setWagerError("Wager cannot be empty.");
      } else if (isNaN(numValue) || !Number.isInteger(numValue)) {
          setWagerError("Please enter a valid whole number.");
      } else if (numValue <= 0) {
          setWagerError("Wager must be a positive number.");
      } else if (numValue > maxWager) {
          setWagerError(`Wager cannot exceed your score of $${score}.`);
      } else {
          setWagerError(null);
      }
  };
  
  const confirmWager = () => {
      if (!wagerError && Number(wager) > 0) {
        wagerLockAudioRef.current?.play().catch(e => console.error("Audio play error", e));
        setWagerSet(true);
      }
  };
  
  useEffect(() => {
      if (wagerSet && question.points > 200) {
        finalJeopardyAudioRef.current?.play().catch(e => console.error("Audio play error", e));
      }
  }, [wagerSet, question.points]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-gray-800 border-4 border-yellow-400 rounded-lg shadow-2xl p-6 sm:p-10 w-full max-w-4xl text-white">
        <audio ref={finalJeopardyAudioRef} src="https://archive.org/download/final-jeopardy/Final%20Jeopardy.mp3"></audio>
        <audio ref={correctAudioRef} src="https://archive.org/download/correct-answer-sound-effect/correct-answer-sound-effect.mp3"></audio>
        <audio ref={incorrectAudioRef} src="https://archive.org/download/Wrong-answer-sound-effect/Wrong-answer-sound-effect.mp3"></audio>
        <audio ref={wagerLockAudioRef} src="https://archive.org/download/click-on-sounding/click-on-sounding.mp3"></audio>

        {!wagerSet ? (
            <div className="text-center">
                <h2 className="font-orbitron text-3xl text-yellow-400 mb-4">{question.isDoubleJeopardy ? 'DOUBLE JEOPARDY!' : 'Risk/Reward!'}</h2>
                <p className="text-xl mb-6">Wager an amount of your score. You can wager up to ${maxWager}.</p>
                <div className="flex flex-col items-center gap-2">
                    <input 
                        type="number"
                        value={wager}
                        onChange={handleWagerChange}
                        className="bg-gray-900 text-white font-orbitron text-3xl text-center w-64 p-3 rounded-lg border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        max={maxWager}
                        min={1}
                        placeholder="Enter Wager"
                    />
                    {<p className="text-red-500 text-sm h-5 mt-1">{wagerError || ''}</p>}
                    <button 
                        onClick={confirmWager} 
                        className="font-orbitron text-xl bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors mt-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        disabled={!!wagerError || wager.trim() === '' || Number(wager) <= 0}
                    >
                        Lock In Wager
                    </button>
                </div>
            </div>
        ) : (
            <>
                {question.isDoubleJeopardy && <h2 className="font-orbitron text-4xl text-center text-red-500 mb-4 animate-pulse">DOUBLE JEOPARDY!</h2>}
                <div className="text-center mb-6 flex items-center justify-center gap-4">
                    <span className="font-orbitron text-3xl text-yellow-400">${isWagerQuestion ? Number(wager) : question.points}</span>
                    <span className={`text-sm font-bold uppercase px-3 py-1 rounded-full ${
                        question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                        question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-500'
                    }`}>
                        {question.difficulty}
                    </span>
                </div>
                <h3 className="text-2xl sm:text-3xl text-center leading-relaxed mb-8">{question.question}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {question.options.map((option, index) => {
                    const isCorrectAnswer = index === question.correctAnswerIndex;
                    const isSelectedAnswer = index === selectedAnswer;
                    
                    let buttonClass = 'bg-zinc-700 hover:bg-zinc-600';

                    if (answered) {
                        if (isCorrectAnswer) {
                            buttonClass = 'bg-green-600';
                        } else if (isSelectedAnswer && !isCorrectAnswer) {
                            buttonClass = 'bg-red-600';
                        } else {
                            buttonClass = 'bg-zinc-700 opacity-60';
                        }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={answered}
                        className={`p-4 rounded-lg text-lg text-left transition-colors duration-300 ${buttonClass} disabled:cursor-not-allowed`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {!answered && <CountdownTimer onTimeUp={handleTimeUp} />}
            </>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;