import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo.png";
import API from "@/api";

const SignupPage = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    if (password !== confirm) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }

    try {
      const { data } = await API.post("/api/auth/signup", {
        name,
        email,
        password,
        phone,
      });

      // store user
      localStorage.setItem("user", JSON.stringify(data));

      // update global auth state
      login(data);

      toast({
        title: "Account created!",
        description: `Welcome to Kulfiwala, ${data.name}!`,
      });

      navigate("/profile");
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Signup failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-card rounded-2xl p-8 shadow-card animate-fade-up">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Kulfiwala" className="h-16 w-16 object-contain" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-center mb-1">Join Kulfiwala</h1>
        <p className="text-center text-muted-foreground font-body text-sm mb-8">Create your account to start ordering</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="font-body text-sm font-semibold">Full Name *</Label>
            <Input id="name" placeholder="Your full name" className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email" className="font-body text-sm font-semibold">Email *</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone" className="font-body text-sm font-semibold">Phone (optional)</Label>
            <Input id="phone" type="tel" placeholder="+91 98765 43210" className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password" className="font-body text-sm font-semibold">Password *</Label>
            <Input id="password" type="password" placeholder="Min 6 characters" className="mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="confirm" className="font-body text-sm font-semibold">Confirm Password *</Label>
            <Input id="confirm" type="password" placeholder="Re-enter password" className="mt-1" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold mt-2">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground font-body mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
