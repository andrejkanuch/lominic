"use client";

import React from "react";
import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  structuredData?: object;
  noindex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Lominic - AI-Powered Workout Insights & Training Partner",
  description = "Upload workouts from Garmin, Apple Watch or Strava and get instant, AI-generated insights in plain language. Your training partner with a brain.",
  keywords = "AI workout analysis, fitness tracking, Garmin, Apple Watch, Strava, training insights, workout optimization, fitness app, AI training partner",
  image = "/og-image-update.png",
  url = "https://lominic.com",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Lominic",
  section,
  tags = [],
  structuredData,
  noindex = false,
  canonical,
}) => {
  const fullUrl = canonical || url;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `https://lominic.com${image}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Lominic" />
      <meta property="og:locale" content="en_US" />

      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FE5C02" />
      <meta name="msapplication-TileColor" content="#FE5C02" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Lominic" />
      <meta name="application-name" content="Lominic" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Head>
  );
};

export default SEO;
