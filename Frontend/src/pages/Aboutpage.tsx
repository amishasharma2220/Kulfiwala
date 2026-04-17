import { Award, Heart, Users, Leaf } from "lucide-react";

const AboutPage = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-12">
      <h1 className="font-heading text-4xl font-bold">About <span className="text-primary">Kulfiwala</span></h1>
      <p className="text-muted-foreground font-body mt-2 max-w-xl mx-auto">
        A legacy of authentic Indian kulfi, handcrafted with love since 1965.
      </p>
    </div>

    {/* Story */}
    <div className="max-w-3xl mx-auto mb-16">
      <div className="bg-card rounded-2xl p-8 shadow-card">
        <h2 className="font-heading text-2xl font-bold mb-4">Our Story</h2>
        <div className="space-y-4 font-body text-muted-foreground text-sm leading-relaxed">
          <p>
            It all started on the bustling streets of Chandni Chowk in Old Delhi, where our founder, 
            <strong className="text-foreground"> Shri Ram Prasad ji</strong>, began selling his family's secret kulfi recipe 
            from a small wooden cart in 1965.
          </p>
          <p>
            What made his kulfi special was the slow-cooking process — simmering pure buffalo milk for hours, 
            infusing it with hand-ground cardamom, premium Kashmiri saffron, and chopped dry fruits. 
            Every kulfi was set in traditional earthen moulds, giving it the unmistakable creamy texture.
          </p>
          <p>
            Three generations later, Kulfiwala has grown from a single cart to over 50 stores across India, 
            but our commitment remains the same — <strong className="text-foreground">100% natural ingredients, 
            no preservatives, and the same time-honoured recipes</strong> that made people fall in love with our kulfi.
          </p>
        </div>
      </div>
    </div>

    {/* Values */}
    <div className="max-w-4xl mx-auto">
      <h2 className="font-heading text-2xl font-bold text-center mb-8">What We Stand For</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Heart, title: "Made with Love", desc: "Every kulfi is handcrafted with care and passion." },
          { icon: Leaf, title: "All Natural", desc: "Zero preservatives, zero artificial colours or flavours." },
          { icon: Award, title: "Premium Quality", desc: "Only the finest ingredients from trusted sources." },
          { icon: Users, title: "Community First", desc: "Supporting local dairy farmers and artisans." },
        ].map((v, i) => (
          <div key={i} className="bg-card rounded-xl p-6 shadow-card text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-3">
              <v.icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-sm mb-1">{v.title}</h3>
            <p className="text-xs text-muted-foreground font-body">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Numbers */}
    <div className="max-w-3xl mx-auto mt-16 gradient-warm rounded-2xl p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { num: "60+", label: "Years of Legacy" },
          { num: "50+", label: "Stores" },
          { num: "18+", label: "Flavours" },
          { num: "10M+", label: "Happy Customers" },
        ].map((s, i) => (
          <div key={i}>
            <p className="font-heading text-3xl font-extrabold text-primary">{s.num}</p>
            <p className="text-xs text-muted-foreground font-body mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
