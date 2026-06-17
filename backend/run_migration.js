import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL
});

async function run() {
    try {
        await client.connect();
        await client.query('ALTER TABLE "old_book_product" ADD COLUMN IF NOT EXISTS "discount_percentage" integer DEFAULT 0 NOT NULL;');
        console.log('Column added successfully');
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.end();
    }
}

run();
