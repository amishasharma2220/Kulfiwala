import { MapPin, Phone, Clock } from "lucide-react";
import { stores } from "@/data/products";

const StoresPage = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-10">
      <h1 className="font-heading text-4xl font-bold">Our <span className="text-primary">Stores</span></h1>
      <p className="text-muted-foreground font-body mt-2">Visit us at any of our locations</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {stores.map((store) => (
        <div key={store.id} className="bg-card rounded-xl p-6 shadow-card hover:shadow-warm transition-shadow">
          <h3 className="font-heading text-lg font-bold mb-3">{store.name}</h3>
          <div className="space-y-3 font-body text-sm">
            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>{store.address}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>{store.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary shrink-0" />
              <span>{store.hours}</span>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-primary text-primary-foreground px-5 py-2 rounded-full font-body font-bold text-sm hover:bg-primary/90 transition-colors"
          >
            Get Directions
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default StoresPage;
