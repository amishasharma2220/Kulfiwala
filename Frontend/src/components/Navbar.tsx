import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogIn } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/stores", label: "Stores" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Kulfiwala" className="h-10 w-10 object-contain" />
          <span className="font-heading text-xl font-bold text-foreground">Kulfiwala</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-semibold transition-colors hover:text-primary ${isActive(l.to) ? "text-primary" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
          {isLoggedIn ? (
            <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted transition-colors bg-primary/10">
              <User className="h-5 w-5 text-primary" />
              <span className="hidden sm:inline text-sm font-semibold text-primary max-w-[100px] truncate">{user?.name?.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground font-body font-bold text-sm hover:bg-primary/90 transition-colors">
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 pb-4 animate-fade-up">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-semibold border-b border-border/50 ${isActive(l.to) ? "text-primary" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          {!isLoggedIn && (
            <Link to="/signup" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-primary">
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

