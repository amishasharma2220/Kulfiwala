import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, MapPin, Calendar, LogOut, Edit2, Check, Package, Clock, Star } from "lucide-react";

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setForm({ name: user.name, phone: user.phone || "", address: user.address || "" });
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const stored = localStorage.getItem("user");
        if (!stored) return;

        const { token } = JSON.parse(stored);

        const res = await fetch("http://localhost:5001/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  const handleSave = async () => {
    try {
      await updateUser(form);
      setEditing(false);
      toast({ title: "Profile updated!" });
    } catch (error) {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully" });
    navigate("/login");
  };

  if (!user) return null;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" })
    : "Recently";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto">
        {/* Avatar & Name Header */}
        <div className="bg-card rounded-2xl p-8 shadow-card text-center mb-6 animate-fade-up">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4">
            <User className="h-10 w-10" />
          </div>
          <h1 className="font-heading text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground font-body text-sm flex items-center justify-center gap-1 mt-1">
            <Calendar className="h-3 w-3" /> Member since {memberSince}
          </p>
        </div>

        {/* Profile Info */}
        <div className="bg-card rounded-2xl p-6 shadow-card animate-fade-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-bold">Profile Details</h2>
            {!editing ? (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="font-body text-sm gap-1">
                <Edit2 className="h-3.5 w-3.5" /> Edit
              </Button>
            ) : (
              <Button size="sm" onClick={handleSave} className="font-body text-sm gap-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Check className="h-3.5 w-3.5" /> Save
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {editing ? (
              <>
                <div>
                  <Label className="font-body text-sm font-semibold">Full Name</Label>
                  <Input className="mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label className="font-body text-sm font-semibold">Phone</Label>
                  <Input className="mt-1" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <Label className="font-body text-sm font-semibold">Address</Label>
                  <Input className="mt-1" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Your delivery address" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 py-3 border-b border-border">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Email</p>
                    <p className="font-body font-semibold text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3 border-b border-border">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Phone</p>
                    <p className="font-body font-semibold text-sm">{user.phone || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Address</p>
                    <p className="font-body font-semibold text-sm">{user.address || "Not set"}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* My Orders */}
        <div className="bg-card rounded-2xl p-6 shadow-card animate-fade-up mt-6">
          <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" /> My Orders
          </h2>
          {(() => {
            const statusColor: Record<string, string> = {
              Delivered: "bg-secondary text-secondary-foreground",
              Processing: "bg-primary/15 text-primary",
              Pending: "bg-primary/10 text-primary",
            };

            return (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order._id} className="border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-bold text-sm">{order._id.slice(-6)}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full font-body ${statusColor[order.status]}`}>{order.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-1">
                      <Clock className="h-3 w-3" /> {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <p className="text-xs font-body text-muted-foreground">{order.items.map((i: any) => `${i.name} x${i.quantity}`).join(", ")}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-heading font-bold text-primary">₹{order.totalAmount}</p>
                      {order.status === "Delivered" && (
                        <Link
                          to={`/review?order=${order._id}`}
                          className="text-xs font-body font-semibold text-primary hover:underline flex items-center gap-1"
                        >
                          <Star className="h-3 w-3" /> Rate Order
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full mt-6 font-body font-bold text-destructive border-destructive/30 hover:bg-destructive/5 gap-2"
        >
          <LogOut className="h-4 w-4" /> Log Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
