import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group rounded-xl bg-card shadow-card overflow-hidden hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 font-body">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-heading font-bold text-primary">₹{product.price}</span>
          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold font-body hover:bg-primary/90 transition-colors shadow-warm"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
