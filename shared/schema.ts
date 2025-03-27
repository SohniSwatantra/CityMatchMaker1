import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// City model
export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  state: text("state").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  scores: jsonb("scores").notNull(),
});

export const insertCitySchema = createInsertSchema(cities).pick({
  name: true,
  state: true,
  description: true,
  imageUrl: true,
  scores: true,
});

// Roommate model
export const roommates = pgTable("roommates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  occupation: text("occupation").notNull(),
  bio: text("bio").notNull(),
  budget: integer("budget").notNull(),
  movingTimeframe: text("moving_timeframe").notNull(),
  cityId: integer("city_id").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  matchPercentage: integer("match_percentage").notNull(),
  tags: jsonb("tags").notNull(),
});

export const insertRoommateSchema = createInsertSchema(roommates).pick({
  name: true,
  age: true,
  occupation: true,
  bio: true,
  budget: true,
  movingTimeframe: true,
  cityId: true,
  avatarUrl: true,
  matchPercentage: true,
  tags: true,
});

// Quiz Answer model
export const quizAnswers = pgTable("quiz_answers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  answers: jsonb("answers").notNull(),
  submittedAt: text("submitted_at").notNull(),
});

export const insertQuizAnswersSchema = createInsertSchema(quizAnswers).pick({
  userId: true,
  answers: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCity = z.infer<typeof insertCitySchema>;
export type City = typeof cities.$inferSelect;

export type InsertRoommate = z.infer<typeof insertRoommateSchema>;
export type Roommate = typeof roommates.$inferSelect;

export type InsertQuizAnswers = z.infer<typeof insertQuizAnswersSchema>;
export type QuizAnswers = typeof quizAnswers.$inferSelect;
