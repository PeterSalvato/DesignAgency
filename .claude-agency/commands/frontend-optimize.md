# Frontend Performance Optimization

Provides detailed frontend performance analysis and optimization recommendations for improved user experience and Core Web Vitals.

## Usage
```bash
/frontend-optimize [--target=lighthouse-score] [--analyze-bundle]
```

## Options
- `--target=score`: Set target Lighthouse performance score (default: 90)
- `--analyze-bundle`: Include detailed bundle analysis and optimization

## Description
This command invokes the Frontend Specialist to analyze and optimize frontend performance, including bundle size, loading times, and Core Web Vitals.

## Implementation

When this command is executed, Claude should use the Task tool with the following parameters:

```
subagent_type: "general-purpose"
description: "Frontend performance optimization analysis"
prompt: "You are a Frontend Specialist for an AI Development Agency. Perform comprehensive frontend performance optimization analysis.

OPTIMIZATION SCOPE:
1. **Bundle Analysis**: Analyze bundle size, dependencies, and optimization opportunities
2. **Loading Performance**: Evaluate initial load times, code splitting, and lazy loading implementation
3. **Runtime Performance**: Assess component rendering efficiency and re-render optimization
4. **Core Web Vitals**: Analyze LCP, FID, CLS and provide specific improvement strategies
5. **Caching Strategy**: Review caching implementation and optimization opportunities
6. **Asset Optimization**: Evaluate image, font, and static asset optimization

DELIVERABLES:
- Performance audit report with current metrics
- Bundle optimization recommendations with size impact
- Code splitting and lazy loading strategy
- Core Web Vitals improvement plan
- Caching strategy optimization
- Asset optimization recommendations
- Implementation roadmap with performance targets

OPTIMIZATION METHODOLOGY:
- Analyze webpack/build configuration for optimization opportunities
- Review component structure for performance anti-patterns
- Evaluate dependency usage and identify optimization targets
- Assess loading strategies and critical rendering path
- Review image and asset optimization opportunities

Provide specific performance optimization recommendations with measurable targets and implementation guidance."
```

## Expected Output
- Performance audit dashboard with current metrics
- Bundle analysis with optimization opportunities
- Code splitting and lazy loading recommendations
- Core Web Vitals improvement strategy
- Caching optimization plan
- Asset optimization roadmap with impact estimates