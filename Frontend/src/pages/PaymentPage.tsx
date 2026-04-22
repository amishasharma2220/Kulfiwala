import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Wallet, Banknote, CheckCircle2, Lock } from "lucide-react";
import API from "@/api";

type Method = "card" | "upi" | "cod";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart, totalPrice, items: cartItems } = useCart();
  const state = location.state as { total?: number; items?: any[] };
  const items = state?.items ?? cartItems;
  const total = state?.total ?? totalPrice + 40;

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const [method, setMethod] = useState<Method>("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upi, setUpi] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    if (!items || items.length === 0) {
      toast.error("Your cart is empty");
      setProcessing(false);
      return;
    }

    console.log("USER:", user);

    if (!user?.token) {
      toast.error("User not authenticated");
      setProcessing(false);
      return;
    }

    try {
      const formattedItems = items.map((item: any) => ({
        name: item.name || item.title || "Item",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity || item.qty || 1),
      }));

      // ✅ If Cash on Delivery, skip payment delay and directly create order
      if (method === "cod") {
        await API.post(
          "/api/orders",
          {
            items: formattedItems,
            totalAmount: total,
            paymentMethod: method,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setProcessing(false);
        clearCart();
        toast.success("Order placed successfully!");
        setSuccess(true);
        return;
      }

      // create order in backend (card / upi)
      const res = await API.post(
        "/api/orders",
        {
          items: formattedItems,
          totalAmount: total,
          paymentMethod: method,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("ORDER RESPONSE:", res.data);

      // simulate processing delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      setProcessing(false);
      clearCart();
      toast.success("Payment successful!");
      setSuccess(true);

    } catch (error: any) {
      setProcessing(false);
      console.error("PAYMENT ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Payment failed"
      );
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <div className="bg-card rounded-xl p-8 shadow-card">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-extrabold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground font-body mb-6">
            Thank you for your order. Your kulfi will be delivered soon.
          </p>
          <p className="font-body text-sm mb-6">
            Order ID: <span className="font-bold text-primary">#{Math.floor(Math.random() * 100000)}</span>
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/profile">
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

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 font-body text-sm">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-2">Payment</h1>
      <p className="text-muted-foreground font-body mb-8 flex items-center gap-2">
        <Lock className="h-4 w-4" /> Secure checkout — your information is protected.
      </p>

      <div className="bg-card rounded-xl p-6 shadow-card space-y-6">
        <div>
          <h2 className="font-heading text-lg font-bold mb-3">Select Payment Method</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "card" as Method, label: "Card", icon: CreditCard },
              { id: "upi" as Method, label: "UPI", icon: Wallet },
              { id: "cod" as Method, label: "Cash", icon: Banknote },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMethod(id)}
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

        <form onSubmit={handlePay} className="space-y-4">
          {method === "card" && (
            <>
              <div>
                <Label htmlFor="number">Card Number</Label>
                <Input id="number" required placeholder="1234 5678 9012 3456" maxLength={19}
                  value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="cardname">Name on Card</Label>
                <Input id="cardname" required value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} className="mt-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" required placeholder="MM/YY" maxLength={5}
                    value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" required type="password" maxLength={4}
                    value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} className="mt-1.5" />
                </div>
              </div>
            </>
          )}

          {method === "upi" && (
            <div>
              <Label htmlFor="upi">UPI ID</Label>
              <Input id="upi" required placeholder="yourname@upi" value={upi} onChange={(e) => setUpi(e.target.value)} className="mt-1.5" />
            </div>
          )}

          {method === "cod" && (
            <div className="bg-muted/50 rounded-lg p-4 font-body text-sm">
              Pay with cash when your order arrives at your doorstep.
            </div>
          )}

          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="font-heading text-lg font-bold">Amount to Pay</span>
            <span className="font-heading text-2xl font-extrabold text-primary">₹{total}</span>
          </div>

          <Button type="submit" disabled={processing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold h-12">
            {processing ? "Processing..." : method === "cod" ? "Place Order" : `Pay ₹${total}`}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
