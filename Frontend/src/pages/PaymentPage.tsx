import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Wallet, Banknote, CheckCircle2, Info } from "lucide-react";
import API from "@/api";
import { DELIVERY_FEE, type ShippingDetails } from "@/lib/checkout";

type Method = "card" | "upi" | "cod";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const { clearCart, totalPrice, items } = useCart();
  const shipping = (location.state as { shipping?: ShippingDetails } | null)?.shipping;

  const [method, setMethod] = useState<Method>("upi");
  const [processing, setProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{ _id: string; totalAmount: number } | null>(null);

  // Estimate shown before placing the order; the server calculates the real total.
  const estimatedTotal = totalPrice + DELIVERY_FEE;

  useEffect(() => {
    if (placedOrder) return;
    if (!user) navigate("/login");
    else if (!shipping || items.length === 0) navigate("/checkout");
  }, [user, shipping, items.length, placedOrder, navigate]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipping || items.length === 0) return;
    setProcessing(true);

    try {
      // Only product ids and quantities are sent — the server looks up prices.
      const { data } = await API.post("/api/orders", {
        items: items.map((item) => ({
          productId: item.id || item._id,
          quantity: item.quantity,
        })),
        paymentMethod: method,
        shippingAddress: shipping,
      });

      setPlacedOrder(data);
      clearCart();
      toast({ title: "Order placed successfully!" });
    } catch (error: any) {
      toast({
        title: error?.response?.data?.message || error?.message || "Could not place order",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <div className="bg-card rounded-xl p-8 shadow-card">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-extrabold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground font-body mb-6">
            Thank you for your order. Your kulfi will be delivered soon.
          </p>
          <p className="font-body text-sm mb-1">
            Order ID: <span className="font-bold text-primary">#{placedOrder._id.slice(-6).toUpperCase()}</span>
          </p>
          <p className="font-body text-sm mb-6">
            Total: <span className="font-bold">₹{placedOrder.totalAmount}</span>
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/orders">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">View Orders</Button>
            </Link>
            <Link to="/menu">
              <Button variant="outline" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !shipping) return null;

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 font-body text-sm">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-4">Payment</h1>

      <div className="flex gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 mb-8 font-body text-sm">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <span className="font-bold">Demo checkout.</span> This is a portfolio project — no real payment is
          taken and no card or UPI details are collected. Your order is saved so you can see it in your order history.
        </p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-card space-y-6">
        <div>
          <h2 className="font-heading text-lg font-bold mb-3">Select Payment Method</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "upi" as Method, label: "UPI", icon: Wallet },
              { id: "card" as Method, label: "Card", icon: CreditCard },
              { id: "cod" as Method, label: "Cash", icon: Banknote },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id)}
                aria-pressed={method === id}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors font-body font-semibold ${
                  method === id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Icon className="h-6 w-6" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 font-body text-sm">
          <p className="font-semibold mb-1">Delivering to {shipping.fullName}</p>
          <p className="text-muted-foreground">
            {shipping.line}, {shipping.city}{shipping.state ? `, ${shipping.state}` : ""} {shipping.pincode}
          </p>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="font-heading text-lg font-bold">Amount to Pay</span>
            <span className="font-heading text-2xl font-extrabold text-primary">₹{estimatedTotal}</span>
          </div>

          <Button type="submit" disabled={processing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold h-12">
            {processing
              ? "Placing order..."
              : method === "cod"
                ? "Place Order (Pay on Delivery)"
                : `Place Order — Simulated ${method === "upi" ? "UPI" : "Card"} Payment`}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
