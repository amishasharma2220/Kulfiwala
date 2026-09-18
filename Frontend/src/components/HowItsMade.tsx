import { Wheat, Flame, Snowflake, PackageCheck, Milk } from "lucide-react";

const steps = [
  { num: "01", icon: Milk, title: "Select Ingredients", desc: "Pure milk, real saffron, pistachio, and cardamom — nothing artificial goes in." },
  { num: "02", icon: Wheat, title: "Prepare the Base", desc: "Milk is reduced slowly to build the dense, creamy texture kulfi is known for." },
  { num: "03", icon: Flame, title: "Slow-Cook & Flavour", desc: "Each batch is simmered and infused with its signature flavour by hand." },
  { num: "04", icon: Snowflake, title: "Freeze in Moulds", desc: "Set in traditional moulds and slow-frozen — no whipped air, no shortcuts." },
  { num: "05", icon: PackageCheck, title: "Serve Fresh", desc: "Unmoulded and served the moment it's ready, the way kulfi should be." },
];

const HowItsMade = () => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold">
          How Our <span className="text-primary">Kulfi</span> Is Made
        </h2>
        <p className="text-muted-foreground font-body mt-2">Traditional process, no shortcuts</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className="relative bg-background rounded-2xl p-6 shadow-card text-center animate-fade-up motion-reduce:animate-none"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="absolute -top-3 -left-2 font-heading text-4xl font-extrabold text-primary/10" aria-hidden="true">
              {s.num}
            </span>
            <div className="relative inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-4">
              <s.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="font-heading font-bold text-sm mb-2">{s.title}</h3>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItsMade;
