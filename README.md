# Kulfiwala : Full Stack Kulfi Ordering App

Kulfiwala is a full-stack MERN web app where users browse 18 kulfi flavours, add them to a cart, check out with a saved delivery address, and track and review their orders.

## Live Demo

- Frontend: https://kulfiwala-seven.vercel.app
- Backend API: https://kulfiwala.onrender.com

> Payments are **simulated** — this is a portfolio project and no real money is taken.

## Features

- **Auth** — signup and login with JWT; passwords hashed with bcrypt
- **Menu and cart** — filter by category, product detail modal, cart saved across refreshes and synced across tabs
- **Checkout** — pick a saved address or enter a new one; the order is stored with its delivery address
- **Server-side pricing** — the client sends only product IDs and quantities; the API looks up prices in MongoDB and calculates the total, so prices can't be tampered with from the browser
- **Profile** — edit details, manage multiple saved addresses with a default
- **Order history** — `/orders` page plus a summary on the profile
- **Reviews** — rate your own orders (1–5 stars), one review per order, enforced on the server
- **Contact form** — messages stored in MongoDB

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), TypeScript, Tailwind CSS, shadcn/ui, React Router, Axios |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |
| Auth | JWT, bcryptjs |
| Deployment | Vercel (frontend), Render (backend) |

## Project Structure

```
Kulfiwala/
├── Frontend/
│   └── src/
│       ├── components/     # Navbar, CartDrawer, ProductCard, shadcn ui
│       ├── context/        # AuthContext, CartContext
│       ├── pages/          # Menu, Checkout, Payment, Profile, Orders, Review…
│       ├── services/       # API calls
│       └── data/           # product display data and images
└── backend/
    ├── config/             # MongoDB connection
    ├── data/               # product catalog (source of truth for prices)
    ├── middleware/         # JWT auth (protect)
    ├── models/             # User, Product, Order, Review, Contact
    ├── routes/             # auth, products, orders, users, reviews, contact
    └── utils/              # token generation, product seeding
```

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | – | Create account |
| POST | `/api/auth/login` | – | Log in, returns JWT |
| GET | `/api/products` | – | List products |
| POST | `/api/orders` | Yes | Place order (`items: [{ productId, quantity }]`, `paymentMethod`, `shippingAddress`) |
| GET | `/api/orders/my` | Yes | Current user's orders |
| GET / PUT | `/api/users/me` | Yes | Get / update profile |
| POST / PUT / DELETE | `/api/users/me/addresses[/:id]` | Yes | Manage saved addresses |
| GET | `/api/reviews/order/:orderId` | Yes | Your review for an order |
| POST | `/api/reviews` | Yes | Review one of your orders |
| POST | `/api/contact` | – | Send a contact message |

## Environment Variables

**backend/.env**
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_secret
FRONTEND_URL=https://your-app.vercel.app   # comma-separate multiple URLs
```

**Frontend/.env**
```
VITE_API_URL=http://localhost:5001
```

Never commit `.env` files — they are git-ignored.

## Local Setup

```bash
git clone https://github.com/amishasharma2220/Kulfiwala.git
cd Kulfiwala

# Backend
cd backend
npm install
npm run dev        # http://localhost:5001 — products are seeded automatically on start

# Frontend (new terminal)
cd Frontend
npm install
npm run dev        # http://localhost:3000
```

## Application Flow

Signup/Login → Browse Menu → Add to Cart → Checkout (choose address) → Simulated Payment → Order saved → View in Orders → Rate Order

## Future Improvements

- Razorpay test-mode payment integration
- Admin dashboard to manage products and update order status
- Order status notifications
- Automated tests for the API

## Author

**Amisha Sharma** — [GitHub](https://github.com/amishasharma2220) · [LinkedIn](https://linkedin.com/in/amishasharma2220)

## Support

If you like this project, give it a star on GitHub!
