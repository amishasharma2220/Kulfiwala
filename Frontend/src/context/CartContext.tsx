import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface CartItem {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: any, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "kulfiwala_cart";

const loadStoredCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist to localStorage whenever the cart changes, so a refresh
  // (or accidental tab close) doesn't wipe out the customer's cart.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can fail in private-browsing/quota-exceeded situations —
      // the cart still works in-memory for the session either way.
    }
  }, [items]);

  // Keep the cart in sync across tabs (e.g. adding an item in one tab
  // should be reflected if the user checks out from another).
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          setItems(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          // ignore malformed cross-tab payloads
        }
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const addItem = useCallback((item: any, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => (i._id || i.id) === (item._id || item.id));
      if (existing) {
        return prev.map((i) =>
          (i._id || i.id) === (item._id || item.id) ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => (i._id || i.id) !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => (i._id || i.id) !== id));
    } else {
      setItems((prev) => prev.map((i) => (i._id || i.id) === id ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
