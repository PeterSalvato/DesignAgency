# Frontend Review Command

**Usage**: `/frontend-review <component-path> [options]`

Performs comprehensive frontend development review focusing on React/Next.js best practices, performance, and code quality.

## What This Command Does

1. **React Architecture Analysis**
   - Reviews component composition and structure
   - Validates props and state management patterns
   - Checks for proper React hooks usage
   - Assesses component reusability and maintainability

2. **Performance Assessment**
   - Analyzes re-render patterns and optimization opportunities
   - Reviews bundle size impact and code splitting
   - Checks for memory leaks and performance anti-patterns
   - Validates lazy loading and dynamic imports

3. **TypeScript Quality Review**
   - Verifies type safety and proper typing patterns
   - Checks for any/unknown usage and type assertions
   - Reviews interface and type definitions
   - Validates generic usage and constraints

4. **Integration Testing**
   - Reviews component testing patterns
   - Validates API integration and error handling
   - Checks for proper loading and error states
   - Assesses accessibility implementation

## Options

- `--performance`: Focus on performance optimization analysis
- `--typescript`: Deep dive into TypeScript usage and type safety
- `--architecture`: Focus on component architecture and patterns
- `--testing`: Emphasize testing patterns and coverage

## Example Usage

```bash
# Full frontend review
/frontend-review src/components/Dashboard.tsx

# Performance-focused review
/frontend-review src/components/DataTable.tsx --performance

# TypeScript deep dive
/frontend-review src/hooks/useApiData.ts --typescript

# Architecture analysis
/frontend-review src/components/UserProfile.tsx --architecture
```

## Review Criteria

### React Best Practices
- Component composition over inheritance
- Proper hooks usage and dependencies
- State management appropriateness
- Props interface design and validation

### Performance Standards
- Bundle size impact assessment
- Re-render optimization opportunities
- Memory usage and cleanup patterns
- Loading state and error boundary implementation

### Code Quality Metrics
- TypeScript strict mode compliance
- ESLint/Prettier adherence
- Component testing coverage
- Documentation completeness

## Implementation

This command should:
1. Launch the frontend-specialist agent
2. Analyze the specified component or hook
3. Run performance benchmarks if applicable
4. Check TypeScript compilation and type coverage
5. Generate actionable improvement recommendations
6. Provide code examples for suggested improvements