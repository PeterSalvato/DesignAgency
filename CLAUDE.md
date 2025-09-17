# AI Development Agency - Claude Code Integration

This configuration enables comprehensive AI development workflows through specialist departments.

## Available Specialists

### 🎨 Design Department
- **Visual Reviewer**: Screenshot-based design validation across viewports
- **Accessibility Expert**: WCAG 2.1 AA compliance testing and remediation
- **Design System Enforcer**: Design token and pattern compliance validation

### ⚛️ Frontend Department
- **React Specialist**: Component architecture and performance optimization
- **TypeScript Expert**: Type safety and advanced typing patterns
- **Performance Engineer**: Bundle optimization and Core Web Vitals

### 🔧 Backend Department
- **API Architect**: RESTful design, security, and documentation
- **Security Engineer**: Vulnerability assessment and penetration testing
- **Database Optimizer**: Query performance and N+1 detection

### 🎨 CSS Department
- **SCSS Architect**: Advanced styling organization and performance
- **Animation Engineer**: GPU-optimized animations and interactions
- **Responsive Expert**: Mobile-first design and container queries

### 🗃️ Database Department
- **Schema Architect**: Normalized design and relationship optimization
- **Query Optimizer**: SQL performance tuning and indexing

### ✍️ Content Department
- **Copywriter**: User-centered copy and conversion optimization
- **Brand Strategist**: Voice, messaging, and brand consistency

### 🧪 Testing Department
- **Test Engineer**: Unit testing, TDD, and test coverage
- **QA Automation**: Integration testing and E2E validation

### 👥 Management Department
- **Project Coordinator**: Cross-department coordination and conflict resolution
- **Tech Lead**: Architecture decisions and code review orchestration

### 🚀 DevOps Department
- **DevOps Engineer**: CI/CD pipelines and deployment automation
- **Monitoring Specialist**: Application monitoring and alerting systems
- **Security Operations**: Infrastructure security and compliance
- **Platform Engineer**: Developer experience and internal tooling

### 📊 Product Department
- **Product Manager**: Feature prioritization and roadmap planning
- **UX Researcher**: User validation and usability testing
- **Data Analyst**: Business intelligence and analytics

### 🤖 AI/Data Department
- **AI Engineer**: LLM integration and AI workflow design
- **Data Engineer**: Data pipelines and analytics infrastructure

### 📱 Mobile Department
- **Mobile Architect**: React Native and cross-platform development
- **Mobile UI Specialist**: Platform-specific design and touch interactions

## Workflow Commands

### Design Workflows
```bash
/design-visual-review [--component=<path>] [--viewport=<size>]
/design-iterate <component-path> [--max-iterations=<n>]
/design-accessibility-audit [--wcag-level=AA]
/design-screenshot-compare [--baseline=<path>]
```

### Frontend Workflows
```bash
/frontend-review <component-path> [--focus=performance|typescript|architecture]
/frontend-performance-audit [--bundle-analysis] [--lighthouse]
/frontend-typescript-audit <file-path> [--strict-mode]
/frontend-component-analyze <component-path> [--composition-analysis]
```

### Backend Workflows
```bash
/backend-api-review <endpoint-path> [--security] [--performance]
/backend-security-audit [--owasp] [--penetration-test]
/backend-performance-audit [--database] [--caching]
/backend-integration-test <endpoint-path> [--load-test]
```

### CSS Workflows
```bash
/css-review <stylesheet-path> [--architecture] [--performance]
/css-animation-audit <component-path> [--gpu-optimization]
/css-responsive-audit [--mobile-first] [--container-queries]
/css-optimize <stylesheet-path> [--critical-css]
```

### Database Workflows
```bash
/sql-schema-review <schema-path> [--normalization] [--relationships]
/sql-query-optimize <query-file> [--execution-plan] [--indexing]
/sql-migration-review <migration-path> [--safety-check] [--rollback]
/sql-performance-audit [--slow-queries] [--connection-pool]
```

### Content Workflows
```bash
/content-ui-copy-review <component-path> [--microcopy] [--accessibility]
/content-cta-optimization <page-path> [--conversion-analysis] [--ab-test]
/content-brand-voice-audit <content-path> [--tone-consistency]
/content-messaging-review <campaign-path> [--value-proposition]
```

### Testing Workflows
```bash
/test-unit-coverage <component-path> [--tdd] [--coverage-threshold]
/test-integration-suite <endpoint-path> [--database] [--api]
/test-e2e-flow <user-journey> [--mobile] [--accessibility]
/test-regression-audit [--visual] [--performance] [--smoke]
```

### Management Workflows
```bash
/manage-cross-department-review <feature> [--all-specialists] [--prioritize]
/manage-conflict-resolution <issue> [--technical] [--design] [--performance]
/manage-workflow-optimization <project> [--bottlenecks] [--dependencies]
/manage-quality-gates <release> [--security] [--performance] [--accessibility]
```

### DevOps Workflows
```bash
/devops-ci-cd-setup <repository> [--github-actions] [--docker] [--kubernetes]
/devops-monitoring-setup <application> [--apm] [--alerting] [--dashboards]
/devops-infrastructure-audit <terraform> [--security] [--cost-optimization]
/devops-deployment-strategy <service> [--blue-green] [--canary] [--rollback]
```

### Product Workflows
```bash
/product-feature-prioritization <backlog> [--rice-scoring] [--user-impact]
/product-market-analysis <competitors> [--positioning] [--differentiation]
/ux-user-research-plan <feature> [--interviews] [--usability-testing]
/analytics-implementation <platform> [--conversion-tracking] [--cohort-analysis]
```

### AI/Data Workflows
```bash
/ai-llm-integration <application> [--openai] [--anthropic] [--prompt-optimization]
/ai-workflow-design <process> [--automation] [--multi-agent] [--rag]
/data-pipeline-setup <sources> [--etl] [--real-time] [--quality-monitoring]
/data-analytics-platform <warehouse> [--dashboards] [--self-service]
```

### Mobile Workflows
```bash
/mobile-architecture-review <app> [--react-native] [--performance] [--security]
/mobile-ui-design-review <interface> [--ios-guidelines] [--material-design]
/mobile-deployment-setup <platform> [--app-store] [--play-store] [--ci-cd]
/mobile-testing-strategy <devices> [--compatibility] [--performance]
```

## Development Standards

### Code Quality Requirements
- **TypeScript Strict Mode**: 95%+ type coverage required
- **Test Coverage**: 90%+ for critical business logic
- **Accessibility**: WCAG 2.1 AA compliance mandatory
- **Performance**: 90+ Lighthouse score required
- **Security**: Zero critical vulnerabilities allowed

### Design System Standards
- **8px Grid System**: All spacing must be multiples of 8px
- **Design Tokens**: Use semantic color and spacing variables
- **Component Consistency**: Reuse patterns before creating new ones
- **Responsive Design**: Mobile-first approach required

### API Standards
- **RESTful Design**: Resource-based URLs, proper HTTP methods
- **Security**: JWT authentication, input validation, rate limiting
- **Documentation**: OpenAPI/Swagger documentation required
- **Error Handling**: Consistent error response format

### Database Standards
- **Schema Design**: Proper normalization and relationships
- **Query Performance**: <100ms response time for 95% of queries
- **Migration Safety**: Rollback plans and testing required
- **Connection Management**: Proper pooling and resource cleanup

## Integration Architecture

After integration, your project structure includes:

```
your-project/
├── ai-agency/departments/
│   ├── design/          # Visual development specialists
│   ├── frontend/        # React/Next.js specialists
│   ├── backend/         # API/security specialists
│   ├── css/            # CSS/animation specialists
│   ├── database/       # SQL/schema specialists
│   ├── content/        # Copy and brand specialists
│   ├── testing/        # QA and testing specialists
│   ├── management/     # Coordination and leadership
│   ├── devops/         # CI/CD and infrastructure specialists
│   ├── product/        # Product strategy and UX specialists
│   ├── ai-data/        # AI engineering and data specialists
│   └── mobile/         # Mobile development specialists
│
├── .claude/
│   ├── agents/         # All specialists available
│   └── commands/       # All workflows available
│
└── shared/
    ├── config/         # Shared configurations (Tailwind, Playwright)
    └── utils/          # Cross-department utilities
```

## Success Metrics

Projects using the AI Development Agency achieve:
- **95%+ Accessibility Score** through automated WCAG testing
- **90+ Lighthouse Performance** through frontend optimization
- **<200ms API Response Times** through backend optimization
- **Zero Critical Vulnerabilities** through security scanning
- **Design System Compliance** through automated validation
- **90%+ Test Coverage** through comprehensive testing strategies

This agency provides world-class development expertise across all aspects of modern web application development while maintaining consistency and quality standards.