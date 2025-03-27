import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { questions } from "@/lib/quiz";
import { useQuiz } from "@/context/QuizContext";

export default function QuizPage() {
  const [_, setLocation] = useLocation();
  const { setAnswers, resetQuiz } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [progress, setProgress] = useState(10);

  // Reset quiz when component mounts
  useEffect(() => {
    resetQuiz();
  }, [resetQuiz]);

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      const newProgress = Math.round(((currentQuestion + 2) / questions.length) * 100);
      setProgress(newProgress);
    } else {
      // Save answers and navigate to results
      setAnswers(selectedAnswers);
      setLocation("/results");
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const newProgress = Math.round(((currentQuestion) / questions.length) * 100);
      setProgress(newProgress);
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerId
    });
  };

  const isNextDisabled = selectedAnswers[currentQuestion] === undefined;
  const isPrevDisabled = currentQuestion === 0;

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="pb-8">
        <ProgressBar progress={progress} />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Question {currentQuestion + 1}/{questions.length}</span>
          <span>{progress}%</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestionData.question}</h2>
          <div className="space-y-4">
            {currentQuestionData.answers.map((answer) => (
              <label 
                key={answer.id} 
                className={`block p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                  selectedAnswers[currentQuestion] === answer.id 
                    ? "border-primary bg-blue-50" 
                    : "border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={answer.id}
                    checked={selectedAnswers[currentQuestion] === answer.id}
                    onChange={() => handleAnswerSelect(answer.id)}
                    className="mr-3"
                  />
                  <span>{answer.text}</span>
                </div>
              </label>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={goToPrevQuestion}
          disabled={isPrevDisabled}
          className="text-gray-600 px-6 py-2 border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
        >
          Back
        </Button>
        <Button
          onClick={goToNextQuestion}
          disabled={isNextDisabled}
          className="bg-primary text-white px-6 py-2 hover:bg-blue-600 transition"
        >
          {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
        </Button>
      </div>
    </div>
  );
}
