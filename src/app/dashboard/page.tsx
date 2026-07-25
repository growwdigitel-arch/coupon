"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail, Upload, Send, CreditCard, BarChart3, Wallet, FileCode, CheckCircle2,
  AlertCircle, LogOut, Shield, RefreshCw, Sparkles, Tag, Plus, Eye,
  Calendar, FileText, Check, ArrowRight, User, LayoutDashboard, Zap,
  Gift, Layers, Copy, Star, ShoppingBag, Clock, HeartHandshake, Percent,
  UserPlus, Trash2, Edit3, Server, Globe, Lock, TrendingUp
} from "lucide-react";
import { useApp, UploadedFile, Campaign } from "@/context/AppContext";

export interface EmailTemplateItem {
  id: string;
  name: string;
  category: string;
  subject: string;
  badge: string;
  badgeColor: string;
  html: string;
}

export const PREBUILT_TEMPLATES: EmailTemplateItem[] = [

  // ─── 1. DIWALI — Gold & Dark Luxury ───
  {
    id: "tpl_diwali",
    name: "🪔 Diwali Festive Collection",
    category: "Festive Marketing",
    subject: "🪔 A Special Diwali Gift Inside For You, {{First_Name}}",
    badge: "Most Popular",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#0c0818;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#78350f 0%,#92400e 40%,#b45309 70%,#d97706 100%);padding:50px 40px 40px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2220%22 cy=%2220%22 r=%2215%22 fill=%22rgba(255,255,255,0.03)%22/><circle cx=%2280%22 cy=%2280%22 r=%2220%22 fill=%22rgba(255,255,255,0.03)%22/></svg>');"></div>
    <div style="position:relative;z-index:1;">
      <div style="font-size:56px;line-height:1;margin-bottom:16px;filter:drop-shadow(0 4px 12px rgba(251,191,36,0.4));">🪔</div>
      <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);border-radius:100px;padding:5px 18px;margin-bottom:16px;">
        <span style="color:#fde68a;font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">✦ Festive Exclusive ✦</span>
      </div>
      <h1 style="color:#ffffff;margin:0 0 8px;font-size:32px;font-weight:900;letter-spacing:-0.5px;line-height:1.2;">Happy Diwali,<br/>{{First_Name}}! 🎆</h1>
      <p style="color:#fde68a;font-size:14px;margin:0;opacity:0.9;">Celebrate the festival of lights with exclusive savings</p>
    </div>
  </div>
  <!-- Body -->
  <div style="background:#13091f;padding:40px;">
    <p style="color:#d1c4e9;font-size:15px;line-height:1.8;margin:0 0 28px;">This Diwali, we're filling your celebrations with joy and savings. We've set aside something truly special just for you — our most-valued customer. 🎁</p>
    <!-- Coupon Box -->
    <div style="background:linear-gradient(135deg,#1e1035,#2d1b69);border:1px solid rgba(167,139,250,0.3);border-radius:20px;padding:32px;text-align:center;margin:0 0 28px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-30px;right:-30px;width:100px;height:100px;background:rgba(251,191,36,0.08);border-radius:50%;"></div>
      <div style="position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;background:rgba(167,139,250,0.08);border-radius:50%;"></div>
      <div style="color:#a78bfa;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">✨ Your Personal Coupon Code ✨</div>
      <div style="background:rgba(251,191,36,0.1);border:2px dashed rgba(251,191,36,0.4);border-radius:12px;padding:18px 24px;display:inline-block;margin-bottom:14px;">
        <span style="color:#fbbf24;font-size:40px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:8px;text-shadow:0 0 30px rgba(251,191,36,0.5);">{{Coupon_Code}}</span>
      </div>
      <div style="color:#c4b5fd;font-size:13px;">🗓&nbsp; Offer valid until <strong style="color:#fbbf24;">{{Expiry_Date}}</strong></div>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#1c1030;padding:16px 48px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;letter-spacing:0.5px;box-shadow:0 8px 30px rgba(245,158,11,0.35);">🛍&nbsp; Shop The Diwali Sale →</a>
    </div>
    <!-- Divider -->
    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;text-align:center;">
      <p style="color:#6b7280;font-size:11px;margin:0;">Offer valid for a limited time · Cannot be combined with other offers<br/>To unsubscribe, <a href="#" style="color:#6b7280;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 2. FLASH SALE — Dark Neon Energy ───
  {
    id: "tpl_flash",
    name: "⚡ 24-Hour Flash Sale Alert",
    category: "Urgent / Limited Time",
    subject: "⚡ FLASH SALE: 24 Hours Only — Your Code Expires Tonight, {{First_Name}}!",
    badge: "High Conversion",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#0a0a0a;border-radius:20px;overflow:hidden;">
  <!-- Urgency Banner -->
  <div style="background:#dc2626;padding:10px;text-align:center;">
    <span style="color:#ffffff;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">⏰ &nbsp;THIS OFFER EXPIRES IN 24 HOURS &nbsp; ⏰</span>
  </div>
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#18080a,#2d0a0a,#3f0d0d);padding:44px 40px;text-align:center;">
    <div style="font-size:50px;margin-bottom:14px;">⚡</div>
    <h1 style="color:#ffffff;margin:0 0 6px;font-size:34px;font-weight:900;letter-spacing:-1px;">FLASH SALE IS LIVE</h1>
    <p style="color:#fca5a5;font-size:14px;margin:0;">Exclusively unlocked for you, <strong style="color:#f87171;">{{First_Name}}</strong></p>
  </div>
  <!-- Body -->
  <div style="background:#111111;padding:40px;">
    <p style="color:#d1d5db;font-size:15px;line-height:1.8;margin:0 0 28px;">We're going BIG this time. Our biggest flash sale of the year — but it disappears in exactly 24 hours. Your personal code is reserved below:</p>
    <!-- Code Box -->
    <div style="background:#000000;border:1px solid #374151;border-radius:16px;padding:30px;text-align:center;margin:0 0 20px;position:relative;overflow:hidden;">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(239,68,68,0.08) 0%,transparent 70%);pointer-events:none;"></div>
      <div style="color:#6b7280;font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;">Your Private Access Code</div>
      <div style="color:#ef4444;font-size:44px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;text-shadow:0 0 40px rgba(239,68,68,0.6);">{{Coupon_Code}}</div>
      <div style="margin-top:16px;display:inline-block;background:#1f1f1f;border:1px solid #374151;border-radius:8px;padding:8px 20px;">
        <span style="color:#9ca3af;font-size:12px;">Expires: </span><strong style="color:#f87171;font-size:12px;">{{Expiry_Date}}</strong>
      </div>
    </div>
    <!-- Warning -->
    <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:12px;padding:14px 20px;margin:0 0 28px;text-align:center;">
      <span style="color:#fca5a5;font-size:12px;font-weight:600;">🔥 Only valid for 24 hours — no extensions, no exceptions.</span>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#dc2626,#b91c1c);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(220,38,38,0.4);">⚡&nbsp; Claim My Discount Now →</a>
    </div>
    <div style="border-top:1px solid #1f2937;padding-top:20px;text-align:center;">
      <p style="color:#4b5563;font-size:11px;margin:0;">One use per account · Cannot be combined with other offers<br/>To unsubscribe, <a href="#" style="color:#4b5563;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 3. VIP LOYALTY — Royal Gold on Deep Purple ───
  {
    id: "tpl_vip",
    name: "👑 VIP Loyalty Member Reward",
    category: "Retention & Loyalty",
    subject: "👑 A Private VIP Gift Reserved For {{First_Name}}",
    badge: "VIP Exclusive",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#faf5ff;border-radius:20px;overflow:hidden;border:1px solid #ddd6fe;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#2e1065,#3b0764,#4c1d95,#5b21b6);padding:50px 40px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;top:-40px;right:-40px;width:160px;height:160px;background:rgba(255,215,0,0.05);border-radius:50%;"></div>
    <div style="position:absolute;bottom:-50px;left:-30px;width:130px;height:130px;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
    <div style="position:relative;z-index:1;">
      <div style="display:inline-block;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.35);border-radius:100px;padding:6px 20px;margin-bottom:18px;">
        <span style="color:#fcd34d;font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">👑 VIP Member — Exclusive Access</span>
      </div>
      <div style="font-size:50px;margin-bottom:14px;">💎</div>
      <h1 style="color:#ffffff;margin:0 0 8px;font-size:30px;font-weight:900;line-height:1.2;">You Deserve Something<br/>Truly Special, {{First_Name}}</h1>
      <p style="color:#c4b5fd;font-size:14px;margin:0;">A private reward — not shared with the public</p>
    </div>
  </div>
  <!-- Body -->
  <div style="background:#ffffff;padding:40px;">
    <p style="color:#374151;font-size:15px;line-height:1.8;margin:0 0 28px;">Your loyalty means the world to us. As a <strong>VIP member</strong>, you receive exclusive access to rewards that aren't available to the general public. This one is just for you.</p>
    <!-- Code Box -->
    <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);border:2px solid #c4b5fd;border-radius:20px;padding:32px;text-align:center;margin:0 0 28px;box-shadow:0 8px 30px rgba(139,92,246,0.12);">
      <div style="color:#7c3aed;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">🎁 Your Private VIP Coupon Code</div>
      <div style="background:#ffffff;border-radius:12px;padding:18px 24px;margin-bottom:14px;border:1px solid #ddd6fe;display:inline-block;">
        <span style="color:#5b21b6;font-size:42px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;">{{Coupon_Code}}</span>
      </div>
      <div style="color:#8b5cf6;font-size:13px;">Valid through <strong>{{Expiry_Date}}</strong></div>
    </div>
    <!-- Perks Row -->
    <div style="display:flex;gap:12px;margin:0 0 28px;">
      <div style="flex:1;background:#faf5ff;border:1px solid #ede9fe;border-radius:14px;padding:16px;text-align:center;">
        <div style="font-size:22px;margin-bottom:6px;">🔐</div>
        <div style="color:#5b21b6;font-size:11px;font-weight:700;">VIP Only</div>
        <div style="color:#7c3aed;font-size:10px;margin-top:2px;">Not public</div>
      </div>
      <div style="flex:1;background:#faf5ff;border:1px solid #ede9fe;border-radius:14px;padding:16px;text-align:center;">
        <div style="font-size:22px;margin-bottom:6px;">♾️</div>
        <div style="color:#5b21b6;font-size:11px;font-weight:700;">Stackable</div>
        <div style="color:#7c3aed;font-size:10px;margin-top:2px;">On most items</div>
      </div>
      <div style="flex:1;background:#faf5ff;border:1px solid #ede9fe;border-radius:14px;padding:16px;text-align:center;">
        <div style="font-size:22px;margin-bottom:6px;">🚀</div>
        <div style="color:#5b21b6;font-size:11px;font-weight:700;">Priority</div>
        <div style="color:#7c3aed;font-size:10px;margin-top:2px;">Fast dispatch</div>
      </div>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(124,58,237,0.3);">👑&nbsp; Redeem My VIP Reward →</a>
    </div>
    <div style="border-top:1px solid #f3f4f6;padding-top:20px;text-align:center;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">For VIP members only · Limited availability<br/>To unsubscribe, <a href="#" style="color:#9ca3af;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 4. ABANDONED CART — Clean Blue Urgency ───
  {
    id: "tpl_cart",
    name: "🛒 Abandoned Cart Recovery",
    category: "Re-engagement",
    subject: "🛒 {{First_Name}}, your cart is waiting — here's 20% off to complete!",
    badge: "Recovery",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#0c1a3a,#1e3a8a,#1d4ed8);padding:44px 40px;text-align:center;">
    <div style="font-size:52px;margin-bottom:14px;">🛒</div>
    <h1 style="color:#ffffff;margin:0 0 8px;font-size:30px;font-weight:900;">Your Cart Is Still Waiting!</h1>
    <p style="color:#bfdbfe;font-size:14px;margin:0;">We saved your items — and added a special surprise</p>
  </div>
  <!-- Body -->
  <div style="padding:40px;">
    <p style="color:#1e293b;font-size:15px;line-height:1.8;margin:0 0 24px;">Hi <strong>{{First_Name}}</strong>, 👋<br/>We noticed you left without completing your order. Items in your cart are reserved for a limited time. To make it easier, here's an exclusive discount we've unlocked just for you:</p>
    <!-- Code Box -->
    <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1px solid #93c5fd;border-radius:18px;padding:28px;text-align:center;margin:0 0 24px;box-shadow:0 4px 20px rgba(59,130,246,0.1);">
      <div style="color:#1e40af;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;">💙 Your Cart Recovery Discount</div>
      <div style="color:#1d4ed8;font-size:42px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;text-shadow:0 2px 10px rgba(29,78,216,0.2);">{{Coupon_Code}}</div>
      <div style="margin-top:14px;color:#3b82f6;font-size:13px;">Expires on <strong>{{Expiry_Date}}</strong></div>
    </div>
    <!-- What's in Cart -->
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin:0 0 28px;">
      <div style="color:#0f172a;font-size:12px;font-weight:700;margin-bottom:8px;">🧺 Why complete your order?</div>
      <div style="color:#475569;font-size:12px;line-height:1.8;">✔ &nbsp;Exclusive member pricing<br/>✔ &nbsp;Free shipping on eligible orders<br/>✔ &nbsp;30-day easy return guarantee</div>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#1e40af);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(29,78,216,0.3);">🛒&nbsp; Complete My Order →</a>
    </div>
    <div style="border-top:1px solid #f1f5f9;padding-top:20px;text-align:center;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">Cart reserved for a limited time · One use per account<br/>To unsubscribe, <a href="#" style="color:#9ca3af;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 5. NEW COLLECTION — Fresh Green Launch ───
  {
    id: "tpl_new_arrival",
    name: "🆕 New Collection Launch",
    category: "Product Launch",
    subject: "🆕 {{First_Name}}, Our New Collection Is Here — Early Access Inside!",
    badge: "New Launch",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #d1fae5;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#022c22,#064e3b,#065f46,#047857);padding:48px 40px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;background:rgba(255,255,255,0.04);border-radius:50%;"></div>
    <div style="position:relative;z-index:1;">
      <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:5px 20px;margin-bottom:16px;">
        <span style="color:#a7f3d0;font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">🌿 Just Dropped — Early Access</span>
      </div>
      <div style="font-size:50px;margin-bottom:14px;">✨</div>
      <h1 style="color:#ffffff;margin:0 0 8px;font-size:30px;font-weight:900;line-height:1.2;">The New Collection<br/>Has Arrived!</h1>
      <p style="color:#6ee7b7;font-size:14px;margin:0;">You're among the first to see it, {{First_Name}} 🙌</p>
    </div>
  </div>
  <!-- Body -->
  <div style="background:#f0fdf4;padding:40px;">
    <p style="color:#14532d;font-size:15px;line-height:1.8;margin:0 0 28px;">Our newest collection just dropped — and we're giving early access exclusively to subscribers like you before it goes public. Here's a launch discount to make your first pick even sweeter:</p>
    <!-- Code Box -->
    <div style="background:#ffffff;border:2px solid #34d399;border-radius:20px;padding:32px;text-align:center;margin:0 0 24px;box-shadow:0 8px 30px rgba(16,185,129,0.12);">
      <div style="color:#065f46;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">🎉 Early Bird Launch Discount</div>
      <div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-radius:12px;padding:16px 24px;display:inline-block;margin-bottom:14px;">
        <span style="color:#047857;font-size:42px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;">{{Coupon_Code}}</span>
      </div>
      <div style="color:#059669;font-size:13px;">Valid until <strong>{{Expiry_Date}}</strong> · Early access only</div>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#059669,#047857);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(5,150,105,0.3);">🛍&nbsp; Explore New Collection →</a>
    </div>
    <div style="border-top:1px solid #d1fae5;padding-top:20px;text-align:center;">
      <p style="color:#6b7280;font-size:11px;margin:0;">Early access offer · Limited stock available<br/>To unsubscribe, <a href="#" style="color:#6b7280;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 6. BIRTHDAY — Warm Pink Celebration ───
  {
    id: "tpl_birthday",
    name: "🎂 Birthday Special Reward",
    category: "Birthday / Anniversary",
    subject: "🎂 Happy Birthday {{First_Name}}! A Special Gift Just For You 🎁",
    badge: "Personal Touch",
    badgeColor: "bg-pink-100 text-pink-800 border-pink-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #fce7f3;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#500724,#881337,#be185d,#db2777);padding:50px 40px;text-align:center;">
    <div style="font-size:60px;line-height:1;margin-bottom:14px;">🎂</div>
    <h1 style="color:#ffffff;margin:0 0 8px;font-size:32px;font-weight:900;line-height:1.2;">Happy Birthday,<br/>{{First_Name}}! 🥳</h1>
    <p style="color:#fbcfe8;font-size:14px;margin:0;">🎈 &nbsp;Celebrating you today with something sweet &nbsp;🎈</p>
  </div>
  <!-- Confetti Band -->
  <div style="background:linear-gradient(90deg,#fce7f3,#ffe4e6,#fce7f3);padding:10px;text-align:center;">
    <span style="font-size:18px;letter-spacing:8px;">🎉 🎁 🎊 🎀 🎉 🎁 🎊 🎀</span>
  </div>
  <!-- Body -->
  <div style="background:#fff8f8;padding:40px;text-align:center;">
    <p style="color:#1e293b;font-size:15px;line-height:1.8;margin:0 0 28px;">On your special day, we wanted to make it even more magical. This is our birthday gift to you — a personal discount code to treat yourself to something wonderful. You deserve it! 💝</p>
    <!-- Code Box -->
    <div style="background:linear-gradient(135deg,#fff1f2,#ffe4e6);border:2px solid #fda4af;border-radius:20px;padding:32px;text-align:center;margin:0 0 24px;box-shadow:0 8px 30px rgba(244,63,94,0.1);">
      <div style="color:#9f1239;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">🎁 Your Birthday Gift Code</div>
      <div style="background:#ffffff;border-radius:12px;padding:16px 24px;display:inline-block;margin-bottom:14px;border:1px solid #fecdd3;">
        <span style="color:#e11d48;font-size:42px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;">{{Coupon_Code}}</span>
      </div>
      <div style="color:#f43f5e;font-size:13px;">🗓&nbsp; Gift valid until <strong>{{Expiry_Date}}</strong></div>
    </div>
    <!-- CTA -->
    <a href="#" style="display:inline-block;background:linear-gradient(135deg,#db2777,#be185d);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(219,39,119,0.3);margin-bottom:28px;">🎂&nbsp; Redeem My Birthday Gift →</a>
    <div style="border-top:1px solid #fce7f3;padding-top:20px;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">Happy Birthday from all of us! 🥳 · One use per account<br/>To unsubscribe, <a href="#" style="color:#9ca3af;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 7. WEEKEND DEAL — Warm Orange Energy ───
  {
    id: "tpl_weekend",
    name: "🎉 Weekend Special Offer",
    category: "Weekend Promotion",
    subject: "🎉 Weekend Exclusive Unlocked For You, {{First_Name}}!",
    badge: "Weekend Deal",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#fff7ed;border-radius:20px;overflow:hidden;border:1px solid #fed7aa;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#431407,#7c2d12,#c2410c,#ea580c);padding:46px 40px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at top right,rgba(251,191,36,0.12) 0%,transparent 60%);"></div>
    <div style="position:relative;z-index:1;">
      <div style="font-size:52px;margin-bottom:14px;">🎉</div>
      <h1 style="color:#ffffff;margin:0 0 8px;font-size:32px;font-weight:900;">Weekend Sale<br/>Is On Now!</h1>
      <p style="color:#fed7aa;font-size:14px;margin:0;">Exclusive pricing — this weekend only, {{First_Name}}</p>
    </div>
  </div>
  <!-- Body -->
  <div style="padding:40px;">
    <p style="color:#431407;font-size:15px;line-height:1.8;margin:0 0 28px;">Make the most of your weekend! We've unlocked exclusive pricing just for you — valid until Sunday midnight. Don't let it slip away:</p>
    <!-- Code Box -->
    <div style="background:linear-gradient(135deg,#fff7ed,#ffedd5);border:2px solid #fb923c;border-radius:20px;padding:32px;text-align:center;margin:0 0 24px;box-shadow:0 8px 30px rgba(234,88,12,0.1);">
      <div style="color:#9a3412;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">🛍 Weekend Exclusive Discount</div>
      <div style="background:#ffffff;border-radius:12px;padding:16px 24px;display:inline-block;margin-bottom:14px;border:1px solid #fed7aa;">
        <span style="color:#ea580c;font-size:42px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;">{{Coupon_Code}}</span>
      </div>
      <div style="color:#f97316;font-size:13px;">🗓&nbsp; Offer ends <strong>{{Expiry_Date}}</strong></div>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#ea580c,#c2410c);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(234,88,12,0.3);">🛍&nbsp; Shop Weekend Deals →</a>
    </div>
    <div style="border-top:1px solid #fed7aa;padding-top:20px;text-align:center;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">Weekend offer only · Ends Sunday midnight<br/>To unsubscribe, <a href="#" style="color:#9ca3af;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 8. WIN-BACK — Warm Teal Welcome Back ───
  {
    id: "tpl_winback",
    name: "💌 We Miss You — Win-Back",
    category: "Win-back Campaign",
    subject: "💌 {{First_Name}}, We've Missed You — Here's a Welcome Back Gift!",
    badge: "Win-back",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#f0fdfa;border-radius:20px;overflow:hidden;border:1px solid #99f6e4;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#042f2e,#134e4a,#0f766e,#0d9488);padding:48px 40px;text-align:center;position:relative;">
    <div style="font-size:56px;margin-bottom:14px;">💌</div>
    <h1 style="color:#ffffff;margin:0 0 8px;font-size:30px;font-weight:900;line-height:1.2;">We've Missed You,<br/>{{First_Name}}!</h1>
    <p style="color:#5eead4;font-size:14px;margin:0;">It's been a while — and we'd love to have you back</p>
  </div>
  <!-- Body -->
  <div style="padding:40px;">
    <p style="color:#134e4a;font-size:15px;line-height:1.8;margin:0 0 28px;">We noticed it's been some time since your last visit — and we miss you! A lot has changed since you were last here. To welcome you back, we've unlocked a special discount just for you:</p>
    <!-- Code Box -->
    <div style="background:#ffffff;border:2px solid #2dd4bf;border-radius:20px;padding:32px;text-align:center;margin:0 0 24px;box-shadow:0 8px 30px rgba(20,184,166,0.12);">
      <div style="color:#0f766e;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">💚 Your Welcome Back Gift</div>
      <div style="background:linear-gradient(135deg,#f0fdfa,#ccfbf1);border-radius:12px;padding:16px 24px;display:inline-block;margin-bottom:14px;">
        <span style="color:#0d9488;font-size:42px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;">{{Coupon_Code}}</span>
      </div>
      <div style="color:#14b8a6;font-size:13px;">Valid until <strong>{{Expiry_Date}}</strong></div>
    </div>
    <!-- What's New -->
    <div style="background:#ffffff;border:1px solid #ccfbf1;border-radius:14px;padding:18px 20px;margin:0 0 28px;">
      <div style="color:#0f766e;font-size:12px;font-weight:700;margin-bottom:8px;">🌟 What's new since you left:</div>
      <div style="color:#374151;font-size:12px;line-height:1.8;">✔ &nbsp;New collections added weekly<br/>✔ &nbsp;Faster delivery & better packaging<br/>✔ &nbsp;Expanded loyalty rewards program</div>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#0d9488,#0f766e);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(13,148,136,0.3);">💌&nbsp; Come Back & Save →</a>
    </div>
    <div style="border-top:1px solid #99f6e4;padding-top:20px;text-align:center;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">Valid for returning customers only · One use per account<br/>To unsubscribe, <a href="#" style="color:#9ca3af;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 9. E-COMMERCE — Sky Blue Professional ───
  {
    id: "tpl_ecommerce",
    name: "🛍 Premium E-Commerce Offer",
    category: "E-Commerce",
    subject: "🛍 {{First_Name}}, Your Exclusive Shopping Discount Is Inside!",
    badge: "E-Commerce",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e0f2fe;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#082f49,#0c4a6e,#0369a1,#0284c7);padding:46px 40px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at bottom left,rgba(56,189,248,0.15) 0%,transparent 60%);"></div>
    <div style="position:relative;z-index:1;">
      <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:5px 20px;margin-bottom:16px;">
        <span style="color:#bae6fd;font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">🏷 Special Member Offer</span>
      </div>
      <div style="font-size:50px;margin-bottom:14px;">🛍</div>
      <h1 style="color:#ffffff;margin:0 0 8px;font-size:30px;font-weight:900;">Savings Curated<br/>Just For You, {{First_Name}}</h1>
      <p style="color:#bae6fd;font-size:14px;margin:0;">Your personal discount code is ready to use</p>
    </div>
  </div>
  <!-- Body -->
  <div style="padding:40px;">
    <p style="color:#0f172a;font-size:15px;line-height:1.8;margin:0 0 28px;">We've handpicked this offer based on your shopping preferences. Use the code below at checkout and enjoy exclusive member pricing on your next order:</p>
    <!-- Code Box -->
    <div style="background:#f0f9ff;border:2px dashed #38bdf8;border-radius:20px;padding:32px;text-align:center;margin:0 0 24px;box-shadow:0 4px 20px rgba(14,165,233,0.1);">
      <div style="color:#0369a1;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">🏷 Your Exclusive Discount Code</div>
      <div style="background:#ffffff;border-radius:12px;padding:16px 24px;display:inline-block;margin-bottom:14px;border:1px solid #bae6fd;">
        <span style="color:#0284c7;font-size:42px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;">{{Coupon_Code}}</span>
      </div>
      <div style="color:#0ea5e9;font-size:13px;">Expires on <strong>{{Expiry_Date}}</strong></div>
    </div>
    <!-- Benefits -->
    <div style="display:flex;gap:12px;margin:0 0 28px;">
      <div style="flex:1;background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;padding:16px;text-align:center;">
        <div style="font-size:22px;margin-bottom:6px;">🚚</div>
        <div style="color:#0369a1;font-size:11px;font-weight:700;">Free Shipping</div>
        <div style="color:#64748b;font-size:10px;margin-top:3px;">Orders ₹499+</div>
      </div>
      <div style="flex:1;background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;padding:16px;text-align:center;">
        <div style="font-size:22px;margin-bottom:6px;">🔄</div>
        <div style="color:#0369a1;font-size:11px;font-weight:700;">Easy Returns</div>
        <div style="color:#64748b;font-size:10px;margin-top:3px;">30-day policy</div>
      </div>
      <div style="flex:1;background:#f0f9ff;border:1px solid #bae6fd;border-radius:14px;padding:16px;text-align:center;">
        <div style="font-size:22px;margin-bottom:6px;">🔒</div>
        <div style="color:#0369a1;font-size:11px;font-weight:700;">Secure Pay</div>
        <div style="color:#64748b;font-size:10px;margin-top:3px;">256-bit SSL</div>
      </div>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#0284c7,#0369a1);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(2,132,199,0.3);">🛍&nbsp; Shop & Redeem Now →</a>
    </div>
    <div style="border-top:1px solid #e0f2fe;padding-top:20px;text-align:center;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">One use per account · Valid on selected items<br/>To unsubscribe, <a href="#" style="color:#9ca3af;">click here</a></p>
    </div>
  </div>
</div>`,
  },

  // ─── 10. REFERRAL — Rich Violet ───
  {
    id: "tpl_referral",
    name: "🤝 Referral Reward Bonus",
    category: "Referral Program",
    subject: "🤝 A Friend Sent You a Gift, {{First_Name}} — Claim It Now!",
    badge: "Referral",
    badgeColor: "bg-violet-100 text-violet-800 border-violet-300",
    html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:620px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #ede9fe;">
  <!-- Header -->
  <div style="background:linear-gradient(160deg,#1e0a3c,#2e1065,#4c1d95,#5b21b6);padding:48px 40px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at top right,rgba(167,139,250,0.12) 0%,transparent 60%);"></div>
    <div style="position:relative;z-index:1;">
      <div style="font-size:52px;margin-bottom:14px;">🤝</div>
      <h1 style="color:#ffffff;margin:0 0 8px;font-size:30px;font-weight:900;line-height:1.2;">Someone Sent You<br/>a Special Gift!</h1>
      <p style="color:#c4b5fd;font-size:14px;margin:0;">A referral reward exclusively for you, {{First_Name}}</p>
    </div>
  </div>
  <!-- Body -->
  <div style="padding:40px;">
    <p style="color:#0f172a;font-size:15px;line-height:1.8;margin:0 0 28px;">A friend who cares about you just referred you and unlocked an exclusive reward. Use this code on your first or next order — it's completely yours, no strings attached:</p>
    <!-- Code Box -->
    <div style="background:linear-gradient(135deg,#f5f3ff,#ede9fe);border:2px solid #a78bfa;border-radius:20px;padding:32px;text-align:center;margin:0 0 24px;box-shadow:0 8px 30px rgba(124,58,237,0.12);">
      <div style="color:#5b21b6;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">🎁 Your Referral Discount Code</div>
      <div style="background:#ffffff;border-radius:12px;padding:16px 24px;display:inline-block;margin-bottom:14px;border:1px solid #ddd6fe;">
        <span style="color:#7c3aed;font-size:42px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:6px;">{{Coupon_Code}}</span>
      </div>
      <div style="color:#8b5cf6;font-size:13px;">Valid until <strong>{{Expiry_Date}}</strong></div>
    </div>
    <!-- How It Works -->
    <div style="background:#faf5ff;border:1px solid #ede9fe;border-radius:14px;padding:18px 20px;margin:0 0 28px;">
      <div style="color:#5b21b6;font-size:12px;font-weight:700;margin-bottom:10px;">💜 How to use your referral code:</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:center;gap:10px;"><div style="width:22px;height:22px;background:#7c3aed;border-radius:50%;color:#ffffff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">1</div><span style="color:#374151;font-size:12px;">Browse the store and add items to your cart</span></div>
        <div style="display:flex;align-items:center;gap:10px;"><div style="width:22px;height:22px;background:#7c3aed;border-radius:50%;color:#ffffff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">2</div><span style="color:#374151;font-size:12px;">Enter your code at checkout</span></div>
        <div style="display:flex;align-items:center;gap:10px;"><div style="width:22px;height:22px;background:#7c3aed;border-radius:50%;color:#ffffff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">3</div><span style="color:#374151;font-size:12px;">Your discount is applied instantly ✅</span></div>
      </div>
    </div>
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="#" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#ffffff;padding:16px 50px;border-radius:100px;text-decoration:none;font-weight:900;font-size:16px;box-shadow:0 8px 30px rgba(124,58,237,0.3);">🤝&nbsp; Use My Referral Gift →</a>
    </div>
    <div style="border-top:1px solid #f3f4f6;padding-top:20px;text-align:center;">
      <p style="color:#9ca3af;font-size:11px;margin:0;">Valid for new and existing customers · One use per account<br/>To unsubscribe, <a href="#" style="color:#9ca3af;">click here</a></p>
    </div>
  </div>
</div>`,
  },
];

interface ManualRecipientInput {
  name: string;
  email: string;
  couponCode: string;
  expiryDate: string;
}

// ──────────────────────────────────────────────────────
// PayU Payment Handler
// ──────────────────────────────────────────────────────
const PAYU_TEST_URL = "https://test.payu.in/_payment";

async function initiatePayUPayment({
  amount,
  productinfo,
  firstname,
  email,
}: {
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
}) {
  const txnid = `CML${Date.now()}`;

  // Get hash from server (keeps salt secure)
  const res = await fetch("/api/payu-hash", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ txnid, amount, productinfo, firstname, email }),
  });
  const data = await res.json();
  if (!data.hash) throw new Error("Hash generation failed");

  // Build and auto-submit a hidden form to PayU
  const form = document.createElement("form");
  form.method = "POST";
  form.action = PAYU_TEST_URL;

  const fields: Record<string, string> = {
    key: data.key,
    txnid: data.txnid,
    amount: data.amount,
    productinfo: data.productinfo,
    firstname: data.firstname,
    email: data.email,
    phone: "9999999999",
    surl: `${window.location.origin}/dashboard?payment=success`,
    furl: `${window.location.origin}/dashboard?payment=failed`,
    hash: data.hash,
  };

  Object.entries(fields).forEach(([k, v]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = k;
    input.value = v;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

// ─── Credit Plans ───
const CREDIT_PLANS = [
  {
    credits: 1000,
    amount: "249",
    label: "Starter",
    icon: "🚀",
    popular: false,
    color: "from-slate-600 to-slate-700",
    border: "border-slate-200",
    priceColor: "text-slate-900",
  },
  {
    credits: 5000,
    amount: "999",
    label: "Growth",
    icon: "⚡",
    popular: true,
    color: "from-indigo-600 to-purple-600",
    border: "border-indigo-300",
    priceColor: "text-indigo-700",
  },
  {
    credits: 12000,
    amount: "1999",
    label: "Pro",
    icon: "👑",
    popular: false,
    color: "from-amber-500 to-orange-500",
    border: "border-amber-200",
    priceColor: "text-amber-700",
  },
  {
    credits: 30000,
    amount: "3999",
    label: "Enterprise",
    icon: "🏢",
    popular: false,
    color: "from-emerald-600 to-teal-600",
    border: "border-emerald-200",
    priceColor: "text-emerald-700",
  },
];

export default function UserDashboard() {
  const router = useRouter();
  const {
    currentUser,
    uploadedFiles,
    campaigns,
    logout,
    uploadFile,
    createManualFile,
    launchCampaign,
    topUpWallet,
    subscribePlan,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"overview" | "upload" | "manual" | "templates" | "composer" | "campaigns" | "wallet">("overview");

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [uploading, setUploading] = useState(false);

  // Manual Recipient State
  const [manualBatchName, setManualBatchName] = useState("Manual_Customers_Batch.csv");
  const [manualRows, setManualRows] = useState<ManualRecipientInput[]>([
    { name: "Ananya Roy", email: "ananya@example.com", couponCode: "DIWALI50", expiryDate: "2026-11-15" },
    { name: "Rahul Sharma", email: "rahul@example.com", couponCode: "FLAT30", expiryDate: "2026-12-31" },
  ]);

  // Campaign Composer State
  const [campaignTitle, setCampaignTitle] = useState("Festive Coupon Promotion");
  const [emailTemplate, setEmailTemplate] = useState(PREBUILT_TEMPLATES[0].html);

  // Wallet Modal
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [payuLoading, setPayuLoading] = useState<string | null>(null);

  // AI Copy Generator State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleAddManualRow = () => {
    setManualRows((prev) => [
      ...prev,
      { name: "", email: "", couponCode: `SAVE${(prev.length + 1) * 10}`, expiryDate: "2026-12-31" },
    ]);
  };

  const handleRemoveManualRow = (index: number) => {
    if (manualRows.length === 1) return;
    setManualRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleManualRowChange = (index: number, field: keyof ManualRecipientInput, val: string) => {
    setManualRows((prev) => {
      const copy = [...prev];
      copy[index][field] = val;
      return copy;
    });
  };

  const handleSaveManualRecipients = () => {
    if (!currentUser) return;
    const validRows = manualRows.filter((r) => r.email.trim() !== "");
    if (validRows.length === 0) {
      alert("Please enter at least one recipient email address.");
      return;
    }
    const newFile = createManualFile(manualBatchName, validRows, currentUser);
    setSelectedFile(newFile);
    alert(`✅ Successfully added ${newFile.rowCount} manual recipients! Opening Email Composer...`);
    setActiveTab("composer");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;
    setUploading(true);
    try {
      const newFile = await uploadFile(file, currentUser);
      setSelectedFile(newFile);
      setActiveTab("composer");
    } catch (err) {
      alert("Failed to parse spreadsheet file. Please upload a valid .csv or .xlsx file.");
    } finally {
      setUploading(false);
    }
  };

  const handleLaunchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && uploadedFiles.length === 0) {
      alert("Please upload an Excel or CSV file or enter recipients manually.");
      return;
    }
    const fileToUse = selectedFile || uploadedFiles[0];
    const success = await launchCampaign(campaignTitle, emailTemplate, fileToUse);
    if (success) setActiveTab("campaigns");
  };

  const selectTemplate = (tpl: EmailTemplateItem) => {
    setEmailTemplate(tpl.html);
    setCampaignTitle(tpl.subject.replace("{{First_Name}}", "VIP Customer"));
    setActiveTab("composer");
  };

  const handlePayUPayment = async (plan: typeof CREDIT_PLANS[0]) => {
    if (!currentUser) return;
    setPayuLoading(plan.label);
    try {
      await initiatePayUPayment({
        amount: plan.amount,
        productinfo: `CouponMail ${plan.label} Plan - ${plan.credits} Credits`,
        firstname: currentUser.name,
        email: currentUser.email,
      });
    } catch (err) {
      alert("Payment initiation failed. Please try again.");
      setPayuLoading(null);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-slate-100">
        <div className="bg-white text-slate-900 p-8 rounded-3xl text-center space-y-4 max-w-sm shadow-xl">
          <div className="w-12 h-12 rounded-2xl gb flex items-center justify-center mx-auto text-white">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Please Sign In</h2>
          <p className="text-xs text-slate-500">You need to log in to access your user dashboard.</p>
          <Link href="/login" className="btn-primary w-full text-center">Go to Login Page</Link>
        </div>
      </div>
    );
  }

  const userFiles = uploadedFiles.filter((f) => f.uploadedBy === currentUser.email);
  const userCampaigns = campaigns.filter((c) => c.userEmail === currentUser.email);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* LEFT SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between flex-shrink-0 text-slate-200">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl gb flex items-center justify-center shadow-md">
              <Mail className="text-white w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              Coupon<span className="gt">Mail</span>
            </span>
          </Link>

          <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate">{currentUser.name}</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-black px-2 py-0.5 rounded-full uppercase">
                {currentUser.role}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>⚡</span> {currentUser.planName || "Starter Free Plan"}
              </span>
            </div>
            <div className="pt-2 flex items-center justify-between text-[11px] font-extrabold text-emerald-400 border-t border-slate-800">
              <span>Wallet: ₹{currentUser.walletBalance.toLocaleString()}</span>
              <span>{currentUser.credits.toLocaleString()} Credits</span>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-semibold">
            {[
              { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "upload", label: "Upload Excel / CSV", icon: Upload },
              { id: "manual", label: "✏️ Enter Name & Email", icon: UserPlus },
              { id: "templates", label: "Email Templates Library", icon: Gift },
              { id: "composer", label: "Email Composer", icon: FileCode },
              { id: "campaigns", label: "Sent Campaigns", icon: Send },
              { id: "wallet", label: "Credit Wallet", icon: Wallet },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {currentUser.role === "owner" && (
            <Link
              href="/admin"
              className="flex items-center gap-2 p-3 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-700/60 rounded-2xl text-purple-200 text-xs font-bold no-underline transition-all"
            >
              <Shield className="w-4 h-4 text-purple-300" />
              <span>Switch to Owner Admin</span>
            </Link>
          )}
        </div>

        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={() => { logout(); router.push("/login"); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-slate-50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeTab === "overview" && "Campaign Overview"}
              {activeTab === "upload" && "Upload Customer Excel / CSV File"}
              {activeTab === "manual" && "Manually Enter Name & Email Recipients"}
              {activeTab === "templates" && "Email Templates Library"}
              {activeTab === "composer" && "Email Template Composer"}
              {activeTab === "campaigns" && "Sent Email Campaigns"}
              {activeTab === "wallet" && "Credit Wallet & Top Up"}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-2">
              <span>Welcome back, {currentUser.name} • {currentUser.companyName}</span>
              <span className="bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                📦 {currentUser.planName || "Free Trial Plan"}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("wallet")}
              className="btn-primary text-xs !py-2.5 !px-4 shadow-md"
            >
              <Plus className="w-3.5 h-3.5" /> Top Up Credits (₹)
            </button>
          </div>
        </div>

        {/* Email Gateway Status Badge */}
        <div className="bg-white border border-slate-200/90 p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span>Platform Email Gateway:</span>
                <span className="text-emerald-700 font-extrabold uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  🟢 Central Brevo & SMTP Active
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Managed centrally by Platform Admin • 99.8% Inbox Placement Guaranteed.
              </div>
            </div>
          </div>
        </div>

        {/* ───── TAB 1: OVERVIEW ───── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Available Credits", value: currentUser.credits, sub: `₹${currentUser.walletBalance} Wallet`, color: "text-slate-900", sub_color: "text-emerald-600" },
                { label: "Total Campaigns", value: userCampaigns.length, sub: `${userFiles.length} Lists Created`, color: "text-indigo-600", sub_color: "text-slate-500" },
                { label: "Avg Open Rate", value: "68.4%", sub: "↑ High Inbox Rate", color: "text-emerald-600", sub_color: "text-emerald-700" },
                { label: "Emails Delivered", value: userCampaigns.reduce((a, c) => a + c.sentCount, 0), sub: "Across all campaigns", color: "text-purple-600", sub_color: "text-slate-500" },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs text-slate-500 font-semibold">{s.label}</div>
                  <div className={`text-3xl font-black mt-1 ${s.color}`}>{s.value}</div>
                  <div className={`text-[11px] font-extrabold mt-1 ${s.sub_color}`}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black mb-1">Quick Launch Coupon Campaign</h3>
                <p className="text-xs text-indigo-200 max-w-lg leading-relaxed">
                  Upload an Excel file or select from 10 professional email templates to start sending in 2 minutes.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button onClick={() => setActiveTab("manual")} className="btn-white text-xs !py-2.5 !px-5">
                  <UserPlus className="w-4 h-4 text-indigo-600" /> Enter Email Manually
                </button>
                <button onClick={() => setActiveTab("templates")} className="btn-translucent text-xs !py-2.5 !px-5">
                  <Gift className="w-4 h-4" /> Templates Library
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Recent Email Campaigns</h3>
                <button onClick={() => setActiveTab("campaigns")} className="text-xs text-indigo-600 font-bold hover:underline">
                  View All →
                </button>
              </div>
              {userCampaigns.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">No campaigns yet. Launch your first campaign!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="p-3 font-semibold">Campaign Name</th>
                        <th className="p-3 font-semibold">Spreadsheet File</th>
                        <th className="p-3 font-semibold">Recipients</th>
                        <th className="p-3 font-semibold">Open Rate</th>
                        <th className="p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {userCampaigns.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-bold text-slate-900">{c.title}</td>
                          <td className="p-3 text-slate-600 font-mono">{c.fileName}</td>
                          <td className="p-3 font-bold text-indigo-600">{c.totalRecipients}</td>
                          <td className="p-3 font-bold text-emerald-600">{c.openRate}%</td>
                          <td className="p-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">{c.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ───── TAB 2: UPLOAD EXCEL / CSV ───── */}
        {activeTab === "upload" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/90 p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mx-auto text-indigo-600">
                <Upload className="w-8 h-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Upload Customer List (.xlsx, .xls, .csv)</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">Your file should have columns: Name, Email, Coupon Code, Expiry Date</p>
              <div className="pt-4">
                <label className="btn-primary cursor-pointer inline-flex items-center gap-2 text-sm px-7 py-3.5 shadow-lg shadow-indigo-600/30">
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? "Parsing File..." : "Choose Excel / CSV File"}</span>
                  <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ───── TAB 3: MANUALLY ENTER NAME & EMAIL ───── */}
        {activeTab === "manual" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-indigo-600" />
                    Manually Add Name & Email Recipients
                  </h2>
                </div>
                <button type="button" onClick={handleAddManualRow} className="btn-secondary text-xs !py-2 !px-4">
                  <Plus className="w-3.5 h-3.5" /> Add Recipient Row
                </button>
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-slate-50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">#</th>
                      <th className="p-3 font-semibold">Recipient Name</th>
                      <th className="p-3 font-semibold">Email Address</th>
                      <th className="p-3 font-semibold">Coupon Code</th>
                      <th className="p-3 font-semibold">Expiry Date</th>
                      <th className="p-3 font-semibold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {manualRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-400">{idx + 1}</td>
                        <td className="p-2">
                          <input type="text" placeholder="Customer Name" value={row.name} onChange={(e) => handleManualRowChange(idx, "name", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium" />
                        </td>
                        <td className="p-2">
                          <input type="email" required placeholder="email@address.com" value={row.email} onChange={(e) => handleManualRowChange(idx, "email", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 font-medium" />
                        </td>
                        <td className="p-2">
                          <input type="text" placeholder="SAVE50" value={row.couponCode} onChange={(e) => handleManualRowChange(idx, "couponCode", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-indigo-600" />
                        </td>
                        <td className="p-2">
                          <input type="text" placeholder="2026-12-31" value={row.expiryDate} onChange={(e) => handleManualRowChange(idx, "expiryDate", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600" />
                        </td>
                        <td className="p-2 text-center">
                          {manualRows.length > 1 && (
                            <button type="button" onClick={() => handleRemoveManualRow(idx)} className="text-rose-500 p-1.5 hover:bg-rose-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between pt-2">
                <button type="button" onClick={handleAddManualRow} className="btn-secondary text-xs !py-2.5 !px-4">
                  <Plus className="w-4 h-4" /> Add Another Row
                </button>
                <button type="button" onClick={handleSaveManualRecipients} className="btn-primary text-xs !py-3 !px-6 shadow-lg shadow-indigo-600/30">
                  <Check className="w-4 h-4" /> Save Recipients & Proceed To Email Composer →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ───── TAB 4: EMAIL TEMPLATES GALLERY ───── */}
        {activeTab === "templates" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-1">Professional Email Templates Library</h2>
              <p className="text-xs text-slate-600">
                10 beautifully designed templates. Select any to instantly load into your Email Composer with dynamic placeholders.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PREBUILT_TEMPLATES.map((tpl) => (
                <div key={tpl.id} className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  {/* Template HTML mini-preview */}
                  <div className="relative h-44 overflow-hidden bg-slate-100 border-b border-slate-200">
                    <div
                      className="absolute inset-0 scale-[0.42] origin-top-left pointer-events-none"
                      style={{ width: "238%", height: "238%" }}
                      dangerouslySetInnerHTML={{
                        __html: tpl.html
                          .replace(/\{\{First_Name\}\}/g, "Ananya")
                          .replace(/\{\{Coupon_Code\}\}/g, "SAVE50")
                          .replace(/\{\{Expiry_Date\}\}/g, "2026-12-31"),
                      }}
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${tpl.badgeColor}`}>
                        {tpl.badge}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{tpl.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {tpl.name}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-mono truncate bg-slate-100 p-2 rounded-lg border border-slate-200">
                      {tpl.subject}
                    </div>
                    <div className="pt-2 mt-auto">
                      <button onClick={() => selectTemplate(tpl)} className="btn-primary w-full text-xs !py-2.5 justify-center">
                        <Check className="w-4 h-4" /> Use This Template →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───── TAB 5: EMAIL COMPOSER ───── */}
        {activeTab === "composer" && (
          <form onSubmit={handleLaunchSubmit} className="space-y-6">
            <div className="bg-white border border-slate-200/90 p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">1. Target Customer File or Manual Recipients</h3>
                <button type="button" onClick={() => setActiveTab("templates")} className="text-xs text-purple-600 font-bold hover:underline flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" /> Templates Gallery →
                </button>
              </div>
              <select
                value={selectedFile?.id || (userFiles[0]?.id || uploadedFiles[0]?.id || "")}
                onChange={(e) => {
                  const f = uploadedFiles.find((file) => file.id === e.target.value);
                  if (f) setSelectedFile(f);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 font-bold focus:outline-none focus:border-indigo-500"
              >
                {(userFiles.length > 0 ? userFiles : uploadedFiles).map((f) => (
                  <option key={f.id} value={f.id}>
                    📄 {f.fileName} ({f.rowCount} Recipients)
                  </option>
                ))}
              </select>
            </div>

            {/* AI Copywriting Assistant Box */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-6 rounded-3xl space-y-4 border border-indigo-500/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      AI Coupon & Email Copy Generator
                      <span className="text-[9px] bg-purple-500/30 text-purple-200 font-mono px-2 py-0.5 rounded-full border border-purple-400/30">GPT-4o Engine</span>
                    </h4>
                    <p className="text-[11px] text-slate-300">Type what your campaign is about or pick a quick prompt below</p>
                  </div>
                </div>
              </div>

              {/* Quick AI Presets */}
              <div className="flex flex-wrap gap-2">
                {[
                  "🪔 Diwali Festival 50% Off Sale",
                  "⚡ 24-Hour Urgent Flash Discount",
                  "👑 VIP Member Exclusive Reward",
                  "🎂 Birthday Celebration Gift",
                  "🛒 Abandoned Cart Recovery Deal",
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAiPrompt(preset);
                      setAiGenerating(true);
                      setTimeout(() => {
                        if (preset.includes("Diwali")) {
                          setCampaignTitle("🪔 A Special Diwali Gift Reserved For You, {{First_Name}}!");
                          setEmailTemplate(PREBUILT_TEMPLATES[0].html);
                        } else if (preset.includes("Flash")) {
                          setCampaignTitle("⚡ FLASH SALE: 24 Hours Only — Your Code Expires Tonight, {{First_Name}}!");
                          setEmailTemplate(PREBUILT_TEMPLATES[1].html);
                        } else if (preset.includes("VIP")) {
                          setCampaignTitle("👑 A Private VIP Gift Reserved For {{First_Name}}");
                          setEmailTemplate(PREBUILT_TEMPLATES[2].html);
                        } else if (preset.includes("Birthday")) {
                          setCampaignTitle("🎂 Happy Birthday {{First_Name}}! A Special Gift Just For You 🎁");
                          setEmailTemplate(PREBUILT_TEMPLATES[5].html);
                        } else {
                          setCampaignTitle("🛒 {{First_Name}}, your cart is waiting — here's 20% off to complete!");
                          setEmailTemplate(PREBUILT_TEMPLATES[3].html);
                        }
                        setAiGenerating(false);
                      }, 700);
                    }}
                    className="text-[10px] font-bold bg-white/10 hover:bg-white/20 text-indigo-200 border border-white/15 px-3 py-1.5 rounded-full transition-all"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Manual AI Prompt Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. Create a 30% discount email for weekend shoppers with urgency..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  disabled={aiGenerating || !aiPrompt.trim()}
                  onClick={() => {
                    setAiGenerating(true);
                    setTimeout(() => {
                      setCampaignTitle(`✨ Special Exclusive Deal Unlocked For You, {{First_Name}}!`);
                      setEmailTemplate(PREBUILT_TEMPLATES[6].html);
                      setAiGenerating(false);
                    }, 800);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5"
                >
                  {aiGenerating ? (
                    <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> AI Generating...</>
                  ) : (
                    <><Sparkles className="w-3.5 h-3.5" /> Generate AI Copy</>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">2. Campaign Title &amp; Email HTML Template</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Campaign Subject Line</label>
                <input type="text" required value={campaignTitle} onChange={(e) => setCampaignTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Email HTML Code (Dynamic: <code className="text-indigo-600 font-bold">{"{{First_Name}}"}</code>, <code className="text-indigo-600 font-bold">{"{{Coupon_Code}}"}</code>, <code className="text-indigo-600 font-bold">{"{{Expiry_Date}}"}</code>)
                </label>
                <textarea rows={8} value={emailTemplate} onChange={(e) => setEmailTemplate(e.target.value)} className="w-full bg-slate-900 text-indigo-200 border border-slate-800 rounded-xl p-4 text-xs font-mono" />
              </div>
              <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200">
                <div className="text-xs font-extrabold text-slate-500 mb-3 uppercase tracking-wider">Live HTML Render Preview</div>
                <div className="bg-white text-slate-900 p-4 rounded-xl shadow-sm" dangerouslySetInnerHTML={{
                  __html: emailTemplate
                    .replace(/\{\{First_Name\}\}/g, "Ananya")
                    .replace(/\{\{Coupon_Code\}\}/g, "DIWALI50")
                    .replace(/\{\{Expiry_Date\}\}/g, "2026-11-15"),
                }} />
              </div>
              <button type="submit" className="btn-primary w-full text-center text-sm py-3.5 shadow-lg shadow-indigo-600/30">
                <Send className="w-4 h-4" /> Launch Campaign & Send {selectedFile?.rowCount || 5000} Emails Now
              </button>
            </div>
          </form>
        )}

        {/* ───── TAB 6: SENT CAMPAIGNS ───── */}
        {activeTab === "campaigns" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">All Sent Campaigns</h3>
              {userCampaigns.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">No campaigns yet. Launch your first campaign!</div>
              ) : (
                <div className="space-y-4">
                  {userCampaigns.map((c) => (
                    <div key={c.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-slate-900">{c.title}</div>
                          <div className="text-xs text-slate-500">File: {c.fileName} • Sent on {c.sendDate}</div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">{c.status}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                          <div className="text-lg font-black text-indigo-600">{c.totalRecipients}</div>
                          <div className="text-[10px] text-slate-500 font-semibold">Recipients</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                          <div className="text-lg font-black text-emerald-600">{c.openRate}%</div>
                          <div className="text-[10px] text-slate-500 font-semibold">Open Rate</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                          <div className="text-lg font-black text-purple-600">{c.clickRate}%</div>
                          <div className="text-[10px] text-slate-500 font-semibold">Click Rate</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ───── TAB 7: CREDIT WALLET ───── */}
        {activeTab === "wallet" && (
          <div className="space-y-8">
            {/* Active Subscription Banner */}
            <div className="bg-white border-2 border-purple-200 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                  👑
                </div>
                <div>
                  <div className="text-[10px] font-black text-purple-700 uppercase tracking-widest bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    CURRENT ACTIVE SUBSCRIBED PACKAGE
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {currentUser.planName || "Free Trial Plan"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Subscribed by {currentUser.name} ({currentUser.companyName}) • Unlimited validity on remaining credits
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Credits Available</div>
                  <div className="text-2xl font-black text-indigo-600">{currentUser.credits.toLocaleString()}</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Wallet Balance</div>
                  <div className="text-2xl font-black text-emerald-600">₹{currentUser.walletBalance.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-indigo-200 text-xs font-semibold">Credit Wallet</div>
                    <div className="text-white text-sm font-bold">{currentUser.companyName}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-indigo-300 text-xs font-semibold mb-1">Available Credits</div>
                    <div className="text-5xl font-black tracking-tight">{currentUser.credits.toLocaleString()}</div>
                    <div className="text-indigo-300 text-xs mt-1">1 Credit = 1 Email Sent</div>
                  </div>
                  <div>
                    <div className="text-indigo-300 text-xs font-semibold mb-1">Wallet Balance</div>
                    <div className="text-4xl font-black tracking-tight">₹{currentUser.walletBalance.toLocaleString()}</div>
                    <div className="text-emerald-400 text-xs font-bold mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Active Account
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Purchase History Breakdown */}
            {currentUser.purchaseHistory && currentUser.purchaseHistory.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Your Package &amp; Top-Up History</h3>
                  <span className="text-xs text-purple-700 font-bold bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                    {currentUser.purchaseHistory.length} Purchases Recorded
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="p-3 font-semibold">Type</th>
                        <th className="p-3 font-semibold">Package / Item</th>
                        <th className="p-3 font-semibold">Date</th>
                        <th className="p-3 font-semibold">Txn ID</th>
                        <th className="p-3 font-semibold">Credits Added</th>
                        <th className="p-3 font-semibold">Amount</th>
                        <th className="p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentUser.purchaseHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                              item.type === "package"
                                ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                                : "bg-teal-100 text-teal-800 border-teal-200"
                            }`}>
                              {item.type === "package" ? "📦 Package" : "⚡ Top-Up"}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{item.packageName}</td>
                          <td className="p-3 text-slate-600">{item.date}</td>
                          <td className="p-3 font-mono text-slate-500">{item.txnId}</td>
                          <td className="p-3 font-black text-indigo-600">+{item.credits.toLocaleString()}</td>
                          <td className="p-3 font-bold text-emerald-700">₹{item.amount.toLocaleString()}</td>
                          <td className="p-3">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Credit Plans */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Upgrade Package or Top Up Credits</h2>
                  <p className="text-xs text-slate-500 mt-1">Select a package to upgrade your plan or add credits to your wallet</p>
                </div>
                <div className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-full">
                  Current: {currentUser.planName || "Starter Plan"}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CREDIT_PLANS.map((plan) => {
                  const isCurrentPlan = currentUser.planName?.toLowerCase().includes(plan.label.toLowerCase());

                  return (
                    <div
                      key={plan.label}
                      className={`relative bg-white rounded-3xl border-2 ${plan.border} p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 ${
                        isCurrentPlan ? "ring-2 ring-emerald-500 ring-offset-2 border-emerald-400 bg-emerald-50/20" : plan.popular ? "ring-2 ring-indigo-500 ring-offset-2" : ""
                      }`}
                    >
                      {isCurrentPlan ? (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                          ✓ Current Active Plan
                        </div>
                      ) : plan.popular ? (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                          Most Popular
                        </div>
                      ) : null}

                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {plan.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{plan.label} Package</div>
                        <div className={`text-3xl font-black mt-1 ${plan.priceColor}`}>₹{plan.amount}</div>
                        <div className="text-sm font-bold text-slate-700 mt-0.5">{plan.credits.toLocaleString()} Credits</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          ₹{(parseInt(plan.amount) / plan.credits).toFixed(3)} per email
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-600">
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{plan.credits.toLocaleString()} email sends</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />All 10 HTML templates</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />Priority Brevo Gateway</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />No expiry on credits</li>
                      </ul>

                      <div className="mt-auto space-y-2">
                        {isCurrentPlan ? (
                          <button
                            disabled
                            className="w-full py-3 rounded-2xl text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                          >
                            ✓ Active Plan
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                subscribePlan(plan.label, parseInt(plan.amount), plan.credits);
                                alert(`🎉 Congratulations! You have successfully upgraded to the ${plan.label} Plan! ${plan.credits.toLocaleString()} credits added.`);
                              }}
                              className={`w-full py-3 rounded-2xl text-xs font-extrabold text-white transition-all shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r ${plan.color} hover:opacity-90`}
                            >
                              <Zap className="w-3.5 h-3.5" /> Upgrade to {plan.label} (₹{plan.amount})
                            </button>
                            <button
                              onClick={() => handlePayUPayment(plan)}
                              disabled={payuLoading === plan.label}
                              className="w-full py-2 rounded-xl text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5"
                            >
                              <CreditCard className="w-3 h-3 text-slate-500" /> Pay via PayU Gateway
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Package Tier Feature Comparison */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Package Features Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">Package Tier</th>
                      <th className="p-3 font-semibold">Monthly Price</th>
                      <th className="p-3 font-semibold">Credits Included</th>
                      <th className="p-3 font-semibold">Email Templates</th>
                      <th className="p-3 font-semibold">Sending Gateway</th>
                      <th className="p-3 font-semibold">Support Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">🚀 Starter</td>
                      <td className="p-3 font-bold text-slate-700">₹249</td>
                      <td className="p-3 text-indigo-600 font-bold">1,000</td>
                      <td className="p-3 text-slate-600">Standard Templates</td>
                      <td className="p-3 text-slate-600">Shared Gateway</td>
                      <td className="p-3 text-slate-500">Email Support</td>
                    </tr>
                    <tr className="hover:bg-slate-50 bg-indigo-50/30">
                      <td className="p-3 font-bold text-indigo-900 flex items-center gap-1.5">⚡ Growth (Popular)</td>
                      <td className="p-3 font-bold text-indigo-700">₹999</td>
                      <td className="p-3 text-indigo-600 font-bold">5,000</td>
                      <td className="p-3 font-semibold text-slate-900">All 10 Premium Templates</td>
                      <td className="p-3 text-emerald-700 font-bold">Priority Brevo Gateway</td>
                      <td className="p-3 text-slate-700 font-semibold">Priority Email</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-amber-900 flex items-center gap-1.5">👑 Pro</td>
                      <td className="p-3 font-bold text-amber-700">₹1,999</td>
                      <td className="p-3 text-indigo-600 font-bold">12,000</td>
                      <td className="p-3 font-semibold text-slate-900">All Templates + Custom HTML</td>
                      <td className="p-3 text-emerald-700 font-bold">High Speed Relay</td>
                      <td className="p-3 text-slate-700 font-semibold">Live Chat & Phone</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-emerald-900 flex items-center gap-1.5">🏢 Enterprise</td>
                      <td className="p-3 font-bold text-emerald-700">₹3,999</td>
                      <td className="p-3 text-indigo-600 font-bold">30,000</td>
                      <td className="p-3 font-semibold text-slate-900">Full Template Access</td>
                      <td className="p-3 text-emerald-700 font-bold">Dedicated Brevo IP</td>
                      <td className="p-3 text-purple-700 font-extrabold">24/7 Dedicated Manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* PayU Security Badge */}
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Secured by PayU Payment Gateway</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  All transactions are encrypted with 256-bit SSL. PayU is PCI-DSS compliant. Test mode is currently active — use test cards only.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
