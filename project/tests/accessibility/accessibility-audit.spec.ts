import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility Audit Test Suite
 * Comprehensive WCAG 2.1 AA compliance testing
 */

test.describe('Accessibility Audit', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the main page
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('Homepage - WCAG 2.1 AA Compliance', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    // Generate detailed report
    console.log('Accessibility Scan Results:');
    console.log(`Total violations: ${accessibilityScanResults.violations.length}`);
    console.log(`Total passes: ${accessibilityScanResults.passes.length}`);

    // Log violations for detailed analysis
    if (accessibilityScanResults.violations.length > 0) {
      console.log('VIOLATIONS FOUND:');
      accessibilityScanResults.violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.id}: ${violation.description}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Help: ${violation.help}`);
        console.log(`   Elements: ${violation.nodes.length}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`     ${nodeIndex + 1}. ${node.target.join(', ')}`);
          if (node.failureSummary) {
            console.log(`        Failure: ${node.failureSummary}`);
          }
        });
        console.log('');
      });
    }

    // Log passes for positive validation
    console.log('PASSED RULES:');
    accessibilityScanResults.passes.forEach((pass, index) => {
      console.log(`${index + 1}. ${pass.id}: ${pass.description}`);
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Keyboard Navigation', async ({ page }) => {
    // Test tab navigation through interactive elements
    const interactiveElements = [
      'button:visible',
      'a:visible',
      'input:visible',
      'select:visible',
      '[tabindex]:visible'
    ];

    let tabStops = 0;
    for (const selector of interactiveElements) {
      const elements = await page.locator(selector).all();
      tabStops += elements.length;
    }

    console.log(`Found ${tabStops} potentially focusable elements`);

    // Test that Tab navigation works
    if (tabStops > 0) {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });

  test('Color Contrast', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );

    if (contrastViolations.length > 0) {
      console.log('COLOR CONTRAST VIOLATIONS:');
      contrastViolations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.description}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`   Element ${nodeIndex + 1}: ${node.target.join(', ')}`);
          console.log(`   Failure: ${node.failureSummary}`);
        });
      });
    }

    expect(contrastViolations).toEqual([]);
  });

  test('Form Accessibility', async ({ page }) => {
    // Check for forms and their accessibility
    const forms = page.locator('form:visible');
    const formCount = await forms.count();

    if (formCount > 0) {
      console.log(`Found ${formCount} forms to test`);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .include('form')
        .analyze();

      const formViolations = accessibilityScanResults.violations.filter(
        violation => ['label', 'form-field-multiple-labels', 'label-title-only'].includes(violation.id)
      );

      expect(formViolations).toEqual([]);
    } else {
      console.log('No forms found on this page');
    }
  });

  test('Images Alt Text', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['image-alt'])
      .analyze();

    const imageViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'image-alt'
    );

    if (imageViolations.length > 0) {
      console.log('IMAGE ALT TEXT VIOLATIONS:');
      imageViolations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.description}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`   Image ${nodeIndex + 1}: ${node.target.join(', ')}`);
        });
      });
    }

    expect(imageViolations).toEqual([]);
  });

  test('Heading Structure', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['heading-order'])
      .analyze();

    const headingViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'heading-order'
    );

    if (headingViolations.length > 0) {
      console.log('HEADING STRUCTURE VIOLATIONS:');
      headingViolations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.description}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`   Heading ${nodeIndex + 1}: ${node.target.join(', ')}`);
        });
      });
    }

    expect(headingViolations).toEqual([]);
  });

  test('Skip Links', async ({ page }) => {
    // Test for skip navigation links
    const skipLinks = page.locator('a[href^="#"]').filter({ hasText: /skip/i });
    const skipLinkCount = await skipLinks.count();

    if (skipLinkCount > 0) {
      console.log(`Found ${skipLinkCount} skip links`);

      // Test that skip links work
      const firstSkipLink = skipLinks.first();
      await firstSkipLink.focus();
      await expect(firstSkipLink).toBeVisible();

      await firstSkipLink.click();
      // The target should receive focus after clicking skip link
      const href = await firstSkipLink.getAttribute('href');
      if (href) {
        const target = page.locator(href);
        await expect(target).toBeFocused();
      }
    } else {
      console.log('No skip links found - consider adding for better accessibility');
    }
  });

  test('ARIA Landmarks', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['landmark-one-main', 'landmark-complementary-is-top-level', 'landmark-main-is-top-level'])
      .analyze();

    const landmarkViolations = accessibilityScanResults.violations;

    if (landmarkViolations.length > 0) {
      console.log('LANDMARK VIOLATIONS:');
      landmarkViolations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.id}: ${violation.description}`);
      });
    }

    expect(landmarkViolations).toEqual([]);
  });
});