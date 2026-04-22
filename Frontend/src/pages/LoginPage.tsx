import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo.png";
import API from "@/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    try {
      const { data } = await API.post("/api/auth/login", { email, password });

      // store user
      localStorage.setItem("user", JSON.stringify(data));

      // update global auth state
      login(data);

      toast({ title: `Welcome back, ${data.name}!` });

      navigate("/profile");
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Invalid credentials",
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
        <h1 className="font-heading text-3xl font-bold text-center mb-1">Welcome Back</h1>
        <p className="text-center text-muted-foreground font-body text-sm mb-8">Log in to your Kulfiwala account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="font-body text-sm font-semibold">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password" className="font-body text-sm font-semibold">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-bold mt-2">
            Log In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground font-body mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
