# Command: visual-review

## Description
Perform a comprehensive visual design review using automated browser testing and screenshot analysis

## Usage
```
/visual-review [url] [--viewports=mobile,tablet,desktop] [--accessibility] [--performance]
```

## Parameters
- `url` (optional): Specific URL to review. Defaults to http://localhost:3000
- `--viewports`: Comma-separated list of viewports to test (mobile, tablet, desktop, all)
- `--accessibility`: Include accessibility audit in the review
- `--performance`: Include performance analysis in the review

## Implementation

This command will:

1. **Launch Playwright Browser**
   - Navigate to the specified URL or default localhost
   - Wait for page to fully load (networkidle state)

2. **Multi-Viewport Screenshot Capture**
   - Mobile: 375px × 667px
   - Tablet: 768px × 1024px
   - Desktop: 1920px × 1080px
   - Full page screenshots for each viewport

3. **Visual Analysis**
   - Check spacing consistency with 8px grid system
   - Verify typography hierarchy and sizing
   - Validate color usage against style guide
   - Identify visual inconsistencies or layout issues

4. **Accessibility Testing** (if --accessibility flag used)
   - Run axe-core automated accessibility tests
   - Check color contrast ratios
   - Verify keyboard navigation functionality
   - Test screen reader compatibility

5. **Performance Analysis** (if --performance flag used)
   - Measure Core Web Vitals metrics
   - Check for layout shifts
   - Analyze loading performance
   - Identify optimization opportunities

6. **Generate Report**
   - Summary of findings with severity levels
   - Screenshots highlighting issues
   - Specific recommendations for improvements
   - Action items with priority levels

## Examples

```bash
# Basic visual review of localhost
/visual-review

# Review specific page with all viewports
/visual-review http://localhost:3000/dashboard --viewports=all

# Complete review with accessibility and performance
/visual-review --accessibility --performance

# Mobile-only accessibility review
/visual-review --viewports=mobile --accessibility
```

## Output Format

The command generates a structured review report including:

### Visual Issues Found
- Screenshot comparisons showing problems
- Specific CSS selectors with issues
- Recommended fixes with code examples

### Accessibility Issues
- WCAG violation details with severity levels
- Color contrast failures with suggested improvements
- Keyboard navigation problems and solutions

### Performance Issues
- Core Web Vitals measurements
- Loading optimization recommendations
- Image and asset optimization suggestions

### Action Items
- Prioritized list of recommended changes
- Timeline estimates for each fix
- Links to relevant documentation

---

*This command streamlines the design review process by combining visual validation, accessibility testing, and performance analysis into a single automated workflow.*