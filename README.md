# 🍨 Kulfiwala — Full Stack Dessert Ordering App

Kulfiwala is a full-stack web application where users can explore delicious kulfi flavors, place orders, and manage their profile. The application is built using modern web technologies and deployed for real-world usage.

---

## 🚀 Live Demo

Frontend: https://kulfiwala-seven.vercel.app
Backend: https://kulfiwala.onrender.com

---

## 🧠 Features

- User Authentication (Signup & Login with JWT)
- Browse Kulfi Menu
- Add to Cart
- Checkout & Payment Flow
- Order Placement & Storage in Database
- User Profile with Order History
- Protected Routes (only accessible after login)
- Fully deployed (Frontend + Backend)

---

## 🛠️ Tech Stack

Frontend:
- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt (password hashing)

Deployment:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

Kulfiwala/
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── context/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── README.md

---

## ⚙️ Environment Variables

Frontend (.env)
VITE_API_URL=https://kulfiwala.onrender.com

Backend (.env)
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-vercel-app.vercel.app

---

## 🧑‍💻 Installation & Setup (Local Development)

1. Clone the repository
git clone https://github.com/amishasharma2220/Kulfiwala.git
cd Kulfiwala

2. Setup Backend
cd backend
npm install
npm run dev

3. Setup Frontend
cd Frontend
npm install
npm run dev

---

## 🔄 Application Flow

User → Signup/Login → Browse Products → Add to Cart → Checkout → Payment → Order Stored → View in Profile

---

## 📸 Screenshots

(Add screenshots here)
- Home Page  
- Menu Page  
- Login / Signup  
- Checkout Page  
- Profile Page  

---

## 🚀 Deployment

Frontend (Vercel):
- Connected GitHub repo
- Root directory set to "Frontend"
- Added environment variable VITE_API_URL

Backend (Render):
- Node service
- Connected MongoDB Atlas
- Configured CORS and environment variables

---

## 📈 Future Improvements

- Razorpay Payment Integration  
- Admin Dashboard  
- Product Reviews & Ratings  
- Mobile Responsiveness Improvements  
- Notifications (Order updates)

---

## 🙌 Author

Amisha Sharma  
GitHub: https://github.com/amishasharma2220  

---

## ⭐ Support

If you like this project, give it a star on GitHub!
