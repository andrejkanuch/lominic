import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Providers } from '@/components/providers'
import LayoutWrapper from '@/components/LayoutWrapper'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

interface MetadataMessages {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogImageAlt: string
  twitterTitle: string
  twitterDescription: string
  schemaDescription: string
  schemaOfferDescription: string
  schemaFeature1: string
  schemaFeature2: string
  schemaFeature3: string
  schemaFeature4: string
  schemaFeature5: string
  schemaFeature6: string
  organizationDescription: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const messages = (await import(`../../../messages/${locale}.json`)).default
  const metadata = messages.Metadata as MetadataMessages

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: 'Lominic' }],
    robots: 'index, follow',
    metadataBase: new URL('https://lominic.com'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      url: 'https://lominic.com/',
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      images: [
        {
          url: '/og-image-update.png',
          width: 1200,
          height: 630,
          alt: metadata.ogImageAlt,
        },
      ],
      siteName: 'Lominic',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.twitterTitle,
      description: metadata.twitterDescription,
      images: ['/og-image-update.png'],
    },
    other: {
      'theme-color': '#FE5C02',
      'msapplication-TileColor': '#FE5C02',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Lominic',
      'application-name': 'Lominic',
      'mobile-web-app-capable': 'yes',
      'revisit-after': '7 days',
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
    verification: {
      google: 'G-V996SESB0H',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default
  const metadata = messages.Metadata as MetadataMessages

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}

        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              strategy="lazyOnload"
              src="https://www.googletagmanager.com/gtag/js?id=G-V996SESB0H"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", "G-V996SESB0H");
              `}
            </Script>
          </>
        )}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Lominic',
              description: metadata.schemaDescription,
              url: 'https://lominic.com',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: metadata.schemaOfferDescription,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1250',
              },
              featureList: [
                metadata.schemaFeature1,
                metadata.schemaFeature2,
                metadata.schemaFeature3,
                metadata.schemaFeature4,
                metadata.schemaFeature5,
                metadata.schemaFeature6,
              ],
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lominic',
              url: 'https://lominic.com',
              logo: 'https://lominic.com/logo.svg',
              description: metadata.organizationDescription,
              sameAs: [
                'https://twitter.com/lominic',
                'https://linkedin.com/company/lominic',
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
            <NextIntlClientProvider locale={locale}>
              <LayoutWrapper>{children}</LayoutWrapper>
            </NextIntlClientProvider>
          </TooltipProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
