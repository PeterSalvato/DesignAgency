# /design-visual-review Command

## Usage
```bash
/design-visual-review [component-path] [--viewport=mobile|tablet|desktop|all]
```

## Implementation
This command must invoke the design-reviewer agent using the Task tool:

```javascript
// This is a real Claude Code slash command
// It MUST use the Task tool to invoke the actual design-reviewer agent

const result = await Task({
  subagent_type: "general-purpose",
  description: "Visual design review",
  prompt: `You are the design-reviewer specialist from departments/design/agents/design-reviewer.md.

Perform a comprehensive visual design review of: ${componentPath}

Requirements:
- Take screenshots across all viewports (mobile, tablet, desktop)
- Analyze against 8px grid system and design tokens
- Check design system compliance
- Provide specific improvement recommendations
- Include pixel-perfect measurements for any issues found

Viewport sizes to test:
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1440px width

Deliver a detailed visual analysis report with screenshots and actionable recommendations.`
});
```

## Expected Output
- Screenshots of component across all viewports
- Design system compliance analysis
- Specific pixel measurements for spacing/sizing issues
- Actionable improvement recommendations
- Visual hierarchy assessment

This ensures the actual design-reviewer specialist is invoked, not Claude pretending to be the specialist.