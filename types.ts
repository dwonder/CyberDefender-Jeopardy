
export interface Question {
  points: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  answered: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  isDoubleJeopardy?: boolean;
  isWager?: boolean;
  // FIX: Add optional properties to track the question's indices, resolving the type error in App.tsx.
  catIndex?: number;
  qIndex?: number;
}

export interface Category {
  title: string;
  questions: Question[];
}

export enum GamePhase {
  Welcome,
  Rules,
  Round1,
  Round2,
  Round3,
  RoundSummary,
  Finished,
}

export interface ScoreEntry {
  nickname: string;
  score: number;
  date: string;
}