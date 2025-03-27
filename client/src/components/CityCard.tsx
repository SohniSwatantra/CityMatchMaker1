import { motion } from "framer-motion";
import { City } from "@/lib/cities";

interface CityCardProps {
  city: City;
  compact?: boolean;
}

const CityCard = ({ city, compact = false }: CityCardProps) => {
  if (compact) {
    return (
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <div 
          className="w-full h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${city.imageUrl})` }}
        ></div>
        <div className="p-4">
          <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block mb-2">
            {city.matchPercentage}% match
          </div>
          <h3 className="font-medium">{city.name}, {city.state}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition h-full">
      <div 
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${city.imageUrl})` }}
      ></div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
        <div className="flex items-center mb-4">
          <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {city.matchPercentage}% Match
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{city.description}</p>
        <a href="#" className="text-primary font-medium hover:text-blue-700">Learn more →</a>
      </div>
    </div>
  );
};

export default CityCard;
