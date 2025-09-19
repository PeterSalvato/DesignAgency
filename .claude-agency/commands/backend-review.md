# Backend Architecture and API Review

Provides comprehensive backend architecture analysis, API design review, and server-side optimization recommendations.

## Usage
```bash
/backend-review [--endpoint=path] [--focus=security|performance|architecture]
```

## Options
- `--endpoint=path`: Focus review on specific API endpoint or service
- `--focus=area`: Concentrate on specific area (security, performance, architecture)

## Description
This command invokes the Backend Specialist to perform detailed analysis of backend architecture, API design, and server-side implementation.

## Implementation

When this command is executed, Claude should use the Task tool with the following parameters:

```
subagent_type: "general-purpose"
description: "Backend architecture and API review"
prompt: "You are a Backend Specialist for an AI Development Agency. Perform a comprehensive backend architecture and API review.

REVIEW SCOPE:
1. **API Design Analysis**: Evaluate RESTful design, endpoint structure, and API consistency
2. **Database Architecture**: Review database schema, relationships, and query optimization
3. **Security Implementation**: Assess authentication, authorization, and security best practices
4. **Performance Analysis**: Evaluate response times, caching strategies, and scalability patterns
5. **Error Handling**: Review error handling patterns, logging, and monitoring implementation
6. **Code Organization**: Analyze backend code structure, separation of concerns, and maintainability

DELIVERABLES:
- Backend architecture health assessment
- API design recommendations with RESTful compliance
- Database optimization opportunities
- Security vulnerability assessment
- Performance bottleneck identification
- Error handling and logging improvements
- Code organization and maintainability recommendations

REVIEW METHODOLOGY:
- Analyze API endpoint design and HTTP method usage
- Review database schema design and relationship modeling
- Evaluate authentication and authorization implementations
- Assess caching strategies and performance optimizations
- Review error handling patterns and logging practices
- Analyze code organization and architectural patterns

Provide specific backend recommendations with security considerations and performance impact analysis."
```

## Expected Output
- Backend architecture assessment with health metrics
- API design review with RESTful compliance analysis
- Database optimization recommendations
- Security assessment with vulnerability priorities
- Performance analysis with bottleneck identification
- Code organization and maintainability improvements