import { createContext, useContext, useState, ReactNode } from "react";

interface QuizContextProps {
  answers: Record<number, string>;
  setAnswers: (answers: Record<number, string>) => void;
  resetQuiz: () => void;
}

// Create a default value for the context to avoid undefined
const defaultContextValue: QuizContextProps = {
  answers: {},
  setAnswers: () => {},
  resetQuiz: () => {}
};

const QuizContext = createContext<QuizContextProps>(defaultContextValue);

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
  return context;
};
