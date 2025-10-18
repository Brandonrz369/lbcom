import EmergencyPageClient from "@/components/EmergencyPageClient"; // Import the new client component
import type { Metadata } from "next";

// Metadata for Emergency Page (Remains in Server Component)
export const metadata: Metadata = {
  title: "Emergency IT Support Anaheim | Fast Response | LB Computer Help",
  description:
    "Urgent on-site IT support in Anaheim and North Orange County. Fast response for ransomware, server failures, network outages, and data loss emergencies. Call LB Computer Help now.",
  keywords:
    "emergency it support anaheim, urgent computer help orange county, ransomware recovery anaheim, server down anaheim, network outage north oc, emergency data recovery anaheim, 24/7 it support anaheim, immediate tech support orange county", // Page-specific keywords
};

// Main Server Component for the page
export default function EmergencyPage() {
  return (
    <>
      {/* Render the Client Component which contains the interactive parts */}
      <EmergencyPageClient />
      {/* Add any necessary JSON-LD Schema here if applicable */}
    </>
  );
}
