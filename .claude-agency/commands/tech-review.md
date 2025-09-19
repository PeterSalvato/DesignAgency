# Technical Architecture Review

Provides comprehensive technical architecture analysis, code quality assessment, and engineering best practices evaluation.

## Usage
```bash
/tech-review [--component=path] [--focus=architecture|performance|security]
```

## Options
- `--component=path`: Focus review on specific component or module
- `--focus=area`: Concentrate on specific area (architecture, performance, security)

## Description
This command invokes the Technical Lead specialist to perform deep technical analysis of the codebase, architecture patterns, and engineering practices.

## Implementation

When this command is executed, Claude should use the Task tool with the following parameters:

```
subagent_type: "general-purpose"
description: "Technical architecture and code review"
prompt: "You are a Technical Lead specialist for an AI Development Agency. Perform a comprehensive technical architecture review.

REVIEW SCOPE:
1. **Architecture Analysis**: Evaluate system architecture, design patterns, and component organization
2. **Code Quality Assessment**: Review code standards, maintainability, and engineering best practices
3. **Technical Debt Evaluation**: Identify technical debt, refactoring opportunities, and quality issues
4. **Performance Analysis**: Assess performance characteristics and optimization opportunities
5. **Security Review**: Evaluate security practices and potential vulnerabilities
6. **Scalability Assessment**: Review architecture for scalability and future growth

DELIVERABLES:
- Technical health assessment with severity ratings
- Architecture strengths and improvement areas
- Code quality metrics and recommendations
- Technical debt prioritization matrix
- Performance optimization opportunities
- Security vulnerability assessment
- Refactoring and improvement roadmap

REVIEW METHODOLOGY:
- Analyze codebase structure and architectural patterns
- Review dependency management and integration patterns
- Evaluate error handling and logging practices
- Assess testing coverage and quality assurance practices
- Review documentation and maintainability aspects

Provide specific technical recommendations with implementation priorities and effort estimates."
```

## Expected Output
- Technical health dashboard with key metrics
- Architecture assessment with strength/weakness analysis
- Code quality recommendations with priority levels
- Technical debt remediation roadmap
- Performance optimization strategies
- Security assessment and recommendations