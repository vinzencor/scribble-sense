import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signIn, getCurrentUser } from "@/lib/supabase";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Admin credentials
  const ADMIN_EMAIL = "shinesss@rediffmail.com";
  const ADMIN_PASSWORD = "Scribblesense@123*";

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      // Check localStorage first
      const adminAuth = localStorage.getItem("adminAuth");
      if (adminAuth) {
        const { authenticated } = JSON.parse(adminAuth);
        if (authenticated) {
          navigate("/admin/dashboard");
          return;
        }
      }
      // Check Supabase auth
      const user = await getCurrentUser();
      if (user) {
        navigate("/admin/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check hardcoded admin credentials first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", JSON.stringify({ email, authenticated: true }));
      navigate("/admin/dashboard");
      return;
    }

    // Fallback to Supabase auth
    const { data, error: signInError } = await signIn(email, password);

    if (signInError) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    if (data?.user) {
      navigate("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#382467]/10 via-white to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#382467] to-[#5a3d8a] p-6 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-white/70 text-sm mt-1">ScribbleSense Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#382467] hover:bg-[#4a3080] text-white py-3"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-4">
          © 2024 ScribbleSense. Admin Portal.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

