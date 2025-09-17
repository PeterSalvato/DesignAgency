#!/usr/bin/env node

/**
 * Visual Development Workflow Initialization Script
 *
 * Sets up AI-powered visual development with Playwright MCP integration
 * for any existing project or creates a new project from scratch.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎨 Visual Development Workflow Initializer\n');

// Check if this is a Next.js project
const hasNextJS = fs.existsSync('next.config.js') || fs.existsSync('next.config.mjs') || fs.existsSync('next.config.ts');
const hasPackageJson = fs.existsSync('package.json');

if (!hasPackageJson) {
  console.log('❌ No package.json found. Please run this from your project root or create a new Next.js project:');
  console.log('   npx create-next-app@latest my-project --typescript --tailwind --app');
  process.exit(1);
}

if (!hasNextJS) {
  console.log('⚠️  This doesn\'t appear to be a Next.js project.');
  console.log('   The visual development workflow is optimized for Next.js with Tailwind CSS.');
  console.log('   You can still proceed, but you may need to adapt the configuration.\n');
}

console.log('📦 Installing dependencies...');

// Read existing package.json
const packageJsonPath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add required dependencies
const requiredDeps = {
  '@tailwindcss/aspect-ratio': '^0.4.2',
  '@tailwindcss/forms': '^0.5.10',
  '@tailwindcss/typography': '^0.5.16',
};

const requiredDevDeps = {
  '@axe-core/playwright': '^4.8.0',
  '@playwright/test': '^1.40.0',
  'autoprefixer': '^10.0.0',
  'postcss': '^8.0.0',
  'tailwindcss': '^3.0.0'
};

// Merge dependencies
packageJson.dependencies = { ...packageJson.dependencies, ...requiredDeps };
packageJson.devDependencies = { ...packageJson.devDependencies, ...requiredDevDeps };

// Add scripts
const requiredScripts = {
  'test': 'playwright test --config=config/playwright.config.ts',
  'test:ui': 'playwright test --config=config/playwright.config.ts --ui',
  'visual-test': 'playwright test --config=config/playwright.config.ts --project=visual-regression',
  'accessibility-test': 'playwright test --config=config/playwright.config.ts --project=accessibility'
};

packageJson.scripts = { ...packageJson.scripts, ...requiredScripts };

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('📁 Creating directory structure...');

// Create necessary directories
const dirs = [
  'config',
  '.claude/agents',
  '.claude/commands',
  'context',
  'tests/visual',
  'tests/accessibility',
  'tests/performance',
  'tests/utils'
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`   Created: ${dir}/`);
});

console.log('\n⚙️  Setting up configuration files...');

// Create Tailwind config
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}`;

fs.writeFileSync('config/tailwind.config.js', tailwindConfig);

// Create PostCSS config
const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: { config: './config/tailwind.config.js' },
    autoprefixer: {},
  },
}`;

fs.writeFileSync('config/postcss.config.js', postcssConfig);

// Create Playwright config
const playwrightConfig = `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: 'tablet-portrait',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 768, height: 1024 }
      },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'visual-regression',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
      testDir: '../tests/visual',
    },
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
      testDir: '../tests/accessibility',
    },
    {
      name: 'performance',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
      testDir: '../tests/performance',
    }
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});`;

fs.writeFileSync('config/playwright.config.ts', playwrightConfig);

console.log('🤖 Creating Claude Code agents and commands...');

// Create design reviewer agent
const designReviewer = `# Design Reviewer Agent

You are a specialized design review agent focused on visual validation, accessibility compliance, and design system adherence.

## Core Responsibilities

1. **Visual Design Analysis**
   - Review screenshots for visual hierarchy, spacing, and alignment
   - Validate color usage and contrast ratios
   - Check typography scale and readability
   - Assess component consistency and design system compliance

2. **Accessibility Compliance**
   - Verify WCAG 2.1 AA compliance
   - Check color contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text)
   - Validate keyboard navigation and focus states
   - Review ARIA labels and semantic HTML structure

3. **Technical Implementation Review**
   - Assess responsive design implementation
   - Review CSS class usage and Tailwind adherence
   - Check for performance implications
   - Validate HTML semantic structure

## Review Process

### Step 1: Initial Screenshot Analysis
- Capture screenshots at mobile (375px), tablet (768px), and desktop (1920px) viewports
- Document visual inconsistencies or design system violations
- Identify accessibility concerns from visual inspection

### Step 2: Technical Validation
- Run automated accessibility tests using axe-core
- Check color contrast ratios programmatically
- Validate HTML semantic structure
- Test keyboard navigation paths

### Step 3: Design System Compliance
- Verify spacing follows 8px grid system
- Check color usage against design tokens
- Validate typography scale adherence
- Review component pattern consistency

### Step 4: Actionable Recommendations
- Provide specific, implementable improvements
- Prioritize issues by severity (Critical, High, Medium, Low)
- Include code examples for fixes
- Suggest design alternatives when appropriate

## Reporting Format

### Summary
- Overall design quality score (1-10)
- Accessibility compliance status
- Number of issues found by severity

### Issues Found
For each issue:
- **Severity**: Critical/High/Medium/Low
- **Category**: Visual/Accessibility/Technical/Design System
- **Description**: Clear explanation of the problem
- **Impact**: How this affects users
- **Recommendation**: Specific steps to fix
- **Code Example**: Implementation guidance when applicable

### Validation Checklist
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works properly
- [ ] Responsive design functions correctly
- [ ] Typography hierarchy is clear
- [ ] Spacing follows 8px grid
- [ ] Component patterns are consistent
- [ ] Performance impact is minimal

## Success Criteria

A design passes review when:
- All Critical and High severity issues are resolved
- Accessibility score is 95%+ on axe-core tests
- Color contrast ratios meet WCAG AA standards
- Responsive design works across all target viewports
- Design system compliance is maintained
- User experience feels polished and professional`;

fs.writeFileSync('.claude/agents/design-reviewer.md', designReviewer);

// Create visual review command
const visualReviewCommand = `# Visual Review Command

**Usage**: \`/visual-review [options]\`

Performs comprehensive visual design review with automated testing and AI analysis.

## What This Command Does

1. **Multi-Viewport Screenshots**
   - Captures screenshots at mobile (375px), tablet (768px), and desktop (1920px)
   - Saves images with timestamps for comparison tracking
   - Automatically highlights visual inconsistencies

2. **Accessibility Testing**
   - Runs axe-core accessibility audit
   - Checks color contrast ratios
   - Validates keyboard navigation
   - Tests screen reader compatibility

3. **Design System Validation**
   - Verifies Tailwind class usage
   - Checks spacing adherence to 8px grid
   - Validates color token usage
   - Reviews typography scale compliance

4. **AI Design Analysis**
   - Analyzes visual hierarchy and balance
   - Reviews component consistency
   - Assesses overall design quality
   - Provides improvement recommendations

## Options

- \`--accessibility\`: Focus on accessibility compliance
- \`--performance\`: Include performance analysis
- \`--component=<path>\`: Review specific component
- \`--viewport=<size>\`: Test specific viewport only

## Example Usage

\`\`\`bash
# Full comprehensive review
/visual-review

# Accessibility-focused review
/visual-review --accessibility

# Review specific component
/visual-review --component=src/components/Button.tsx

# Test mobile viewport only
/visual-review --viewport=mobile
\`\`\`

## Implementation

This command should:
1. Launch the design-reviewer agent
2. Take screenshots using Playwright MCP
3. Run automated accessibility tests
4. Analyze results using AI
5. Generate actionable improvement report
6. Save results for comparison tracking`;

fs.writeFileSync('.claude/commands/visual-review.md', visualReviewCommand);

// Create design iterate command
const designIterateCommand = `# Design Iterate Command

**Usage**: \`/design-iterate <component-path> [options]\`

Iteratively improves a component through AI-powered design validation loops.

## What This Command Does

1. **Capture Current State**
   - Takes baseline screenshots
   - Documents current accessibility score
   - Records design system compliance

2. **Make Improvements**
   - Analyzes component code and styling
   - Applies design system principles
   - Improves accessibility and visual design
   - Maintains existing functionality

3. **Validate Changes**
   - Takes new screenshots for comparison
   - Runs accessibility tests
   - Checks for regressions
   - Validates improvements

4. **Iterate if Needed**
   - Continues improvement cycle if beneficial
   - Stops when optimal state is reached
   - Provides final comparison report

## Options

- \`--max-iterations=<n>\`: Maximum number of improvement cycles (default: 5)
- \`--focus=<area>\`: Focus on specific area (accessibility, visual, performance)
- \`--spec=<path>\`: Use specific design specification file

## Example Usage

\`\`\`bash
# Improve button component
/design-iterate src/components/Button.tsx

# Extended iteration with accessibility focus
/design-iterate src/components/Form.tsx --max-iterations=10 --focus=accessibility

# Use custom design spec
/design-iterate src/components/Card.tsx --spec=designs/card-requirements.md
\`\`\`

## Implementation Notes

This command should:
1. Read and understand the component code
2. Apply design principles from context files
3. Make incremental improvements
4. Test each change with visual validation
5. Continue until optimal or max iterations reached`;

fs.writeFileSync('.claude/commands/design-iterate.md', designIterateCommand);

console.log('📋 Creating context files...');

// Create design principles
const designPrinciples = `# Visual Development Design Principles

## Core Philosophy

The visual development workflow is built on the principle that AI can achieve exceptional design quality through iterative visual feedback loops. These principles guide every design decision and validation process.

## 1. Visual Hierarchy & Clarity

### Typography Scale
- Use consistent heading hierarchy (h1 → h2 → h3)
- Maintain clear size relationships between text elements
- Ensure adequate line height for readability (1.5x minimum)

### Spacing & Layout
- Follow 8px grid system for consistent spacing
- Use white space purposefully to create visual breathing room
- Align elements to create clean, organized layouts

### Color & Contrast
- Maintain WCAG AA contrast ratios (4.5:1 minimum)
- Use color purposefully to guide attention and convey meaning
- Implement consistent color palette throughout the design

## 2. Accessibility First

### Universal Design
- Design for all users, including those with disabilities
- Ensure keyboard navigation works for all interactive elements
- Provide alternative text for images and visual content

### Inclusive Patterns
- Use semantic HTML elements for proper screen reader support
- Implement focus states that are clearly visible
- Design for users with motor, visual, and cognitive differences

## 3. Responsive Excellence

### Mobile-First Approach
- Start design decisions with mobile constraints
- Progressive enhancement for larger screens
- Ensure touch targets are minimum 44px × 44px

### Flexible Layouts
- Use CSS Grid and Flexbox for responsive layouts
- Design content that adapts gracefully across viewports
- Test on real devices, not just browser dev tools

## 4. Performance Consciousness

### Efficient Design
- Optimize images and assets for web delivery
- Use CSS efficiently to minimize bundle size
- Design with loading states and progressive enhancement

### User Experience
- Prioritize perceived performance over absolute metrics
- Design for slow networks and limited bandwidth
- Implement meaningful loading and error states

## 5. Design System Consistency

### Component Patterns
- Reuse established patterns before creating new ones
- Maintain consistent interaction patterns across components
- Document component usage and variations

### Token-Based Design
- Use design tokens for colors, spacing, and typography
- Maintain consistency through systematic approach
- Enable easy theme changes and customization

## 6. Iterative Improvement

### Continuous Validation
- Test designs with real users and real content
- Gather feedback early and often
- Iterate based on data and user behavior

### Quality Metrics
- Measure accessibility compliance continuously
- Track performance metrics and user satisfaction
- Use automated testing to catch regressions

## Implementation Guidelines

### Visual Validation Process
1. Design → Code → Screenshot → Review → Iterate
2. Compare before/after states visually
3. Validate accessibility at each step
4. Test across multiple devices and browsers

### AI-Assisted Design Review
- Use AI to catch visual inconsistencies humans might miss
- Automate accessibility and design system compliance checks
- Generate improvement suggestions based on best practices

### Documentation Standards
- Document design decisions and rationale
- Maintain component usage guidelines
- Keep accessibility requirements visible and actionable

## Success Metrics

A design succeeds when it:
- Achieves 95%+ accessibility score
- Maintains consistent visual hierarchy
- Performs well across all target devices
- Follows design system principles
- Provides excellent user experience
- Can be maintained and scaled efficiently

These principles should guide every design decision and be enforced through the automated visual validation workflow.`;

fs.writeFileSync('context/design_principles.md', designPrinciples);

// Create style guide
const styleGuide = `# Visual Development Style Guide

## Color System

### Primary Brand Colors
\`\`\`css
--primary-50:  #eff6ff;
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #3b82f6;  /* Main brand color */
--primary-600: #2563eb;
--primary-700: #1d4ed8;
--primary-800: #1e40af;
--primary-900: #1e3a8a;
\`\`\`

### Neutral Grays
\`\`\`css
--neutral-50:  #fafafa;  /* Light backgrounds */
--neutral-100: #f5f5f5;
--neutral-200: #e5e5e5;  /* Borders */
--neutral-300: #d4d4d4;
--neutral-400: #a3a3a3;  /* Disabled text */
--neutral-500: #737373;  /* Secondary text */
--neutral-600: #525252;
--neutral-700: #404040;
--neutral-800: #262626;
--neutral-900: #171717;  /* Primary text */
\`\`\`

### Semantic Colors
\`\`\`css
/* Success */
--success-50:  #ecfdf5;
--success-500: #10b981;  /* Success states */
--success-600: #059669;

/* Warning */
--warning-50:  #fffbeb;
--warning-500: #f59e0b;  /* Warning states */
--warning-600: #d97706;

/* Error */
--error-50:  #fef2f2;
--error-500: #ef4444;    /* Error states */
--error-600: #dc2626;
\`\`\`

## Typography Scale

### Font Stack
- **Primary**: Inter, system-ui, sans-serif
- **Monospace**: 'Fira Code', Consolas, monospace

### Heading Scale
\`\`\`css
.heading-1 {
  font-size: 48px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.heading-2 {
  font-size: 32px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.heading-3 {
  font-size: 24px;
  line-height: 1.3;
  font-weight: 500;
}

.heading-4 {
  font-size: 20px;
  line-height: 1.4;
  font-weight: 500;
}
\`\`\`

### Body Text
\`\`\`css
.body-text {
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}

.body-large {
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
}

.body-small {
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
}

.caption-text {
  font-size: 12px;
  line-height: 1.3;
  font-weight: 400;
  color: var(--neutral-500);
}
\`\`\`

## Spacing System (8px Grid)

### Base Unit: 8px
All spacing should be multiples of 8px for consistency.

\`\`\`css
/* Tailwind Spacing Classes */
.p-1  { padding: 4px; }   /* Exception for fine adjustments */
.p-2  { padding: 8px; }   /* Base unit */
.p-3  { padding: 12px; }  /* 1.5 units */
.p-4  { padding: 16px; }  /* 2 units */
.p-6  { padding: 24px; }  /* 3 units */
.p-8  { padding: 32px; }  /* 4 units */
.p-12 { padding: 48px; }  /* 6 units */
.p-16 { padding: 64px; }  /* 8 units */
.p-20 { padding: 80px; }  /* 10 units */
.p-24 { padding: 96px; }  /* 12 units */
\`\`\`

### Component Spacing Guidelines
- **Button padding**: 16px × 8px (p-4 py-2)
- **Card padding**: 24px (p-6)
- **Section spacing**: 48px-96px (py-12 to py-24)
- **Element gaps**: 16px-24px (gap-4 to gap-6)

## Component Patterns

### Buttons
\`\`\`css
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
  min-height: 44px;
}

.btn-primary:hover {
  background: var(--primary-600);
}

.btn-primary:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

.btn-secondary {
  background: transparent;
  color: var(--primary-500);
  border: 2px solid var(--primary-500);
  padding: 10px 22px; /* Account for border */
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
  min-height: 44px;
}
\`\`\`

### Cards
\`\`\`css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border: 1px solid var(--neutral-200);
}

.card-hover {
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
\`\`\`

### Form Inputs
\`\`\`css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--neutral-200);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 150ms ease;
  min-height: 44px;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.input:invalid {
  border-color: var(--error-500);
}
\`\`\`

## Layout Patterns

### Container Widths
\`\`\`css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
\`\`\`

### Section Spacing
\`\`\`css
.section {
  padding: 96px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 48px 0;
  }
}
\`\`\`

## Border Radius Scale
\`\`\`css
--radius-sm: 4px;   /* Small elements */
--radius-md: 8px;   /* Buttons, inputs */
--radius-lg: 12px;  /* Cards */
--radius-xl: 16px;  /* Large cards */
--radius-2xl: 24px; /* Hero sections */
\`\`\`

## Shadow Scale
\`\`\`css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
\`\`\`

## Animation & Transitions

### Duration Scale
\`\`\`css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
\`\`\`

### Easing Functions
\`\`\`css
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
\`\`\`

## Accessibility Guidelines

### Focus States
- All interactive elements must have visible focus states
- Focus outline should be 2px with 2px offset
- Use primary color for focus indicators

### Color Contrast Requirements
- Normal text: 4.5:1 minimum ratio
- Large text (18px+): 3:1 minimum ratio
- UI components: 3:1 minimum ratio

### Touch Targets
- Minimum 44px × 44px for touch interfaces
- Provide adequate spacing between touch targets
- Ensure controls are easily reachable with thumb

## Implementation Notes

### CSS Custom Properties
Use CSS custom properties for theming and consistency:

\`\`\`css
:root {
  --spacing-unit: 8px;
  --container-width: 1200px;
  --font-family-primary: Inter, system-ui, sans-serif;
}
\`\`\`

### Responsive Breakpoints
\`\`\`css
/* Mobile first approach */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
\`\`\`

This style guide ensures consistent, accessible, and maintainable design across all components and pages.`;

fs.writeFileSync('context/style_guide.md', styleGuide);

// Create basic test helpers
const testHelpers = `import { expect, Page } from '@playwright/test';

/**
 * Visual testing utilities for design validation
 */

export class VisualHelpers {
  constructor(private page: Page) {}

  /**
   * Capture screenshot at specific viewport
   */
  async captureViewport(name: string, width: number, height: number) {
    await this.page.setViewportSize({ width, height });
    await this.page.waitForLoadState('networkidle');
    return await this.page.screenshot({
      path: \`screenshots/\${name}-\${width}x\${height}.png\`,
      fullPage: true
    });
  }

  /**
   * Test responsive design across multiple viewports
   */
  async testResponsive(url: string) {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      await this.page.goto(url);
      await this.captureViewport(viewport.name, viewport.width, viewport.height);

      // Verify basic layout works
      await expect(this.page.locator('main')).toBeVisible();
      await expect(this.page.locator('header')).toBeVisible();
      await expect(this.page.locator('footer')).toBeVisible();
    }
  }

  /**
   * Test color contrast ratios
   */
  async validateColorContrast() {
    const result = await this.page.evaluate(() => {
      // Basic contrast checking - you'd want a more robust solution
      const elements = document.querySelectorAll('*');
      const issues = [];

      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;

        // Add your contrast ratio calculation here
        // This is a simplified version
      });

      return issues;
    });

    return result;
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation() {
    const focusableElements = await this.page.locator('a, button, input, textarea, select, [tabindex]').all();

    for (let i = 0; i < focusableElements.length; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => document.activeElement?.tagName);

      // Verify focus is visible
      const focusedElement = await this.page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  }

  /**
   * Measure page performance
   */
  async measurePerformance() {
    const metrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      };
    });

    return metrics;
  }
}

/**
 * Accessibility testing utilities
 */
export async function runAccessibilityAudit(page: Page) {
  // You would integrate axe-core here
  const results = await page.evaluate(() => {
    // Placeholder for axe-core integration
    return { violations: [], passes: [] };
  });

  return results;
}

/**
 * Design system compliance checking
 */
export async function validateDesignSystem(page: Page) {
  const results = await page.evaluate(() => {
    const issues = [];

    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;

    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > lastLevel + 1) {
        issues.push(\`Heading hierarchy skip: \${heading.tagName} after h\${lastLevel}\`);
      }
      lastLevel = level;
    });

    // Check for consistent spacing (8px grid)
    // This is a simplified check - you'd want more robust validation

    return issues;
  });

  return results;
}`;

fs.writeFileSync('tests/utils/visual-helpers.ts', testHelpers);

// Create basic test file
const basicTest = `import { test, expect } from '@playwright/test';
import { VisualHelpers } from './utils/visual-helpers';

test.describe('Visual Development Tests', () => {
  let visualHelpers: VisualHelpers;

  test.beforeEach(async ({ page }) => {
    visualHelpers = new VisualHelpers(page);
  });

  test('homepage loads and renders correctly', async ({ page }) => {
    await page.goto('/');

    // Basic content checks
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Test responsive design
    await visualHelpers.testResponsive('/');
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('/');

    // Test keyboard navigation
    await visualHelpers.testKeyboardNavigation();
  });

  test('performance is acceptable', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000); // 5 second max

    // Measure detailed performance
    const metrics = await visualHelpers.measurePerformance();
    console.log('Performance metrics:', metrics);
  });
});`;

fs.writeFileSync('tests/basic-functionality.spec.ts', basicTest);

// Create CLAUDE.md
const claudeConfig = `# Visual Development Workflow Configuration

This project uses AI-powered visual development with Playwright MCP integration for automated design validation and iterative improvement.

## Core Principles

1. **Visual Feedback Loops**: Every design change is validated through automated screenshots and AI analysis
2. **Accessibility First**: WCAG 2.1 AA compliance is enforced at every step
3. **Design System Consistency**: Automated validation of design tokens and component patterns
4. **Iterative Refinement**: AI agents continuously improve design quality through feedback loops

## Workflow Commands

### Visual Design Review
\`\`\`bash
/visual-review                    # Comprehensive design review with screenshots
/visual-review --accessibility    # Focus on accessibility compliance
/visual-review --component=<path> # Review specific component
\`\`\`

### Iterative Design Improvement
\`\`\`bash
/design-iterate <component-path>           # Improve component through AI iteration
/design-iterate <path> --max-iterations=10 # Extended improvement cycles
/design-iterate <path> --focus=accessibility # Focus on specific area
\`\`\`

## Design Guidelines

### 8px Grid System
All spacing must follow multiples of 8px:
- Use \`p-2\` (8px), \`p-4\` (16px), \`p-6\` (24px), \`p-8\` (32px)
- Avoid arbitrary spacing like \`p-3\` (12px) or \`p-5\` (20px)

### Color System
- **Primary**: Use \`bg-primary-500\` for main brand elements
- **Neutrals**: Use \`text-neutral-900\` for text, \`bg-neutral-50\` for light backgrounds
- **Semantic**: Use \`bg-success-500\`, \`bg-warning-500\`, \`bg-error-500\` for status

### Typography Hierarchy
- **h1**: \`heading-1\` class (48px) - Page titles only
- **h2**: \`heading-2\` class (32px) - Section headers
- **h3**: \`heading-3\` class (24px) - Subsection headers
- **Body**: \`body-text\` class (16px) - Main content

### Accessibility Requirements
- All interactive elements minimum 44px × 44px
- Color contrast ratio 4.5:1 minimum for text
- Proper ARIA labels and semantic HTML
- Keyboard navigation for all interactive elements

## Testing Configuration

### Playwright Testing
- Multi-viewport testing: mobile (375px), tablet (768px), desktop (1920px)
- Cross-browser testing: Chrome, Firefox, Safari
- Visual regression detection with screenshot comparison
- Automated accessibility testing with axe-core

### Test Commands
\`\`\`bash
npm run test                      # Run all tests
npm run test:ui                   # Interactive test runner
npm run visual-test               # Visual regression tests only
npm run accessibility-test        # Accessibility tests only
\`\`\`

## AI Agents

### Design Reviewer Agent
Automatically reviews designs for:
- Visual hierarchy and spacing
- Color contrast and accessibility
- Design system compliance
- Cross-browser compatibility
- Performance implications

### Usage
The design reviewer agent is automatically invoked with \`/visual-review\` commands and provides:
- Detailed issue analysis with severity ratings
- Specific improvement recommendations
- Code examples for fixes
- Before/after visual comparisons

## Project Structure

\`\`\`
your-project/
├── config/                     # Configuration files
│   ├── playwright.config.ts    # Playwright testing setup
│   ├── tailwind.config.js      # Design system configuration
│   └── postcss.config.js       # PostCSS setup
├── .claude/
│   ├── agents/design-reviewer.md # AI design review agent
│   └── commands/               # Custom slash commands
├── context/
│   ├── design_principles.md    # Visual design guidelines
│   └── style_guide.md         # Comprehensive style guide
├── tests/
│   ├── utils/visual-helpers.ts # Testing utilities
│   └── *.spec.ts              # Test files
└── src/                       # Your application code
\`\`\`

## Getting Started

1. Install dependencies: \`npm install\`
2. Install Playwright browsers: \`npx playwright install chromium\`
3. Start development: \`npm run dev\`
4. Run your first visual review: \`/visual-review\`

## Best Practices

### Component Development
1. Start with accessibility and semantic HTML
2. Apply design system classes consistently
3. Test across multiple viewports immediately
4. Use \`/visual-review\` before considering complete
5. Iterate based on AI feedback

### Design System Compliance
- Always reference \`context/style_guide.md\` for patterns
- Use design tokens instead of arbitrary values
- Maintain consistent spacing and typography
- Validate changes with automated testing

### Performance Considerations
- Optimize images and assets for web
- Use CSS efficiently with Tailwind's utility classes
- Test on slower networks and devices
- Monitor Core Web Vitals metrics

This configuration enables AI-powered visual development that maintains high quality, accessibility, and design consistency throughout your project.`;

fs.writeFileSync('CLAUDE.md', claudeConfig);

console.log('\n🎯 Running installation...');

try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.log('⚠️  Some dependencies may need manual installation');
}

console.log('\n🎭 Installing Playwright browsers...');

try {
  execSync('npx playwright install chromium', { stdio: 'inherit' });
  console.log('✅ Playwright browsers installed');
} catch (error) {
  console.log('⚠️  Playwright browsers may need manual installation');
  console.log('   Run: npx playwright install chromium');
}

console.log('\n🎉 Visual Development Workflow initialized successfully!\n');

console.log('📋 Next steps:');
console.log('   1. Start your development server: npm run dev');
console.log('   2. In Claude Code, run: /visual-review');
console.log('   3. Begin building with AI-powered design validation');
console.log('   4. Check the generated CLAUDE.md for full workflow documentation\n');

console.log('📁 Files created:');
console.log('   • config/playwright.config.ts - Testing configuration');
console.log('   • config/tailwind.config.js - Design system');
console.log('   • .claude/agents/design-reviewer.md - AI design reviewer');
console.log('   • .claude/commands/ - Visual development commands');
console.log('   • context/ - Design principles and style guide');
console.log('   • tests/ - Test utilities and examples');
console.log('   • CLAUDE.md - Main workflow configuration\n');

console.log('🎨 Ready to build incredible UIs with AI-powered visual development!');