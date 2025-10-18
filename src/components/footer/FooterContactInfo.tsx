import React from 'react';

export default function FooterContactInfo() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Contact</h3>
      <ul className="space-y-2">
        <li className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="text-gray-300">(213) 349-6790</span>
        </li>
        <li className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-300">
            support@lbcomputerhelp.com
          </span>
        </li>
        <li className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h18M5 11h14M7 17h10"
            />
          </svg>
          <div className="text-gray-300">
            On-site service across Anaheim, Orange, Fullerton, Garden Grove, Buena Park, Placentia, and Yorba Linda.
            <p className="text-sm text-gray-400">Mobile business — no walk-ins.</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
