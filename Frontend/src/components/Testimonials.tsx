import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const Testimonials = ({ count, variant = "simple" }: { count?: number; variant?: "simple" | "detailed" }) => {
  const list = count ? testimonials.slice(0, count) : testimonials;

  if (variant === "detailed") {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((t, i) => (
          <div key={i} className="bg-card rounded-2xl p-6 shadow-card relative group hover:shadow-lg transition-shadow">
            <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/10 group-hover:text-primary/20 transition-colors" aria-hidden="true" />
            <div className="flex gap-1 mb-3" role="img" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-kulfi-mango text-kulfi-mango" aria-hidden="true" />
              ))}
              {Array.from({ length: 5 - t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 text-muted" aria-hidden="true" />
              ))}
            </div>
            <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-xs">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-heading font-bold text-sm">{t.name}</p>
                {t.location && <p className="text-xs text-muted-foreground font-body">{t.location}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {list.map((t, i) => (
        <div key={i} className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex gap-1 mb-3" role="img" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} className="h-4 w-4 fill-kulfi-mango text-kulfi-mango" aria-hidden="true" />
            ))}
          </div>
          <p className="text-sm font-body text-muted-foreground mb-4">"{t.text}"</p>
          <p className="font-heading font-bold text-sm">{t.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
