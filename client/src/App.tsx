import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import QuizPage from "@/pages/QuizPage";
import ResultsPage from "@/pages/ResultsPage";
import RoommatesPage from "@/pages/RoommatesPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QuizProvider } from "@/context/QuizContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/quiz" component={QuizPage} />
      <Route path="/results" component={ResultsPage} />
      <Route path="/roommates" component={RoommatesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </QuizProvider>
    </QueryClientProvider>
  );
}

export default App;
