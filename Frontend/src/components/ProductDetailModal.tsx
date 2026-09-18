import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { getIngredients } from "@/data/ingredients";
import { products, type Product } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetailModal = ({ product, open, onOpenChange }: ProductDetailModalProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Reset the quantity stepper each time a different product is opened.
  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  if (!product) return null;

  const ingredients = getIngredients(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, quantity);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover md:rounded-l-2xl"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          <div className="p-6 flex flex-col">
            <DialogHeader>
              <p className="text-xs font-body font-semibold text-primary uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground font-body mt-3">{product.description}</p>

            <div className="mt-4">
              <h4 className="flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-wide text-muted-foreground mb-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Ingredients
              </h4>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing) => (
                  <span key={ing} className="text-xs font-body bg-muted px-3 py-1 rounded-full text-muted-foreground">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-2xl font-heading font-bold text-primary">₹{product.price}</span>

              <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="h-8 w-8 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center font-bold font-body" aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="h-8 w-8 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold gap-2 h-12"
            >
              <ShoppingCart className="h-4 w-4" /> Add {quantity > 1 ? `${quantity} ` : ""}to Cart — ₹{product.price * quantity}
            </Button>

            {related.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-xs font-body font-bold uppercase tracking-wide text-muted-foreground mb-3">
                  You might also like
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {related.map((r) => (
                    <div key={r.id} className="text-center">
                      <img src={r.image} alt={r.name} className="w-full aspect-square object-cover rounded-lg mb-1.5" />
                      <p className="text-xs font-body font-semibold truncate">{r.name}</p>
                      <p className="text-xs font-body text-primary font-bold">₹{r.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
