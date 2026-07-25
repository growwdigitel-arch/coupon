"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Shield, User, Zap, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const [role, setRole] = useState<"user" | "owner">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginEmail = email.trim() || (role === "owner" ? "admin@couponmail.io" : "hello@stylenova.in");
    setLoading(true);
    setTimeout(() => {
      login(loginEmail, role);
      setLoading(false);
      if (role === "owner") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 400);
  };

  const handleQuickLogin = (demoEmail: string, demoRole: "user" | "owner") => {
    setLoading(true);
    setTimeout(() => {
      login(demoEmail, demoRole);
      setLoading(false);
      if (demoRole === "owner") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-300">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 no-underline mb-6 group">
          <div className="w-10 h-10 rounded-2xl gb flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Mail className="text-white w-5 h-5" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            Coupon<span className="gt">Mail</span>
          </span>
        </Link>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          Sign In to Your Workspace
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Access your user dashboard or platform owner admin panel
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl space-y-6">
          {/* Role Toggle Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                role === "user"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>User / Marketer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                role === "owner"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Owner / Admin</span>
            </button>
          </div>

          {/* Quick Demo Logins Section */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-2">
              ⚡ 1-Click Quick Demo Login
            </div>
            {role === "user" ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("hello@stylenova.in", "user")}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left text-xs transition-all hover:border-indigo-500"
                >
                  <div className="font-bold text-white">StyleNova</div>
                  <div className="text-[10px] text-slate-400 truncate">hello@stylenova.in</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("campaigns@nexatech.io", "user")}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left text-xs transition-all hover:border-indigo-500"
                >
                  <div className="font-bold text-white">NexaTech</div>
                  <div className="text-[10px] text-slate-400 truncate">campaigns@nexatech.io</div>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleQuickLogin("admin@couponmail.io", "owner")}
                className="w-full p-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-700/60 text-center text-xs transition-all"
              >
                <div className="font-bold text-purple-200">Nikhil (Owner Admin Panel)</div>
                <div className="text-[10px] text-purple-300">admin@couponmail.io</div>
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder={role === "owner" ? "admin@couponmail.io" : "hello@stylenova.in"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password <span className="text-[10px] text-slate-500 font-normal">(Optional during Demo)</span>
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 transition-all ${
                role === "owner"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30"
                  : "btn-primary"
              }`}
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In As {role === "owner" ? "Owner Admin" : "User"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
            <span>Don't have an account? </span>
            <button
              type="button"
              onClick={() => handleQuickLogin("newuser@company.com", "user")}
              className="text-indigo-400 font-bold hover:underline"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
