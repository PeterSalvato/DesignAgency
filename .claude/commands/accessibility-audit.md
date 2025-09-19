# Command: accessibility-audit

## Description
Comprehensive accessibility testing using automated tools, manual checks, and screen reader simulation

## Usage
```
/accessibility-audit [url] [--level=AA] [--simulate-disabilities] [--generate-report]
```

## Parameters
- `url` (optional): Specific URL to audit. Defaults to http://localhost:3000
- `--level`: WCAG compliance level (A, AA, AAA). Default: AA
- `--simulate-disabilities`: Include disability simulation testing
- `--generate-report`: Create detailed HTML report with findings

## Implementation

This command provides comprehensive accessibility validation:

1. **Automated Testing with axe-core**
   - Run complete axe-core accessibility test suite
   - Check for WCAG 2.1 violations at specified level
   - Generate detailed violation reports with remediation steps

2. **Color Contrast Analysis**
   - Test all text elements for proper contrast ratios
   - Identify contrast failures with specific measurements
   - Suggest color adjustments to meet standards

3. **Keyboard Navigation Testing**
   - Verify complete keyboard accessibility
   - Test tab order and focus management
   - Check for keyboard traps or unreachable content

4. **Screen Reader Simulation**
   - Validate semantic markup and ARIA attributes
   - Test heading hierarchy and landmark structure
   - Check alternative text and descriptions

5. **Motor Disability Considerations**
   - Verify touch target sizes (minimum 44px)
   - Check spacing between interactive elements
   - Test for motion sensitivity compliance

6. **Cognitive Accessibility**
   - Analyze content structure and clarity
   - Check for consistent navigation patterns
   - Verify error message clarity and helpfulness

## Test Categories

### Visual Accessibility
- **Color Blindness**: Test with various color vision simulations
- **Low Vision**: Check magnification and zoom behavior
- **Contrast**: Ensure sufficient color contrast ratios
- **Focus Indicators**: Verify clear focus visual indicators

### Motor Accessibility
- **Touch Targets**: Minimum 44px for all interactive elements
- **Spacing**: Adequate space between touch targets
- **Alternative Input**: Support for switch navigation
- **Motion Tolerance**: Respect `prefers-reduced-motion`

### Auditory Accessibility
- **Captions**: Video content has captions available
- **Transcripts**: Audio content has text alternatives
- **Visual Indicators**: Visual alternatives for audio cues
- **Sound Control**: User can control audio playback

### Cognitive Accessibility
- **Clear Language**: Simple, understandable content
- **Consistent Navigation**: Predictable interface patterns
- **Error Prevention**: Clear validation and error recovery
- **Time Limits**: Sufficient time or user control over timing

## Examples

```bash
# Basic WCAG AA audit of localhost
/accessibility-audit

# Complete audit with disability simulations
/accessibility-audit --level=AAA --simulate-disabilities

# Audit specific page with detailed report
/accessibility-audit http://localhost:3000/checkout --generate-report

# Quick color contrast check
/accessibility-audit --focus=color-contrast
```

## Disability Simulations

### Visual Impairments
- **Total Blindness**: Screen reader navigation only
- **Low Vision**: High contrast and magnification testing
- **Color Blindness**: Deuteranopia, protanopia, tritanopia simulations
- **Light Sensitivity**: Dark mode and reduced brightness testing

### Motor Impairments
- **Keyboard Only**: Complete keyboard navigation testing
- **Switch Navigation**: Single-switch scanning interface testing
- **Tremor Simulation**: Large target and timing accommodation testing
- **Limited Mobility**: Voice control and alternative input testing

### Cognitive Impairments
- **Memory Issues**: Test task completion with interruptions
- **Attention Disorders**: Minimize distractions and clear focus
- **Learning Disabilities**: Simple language and clear instructions
- **Processing Speed**: Adequate time and no auto-advancing content

## Report Structure

### Executive Summary
- Overall accessibility score and WCAG level compliance
- Number of violations by severity (Critical, Serious, Moderate, Minor)
- Key areas requiring immediate attention

### Detailed Findings

#### Critical Issues
- Blocking accessibility violations that prevent usage
- Specific WCAG success criteria failures
- Immediate remediation steps with code examples

#### Improvement Opportunities
- Areas where accessibility could be enhanced
- Best practice recommendations
- Future-proofing suggestions

#### Compliance Status
- WCAG 2.1 success criteria checklist
- Level A, AA, and AAA requirement status
- Industry-specific accessibility standards

### Remediation Guidance

#### Quick Fixes
- Simple changes that can be implemented immediately
- Code snippets and specific solutions
- Expected impact and validation steps

#### Moderate Effort
- Changes requiring design or architecture modifications
- Resource requirements and timeline estimates
- Testing and validation procedures

#### Long-term Improvements
- Strategic accessibility improvements
- Design system updates and pattern changes
- Team training and process recommendations

### Testing Results

#### Automated Testing
- axe-core test results with detailed explanations
- Color contrast measurements and failures
- HTML validation and semantic structure issues

#### Manual Testing
- Keyboard navigation testing results
- Screen reader compatibility findings
- User flow accessibility validation

#### Simulation Testing
- Disability simulation test outcomes
- Assistive technology compatibility results
- User experience quality assessments

## Integration Features

### Development Workflow
- Pre-commit hooks for accessibility validation
- CI/CD pipeline integration for automated testing
- Pull request accessibility checks

### Design System Integration
- Component-level accessibility documentation
- Accessibility pattern library updates
- Design token validation for contrast compliance

### Team Collaboration
- Accessibility checklist for designers and developers
- Training recommendations based on findings
- Progress tracking and improvement metrics

---

*This command ensures that all digital experiences are inclusive and accessible to users with disabilities, providing both automated validation and human-centered accessibility testing.*