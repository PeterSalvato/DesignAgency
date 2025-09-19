import { test, expect } from '@playwright/test';

/**
 * Design Validation Visual Testing Suite
 * Captures comprehensive screenshots across components and viewports
 */

test.describe('Design Validation - Baseline Screenshots', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the main page
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('Full Page - Desktop Viewport', async ({ page }) => {
    // Set viewport to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Take full page screenshot
    await expect(page).toHaveScreenshot('full-page-desktop.png', {
      fullPage: true,
      threshold: 0.3
    });
  });

  test('Full Page - Tablet Portrait', async ({ page }) => {
    // Set viewport to tablet portrait
    await page.setViewportSize({ width: 768, height: 1024 });

    // Take full page screenshot
    await expect(page).toHaveScreenshot('full-page-tablet-portrait.png', {
      fullPage: true,
      threshold: 0.3
    });
  });

  test('Full Page - Mobile', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Take full page screenshot
    await expect(page).toHaveScreenshot('full-page-mobile.png', {
      fullPage: true,
      threshold: 0.3
    });
  });

  test('Header Component', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot of header component
    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header-component.png');
  });

  test('Hero Section', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Screenshot of hero section
    const heroSection = page.locator('[data-testid="hero-section"], section').first();
    await expect(heroSection).toHaveScreenshot('hero-section.png');
  });

  test('Features Section', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to features section
    await page.locator('text=/features?/i').first().scrollIntoViewIfNeeded();

    // Take screenshot of features section
    const featuresSection = page.locator('[data-testid="features-section"], section').nth(1);
    await expect(featuresSection).toHaveScreenshot('features-section.png');
  });

  test('Testimonials Section', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to testimonials section
    await page.locator('text=/testimonial/i').first().scrollIntoViewIfNeeded();

    // Take screenshot of testimonials section
    const testimonialsSection = page.locator('[data-testid="testimonials-section"], section').nth(2);
    await expect(testimonialsSection).toHaveScreenshot('testimonials-section.png');
  });

  test('Call to Action Section', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to CTA section
    await page.locator('text=/get started/i, text=/contact/i').first().scrollIntoViewIfNeeded();

    // Take screenshot of CTA section
    const ctaSection = page.locator('[data-testid="cta-section"], section').last();
    await expect(ctaSection).toHaveScreenshot('cta-section.png');
  });

  test('Footer Component', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Take screenshot of footer
    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer-component.png');
  });

  test('Responsive Navigation - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Try to find and interact with mobile menu if it exists
    const mobileMenuButton = page.locator('[aria-label*="menu"], button[aria-expanded], .mobile-menu-toggle').first();

    if (await mobileMenuButton.isVisible()) {
      // Take screenshot before opening menu
      await expect(page.locator('header')).toHaveScreenshot('mobile-nav-closed.png');

      // Click mobile menu button
      await mobileMenuButton.click();
      await page.waitForTimeout(500); // Wait for animation

      // Take screenshot with menu open
      await expect(page.locator('header')).toHaveScreenshot('mobile-nav-open.png');
    } else {
      // Just take mobile header screenshot
      await expect(page.locator('header')).toHaveScreenshot('mobile-nav.png');
    }
  });

  test('Interactive Elements States', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Find buttons and links for state testing
    const primaryButtons = page.locator('button:visible, a[class*="button"]:visible').first();

    if (await primaryButtons.count() > 0) {
      // Take screenshot of normal state
      await expect(primaryButtons).toHaveScreenshot('button-normal-state.png');

      // Hover state
      await primaryButtons.hover();
      await page.waitForTimeout(200);
      await expect(primaryButtons).toHaveScreenshot('button-hover-state.png');
    }
  });
});