import('./src/db/index.config.js').then(async ({ default: db }) => {
  const { sql } = await import('drizzle-orm');
  const { oldBookProductModel } = await import('./src/db/models/old.book.product.schema.js');
  const result = await db.select({
      date: sql`date_trunc('day', ${oldBookProductModel.createdAt})::date`,
      physicalCount: sql`count(*)::int`
  }).from(oldBookProductModel).groupBy(sql`date_trunc('day', ${oldBookProductModel.createdAt})::date`);
  console.log(result);
  process.exit(0);
});
