import kulfiPistachio from "@/assets/kulfi-pistachio.jpg";
import kulfiKesar from "@/assets/kulfi-kesar.jpg";
import kulfiRose from "@/assets/kulfi-rose.jpg";
import kulfiMango from "@/assets/kulfi-mango.jpg";
import kulfiChocolate from "@/assets/kulfi-chocolate.jpg";
import kulfiMalai from "@/assets/kulfi-malai.jpg";
import kulfiGulkand from "@/assets/kulfi-gulkand.jpg";
import kulfiPaan from "@/assets/kulfi-paan.jpg";
import kulfiRabri from "@/assets/kulfi-rabri.jpg";
import kulfiElaichi from "@/assets/kulfi-elaichi.jpg";
import kulfiStrawberry from "@/assets/kulfi-strawberry.jpg";
import kulfiBadam from "@/assets/kulfi-badam.jpg";
import kulfiLitchi from "@/assets/kulfi-litchi.jpg";
import kulfiAnjeer from "@/assets/kulfi-anjeer.jpg";
import kulfiCoconut from "@/assets/kulfi-coconut.jpg";
import kulfiSitaphal from "@/assets/kulfi-sitaphal.jpg";
import kulfiButterscotch from "@/assets/kulfi-butterscotch.jpg";
import kulfiDryfruit from "@/assets/kulfi-dryfruit.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

export const products: Product[] = [
  // Classic
  { id: "1", name: "Pista Kulfi", description: "Rich pistachio kulfi with crushed nuts", price: 80, image: kulfiPistachio, category: "Classic", badge: "Bestseller" },
  { id: "2", name: "Kesar Kulfi", description: "Royal saffron kulfi with almonds", price: 90, image: kulfiKesar, category: "Classic", badge: "Popular" },
  { id: "6", name: "Malai Kulfi", description: "Traditional creamy malai with cardamom", price: 75, image: kulfiMalai, category: "Classic" },
  { id: "10", name: "Elaichi Kulfi", description: "Aromatic cardamom kulfi with a fragrant twist", price: 80, image: kulfiElaichi, category: "Classic" },
  { id: "12", name: "Badam Kulfi", description: "Creamy almond kulfi loaded with sliced nuts", price: 90, image: kulfiBadam, category: "Classic" },
  { id: "17", name: "Rabri Kulfi", description: "Luscious rabri-layered kulfi with golden strands", price: 95, image: kulfiRabri, category: "Classic", badge: "Chef's Pick" },

  // Fruity
  { id: "4", name: "Mango Kulfi", description: "Fresh Alphonso mango kulfi", price: 95, image: kulfiMango, category: "Fruity", badge: "Seasonal" },
  { id: "9", name: "Strawberry Kulfi", description: "Fresh strawberry kulfi with real fruit pieces", price: 90, image: kulfiStrawberry, category: "Fruity" },
  { id: "13", name: "Litchi Kulfi", description: "Refreshing litchi kulfi, light and delicate", price: 85, image: kulfiLitchi, category: "Fruity" },
  { id: "15", name: "Sitaphal Kulfi", description: "Seasonal custard apple kulfi, creamy & sweet", price: 100, image: kulfiSitaphal, category: "Fruity", badge: "Seasonal" },
  { id: "18", name: "Coconut Kulfi", description: "Tropical coconut kulfi with shredded coconut", price: 85, image: kulfiCoconut, category: "Fruity" },

  // Floral
  { id: "3", name: "Rose Kulfi", description: "Delicate rose kulfi with petals", price: 85, image: kulfiRose, category: "Floral" },
  { id: "7", name: "Gulkand Kulfi", description: "Sweet rose petal jam kulfi with mukhwas", price: 90, image: kulfiGulkand, category: "Floral", badge: "New" },

  // Modern
  { id: "5", name: "Chocolate Kulfi", description: "Rich dark chocolate kulfi", price: 100, image: kulfiChocolate, category: "Modern" },
  { id: "16", name: "Butterscotch Kulfi", description: "Caramel butterscotch kulfi with crunchy bits", price: 95, image: kulfiButterscotch, category: "Modern" },

  // Fusion
  { id: "8", name: "Meetha Paan Kulfi", description: "Betel leaf kulfi with gulkand & tutti-frutti", price: 95, image: kulfiPaan, category: "Fusion", badge: "Trending" },

  // Premium
  { id: "14", name: "Anjeer Kulfi", description: "Luxurious fig kulfi with honey drizzle", price: 110, image: kulfiAnjeer, category: "Premium" },
  { id: "11", name: "Dry Fruit Royal Kulfi", description: "Loaded with pistachios, almonds, cashews & raisins", price: 120, image: kulfiDryfruit, category: "Premium", badge: "Royal" },
];

export const stores = [
  { id: "1", name: "Kulfiwala - Connaught Place", address: "F-12, Block F, Connaught Place, New Delhi", phone: "+91 98765 43210", hours: "11:00 AM - 11:00 PM", lat: 28.6315, lng: 77.2167 },
  { id: "2", name: "Kulfiwala - Chandni Chowk", address: "1456, Chandni Chowk, Old Delhi", phone: "+91 98765 43211", hours: "10:00 AM - 10:00 PM", lat: 28.6506, lng: 77.2303 },
  { id: "3", name: "Kulfiwala - South Extension", address: "D-4, South Extension Part 2, New Delhi", phone: "+91 98765 43212", hours: "11:00 AM - 11:00 PM", lat: 28.5700, lng: 77.2219 },
  { id: "4", name: "Kulfiwala - Lajpat Nagar", address: "Shop 23, Central Market, Lajpat Nagar", phone: "+91 98765 43213", hours: "10:30 AM - 10:30 PM", lat: 28.5677, lng: 77.2433 },
  { id: "5", name: "Kulfiwala - Karol Bagh", address: "15/90, Ajmal Khan Road, Karol Bagh, New Delhi", phone: "+91 98765 43214", hours: "10:00 AM - 10:30 PM", lat: 28.6519, lng: 77.1905 },
  { id: "6", name: "Kulfiwala - Sarojini Nagar", address: "Shop 8, Sarojini Nagar Market, New Delhi", phone: "+91 98765 43215", hours: "11:00 AM - 10:00 PM", lat: 28.5744, lng: 77.2001 },
  { id: "7", name: "Kulfiwala - Khan Market", address: "52, Middle Lane, Khan Market, New Delhi", phone: "+91 98765 43216", hours: "11:00 AM - 11:00 PM", lat: 28.6005, lng: 77.2274 },
  { id: "8", name: "Kulfiwala - Rajouri Garden", address: "J-Block, Main Market, Rajouri Garden, New Delhi", phone: "+91 98765 43217", hours: "10:30 AM - 10:30 PM", lat: 28.6492, lng: 77.1219 },
  { id: "9", name: "Kulfiwala - Noida Sector 18", address: "Shop 201, Atta Market, Sector 18, Noida", phone: "+91 98765 43218", hours: "11:00 AM - 11:00 PM", lat: 28.5706, lng: 77.3219 },
  { id: "10", name: "Kulfiwala - Gurugram", address: "SCO 45, Sector 29 Market, Gurugram", phone: "+91 98765 43219", hours: "11:00 AM - 11:30 PM", lat: 28.4595, lng: 77.0266 },
  { id: "11", name: "Kulfiwala - Lucknow", address: "18/4, Hazratganj, Lucknow", phone: "+91 98765 43220", hours: "10:00 AM - 10:00 PM", lat: 26.8498, lng: 80.9467 },
  { id: "12", name: "Kulfiwala - Jaipur", address: "MI Road, Near Panch Batti, Jaipur", phone: "+91 98765 43221", hours: "10:30 AM - 10:30 PM", lat: 26.9124, lng: 75.7873 },
];
