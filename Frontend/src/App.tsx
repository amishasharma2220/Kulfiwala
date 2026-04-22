import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import StoresPage from "./pages/StoresPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import ReviewPage from "./pages/ReviewPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <CartProvider>
      <Toaster />
      <Navbar />
      <CartDrawer />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  </TooltipProvider>
);

export default App;
