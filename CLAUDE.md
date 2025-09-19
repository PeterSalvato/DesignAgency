# AI Development Agency - Claude Code Integration

This configuration enables comprehensive AI development workflows through self-discovering specialist architecture with built-in verification.

## Self-Discovering Architecture

The AI Development Agency automatically configures itself when Claude detects the `.claude-agency` folder in any project. No manual integration or setup required.

### Automatic Features
- **🔍 Agency Discovery**: Automatically detects and configures agency presence
- **🤖 Technology Detection**: Identifies React, TypeScript, Next.js, databases, and more
- **⚡ Specialist Loading**: Loads appropriate specialists based on detected tech stack
- **🛡️ Built-in Verification**: All specialists automatically run verification tools

## Available Specialists (Base Pack)

### 🎯 Project Manager
- **Role**: Project coordination and strategic oversight
- **Commands**: `/pm-status`, `/pm-planning`
- **Verification**: Git analysis, project health assessment, timeline validation

### 🔧 Technical Lead
- **Role**: Technical architecture and engineering leadership
- **Commands**: `/tech-review`, `/tech-architecture`
- **Verification**: Code quality analysis, architecture validation, technical debt assessment

### ⚛️ Frontend Specialist
- **Role**: Frontend development and user experience optimization
- **Commands**: `/frontend-review`, `/frontend-optimize`
- **Verification**: TypeScript compilation, linting, build success, component testing

### 🛡️ Backend Specialist
- **Role**: Backend development and API architecture
- **Commands**: `/backend-review`, `/backend-security`
- **Verification**: Security scanning, API testing, database validation

### 🧪 QA Engineer
- **Role**: Quality assurance and testing strategy
- **Commands**: `/qa-test-plan`, `/qa-coverage`
- **Verification**: Test execution, coverage analysis, automation validation

### 🎨 Design Specialist
- **Role**: Design validation and iterative improvement
- **Commands**: `/design-iterate`
- **Verification**: Screenshot comparison, accessibility audits, responsive testing

## Core Commands with Self-Verification

### Project Management
```bash
/pm-status [--detailed] [--focus=area]
# Automatically runs: git analysis, project structure review, velocity assessment
# Provides: Project health dashboard, development metrics, risk assessment

/pm-planning [--sprint-length=weeks] [--milestone=target]
# Automatically runs: backlog analysis, capacity planning, dependency mapping
# Provides: Sprint recommendations, milestone roadmap, resource allocation
```

### Technical Leadership
```bash
/tech-review [--component=path] [--focus=architecture|performance|security]
# Automatically runs: npm run lint, npm run typecheck, architecture analysis
# Provides: Technical health assessment, code quality metrics, refactoring roadmap

/tech-architecture [--new-feature=description] [--scale-concerns]
# Automatically runs: current architecture analysis, scalability assessment
# Provides: Architecture design, technology recommendations, implementation roadmap
```

### Frontend Development
```bash
/frontend-review [--component=path] [--focus=performance|accessibility|architecture]
# Automatically runs: npm run typecheck, npm run lint, npm run build, npm run test
# Provides: Component analysis, TypeScript validation, performance recommendations

/frontend-optimize [--target=lighthouse-score] [--analyze-bundle]
# Automatically runs: build analysis, bundle inspection, performance testing
# Provides: Optimization strategies, bundle analysis, Core Web Vitals improvements
```

### Backend Development
```bash
/backend-review [--endpoint=path] [--focus=security|performance|architecture]
# Automatically runs: npm audit, API testing, schema validation
# Provides: Architecture assessment, security analysis, performance recommendations

/backend-security [--scan-type=auth|api|database] [--owasp-check]
# Automatically runs: npm audit, OWASP scanning, authentication review
# Provides: Vulnerability assessment, security recommendations, compliance report
```

### Quality Assurance
```bash
/qa-test-plan [--feature=description] [--test-types=unit,integration,e2e]
# Automatically runs: npm run test, coverage analysis, framework validation
# Provides: Test strategy, automation recommendations, quality metrics

/qa-coverage [--threshold=percentage] [--report-format=html|json]
# Automatically runs: npm run test:coverage, gap analysis, trend evaluation
# Provides: Coverage report, improvement roadmap, quality dashboard
```

### Design Validation
```bash
/design-iterate <component-path> [--max-iterations=n] [--target-viewport=size]
# Automatically runs: npx playwright test, accessibility audits, screenshot comparison
# Provides: Visual validation, accessibility compliance, design improvements
```

## Self-Verification System

Every specialist command includes mandatory verification steps:

### Pre-Execution Checks
- **Environment Validation**: Verify project structure and dependencies
- **Tool Availability**: Check for required verification tools
- **Configuration Validation**: Ensure proper setup for specialist tasks

### Automated Tool Execution
- **TypeScript Compilation**: `npm run typecheck` for type safety
- **Code Quality**: `npm run lint` for standards compliance
- **Build Verification**: `npm run build` to ensure compilation success
- **Test Execution**: `npm run test` for functionality validation
- **Security Scanning**: `npm audit` for vulnerability detection
- **Visual Testing**: `npx playwright test` for design validation

### Post-Execution Validation
- **Result Analysis**: Verify all tools completed successfully
- **Error Resolution**: Diagnose and provide fixes for any failures
- **Evidence Collection**: Document verification results and metrics
- **Quality Gates**: Ensure minimum standards are met before proceeding

## Technology Detection

The agency automatically detects and adapts to your project's technology stack:

| Technology | Detection Method | Confidence | Specialist Impact |
|------------|------------------|------------|------------------|
| **React** | package.json deps, JSX files | 95% | Enhanced component analysis |
| **TypeScript** | tsconfig.json, .ts files | 95% | Type safety verification |
| **Next.js** | next.config.js, App Router | 90% | Framework-specific optimizations |
| **Tailwind CSS** | tailwind.config.js | 85% | Design system compliance |
| **Node.js** | package.json engines | 90% | Backend optimization focus |
| **PostgreSQL** | pg dependencies | 90% | Database-specific recommendations |
| **MongoDB** | mongoose deps | 90% | NoSQL optimization strategies |
| **Playwright** | playwright.config.js | 95% | Enhanced visual testing |

## Quality Standards Enforcement

### Mandatory Verification Requirements
- **Code Quality**: All code must pass linting and type checking
- **Build Success**: Projects must compile without errors
- **Test Coverage**: Minimum thresholds enforced for critical paths
- **Security Compliance**: Zero critical vulnerabilities allowed
- **Accessibility**: WCAG 2.1 AA compliance for user interfaces
- **Performance**: Optimizations validated through automated testing

### Verification Reporting
Every specialist provides:
- **Verification Results**: Detailed evidence of automated tool execution
- **Quality Metrics**: Quantified assessment of current state
- **Issue Identification**: Specific problems found and their severity
- **Resolution Guidance**: Step-by-step fixes for identified issues
- **Improvement Roadmap**: Prioritized recommendations for enhancement

## Architecture Benefits

### Automatic Integration
- **Zero Configuration**: No manual setup or integration scripts required
- **Immediate Availability**: Specialists ready upon agency detection
- **Technology Awareness**: Automatically adapts to your project's stack
- **Consistent Behavior**: Same experience across all projects

### Built-in Quality Assurance
- **Mandatory Verification**: Cannot skip quality checks
- **Comprehensive Evidence**: All recommendations backed by tool execution
- **Consistent Standards**: Same quality enforcement across all specialists
- **Automatic Error Handling**: Built-in diagnosis and resolution guidance

### Developer Experience
- **No Manual Prompting**: Tools run automatically without reminders
- **Real-time Validation**: Immediate feedback on code quality
- **Actionable Insights**: Specific, implementable recommendations
- **Progress Tracking**: Clear metrics and improvement measurement

## Project Structure

When the agency is active in your project:

```
your-project/
├── .claude-agency/              # Self-discovering agency
│   ├── manifest.json            # Agency configuration and status
│   ├── discovery.js             # Automatic detection logic
│   ├── detection.js             # Technology detection engine
│   ├── self-verification.js     # Verification system
│   ├── verify.js                # Agency validation tools
│   ├── commands/                # All specialist commands (11 total)
│   ├── specialists/             # Specialist definitions (5 core)
│   └── logs/                    # Discovery and verification logs
├── src/                         # Your application code
├── package.json                 # Your project configuration
└── README.md                    # Your project documentation
```

## Expansion Architecture

The system supports future expansion through:

### Tech Stack Packs
- **Dynamic Loading**: Automatically loaded based on detected technologies
- **Framework-Specific**: Specialized knowledge for React, Vue, Angular, etc.
- **Database-Optimized**: Tailored for PostgreSQL, MongoDB, Redis, etc.

### Initiative Packs
- **Domain-Specific**: E-commerce, mobile, AI integration, etc.
- **User-Selectable**: Choose additional specialists for specific projects
- **Custom Packs**: Organization-specific workflows and standards

### Verification Evolution
- **Tool Integration**: Support for new verification tools and frameworks
- **Custom Standards**: Organization-specific quality requirements
- **Progressive Enhancement**: Gradual improvement of verification capabilities

## Usage in Claude Code

The agency works seamlessly with Claude Code workflows:

1. **Automatic Discovery**: Claude detects the `.claude-agency` folder
2. **Specialist Availability**: All commands immediately available
3. **Verification Integration**: Tools run automatically during specialist execution
4. **Quality Enforcement**: Consistent standards across all interactions

This provides world-class development expertise with built-in quality assurance, eliminating the need for manual tool execution reminders while ensuring comprehensive verification of all recommendations.