# AI Development Agency - Internal Symbol Index

**IMPORTANT**: This file documents the internal structure of the AI Development Agency system itself. When imported into a host project, specialists should reference the host project's `symbol-index.md` and `conventions.md` files to understand the target project's architecture and methodology.

## 🎯 Project Overview

**Purpose**: Complete AI development team that can be imported into any Claude Code project
**Architecture**: 30 specialists across 13 departments with comprehensive audit framework
**Integration**: Portable system using Claude Code agent and command files

## 📊 Functional Dependency Map

### Core System Components

#### 🏗️ Integration Layer
```
integrate-specialists.js
├── Reads: departments/*/agents/*.md (specialist definitions)
├── Generates: .claude/agents/*.md (Claude Code agent files)
├── Generates: .claude/commands/*.md (slash command implementations)
├── Dependencies: None (standalone script)
└── Output: Complete Claude Code integration
```

#### 🎯 Task Tool Invocation System
```
.claude/agents/{specialist}.md
├── References: departments/{dept}/agents/{specialist}.md
├── Invokes: Task tool with "general-purpose" subagent
├── Dependencies: Claude Code Task tool
└── Ensures: Real specialist execution (not Claude pretending)
```

### Department Structure & Dependencies

#### 🎨 Design Department (2 specialists)
```
departments/design/
├── agents/
│   ├── design-reviewer.md
│   │   ├── Function: Visual design validation, screenshots, design system compliance
│   │   ├── Tools: Playwright MCP, Read, Grep
│   │   ├── Dependencies: shared/config/tailwind.base.js, design context files
│   │   └── Success Criteria: 8px grid compliance, design token usage
│   └── accessibility-specialist.md
│       ├── Function: WCAG 2.1 AA compliance, inclusive design
│       ├── Tools: Accessibility testing tools, axe-core integration
│       ├── Dependencies: design-reviewer.md (cross-reference)
│       └── Success Criteria: 95%+ accessibility score
├── context/
│   ├── design_principles.md → Referenced by both specialists
│   ├── brand_guidelines.md → Referenced by both specialists
│   └── style_guide.md → Referenced by both specialists
└── commands/ (auto-generated)
```

#### ⚛️ Frontend Department (2 specialists)
```
departments/frontend/
├── agents/
│   ├── react-architect.md
│   │   ├── Function: Component architecture, state management, React patterns
│   │   ├── Tools: Read, Grep, code analysis
│   │   ├── Dependencies: design-reviewer.md (UI consistency)
│   │   └── Success Criteria: Scalable component architecture
│   └── performance-engineer.md
│       ├── Function: Core Web Vitals, bundle optimization, Lighthouse scores
│       ├── Tools: Lighthouse, bundle analysis, performance profiling
│       ├── Dependencies: react-architect.md (architecture impact)
│       └── Success Criteria: 90+ Lighthouse performance
└── context/
    └── react-standards.md → Referenced by both specialists
```

#### 🔧 Backend Department (2 specialists)
```
departments/backend/
├── agents/
│   ├── api-architect.md
│   │   ├── Function: RESTful design, OpenAPI documentation, response optimization
│   │   ├── Tools: API analysis, documentation validation
│   │   ├── Dependencies: security-engineer.md (security patterns)
│   │   └── Success Criteria: <200ms response times, proper REST patterns
│   └── security-engineer.md
│       ├── Function: OWASP Top 10, vulnerability assessment, auth security
│       ├── Tools: Security scanning, vulnerability assessment
│       ├── Dependencies: api-architect.md (API security), devops security-operations.md
│       └── Success Criteria: Zero critical vulnerabilities
└── context/
    └── api-standards.md → Referenced by both specialists
```

#### 🗃️ Database Department (2 specialists)
```
departments/database/
├── agents/
│   ├── schema-architect.md
│   │   ├── Function: Database design, relationships, normalization
│   │   ├── Tools: Schema analysis, relationship validation
│   │   ├── Dependencies: query-optimizer.md (performance impact)
│   │   └── Success Criteria: Properly normalized design, efficient relationships
│   └── query-optimizer.md
│       ├── Function: SQL performance, indexing, N+1 detection
│       ├── Tools: Query analysis, execution plan review
│       ├── Dependencies: schema-architect.md (schema design impact)
│       └── Success Criteria: <100ms query response times
└── No context files (self-contained domain knowledge)
```

#### ✍️ Content Department (2 specialists)
```
departments/content/
├── agents/
│   ├── copywriter.md
│   │   ├── Function: UI copy, microcopy, conversion optimization
│   │   ├── Tools: Content analysis, readability assessment
│   │   ├── Dependencies: accessibility-specialist.md (plain language)
│   │   └── Success Criteria: Grade 8 reading level, conversion improvements
│   └── brand-strategist.md
│       ├── Function: Brand voice, messaging strategy, consistency
│       ├── Tools: Brand analysis, voice validation
│       ├── Dependencies: copywriter.md (content implementation)
│       └── Success Criteria: Consistent brand voice, measurable recognition
└── No context files (brand context in design/context/)
```

#### 🧪 Testing Department (2 specialists)
```
departments/testing/
├── agents/
│   ├── test-engineer.md
│   │   ├── Function: Unit testing, TDD, test coverage
│   │   ├── Tools: Jest, Vitest, coverage analysis
│   │   ├── Dependencies: ALL development specialists (testing their output)
│   │   └── Success Criteria: 90%+ test coverage
│   └── qa-automation.md
│       ├── Function: Integration testing, E2E, visual regression
│       ├── Tools: Playwright, Cypress, screenshot comparison
│       ├── Dependencies: test-engineer.md (unit test foundation)
│       └── Success Criteria: 95%+ critical journey coverage
└── No context files (testing patterns are universal)
```

#### 👥 Management Department (5 specialists)
```
departments/management/
├── agents/
│   ├── project-coordinator.md
│   │   ├── Function: Cross-department coordination, conflict resolution
│   │   ├── Tools: Task orchestration, workflow management
│   │   ├── Dependencies: ALL departments (coordination layer)
│   │   └── Success Criteria: <24hr conflict resolution
│   ├── tech-lead.md
│   │   ├── Function: Architecture decisions, code review orchestration
│   │   ├── Tools: Code review, architecture validation
│   │   ├── Dependencies: ALL technical specialists (technical oversight)
│   │   └── Success Criteria: Consistent technical decisions
│   ├── methodology-specialist.md
│   │   ├── Function: Project methodology discovery and creation
│   │   ├── Tools: Codebase analysis, documentation generation
│   │   ├── Dependencies: ALL departments (methodology coordination)
│   │   └── Success Criteria: Complete project methodology documentation
│   ├── methodology-maintainer.md
│   │   ├── Function: Live methodology updates and synchronization
│   │   ├── Tools: Change detection, documentation automation
│   │   ├── Dependencies: methodology-specialist.md, ALL departments
│   │   └── Success Criteria: Always-current methodology files
│   └── audit-specialist.md
│       ├── Function: System auditing and oversight prevention
│       ├── Tools: Lifecycle analysis, temporal validation, user journey testing
│       ├── Dependencies: ALL departments (comprehensive validation)
│       └── Success Criteria: Zero critical architecture gaps, 100% system validation
├── commands/
│   ├── methodology-sync-update.md
│   ├── methodology-track-changes.md
│   ├── methodology-auto-update.md
│   └── audit-system-integration.md
├── AUDIT-FRAMEWORK.md (comprehensive system audit methodology)
└── No context files (management patterns are procedural)
```

#### 🚀 DevOps Department (4 specialists)
```
departments/devops/
├── agents/
│   ├── devops-engineer.md
│   │   ├── Function: CI/CD pipelines, deployment automation
│   │   ├── Tools: GitHub Actions, Docker, Kubernetes
│   │   ├── Dependencies: ALL development departments (deployment targets)
│   │   └── Success Criteria: <5min deployment, 99.9% success rate
│   ├── monitoring-specialist.md
│   │   ├── Function: APM, logging, alerting, incident response
│   │   ├── Tools: DataDog, Grafana, ELK stack
│   │   ├── Dependencies: devops-engineer.md (infrastructure)
│   │   └── Success Criteria: <5min MTTD, <15min MTTR
│   ├── security-operations.md
│   │   ├── Function: Infrastructure security, compliance, DevSecOps
│   │   ├── Tools: CSPM, vulnerability scanning, compliance automation
│   │   ├── Dependencies: backend security-engineer.md (app security)
│   │   └── Success Criteria: Zero critical vulnerabilities, 100% compliance
│   └── platform-engineer.md
│       ├── Function: Developer experience, internal tooling
│       ├── Tools: Internal APIs, service catalogs, developer portals
│       ├── Dependencies: devops-engineer.md (platform infrastructure)
│       └── Success Criteria: <30min onboarding, 95% developer satisfaction
└── No context files (DevOps practices are standardized)
```

#### 📊 Product Department (3 specialists)
```
departments/product/
├── agents/
│   ├── product-manager.md
│   │   ├── Function: Feature prioritization, roadmap planning
│   │   ├── Tools: RICE scoring, roadmap tools, stakeholder management
│   │   ├── Dependencies: ux-researcher.md (user insights), data-analyst.md (metrics)
│   │   └── Success Criteria: Clear roadmap, >90% stakeholder satisfaction
│   ├── ux-researcher.md
│   │   ├── Function: User validation, usability testing, behavioral insights
│   │   ├── Tools: User interviews, surveys, usability testing
│   │   ├── Dependencies: accessibility-specialist.md (inclusive design)
│   │   └── Success Criteria: >80% user satisfaction, statistically significant insights
│   └── data-analyst.md
│       ├── Function: Business intelligence, analytics, performance measurement
│       ├── Tools: Google Analytics, Mixpanel, BI dashboards
│       ├── Dependencies: ALL departments (analyzing their outputs)
│       └── Success Criteria: Real-time metrics, >95% data accuracy
└── No context files (product patterns are methodology-driven)
```

#### 🤖 AI/Data Department (2 specialists)
```
departments/ai-data/
├── agents/
│   ├── ai-engineer.md
│   │   ├── Function: LLM integration, AI workflow design, intelligent automation
│   │   ├── Tools: OpenAI, Anthropic, RAG implementation
│   │   ├── Dependencies: data-engineer.md (data infrastructure)
│   │   └── Success Criteria: <2s LLM response, >90% content quality
│   └── data-engineer.md
│       ├── Function: Data pipelines, analytics infrastructure, data quality
│       ├── Tools: ETL/ELT, Snowflake, BigQuery, data observability
│       ├── Dependencies: product data-analyst.md (analytics requirements)
│       └── Success Criteria: 99.9% pipeline reliability, <15min data freshness
└── No context files (AI/Data patterns are technology-specific)
```

#### 📱 Mobile Department (2 specialists)
```
departments/mobile/
├── agents/
│   ├── mobile-architect.md
│   │   ├── Function: React Native, cross-platform development
│   │   ├── Tools: React Native, Expo, app store deployment
│   │   ├── Dependencies: react-architect.md (shared patterns)
│   │   └── Success Criteria: <3s startup, 95% crash-free sessions
│   └── mobile-ui-specialist.md
│       ├── Function: Platform-specific design, touch interactions
│       ├── Tools: iOS/Android design guidelines, platform components
│       ├── Dependencies: design-reviewer.md (design consistency)
│       └── Success Criteria: Platform-native feel, >95% accessibility
└── No context files (mobile patterns are platform-specific)
```

#### 🛡️ Cybersecurity Department (1 specialist)
```
departments/cybersecurity/
├── agents/
│   └── cybersecurity-specialist.md
│       ├── Function: Penetration testing, threat modeling, incident forensics
│       ├── Tools: OWASP ZAP, Burp Suite, Metasploit, Wireshark
│       ├── Dependencies: security-engineer.md, security-operations.md
│       └── Success Criteria: Zero critical vulnerabilities, complete threat coverage
├── commands/
│   ├── cyber-pentest.md
│   ├── cyber-threat-model.md
│   └── cyber-incident-forensics.md
└── No context files (security testing patterns are engagement-specific)
```

#### 🎨 CSS Department (1 specialist)
```
departments/css/
├── agents/
│   └── css-specialist.md
│       ├── Function: Advanced styling, animations, responsive design
│       ├── Tools: SCSS, PostCSS, animation libraries
│       ├── Dependencies: design-reviewer.md (design system), performance-engineer.md (performance impact)
│       └── Success Criteria: Design system compliance, optimized animations
└── No context files (CSS patterns are in shared/config/)
```

## 🔗 Cross-Department Dependencies

### High-Coupling Relationships
```
design-reviewer.md
├── Influences: css-specialist.md (design system implementation)
├── Influences: accessibility-specialist.md (visual accessibility)
├── Referenced by: mobile-ui-specialist.md (design consistency)
└── Referenced by: frontend react-architect.md (UI patterns)

security-engineer.md (backend)
├── Collaborates: security-operations.md (devops)
├── Influences: api-architect.md (secure API design)
└── Referenced by: ALL departments (security requirements)

project-coordinator.md (management)
├── Orchestrates: ALL departments
├── Resolves conflicts between: ANY specialist pairs
└── Dependencies: Complete system knowledge
```

### Integration Workflows
```
parallel-full-review (6 specialists)
├── design-reviewer.md
├── accessibility-specialist.md
├── react-architect.md
├── security-engineer.md
├── performance-engineer.md
└── test-engineer.md

parallel-deployment-readiness (7 specialists)
├── devops-engineer.md
├── security-operations.md
├── monitoring-specialist.md
├── qa-automation.md
├── performance-engineer.md
├── schema-architect.md
└── api-architect.md
```

## 🎯 Command Mapping

### Auto-Generated Commands
```
/{department}-{specialist-action}
├── Source: integrate-specialists.js
├── Target: .claude/commands/{department}-{specialist}.md
├── Invokes: Task tool → departments/{dept}/agents/{specialist}.md
└── Pattern: Real specialist execution
```

### Parallel Commands
```
/parallel-full-review
├── Invokes: 6 specialists simultaneously
├── Dependencies: Task tool parallel execution
└── Performance: 3-4x faster than sequential

/parallel-deployment-readiness
├── Invokes: 7 specialists simultaneously
├── Dependencies: All deployment-critical specialists
└── Output: Go/No-Go deployment decision
```

### Help System
```
/help
├── Source: .claude/commands/help.md
├── Navigation: Department → Specialist → Command
└── Context: getting-started.md workflows

/getting-started
├── Source: .claude/commands/getting-started.md
├── Workflows: design, development, deployment, testing
└── Target: New user onboarding
```

## 📋 Configuration Dependencies

### Shared Configurations
```
shared/config/
├── tailwind.base.js
│   ├── Used by: css-specialist.md, design-reviewer.md
│   ├── Defines: 8px grid system, semantic colors, design tokens
│   └── Dependencies: None (base configuration)
└── playwright.config.ts (in project/)
    ├── Used by: qa-automation.md, design-reviewer.md
    ├── Defines: Browser testing, screenshot capture
    └── Dependencies: @playwright/test, @axe-core/playwright
```

### Context Files
```
departments/design/context/
├── design_principles.md → design-reviewer.md, accessibility-specialist.md
├── brand_guidelines.md → brand-strategist.md, copywriter.md
└── style_guide.md → css-specialist.md, design-reviewer.md

departments/frontend/context/
└── react-standards.md → react-architect.md, performance-engineer.md

departments/backend/context/
└── api-standards.md → api-architect.md, security-engineer.md
```

## 🔄 Integration Points

### Claude Code Integration
```
.claude/ (auto-generated by integrate-specialists.js)
├── agents/ (26 files)
│   ├── Pattern: {specialist-name}.md
│   ├── Content: Task tool invocation instructions
│   └── Reference: departments/{dept}/agents/{specialist}.md
├── commands/ (30+ files)
│   ├── Pattern: {department}-{action}.md
│   ├── Content: Slash command implementations
│   └── Invokes: Corresponding agent file
└── Meta files:
    ├── specialist-invocation.md (Task tool patterns)
    └── verification.md (Real specialist validation)
```

### External Tool Dependencies
```
Required Tools:
├── Claude Code (host system)
├── Task tool (specialist invocation)
├── Playwright MCP (screenshot capture)
├── Axe-core (accessibility testing)
├── Node.js 18+ (integration scripts)
└── Git (version control)

Optional Tools:
├── Docker (containerization - devops)
├── Kubernetes (orchestration - devops)
├── Monitoring tools (observability - monitoring)
└── Analytics platforms (measurement - data-analyst)
```

## 📊 Quality Gates & Success Metrics

### Department Success Criteria Matrix
```
Design: 95%+ accessibility, design system compliance
Frontend: 90+ Lighthouse score, optimized bundle size
Backend: <200ms API response, zero critical vulnerabilities
CSS: Design system compliance, GPU-optimized animations
Database: <100ms queries, properly normalized schema
Content: Grade 8 reading level, conversion improvements
Testing: 90%+ coverage, 95%+ critical journey coverage
Management: <24hr conflict resolution, quality gate enforcement
DevOps: <5min deployment, 99.9% reliability
Product: Clear roadmap, >90% stakeholder satisfaction
AI/Data: <2s LLM response, 99.9% pipeline reliability
Mobile: <3s startup, platform-native experience
```

### Cross-Department Quality Gates
```
Feature Completion Requirements:
├── Design: Visual review + accessibility audit complete
├── Frontend: Architecture review + performance audit complete
├── Backend: API review + security scan complete
├── Testing: Unit tests + E2E tests complete
├── DevOps: Deployment readiness validated
└── Management: All quality gates passed
```

This symbol index serves as the definitive map of all functionality, dependencies, and relationships within the AI Development Agency system. It ensures complete understanding of how the 26 specialists work together to provide comprehensive development capability.