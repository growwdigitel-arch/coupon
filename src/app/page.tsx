"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Mail, Menu, X, Zap, ArrowRight, Play, CheckCircle2, TrendingUp,
  Send, CreditCard, BarChart3, Upload, FileCode, Tag, Wallet, Calendar,
  Users, LayoutDashboard, FileDown, ShieldCheck, Clock, Copy, EyeOff,
  AlertTriangle, Check, Star, Quote, ChevronDown, Sparkles, Lock,
  ArrowUpRight, RefreshCw, Layers, Globe, Sliders, CheckCircle, HelpCircle,
  Building2, MessageSquare, ChevronRight, ShieldAlert, Award
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════
   ANIMATION WRAPPERS
══════════════════════════════════════════════════════════════════════ */
function FadeIn({
  children,
  delay = 0,
  className = "",
  dir = "up",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  dir?: "up" | "down" | "left" | "right" | "none";
  style?: React.CSSProperties;
}) {
  const y = dir === "up" ? 24 : dir === "down" ? -24 : 0;
  const x = dir === "left" ? 24 : dir === "right" ? -24 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StaggerGrid({
  children,
  className = "",
  gap = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TOP ANNOUNCEMENT BAR & NAVBAR
══════════════════════════════════════════════════════════════════════ */
function AnnouncementBar() {
  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium border-b border-slate-800">
      <div className="wrap flex items-center justify-center gap-2">
        <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
          Festive Offer
        </span>
        <span>🎉 Get 500 Free Email Credits upon Gmail connection!</span>
        <Link href="#pricing" className="text-indigo-300 hover:text-white font-bold underline ml-1 inline-flex items-center gap-0.5">
          Claim Now <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#bento", label: "Overview" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#showcase", label: "Product" },
    { href: "#integrations", label: "Integrations" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`w-full transition-all duration-300 ${scrolled ? "glass-header shadow-sm py-3" : "bg-white/80 backdrop-blur-md py-4 border-b border-slate-200/80"}`}>
        <div className="wrap flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-9 h-9 rounded-xl gb flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Mail className="text-white w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Coupon<span className="gt">Mail</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/70">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 rounded-full transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 no-underline">
              Log in
            </Link>
            <Link href="/login" className="btn-primary text-xs !py-2.5 !px-5 !rounded-full">
              <Zap className="w-3.5 h-3.5" />
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden shadow-xl"
          >
            <div className="wrap py-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold text-slate-700 hover:text-indigo-600 py-2 border-b border-slate-100 no-underline flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
              <div className="flex flex-col gap-2.5 mt-2 pt-2">
                <Link href="/login" className="btn-secondary text-center justify-center">
                  Log in
                </Link>
                <Link href="/login" className="btn-primary text-center justify-center">
                  <Zap className="w-4 h-4" /> Start Free Trial
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative pt-12 lg:pt-16 pb-20 lg:pb-28 overflow-hidden bg-dot-pattern">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="wrap relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <FadeIn>
              <div className="pill-badge mb-6 inline-flex shadow-md bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border-indigo-200">
                <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span className="font-extrabold text-indigo-900">AI-Powered Coupon & Email Engine</span>
                <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ml-1 shadow-xs">v3.0 AI</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6">
                Send <span className="gt">AI-Personalized</span> <br className="hidden sm:inline" />
                Coupon Emails <br className="hidden sm:inline" />
                In Seconds
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Upload your customer Excel sheet, let AI generate high-converting email copy, connect Gmail or Brevo in 30 seconds, dynamically substitute unique coupon codes, and collect PayU payments effortlessly.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <Link href="/login" className="btn-primary text-base px-8 py-3.5">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link href="#showcase" className="btn-secondary text-base px-7 py-3.5">
                  <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" /> Book Product Demo
                </Link>
              </div>
            </FadeIn>

            {/* Trust Checklist */}
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-semibold text-slate-600 border-t border-slate-200/80 pt-6">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Free 100 Credits Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Google OAuth 2.0 Certified</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Dashboard Visual Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <FadeIn delay={0.2} dir="left" className="w-full max-w-lg lg:max-w-none">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse" />

                {/* Dashboard Frame */}
                <div className="relative bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-slate-100">
                  {/* Chrome header */}
                  <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-3 py-0.5 rounded-md border border-slate-800">
                      app.couponmail.io/live-campaigns
                    </div>
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500 animate-spin" />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    {/* Stat Badges Row */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-medium">Emails Sent</div>
                        <div className="text-lg font-extrabold text-white mt-0.5">24,891</div>
                        <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">↑ 99.8% Inbox Rate</div>
                      </div>
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-medium">Avg Open Rate</div>
                        <div className="text-lg font-extrabold text-indigo-400 mt-0.5">68.4%</div>
                        <div className="text-[9px] text-indigo-300 font-semibold mt-0.5">↑ 3.2x Industry</div>
                      </div>
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-medium">Wallet Credits</div>
                        <div className="text-lg font-extrabold text-emerald-400 mt-0.5">₹1,240</div>
                        <div className="text-[9px] text-slate-400 font-semibold mt-0.5">2,480 Remaining</div>
                      </div>
                    </div>

                    {/* Progress Component */}
                    <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">Diwali VIP Coupon Campaign</span>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold">Sending Live</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "82%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>4,100 / 5,000 Delivered</span>
                        <span>82% Complete</span>
                      </div>
                    </div>

                    {/* Customer Rows */}
                    <div className="space-y-2">
                      {[
                        { name: "StyleNova", email: "hello@stylenova.in", code: "NOVA50", status: "Opened", time: "1m ago" },
                        { name: "NexaTech", email: "campaigns@nexatech.io", code: "NEXA30", status: "Delivered", time: "3m ago" },
                        { name: "BrandXpert", email: "promo@brandxpert.in", code: "FESTIVE20", status: "Clicked", time: "5m ago" },
                      ].map((row, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-[10px] font-bold text-indigo-300">
                              {row.name[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-200">{row.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{row.code}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                              {row.status}
                            </span>
                            <div className="text-[9px] text-slate-500 mt-0.5">{row.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Preview Card 1: Dynamic Code */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200 hidden sm:block w-48 text-slate-900"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-bold">Dynamic Personalization</span>
                  </div>
                  <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 text-center">
                    <span className="text-[10px] text-slate-500 block">Unique Code Per Row:</span>
                    <span className="text-lg font-black text-indigo-600 tracking-wider">NOVA50</span>
                  </div>
                </motion.div>

                {/* Floating Preview Card 2: AI Subject Line Assistant */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -top-6 -right-6 bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-indigo-500/40 hidden sm:block w-60"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5 text-purple-300 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                      <span>AI Copy Generator</span>
                    </div>
                    <span className="text-[9px] bg-purple-500/30 text-purple-200 font-extrabold px-1.5 py-0.5 rounded">GPT-4o</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-mono">
                    <span className="text-purple-400 font-bold">Subject:</span> &quot;🪔 Exclusive Diwali Gift Reserved For {"{{First_Name}}"}!&quot;
                  </div>
                  <div className="mt-1.5 text-[9px] text-emerald-400 font-bold text-right">
                    +48% Open Rate Predicted
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   STATS METRICS BAR
══════════════════════════════════════════════════════════════════════ */
function MetricStats() {
  const metrics = [
    { value: "50M+", label: "Personalized Emails Delivered" },
    { value: "99.8%", label: "Inbox Placement Rate" },
    { value: "68.4%", label: "Average Open Rate" },
    { value: "2,400+", label: "Active Brands in India" }
  ];

  return (
    <section className="py-12 bg-slate-900 text-white border-y border-slate-800">
      <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-indigo-400 tracking-tight">{item.value}</div>
            <div className="text-xs text-slate-400 font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   RUNNING COUPON TEMPLATES CAROUSEL (Marquee)
══════════════════════════════════════════════════════════════════════ */
function TemplateCouponMarquee() {
  const templates = [
    {
      id: "diwali",
      name: "🪔 Diwali Mega Festive Sale",
      category: "Festive",
      coupon: "DIWALI50",
      discount: "50% OFF",
      badge: "Most Popular",
      gradient: "from-amber-600 via-orange-600 to-yellow-600",
      bg: "bg-slate-900 border-amber-500/40 text-amber-200",
    },
    {
      id: "flash",
      name: "⚡ 24-Hour Flash Sale Alert",
      category: "Urgent",
      coupon: "FLASH30",
      discount: "FLAT 30% OFF",
      badge: "High Conversion",
      gradient: "from-rose-600 via-red-600 to-orange-600",
      bg: "bg-slate-900 border-rose-500/40 text-rose-200",
    },
    {
      id: "vip",
      name: "👑 VIP Member Exclusive",
      category: "Loyalty",
      coupon: "VIPFLAT40",
      discount: "FLAT ₹500 OFF",
      badge: "VIP Only",
      gradient: "from-purple-600 via-indigo-600 to-violet-600",
      bg: "bg-slate-900 border-purple-500/40 text-purple-200",
    },
    {
      id: "cart",
      name: "🛒 Abandoned Cart Recovery",
      category: "Re-engagement",
      coupon: "CART20",
      discount: "20% OFF CART",
      badge: "Recovery",
      gradient: "from-blue-600 via-indigo-600 to-sky-600",
      bg: "bg-slate-900 border-blue-500/40 text-blue-200",
    },
    {
      id: "new",
      name: "🌿 New Collection Early Access",
      category: "Product Launch",
      coupon: "LAUNCH15",
      discount: "EARLY 15% OFF",
      badge: "New Drop",
      gradient: "from-emerald-600 via-teal-600 to-green-600",
      bg: "bg-slate-900 border-emerald-500/40 text-emerald-200",
    },
    {
      id: "birthday",
      name: "🎂 Birthday Special Gift",
      category: "Personal Touch",
      coupon: "BDAYGIFT",
      discount: "FREE GIFT + 25%",
      badge: "Personal",
      gradient: "from-pink-600 via-rose-600 to-fuchsia-600",
      bg: "bg-slate-900 border-pink-500/40 text-pink-200",
    },
    {
      id: "weekend",
      name: "🎉 Weekend Sale Special",
      category: "Promotion",
      coupon: "WEEKEND25",
      discount: "FLAT 25% OFF",
      badge: "Weekend Deal",
      gradient: "from-orange-600 via-amber-600 to-yellow-600",
      bg: "bg-slate-900 border-orange-500/40 text-orange-200",
    },
    {
      id: "winback",
      name: "💌 We Miss You — Win-Back",
      category: "Win-Back",
      coupon: "MISSYOU20",
      discount: "WELCOME BACK 20%",
      badge: "Win-Back",
      gradient: "from-teal-600 via-cyan-600 to-emerald-600",
      bg: "bg-slate-900 border-teal-500/40 text-teal-200",
    },
  ];

  const duplicated = [...templates, ...templates];

  return (
    <section className="py-16 bg-slate-950 border-y border-slate-800/80 text-white overflow-hidden relative">
      <div className="wrap mb-10 text-center">
        <div className="pill-badge mb-3 bg-slate-900 text-indigo-400 border-slate-800">
          <span>🎨 10+ Pre-Built Templates</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          Stunning Ready-To-Send <span className="gt">Coupon Email Templates</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Hover to pause carousel • 100% responsive HTML layouts with live dynamic code substitution
        </p>
      </div>

      {/* Marquee Track */}
      <div className="relative flex overflow-x-hidden">
        {/* Fade gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 px-4">
          {duplicated.map((item, idx) => (
            <div
              key={idx}
              className={`w-72 sm:w-80 p-5 rounded-3xl border shadow-xl flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-shrink-0 ${item.bg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white bg-gradient-to-r ${item.gradient} shadow-sm`}>
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{item.category}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-3 line-clamp-1">{item.name}</h3>

                {/* Coupon Code Pill */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center my-3">
                  <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Assigned Coupon</div>
                  <div className="text-lg font-black font-mono tracking-widest text-amber-400 mt-0.5">
                    {item.coupon}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold mt-0.5">{item.discount}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                <span className="text-slate-400 text-[10px]">HTML &amp; Mobile Ready</span>
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-bold text-[11px] no-underline flex items-center gap-1">
                  Use Template →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════════════
   BENTO GRID HIGHLIGHTS
══════════════════════════════════════════════════════════════════════ */
function BentoHighlights() {
  return (
    <section id="bento" className="py-24 bg-white">
      <div className="wrap">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Built For Scale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why High-Growth Teams <br />
            <span className="gt">Choose CouponMail</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Eliminate manual coupon errors, improve deliverability, and automate recipient tracking.
          </p>
        </FadeIn>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* Card 1 - Large Feature */}
          <div className="md:col-span-8 card-hover p-8 flex flex-col justify-between bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 border-indigo-100">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-md shadow-indigo-600/30">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">
                Native Gmail OAuth 2.0 Sending
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Send directly through your own Gmail or Google Workspace accounts. Because emails originate from your genuine domain, deliverability skyrockets to over 99.8% into the primary inbox.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No SMTP Setup</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> SPF & DKIM Compliant</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Google Verified</span>
            </div>
          </div>

          {/* Card 2 - Razorpay Integration */}
          <div className="md:col-span-4 card-hover p-8 flex flex-col justify-between bg-slate-900 text-white border-slate-800">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-6 shadow-md shadow-emerald-500/30">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold mb-3">Razorpay Wallet</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Top up email credits instantly using UPI, Paytm, GPay, or Net Banking in Indian Rupees (INR).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400">
              ✓ Auto GST Tax Invoices
            </div>
          </div>

          {/* Card 3 - Dynamic Personalization */}
          <div className="md:col-span-4 card-hover p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/30">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Dynamic Coupons</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically substitute unique coupon codes (`FESTIVE20`, `VIPFLAT50`) per customer row without manual copy-pasting.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-indigo-600">
              0% Code Duplication Rate →
            </div>
          </div>

          {/* Card 4 - Realtime Analytics */}
          <div className="md:col-span-8 card-hover p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-6 shadow-md shadow-purple-600/30">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Real-Time Delivery & Open Analytics</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Know exact details on who received your email, when it was opened, which links were clicked, and how many discount codes were redeemed.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Includes Bounced Email Auto-Refunds</span>
              <span className="font-bold text-indigo-600">Live Dashboard →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PROBLEM SECTION
══════════════════════════════════════════════════════════════════════ */
function ProblemSection() {
  const painPoints = [
    {
      icon: Clock,
      title: "Manual Email Chaos",
      desc: "Sending individual emails one by one takes hours, slows down sales, and drains your team's energy.",
      tag: "Time Wasted",
      tagBg: "bg-rose-50 text-rose-600 border-rose-200"
    },
    {
      icon: Copy,
      title: "Copy-Paste Errors",
      desc: "Manually replacing coupon codes leads to embarrassing typos, invalid codes, and lost customer trust.",
      tag: "High Risk",
      tagBg: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      icon: EyeOff,
      title: "Zero Visibility",
      desc: "After hitting send on Gmail, you have no idea who opened the email or redeemed their coupon.",
      tag: "Blind Spot",
      tagBg: "bg-orange-50 text-orange-600 border-orange-200"
    },
    {
      icon: AlertTriangle,
      title: "Spam Folder Traps",
      desc: "Bulk emailing without OAuth authentication lands your promotional emails straight into spam.",
      tag: "Low Delivery",
      tagBg: "bg-red-50 text-red-600 border-red-200"
    }
  ];

  return (
    <section id="problem" className="py-24 bg-slate-50/70 border-y border-slate-200/80">
      <div className="wrap">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <span>😩 The Old Way vs The CouponMail Way</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Stop Sending Coupon Emails <br />
            <span className="gt">The Painful Manual Way</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Sending customer coupons shouldn't require complex spreadsheets, copy-pasting code, or guesswork.
          </p>
        </FadeIn>

        {/* 2x2 Pain Point Grid */}
        <StaggerGrid className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {painPoints.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="card-hover p-7 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.tagBg}`}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FEATURES GRID SECTION (12 Cards)
══════════════════════════════════════════════════════════════════════ */
function Features() {
  const featuresList = [
    {
      icon: Sparkles,
      title: "AI Email Copywriter",
      desc: "Generate high-converting subject lines, coupon emails, and emojis using built-in AI assistant.",
      color: "from-purple-600 to-indigo-600",
      badge: "AI Powered"
    },
    {
      icon: Mail,
      title: "Gmail & Brevo Gateway",
      desc: "Connect your Gmail account via OAuth 2.0 or central Brevo API for 99.8% inbox placement.",
      color: "from-blue-500 to-indigo-600",
      badge: "Popular"
    },
    {
      icon: Upload,
      title: "CSV & Excel Import",
      desc: "Upload customer lists with one click. Automatic column mapping for Names, Emails, and Codes.",
      color: "from-emerald-500 to-teal-600",
      badge: "Essential"
    },
    {
      icon: Tag,
      title: "Personalized Coupons",
      desc: "Embed unique codes into dynamic templates like {{coupon_code}} for 0% copy-paste mistakes.",
      color: "from-orange-500 to-amber-600",
      badge: "Core"
    },
    {
      icon: FileCode,
      title: "HTML Templates",
      desc: "Use clean pre-designed templates or build your own custom HTML layout with live preview.",
      color: "from-purple-500 to-violet-600",
      badge: "Editor"
    },
    {
      icon: CreditCard,
      title: "Payment Gateway",
      desc: "Seamless integration with Razorpay and Stripe to purchase send credits instantly.",
      color: "from-rose-500 to-pink-600",
      badge: "Razorpay"
    },
    {
      icon: Wallet,
      title: "Credit Wallet",
      desc: "Top up credits as you grow. Pay only for what you send with non-expiring credit balance.",
      color: "from-indigo-500 to-blue-600",
      badge: "Flexible"
    },
    {
      icon: BarChart3,
      title: "Email Analytics",
      desc: "Track open rates, click rates, bounces, and coupon redemption statistics in real time.",
      color: "from-cyan-500 to-teal-600",
      badge: "Live"
    },
    {
      icon: Calendar,
      title: "Scheduled Campaigns",
      desc: "Pick exact send times in IST. Schedule holiday or weekend discount campaigns in advance.",
      color: "from-amber-500 to-orange-600",
      badge: "Auto"
    },
    {
      icon: Users,
      title: "Multi-User Team",
      desc: "Invite teammates, assign granular roles (Admin, Editor, Viewer), and manage shared lists.",
      color: "from-fuchsia-500 to-purple-600",
      badge: "Teams"
    },
    {
      icon: LayoutDashboard,
      title: "Admin Dashboard",
      desc: "Centralized control center for managing campaigns, wallet balance, templates, and analytics.",
      color: "from-slate-600 to-slate-800",
      badge: "Control"
    },
    {
      icon: FileDown,
      title: "Reports & Exports",
      desc: "Export campaign performance summaries to PDF or CSV for executive reporting.",
      color: "from-teal-500 to-emerald-600",
      badge: "Export"
    },
    {
      icon: ShieldCheck,
      title: "Secure Auth",
      desc: "Bank-grade OAuth 2.0 authentication, end-to-end encryption, and GDPR compliance.",
      color: "from-red-500 to-rose-600",
      badge: "Secure"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="wrap">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Complete Feature Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Everything You Need To <br />
            <span className="gt">Run Automated Coupon Campaigns</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            12 powerful tools built specifically for modern e-commerce, SaaS, and retail businesses.
          </p>
        </FadeIn>

        {/* 12 Cards Grid */}
        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuresList.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="card-hover p-6 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HOW IT WORKS SECTION (6 Steps)
══════════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Upload CSV List", desc: "Import your customer contacts along with custom variables and unique codes.", icon: Upload },
    { num: "02", title: "Connect Gmail", desc: "Authorize your Gmail or Google Workspace account safely with OAuth 2.0.", icon: Mail },
    { num: "03", title: "Pick Template", desc: "Choose a pre-tested HTML email layout or paste your custom email design.", icon: FileCode },
    { num: "04", title: "Top Up Credits", desc: "Pay for email credits using Razorpay or Stripe. Pay only for what you send.", icon: CreditCard },
    { num: "05", title: "Send Campaigns", desc: "Launch instantly or schedule for peak opening hours in India.", icon: Send },
    { num: "06", title: "Track Results", desc: "Monitor opens, clicks, delivery success, and coupon redemptions live.", icon: BarChart3 }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50/70 border-y border-slate-200/80">
      <div className="wrap">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <span>🚀 Simple 6-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How CouponMail Works <br />
            <span className="gt">In 6 Easy Steps</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            No technical knowledge required. Launch your first automated campaign in under 5 minutes.
          </p>
        </FadeIn>

        {/* 6 Steps Grid */}
        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <StaggerItem key={idx}>
              <div className="card-hover p-7 h-full flex flex-col justify-between relative group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-indigo-600 transition-colors">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PRODUCT SHOWCASE TABS SECTION (SaaS UI Application Screens)
══════════════════════════════════════════════════════════════════════ */
function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: "dashboard", label: "📊 Campaign Dashboard", icon: "📊" },
    { id: "templates", label: "🎨 Email Templates Library", icon: "🎨" },
    { id: "composer", label: "⚡ Visual Email Composer", icon: "⚡" },
    { id: "importer", label: "📁 Excel & CSV Importer", icon: "📁" },
    { id: "wallet", label: "💳 PayU Wallet & Packages", icon: "💳" },
    { id: "admin", label: "🛡 Owner Admin Panel", icon: "🛡" },
  ];

  return (
    <section id="showcase" className="py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="wrap relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <div className="pill-badge mb-4 bg-slate-900/90 text-indigo-400 border-slate-800 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Enterprise SaaS Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
            Built Like A World-Class <br />
            <span className="gt">Application Workspace</span>
          </h2>
          <p className="text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
            Experience the clean, intuitive interface designed for modern e-commerce teams, marketers, and platform administrators.
          </p>
        </FadeIn>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                activeTab === idx
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30 scale-105"
                  : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border-slate-800"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>

        {/* macOS Desktop Application Window Frame */}
        <div className="max-w-5xl mx-auto bg-slate-900/90 rounded-3xl border border-slate-800/90 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Top Chrome Bar */}
          <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1 rounded-full text-xs font-mono text-slate-400">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>https://app.couponmail.io/{tabs[activeTab].id}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Workspace</span>
            </div>
          </div>

          {/* Application Canvas Body */}
          <div className="p-6 sm:p-8 bg-slate-950/60 min-h-[440px]">

            {/* SCREEN 1: CAMPAIGN DASHBOARD */}
            {activeTab === 0 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Active Workspace</div>
                    <h3 className="text-xl font-extrabold text-white mt-0.5">StyleNova Fashion House Dashboard</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 17,500 Credits Active
                    </span>
                  </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">Subscribed Package</div>
                    <div className="text-lg font-black text-white mt-1">Growth Plan</div>
                    <div className="text-[10px] text-emerald-400 font-bold mt-1">₹999/mo · 5k Sends</div>
                  </div>
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">Emails Delivered</div>
                    <div className="text-lg font-black text-indigo-400 mt-1">11,800</div>
                    <div className="text-[10px] text-indigo-300 font-bold mt-1">↑ 99.8% Inbox Placement</div>
                  </div>
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">Avg Open Rate</div>
                    <div className="text-lg font-black text-emerald-400 mt-1">71.4%</div>
                    <div className="text-[10px] text-emerald-400 font-bold mt-1">↑ 3.2x Industry Standard</div>
                  </div>
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium">Coupon Click Rate</div>
                    <div className="text-lg font-black text-purple-400 mt-1">28.6%</div>
                    <div className="text-[10px] text-purple-300 font-bold mt-1">3,374 Redemptions</div>
                  </div>
                </div>

                {/* Live Campaign Table */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-200">StyleNova Diwali Mega Collection Launch</span>
                    <span className="text-emerald-400 font-mono">11,800 / 12,500 Sent</span>
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      { name: "Ananya Roy", email: "ananya@example.com", code: "NOVA50", status: "Opened", time: "2 mins ago" },
                      { name: "Siddharth Malhotra", email: "sid@example.com", code: "NOVA50", status: "Clicked", time: "5 mins ago" },
                      { name: "Kavita Rao", email: "kavita@example.com", code: "NOVA50", status: "Delivered", time: "10 mins ago" },
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-xs">
                            {row.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-white">{row.name}</div>
                            <div className="text-[10px] text-slate-400">{row.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-amber-400 font-bold text-xs">{row.code}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 2: EMAIL TEMPLATES LIBRARY */}
            {activeTab === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">10 Prebuilt HTML Templates</h3>
                    <p className="text-xs text-slate-400">Tested across Gmail, Outlook, Apple Mail &amp; Mobile</p>
                  </div>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 font-bold px-3 py-1 rounded-full border border-indigo-500/30">
                    100% Responsive HTML
                  </span>
                </div>

                {/* Templates Grid */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { title: "🪔 Diwali Festive Collection", cat: "Festive Marketing", badge: "Gold Luxury", color: "from-amber-600 to-yellow-600" },
                    { title: "⚡ 24-Hour Flash Sale Alert", cat: "Urgent Offer", badge: "Neon Urgency", color: "from-rose-600 to-red-600" },
                    { title: "👑 VIP Loyalty Member Reward", cat: "Retention", badge: "Royal Purple", color: "from-purple-600 to-indigo-600" },
                    { title: "🛒 Abandoned Cart Recovery", cat: "Re-engagement", badge: "Clean Blue", color: "from-blue-600 to-indigo-600" },
                    { title: "🎂 Birthday Special Reward", cat: "Personal Touch", badge: "Warm Pink", color: "from-pink-600 to-rose-600" },
                    { title: "🤝 Referral Program Bonus", cat: "Growth", badge: "Rich Violet", color: "from-violet-600 to-purple-600" },
                  ].map((tpl, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-indigo-500/50 transition-all group">
                      <div className={`h-24 rounded-xl bg-gradient-to-br ${tpl.color} p-3 flex flex-col justify-between shadow-md`}>
                        <span className="text-[10px] bg-black/40 text-white font-bold px-2 py-0.5 rounded-full self-start">
                          {tpl.badge}
                        </span>
                        <div className="text-xs font-black text-white truncate">{tpl.title}</div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[10px] font-medium">{tpl.cat}</span>
                        <span className="text-indigo-400 font-bold text-[11px] group-hover:underline">Use Template →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCREEN 3: VISUAL EMAIL COMPOSER */}
            {activeTab === 2 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-lg font-bold text-white">Dynamic Tag Substitution Editor</h3>
                  <span className="text-xs font-mono text-emerald-400">Zero Copy-Paste Mistakes</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Left: Raw Code & Tags */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
                    <div className="text-slate-500 font-bold">// Available Personalization Tags:</div>
                    <div className="flex flex-wrap gap-1.5 text-[10px]">
                      <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">{"{{First_Name}}"}</span>
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded border border-amber-500/30">{"{{Coupon_Code}}"}</span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/30">{"{{Expiry_Date}}"}</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed text-[11px]">
                      &lt;h1&gt;Happy Diwali, <span className="text-indigo-400">{"{{First_Name}}"}</span>! 🎆&lt;/h1&gt;<br/>
                      &lt;div class=&quot;coupon-box&quot;&gt;<br/>
                      &nbsp;&nbsp;&lt;span&gt;<span className="text-amber-400 font-bold">{"{{Coupon_Code}}"}</span>&lt;/span&gt;<br/>
                      &lt;/div&gt;<br/>
                      &lt;p&gt;Valid until <span className="text-emerald-400">{"{{Expiry_Date}}"}</span>.&lt;/p&gt;
                    </div>
                  </div>
                  {/* Right: Live Rendered Card */}
                  <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 p-5 rounded-2xl border border-purple-800/40 space-y-3 text-center">
                    <div className="text-xs text-purple-300 font-bold uppercase tracking-widest">Live HTML Email Preview</div>
                    <div className="text-xl font-extrabold text-white">Happy Diwali, Ananya Roy! 🎆</div>
                    <div className="bg-amber-400/10 border-2 dashed border-amber-400/40 p-3 rounded-xl inline-block my-2">
                      <span className="font-mono text-2xl font-black text-amber-300 tracking-widest">NOVA50</span>
                    </div>
                    <div className="text-xs text-slate-300">Valid until <strong>15 Nov 2026</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 4: EXCEL & CSV IMPORTER */}
            {activeTab === 3 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">Spreadsheet Column Mapping Engine</h3>
                    <p className="text-xs text-slate-400">Parses .xlsx, .xls, and .csv files automatically</p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                    12,500 Customer Rows Verified
                  </span>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden text-xs">
                  <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-slate-400 font-mono text-[11px] flex justify-between">
                    <span>File: StyleNova_Diwali_VIP_Customers.xlsx</span>
                    <span className="text-emerald-400">✔ 100% Parsed (0 Errors)</span>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[11px]">
                      <tr>
                        <th className="p-3 font-semibold">Row</th>
                        <th className="p-3 font-semibold">Customer Name</th>
                        <th className="p-3 font-semibold">Email Address</th>
                        <th className="p-3 font-semibold">Coupon Code</th>
                        <th className="p-3 font-semibold">Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-200">
                      <tr><td className="p-3 text-slate-500 font-mono">1</td><td className="p-3 font-bold">Ananya Roy</td><td className="p-3 text-slate-400">ananya@example.com</td><td className="p-3 font-mono text-amber-400 font-bold">NOVA50</td><td className="p-3 text-slate-400">2026-11-15</td></tr>
                      <tr><td className="p-3 text-slate-500 font-mono">2</td><td className="p-3 font-bold">Siddharth Malhotra</td><td className="p-3 text-slate-400">sid@example.com</td><td className="p-3 font-mono text-amber-400 font-bold">NOVA50</td><td className="p-3 text-slate-400">2026-11-15</td></tr>
                      <tr><td className="p-3 text-slate-500 font-mono">3</td><td className="p-3 font-bold">Kavita Rao</td><td className="p-3 text-slate-400">kavita@example.com</td><td className="p-3 font-mono text-amber-400 font-bold">NOVA50</td><td className="p-3 text-slate-400">2026-11-15</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SCREEN 5: PAYU WALLET & PACKAGES */}
            {activeTab === 4 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-lg font-bold text-white">PayU Gateway &amp; Wallet System</h3>
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    🔒 PCI-DSS Compliant PayU Gateway
                  </span>
                </div>
                <div className="grid sm:grid-cols-4 gap-3">
                  {[
                    { label: "Starter", price: "₹249", credits: "1,000 Cr", popular: false },
                    { label: "Growth", price: "₹999", credits: "5,000 Cr", popular: true },
                    { label: "Pro", price: "₹1,999", credits: "12,000 Cr", popular: false },
                    { label: "Enterprise", price: "₹3,999", credits: "30,000 Cr", popular: false },
                  ].map((p, i) => (
                    <div key={i} className={`p-4 rounded-2xl bg-slate-900 border ${p.popular ? "border-indigo-500 ring-1 ring-indigo-500" : "border-slate-800"} text-center space-y-2`}>
                      <div className="text-[10px] text-slate-400 uppercase font-extrabold">{p.label} Plan</div>
                      <div className="text-2xl font-black text-white">{p.price}</div>
                      <div className="text-xs font-bold text-indigo-400">{p.credits}</div>
                      <button className="w-full py-1.5 rounded-lg text-[10px] font-bold bg-indigo-600 text-white mt-1">
                        Select Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCREEN 6: OWNER ADMIN PANEL */}
            {activeTab === 5 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">Platform Owner Control Center</h3>
                    <p className="text-xs text-slate-400">Manage all registered accounts, global gateway &amp; inspect files</p>
                  </div>
                  <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
                    OWNER ROLE ACTIVE
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Total Active Users</div>
                    <div className="text-2xl font-black text-white mt-1">2,400+ Brands</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Global Platform Gateway</div>
                    <div className="text-lg font-black text-emerald-400 mt-1">🟢 Brevo 100k API</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Total Emails Sent</div>
                    <div className="text-2xl font-black text-purple-400 mt-1">50.4 Million</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════════════
   INTEGRATIONS SECTION
══════════════════════════════════════════════════════════════════════ */
function Integrations() {
  const integrations = [
    { name: "Gmail", desc: "Native OAuth 2.0 integration for inbox deliverability.", icon: Mail, status: "Connected", bg: "bg-red-50 text-red-600 border-red-200" },
    { name: "Google Workspace", desc: "Connect business domain email addresses seamlessly.", icon: RefreshCw, status: "Supported", bg: "bg-blue-50 text-blue-600 border-blue-200" },
    { name: "Razorpay", desc: "Instant UPI, Cards & Netbanking top-up for credits.", icon: CreditCard, status: "Native", bg: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    { name: "Stripe", desc: "International payment support for USD billing.", icon: Wallet, status: "Global", bg: "bg-purple-50 text-purple-600 border-purple-200" },
    { name: "CSV / Excel", desc: "Drag & drop spreadsheet parsing with column mapping.", icon: Upload, status: "Instant", bg: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { name: "Zapier", desc: "Automate triggers from Shopify, WooCommerce & CRM.", icon: Zap, status: "Coming Soon", bg: "bg-amber-50 text-amber-600 border-amber-200" },
    { name: "Webhooks", desc: "Receive real-time email open & redemption events.", icon: ArrowUpRight, status: "API Access", bg: "bg-teal-50 text-teal-600 border-teal-200" },
    { name: "REST API", desc: "Programmatic campaign sending and credit checks.", icon: Lock, status: "Enterprise", bg: "bg-slate-100 text-slate-700 border-slate-300" }
  ];

  return (
    <section id="integrations" className="py-24 bg-white">
      <div className="wrap">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <span>🔌 Seamless Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Connects With Your <br />
            <span className="gt">Existing Tech Stack</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Native integrations built to sync with your email providers, payment gateways, and spreadsheets.
          </p>
        </FadeIn>

        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {integrations.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="card-hover p-6 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.bg}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PRICING SECTION
══════════════════════════════════════════════════════════════════════ */
function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      priceMonthly: "₹0",
      priceAnnual: "₹0",
      desc: "Perfect for testing out CouponMail features.",
      features: [
        "100 Emails per month",
        "Gmail Connection",
        "3 Basic Email Templates",
        "CSV File Upload",
        "Standard Delivery"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Starter",
      priceMonthly: "₹499",
      priceAnnual: "₹399",
      desc: "For small stores running seasonal sales.",
      features: [
        "5,000 Emails per month",
        "Gmail & Google Workspace",
        "Full Analytics Dashboard",
        "Campaign Scheduling",
        "CSV & Excel Import"
      ],
      cta: "Get Starter",
      popular: false
    },
    {
      name: "Professional",
      priceMonthly: "₹1,499",
      priceAnnual: "₹1,199",
      desc: "For growing brands needing scale and team tools.",
      features: [
        "25,000 Emails per month",
        "Everything in Starter",
        "Up to 5 Team Workspace Members",
        "Custom HTML Email Composer",
        "Priority Support & Webhooks"
      ],
      cta: "Get Professional",
      popular: true
    },
    {
      name: "Enterprise",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      desc: "For large platforms with custom API volume.",
      features: [
        "Unlimited Email Volume",
        "Dedicated Account Manager",
        "Custom API Access",
        "99.9% SLA Guarantee",
        "Custom Contract & GST Invoice"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50/70 border-y border-slate-200/80">
      <div className="wrap">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <div className="pill-badge mb-4">
            <span>💰 Simple & Fair Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Transparent Pricing <br />
            <span className="gt">No Hidden Charges</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-6">
            Start for free and upgrade as your customer list expands.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-white border border-slate-200 rounded-full shadow-2xs">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !isAnnual ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAnnual ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-black">
                Save 20%
              </span>
            </button>
          </div>
        </FadeIn>

        {/* 4 Cards Grid */}
        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <StaggerItem key={idx} className="flex">
              <div
                className={`w-full p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "gb text-white shadow-2xl shadow-indigo-500/30 scale-105 z-10 border-2 border-indigo-400"
                    : "bg-white border border-slate-200 text-slate-900 hover:shadow-xl"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-extrabold ${plan.popular ? "text-white" : "text-slate-900"}`}>
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                        ★ Most Popular
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mb-6 ${plan.popular ? "text-indigo-100" : "text-slate-500"}`}>
                    {plan.desc}
                  </p>

                  <div className="mb-6">
                    <span className={`text-4xl font-black ${plan.popular ? "text-white" : "text-slate-900"}`}>
                      {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                    </span>
                    {plan.priceMonthly !== "Custom" && (
                      <span className={`text-xs ml-1 ${plan.popular ? "text-indigo-200" : "text-slate-500"}`}>
                        / month
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 text-xs">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-emerald-300" : "text-emerald-500"}`} />
                        <span className={plan.popular ? "text-indigo-100" : "text-slate-600"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#pricing"
                  className={`w-full text-center py-3 rounded-xl text-xs font-extrabold transition-all no-underline ${
                    plan.popular
                      ? "bg-white text-indigo-700 hover:bg-slate-100 shadow-md"
                      : "btn-primary text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   COMPARISON MATRIX SECTION
══════════════════════════════════════════════════════════════════════ */
function Comparison() {
  const comparisonRows = [
    { feature: "Personalized Coupon Codes", couponmail: true, gmail: false, mailmerge: "Partial", mailchimp: false, brevo: false },
    { feature: "Gmail & Workspace OAuth", couponmail: true, gmail: true, mailmerge: true, mailchimp: false, brevo: false },
    { feature: "CSV / Excel Direct Import", couponmail: true, gmail: false, mailmerge: true, mailchimp: true, brevo: true },
    { feature: "Live Open & Delivery Analytics", couponmail: true, gmail: false, mailmerge: false, mailchimp: true, brevo: true },
    { feature: "Razorpay INR Credit Wallet", couponmail: true, gmail: false, mailmerge: false, mailchimp: false, brevo: false },
    { feature: "Coupon Redemption Tracking", couponmail: true, gmail: false, mailmerge: false, mailchimp: false, brevo: false },
    { feature: "Campaign Scheduling (IST)", couponmail: true, gmail: false, mailmerge: false, mailchimp: true, brevo: true },
    { feature: "Setup Time Required", couponmail: "2 Mins", gmail: "Hours", mailmerge: "30 Mins", mailchimp: "1 Hour", brevo: "1 Hour" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="wrap">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <span>⚖️ Feature Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How CouponMail Compares <br />
            <span className="gt">To Traditional Email Tools</span>
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold text-slate-900">Feature</th>
                  <th className="p-4 font-extrabold text-indigo-600 bg-indigo-50/50 text-center">CouponMail</th>
                  <th className="p-4 font-semibold text-slate-600 text-center">Gmail Manual</th>
                  <th className="p-4 font-semibold text-slate-600 text-center">Mail Merge</th>
                  <th className="p-4 font-semibold text-slate-600 text-center">Mailchimp</th>
                  <th className="p-4 font-semibold text-slate-600 text-center">Brevo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="p-4 text-center bg-indigo-50/30">
                      {typeof row.couponmail === "boolean" ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="font-extrabold text-indigo-600">{row.couponmail}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.gmail === "boolean" ? (
                        row.gmail ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-slate-500">{row.gmail}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.mailmerge === "boolean" ? (
                        row.mailmerge ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-slate-500">{row.mailmerge}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.mailchimp === "boolean" ? (
                        row.mailchimp ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-slate-500">{row.mailchimp}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.brevo === "boolean" ? (
                        row.brevo ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />
                      ) : (
                        <span className="text-slate-500">{row.brevo}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TESTIMONIALS SECTION
══════════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const reviews = [
    {
      name: "Priya Sharma",
      role: "Head of Marketing",
      company: "StyleHub India",
      avatar: "PS",
      content: "CouponMail cut our promotional setup time from 3 days to 15 minutes. Our campaign open rates jumped to 68.4% instantly!"
    },
    {
      name: "Rahul Mehta",
      role: "Founder & CEO",
      company: "TechKart Ventures",
      avatar: "RM",
      content: "The Razorpay integration is seamless. We top up credits, send custom coupons, and track delivery with zero hassle."
    },
    {
      name: "Anita Rao",
      role: "E-Commerce Director",
      company: "Desi Organics",
      avatar: "AR",
      content: "We send festive coupons to 10,000+ customers. Dynamic tags mean zero coupon code errors and zero customer complaints."
    },
    {
      name: "Vikram Singh",
      role: "Growth Lead",
      company: "FoodFirst Delivery",
      avatar: "VS",
      content: "Scheduling campaigns for 9 AM IST on weekends has increased our coupon redemption rates by over 40%."
    },
    {
      name: "Deepa Krishnan",
      role: "Operations Manager",
      company: "SareeWorld Online",
      avatar: "DK",
      content: "Finally a tool tailored for Indian SaaS and e-commerce brands with Razorpay support and clean Gmail OAuth integration."
    },
    {
      name: "Arjun Nair",
      role: "Co-Founder",
      company: "CloudBooks App",
      avatar: "AN",
      content: "The team workspace feature allows our marketing team to collaborate on email drafts easily. 12x ROI on our very first run."
    }
  ];

  return (
    <section className="py-24 bg-slate-50/70 border-y border-slate-200/80">
      <div className="wrap">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <span>💬 Loved By Marketers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            What Our Customers Say <br />
            <span className="gt">About CouponMail</span>
          </h2>
        </FadeIn>

        <StaggerGrid className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <StaggerItem key={idx}>
              <div className="card-hover p-7 h-full flex flex-col justify-between group">
                <div>
                  <Quote className="w-8 h-8 text-indigo-200 mb-4" />
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-6 italic">"{rev.content}"</p>
                </div>
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="w-10 h-10 rounded-full gb flex items-center justify-center text-white font-extrabold text-xs">
                    {rev.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{rev.name}</div>
                    <div className="text-[11px] text-slate-500">{rev.role} • {rev.company}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FAQ ACCORDION SECTION
══════════════════════════════════════════════════════════════════════ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is connecting my Gmail account completely secure?",
      a: "Yes, 100%. We use Google OAuth 2.0 protocol. We never see or store your Gmail password. You can revoke application permissions anytime directly inside your Google Account Security Settings."
    },
    {
      q: "How do email credits work?",
      a: "1 Credit equals 1 Email sent. You can top up your credit wallet anytime using Razorpay or Stripe. Unused credits never expire and roll over indefinitely."
    },
    {
      q: "Can I upload Excel (.xlsx) files directly?",
      a: "Yes! CouponMail accepts CSV (.csv), Excel (.xlsx / .xls), and Google Sheets export files with intelligent column header matching."
    },
    {
      q: "Can I schedule campaigns for future dates?",
      a: "Yes, you can select exact calendar dates and time slots in Indian Standard Time (IST) to automatically launch your discount campaigns."
    },
    {
      q: "Is Razorpay UPI supported?",
      a: "Yes! You can purchase credits instantly via GPay, PhonePe, Paytm, UPI IDs, Net Banking, and Debit/Credit cards through Razorpay."
    },
    {
      q: "Can multiple team members use one workspace?",
      a: "Yes, the Professional and Enterprise plans allow inviting team members with role-based access control."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="wrap max-w-4xl">
        <FadeIn className="text-center mb-16">
          <div className="pill-badge mb-4">
            <span>❓ Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Got Questions? <span className="gt">We Have Answers</span>
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-colors">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-indigo-600 transition-colors"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIdx === idx ? "rotate-180 text-indigo-600" : ""}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HIGH CONVERSION CTA SECTION
══════════════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="wrap">
        <FadeIn>
          <div className="relative rounded-3xl cta-gradient p-10 sm:p-16 text-center text-white overflow-hidden shadow-2xl">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto text-white shadow-lg">
                <Zap className="w-7 h-7 fill-white text-white" />
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                Start Sending Smarter Coupon Campaigns Today
              </h2>

              <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto leading-relaxed">
                Join 2,400+ businesses using CouponMail to automate, personalize, and track every coupon email. Free 100 credits included.
              </p>

              {/* High Contrast Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/login" className="btn-white text-base px-8 py-4 shadow-xl">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link href="#showcase" className="btn-translucent text-base px-8 py-4">
                  <Play className="w-4 h-4 fill-white text-white" /> Schedule Product Demo
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-medium text-indigo-100 pt-4">
                <span>✓ Free 100 Credits Included</span>
                <span>✓ No Credit Card Required</span>
                <span>✓ Cancel Anytime</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   EXPANDED MULTI-COLUMN FOOTER (6 Columns + Newsletter)
══════════════════════════════════════════════════════════════════════ */
function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 text-xs">
      <div className="wrap">
        {/* Newsletter Signup Banner */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-base font-bold text-white">Subscribe to Coupon Marketing Digest</h3>
            <p className="text-xs text-slate-400">Get bi-weekly tips on e-commerce retention, seasonal discount strategies & deliverability hacks.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto items-center gap-2">
            <input
              type="email"
              placeholder="Enter your work email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
            <button type="submit" className="btn-primary text-xs !py-2.5 !px-5 whitespace-nowrap">
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* 6 Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Column 1: Brand & Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 rounded-xl gb flex items-center justify-center">
                <Mail className="text-white w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-black text-white">
                Coupon<span className="gt">Mail</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              The automated coupon email platform engineered for Indian e-commerce brands, SaaS platforms, and retail businesses.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-colors">
                <span className="font-bold text-xs">X</span>
              </Link>
              <Link href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-colors">
                <span className="font-bold text-xs">in</span>
              </Link>
              <Link href="#" aria-label="GitHub" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-colors">
                <span className="font-bold text-xs">gh</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <div className="font-extrabold text-white mb-4 uppercase tracking-wider text-[11px]">Product</div>
            <ul className="space-y-2.5 font-medium">
              <li><Link href="#features" className="hover:text-white transition-colors no-underline">Features Suite</Link></li>
              <li><Link href="#bento" className="hover:text-white transition-colors no-underline">Bento Overview</Link></li>
              <li><Link href="#how-it-works" className="hover:text-white transition-colors no-underline">How It Works</Link></li>
              <li><Link href="#showcase" className="hover:text-white transition-colors no-underline">Email Composer</Link></li>
              <li><Link href="#showcase" className="hover:text-white transition-colors no-underline">Analytics Engine</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors no-underline">Pricing Tiers</Link></li>
            </ul>
          </div>

          {/* Column 3: Integrations */}
          <div>
            <div className="font-extrabold text-white mb-4 uppercase tracking-wider text-[11px]">Integrations</div>
            <ul className="space-y-2.5 font-medium">
              <li><Link href="#integrations" className="hover:text-white transition-colors no-underline">Gmail OAuth 2.0</Link></li>
              <li><Link href="#integrations" className="hover:text-white transition-colors no-underline">Google Workspace</Link></li>
              <li><Link href="#integrations" className="hover:text-white transition-colors no-underline">Razorpay Gateway</Link></li>
              <li><Link href="#integrations" className="hover:text-white transition-colors no-underline">Stripe Global</Link></li>
              <li><Link href="#integrations" className="hover:text-white transition-colors no-underline">CSV & Excel Parser</Link></li>
              <li><Link href="#integrations" className="hover:text-white transition-colors no-underline">REST Webhooks</Link></li>
            </ul>
          </div>

          {/* Column 4: Solutions */}
          <div>
            <div className="font-extrabold text-white mb-4 uppercase tracking-wider text-[11px]">Solutions</div>
            <ul className="space-y-2.5 font-medium">
              <li><Link href="#features" className="hover:text-white transition-colors no-underline">E-Commerce Brands</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors no-underline">SaaS Retention</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors no-underline">Festive Marketing</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors no-underline">D2C Agencies</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors no-underline">Retail Chains</Link></li>
            </ul>
          </div>

          {/* Column 5: Company & Legal */}
          <div>
            <div className="font-extrabold text-white mb-4 uppercase tracking-wider text-[11px]">Legal & Trust</div>
            <ul className="space-y-2.5 font-medium">
              <li><Link href="#faq" className="hover:text-white transition-colors no-underline">FAQ & Support</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors no-underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors no-underline">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors no-underline">Security Whitepaper</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors no-underline">GST Invoicing</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Trust Badges */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="text-slate-400">
            © {new Date().getFullYear()} CouponMail Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span>🔒 SSL 256-Bit Encrypted</span>
            <span>•</span>
            <span>🇮🇳 Made with ❤️ in India</span>
            <span>•</span>
            <span>💳 Razorpay INR Billing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE LAYOUT
══════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/20 selection:text-indigo-600">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MetricStats />
        <TemplateCouponMarquee />
        <BentoHighlights />
        <ProblemSection />
        <Features />
        <HowItWorks />
        <ProductShowcase />
        <Integrations />
        <Pricing />
        <Comparison />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
