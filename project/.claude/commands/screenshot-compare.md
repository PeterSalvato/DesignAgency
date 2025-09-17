# Command: screenshot-compare

## Description
Compare visual states before and after changes, with intelligent diff analysis and improvement suggestions

## Usage
```
/screenshot-compare [--before=path/to/before.png] [--after=current] [--viewport=desktop] [--threshold=0.1]
```

## Parameters
- `--before`: Path to baseline screenshot or 'capture' to take new baseline
- `--after`: Path to comparison screenshot or 'current' to capture current state
- `--viewport`: Viewport size for screenshots (mobile, tablet, desktop)
- `--threshold`: Visual difference threshold for highlighting changes (0.0-1.0)

## Implementation

This command provides sophisticated visual comparison capabilities:

1. **Baseline Management**
   - Capture baseline screenshots for components/pages
   - Store baselines with version control integration
   - Manage multiple baseline variants for different states

2. **Smart Screenshot Capture**
   - Consistent viewport and rendering settings
   - Wait for fonts, images, and animations to settle
   - Disable animations for pixel-perfect comparisons

3. **Visual Diff Analysis**
   - Pixel-level difference detection
   - Highlight areas of change with color coding
   - Calculate percentage of visual change

4. **Intelligent Change Detection**
   - Identify types of changes (layout, color, typography, spacing)
   - Classify changes as improvements or regressions
   - Suggest reasons for visual differences

5. **Contextual Analysis**
   - Compare changes against design system guidelines
   - Check if changes align with design principles
   - Validate accessibility impact of visual changes

6. **Report Generation**
   - Side-by-side visual comparison
   - Detailed change analysis with annotations
   - Recommendations for next steps

## Change Classification

### Layout Changes
- **Position**: Element positioning and alignment
- **Size**: Width, height, and scaling changes
- **Spacing**: Margin, padding, and gap modifications
- **Structure**: Addition, removal, or reordering of elements

### Visual Changes
- **Color**: Background, text, and border color changes
- **Typography**: Font size, weight, and family modifications
- **Images**: Image updates, sizing, and positioning
- **Effects**: Shadow, border-radius, and visual effect changes

### State Changes
- **Interactive**: Hover, focus, and active state differences
- **Loading**: Loading states and skeleton screens
- **Error**: Error states and validation messages
- **Empty**: Empty state presentations

## Examples

```bash
# Compare current state to stored baseline
/screenshot-compare --before=baselines/homepage-desktop.png --after=current

# Capture new baseline for future comparisons
/screenshot-compare --before=capture --after=current --viewport=mobile

# High-sensitivity comparison for pixel-perfect validation
/screenshot-compare --threshold=0.01

# Compare two specific screenshot files
/screenshot-compare --before=screenshots/v1-button.png --after=screenshots/v2-button.png
```

## Analysis Features

### Visual Metrics
- Pixel difference percentage
- Structural similarity index
- Color histogram comparison
- Layout shift measurements

### Design Quality Assessment
- Alignment consistency analysis
- Spacing system adherence
- Typography hierarchy evaluation
- Color palette compliance

### Accessibility Impact
- Color contrast changes
- Focus indicator modifications
- Text readability improvements
- Touch target size adjustments

### Performance Implications
- Layout complexity changes
- Rendering cost implications
- Paint and composite impact
- Animation performance effects

## Output Report

### Executive Summary
- Overall change assessment (Minor, Moderate, Significant)
- Number of changes detected by category
- Quality improvement or regression indication

### Visual Comparison
- Side-by-side before/after images
- Highlighted difference overlay
- Zoom views of significant changes
- Change percentage by region

### Detailed Analysis
- Specific changes identified with descriptions
- Design system compliance check
- Accessibility impact assessment
- Performance considerations

### Recommendations
- Approval status for changes
- Suggested improvements or adjustments
- Future testing requirements
- Documentation updates needed

## Integration Points

### Version Control
- Store baselines in git with proper versioning
- Track baseline updates and changes
- Associate baselines with specific commits

### CI/CD Pipeline
- Automated baseline updates on approved changes
- Regression detection in pull requests
- Quality gates based on visual change thresholds

### Design System
- Validate changes against component library
- Update design tokens based on approved changes
- Maintain visual consistency across components

---

*This command provides the visual validation backbone for the iterative design process, ensuring changes improve the user experience while maintaining design system consistency.*