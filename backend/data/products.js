// Source of truth for product prices. The server uses these prices when an
// order is placed — it never trusts prices sent from the browser.
// Keep `sku` in sync with the `id` field in Frontend/src/data/products.tsx.
const products = [
  { sku: "1", name: "Pista Kulfi", price: 80, category: "Classic", description: "Rich pistachio kulfi with crushed nuts" },
  { sku: "2", name: "Kesar Kulfi", price: 90, category: "Classic", description: "Royal saffron kulfi with almonds" },
  { sku: "3", name: "Rose Kulfi", price: 85, category: "Floral", description: "Delicate rose kulfi with petals" },
  { sku: "4", name: "Mango Kulfi", price: 95, category: "Fruity", description: "Fresh Alphonso mango kulfi" },
  { sku: "5", name: "Chocolate Kulfi", price: 100, category: "Modern", description: "Rich dark chocolate kulfi" },
  { sku: "6", name: "Malai Kulfi", price: 75, category: "Classic", description: "Traditional creamy malai with cardamom" },
  { sku: "7", name: "Gulkand Kulfi", price: 90, category: "Floral", description: "Sweet rose petal jam kulfi with mukhwas" },
  { sku: "8", name: "Meetha Paan Kulfi", price: 95, category: "Fusion", description: "Betel leaf kulfi with gulkand & tutti-frutti" },
  { sku: "9", name: "Strawberry Kulfi", price: 90, category: "Fruity", description: "Fresh strawberry kulfi with real fruit pieces" },
  { sku: "10", name: "Elaichi Kulfi", price: 80, category: "Classic", description: "Aromatic cardamom kulfi with a fragrant twist" },
  { sku: "11", name: "Dry Fruit Royal Kulfi", price: 120, category: "Premium", description: "Loaded with pistachios, almonds, cashews & raisins" },
  { sku: "12", name: "Badam Kulfi", price: 90, category: "Classic", description: "Creamy almond kulfi loaded with sliced nuts" },
  { sku: "13", name: "Litchi Kulfi", price: 85, category: "Fruity", description: "Refreshing litchi kulfi, light and delicate" },
  { sku: "14", name: "Anjeer Kulfi", price: 110, category: "Premium", description: "Luxurious fig kulfi with honey drizzle" },
  { sku: "15", name: "Sitaphal Kulfi", price: 100, category: "Fruity", description: "Seasonal custard apple kulfi, creamy & sweet" },
  { sku: "16", name: "Butterscotch Kulfi", price: 95, category: "Modern", description: "Caramel butterscotch kulfi with crunchy bits" },
  { sku: "17", name: "Rabri Kulfi", price: 95, category: "Classic", description: "Luscious rabri-layered kulfi with golden strands" },
  { sku: "18", name: "Coconut Kulfi", price: 85, category: "Fruity", description: "Tropical coconut kulfi with shredded coconut" },
];

export const DELIVERY_FEE = 40;
export const MAX_QTY_PER_ITEM = 20;

export default products;
