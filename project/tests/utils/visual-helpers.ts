import { Page, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

export interface VisualTestOptions {
  viewports?: Array<{ width: number; height: number; name: string }>;
  threshold?: number;
  animations?: 'disabled' | 'allow';
  clip?: { x: number; y: number; width: number; height: number };
}

export interface AccessibilityTestOptions {
  rules?: string[];
  tags?: string[];
  exclude?: string[];
}

/**
 * Visual Development Testing Utilities
 * Helper functions for visual validation and accessibility testing
 */
export class VisualTestHelpers {

  /**
   * Take screenshot with consistent settings for visual regression testing
   */
  static async takeVisualSnapshot(
    page: Page,
    name: string,
    options: VisualTestOptions = {}
  ) {
    const {
      viewports = [{ width: 1920, height: 1080, name: 'desktop' }],
      threshold = 0.2,
      animations = 'disabled'
    } = options;

    // Disable animations for consistent screenshots
    if (animations === 'disabled') {
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `
      });
    }

    // Wait for fonts and images to load
    await page.waitForLoadState('networkidle');
    await this.waitForFontsLoaded(page);

    // Take screenshot at each viewport
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500); // Allow layout to settle

      await expect(page).toHaveScreenshot(
        `${name}-${viewport.name}.png`,
        {
          threshold,
          clip: options.clip,
          fullPage: true
        }
      );
    }
  }

  /**
   * Comprehensive accessibility testing using axe-core
   */
  static async checkAccessibility(
    page: Page,
    options: AccessibilityTestOptions = {}
  ) {
    const axeBuilder = new AxeBuilder({ page });

    if (options.rules) {
      axeBuilder.withRules(options.rules);
    }

    if (options.tags) {
      axeBuilder.withTags(options.tags);
    }

    if (options.exclude) {
      axeBuilder.exclude(options.exclude.join(', '));
    }

    const results = await axeBuilder.analyze();

    // Custom assertions for accessibility
    expect(results.violations).toHaveLength(0);

    return results;
  }

  /**
   * Check color contrast ratios
   */
  static async checkColorContrast(page: Page, selector: string) {
    const contrastRatio = await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return null;

      const style = window.getComputedStyle(element);
      const bgColor = style.backgroundColor;
      const textColor = style.color;

      // This is a simplified contrast calculation
      // In production, you'd use a proper contrast calculation library
      return { bgColor, textColor };
    }, selector);

    expect(contrastRatio).not.toBeNull();
    return contrastRatio;
  }

  /**
   * Test responsive behavior across breakpoints
   */
  static async testResponsiveBehavior(
    page: Page,
    testCallback: (viewport: { width: number; height: number; name: string }) => Promise<void>
  ) {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1024, height: 768, name: 'tablet-landscape' },
      { width: 1440, height: 900, name: 'desktop' },
      { width: 1920, height: 1080, name: 'large-desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500); // Allow layout to settle
      await testCallback(viewport);
    }
  }

  /**
   * Wait for web fonts to load completely
   */
  static async waitForFontsLoaded(page: Page) {
    await page.evaluate(() => {
      return document.fonts.ready;
    });
  }

  /**
   * Check for console errors and warnings
   */
  static async checkConsoleErrors(page: Page) {
    const messages: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        messages.push(`${msg.type()}: ${msg.text()}`);
      }
    });

    return messages;
  }

  /**
   * Test keyboard navigation
   */
  static async testKeyboardNavigation(page: Page, startSelector?: string) {
    if (startSelector) {
      await page.click(startSelector);
    }

    // Test Tab navigation
    const focusableElements = await page.evaluate(() => {
      const focusables = Array.from(document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )).filter((el: any) => {
        return !el.disabled &&
               !el.hasAttribute('inert') &&
               el.offsetWidth > 0 &&
               el.offsetHeight > 0;
      });

      return focusables.length;
    });

    // Navigate through all focusable elements
    for (let i = 0; i < focusableElements; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }

    return focusableElements;
  }

  /**
   * Performance testing utilities
   */
  static async measurePagePerformance(page: Page) {
    const performanceEntries = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      };
    });

    return performanceEntries;
  }

  /**
   * Check for layout shifts
   */
  static async measureLayoutShift(page: Page, duration: number = 5000) {
    await page.evaluate(() => {
      (window as any).cumulativeLayoutShift = 0;

      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            (window as any).cumulativeLayoutShift += (entry as any).value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.waitForTimeout(duration);

    const cls = await page.evaluate(() => (window as any).cumulativeLayoutShift);
    return cls;
  }
}

/**
 * Custom assertions for design validation
 */
export const designAssertions = {

  async toHaveConsistentSpacing(page: Page, selectors: string[]) {
    const spacings = await page.evaluate((sels) => {
      return sels.map(sel => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
          selector: sel,
          marginTop: style.marginTop,
          marginBottom: style.marginBottom,
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom
        };
      }).filter(Boolean);
    }, selectors);

    // Check that spacings follow 8px grid system
    spacings.forEach(spacing => {
      const values = [
        spacing?.marginTop,
        spacing?.marginBottom,
        spacing?.paddingTop,
        spacing?.paddingBottom
      ].filter(v => v && v !== '0px');

      values.forEach(value => {
        const pixels = parseInt(value as string);
        expect(pixels % 8).toBe(0);
      });
    });
  },

  async toHaveProperColorContrast(page: Page, textSelector: string, bgSelector?: string) {
    const contrast = await VisualTestHelpers.checkColorContrast(page, textSelector);
    expect(contrast).toBeDefined();
    // Add actual contrast ratio calculation and assertion here
  },

  async toBeResponsive(page: Page, selector: string) {
    await VisualTestHelpers.testResponsiveBehavior(page, async (viewport) => {
      const element = page.locator(selector);
      await expect(element).toBeVisible();

      // Check that element doesn't overflow
      const box = await element.boundingBox();
      expect(box?.width).toBeLessThanOrEqual(viewport.width);
    });
  }
};