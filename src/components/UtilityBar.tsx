"use client";

import { useState } from "react";
import Link from "next/link";

export default function UtilityBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 py-1">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full px-2 py-0.5 text-white text-xs mr-2 text-[10px] sm:text-xs whitespace-nowrap">
              24/7 SUPPORT
            </div>
            <a
              href="tel:2133496790"
              className="text-white text-[10px] sm:text-sm hover:underline flex items-center whitespace-nowrap"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                />
              </svg>
              (213) 349-6790
            </a>
          </div>
          <div className="flex items-center">
            <Link
              href="/emergency"
              className="text-white text-[10px] sm:text-xs hover:underline flex items-center mr-3 whitespace-nowrap"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Emergency Services
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white ml-2"
              aria-label="Close emergency banner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

