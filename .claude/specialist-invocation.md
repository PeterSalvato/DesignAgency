# Specialist Invocation Guide

## How to Ensure Real Specialist Calls

This guide ensures you invoke actual specialist agents, not Claude pretending to be them.

## Required Pattern: Use Task Tool

**ALWAYS use this pattern to invoke specialists:**

```javascript
const result = await Task({
  subagent_type: "general-purpose",
  description: "Specialist work description",
  prompt: `You are the [SPECIALIST_NAME] specialist from departments/[DEPARTMENT]/agents/[SPECIALIST].md.

[SPECIFIC_TASK_REQUIREMENTS]

You must:
1. [Specific action 1]
2. [Specific action 2]
3. [Provide specific output format]

Deliver: [Expected deliverable]`
});
```

## Design Department Invocations

### Design Reviewer
```javascript
Task({
  subagent_type: "general-purpose",
  description: "Visual design review",
  prompt: "You are the design-reviewer specialist. Take screenshots across mobile/tablet/desktop viewports and analyze against design system compliance."
});
```

### Accessibility Specialist
```javascript
Task({
  subagent_type: "general-purpose",
  description: "WCAG compliance audit",
  prompt: "You are the accessibility-specialist. Perform WCAG 2.1 AA compliance testing with automated tools and provide remediation steps."
});
```

## Frontend Department Invocations

### React Architect
```javascript
Task({
  subagent_type: "general-purpose",
  description: "React architecture review",
  prompt: "You are the react-architect specialist. Analyze component structure, state management, and provide performance optimization recommendations."
});
```

### Performance Engineer
```javascript
Task({
  subagent_type: "general-purpose",
  description: "Performance optimization",
  prompt: "You are the performance-engineer specialist. Run Lighthouse audits, analyze bundle size, and optimize Core Web Vitals."
});
```

## Backend Department Invocations

### API Architect
```javascript
Task({
  subagent_type: "general-purpose",
  description: "API design review",
  prompt: "You are the api-architect specialist. Review RESTful design patterns, validate OpenAPI documentation, and optimize response times."
});
```

### Security Engineer
```javascript
Task({
  subagent_type: "general-purpose",
  description: "Security vulnerability scan",
  prompt: "You are the security-engineer specialist. Perform OWASP Top 10 assessment and provide specific security remediation steps."
});
```

## Verification Methods

### 1. Check Agent Execution
Look for Task tool usage in responses:
```
[TASK_EXECUTION] Invoking general-purpose agent...
[SPECIALIST_OUTPUT] Design reviewer analysis complete...
```

### 2. Validate Specialist Identity
Ensure responses reference their specific department file:
```
"As the design-reviewer specialist from departments/design/agents/design-reviewer.md..."
```

### 3. Confirm Specialized Output
Verify output matches specialist expertise:
- Design reviewer provides screenshots + measurements
- Security engineer provides OWASP compliance report
- Performance engineer provides Lighthouse scores

## Integration Commands

All slash commands MUST use this pattern:

```bash
/design-visual-review src/components/Button.tsx
# → Invokes Task tool → design-reviewer specialist → Real output

/security-vulnerability-scan api/auth/
# → Invokes Task tool → security-engineer specialist → Real OWASP report

/react-architecture-review src/pages/Dashboard.tsx
# → Invokes Task tool → react-architect specialist → Real architecture analysis
```

This ensures you get actual specialist expertise, not Claude pretending!