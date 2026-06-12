import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations(): Promise<void> {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    console.log("Running migrations...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        run_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    const result = await client.query<{ name: string; }>(`SELECT name FROM migrations`);
    const executedMigrations = result.rows.map((row) => row.name);
    const migrationDirectory = path.join(__dirname, "migrations");
    const sortedMigrationFiles = fs.readdirSync(migrationDirectory).sort();

    for (const file of sortedMigrationFiles) {

      if (!executedMigrations.includes(file)) {

        console.log(`Running migration: ${file}`);
        const sql = fs.readFileSync(path.join(migrationDirectory, file), "utf-8");
        await client.query(sql);
        await client.query(
          `INSERT INTO migrations (name) VALUES ($1)`,
          [file]
        );
        
      }
    }

    await client.query("COMMIT");
    console.log("Migrations complete.");

  } catch (error) {

    await client.query("ROLLBACK");
    console.error("Migration failed:", error);
    process.exitCode = 1;

  } finally {
    client.release();
  }
}

void runMigrations();