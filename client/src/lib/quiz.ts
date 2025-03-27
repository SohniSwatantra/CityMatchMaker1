export interface QuizQuestion {
  id: number;
  question: string;
  answers: {
    id: string;
    text: string;
    value: string;
  }[];
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your monthly rent or housing budget?",
    answers: [
      { id: "budget_1", text: "Under $1,000", value: "under1000" },
      { id: "budget_2", text: "$1,000 - $1,500", value: "1000-1500" },
      { id: "budget_3", text: "$1,500 - $2,000", value: "1500-2000" },
      { id: "budget_4", text: "$2,000 - $3,000", value: "2000-3000" },
      { id: "budget_5", text: "Over $3,000", value: "3000plus" }
    ]
  },
  {
    id: 2,
    question: "Will you have a car where you live?",
    answers: [
      { id: "car_1", text: "Yes, I need a car", value: "yes" },
      { id: "car_2", text: "No, I prefer public transportation", value: "no" },
      { id: "car_3", text: "I'd prefer not to need one, but it's not a dealbreaker", value: "maybe" }
    ]
  },
  {
    id: 3,
    question: "Do you want to live in the heart of the city where everything is walkable?",
    answers: [
      { id: "walkable_1", text: "Very important to me", value: "very-important" },
      { id: "walkable_2", text: "Somewhat important", value: "somewhat-important" },
      { id: "walkable_3", text: "Not important to me", value: "not-important" },
      { id: "walkable_4", text: "I prefer suburban living", value: "prefer-suburbs" }
    ]
  },
  {
    id: 4,
    question: "Do you care about the weather?",
    answers: [
      { id: "weather_1", text: "Yes, I prefer warm weather year-round", value: "warm" },
      { id: "weather_2", text: "Yes, I like experiencing all four seasons", value: "seasons" },
      { id: "weather_3", text: "Weather isn't a big factor for me", value: "not-important" }
    ]
  },
  {
    id: 5,
    question: "How important is access to outdoor activities?",
    answers: [
      { id: "outdoor_1", text: "Very important - I need mountains, trails, etc.", value: "very-important" },
      { id: "outdoor_2", text: "Somewhat important - parks and green spaces are sufficient", value: "somewhat-important" },
      { id: "outdoor_3", text: "Not important - I'm more of an indoor person", value: "not-important" }
    ]
  },
  {
    id: 6,
    question: "Do you plan to use a coworking space?",
    answers: [
      { id: "coworking_1", text: "Yes, regularly", value: "regularly" },
      { id: "coworking_2", text: "Occasionally", value: "occasionally" },
      { id: "coworking_3", text: "No, I'll work from home or office", value: "no" }
    ]
  },
  {
    id: 7,
    question: "How important is the dining and food scene?",
    answers: [
      { id: "food_1", text: "Very important - I'm a foodie", value: "very-important" },
      { id: "food_2", text: "Somewhat important - I enjoy restaurants occasionally", value: "somewhat-important" },
      { id: "food_3", text: "Not important - I mostly cook at home", value: "not-important" }
    ]
  },
  {
    id: 8,
    question: "What's your ideal social environment?",
    answers: [
      { id: "social_1", text: "Vibrant nightlife and entertainment options", value: "nightlife" },
      { id: "social_2", text: "Cultural events and community activities", value: "cultural" },
      { id: "social_3", text: "Quiet and peaceful with limited social options", value: "quiet" },
      { id: "social_4", text: "Family-friendly environment", value: "family" }
    ]
  },
  {
    id: 9,
    question: "How important is the dating scene to you?",
    answers: [
      { id: "dating_1", text: "Very important", value: "very-important" },
      { id: "dating_2", text: "Somewhat important", value: "somewhat-important" },
      { id: "dating_3", text: "Not important", value: "not-important" },
      { id: "dating_4", text: "I'm in a relationship / not looking to date", value: "not-applicable" }
    ]
  },
  {
    id: 10,
    question: "What type of career opportunities are you looking for?",
    answers: [
      { id: "career_1", text: "Tech and startups", value: "tech" },
      { id: "career_2", text: "Finance and business", value: "finance" },
      { id: "career_3", text: "Arts and creative industries", value: "creative" },
      { id: "career_4", text: "Healthcare or education", value: "healthcare-education" },
      { id: "career_5", text: "Any industry with good opportunities", value: "any" }
    ]
  }
];
