import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lominic - AI-Powered Workout Insights & Training Partner",
  description:
    "Upload workouts from Garmin, Apple Watch or Strava and get instant, AI-generated insights in plain language. Your training partner with a brain.",
  keywords:
    "AI workout analysis, fitness tracking, Garmin, Apple Watch, Strava, training insights, workout optimization, fitness app, AI training partner",
  authors: [{ name: "Lominic" }],
  robots: "index, follow",
  metadataBase: new URL("https://lominic.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://lominic.com/",
    title: "Lominic - AI-Powered Workout Insights & Training Partner",
    description:
      "Upload workouts from Garmin, Apple Watch or Strava and get instant, AI-generated insights in plain language. Your training partner with a brain.",
    images: [
      {
        url: "/og-image-update.png",
        width: 1200,
        height: 630,
        alt: "Lominic - AI-Powered Workout Insights",
      },
    ],
    siteName: "Lominic",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lominic - AI-Powered Workout Insights & Training Partner",
    description:
      "Upload workouts from Garmin, Apple Watch or Strava and get instant, AI-generated insights in plain language.",
    images: ["/og-image-update.png"],
  },
  other: {
    "theme-color": "#FE5C02",
    "msapplication-TileColor": "#FE5C02",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Lominic",
    "application-name": "Lominic",
    "mobile-web-app-capable": "yes",
    "revisit-after": "7 days",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "G-V996SESB0H",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V996SESB0H"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "G-V996SESB0H");
            `,
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Lominic",
              description:
                "AI-powered workout analysis and training insights app",
              url: "https://lominic.com",
              applicationCategory: "HealthApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free trial available",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
              },
              featureList: [
                "AI workout analysis",
                "Garmin integration",
                "Apple Watch integration",
                "Strava integration",
                "Training insights",
                "Workout optimization",
              ],
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lominic",
              url: "https://lominic.com",
              logo: "https://lominic.com/logo.svg",
              description:
                "AI-powered fitness training and workout analysis platform",
              sameAs: [
                "https://twitter.com/lominic",
                "https://linkedin.com/company/lominic",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
