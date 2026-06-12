export interface WordItem {
  id: string;
  word: string;
  arabic: string;
  image: string; // illustration placeholder or standard emoji/web icon
  example: string;
  soundText: string;
  unit: number;
}

export interface UnitItem {
  id: number;
  title: string;
  arabicTitle: string;
  color: string;
  icon: string;
  lessons: Lesson[];
  words: WordItem[];
}

export interface Lesson {
  id: number;
  title: string;
  type: "phonics" | "vocab" | "conversation" | "game" | "song";
  content: {
    dialogue?: Array<{ speaker: string; text: string; voice?: string }>;
    letters?: string[];
    games?: QuizGame[];
    vocabulary?: WordItem[];
    songText?: string;
  };
}

export interface QuizGame {
  question: string;
  answers: string[];
  correctAnswer: string;
  imageHint?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
