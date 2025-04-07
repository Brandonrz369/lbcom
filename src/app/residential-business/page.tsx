// src/app/residential-business/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import FloatingShapes from "@/components/FloatingShapes";
import TypewriterEffect from "@/components/TypewriterEffect";
import ServiceCard from "@/components/ServicesCard"; // Assuming this component exists and is suitable
import TestimonialCarousel, {
  Testimonial,
} from "@/components/TestimonialCarousel"; // Assuming this component exists
import RevealText from "@/components/RevealText"; // Optional nice-to-have

// Define Metadata for this specific page (overrides layout.tsx)
export const metadata = {
  title: "Long Beach Computer Assistance | Device Solutions & Pricing | LB Computer Help",
  description:
    "Expert computer assistance in Long Beach. Get diagnostics, hardware configuration options, system optimization, and transparent pricing for common device issues like screen problems or battery drain.",
  keywords:
    "computer assistance Long Beach, device solutions Long Beach, hardware configuration Long Beach, PC optimization cost, Mac screen options Long Beach, laptop battery performance Long Beach, local tech experts Long Beach, computer diagnostic pricing, Long Beach computer help, lb computer help near me",
};

// Schema Markup Component
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
      streetAddress: "927 Magnolia Ave #2",
      addressLocality: "Long Beach",
      addressRegion: "CA",
      postalCode: "90813",
      addressCountry: "US",
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

  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Hardware Diagnostic & Assessment",
      description: "Identify issues with screens, batteries, boot problems, or other components. Get clear options and pricing for solutions in Long Beach.",
      provider: { "@id": "https://lbcomputerhelp.com" }, // Link to LocalBusiness ID
      areaServed: {
        "@type": "City",
        name: "Long Beach"
      },
      // Add offers if pricing is fixed, otherwise use provider priceRange
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "99",
          priceCurrency: "USD",
          valueAddedTaxIncluded: "false" // Adjust if needed
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Component Configuration & Installation",
      description: "Professional installation and configuration for compatible hardware components (e.g., memory, storage) to enhance performance or address specific issues.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
      // Indicate hourly pricing if applicable
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "System Optimization Service",
      description: "Improve speed and battery life for your Mac or PC through expert optimization techniques and software configuration.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Data Accessibility Consultation",
      description: "Assistance and guidance for accessing files on malfunctioning devices. Includes data backup strategy advice.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
     {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "IT Consulting & Guidance",
      description: "Expert advice on managing device issues, security practices, and choosing the right technology solutions.",
      provider: { "@id": "https://lbcomputerhelp.com" },
      areaServed: { "@type": "City", name: "Long Beach" },
    },
    // Add more Service schemas as needed
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


export default function ResidentialBusinessPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Selected Safe Testimonials
  const testimonials: Testimonial[] = [
     {
      text: "I am beyond impressed with the service I received from Brandon at LB Computer Help. He went above and beyond to find the perfect router for our office that could prioritize our fax machine and phones. Since the new setup, we've already noticed a significant improvement in call quality.",
      name: "Alondra S.",
      role: "Office Manager",
      image: "/images/testimonials/client1.jpg",
      source: "google",
    },
    {
      text: "I had such a great experience with LB Computer Help! My laptop was running super slow, and I needed it fixed ASAP. They were able to diagnose the issue quickly and optimize my system, making it run like new again. The service was fast, professional, and hassle-free.",
      name: "Judith C.",
      role: "Small Business Owner",
      image: "/images/testimonials/client4.jpg",
      source: "nextdoor",
    },
    // Add more compliant testimonials if available
  ];

  // Compliant Service Definitions
  const services = [
    {
      title: "Screen & Display Issues?",
      description: "Expert diagnostics for Mac & PC screens. Explore configuration options and clear pricing.",
      icon: "🖥️", // Example icon
      features: ["Screen Diagnostics", "Display Configuration Options", "Component Assessment", "Transparent Quotes"],
      category: "hardware", // Internal category if needed
    },
    {
      title: "Battery Performance Concerns?",
      description: "Assessment and optimization services to extend your laptop's battery life.",
      icon: "🔋",
      features: ["Battery Health Check", "Performance Optimization", "Power Setting Config", "Longevity Tips"],
      category: "hardware",
    },
    {
      title: "Slow Computer Performance?",
      description: "Comprehensive system optimization and configuration to boost speed.",
      icon: "🚀",
      features: ["Performance Tune-up", "Software Cleanup", "Hardware Config Review", "Startup Optimization"],
      category: "optimization",
    },
    {
      title: "Data Access or Boot-Up Problems?",
      description: "Assistance with data accessibility challenges and boot sequence analysis.",
      icon: "💾",
      features: ["Data Accessibility Consult", "Boot Diagnostics", "Backup Strategy Advice", "System Configuration Review"],
      category: "data",
    },
     {
      title: "Hardware Component Needs?",
      description: "Professional assessment and installation services for compatible components like RAM or storage.",
      icon: "⚙️",
      features: ["Component Assessment", "Installation Service", "Configuration & Testing", "Compatibility Guidance"],
      category: "hardware",
    },
     {
      title: "General Tech Guidance?",
      description: "Expert IT consulting for homes and businesses on tech choices, security, and more.",
      icon: "💡",
      features: ["Tech Purchase Advice", "Security Best Practices", "Workflow Improvements", "Remote Work Solutions"],
      category: "consulting",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Hero Section - Compliant Version */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        {/* Background elements adapted from homepage */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
           <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-background.jpg')", // Reuse or choose a different background
              mixBlendMode: "overlay",
              opacity: 0.4,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900"></div>
          <FloatingShapes />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white">
              Long Beach Tech Experts: <br /> Device Solutions & Assistance
            </h1>
            <div className="text-2xl md:text-3xl lg:text-4xl text-blue-200 mb-6">
               <TypewriterEffect
                  texts={[
                    "Hardware Diagnostics",
                    "Component Configuration",
                    "System Optimization",
                    "Expert IT Guidance",
                  ]}
                  className="text-2xl md:text-3xl lg:text-4xl text-blue-200"
                />
            </div>
            <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Experiencing computer issues in Long Beach? Slow performance, screen problems, battery drain? We offer expert diagnostics, hardware configuration options, and system optimization services. Get transparent pricing and professional assistance today.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
             <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="#services" // Link to services section below
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center"
                >
                  <span>Explore Our Services</span>
                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </Link>
                <Link
                  href="#contact" // Link to contact section below
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center"
                >
                  <span>Request Consultation</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </Link>
              </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Section - Compliant */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Solutions for Common Device Issues
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide expert diagnostics, configuration, and optimization services for a wide range of computer problems faced by Long Beach residents and businesses.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeIn key={service.title} direction="up" delay={index * 0.1}>
                {/* Ensure ServiceCard component can handle these props */}
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

       {/* Trust & Transparency Section - MANDATORY */}
      <section id="trust" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Trusted Long Beach Tech Partner
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We believe in transparency, expertise, and reliable service.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Pricing */}
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                <ul className="text-gray-600 space-y-1 text-left px-4 flex-grow">
                  <li><strong>Diagnostic Assessment:</strong> $99 (Flat Fee)</li>
                  <li><strong>Hourly Assistance/Config/Optimization:</strong> $125/hour</li>
                  <li><strong>IT Consultation:</strong> $150/hour</li>
                  <li><strong>Device Setup Services:</strong> Starting at $199</li>
                </ul>
                 <p className="text-gray-500 text-sm mt-4">Clear quotes provided before work begins.</p>
              </div>
            </FadeIn>

            {/* Credentials */}
             <FadeIn direction="up" delay={0.2}>
               <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                <h3 className="text-xl font-semibold mb-2">Local & Certified</h3>
                 <div className="text-gray-600 flex-grow">
                   <p>LB Computer Help</p>
                   <p>927 Magnolia Ave #2, Long Beach, CA 90813</p>
                   <p>(213) 349-6790</p>
                   <p className="mt-2">Serving Long Beach Since 2018</p>
                   {/* Add Certification Badges/Text Here if applicable */}
                   {/* <p className="mt-2 font-semibold">CompTIA Certified</p> */}
                 </div>
               </div>
             </FadeIn>

             {/* Disclaimer */}
             <FadeIn direction="up" delay={0.3}>
               <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full flex flex-col">
                 <svg className="w-12 h-12 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <h3 className="text-xl font-semibold mb-2">Independent Service Provider</h3>
                <p className="text-gray-600 text-sm flex-grow">
                  LB Computer Help is an independent company providing expert tech assistance and guidance. We are not affiliated with Microsoft, Apple, Dell, HP, or any other hardware or software provider. Our recommendations are based on industry best practices and your specific needs.
                </p>
               </div>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Compliant */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Long Beach Clients Say
              </h2>
            </FadeIn>
          </div>
          <FadeIn direction="up">
            {/* Ensure TestimonialCarousel component exists and works */}
            <TestimonialCarousel testimonials={testimonials} />
          </FadeIn>
        </div>
      </section>

      {/* Contact Section - Compliant */}
      <section id="contact" className="py-20 px-4 bg-gray-900 text-white">
         {/* Adapted from homepage contact section */}
         <div className="container mx-auto">
          <div className="text-center mb-12">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Expert Assistance in Long Beach
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Ready for solutions? Contact us for a consultation or assessment quote. We offer reliable computer help near you.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             {/* Contact Info Column (reuse from homepage if desired) */}
             <div>
               <FadeIn direction="right">
                 {/* Add contact details like phone, email, address, hours here */}
                  <div className="space-y-8">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                      </div>
                      <div><h3 className="font-semibold text-lg">Phone</h3><p className="text-gray-300">(213) 349-6790</p></div>
                    </div>
                    {/* Email */}
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                       </div>
                       <div><h3 className="font-semibold text-lg">Email</h3><p className="text-gray-300">support@lbcomputerhelp.com</p></div>
                     </div>
                     {/* Address */}
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                       </div>
                       <div><h3 className="font-semibold text-lg">Address</h3><p className="text-gray-300">927 Magnolia Ave #2<br />Long Beach, CA 90813</p></div>
                     </div>
                     {/* Hours */}
                     <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-blue-600 rounded-full p-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                       </div>
                       <div><h3 className="font-semibold text-lg">Business Hours</h3><p className="text-gray-300">Mon-Sat: 6 AM - 6 PM<br />Sunday: Closed</p></div>
                     </div>
                  </div>
               </FadeIn>
             </div>

             {/* Form Column */}
             <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
               <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
               {/* Use the same form action */}
               <form action="https://formspree.io/f/xzzeddgr" method="POST">
                 <input type="hidden" name="_next" value="https://lbcomputerhelp.com/thanks" />
                 <input type="hidden" name="page_source" value="Residential-Business Landing Page" /> {/* Optional: Track source */}

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                   {/* Name */}
                   <div>
                     <label htmlFor="contact_name_rb" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                     <input type="text" id="contact_name_rb" name="name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
                   </div>
                   {/* Email */}
                   <div>
                     <label htmlFor="contact_email_rb" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                     <input type="email" id="contact_email_rb" name="email" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your email" />
                   </div>
                 </div>
                 {/* Phone */}
                 <div className="mb-4">
                   <label htmlFor="contact_phone_rb" className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                   <input type="tel" id="contact_phone_rb" name="phone" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your phone number" />
                 </div>
                 {/* Service Needed - Compliant Dropdown */}
                 <div className="mb-4">
                   <label htmlFor="contact_service_rb" className="block text-sm font-medium text-gray-300 mb-1">Service Interest</label>
                   <select id="contact_service_rb" name="service_interest" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                     <option value="">Select an option...</option>
                     <option value="Diagnostic Assessment">Diagnostic Assessment</option>
                     <option value="Component Configuration/Installation">Component Configuration/Installation</option>
                     <option value="System Optimization">System Optimization</option>
                     <option value="Data Accessibility Consultation">Data Accessibility Consultation</option>
                     <option value="IT Consultation">IT Consultation</option>
                     <option value="Device Setup">Device Setup</option>
                     <option value="Other Inquiry">Other Inquiry</option>
                   </select>
                 </div>
                 {/* Message */}
                 <div className="mb-4">
                   <label htmlFor="contact_message_rb" className="block text-sm font-medium text-gray-300 mb-1">Describe Your Issue/Question</label>
                   <textarea id="contact_message_rb" name="message" rows={4} required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Briefly describe the problem or what you need help with..."></textarea>
                 </div>
                 {/* Submit Button */}
                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 flex items-center justify-center">
                   Request Assessment or Consultation
                 </button>
               </form>
             </div>
           </div>
         </div>
      </section>

      {/* Schema.org markup */}
      <ResidentialBusinessJsonLd />
    </div>
  );
}
