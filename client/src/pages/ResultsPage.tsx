import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CircleProgress from "@/components/CircleProgress";
import ProgressBar from "@/components/ProgressBar";
import CityCard from "@/components/CityCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuiz } from "@/context/QuizContext";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function ResultsPage() {
  const [_, setLocation] = useLocation();
  const { answers } = useQuiz();
  const [animatedScore, setAnimatedScore] = useState(0);

  // If there are no answers, redirect to quiz
  useEffect(() => {
    if (Object.keys(answers).length === 0) {
      setLocation("/quiz");
    }
  }, [answers, setLocation]);

  // Fetch city match results
  const { data: matchResults, isLoading } = useQuery({
    queryKey: ['/api/city-match'],
    enabled: Object.keys(answers).length > 0
  });

  useEffect(() => {
    if (matchResults?.score) {
      const targetScore = matchResults.score;
      const duration = 1500;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      
      const animate = () => {
        if (frame < totalFrames) {
          const progress = Math.min(frame / totalFrames, 1);
          const currentValue = Math.round(progress * targetScore);
          setAnimatedScore(currentValue);
          frame++;
          requestAnimationFrame(animate);
        } else {
          setAnimatedScore(targetScore);
        }
      };
      
      animate();
    }
  }, [matchResults]);

  const goToRoommates = () => {
    setLocation("/roommates");
  };

  if (isLoading || !matchResults) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your answers...</p>
        </div>
      </div>
    );
  }

  const { 
    city, 
    score, 
    tagline, 
    categories, 
    similarCities 
  } = matchResults;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8 px-4 lg:px-8">
          <h1 className="text-3xl font-bold">{city}</h1>
          <p className="text-xl">{tagline}</p>
          <p className="text-white bg-white bg-opacity-20 inline-block px-2 py-1 rounded mt-2">{score}% Match</p>
        </div>
        
        <div className="pt-6 pb-10 px-4 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="border-b pb-6 mb-6 w-full justify-start gap-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="compare">Compare Cities</TabsTrigger>
              <TabsTrigger value="costs">Living Costs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <CircleProgress percentage={animatedScore} />
                </div>
                
                <div>
                  <p className="text-gray-700 mb-6">
                    Based on what you've told us, we've calculated the right mix
                    of opportunities and lifestyle that align with what matters most to you.
                  </p>
                  
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{category.name}</span>
                          <span>{category.score}%</span>
                        </div>
                        <ProgressBar 
                          progress={category.score} 
                          color={category.color} 
                          height="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Other Cities You Might Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarCities.map((city, index) => (
                    <motion.div
                      key={city.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <CityCard city={city} compact />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Button 
                  onClick={goToRoommates}
                  className="bg-black text-white font-medium py-3 px-6 rounded-lg shadow hover:bg-gray-800 transition"
                >
                  Find Roommates
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="compare" className="mt-0">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-4">City Comparison</h3>
                <p className="text-gray-600">
                  Compare {city} with other cities based on cost of living,
                  job opportunities, and quality of life factors.
                </p>
                <div className="mt-6">
                  <Button variant="outline" className="mr-4">Compare with New York</Button>
                  <Button variant="outline" className="mr-4">Compare with Los Angeles</Button>
                  <Button variant="outline">Add City</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="costs" className="mt-0">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Living Costs in {city}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Housing</h4>
                    <p className="text-gray-700 mb-4">
                      Median 1BR Apartment: $2,200/month<br />
                      Median 2BR Apartment: $2,800/month
                    </p>
                    
                    <h4 className="font-medium mb-2">Transportation</h4>
                    <p className="text-gray-700 mb-4">
                      Monthly Transit Pass: $90<br />
                      Avg. Rideshare Trip: $18
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Food & Dining</h4>
                    <p className="text-gray-700 mb-4">
                      Meal at Inexpensive Restaurant: $18<br />
                      Monthly Grocery Estimate: $400
                    </p>
                    
                    <h4 className="font-medium mb-2">Utilities</h4>
                    <p className="text-gray-700">
                      Basic Utilities: $150/month<br />
                      Internet: $65/month
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}
