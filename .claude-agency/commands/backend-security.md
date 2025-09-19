# Backend Security Analysis

Provides comprehensive security vulnerability assessment, authentication review, and security best practices implementation guidance.

## Usage
```bash
/backend-security [--scan-type=auth|api|database] [--owasp-check]
```

## Options
- `--scan-type=area`: Focus security scan on specific area (auth, api, database)
- `--owasp-check`: Include OWASP Top 10 vulnerability assessment

## Description
This command invokes the Backend Specialist to perform detailed security analysis of backend systems, authentication mechanisms, and data protection implementations.

## Implementation

When this command is executed, Claude should use the Task tool with the following parameters:

```
subagent_type: "general-purpose"
description: "Backend security analysis and vulnerability assessment"
prompt: "You are a Backend Specialist for an AI Development Agency. Perform a comprehensive backend security analysis and vulnerability assessment.

SECURITY SCOPE:
1. **Authentication Analysis**: Review authentication mechanisms, session management, and credential handling
2. **Authorization Assessment**: Evaluate authorization patterns, role-based access control, and permission systems
3. **API Security**: Analyze API security implementation, input validation, and rate limiting
4. **Data Protection**: Review data encryption, sensitive data handling, and privacy compliance
5. **OWASP Compliance**: Assess against OWASP Top 10 vulnerabilities and security best practices
6. **Infrastructure Security**: Evaluate server configuration, environment security, and deployment practices

DELIVERABLES:
- Security vulnerability assessment with severity ratings
- Authentication and authorization recommendations
- API security improvement plan
- Data protection and encryption recommendations
- OWASP compliance report with remediation steps
- Security implementation roadmap with priorities

SECURITY METHODOLOGY:
- Analyze authentication flows and session management
- Review input validation and sanitization practices
- Evaluate SQL injection and XSS prevention measures
- Assess data encryption and secure communication
- Review environment variable and secret management
- Analyze error handling to prevent information disclosure

Provide specific security recommendations with implementation guidance and risk assessments."
```

## Expected Output
- Security vulnerability dashboard with risk ratings
- Authentication and authorization security analysis
- API security assessment with specific vulnerabilities
- Data protection and encryption recommendations
- OWASP compliance report with remediation priorities
- Security implementation roadmap with effort estimates