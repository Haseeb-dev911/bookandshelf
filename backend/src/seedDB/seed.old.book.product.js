import db from "../db/index.config.js";
import { categoriesModel, categoryFieldModel } from "../db/models/category.book.schema.js";


async function seed() {
    console.log("⏳ Starting database seeding...");

    try {
        await db.delete(categoryFieldModel);
        await db.delete(categoriesModel);
        console.log("✨ Cleared existing categories and fields.");

        const [academicCategory] = await db.insert(categoriesModel).values({
            name: "Academic Book"
        }).returning();

        const [fictionCategory] = await db.insert(categoriesModel).values({
            name: "Fiction & Novels"
        }).returning();

        console.log("✅ Inserted base categories.");

        await db.insert(categoryFieldModel).values([
            {
                categoryId: academicCategory.id,
                fieldKey: "university",
                label: "University Name",
                placeholder: "e.g., UCLAN, NUST",
                fieldType: "text",
                required: true,
                displayOrder: 1,
                isActive: true
            },
            {
                categoryId: academicCategory.id,
                fieldKey: "semester",
                label: "Semester",
                placeholder: "e.g., 7",
                fieldType: "number",
                required: true,
                displayOrder: 2,
                isActive: true
            },
            {
                categoryId: academicCategory.id,
                fieldKey: "department",
                label: "Department / Program",
                placeholder: "e.g., Computer Science",
                fieldType: "text",
                required: false,
                displayOrder: 3,
                isActive: true
            }
        ]);

        await db.insert(categoryFieldModel).values([
            {
                categoryId: fictionCategory.id,
                fieldKey: "author",
                label: "Author Name",
                placeholder: "e.g., J.K. Rowling",
                fieldType: "text",
                required: true,
                displayOrder: 1,
                isActive: true
            },
            {
                categoryId: fictionCategory.id,
                fieldKey: "genre",
                label: "Genre",
                placeholder: "e.g., Fantasy, Sci-Fi, Thriller",
                fieldType: "text",
                required: false,
                displayOrder: 2,
                isActive: true
            }
        ]);

        console.log("🎉 Database seeded successfully! Ready for frontend integration.");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        // Close process cleanly
        process.exit(0);
    }
}

seed();