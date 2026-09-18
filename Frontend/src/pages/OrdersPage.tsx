import { Package, Clock, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/api";
import { useAuth } from "@/context/AuthContext";

const statusColor: Record<string, string> = {
  Delivered: "bg-secondary text-secondary-foreground",
  Processing: "bg-primary/15 text-primary",
  Pending: "bg-muted text-muted-foreground",
};

type FetchState = "loading" | "success" | "error" | "signed-out";

const OrdersPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [state, setState] = useState<FetchState>("loading");

  useEffect(() => {
    if (!isLoggedIn || !user) {
      setState("signed-out");
      return;
    }

    let cancelled = false;

    const fetchOrders = async () => {
      setState("loading");
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "null");
        const { data } = await API.get("/api/orders/my", {
          headers: stored?.token ? { Authorization: `Bearer ${stored.token}` } : {},
        });
        if (cancelled) return;
        setOrders(Array.isArray(data) ? data : []);
        setState("success");
      } catch (error) {
        if (cancelled) return;
        setState("error");
      }
    };

    fetchOrders();
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, user]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold">My <span className="text-primary">Orders</span></h1>
        <p className="text-muted-foreground font-body mt-2">Track your kulfi deliveries</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {state === "signed-out" && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body mb-4">Log in to see your order history.</p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-body font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              Log In
            </Link>
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mb-3" />
            <p className="font-body text-sm">Loading your orders…</p>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="h-8 w-8 text-destructive mb-3" />
            <p className="font-body text-sm text-muted-foreground">
              We couldn't load your orders right now. Please try again in a moment.
            </p>
          </div>
        )}

        {state === "success" && orders.length === 0 && (
          <div className="text-center py-16">
            <Package className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground font-body mb-4">No orders yet</p>
            <Link to="/menu" className="text-primary font-body font-bold hover:underline">
              Browse the menu →
            </Link>
          </div>
        )}

        {state === "success" &&
          orders.map((order) => (
            <div key={order._id} className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="font-heading font-bold">#{order._id?.slice(-6)}</span>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full font-body ${statusColor[order.status] || statusColor.Pending}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-2">
                <Clock className="h-3 w-3" /> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
              </div>
              <p className="text-sm font-body text-muted-foreground">
                {order.items?.map((i: any) => `${i.name} x${i.quantity}`).join(", ")}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-heading font-bold text-primary">₹{order.totalAmount}</p>
                {order.status === "Delivered" && (
                  <Link
                    to={`/review?order=${order._id}`}
                    className="text-xs font-body font-semibold text-primary hover:underline"
                  >
                    Rate Order
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersPage;
