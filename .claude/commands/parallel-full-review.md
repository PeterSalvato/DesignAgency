# /parallel-full-review Command

## Usage
```bash
/parallel-full-review <component-or-feature> [--include-mobile] [--skip-ai]
```

## Implementation
This command runs multiple specialists in parallel for comprehensive analysis:

```javascript
// Parallel execution of 6+ specialists
export async function execute(args) {
  const target = args.target;

  // Run core specialists in parallel
  const results = await Promise.all([
    // Design & UX
    Task({
      subagent_type: "general-purpose",
      description: "Visual design review",
      prompt: `You are the design-reviewer specialist. Analyze ${target} for visual design compliance.`
    }),

    Task({
      subagent_type: "general-purpose",
      description: "Accessibility audit",
      prompt: `You are the accessibility-specialist. Perform WCAG 2.1 AA compliance check on ${target}.`
    }),

    // Technical Analysis
    Task({
      subagent_type: "general-purpose",
      description: "React architecture review",
      prompt: `You are the react-architect specialist. Review component architecture for ${target}.`
    }),

    Task({
      subagent_type: "general-purpose",
      description: "Security vulnerability scan",
      prompt: `You are the security-engineer specialist. Perform security analysis of ${target}.`
    }),

    Task({
      subagent_type: "general-purpose",
      description: "Performance optimization",
      prompt: `You are the performance-engineer specialist. Analyze performance of ${target}.`
    }),

    // Quality Assurance
    Task({
      subagent_type: "general-purpose",
      description: "Test coverage analysis",
      prompt: `You are the test-engineer specialist. Review test coverage for ${target}.`
    })
  ]);

  return {
    designAnalysis: results[0],
    accessibilityAudit: results[1],
    architectureReview: results[2],
    securityScan: results[3],
    performanceAudit: results[4],
    testCoverage: results[5]
  };
}
```

## Expected Output
- All 6 specialist analyses completed simultaneously
- Comprehensive report covering all aspects
- 3-4x faster than sequential analysis
- Cross-specialist insights and recommendations

This demonstrates real parallel specialist execution for complete feature analysis.