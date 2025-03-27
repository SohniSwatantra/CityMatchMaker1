import { 
  users, type User, type InsertUser, 
  cities, type City, type InsertCity,
  roommates, type Roommate, type InsertRoommate,
  quizAnswers, type QuizAnswers, type InsertQuizAnswers
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // City methods
  getAllCities(): Promise<City[]>;
  getCityById(id: number): Promise<City | undefined>;
  getSimilarCities(cityId?: number): Promise<any[]>;
  
  // Roommate methods
  getAllRoommates(): Promise<Roommate[]>;
  getRoommateById(id: number): Promise<Roommate | undefined>;
  getRoommatesByCityId(cityId: number): Promise<Roommate[]>;
  filterRoommates(filters: any): Promise<Roommate[]>;
  
  // Quiz methods
  saveQuizAnswers(answers: InsertQuizAnswers): Promise<QuizAnswers>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cities: Map<number, City>;
  private roommates: Map<number, Roommate>;
  private quizAnswers: Map<number, QuizAnswers>;
  
  currentUserId: number;
  currentCityId: number;
  currentRoommateId: number;
  currentQuizAnswerId: number;

  constructor() {
    this.users = new Map();
    this.cities = new Map();
    this.roommates = new Map();
    this.quizAnswers = new Map();
    
    this.currentUserId = 1;
    this.currentCityId = 1;
    this.currentRoommateId = 1;
    this.currentQuizAnswerId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // Initialize sample data
  private async initSampleData() {
    // Sample cities
    const bostonCity: City = {
      id: this.currentCityId++,
      name: "Boston",
      state: "MA",
      description: "A historic city with excellent walkability, cultural attractions, and educational opportunities.",
      imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000",
      scores: {
        affordability: 47,
        walkability: 89,
        lifestyle: 86,
        career: 89,
        social: 90,
        dating: 84
      }
    };
    
    const austinCity: City = {
      id: this.currentCityId++,
      name: "Austin",
      state: "TX",
      description: "A vibrant tech hub with great music scene, outdoor activities, and growing job market.",
      imageUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000",
      scores: {
        affordability: 62,
        walkability: 68,
        lifestyle: 92,
        career: 87,
        social: 90,
        dating: 88
      }
    };
    
    const torontoCity: City = {
      id: this.currentCityId++,
      name: "Toronto",
      state: "Canada",
      description: "A diverse metropolitan city with excellent public transportation and cultural diversity.",
      imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1000",
      scores: {
        affordability: 52,
        walkability: 86,
        lifestyle: 88,
        career: 85,
        social: 89,
        dating: 82
      }
    };
    
    const miamiCity: City = {
      id: this.currentCityId++,
      name: "Miami",
      state: "FL",
      description: "Coastal city with vibrant nightlife and diverse culture.",
      imageUrl: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=1000",
      scores: {
        affordability: 58,
        walkability: 79,
        lifestyle: 90,
        career: 82,
        social: 95,
        dating: 94
      }
    };
    
    const atlantaCity: City = {
      id: this.currentCityId++,
      name: "Atlanta",
      state: "GA",
      description: "Major southeastern business hub with affordable living.",
      imageUrl: "https://images.unsplash.com/photo-1512537244317-1f71f8ec8a01?auto=format&fit=crop&w=1000",
      scores: {
        affordability: 67,
        walkability: 65,
        lifestyle: 84,
        career: 89,
        social: 86,
        dating: 85
      }
    };
    
    // Add cities to storage
    this.cities.set(bostonCity.id, bostonCity);
    this.cities.set(austinCity.id, austinCity);
    this.cities.set(torontoCity.id, torontoCity);
    this.cities.set(miamiCity.id, miamiCity);
    this.cities.set(atlantaCity.id, atlantaCity);
    
    // Sample roommates
    const roommate1: Roommate = {
      id: this.currentRoommateId++,
      name: "Alex",
      age: 27,
      occupation: "Software Engineer",
      bio: "Looking for a roommate in Back Bay or South End. I'm clean, respectful, and usually busy with work during weekdays. Love hiking and trying new restaurants on weekends.",
      budget: 1800,
      movingTimeframe: "Moving within 2 months",
      cityId: bostonCity.id,
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100",
      matchPercentage: 92,
      tags: ["$1800 budget", "Non-smoker", "Clean", "Early riser"]
    };
    
    const roommate2: Roommate = {
      id: this.currentRoommateId++,
      name: "Sarah",
      age: 24,
      occupation: "Graduate Student",
      bio: "PhD student at Boston University looking for a quiet place close to campus. I'm studious during the week but enjoy exploring the city on weekends.",
      budget: 1200,
      movingTimeframe: "Moving ASAP",
      cityId: bostonCity.id,
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100",
      matchPercentage: 87,
      tags: ["$1200 budget", "Non-smoker", "Quiet", "Night owl"]
    };
    
    const roommate3: Roommate = {
      id: this.currentRoommateId++,
      name: "Michael",
      age: 31,
      occupation: "Financial Analyst",
      bio: "Working professional in finance looking for a place in Beacon Hill or Downtown. I travel frequently for work and am pretty low-maintenance as a roommate.",
      budget: 2200,
      movingTimeframe: "Moving in 1 month",
      cityId: bostonCity.id,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100",
      matchPercentage: 83,
      tags: ["$2200 budget", "Non-smoker", "Travels often", "Social"]
    };
    
    // Add roommates to storage
    this.roommates.set(roommate1.id, roommate1);
    this.roommates.set(roommate2.id, roommate2);
    this.roommates.set(roommate3.id, roommate3);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.users.set(id, user);
    return user;
  }
  
  // City methods
  async getAllCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }
  
  async getCityById(id: number): Promise<City | undefined> {
    return this.cities.get(id);
  }
  
  async getSimilarCities(cityId?: number): Promise<any[]> {
    // If cityId is provided, return cities similar to the given city
    // For simplicity, we'll just return a few cities
    const allCities = Array.from(this.cities.values());
    return allCities
      .filter(city => !cityId || city.id !== cityId)
      .slice(0, 3)
      .map(city => ({
        id: city.id,
        name: city.name,
        state: city.state,
        imageUrl: city.imageUrl,
        matchPercentage: Math.floor(Math.random() * 15) + 80 // Random match between 80-95%
      }));
  }
  
  // Roommate methods
  async getAllRoommates(): Promise<Roommate[]> {
    return Array.from(this.roommates.values());
  }
  
  async getRoommateById(id: number): Promise<Roommate | undefined> {
    return this.roommates.get(id);
  }
  
  async getRoommatesByCityId(cityId: number): Promise<Roommate[]> {
    return Array.from(this.roommates.values()).filter(
      roommate => roommate.cityId === cityId
    );
  }
  
  async filterRoommates(filters: any): Promise<Roommate[]> {
    let roommates = Array.from(this.roommates.values());
    
    // Apply filters
    if (filters.budgetMin) {
      const min = parseInt(filters.budgetMin);
      if (!isNaN(min)) {
        roommates = roommates.filter(r => r.budget >= min);
      }
    }
    
    if (filters.budgetMax) {
      const max = parseInt(filters.budgetMax);
      if (!isNaN(max)) {
        roommates = roommates.filter(r => r.budget <= max);
      }
    }
    
    if (filters.ageMin && filters.ageMin !== 'any') {
      const min = parseInt(filters.ageMin);
      if (!isNaN(min)) {
        roommates = roommates.filter(r => r.age >= min);
      }
    }
    
    if (filters.ageMax && filters.ageMax !== 'any') {
      const max = parseInt(filters.ageMax);
      if (!isNaN(max)) {
        roommates = roommates.filter(r => r.age <= max);
      }
    }
    
    if (filters.lifestyleFilters && filters.lifestyleFilters.length > 0) {
      roommates = roommates.filter(r => {
        return filters.lifestyleFilters.some((filter: string) => 
          r.tags.includes(filter)
        );
      });
    }
    
    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'budget_low':
          roommates.sort((a, b) => a.budget - b.budget);
          break;
        case 'budget_high':
          roommates.sort((a, b) => b.budget - a.budget);
          break;
        case 'match':
          roommates.sort((a, b) => b.matchPercentage - a.matchPercentage);
          break;
        default:
          // Default is by relevance (match percentage)
          roommates.sort((a, b) => b.matchPercentage - a.matchPercentage);
      }
    }
    
    return roommates;
  }
  
  // Quiz methods
  async saveQuizAnswers(answers: InsertQuizAnswers): Promise<QuizAnswers> {
    const id = this.currentQuizAnswerId++;
    const quizAnswer: QuizAnswers = { 
      ...answers, 
      id
    };
    this.quizAnswers.set(id, quizAnswer);
    return quizAnswer;
  }
}

export const storage = new MemStorage();
