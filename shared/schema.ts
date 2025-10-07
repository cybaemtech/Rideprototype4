import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  decimal,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  userType: varchar("user_type").notNull().default("rider"), // "rider" or "driver"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Driver details table
export const drivers = pgTable("drivers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  vehicleModel: varchar("vehicle_model").notNull(),
  vehicleNumber: varchar("vehicle_number").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("5.0"),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Rides table
export const rides = pgTable("rides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  riderId: varchar("rider_id").notNull().references(() => users.id),
  driverId: varchar("driver_id").references(() => users.id),
  pickupLocation: varchar("pickup_location").notNull(),
  dropLocation: varchar("drop_location").notNull(),
  fare: decimal("fare", { precision: 10, scale: 2 }).notNull(),
  distance: decimal("distance", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("searching"), // "searching", "found", "on-way", "arrived", "completed", "cancelled"
  rideType: varchar("ride_type").notNull(), // "mini", "prime", "suv"
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Wallet table
export const wallets = pgTable("wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  balance: decimal("balance", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletId: varchar("wallet_id").notNull().references(() => wallets.id),
  type: varchar("type").notNull(), // "credit" or "debit"
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: varchar("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Types and schemas
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;

export type Driver = typeof drivers.$inferSelect;
export const insertDriverSchema = createInsertSchema(drivers).omit({
  id: true,
  createdAt: true,
});
export type InsertDriver = z.infer<typeof insertDriverSchema>;

export type Ride = typeof rides.$inferSelect;
export const insertRideSchema = createInsertSchema(rides).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});
export type InsertRide = z.infer<typeof insertRideSchema>;

export type Wallet = typeof wallets.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
