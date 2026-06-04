import { Pool } from "pg";
import { env } from "../../config/env.js";

export const db = new Pool({
  connectionString: env.DATABASE_URL
});

async function connectDB() {
  try {
    await db.query("SELECT 1");
    console.log("PostgreSQL connected");
  } catch (err) {
    console.log("❌ DB connection failed", err);
    process.exit(1);
  }
}
connectDB();