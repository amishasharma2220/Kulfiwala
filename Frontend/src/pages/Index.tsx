import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Award, Clock, Heart, Leaf } from "lucide-react";
import heroImg from "@/assets/hero-kulfi.jpg";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Delicious kulfi collection" className="w-full h-full object-cover" width={1280} height={720} />
          <div className="absolute inset-0 bg-kulfi-brown/60" />
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary/20 text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full mb-4 font-body backdrop-blur-sm">
              🍦 Handcrafted Since 1965
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-kulfi-cream leading-tight">
              The Taste of <span className="gradient-hero bg-clip-text text-transparent">Tradition</span>
            </h1>
            <p className="mt-4 text-lg text-kulfi-cream/90 font-body max-w-lg">
              Authentic Indian kulfi made with pure milk, saffron, and love. Every bite takes you back to the streets of Old Delhi.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-bold text-lg hover:bg-primary/90 transition-colors shadow-warm"
              >
                Order Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/stores"
                className="inline-flex items-center gap-2 border-2 border-kulfi-cream/50 text-kulfi-cream px-8 py-3 rounded-full font-body font-bold text-lg hover:bg-kulfi-cream/10 transition-colors"
              >
                Find a Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, label: "100% Natural", desc: "No preservatives" },
              { icon: Star, label: "Premium Quality", desc: "Finest ingredients" },
              { icon: Truck, label: "Fast Delivery", desc: "Within 30 mins" },
              { icon: Clock, label: "Fresh Daily", desc: "Made every morning" },
            ].map((f, i) => (
              <div key={i} className="text-center p-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-3">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-bold text-sm">{f.label}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Our <span className="text-primary">Bestsellers</span></h2>
            <p className="text-muted-foreground font-body mt-2">Loved by millions across India</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-primary font-body font-bold hover:underline"
            >
              View Full Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 gradient-warm">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">What Our <span className="text-primary">Customers</span> Say</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Priya Sharma", text: "The best kulfi I've ever had! Takes me back to my grandmother's kitchen.", rating: 5 },
              { name: "Rahul Verma", text: "Kesar kulfi is absolutely divine. Ordering every weekend now!", rating: 5 },
              { name: "Anita Patel", text: "Fresh, authentic, and delivered so fast. Love the mango kulfi!", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-kulfi-mango text-kulfi-mango" />
                  ))}
                </div>
                <p className="text-sm font-body text-muted-foreground mb-4">"{t.text}"</p>
                <p className="font-heading font-bold text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our <span className="text-primary">Story</span></h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              Since 1965, Kulfiwala has been crafting authentic Indian kulfi from the heart of Old Delhi. 
              Three generations of passion, 100% natural ingredients, and the same time-honoured recipes 
              that have won the hearts of millions.
            </p>
            <div className="flex justify-center gap-8 mt-8">
              {[
                { icon: Heart, label: "Made with Love" },
                { icon: Leaf, label: "All Natural" },
                { icon: Award, label: "Premium Quality" },
              ].map((v, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mb-2">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-body font-semibold">{v.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-body font-bold hover:underline mt-6">
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      <section className="py-20 gradient-hero text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">Ready to Taste the Magic?</h2>
          <p className="text-primary-foreground/80 font-body mt-3 text-lg">Order now and get free delivery on your first order!</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-kulfi-brown text-kulfi-cream px-8 py-3 rounded-full font-body font-bold text-lg mt-8 hover:bg-kulfi-brown/90 transition-colors"
          >
            Explore Menu <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
