import { useState } from "react";
import API from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Star, Quote } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/api/contact", form);

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });

      setForm({ name: "", email: "", message: "" });

    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Failed to send message",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold">Contact <span className="text-primary">Us</span></h1>
        <p className="text-muted-foreground font-body mt-2">We'd love to hear from you</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="font-heading text-xl font-bold">Get in Touch</h2>
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "hello@kulfiwala.in" },
              { icon: MapPin, label: "Head Office", value: "Chandni Chowk, Old Delhi, India - 110006" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-4 shadow-card">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground font-body">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 shadow-card space-y-4">
          <h2 className="font-heading text-xl font-bold">Send a Message</h2>
          <div>
            <Label className="font-body text-sm font-semibold">Name</Label>
            <Input className="mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <Label className="font-body text-sm font-semibold">Email</Label>
            <Input type="email" className="mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label className="font-body text-sm font-semibold">Message</Label>
            <Textarea className="mt-1 min-h-[120px]" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          </div>
          <Button type="submit" className="w-full font-body font-bold gap-2">
            <Send className="h-4 w-4" /> Send Message
          </Button>
        </form>
      </div>

      {/* Customer Testimonials */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8">
          What Our <span className="text-primary">Customers</span> Say
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Priya Sharma", location: "Delhi", text: "The best kulfi I've ever had! Takes me back to my grandmother's kitchen. Absolutely authentic taste.", rating: 5, avatar: "PS" },
            { name: "Rahul Verma", location: "Mumbai", text: "Kesar kulfi is absolutely divine. We order every weekend for the whole family now!", rating: 5, avatar: "RV" },
            { name: "Anita Patel", location: "Ahmedabad", text: "Fresh, authentic, and delivered so fast. The mango kulfi is our kids' favourite!", rating: 5, avatar: "AP" },
            { name: "Vikram Singh", location: "Jaipur", text: "Tried the Paan kulfi — mind-blowing flavour! Nothing like this anywhere else.", rating: 5, avatar: "VS" },
            { name: "Meera Iyer", location: "Bangalore", text: "Ordered the Dry Fruit Royal for a party. Every guest was asking where I got it from!", rating: 5, avatar: "MI" },
            { name: "Arjun Kapoor", location: "Pune", text: "The Gulkand kulfi is a work of art. So creamy and the rose flavour is perfect.", rating: 4, avatar: "AK" },
          ].map((t, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 shadow-card relative group hover:shadow-lg transition-shadow">
              <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-kulfi-mango text-kulfi-mango" />
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-muted" />
                ))}
              </div>
              <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
