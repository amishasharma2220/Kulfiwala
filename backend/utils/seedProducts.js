import Product from "../models/Product.js";
import catalog from "../data/products.js";

// Upserts the catalog on every boot so the database always has the current
// prices — no manual seeding step needed on Render.
const seedProducts = async () => {
  const ops = catalog.map((p) => ({
    updateOne: { filter: { sku: p.sku }, update: { $set: p }, upsert: true },
  }));
  const result = await Product.bulkWrite(ops);
  console.log(
    `Products synced (${catalog.length} items, ${result.upsertedCount} new, ${result.modifiedCount} updated)`
  );
};

export default seedProducts;
