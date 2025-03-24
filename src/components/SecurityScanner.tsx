'use client';

import React, { useState } from 'react';
import { trackToolUsage } from '@/lib/analytics';

interface SecurityCheck {
  id: string;
  category: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  status: 'pass' | 'fail' | 'warning' | 'info' | 'pending';
  recommendation?: string;
}

interface SecurityScore {
  overall: number; // 0-100
  ssl: number;
  headers: number;
  content: number;
}

interface SecurityResult {
  url: string;
  scanTime: Date;
  score: SecurityScore;
  checks: SecurityCheck[];
  headers?: Record<string, string>;
  certificates?: {
    valid: boolean;
    expires?: string;
    issuer?: string;
  };
}

export default function SecurityScanner() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<SecurityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  const handleScan = async () => {
    if (!url) return;
    
    // Validate URL
    let targetUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      targetUrl = 'https://' + url;
    }
    
    try {
      new URL(targetUrl);
    } catch (e) {
      setError('Please enter a valid URL');
      return;
    }
    
    // Reset states
    setIsScanning(true);
    setError(null);
    setResult(null);
    
    // Track scan start
    trackToolUsage('SecurityScanner', 'scan_start', { url: targetUrl });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock security scan data
      const mockResult = generateMockSecurityScan(targetUrl);
      setResult(mockResult);
      
      // Track scan completion
      trackToolUsage('SecurityScanner', 'scan_complete', { 
        url: targetUrl,
        score: mockResult.score.overall,
        passedChecks: mockResult.checks.filter(c => c.status === 'pass').length,
        failedChecks: mockResult.checks.filter(c => c.status === 'fail').length
      });
    } catch (err) {
      console.error('Security scan error:', err);
      setError('Failed to scan the website. Please try again.');
      
      // Track error
      trackToolUsage('SecurityScanner', 'scan_error', { 
        url: targetUrl,
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsScanning(false);
    }
  };

  const generateMockSecurityScan = (url: string): SecurityResult => {
    const isHttps = url.startsWith('https://');
    
    // Generate scores
    const sslScore = isHttps ? Math.floor(Math.random() * 20) + 80 : 0;
    const headersScore = Math.floor(Math.random() * 40) + 60;
    const contentScore = Math.floor(Math.random() * 30) + 70;
    const overallScore = Math.floor((sslScore + headersScore + contentScore) / 3);
    
    // Mock headers
    const mockHeaders: Record<string, string> = {
      'Content-Security-Policy': isHttps ? "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com;" : 'Not set',
      'X-Content-Type-Options': Math.random() > 0.3 ? 'nosniff' : 'Not set',
      'X-Frame-Options': Math.random() > 0.3 ? 'DENY' : 'Not set',
      'Strict-Transport-Security': isHttps && Math.random() > 0.5 ? 'max-age=31536000; includeSubDomains' : 'Not set',
      'X-XSS-Protection': Math.random() > 0.3 ? '1; mode=block' : 'Not set',
      'Referrer-Policy': Math.random() > 0.5 ? 'strict-origin-when-cross-origin' : 'Not set',
      'Permissions-Policy': Math.random() > 0.7 ? 'camera=(), microphone=(), geolocation=()' : 'Not set'
    };
    
    // Mock certificate info
    const mockCertificate = isHttps ? {
      valid: true,
      expires: new Date(Date.now() + Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      issuer: Math.random() > 0.5 ? 'Let\'s Encrypt Authority X3' : 'DigiCert Global CA G2'
    } : {
      valid: false
    };
    
    // Generate security checks
    const checks: SecurityCheck[] = [
      {
        id: 'https',
        category: 'critical',
        title: 'HTTPS Encryption',
        description: 'Website should use HTTPS to encrypt all data in transit',
        status: isHttps ? 'pass' : 'fail',
        recommendation: isHttps 
          ? 'Excellent! Your site is using HTTPS encryption.' 
          : 'Critical: Your site is not using HTTPS. Set up SSL/TLS certificates through your hosting provider or use a service like Let\'s Encrypt.'
      },
      {
        id: 'content-security-policy',
        category: 'critical',
        title: 'Content Security Policy',
        description: 'CSP header helps prevent XSS and data injection attacks',
        status: mockHeaders['Content-Security-Policy'] !== 'Not set' ? 'pass' : 'fail',
        recommendation: mockHeaders['Content-Security-Policy'] !== 'Not set'
          ? 'Good! You have a Content Security Policy set up. Review periodically to ensure it\'s up to date with your resource needs.'
          : 'Add a Content Security Policy header to help prevent XSS attacks. Start with a policy that restricts resources to your own domain.'
      },
      {
        id: 'x-content-type-options',
        category: 'warning',
        title: 'X-Content-Type-Options',
        description: 'Prevents MIME type sniffing attacks',
        status: mockHeaders['X-Content-Type-Options'] !== 'Not set' ? 'pass' : 'warning',
        recommendation: mockHeaders['X-Content-Type-Options'] !== 'Not set'
          ? 'Good! X-Content-Type-Options is properly set to "nosniff".'
          : 'Add X-Content-Type-Options: nosniff header to prevent browsers from interpreting files as a different MIME type.'
      },
      {
        id: 'x-frame-options',
        category: 'warning',
        title: 'X-Frame-Options',
        description: 'Prevents clickjacking attacks by disabling iframe embedding',
        status: mockHeaders['X-Frame-Options'] !== 'Not set' ? 'pass' : 'warning',
        recommendation: mockHeaders['X-Frame-Options'] !== 'Not set'
          ? 'Good! X-Frame-Options is properly set.'
          : 'Add X-Frame-Options header set to DENY or SAMEORIGIN to prevent your site from being embedded in iframes on other domains.'
      },
      {
        id: 'hsts',
        category: 'warning',
        title: 'HTTP Strict Transport Security',
        description: 'Forces browsers to use HTTPS for all future connections',
        status: isHttps && mockHeaders['Strict-Transport-Security'] !== 'Not set' ? 'pass' : 
                isHttps ? 'warning' : 'info',
        recommendation: isHttps && mockHeaders['Strict-Transport-Security'] !== 'Not set'
          ? 'Good! HSTS is properly configured.'
          : isHttps
            ? 'Add Strict-Transport-Security header to ensure clients always connect via HTTPS.'
            : 'HSTS requires HTTPS. Enable HTTPS first, then add HSTS header.'
      },
      {
        id: 'xss-protection',
        category: 'warning',
        title: 'X-XSS-Protection',
        description: 'Enables browser\'s built-in XSS filters',
        status: mockHeaders['X-XSS-Protection'] !== 'Not set' ? 'pass' : 'warning',
        recommendation: mockHeaders['X-XSS-Protection'] !== 'Not set'
          ? 'Good! X-XSS-Protection is enabled.'
          : 'Add X-XSS-Protection: 1; mode=block header to enable the browser\'s XSS filter.'
      },
      {
        id: 'referrer-policy',
        category: 'info',
        title: 'Referrer Policy',
        description: 'Controls what information is shared when users navigate away',
        status: mockHeaders['Referrer-Policy'] !== 'Not set' ? 'pass' : 'info',
        recommendation: mockHeaders['Referrer-Policy'] !== 'Not set'
          ? 'Good! Referrer-Policy is configured.'
          : 'Consider adding a Referrer-Policy header to control what information is sent when users click links to other sites.'
      },
      {
        id: 'permissions-policy',
        category: 'info',
        title: 'Permissions Policy',
        description: 'Controls access to browser features like camera, microphone, etc.',
        status: mockHeaders['Permissions-Policy'] !== 'Not set' ? 'pass' : 'info',
        recommendation: mockHeaders['Permissions-Policy'] !== 'Not set'
          ? 'Good! Permissions Policy is configured.'
          : 'Consider adding a Permissions-Policy header to control which browser features your site can use.'
      },
      {
        id: 'ssl-cert',
        category: 'critical',
        title: 'SSL Certificate Validity',
        description: 'Checks if SSL certificate is valid and not expired',
        status: isHttps && mockCertificate.valid ? 'pass' : isHttps ? 'fail' : 'info',
        recommendation: isHttps && mockCertificate.valid
          ? `Your SSL certificate is valid until ${mockCertificate.expires}.`
          : isHttps
            ? 'Your SSL certificate appears to be invalid. Contact your certificate provider or hosting company.'
            : 'Enable HTTPS to use SSL certificates.'
      },
      {
        id: 'mixed-content',
        category: 'critical',
        title: 'Mixed Content',
        description: 'Checks for HTTP content on HTTPS pages',
        status: isHttps ? (Math.random() > 0.7 ? 'fail' : 'pass') : 'info',
        recommendation: isHttps
          ? (Math.random() > 0.7
            ? 'Your HTTPS site is loading some resources over HTTP, which can lead to security warnings. Update all resource URLs to use HTTPS.'
            : 'Good! Your site does not load mixed content.')
          : 'Enable HTTPS first, then ensure all resources are loaded over HTTPS.'
      }
    ];
    
    return {
      url,
      scanTime: new Date(),
      score: {
        overall: overallScore,
        ssl: sslScore,
        headers: headersScore,
        content: contentScore
      },
      checks,
      headers: mockHeaders,
      certificates: mockCertificate
    };
  };

  const getFilteredChecks = () => {
    if (!result) return [];
    
    return result.checks.filter(check => {
      return filterCategory === 'all' || check.category === filterCategory;
    });
  };

  const exportReport = () => {
    if (!result) return;
    
    // Create markdown report
    let report = `# Website Security Scan Report for ${result.url}\n`;
    report += `Generated on ${result.scanTime.toLocaleString()}\n\n`;
    
    report += `## Overall Security Score: ${result.score.overall}/100\n\n`;
    report += `- SSL/TLS: ${result.score.ssl}/100\n`;
    report += `- Security Headers: ${result.score.headers}/100\n`;
    report += `- Content Security: ${result.score.content}/100\n\n`;
    
    report += `## Critical Issues\n\n`;
    result.checks.filter(check => check.category === 'critical' && (check.status === 'fail' || check.status === 'warning'))
      .forEach(check => {
        report += `### ${check.title}\n`;
        report += `Status: ${check.status === 'fail' ? '❌ Failed' : '⚠️ Warning'}\n`;
        report += `${check.description}\n`;
        if (check.recommendation) {
          report += `**Recommendation:** ${check.recommendation}\n`;
        }
        report += '\n';
      });
    
    report += `## Security Headers\n\n`;
    if (result.headers) {
      Object.entries(result.headers).forEach(([key, value]) => {
        report += `- **${key}:** ${value}\n`;
      });
    } else {
      report += 'No header information available\n';
    }
    report += '\n';
    
    if (result.certificates && result.url.startsWith('https://')) {
      report += `## SSL Certificate Information\n\n`;
      report += `- **Valid:** ${result.certificates.valid ? 'Yes' : 'No'}\n`;
      if (result.certificates.expires) {
        report += `- **Expiry Date:** ${result.certificates.expires}\n`;
      }
      if (result.certificates.issuer) {
        report += `- **Issuer:** ${result.certificates.issuer}\n`;
      }
      report += '\n';
    }
    
    report += `## All Security Checks\n\n`;
    result.checks.forEach(check => {
      report += `### ${check.title}\n`;
      report += `Status: ${
        check.status === 'pass' ? '✅ Pass' : 
        check.status === 'fail' ? '❌ Fail' : 
        check.status === 'warning' ? '⚠️ Warning' : 'ℹ️ Info'
      }\n`;
      report += `${check.description}\n`;
      if (check.recommendation) {
        report += `**Recommendation:** ${check.recommendation}\n`;
      }
      report += '\n';
    });
    
    report += `\n---\n`;
    report += `Generated by LB Computer Help Security Scanner Tool`;
    
    // Create blob and download
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const sanitizedUrlForFilename = result.url.replace(/[^\w.-]/g, '_');
    a.href = url;
    a.download = `security-report-${sanitizedUrlForFilename}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Track export
    trackToolUsage('SecurityScanner', 'export_report', { url: result.url });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: SecurityCheck['status']) => {
    switch(status) {
      case 'pass':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'fail':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Website Security Scanner</h2>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., example.com or https://example.com)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isScanning}
          />
          <button
            onClick={handleScan}
            disabled={isScanning || !url}
            className={`px-4 py-2 rounded-r-md text-white font-medium ${
              isScanning || !url
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {isScanning && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-center max-w-md">
              Scanning website security... This typically takes 20-30 seconds to analyze security headers, SSL configuration, and more.
            </p>
          </div>
        )}
      </div>
      
      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">
                Security Scan: <span className="text-blue-600">{result.url}</span>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Scanned on {result.scanTime.toLocaleString()}
              </p>
            </div>
            
            <button
              onClick={exportReport}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              Export Report
            </button>
          </div>
          
          {/* Overall Score */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-medium text-lg">Overall Security Score</h4>
                <p className="text-gray-600 text-sm mb-4 md:mb-0">
                  Based on SSL, security headers, and content security metrics
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className={`text-4xl font-bold ${getScoreColor(result.score.overall)}`}>
                  {result.score.overall}/100
                </p>
                <p className="text-sm text-gray-500">
                  {result.score.overall >= 80 
                    ? 'Good' 
                    : result.score.overall >= 60 
                      ? 'Needs Improvement' 
                      : 'Critical Issues'}
                </p>
              </div>
            </div>
            
            {/* Score bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  result.score.overall >= 80 
                    ? 'bg-green-500' 
                    : result.score.overall >= 60 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${result.score.overall}%` }}
              ></div>
            </div>
            
            {/* Subcategory scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">SSL/TLS Security</h5>
                <p className={`text-xl font-bold ${getScoreColor(result.score.ssl)}`}>
                  {result.score.ssl}/100
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">Security Headers</h5>
                <p className={`text-xl font-bold ${getScoreColor(result.score.headers)}`}>
                  {result.score.headers}/100
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="text-sm font-medium text-gray-500">Content Security</h5>
                <p className={`text-xl font-bold ${getScoreColor(result.score.content)}`}>
                  {result.score.content}/100
                </p>
              </div>
            </div>
          </div>
          
          {/* Security Headers Summary */}
          {result.headers && (
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3">Security Headers</h4>
              <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-500">
                    <tr>
                      <th className="pb-2">Header</th>
                      <th className="pb-2">Value</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.headers).map(([header, value]) => (
                      <tr key={header} className="border-t border-gray-200">
                        <td className="py-2 font-medium">{header}</td>
                        <td className="py-2 font-mono text-xs">{value === 'Not set' ? '-' : value}</td>
                        <td className="py-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            value === 'Not set' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {value === 'Not set' ? 'Missing' : 'Present'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* SSL Certificate Info */}
          {result.certificates && result.url.startsWith('https://') && (
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3">SSL Certificate</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className={`mr-2 p-1 rounded-full ${result.certificates.valid ? 'bg-green-100' : 'bg-red-100'}`}>
                    {result.certificates.valid ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">
                    Certificate Status: {result.certificates.valid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                
                {result.certificates.expires && (
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Expires: {result.certificates.expires}
                  </div>
                )}
                
                {result.certificates.issuer && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Issuer: {result.certificates.issuer}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Findings & Recommendations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-lg">Security Checks</h4>
              
              <div className="flex space-x-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="all">All issues</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warnings</option>
                  <option value="info">Info</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {getFilteredChecks().map((check) => (
                <div key={check.id} className="border rounded-md overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getStatusIcon(check.status)}
                      </div>
                      <div>
                        <h5 className="font-medium flex items-center">
                          {check.title}
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                            check.category === 'critical' 
                              ? 'bg-red-100 text-red-800' 
                              : check.category === 'warning' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {check.category}
                          </span>
                        </h5>
                        <p className="text-sm text-gray-600">{check.description}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                        check.status === 'pass' 
                          ? 'bg-green-100 text-green-800' 
                          : check.status === 'warning' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : check.status === 'fail' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                      }`}>
                        {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {check.recommendation && (
                    <div className="p-4 border-t">
                      <div className="bg-blue-50 text-blue-800 p-3 rounded-md">
                        <span className="font-medium">Recommendation: </span>
                        <span>{check.recommendation}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {getFilteredChecks().length === 0 && (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 italic">No security checks match your current filter.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p className="font-medium mb-1">Security Scan Disclaimer:</p>
            <p>
              This scan provides general security recommendations and may not catch all vulnerabilities or issues.
              For comprehensive security, consider a professional penetration test and regular security audits.
              This demo uses simulated results for educational purposes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}