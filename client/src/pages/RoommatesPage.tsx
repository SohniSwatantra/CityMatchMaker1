import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import RoommateCard from "@/components/RoommateCard";

export default function RoommatesPage() {
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [ageMin, setAgeMin] = useState("18");
  const [ageMax, setAgeMax] = useState("any");
  const [lifestyleFilters, setLifestyleFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  // Fetch roommates data
  const { data: roommates, isLoading } = useQuery({
    queryKey: ['/api/roommates']
  });

  const handleLifestyleChange = (filter: string) => {
    if (lifestyleFilters.includes(filter)) {
      setLifestyleFilters(lifestyleFilters.filter(f => f !== filter));
    } else {
      setLifestyleFilters([...lifestyleFilters, filter]);
    }
  };

  const applyFilters = () => {
    // This would trigger a new API call with filters
    console.log("Applying filters");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find Roommates in Boston
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <div className="flex items-center space-x-4">
                  <Input 
                    type="text" 
                    placeholder="Min" 
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                    className="w-full text-sm"
                  />
                  <span>-</span>
                  <Input 
                    type="text" 
                    placeholder="Max" 
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                    className="w-full text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                <div className="flex items-center space-x-4">
                  <Select value={ageMin} onValueChange={setAgeMin}>
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue placeholder="Min age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18">18+</SelectItem>
                      <SelectItem value="21">21+</SelectItem>
                      <SelectItem value="25">25+</SelectItem>
                      <SelectItem value="30">30+</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>-</span>
                  <Select value={ageMax} onValueChange={setAgeMax}>
                    <SelectTrigger className="w-full text-sm">
                      <SelectValue placeholder="Max age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="50">50+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lifestyle</label>
                <div className="space-y-2">
                  {[
                    "Early riser", 
                    "Night owl", 
                    "Clean/organized", 
                    "Social", 
                    "Quiet/private"
                  ].map((option) => (
                    <div className="flex items-center space-x-2" key={option}>
                      <Checkbox 
                        id={option} 
                        checked={lifestyleFilters.includes(option)}
                        onCheckedChange={() => handleLifestyleChange(option)}
                      />
                      <label 
                        htmlFor={option}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Move-in Date</label>
                <Input 
                  type="date" 
                  value={moveInDate}
                  onChange={(e) => setMoveInDate(e.target.value)}
                  className="w-full text-sm"
                />
              </div>
              
              <Button 
                onClick={applyFilters}
                className="w-full bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Results */}
        <motion.div 
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {isLoading ? "Loading..." : `${roommates?.length || 0} potential roommates`}
              </h3>
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[200px] text-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                    <SelectItem value="budget_low">Sort by: Budget (low to high)</SelectItem>
                    <SelectItem value="budget_high">Sort by: Budget (high to low)</SelectItem>
                    <SelectItem value="move_in">Sort by: Move-in date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading potential roommates...</p>
                </div>
              ) : roommates?.length > 0 ? (
                roommates.map((roommate, index) => (
                  <motion.div
                    key={roommate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <RoommateCard roommate={roommate} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-600">No roommates found matching your criteria.</p>
                </div>
              )}
              
              {roommates?.length > 0 && (
                <div className="mt-6 text-center">
                  <Button variant="outline" className="border border-primary text-primary font-medium py-2 px-6 rounded-md hover:bg-blue-50 transition">
                    Load More
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
