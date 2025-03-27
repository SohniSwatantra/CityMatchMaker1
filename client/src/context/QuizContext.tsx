import { createContext, useContext, useState, ReactNode } from "react";

interface QuizContextProps {
  answers: Record<number, string>;
  setAnswers: (answers: Record<number, string>) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const resetQuiz = () => {
    setAnswers({});
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswers, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
