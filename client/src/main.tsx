import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QuizProvider } from "./context/QuizContext";

createRoot(document.getElementById("root")!).render(
  <QuizProvider>
    <App />
  </QuizProvider>
);
