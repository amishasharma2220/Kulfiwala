// Illustrative ingredient lists derived from each product's existing name/
// description in data/products.tsx. These are NOT verified against real
// recipes or allergen data — replace with the business's actual ingredient
// lists (and any allergen disclosures) before relying on this for customers
// with allergies.
export const ingredientsByProductId: Record<string, string[]> = {
  "1": ["Full-cream milk", "Sugar", "Pistachios", "Cardamom"],
  "2": ["Full-cream milk", "Sugar", "Saffron", "Almonds"],
  "3": ["Full-cream milk", "Sugar", "Rose syrup", "Rose petals"],
  "4": ["Full-cream milk", "Sugar", "Alphonso mango pulp"],
  "5": ["Full-cream milk", "Sugar", "Cocoa", "Dark chocolate"],
  "6": ["Full-cream milk", "Sugar", "Cardamom"],
  "7": ["Full-cream milk", "Sugar", "Gulkand (rose petal jam)", "Mukhwas"],
  "8": ["Full-cream milk", "Sugar", "Betel leaf", "Gulkand", "Tutti-frutti"],
  "9": ["Full-cream milk", "Sugar", "Strawberry puree", "Strawberry pieces"],
  "10": ["Full-cream milk", "Sugar", "Green cardamom"],
  "11": ["Full-cream milk", "Sugar", "Pistachios", "Almonds", "Cashews", "Raisins"],
  "12": ["Full-cream milk", "Sugar", "Almonds"],
  "13": ["Full-cream milk", "Sugar", "Litchi pulp"],
  "14": ["Full-cream milk", "Sugar", "Fig", "Honey"],
  "15": ["Full-cream milk", "Sugar", "Custard apple (sitaphal) pulp"],
  "16": ["Full-cream milk", "Sugar", "Caramel", "Butterscotch chips"],
  "17": ["Full-cream milk", "Sugar", "Rabri (sweetened condensed milk)", "Saffron strands"],
  "18": ["Full-cream milk", "Sugar", "Shredded coconut", "Coconut milk"],
};

export const getIngredients = (id: string): string[] =>
  ingredientsByProductId[id] ?? ["Full-cream milk", "Sugar"];
