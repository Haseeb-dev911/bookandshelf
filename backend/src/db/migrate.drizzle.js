// only for migration runs
// ✔️ command ==> node src/db/migrate.drizzle.js 

import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "./index.config.js";


const runMigration = async () => {
    console.log("⏳ Running migrations...");
    try {
        await migrate(db, { migrationsFolder: "drizzle" });
        console.log("✅ Migrations completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
};

runMigration();