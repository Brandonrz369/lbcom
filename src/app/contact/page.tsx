import ContactPageClient from "@/components/ContactPageClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Contact Page (Remains in Server Component)
export const metadata: Metadata = {
  title: "Contact LB Computer Help | Anaheim On-Site IT Support",
  description:
    "Contact LB Computer Help for on-site IT support, computer services, and managed IT solutions in Anaheim and North Orange County. Call, email, or schedule an appointment online.",
  keywords:
    "contact lb computer help, anaheim it support contact, schedule computer repair anaheim, business it support north orange county, managed services anaheim contact, lb computer help phone, mobile it support anaheim",
};

// LocalBusiness Schema for Contact Page
function ContactPageJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage", // Specific type for contact pages
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "LB Computer Help",
            "@id": "https://lbcomputerhelp.com", // Use the main business ID
            "url": "https://lbcomputerhelp.com",
            "telephone": "(213) 349-6790",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Anaheim",
              "addressRegion": "CA",
              "addressCountry": "US"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "06:00",
                "closes": "18:00"
              }
            ],
            "areaServed": [
              { "@type": "City", "name": "Anaheim" },
              { "@type": "City", "name": "Orange" },
              { "@type": "City", "name": "Fullerton" },
              { "@type": "City", "name": "Garden Grove" },
              { "@type": "City", "name": "Buena Park" },
              { "@type": "City", "name": "Placentia" },
              { "@type": "City", "name": "Yorba Linda" }
            ]
          }
        }),
      }}
    />
  );
}


// Main Server Component for the page
export default function ContactPage() {
  return (
    <>
      {/* Render the Client Component which contains the interactive parts */}
      <ContactPageClient />
      {/* Render the JSON-LD Schema */}
      <ContactPageJsonLd />
    </>
  );
}
