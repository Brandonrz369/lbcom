'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminWebTools() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'debug' | 'security' | 'seo'>('debug');
  const router = useRouter();
  
  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    const authTime = Number(localStorage.getItem('adminAuthTime') || '0');
    const timeNow = Date.now();
    
    // If not authenticated or session expired (more than 1 hour), redirect to login
    if (!isAuthenticated || (timeNow - authTime > 3600000)) {
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminAuthTime');
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  }, [router]);
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminAuthTime');
    router.push('/admin/login');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Web Tools</h1>
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
            <Link 
              href="/admin/forms"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Form Management
            </Link>
            <Link 
              href="/admin/analytics"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Analytics
            </Link>
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Advanced web tools for administrators
        </p>
      </header>
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('debug')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'debug' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Form Debugging
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'security' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Security Tools
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'seo' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            SEO Tools
          </button>
        </nav>
      </div>
      
      <div className="mb-8">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-800">Admin Tool Access</h2>
          <p className="text-yellow-700">
            These special web tools provide advanced functionality for administrators. They're separate from the public web tools to prevent misuse.
          </p>
        </div>
      </div>
      
      {/* Form Debugging Tab */}
      {activeTab === 'debug' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Form Debugging Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Form Debugger</h3>
              <p className="text-gray-600 mb-4">Advanced form testing utility for diagnosing form submission issues.</p>
              <Link 
                href="/web-tools?tool=debug"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
              >
                Open Form Debugger
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Form Logs</h3>
              <p className="text-gray-600 mb-4">View and analyze form submission logs across the website.</p>
              <Link 
                href="/web-tools?tool=logs"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
              >
                View Form Logs
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">API Endpoints</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">Form Submission Logs</h4>
                <p className="text-sm text-gray-600 mb-2">View all recorded form submissions as JSON.</p>
                <a 
                  href="/api/form-submissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  /api/form-submissions
                </a>
              </div>
              
              <div className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">Debug Logs</h4>
                <p className="text-sm text-gray-600 mb-2">View error and debug logs for the website.</p>
                <a 
                  href="/api/debug/logs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  /api/debug/logs
                </a>
              </div>
              
              <div className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">Direct FormSpree Test</h4>
                <p className="text-sm text-gray-600 mb-2">Run a direct test to the FormSpree API.</p>
                <a 
                  href="/api/direct-test"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  /api/direct-test
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Security Tools Tab */}
      {activeTab === 'security' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Security Tools</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-medium mb-2">Website Security Scanner</h3>
            <p className="text-gray-600 mb-4">
              Advanced security scanner for identifying vulnerabilities and recommending fixes.
              This version includes additional checks not available in the public version.
            </p>
            <Link 
              href="/web-tools?tool=security"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 inline-block"
            >
              Open Security Scanner
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Security Resources</h3>
            <ul className="space-y-3">
              <li className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">OWASP Top 10</h4>
                <p className="text-sm text-gray-600 mb-2">Reference guide for the most critical web application security risks.</p>
                <a 
                  href="https://owasp.org/www-project-top-ten/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  OWASP Top 10 Project
                </a>
              </li>
              
              <li className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">Mozilla Observatory</h4>
                <p className="text-sm text-gray-600 mb-2">Third-party security scanner for web servers.</p>
                <a 
                  href="https://observatory.mozilla.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Mozilla Observatory
                </a>
              </li>
              
              <li className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">Security Headers</h4>
                <p className="text-sm text-gray-600 mb-2">Check and analyze HTTP security headers.</p>
                <a 
                  href="https://securityheaders.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Security Headers
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* SEO Tools Tab */}
      {activeTab === 'seo' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">SEO Tools</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-medium mb-2">AI-Powered SEO Analyzer</h3>
            <p className="text-gray-600 mb-4">
              Advanced SEO analysis tool for evaluating website performance and providing actionable recommendations.
              The admin version includes additional technical checks and more detailed reporting.
            </p>
            <Link 
              href="/web-tools?tool=seo"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 inline-block"
            >
              Open SEO Analyzer
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">SEO Resources</h3>
            <ul className="space-y-3">
              <li className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">Google Search Console</h4>
                <p className="text-sm text-gray-600 mb-2">Monitor and optimize website visibility in Google Search results.</p>
                <a 
                  href="https://search.google.com/search-console/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Google Search Console
                </a>
              </li>
              
              <li className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">Schema.org</h4>
                <p className="text-sm text-gray-600 mb-2">Reference for structured data markup and schema types.</p>
                <a 
                  href="https://schema.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Schema.org
                </a>
              </li>
              
              <li className="p-3 border border-gray-200 rounded">
                <h4 className="font-medium">PageSpeed Insights</h4>
                <p className="text-sm text-gray-600 mb-2">Analyze and optimize website performance metrics.</p>
                <a 
                  href="https://pagespeed.web.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  PageSpeed Insights
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}