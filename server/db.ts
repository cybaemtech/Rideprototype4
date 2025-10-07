import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const db = drizzle({
  connection: process.env.DATABASE_URL,
  ws: ws,
});
