import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Get all cities
  app.get('/api/cities', async (req, res) => {
    try {
      const cities = await storage.getAllCities();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch cities' });
    }
  });

  // Get city by ID
  app.get('/api/cities/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const city = await storage.getCityById(id);
      
      if (!city) {
        return res.status(404).json({ message: 'City not found' });
      }
      
      res.json(city);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch city' });
    }
  });

  // Get city match based on quiz answers
  app.get('/api/city-match', async (req, res) => {
    try {
      // In a real application, this would use the user's quiz answers
      // to calculate the best matching city
      // For demonstration, we'll return Boston as the default match
      
      const matchResult = {
        city: "Boston",
        score: 91,
        tagline: "Boston Was Practically Built for Someone Like You",
        categories: [
          { name: "Affordability", score: 47, color: "yellow" },
          { name: "Walkability", score: 89, color: "green" },
          { name: "Lifestyle", score: 86, color: "blue" },
          { name: "Career", score: 89, color: "indigo" },
          { name: "Social", score: 90, color: "purple" },
          { name: "Dating", score: 84, color: "pink" }
        ],
        similarCities: await storage.getSimilarCities()
      };
      
      res.json(matchResult);
    } catch (error) {
      res.status(500).json({ message: 'Failed to calculate city match' });
    }
  });

  // Submit quiz answers
  app.post('/api/quiz-answers', async (req, res) => {
    try {
      const schema = z.object({
        userId: z.number().optional(),
        answers: z.record(z.string())
      });
      
      const validatedData = schema.parse(req.body);
      
      await storage.saveQuizAnswers({
        userId: validatedData.userId,
        answers: validatedData.answers,
        submittedAt: new Date().toISOString()
      });
      
      res.status(201).json({ message: 'Quiz answers saved successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid quiz data' });
    }
  });

  // Get roommates
  app.get('/api/roommates', async (req, res) => {
    try {
      const roommates = await storage.getAllRoommates();
      res.json(roommates);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch roommates' });
    }
  });

  // Get roommates for specific city
  app.get('/api/roommates/city/:cityId', async (req, res) => {
    try {
      const cityId = parseInt(req.params.cityId);
      const roommates = await storage.getRoommatesByCityId(cityId);
      res.json(roommates);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch roommates' });
    }
  });

  // Filter roommates
  app.post('/api/roommates/filter', async (req, res) => {
    try {
      const schema = z.object({
        budgetMin: z.string().optional(),
        budgetMax: z.string().optional(),
        ageMin: z.string().optional(),
        ageMax: z.string().optional(),
        lifestyleFilters: z.array(z.string()).optional(),
        moveInDate: z.string().optional(),
        sortBy: z.string().optional()
      });
      
      const filters = schema.parse(req.body);
      const filteredRoommates = await storage.filterRoommates(filters);
      
      res.json(filteredRoommates);
    } catch (error) {
      res.status(400).json({ message: 'Invalid filter parameters' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
