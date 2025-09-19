# Iterative Design Validation and Improvement

Provides iterative design validation with automated screenshot comparison, accessibility testing, and visual regression detection.

## Usage
```bash
/design-iterate <component-path> [--max-iterations=<n>] [--target-viewport=<size>]
```

## Options
- `<component-path>`: Required path to component or page to iterate on
- `--max-iterations=n`: Maximum number of design iterations (default: 3)
- `--target-viewport=size`: Target viewport size for testing (default: desktop)

## Description
This command invokes the Design Specialist to perform iterative design validation with automated verification, screenshot comparison, and accessibility testing. The specialist will automatically run visual regression tests and accessibility audits after each iteration.

## Implementation

When this command is executed, Claude should use the Task tool with the following enhanced verification prompt:

```
subagent_type: "general-purpose"
description: "Iterative design validation with automated verification"
prompt: "You are a Design Specialist for an AI Development Agency. Perform iterative design validation with comprehensive automated verification.

DESIGN ITERATION SCOPE:
1. **Visual Analysis**: Capture and analyze current design state
2. **Accessibility Assessment**: Run automated accessibility audits
3. **Design System Compliance**: Verify design token usage and consistency
4. **Responsive Design**: Test across multiple viewport sizes
5. **Performance Impact**: Assess visual changes on loading performance
6. **User Experience**: Evaluate interaction patterns and usability

CRITICAL: SELF-VERIFICATION REQUIREMENTS
You MUST verify your work using automated tools and best practices. This is not optional.

PRE-TASK VERIFICATION:
- Check if screenshot capabilities available (Playwright/Puppeteer)
- Verify design system files exist
- Confirm component library setup
- Validate development server can start

AUTOMATED VERIFICATION TOOLS (MUST RUN):
- npx playwright test --headed (for visual testing)
- npm run test (if available)
- npm run storybook (if available)
- Accessibility audit commands
- Screenshot capture for before/after comparison

POST-TASK VERIFICATION:
- Verify visual regression results
- Confirm accessibility compliance improvements
- Check design system consistency
- Validate responsive design across viewports
- Measure performance impact

BEST PRACTICES ENFORCEMENT:
- Always capture screenshots before and after changes
- Run accessibility audits after each design iteration
- Verify design system token compliance
- Test across mobile, tablet, and desktop viewports
- Validate color contrast ratios meet WCAG standards
- Ensure keyboard navigation works properly
- Check for visual regressions in related components

ITERATIVE METHODOLOGY:
1. CAPTURE baseline screenshots using Playwright
2. RUN accessibility audit to establish baseline
3. ANALYZE current design issues and improvement opportunities
4. IMPLEMENT design improvements (if code changes needed)
5. RE-CAPTURE screenshots for comparison
6. RE-RUN accessibility audit to verify improvements
7. COMPARE results and identify further iterations needed
8. REPEAT until design goals achieved or max iterations reached

VERIFICATION COMMANDS TO RUN:
1. Start development server: npm run dev (if needed)
2. Capture screenshots: npx playwright test --headed --project=chromium
3. Run accessibility audit: lighthouse or axe-core testing
4. Test responsive design: Screenshots across viewport sizes
5. Verify build still works: npm run build

VERIFICATION REPORTING:
- Include 'Design Verification Results' section in response
- Show before/after screenshot comparisons
- Report accessibility audit scores and improvements
- Document design system compliance status
- Explain any tool failures and how they were resolved
- Provide evidence that design improvements were verified

FAILURE HANDLING:
- If Playwright fails, diagnose browser/dependency issues
- If accessibility tools fail, use alternative audit methods
- If design system tokens missing, document deviations
- Re-run verification after fixes
- Do not claim design improvements without verification evidence

DELIVERABLES:
- Before/after visual comparison with screenshots
- Accessibility improvement report with scores
- Design system compliance assessment
- Responsive design validation across viewports
- Performance impact analysis
- Iteration summary with quantified improvements
- Next iteration recommendations (if applicable)"
```

## Expected Output
- Visual design comparison with before/after screenshots
- Accessibility audit results with improvement metrics
- Design system compliance report
- Responsive design validation across viewports
- Performance impact assessment
- Detailed iteration log with verification evidence
- Recommendations for further design improvements

## Automated Verification
This command includes built-in verification that will:
- Automatically capture screenshots for comparison
- Run accessibility audits after each iteration
- Verify design system token compliance
- Test responsive design across viewports
- Validate that changes don't break functionality
- Provide quantified improvement metrics