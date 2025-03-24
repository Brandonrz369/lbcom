# Web Tools Documentation

This document provides an overview of the web tools available on the LB Computer Help website. These tools are designed to assist users with common networking, design, and security tasks.

## Available Tools

The web tools are accessible at `/web-tools` and include:

1. [Form Test](#form-test)
2. [Form Debugger](#form-debugger) 
3. [Form Logs](#form-logs)
4. [Speed Test](#speed-test)
5. [Network Tools](#network-tools)
6. [Color Generator](#color-generator)
7. [Password Generator](#password-generator)
8. [Domain Lookup](#domain-lookup)
9. [Image Compressor](#image-compressor)
10. [Security Scanner](#security-scanner)
11. [SEO Analyzer](#seo-analyzer)

## Form Test

A simple contact form for testing form submissions through FormSpree.

- **Purpose**: Test basic form functionality
- **Usage**: Fill out the form and submit to ensure proper form handling
- **Integration**: Uses FormSpree for processing submissions

## Form Debugger

Advanced form testing utility for diagnosing submission issues.

- **Purpose**: Debug form submission problems
- **Features**:
  - Customizable form endpoints
  - Multiple submission methods (GET/POST)
  - Custom field creation
  - Detailed error reporting
- **Usage**: Configure form parameters and test submissions

## Form Logs

Records and displays form submission history across the website.

- **Purpose**: Track all form submissions
- **Features**:
  - Log storage in localStorage
  - Filterable log display
  - Timestamps and status indicators
- **Usage**: View recent form submissions and their status

## Speed Test

Network speed testing utility.

- **Purpose**: Measure internet connection performance
- **Metrics**:
  - Ping (latency in ms)
  - Download speed (Mbps)
  - Upload speed (Mbps)
- **Implementation**: Uses client-side performance API with server endpoints
- **Files**:
  - `src/components/SpeedTest.tsx`
  - `src/app/api/ping-test/route.ts`
  - `src/app/api/speed-test/download/route.ts`
  - `src/app/api/speed-test/upload/route.ts`
- **Usage**: Click "Start Speed Test" to begin the test

## Network Tools

Collection of network diagnostic utilities.

- **Purpose**: Diagnose network connectivity issues
- **Tools**:
  - Ping: Test connection to a specific host
  - DNS Lookup: Resolve domain names to IP addresses
  - Traceroute: Visualize network path to a destination
- **Implementation**: Client-side simulations with visual feedback
- **Files**: `src/components/NetworkTools.tsx`
- **Usage**: Enter hostnames or IPs in the respective tools

## Color Generator

Color palette generation tool.

- **Purpose**: Create harmonious color schemes for web and design projects
- **Features**:
  - Multiple palette types (analogous, monochromatic, triadic, complementary)
  - Color format conversion (HEX, RGB, HSL)
  - Recent color history
  - Copy-to-clipboard functionality
- **Implementation**: Client-side color calculations and conversions
- **Files**: `src/components/ColorGenerator.tsx`
- **Usage**: 
  1. Choose a base color
  2. Select a palette type
  3. Copy generated colors

## Password Generator

Secure password creation tool.

- **Purpose**: Generate strong, random passwords
- **Features**:
  - Adjustable password length
  - Character type toggles (uppercase, lowercase, numbers, symbols)
  - Password strength indicator
  - Password history
  - Copy-to-clipboard functionality
- **Implementation**: Client-side cryptographically secure random generation
- **Files**: `src/components/PasswordGenerator.tsx`
- **Usage**:
  1. Configure password options
  2. Generate password
  3. Copy to clipboard

## Domain Lookup

Domain information and DNS records lookup tool.

- **Purpose**: Analyze domain configuration and DNS records
- **Features**:
  - IP address resolution
  - DNS record lookup (A, AAAA, MX, TXT, CNAME, NS)
  - WHOIS information display
  - Export results as JSON
  - Tabbed interface for different data views
- **Implementation**: Client-side simulation with mock data generation
- **Files**: `src/components/DomainLookup.tsx`
- **Usage**:
  1. Enter a domain name
  2. View general information, DNS records, and WHOIS data
  3. Optionally export results as JSON
  
## Image Compressor

Client-side image compression utility.

- **Purpose**: Reduce image file sizes for web optimization
- **Features**:
  - Drag and drop interface
  - Quality and dimension controls
  - Compression statistics
  - Batch processing for multiple images
  - Individual or bulk download options
  - Visual preview of compressed images
- **Implementation**: Client-side canvas-based compression with analytics
- **Files**: `src/components/ImageCompressor.tsx`
- **Usage**:
  1. Drag and drop images or click to select files
  2. Adjust quality and max width settings
  3. Preview compressed images and savings
  4. Download individual images or the entire batch
  
## Security Scanner

Website security vulnerability scanner.

- **Purpose**: Identify security issues and provide improvement recommendations
- **Features**:
  - HTTP security header analysis
  - HTTPS implementation check
  - Security scoring system
  - Detailed recommendations for fixing issues
  - Export results as JSON format
  - Copy recommendations to clipboard
- **Implementation**: Client-side simulated security checks with analytics
- **Files**: `src/components/SecurityScanner.tsx`
- **Usage**:
  1. Enter a website URL
  2. Review the overall security score
  3. Examine individual security checks and recommendations
  4. Export results or copy recommendations for implementation

## SEO Analyzer

AI-powered website SEO analysis tool.

- **Purpose**: Analyze websites for SEO best practices and provide actionable recommendations
- **Features**:
  - Comprehensive SEO check categories (critical, important, good practice)
  - Meta tag analysis (title, description, OG tags)
  - Content quality assessment
  - Technical SEO evaluation
  - Detailed scoring system (overall and by category)
  - Keyword detection
  - Heading structure analysis
  - Markdown report export
  - Filterable results by category and status
- **Implementation**: Client-side SEO analysis with mock data generation and analytics
- **Files**: `src/components/SeoAnalyzer.tsx`
- **Usage**:
  1. Enter a website URL
  2. Review the overall SEO score and category breakdowns
  3. Examine meta tag information and detected keywords
  4. Review detailed SEO checks with recommendations
  5. Filter results by category or status
  6. Export a comprehensive markdown report

## Technical Implementation

The web tools are built using:
- React.js with Next.js framework
- TypeScript for type safety
- TailwindCSS for styling
- Server-side API routes for backend functionality

## Adding New Tools

To add a new tool:

1. Create a new component in `src/components/`
2. Add any required API routes in `src/app/api/`
3. Update the `src/app/web-tools/page.tsx` file:
   - Import the new component
   - Add a new tab in the navigation
   - Add the component to the conditional rendering

## Mobile Considerations

All tools are designed to be responsive and mobile-friendly:
- Fluid layouts using Flexbox and Grid
- Responsive typography
- Touch-friendly controls
- Conditional rendering based on device type

## Future Improvements

Planned enhancements for the web tools:
- Broken link checker
- Enhanced data visualization for test results
- Server-side analytics tracking
- Real API integrations for network and security tools
- ZIP file download for batch image compression
- PDF report generation for security and SEO scans
- API integrations for more accurate SEO analysis