import { Package, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/api";

const statusColor: Record<string, string> = {
  Delivered: "bg-secondary text-secondary-foreground",
  "In Transit": "bg-primary/15 text-primary",
  Processing: "bg-muted text-muted-foreground",
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) return;

        const { data } = await API.get("/api/orders");
        
        // filter orders for logged-in user
        const userOrders = data.filter((o: any) => o.user === user._id || o.user?._id === user._id);
        setOrders(userOrders);
      } catch (error) {
        console.log("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold">My <span className="text-primary">Orders</span></h1>
        <p className="text-muted-foreground font-body mt-2">Track your kulfi deliveries</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="font-heading font-bold">{order._id}</span>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full font-body ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-2">
                <Clock className="h-3 w-3" /> {order.date}
              </div>
              <p className="text-sm font-body text-muted-foreground">{order.items.map((i: any) => `${i.name} x${i.quantity}`).join(", ")}</p>
              <p className="text-lg font-heading font-bold text-primary mt-2">₹{order.total}</p>
            </div>
          ))
        )}

        <div className="text-center pt-6">
          <Link to="/login" className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">
            Log in to see your real orders →
          </Link>
        </div>
      </div>
    </div>
  );
}; 

export default OrdersPage;
