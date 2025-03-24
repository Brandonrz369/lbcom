'use client';

import React, { useState } from 'react';
import { trackToolUsage } from '@/lib/analytics';

interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'failed' | 'warning' | 'pending';
  details?: string;
  recommendation?: string;
}

interface ScanResult {
  url: string;
  scanTime: Date;
  totalScore: number;
  maxScore: number;
  checks: SecurityCheck[];
}

export default function SecurityScanner() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setScanResult(null);
    
    // Track scan start
    trackToolUsage('SecurityScanner', 'scan_start', { url: targetUrl });
    
    try {
      // Initialize checks
      const checks: SecurityCheck[] = [
        {
          id: 'https',
          name: 'HTTPS Implementation',
          description: 'Checks if the website uses secure HTTPS connection',
          status: 'pending'
        },
        {
          id: 'hsts',
          name: 'HTTP Strict Transport Security',
          description: 'Checks if HSTS header is properly configured',
          status: 'pending'
        },
        {
          id: 'content-security',
          name: 'Content Security Policy',
          description: 'Checks if CSP header is implemented',
          status: 'pending'
        },
        {
          id: 'x-frame-options',
          name: 'X-Frame-Options',
          description: 'Prevents clickjacking attacks',
          status: 'pending'
        },
        {
          id: 'x-content-type',
          name: 'X-Content-Type-Options',
          description: 'Prevents MIME type sniffing',
          status: 'pending'
        },
        {
          id: 'referrer-policy',
          name: 'Referrer Policy',
          description: 'Controls information in the Referer header',
          status: 'pending'
        },
        {
          id: 'permissions-policy',
          name: 'Permissions Policy',
          description: 'Controls browser features and APIs',
          status: 'pending'
        },
        {
          id: 'server-info',
          name: 'Server Information',
          description: 'Checks if server software information is exposed',
          status: 'pending'
        }
      ];
      
      // Simulate a delay for scanning
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate scan results - in a real implementation, we would perform actual checks
      // For demo purposes, we'll generate random but realistic results
      const updatedChecks = checks.map(check => {
        const statuses: ('passed' | 'failed' | 'warning')[] = ['passed', 'failed', 'warning'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Custom logic for HTTPS check based on URL
        if (check.id === 'https') {
          const isHttps = targetUrl.startsWith('https://');
          return {
            ...check,
            status: isHttps ? 'passed' : 'failed',
            details: isHttps 
              ? 'The website uses HTTPS, which encrypts data in transit.' 
              : 'The website does not use HTTPS, which could expose data in transit.',
            recommendation: isHttps 
              ? 'Ensure HTTPS is enforced for all pages and resources.' 
              : 'Implement HTTPS across the entire website using a valid SSL certificate.'
          };
        }
        
        // Custom details and recommendations for each check
        switch(check.id) {
          case 'hsts':
            return {
              ...check,
              status: randomStatus,
              details: randomStatus === 'passed' 
                ? 'HSTS header found with appropriate max-age value.' 
                : randomStatus === 'warning' 
                  ? 'HSTS header found but with short max-age value.' 
                  : 'HSTS header not found.',
              recommendation: randomStatus === 'passed' 
                ? 'Consider adding your domain to the HSTS preload list for additional security.' 
                : randomStatus === 'warning' 
                  ? 'Increase the max-age value to at least 31536000 seconds (1 year).' 
                  : 'Implement HSTS with appropriate max-age and includeSubDomains directives.'
            };
          
          case 'content-security':
            return {
              ...check,
              status: randomStatus,
              details: randomStatus === 'passed' 
                ? 'Content Security Policy header found with strict directives.' 
                : randomStatus === 'warning' 
                  ? 'Content Security Policy header found but with permissive directives.' 
                  : 'Content Security Policy header not found.',
              recommendation: randomStatus === 'passed' 
                ? 'Regularly review and update your CSP to ensure it remains effective.' 
                : randomStatus === 'warning' 
                  ? 'Strengthen your CSP by limiting sources to necessary domains and using nonce or hash for inline scripts.' 
                  : 'Implement a Content Security Policy to prevent XSS and data injection attacks.'
            };
          
          case 'x-frame-options':
            return {
              ...check,
              status: randomStatus,
              details: randomStatus === 'passed' 
                ? 'X-Frame-Options header found with DENY or SAMEORIGIN value.' 
                : randomStatus === 'warning' 
                  ? 'X-Frame-Options header found but with potentially insecure ALLOW-FROM value.' 
                  : 'X-Frame-Options header not found.',
              recommendation: randomStatus === 'passed' 
                ? 'Consider using frame-ancestors directive in CSP as well for modern browsers.' 
                : randomStatus === 'warning' 
                  ? 'Use SAMEORIGIN instead of ALLOW-FROM for better browser compatibility.' 
                  : 'Implement X-Frame-Options header to prevent clickjacking attacks.'
            };
          
          case 'x-content-type':
            return {
              ...check,
              status: randomStatus,
              details: randomStatus === 'passed' 
                ? 'X-Content-Type-Options: nosniff header found.' 
                : 'X-Content-Type-Options header not found.',
              recommendation: randomStatus === 'passed' 
                ? 'Ensure all resources served have correct MIME types.' 
                : 'Implement X-Content-Type-Options: nosniff header to prevent MIME type sniffing.'
            };
          
          case 'referrer-policy':
            return {
              ...check,
              status: randomStatus,
              details: randomStatus === 'passed' 
                ? 'Referrer-Policy header found with secure value.' 
                : randomStatus === 'warning' 
                  ? 'Referrer-Policy header found but with potentially leaky value.' 
                  : 'Referrer-Policy header not found.',
              recommendation: randomStatus === 'passed' 
                ? 'Current policy provides good security. Consider using strict-origin-when-cross-origin for optimal balance.' 
                : randomStatus === 'warning' 
                  ? 'Use a more restrictive policy like strict-origin-when-cross-origin to better protect user privacy.' 
                  : 'Implement a Referrer-Policy header to control information sent in the Referer header.'
            };
          
          case 'permissions-policy':
            return {
              ...check,
              status: randomStatus,
              details: randomStatus === 'passed' 
                ? 'Permissions-Policy header found with appropriate restrictions.' 
                : randomStatus === 'warning' 
                  ? 'Feature-Policy header found (older version) but Permissions-Policy missing.' 
                  : 'Permissions-Policy header not found.',
              recommendation: randomStatus === 'passed' 
                ? 'Regularly review permitted features to maintain principle of least privilege.' 
                : randomStatus === 'warning' 
                  ? 'Upgrade to the newer Permissions-Policy header format.' 
                  : 'Implement Permissions-Policy header to control browser feature usage.'
            };
          
          case 'server-info':
            return {
              ...check,
              status: randomStatus,
              details: randomStatus === 'passed' 
                ? 'Server header is not present or does not expose detailed version information.' 
                : randomStatus === 'warning' 
                  ? 'Server header exposes limited information.' 
                  : 'Server header exposes detailed version information.',
              recommendation: randomStatus === 'passed' 
                ? 'Current configuration is good. Keep server information hidden.' 
                : randomStatus === 'warning' 
                  ? 'Configure server to completely remove version information.' 
                  : 'Configure server to hide or remove the Server header to prevent information disclosure.'
            };
          
          default:
            return {
              ...check,
              status: randomStatus,
              details: 'Default check details',
              recommendation: 'Default recommendation'
            };
        }
      });
      
      // Calculate score
      const scoreMap = {
        'passed': 1,
        'warning': 0.5,
        'failed': 0
      };
      
      const totalScore = updatedChecks.reduce((sum, check) => {
        return sum + (check.status === 'pending' ? 0 : scoreMap[check.status]);
      }, 0);
      
      const maxScore = updatedChecks.length;
      
      // Create scan result
      const result: ScanResult = {
        url: targetUrl,
        scanTime: new Date(),
        totalScore,
        maxScore,
        checks: updatedChecks
      };
      
      setScanResult(result);
      
      // Track scan completion
      trackToolUsage('SecurityScanner', 'scan_complete', { 
        url: targetUrl,
        score: totalScore,
        maxScore,
        passedChecks: updatedChecks.filter(c => c.status === 'passed').length,
        failedChecks: updatedChecks.filter(c => c.status === 'failed').length,
        warningChecks: updatedChecks.filter(c => c.status === 'warning').length
      });
    } catch (err) {
      console.error('Security scan error:', err);
      setError('Failed to complete security scan. Please try again.');
      
      // Track error
      trackToolUsage('SecurityScanner', 'scan_error', { 
        url: targetUrl,
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsScanning(false);
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCheckIcon = (status: SecurityCheck['status']) => {
    switch(status) {
      case 'passed':
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
      case 'failed':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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

  const exportScanResults = () => {
    if (!scanResult) return;
    
    // Create JSON blob
    const blob = new Blob([JSON.stringify(scanResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    const sanitizedUrl = scanResult.url.replace(/[^\w.-]/g, '_');
    a.href = url;
    a.download = `security-scan-${sanitizedUrl}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Track export
    trackToolUsage('SecurityScanner', 'export_results', { url: scanResult.url });
  };
  
  const copyRecommendationsToClipboard = () => {
    if (!scanResult) return;
    
    const recommendations = scanResult.checks
      .filter(check => check.status === 'failed' || check.status === 'warning')
      .map(check => `## ${check.name}\n${check.description}\n\nStatus: ${check.status === 'failed' ? 'Failed' : 'Warning'}\n\nDetails: ${check.details}\n\nRecommendation: ${check.recommendation}\n`);
    
    const text = `# Security Scan Recommendations for ${scanResult.url}\nScanned on ${scanResult.scanTime.toLocaleString()}\n\n${recommendations.join('\n')}\n\nGenerated by LB Computer Help Security Scanner`;
    
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Recommendations copied to clipboard');
        trackToolUsage('SecurityScanner', 'copy_recommendations', { url: scanResult.url });
      },
      (err) => {
        console.error('Failed to copy recommendations:', err);
      }
    );
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
            {isScanning ? 'Scanning...' : 'Scan'}
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {isScanning && (
          <div className="flex items-center justify-center py-4">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-600">Scanning website security... This may take a moment.</p>
          </div>
        )}
      </div>
      
      {scanResult && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">
                Scan Results: <span className="text-blue-600">{scanResult.url}</span>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Scanned on {scanResult.scanTime.toLocaleString()}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={exportScanResults}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                Export JSON
              </button>
              <button
                onClick={copyRecommendationsToClipboard}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
              >
                Copy Recommendations
              </button>
            </div>
          </div>
          
          {/* Overall Score */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-lg">Security Score</h4>
                <p className="text-gray-600 text-sm">
                  Based on common security practices and header implementations
                </p>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${getScoreColor(scanResult.totalScore, scanResult.maxScore)}`}>
                  {scanResult.totalScore}/{scanResult.maxScore}
                </p>
                <p className="text-sm text-gray-500">
                  {Math.round((scanResult.totalScore / scanResult.maxScore) * 100)}% secure
                </p>
              </div>
            </div>
            
            {/* Score bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  scanResult.totalScore / scanResult.maxScore >= 0.8 
                    ? 'bg-green-500' 
                    : scanResult.totalScore / scanResult.maxScore >= 0.5 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${(scanResult.totalScore / scanResult.maxScore) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Security Checks */}
          <div>
            <h4 className="font-medium text-lg mb-4">Security Checks</h4>
            
            <div className="space-y-4">
              {scanResult.checks.map((check) => (
                <div key={check.id} className="border rounded-md overflow-hidden">
                  <div className="flex items-center justify-between p-4 cursor-pointer" 
                    onClick={() => {
                      // Toggle expanded state in a real implementation
                    }}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getCheckIcon(check.status)}
                      </div>
                      <div>
                        <h5 className="font-medium">{check.name}</h5>
                        <p className="text-sm text-gray-600">{check.description}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        check.status === 'passed' 
                          ? 'bg-green-100 text-green-800' 
                          : check.status === 'warning' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : check.status === 'failed' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Expanded details - these are always visible in this demo */}
                  <div className="p-4 border-t bg-gray-50">
                    <div className="mb-2">
                      <span className="font-medium">Details: </span>
                      <span>{check.details}</span>
                    </div>
                    {check.recommendation && (
                      <div>
                        <span className="font-medium">Recommendation: </span>
                        <span>{check.recommendation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p className="mb-1 font-medium">Important Note:</p>
            <p>
              This scan provides a basic security assessment but is not comprehensive. 
              For complete security auditing, consider a professional penetration test.
              This demo uses simulated results for educational purposes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}