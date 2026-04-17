import { Package, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const sampleOrders = [
  { id: "ORD-1001", date: "2026-04-10", items: ["Pista Kulfi x2", "Kesar Kulfi x1"], total: 250, status: "Delivered" },
  { id: "ORD-1002", date: "2026-04-08", items: ["Mango Kulfi x3"], total: 285, status: "Delivered" },
  { id: "ORD-1003", date: "2026-04-12", items: ["Rose Kulfi x1", "Malai Kulfi x2"], total: 235, status: "In Transit" },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-secondary text-secondary-foreground",
  "In Transit": "bg-primary/15 text-primary",
  Processing: "bg-muted text-muted-foreground",
};

const OrdersPage = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-10">
      <h1 className="font-heading text-4xl font-bold">My <span className="text-primary">Orders</span></h1>
      <p className="text-muted-foreground font-body mt-2">Track your kulfi deliveries</p>
    </div>

    <div className="max-w-2xl mx-auto space-y-4">
      {sampleOrders.map((order) => (
        <div key={order.id} className="bg-card rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <span className="font-heading font-bold">{order.id}</span>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full font-body ${statusColor[order.status]}`}>
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-2">
            <Clock className="h-3 w-3" /> {order.date}
          </div>
          <p className="text-sm font-body text-muted-foreground">{order.items.join(", ")}</p>
          <p className="text-lg font-heading font-bold text-primary mt-2">₹{order.total}</p>
        </div>
      ))}

      <div className="text-center pt-6">
        <Link to="/login" className="text-sm text-muted-foreground font-body hover:text-primary transition-colors">
          Log in to see your real orders →
        </Link>
      </div>
    </div>
  </div>
);

export default OrdersPage;
