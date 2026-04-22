import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" /> Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mb-4 opacity-30" />
            <p className="font-body">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-card shadow-card">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm font-semibold truncate">{item.name}</h4>
                    <p className="text-sm text-primary font-bold">₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-6 w-6 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-6 w-6 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 pb-20 space-y-3">
              <div className="flex justify-between font-heading text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold">
                Checkout
              </Button>
              <Button variant="outline" className="w-full font-body" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

