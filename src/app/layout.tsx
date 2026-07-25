import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CouponMail — Send Personalized Coupon Emails in Minutes",
  description:
    "Upload your customer list, connect Gmail, personalize every coupon, collect payments, and track delivery—all from one powerful platform. Start free today.",
  keywords: [
    "coupon email",
    "email marketing",
    "Gmail integration",
    "personalized coupons",
    "email campaigns",
    "CSV import",
    "email analytics",
  ],
  authors: [{ name: "CouponMail" }],
  creator: "CouponMail",
  openGraph: {
    title: "CouponMail — Send Personalized Coupon Emails in Minutes",
    description:
      "Upload your customer list, connect Gmail, personalize every coupon, collect payments, and track delivery—all from one powerful platform.",
    type: "website",
    locale: "en_IN",
    siteName: "CouponMail",
  },
  twitter: {
    card: "summary_large_image",
    title: "CouponMail — Send Personalized Coupon Emails in Minutes",
    description:
      "Upload your customer list, connect Gmail, personalize every coupon, collect payments, and track delivery—all from one powerful platform.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
