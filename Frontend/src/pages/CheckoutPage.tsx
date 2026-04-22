import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, MapPin, UserCircle2 } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
    city: "",
    pincode: "",
    notes: "",
  });

  const deliveryFee = totalPrice > 0 ? 40 : 0;
  const grandTotal = totalPrice + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        shipping: form,
        total: grandTotal,
        items: items,
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6 font-body">Add some delicious kulfi before checking out.</p>
        <Link to="/menu">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 font-body text-sm">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-xl font-bold">Shipping Details</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="mt-1.5" />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" required value={form.address} onChange={handleChange} className="mt-1.5" rows={3} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required value={form.city} onChange={handleChange} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" name="pincode" required value={form.pincode} onChange={handleChange} className="mt-1.5" />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Delivery Notes (optional)</Label>
            <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} className="mt-1.5" rows={2} />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold h-12">
            Continue to Payment
          </Button>
        </form>

        <aside className="bg-card rounded-xl p-6 shadow-card h-fit space-y-4">
          <h3 className="font-heading text-lg font-bold">Order Summary</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm">
                <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold truncate">{item.name}</p>
                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm font-body">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{totalPrice}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryFee}</span></div>
            <div className="flex justify-between font-heading text-lg font-bold pt-2 border-t border-border">
              <span>Total</span><span className="text-primary">₹{grandTotal}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;

