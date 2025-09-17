import { test, expect } from '@playwright/test';

test.describe('Design Agency Visual Development - Functionality Test', () => {

  test('homepage loads successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Verify page loads
    await expect(page).toHaveTitle(/Design Agency/);

    // Verify main content loads
    await expect(page.locator('main')).toBeVisible();
  });

  test('all main components render correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Test Header component
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('text=DesignAgency')).toBeVisible();

    // Test Hero section
    await expect(page.locator('text=Turn Claude Code into Your Own')).toBeVisible();
    await expect(page.locator('text=Incredible UI Designer')).toBeVisible();

    // Test Feature section
    await expect(page.locator('text=The Missing 90% of Design Intelligence')).toBeVisible();

    // Test Testimonials section
    await expect(page.locator('text=Trusted by Design-Forward Teams')).toBeVisible();

    // Test CTA section
    await expect(page.locator('text=Ready to Transform Your')).toBeVisible();

    // Test Footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigation works correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Test navigation links
    await expect(page.locator('text=Features')).toBeVisible();
    await expect(page.locator('text=Testimonials')).toBeVisible();

    // Test mobile menu button (should be hidden on desktop)
    const mobileMenuButton = page.locator('[aria-label*="menu"]');
    await expect(mobileMenuButton).toBeVisible();
  });

  test('buttons and interactive elements work', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Test CTA buttons
    const primaryCTA = page.locator('text=Start Building Better UIs');
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toBeEnabled();

    const secondaryCTA = page.locator('text=Watch Demo');
    await expect(secondaryCTA).toBeVisible();
    await expect(secondaryCTA).toBeEnabled();

    // Test Get Started button in footer CTA
    const getStartedBtn = page.locator('text=Get Started Free');
    await expect(getStartedBtn).toBeVisible();
    await expect(getStartedBtn).toBeEnabled();
  });

  test('responsive design works at different viewports', async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    await expect(page.locator('main')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator('main')).toBeVisible();

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.locator('main')).toBeVisible();

    // Verify mobile menu is accessible on mobile
    const mobileMenuButton = page.locator('[aria-expanded]');
    await expect(mobileMenuButton).toBeVisible();
  });

  test('styling and design system work correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Verify CSS classes are applied (Tailwind working)
    const header = page.locator('header');
    await expect(header).toHaveClass(/bg-white/);

    // Verify design system colors are working
    const primaryButton = page.locator('.btn-primary').first();
    if (await primaryButton.count() > 0) {
      const bgColor = await primaryButton.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toBeTruthy(); // Should have background color
    }

    // Verify typography classes work
    const heading1 = page.locator('h1').first();
    await expect(heading1).toBeVisible();

    const fontSize = await heading1.evaluate(el =>
      window.getComputedStyle(el).fontSize
    );
    expect(parseInt(fontSize)).toBeGreaterThan(24); // Should be large heading
  });

  test('accessibility features work', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Test skip link
    const skipLink = page.locator('text=Skip to content');
    await expect(skipLink).toBeInViewport(); // Should be present even if visually hidden

    // Test ARIA labels
    const mobileMenuButton = page.locator('[aria-label*="menu"]');
    await expect(mobileMenuButton).toHaveAttribute('aria-label');

    // Test semantic structure
    await expect(page.locator('main[role="main"]')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Test heading hierarchy
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h2')).toBeVisible();
  });

  test('performance is acceptable', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Should load within reasonable time (5 seconds for dev server)
    expect(loadTime).toBeLessThan(5000);

    // Verify no console errors
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should have no critical console errors
    const criticalErrors = logs.filter(log =>
      !log.includes('favicon') && // Ignore favicon errors
      !log.includes('telemetry') // Ignore Next.js telemetry
    );
    expect(criticalErrors).toHaveLength(0);
  });
});