import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useAuth, Address } from "@/context/AuthContext";
import { ArrowLeft, MapPin } from "lucide-react";
import { DELIVERY_FEE, type ShippingDetails } from "@/lib/checkout";

const fromAddress = (a?: Address) => ({
  line: a?.line || "",
  city: a?.city || "",
  state: a?.state || "",
  pincode: a?.pincode || "",
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const { user } = useAuth();

  const saved = user?.addresses || [];
  const defaultAddress = saved.find((a) => a.isDefault) || saved[0];
  const [selectedId, setSelectedId] = useState<string>(defaultAddress?._id || "new");

  const [form, setForm] = useState<ShippingDetails>({
    fullName: user?.name || "",
    phone: user?.phone || "",
    ...fromAddress(defaultAddress),
    notes: "",
  });

  const deliveryFee = totalPrice > 0 ? DELIVERY_FEE : 0;
  const grandTotal = totalPrice + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectAddress = (id: string) => {
    setSelectedId(id);
    const addr = saved.find((a) => a._id === id);
    setForm((f) => ({ ...f, ...fromAddress(addr) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/payment", { state: { shipping: form } });
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

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-3xl font-bold mb-4">Log in to check out</h2>
        <p className="text-muted-foreground mb-6 font-body">Your cart is saved — it'll be here when you're back.</p>
        <Link to="/login">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Log In</Button>
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

          {saved.length > 0 && (
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold font-body mb-2">Deliver to</legend>
              {saved.map((a) => (
                <label
                  key={a._id}
                  className={`flex items-start gap-3 rounded-lg border-2 p-3 cursor-pointer transition-colors ${
                    selectedId === a._id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="savedAddress"
                    className="mt-1 accent-[hsl(var(--primary))]"
                    checked={selectedId === a._id}
                    onChange={() => selectAddress(a._id)}
                  />
                  <span className="text-sm font-body">
                    <span className="font-bold">{a.label}</span>
                    <span className="block text-muted-foreground">
                      {a.line}, {a.city}{a.state ? `, ${a.state}` : ""} {a.pincode}
                    </span>
                  </span>
                </label>
              ))}
              <label
                className={`flex items-center gap-3 rounded-lg border-2 p-3 cursor-pointer transition-colors ${
                  selectedId === "new" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name="savedAddress"
                  className="accent-[hsl(var(--primary))]"
                  checked={selectedId === "new"}
                  onChange={() => selectAddress("new")}
                />
                <span className="text-sm font-body font-bold">Use a different address</span>
              </label>
            </fieldset>
          )}

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
            <Label htmlFor="line">Address</Label>
            <Textarea id="line" name="line" required value={form.line} onChange={handleChange} className="mt-1.5" rows={2} placeholder="House no, street, area" />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required value={form.city} onChange={handleChange} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" value={form.state} onChange={handleChange} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode" name="pincode" required inputMode="numeric" pattern="\d{6}" maxLength={6}
                title="6-digit pincode" value={form.pincode} onChange={handleChange} className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Delivery Notes (optional)</Label>
            <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} className="mt-1.5" rows={2} maxLength={500} />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold h-12">
            Continue to Payment
          </Button>
        </form>

        <aside className="bg-card rounded-xl p-6 shadow-card h-fit space-y-4">
          <h3 className="font-heading text-lg font-bold">Order Summary</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id || item._id} className="flex gap-3 text-sm">
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
