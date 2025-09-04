
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GamePhase, Category, Question, ScoreEntry } from './types';
import { GAME_DATA, ROUND_SUMMARIES } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import GameBoard from './components/GameBoard';
import QuestionModal from './components/QuestionModal';
import RoundSummary from './components/RoundSummary';
import FinalScreen from './components/FinalScreen';
import RulesScreen from './components/RulesScreen';

// Helper to deep copy game data
const deepCopy = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

const App: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.Welcome);
  const [score, setScore] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>(deepCopy(GAME_DATA));
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [showRoundSummary, setShowRoundSummary] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [scoreHistory, setScoreHistory] = useState<ScoreEntry[]>([]);
  const [hasSavedCurrentGame, setHasSavedCurrentGame] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [pointsGained, setPointsGained] = useState(0);
  const [pointsLost, setPointsLost] = useState(0);


  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    try {
        const savedScores = localStorage.getItem('cyberJeopardyScores');
        if (savedScores) {
            const parsedScores: ScoreEntry[] = JSON.parse(savedScores);
            setScoreHistory(parsedScores);
        }
    } catch (error) {
        console.error("Failed to load score history:", error);
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const playTheme = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch(error => console.log("Audio play failed:", error));
    }
  }, []);

  const handleStartGame = (name: string) => {
    setNickname(name);
    setGamePhase(GamePhase.Rules);
    playTheme();
  };
  
  const handleViewBoard = () => {
    setGamePhase(GamePhase.Round1);
  }

  const handleSelectQuestion = (question: Question, catIndex: number, qIndex: number) => {
    if (question.answered) return;
    setCurrentQuestion({ ...question, catIndex, qIndex });
  };

  // FIX: Refactored handleAnswer to use a proper type guard with the updated Question type, removing the need for `as any`.
  const handleAnswer = (isCorrect: boolean, points: number, wager: number = 0) => {
    const pointsToUpdate = wager > 0 ? wager : points;

    if (isCorrect) {
      setScore(prev => prev + pointsToUpdate);
      setCorrectAnswers(prev => prev + 1);
      setPointsGained(prev => prev + pointsToUpdate);
    } else {
      setScore(prev => prev - pointsToUpdate);
      setIncorrectAnswers(prev => prev + 1);
      setPointsLost(prev => prev + pointsToUpdate);
    }

    if (currentQuestion && typeof currentQuestion.catIndex === 'number' && typeof currentQuestion.qIndex === 'number') {
      const { catIndex, qIndex } = currentQuestion;
      const newCategories = [...categories];
      newCategories[catIndex].questions[qIndex].answered = true;
      setCategories(newCategories);
    }
    setCurrentQuestion(null);
  };
  
  const checkRoundCompletion = useCallback(() => {
    const pointThresholds: { [key: number]: number[] } = {
        1: [100, 200],
        2: [300, 400],
        3: [500],
    };

    let visiblePoints: number[] = [];
    for (let i = 1; i <= currentRound; i++) {
        if (pointThresholds[i]) {
            visiblePoints = [...visiblePoints, ...pointThresholds[i]];
        }
    }

    const isRoundComplete = categories.every(cat =>
        cat.questions.filter(q => visiblePoints.includes(q.points)).every(q => q.answered)
    );

    if (isRoundComplete && currentRound < 3) {
      setShowRoundSummary(true);
    } else if (isRoundComplete && currentRound === 3) {
        setGamePhase(GamePhase.Finished);
    }
  }, [categories, currentRound]);
  
  useEffect(() => {
    if(gamePhase !== GamePhase.Welcome && gamePhase !== GamePhase.Rules) {
        checkRoundCompletion();
    }
  }, [categories, gamePhase, checkRoundCompletion]);

  useEffect(() => {
    if (gamePhase === GamePhase.Finished && nickname && !hasSavedCurrentGame) {
        const newScoreEntry: ScoreEntry = {
            nickname,
            score,
            date: new Date().toISOString(),
        };

        setScoreHistory(prevHistory => {
            const updatedHistory = [...prevHistory, newScoreEntry]
                .sort((a, b) => b.score - a.score)
                .slice(0, 10); // Keep top 10 scores

            try {
                localStorage.setItem('cyberJeopardyScores', JSON.stringify(updatedHistory));
            } catch (error) {
                console.error("Failed to save score history:", error);
            }
            
            return updatedHistory;
        });

        setHasSavedCurrentGame(true);
    }
  }, [gamePhase, nickname, score, hasSavedCurrentGame]);


  const handleNextRound = () => {
    setShowRoundSummary(false);
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);
    if(nextRound === 2) setGamePhase(GamePhase.Round2);
    if(nextRound === 3) setGamePhase(GamePhase.Round3);
  };
  
  const handlePlayAgain = () => {
    setScore(0);
    setCategories(deepCopy(GAME_DATA));
    setCurrentQuestion(null);
    setCurrentRound(1);
    setShowRoundSummary(false);
    setNickname('');
    setHasSavedCurrentGame(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setPointsGained(0);
    setPointsLost(0);
    setGamePhase(GamePhase.Welcome);
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
  };

  const renderContent = () => {
    if (showRoundSummary) {
      return <RoundSummary round={currentRound} onNextRound={handleNextRound} message={(ROUND_SUMMARIES as any)[currentRound]} />;
    }

    switch (gamePhase) {
      case GamePhase.Welcome:
        return <WelcomeScreen onStart={handleStartGame} />;
      case GamePhase.Rules:
        return <RulesScreen onStart={handleViewBoard} />;
      case GamePhase.Round1:
      case GamePhase.Round2:
      case GamePhase.Round3:
        return <GameBoard categories={categories} onSelectQuestion={handleSelectQuestion} currentRound={currentRound} />;
      case GamePhase.Finished:
        return <FinalScreen 
            score={score} 
            nickname={nickname} 
            onPlayAgain={handlePlayAgain} 
            scoreHistory={scoreHistory} 
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            pointsGained={pointsGained}
            pointsLost={pointsLost}
        />;
      default:
        return <WelcomeScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <audio ref={audioRef} src="https://archive.org/download/20210214_20210214_1804/Jeopardy%21%20Theme%20Song.mp3" muted={isMuted}></audio>
      
      {gamePhase !== GamePhase.Welcome && gamePhase !== GamePhase.Finished && (
        <header className="w-full max-w-7xl flex justify-between items-center mb-6 p-4 bg-black bg-opacity-30 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-4xl font-orbitron text-yellow-400 tracking-widest uppercase">Cyber Jeopardy</h1>
          <div className="flex items-center space-x-4 sm:space-x-6">
             <div className="text-right">
                <div className="text-lg sm:text-2xl font-orbitron text-white truncate">{nickname}</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase">Operator</div>
            </div>
             <button onClick={toggleMute} className="p-2 rounded-full bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-yellow-400 transition-colors">
                {isMuted ? <MuteIcon /> : <SoundIcon />}
             </button>
            <div className="text-center">
                <div className="text-xl sm:text-3xl font-orbitron text-yellow-400">${score}</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase">Score</div>
            </div>
          </div>
        </header>
      )}

      <main className="w-full max-w-7xl flex-grow">
        {renderContent()}
      </main>

      {currentQuestion && <QuestionModal question={currentQuestion} score={score} onAnswer={handleAnswer} />}
    </div>
  );
};


const SoundIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);
const MuteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l-4-4m0 4l4-4" />
    </svg>
);


export default App;
