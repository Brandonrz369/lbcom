"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SimpleMobileNav from "./SimpleMobileNav";

interface DropdownItem {
  href: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  textColor: string;
}

function NavDropdown({ label, items, textColor }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center ${textColor} hover:text-blue-500 transition-colors font-medium`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-100">
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated =
        localStorage.getItem("adminAuthenticated") === "true";
      const authTime = Number(localStorage.getItem("adminAuthTime") || "0");
      const timeNow = Date.now();

      setIsAdmin(isAuthenticated && timeNow - authTime < 3600000);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = window.location.pathname;
    const isHome = path === "/" || path === "";
    setIsHomePage(isHome);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBackgroundColor = () => {
    if (isHomePage) {
      return isScrolled ? "bg-white shadow-md" : "bg-white";
    } else {
      return "bg-white shadow-lg";
    }
  };

  const textColor = () => {
    return "text-blue-600";
  };

  const linkTextColor = () => {
    return "text-gray-700";
  };

  const servicesItems = [
    { href: "/#services", label: "Services Overview" },
    { href: "/services", label: "Services & Pricing" },
    { href: "/residential-business", label: "Home & Business Solutions" },
    { href: "/book", label: "Book Appointment" },
  ];

  const resourcesItems = [
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/web-tools", label: "Web Tools" },
    { href: "/admin/login", label: "Admin Login" },
  ];

  const companyItems = [
    { href: "/#about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/emergency", label: "Emergency Support" },
  ];

  return (
    <div className={`${navBackgroundColor()} py-2`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className={`font-bold text-xl ${textColor()}`}>
          LB Computer Help
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavDropdown
            label="Services"
            items={servicesItems}
            textColor={linkTextColor()}
          />

          <NavDropdown
            label="Resources"
            items={resourcesItems}
            textColor={linkTextColor()}
          />

          <NavDropdown
            label="Company"
            items={companyItems}
            textColor={linkTextColor()}
          />

          <Link
            href="/emergency"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors font-medium ml-2"
          >
            Emergency
          </Link>

          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium ml-2"
          >
            Contact
          </Link>

          {isAdmin && (
            <>
              <Link
                href="/admin/forms"
                className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors font-medium ml-2"
              >
                Admin
              </Link>
              <Link
                href="/web-tools"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors font-medium ml-2"
              >
                Web Tools
              </Link>
            </>
          )}
        </nav>
        <SimpleMobileNav />
      </div>
    </div>
  );
}

