import "dotenv/config";

export default {
    schema: "./src/db/models/index.js",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};