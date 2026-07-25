"use client";

import Link from "next/link";
import {
  Mail, Shield, Sparkles, CreditCard, Lock, CheckCircle2, Zap, ArrowRight,
  FileText, Server, Users, ExternalLink, Key, Gift, Eye, HelpCircle, Building2
} from "lucide-react";

export default function ClientDocumentationPage() {
  const liveUrl = "https://shut-developer-unexpected-locking.trycloudflare.com";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-300">
      {/* Top Banner Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
              <Mail className="text-white w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Coupon<span className="text-indigo-400">Mail</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline text-slate-400 font-medium">Client Platform Specification</span>
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs !py-2 !px-4 !rounded-full shadow-md"
            >
              Open Live App <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* Hero Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Client Evaluation &amp; Product Specification Document</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            CouponMail SaaS Platform <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Client Overview &amp; Roadmap
            </span>
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Comprehensive platform breakdown detailing live demo links, test accounts, payment gateway architecture, AI engine, and post-approval production implementation.
          </p>
        </div>

        {/* 🚨 CRITICAL CLIENT NOTICE 1: DEMO LOGIN */}
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-purple-950/80 border-2 border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg flex-shrink-0">
              🔑
            </div>
            <div>
              <h3 className="text-base font-extrabold text-amber-300">Important Note: 1-Click Demo Login</h3>
              <p className="text-xs text-slate-300 mt-0.5">Frictionless client testing enabled for evaluation phase</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-13">
            To make client review fast and effortless, <strong>1-Click Login Buttons</strong> have been intentionally enabled for this demonstration. You can click <strong>&quot;Login as StyleNova&quot;</strong>, <strong>&quot;Login as NexaTech&quot;</strong>, or <strong>&quot;Login as Owner Admin&quot;</strong> to test all dashboard &amp; owner tools instantly without typing a password.
            <br className="my-1" />
            <span className="text-amber-300 font-bold">👉 Post-Approval Plan:</span> Once you approve the platform design and workflow, we will implement full secure production authentication (password validation, JWT / NextAuth.js tokens, password reset via email, and account security).
          </p>
        </div>

        {/* 🚨 CRITICAL CLIENT NOTICE 2: PAYMENTS */}
        <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-2 border-blue-500/40 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-lg flex-shrink-0">
              💳
            </div>
            <div>
              <h3 className="text-base font-extrabold text-blue-300">Payment Gateway Integration: PayU Active</h3>
              <p className="text-xs text-slate-300 mt-0.5">Currently running PayU Test Mode (Key: gtKFFx)</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-13">
            As of now, the application is integrated with the <strong>PayU Payment Gateway (Test Mode)</strong> for processing package subscriptions and wallet credit top-ups in INR (₹).
            <br className="my-1" />
            <span className="text-blue-300 font-bold">👉 All Payment Gateways Post-Approval:</span> Once the initial client review is completed and approved, we will integrate all payment gateways requested — including <strong>Razorpay, Stripe (USD/International Cards), Paytm, PhonePe UPI, and Netbanking</strong> — for seamless live billing.
          </p>
        </div>

        {/* Demo Accounts Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Pre-Configured Demo Test Accounts
            </h3>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              3 Live Accounts Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Account Name</th>
                  <th className="p-3 font-semibold">Email Address</th>
                  <th className="p-3 font-semibold">Role</th>
                  <th className="p-3 font-semibold">Active Plan</th>
                  <th className="p-3 font-semibold">Credits</th>
                  <th className="p-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-white">StyleNova Fashion House</td>
                  <td className="p-3 text-slate-400">hello@stylenova.in</td>
                  <td className="p-3"><span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold uppercase text-[10px]">User</span></td>
                  <td className="p-3 text-indigo-400 font-bold">Growth Plan (₹999/mo)</td>
                  <td className="p-3 font-black text-emerald-400">17,500</td>
                  <td className="p-3"><Link href="/login" className="text-indigo-400 hover:text-white font-bold underline">Login →</Link></td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-white">NexaTech Solutions</td>
                  <td className="p-3 text-slate-400">campaigns@nexatech.io</td>
                  <td className="p-3"><span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold uppercase text-[10px]">User</span></td>
                  <td className="p-3 text-purple-400 font-bold">Pro Plan (₹1,999/mo)</td>
                  <td className="p-3 font-black text-emerald-400">49,000</td>
                  <td className="p-3"><Link href="/login" className="text-indigo-400 hover:text-white font-bold underline">Login →</Link></td>
                </tr>
                <tr className="hover:bg-slate-800/50 bg-purple-950/20">
                  <td className="p-3 font-bold text-purple-300">Nikhil (Platform Owner)</td>
                  <td className="p-3 text-slate-400">admin@couponmail.io</td>
                  <td className="p-3"><span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold uppercase text-[10px]">Owner Admin</span></td>
                  <td className="p-3 text-amber-400 font-bold">Unlimited Owner Plan</td>
                  <td className="p-3 font-black text-amber-300">999,999</td>
                  <td className="p-3"><Link href="/login" className="text-purple-400 hover:text-white font-bold underline">Owner Admin →</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Grid Breakdown */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-black text-white">Platform Core Capability Suite</h2>
            <p className="text-xs text-slate-400 mt-1">Built specifically for high-volume personalized coupon dispatching</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Card 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
                🤖
              </div>
              <h3 className="text-base font-bold text-white">1. AI Copy Generator (GPT-4o Engine)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated subject line and email body synthesis. Users can select presets (Diwali, Flash Sale, VIP Loyalty, Cart Recovery, Birthday) or type custom prompts to generate high-converting copy with dynamic tags (<code className="text-purple-300">{"{{First_Name}}"}</code>, <code className="text-purple-300">{"{{Coupon_Code}}"}</code>).
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
                🎨
              </div>
              <h3 className="text-base font-bold text-white">2. 10 Responsive HTML Email Templates</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                10 pre-designed CSS gradient email templates tested across Gmail, Apple Mail, Outlook, and mobile. Features dark/light themes, glow coupon code containers, 3-column benefits, and unsubscribe footers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                📩
              </div>
              <h3 className="text-base font-bold text-white">3. Dual Email Gateway Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supports native <strong>Gmail OAuth 2.0</strong> sending (from user&apos;s genuine address) and a <strong>Central Brevo (Sendinblue) API Gateway</strong> capable of 100,000+ daily email sends with automatic deliverability error handling.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                🛡
              </div>
              <h3 className="text-base font-bold text-white">4. Platform Owner Admin Control Panel</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated Admin Control Panel for platform owners. Features global Brevo API configuration, live connection testing, raw file inspection for uploaded customer sheets, user credit overrides, and user suspension/activation controls.
              </p>
            </div>
          </div>
        </div>

        {/* Post-Approval Roadmap */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/40 rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full">
              POST-CLIENT APPROVAL ROADMAP
            </span>
            <h2 className="text-2xl font-black text-white">Production Setup Plan</h2>
            <p className="text-xs text-slate-400">Once the client approves the current prototype layout and workflow</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                <span>🔒</span> 1. Secure Authentication
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Replace 1-click demo buttons with NextAuth.js / Supabase JWT authentication, bcrypt password hashing, password reset via email, and MFA.
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                <span>💳</span> 2. Full Payment Gateways
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Connect live merchant accounts for PayU, Razorpay, Stripe (USD cards), Paytm, and PhonePe UPI auto-settlement.
              </p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                <span>🌐</span> 3. Dedicated Server &amp; Domain
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Deploy to client&apos;s custom domain (e.g. <code className="text-indigo-300">app.clientdomain.com</code>) with dedicated Brevo sending IP for maximum inbox placement.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center py-6 space-y-4">
          <Link href="/login" className="btn-primary text-base px-8 py-3.5 shadow-xl">
            Go To Live App Login Page <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-xs text-slate-500 font-mono">
            CouponMail SaaS Platform Documentation • All Rights Reserved
          </div>
        </div>

      </main>
    </div>
  );
}
