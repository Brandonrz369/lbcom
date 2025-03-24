'use client';

import React, { useState } from 'react';
import SimpleContactForm from '@/components/SimpleContactForm';
import FormDebugger from '@/components/FormDebugger';
import FormLogger from '@/components/FormLogger';
import SpeedTest from '@/components/SpeedTest';
import NetworkTools from '@/components/NetworkTools';
import ColorGenerator from '@/components/ColorGenerator';
import PasswordGenerator from '@/components/PasswordGenerator';
import DomainLookup from '@/components/DomainLookup';
import ImageCompressor from '@/components/ImageCompressor';
import SecurityScanner from '@/components/SecurityScanner';
import SeoAnalyzer from '@/components/SeoAnalyzer';

export default function WebTools() {
  const [activeTab, setActiveTab] = useState<'simple' | 'debug' | 'logs' | 'speed' | 'network' | 'color' | 'password' | 'domain' | 'image' | 'security' | 'seo'>('simple');
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Web Tools & Testing</h1>
      
      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'simple' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('simple')}
          >
            Form Test
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'debug' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('debug')}
          >
            Form Debug
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'logs' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('logs')}
          >
            Form Logs
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'speed' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('speed')}
          >
            Speed Test
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'network' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('network')}
          >
            Network
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'color' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('color')}
          >
            Colors
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'password' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'domain' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('domain')}
          >
            Domain
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'image' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('image')}
          >
            Images
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'security' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button
            className={`py-2 px-3 font-medium text-center text-sm md:text-base ${
              activeTab === 'seo' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('seo')}
          >
            SEO
          </button>
        </div>
      </div>
      
      {/* Simple Form Tab */}
      {activeTab === 'simple' && (
        <div className="max-w-md mx-auto">
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Form Submission Test</h2>
            <p className="text-gray-600 mb-4">
              This page contains a simple contact form that submits to FormSpree for testing purposes.
            </p>
          </div>
          
          <SimpleContactForm />
        </div>
      )}
      
      {/* Debug Form Tab */}
      {activeTab === 'debug' && (
        <div>
          <div className="mb-8 bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">FormSpree Debugger</h2>
            <p className="text-gray-600 mb-4">
              Use this tool to test your FormSpree configuration with different submission methods and custom fields.
              The debugger provides detailed logs to help diagnose submission issues.
            </p>
          </div>
          
          <FormDebugger />
        </div>
      )}
      
      {/* Form Logs Tab */}
      {activeTab === 'logs' && (
        <div>
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Form Submission Logs</h2>
            <p className="text-gray-600 mb-4">
              This panel shows logs from form submissions across the entire website. 
              Use this to track and debug form submissions from any page.
            </p>
          </div>
          
          <FormLogger />
        </div>
      )}
      
      {/* Speed Test Tab */}
      {activeTab === 'speed' && (
        <div>
          <div className="mb-8 bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Network Speed Test</h2>
            <p className="text-gray-600 mb-4">
              Test your internet connection speed and performance. This tool measures ping, download, and upload speeds
              to help diagnose connectivity issues.
            </p>
          </div>
          
          <SpeedTest />
        </div>
      )}
      
      {/* Network Tools Tab */}
      {activeTab === 'network' && (
        <div>
          <div className="mb-8 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Network Diagnostic Tools</h2>
            <p className="text-gray-600 mb-4">
              This section provides various network diagnostic tools including ping, DNS lookup, and traceroute
              to help identify and troubleshoot network connectivity issues.
            </p>
          </div>
          
          <NetworkTools />
        </div>
      )}
      
      {/* Color Generator Tab */}
      {activeTab === 'color' && (
        <div>
          <div className="mb-8 bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Color Palette Generator</h2>
            <p className="text-gray-600 mb-4">
              Generate harmonious color palettes for your design projects. This tool offers various palette types
              including analogous, monochromatic, triadic, and complementary color schemes.
            </p>
          </div>
          
          <ColorGenerator />
        </div>
      )}
      
      {/* Password Generator Tab */}
      {activeTab === 'password' && (
        <div>
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Strong Password Generator</h2>
            <p className="text-gray-600 mb-4">
              Create secure, random passwords with customizable options for length and character types.
              The generator includes strength indicators and password history.
            </p>
          </div>
          
          <PasswordGenerator />
        </div>
      )}
      
      {/* Domain Lookup Tab */}
      {activeTab === 'domain' && (
        <div>
          <div className="mb-8 bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Domain & DNS Lookup</h2>
            <p className="text-gray-600 mb-4">
              Retrieve DNS records, IP addresses, and WHOIS information for any domain name.
              This tool provides detailed insights into domain configurations.
            </p>
          </div>
          
          <DomainLookup />
        </div>
      )}
      
      {/* Image Compressor Tab */}
      {activeTab === 'image' && (
        <div>
          <div className="mb-8 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Image Compression Tool</h2>
            <p className="text-gray-600 mb-4">
              Optimize images by reducing their file size while maintaining quality.
              Compress JPG, PNG, WebP, and GIF files for faster website loading.
            </p>
          </div>
          
          <ImageCompressor />
        </div>
      )}
      
      {/* Security Scanner Tab */}
      {activeTab === 'security' && (
        <div>
          <div className="mb-8 bg-red-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Website Security Scanner</h2>
            <p className="text-gray-600 mb-4">
              Check any website for common security vulnerabilities and best practices.
              Analyzes HTTP headers, SSL/TLS implementation, and security configurations.
            </p>
          </div>
          
          <SecurityScanner />
        </div>
      )}
      
      {/* SEO Analyzer Tab */}
      {activeTab === 'seo' && (
        <div>
          <div className="mb-8 bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">SEO Analyzer Tool</h2>
            <p className="text-gray-600 mb-4">
              Analyze any website for SEO best practices and performance.
              Checks meta tags, content quality, technical SEO, and provides actionable recommendations.
            </p>
          </div>
          
          <SeoAnalyzer />
        </div>
      )}
    </div>
  );
}