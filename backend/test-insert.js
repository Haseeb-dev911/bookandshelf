import('./src/db/index.config.js').then(async ({ default: db }) => {
  const { eBookProductModel, eBookProductImagesModel } = await import('./src/db/models/e.book.product.schema.js');
  const { userAccountModel } = await import('./src/db/models/user.account.schema.js');
  const { categoriesModel } = await import('./src/db/models/category.book.schema.js');
  
  try {
      const user = await db.query.userAccountModel.findFirst();
      const category = await db.query.categoriesModel.findFirst();
      
      console.log("User:", user?.id);
      console.log("Category:", category?.id);

      const [book] = await db.insert(eBookProductModel).values({
          sellerId: user.id,
          categoryId: category.id,
          title: "Test Ebook",
          author: "Test Author",
          description: "Test description Test description",
          price: "10.00",
          discountPercentage: 0,
          pdfUrl: "http://example.com/pdf",
          pdfPublicId: "pubid",
      }).returning();
      console.log("Book inserted", book);
      
      await db.insert(eBookProductImagesModel).values({
          productId: book.id,
          public_id: "imgid",
          secure_url: "http://example.com/img",
          format: "jpg",
          resource_type: "image",
      });
      console.log("Image inserted");
      
      // Cleanup
      await db.delete(eBookProductModel).where(require('drizzle-orm').eq(eBookProductModel.id, book.id));
      console.log("Cleaned up");
  } catch(e) {
      console.error("DB Error:", e);
  }
  process.exit(0);
});
