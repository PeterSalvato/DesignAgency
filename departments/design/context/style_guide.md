# Style Guide

## Color System

### Primary Colors
```css
/* Primary Brand Colors */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-200: #bae6fd;
--color-primary-300: #7dd3fc;
--color-primary-400: #38bdf8;
--color-primary-500: #0ea5e9;  /* Primary brand color */
--color-primary-600: #0284c7;
--color-primary-700: #0369a1;
--color-primary-800: #075985;
--color-primary-900: #0c4a6e;
```

### Neutral Colors
```css
/* Neutral Grays */
--color-neutral-50: #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
```

### Semantic Colors
```css
/* Status and Feedback Colors */
--color-success-500: #10b981;
--color-warning-500: #f59e0b;
--color-error-500: #ef4444;
--color-info-500: #3b82f6;

/* Background variants */
--color-success-50: #ecfdf5;
--color-warning-50: #fffbeb;
--color-error-50: #fef2f2;
--color-info-50: #eff6ff;
```

### Color Usage Guidelines
- **Primary**: Brand elements, call-to-action buttons, links
- **Neutral**: Text, backgrounds, borders, dividers
- **Success**: Confirmations, completed states, positive feedback
- **Warning**: Cautionary information, pending states
- **Error**: Error messages, validation failures, destructive actions
- **Info**: Informational content, tips, neutral notifications

## Typography

### Font Stack
```css
/* Primary Font Stack */
--font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-mono: 'Fira Code', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
```

### Type Scale
```css
/* Font Sizes - 8px Base */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Typography Usage
- **H1**: `text-5xl`, `font-weight-bold`, primary page titles
- **H2**: `text-3xl`, `font-weight-semibold`, section headers
- **H3**: `text-2xl`, `font-weight-medium`, subsection headers
- **Body**: `text-base`, `font-weight-normal`, main content
- **Caption**: `text-sm`, `font-weight-normal`, supporting text
- **Label**: `text-sm`, `font-weight-medium`, form labels

## Spacing System

### 8px Grid System
```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Spacing Usage Guidelines
- **Component Internal**: Use 2-6 (8-24px) for internal spacing
- **Component External**: Use 6-12 (24-48px) for component separation
- **Layout Sections**: Use 12-24 (48-96px) for major layout divisions
- **Page Margins**: Use 6-8 (24-32px) for page edge spacing

## Border Radius
```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-full: 9999px;   /* Circular */
```

## Shadows
```css
/* Elevation System */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

## Component Specifications

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--color-primary-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-medium);
  min-height: 44px; /* Touch target */
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-medium);
  min-height: 44px;
}
```

### Form Elements
```css
/* Input Fields */
.input {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  min-height: 44px;
}

.input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}
```

### Cards
```css
.card {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  border: 1px solid var(--color-neutral-200);
}
```

## Animation Guidelines

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Duration
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Animation Principles
- **Subtle**: Animations should enhance, not distract
- **Purposeful**: Every animation should have a clear function
- **Responsive**: Respect `prefers-reduced-motion` setting
- **Performance**: Use CSS transforms for smooth animations

## Accessibility Standards

### Color Contrast Requirements
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio (18px+ or 14px+ bold)
- **UI Components**: Minimum 3:1 contrast ratio for borders and focus indicators

### Focus Indicators
```css
.focus-ring {
  box-shadow: 0 0 0 3px var(--color-primary-100);
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Touch Targets
- **Minimum Size**: 44px × 44px for all interactive elements
- **Spacing**: Minimum 8px between adjacent touch targets
- **Visual Feedback**: Clear hover and active states

---

*This style guide ensures consistent visual implementation across all components and maintains accessibility standards while providing flexibility for creative expression.*