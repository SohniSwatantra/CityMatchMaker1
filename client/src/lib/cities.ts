export interface City {
  id: number;
  name: string;
  state: string;
  description: string;
  matchPercentage: number;
  imageUrl: string;
}

// Placeholder city data
export const popularCities: City[] = [
  {
    id: 1,
    name: "Boston",
    state: "MA",
    description: "A historic city with excellent walkability, cultural attractions, and educational opportunities.",
    matchPercentage: 91,
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000"
  },
  {
    id: 2,
    name: "Austin",
    state: "TX",
    description: "A vibrant tech hub with great music scene, outdoor activities, and growing job market.",
    matchPercentage: 88,
    imageUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000"
  },
  {
    id: 3,
    name: "Toronto",
    state: "Canada",
    description: "A diverse metropolitan city with excellent public transportation and cultural diversity.",
    matchPercentage: 85,
    imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1000"
  }
];

// For the "other cities you might like" section
export const similarCities: City[] = [
  {
    id: 4,
    name: "Miami",
    state: "FL",
    description: "Coastal city with vibrant nightlife and diverse culture.",
    matchPercentage: 91,
    imageUrl: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=1000"
  },
  {
    id: 5,
    name: "Atlanta",
    state: "GA",
    description: "Major southeastern business hub with affordable living.",
    matchPercentage: 88,
    imageUrl: "https://images.unsplash.com/photo-1512537244317-1f71f8ec8a01?auto=format&fit=crop&w=1000"
  },
  {
    id: 6,
    name: "Toronto",
    state: "Canada",
    description: "Diverse metropolitan city with excellent public transit.",
    matchPercentage: 85,
    imageUrl: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=1000"
  }
];

// Categories for city matching
export const categories = [
  { 
    name: "Affordability", 
    score: 47, 
    color: "yellow" 
  },
  { 
    name: "Walkability", 
    score: 89, 
    color: "green" 
  },
  { 
    name: "Lifestyle", 
    score: 86, 
    color: "blue" 
  },
  { 
    name: "Career", 
    score: 89, 
    color: "indigo" 
  },
  { 
    name: "Social", 
    score: 90, 
    color: "purple" 
  },
  { 
    name: "Dating", 
    score: 84, 
    color: "pink" 
  }
];
