# Backend Review Command

**Usage**: `/backend-review <endpoint-path> [options]`

Performs comprehensive backend development review focusing on API design, security, performance, and database integration.

## What This Command Does

1. **API Design Analysis**
   - Reviews RESTful API design principles
   - Validates request/response schemas
   - Checks error handling and status codes
   - Assesses API documentation completeness

2. **Security Assessment**
   - Reviews authentication and authorization logic
   - Validates input sanitization and validation
   - Checks for common vulnerabilities (OWASP Top 10)
   - Assesses secrets management and configuration

3. **Performance Optimization**
   - Analyzes database query efficiency
   - Reviews caching implementation
   - Checks for N+1 query patterns
   - Validates background job performance

4. **Database Integration Review**
   - Reviews ORM usage and query optimization
   - Validates transaction handling
   - Checks connection pooling configuration
   - Assesses migration safety and rollback plans

## Options

- `--security`: Focus on security vulnerabilities and best practices
- `--performance`: Emphasize performance optimization and bottlenecks
- `--api-design`: Deep dive into API design and documentation
- `--database`: Focus on database integration and queries

## Example Usage

```bash
# Full backend review
/backend-review src/api/users/route.ts

# Security-focused review
/backend-review src/auth/login.ts --security

# Performance analysis
/backend-review src/api/posts/route.ts --performance

# Database integration review
/backend-review src/models/User.ts --database
```

## Review Criteria

### API Design Standards
- RESTful endpoint design and naming
- Proper HTTP status code usage
- Consistent error response format
- API versioning and backward compatibility

### Security Requirements
- Input validation and sanitization
- Authentication and authorization implementation
- CORS, CSRF, and XSS protection
- Secrets management and environment security

### Performance Benchmarks
- Response time under 200ms for 95% of requests
- Efficient database query patterns
- Proper caching strategy implementation
- Background job optimization

### Database Best Practices
- Proper transaction boundary design
- Connection pooling configuration
- Query optimization and indexing
- Migration safety and testing

## Implementation

This command should:
1. Launch the backend-specialist agent
2. Analyze the specified API endpoint or service
3. Run security vulnerability scans
4. Check database query performance
5. Validate error handling and logging
6. Generate security and performance recommendations
7. Provide implementation examples for improvements