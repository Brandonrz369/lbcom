// src/app/residential-business/page.tsx
// This is now a Server Component

import ResidentialBusinessClientPage from "@/components/ResidentialBusinessClientPage"; // Import the updated client component

// Define Metadata for this specific page (Enhanced Semantic Scope)
export const metadata = {
  title: "Anaheim Computer Help | On-Site Device Assistance | LB Computer Help",
  description:
    "Expert on-site computer help in Anaheim and North Orange County. Diagnostics, configuration, optimization & consultation for Mac/PC issues: slow performance, screen problems, battery drain, data access, network setup & more.",
  keywords:
    "anaheim computer help, north orange county tech support, on-site computer repair anaheim, device solutions orange county, macbook screen repair anaheim, laptop battery service anaheim, slow pc help orange county, data access consultation anaheim, network setup north oc, mobile it support",
};

// Schema Markup Component (Enhanced Scope)
function ResidentialBusinessJsonLd() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LB Computer Help",
    image: "", // Add logo URL if available
    "@id": "https://lbcomputerhelp.com", // Use canonical URL
    url: "https://lbcomputerhelp.com/residential-business", // URL of this specific page
    telephone: "(213) 349-6790",
    priceRange: "$$ - $$$", // General price range indication
    address: {
      "@type": "PostalAddress",
      addressLocality: "Anaheim",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Anaheim" },
      { "@type": "City", name: "Orange" },
      { "@type": "City", name: "Fullerton" },
      { "@type": "City", name: "Garden Grove" },
      { "@type": "City", name: "Buena Park" },
      { "@type": "City", name: "Placentia" },
      { "@type": "City", name: "Yorba Linda" },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 33.8366, longitude: -117.9143 },
      geoRadius: 24000,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://facebook.com/lbcomputerhelp",
      "https://instagram.com/lbcomputerhelp",
    ],
  };

  // Revised Service Schemas
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Hardware Diagnostic & Assessment",
      description: "Identify issues with Mac/PC screens (including cracked/damaged displays, flickering, dimness), batteries, boot problems, or other components. Get clear options and pricing for solutions in Anaheim and North Orange County.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Anaheim" },
      offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", price: "99", priceCurrency: "USD" } }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Component Configuration & Installation",
      description: "Professional installation and configuration for compatible hardware components (e.g., memory, storage) to enhance performance or address specific issues.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Anaheim" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "System Performance Optimization",
      description: "Improve speed and battery life for your Mac or PC through expert optimization techniques and software configuration.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Anaheim" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Data Accessibility Consultation",
      description: "Assistance and guidance for accessing files on malfunctioning devices. Includes data backup strategy advice.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Anaheim" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "System Security Assessment & Cleanup Assistance",
      description: "Assessment for security threats, malware checks, and assistance with system cleanup for enhanced protection.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Anaheim" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Network Setup & Configuration",
      description: "Reliable setup, configuration, and optimization for home and small business Wi-Fi and wired networks.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Anaheim" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Software Configuration Assistance",
      description: "Expert help with installing, configuring, or troubleshooting software applications and operating systems.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Anaheim" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "IT Consulting & Guidance",
      description: "Expert advice on managing device issues, security practices, and choosing the right technology solutions.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Anaheim" },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// The main page component renders the client component and the schema markup
export default function ResidentialBusinessPage() {
  return (
    <>
      <ResidentialBusinessClientPage />
      <ResidentialBusinessJsonLd />
    </>
  );
}
