import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script"; // Import the Script component
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import FooterMain from "@/components/footer/FooterMain"; // Import the new main footer component
import { FormLoggerProvider } from "@/components/FormLogger";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anaheim IT Support & Computer Services | LB Computer Help",
  description:
    "LB Computer Help provides on-site IT support, computer repair, cybersecurity, and managed services for homes and businesses across Anaheim and North Orange County. Get fast, reliable tech help today!",
  keywords:
    "anaheim it support, computer repair anaheim, managed services north orange county, cybersecurity anaheim, data recovery anaheim, network support orange county, tech support anaheim, it consulting anaheim, business it support north oc, residential computer services anaheim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-[100vw]`}
      >
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "LB Computer Help",
              "image": "", // Add logo URL if available
              "@id": "https://lbcomputerhelp.com",
              "url": "https://lbcomputerhelp.com",
              "telephone": "(213) 349-6790",
              "priceRange": "$$ - $$$",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Anaheim",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "areaServed": [
                { "@type": "City", "name": "Anaheim" },
                { "@type": "City", "name": "Orange" },
                { "@type": "City", "name": "Fullerton" },
                { "@type": "City", "name": "Garden Grove" },
                { "@type": "City", "name": "Buena Park" },
                { "@type": "City", "name": "Placentia" },
                { "@type": "City", "name": "Yorba Linda" }
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 33.8366, "longitude": -117.9143 },
                "geoRadius": 24000
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "06:00",
                  "closes": "18:00"
                }
              ],
              "sameAs": [
                "https://facebook.com/lbcomputerhelp",
                "https://instagram.com/lbcomputerhelp"
              ]
            }),
          }}
        />
        <FormLoggerProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>

          <ChatBot />

          {/* Use the new FooterMain component */}
          <FooterMain />
        </FormLoggerProvider>

        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-K4WMP86TC2"
        />
        {/* Seobility Verification Meta Tag */}
        <meta name="seobility" content="2c1caf48b548cfc6f9a4828c80f1c74a" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K4WMP86TC2');
            gtag('config', 'AW-16853780718');
          `}
        </Script>
        {/* Google Ads Lead Form Conversion Event Snippet */}
        <Script id="google-ads-lead-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16853780718/c4TrCL2P97UaEO6RweQ-',
                  'value': 1.0,
                  'currency': 'USD',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
