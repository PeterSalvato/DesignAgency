# 🏢 AI Development Agency

**Import an entire AI development team into any Claude Code project.**

The agency adapts to your existing project methodology by reading your `conventions.md` and `symbol-index.md` files to understand your specific standards, naming conventions, and architectural patterns.

## 🚀 Quick Start

```bash
# In your Claude Code project:
git clone https://github.com/username/ai-dev-agency ./ai-agency
cd ai-agency && npm run integrate
```

Your project now has a complete AI development team with **27 focused specialists**:
- 🎨 **Design**: Visual reviewer, accessibility specialist
- ⚛️ **Frontend**: React architect, performance engineer
- 🔧 **Backend**: API architect, security engineer
- 🎨 **CSS**: Advanced styling specialist
- 🗃️ **Database**: Schema architect, query optimizer
- ✍️ **Content**: Copywriter, brand strategist
- 🧪 **Testing**: Test engineer, QA automation
- 👥 **Management**: Project coordinator, tech lead, methodology specialist
- 🚀 **DevOps**: DevOps engineer, monitoring specialist, security operations, platform engineer
- 📊 **Product**: Product manager, UX researcher, data analyst
- 🤖 **AI/Data**: AI engineer, data engineer
- 📱 **Mobile**: Mobile architect, mobile UI specialist

## 🎯 Available Commands

After integration, you'll have access to:

```bash
# Design Team
/design-visual-review              # Visual design review with screenshots
/design-accessibility-audit        # WCAG 2.1 AA compliance testing
/design-iterate <component>        # AI-powered design improvement

# Frontend Team
/react-architecture-review         # Component design and state management
/performance-core-vitals           # Bundle optimization and Core Web Vitals
/react-performance-audit           # React-specific performance optimization

# Backend Team
/api-design-review <endpoint>      # RESTful API architecture and documentation
/security-vulnerability-scan       # OWASP Top 10 and security assessment
/api-security-audit               # Authentication and authorization review

# CSS Team
/css-architecture-review           # CSS/SCSS organization and performance
/css-animation-audit              # GPU-optimized animations
/css-responsive-audit             # Mobile-first responsive design

# Database Team
/schema-design-review <schema>     # Database design and relationships
/query-performance-audit          # SQL optimization and indexing
/migration-safety-review          # Migration planning and rollback

# Content Team
/content-ui-copy-review <component>        # Interface copy optimization
/content-cta-optimization <page>           # Call-to-action improvement
/content-brand-voice-audit <content>       # Voice and tone validation
/content-messaging-review <campaign>       # Brand strategy assessment

# Testing Team
/test-unit-coverage <component>            # Unit test coverage analysis
/test-integration-suite <endpoint>         # API integration testing
/test-e2e-flow <user-journey>             # End-to-end test automation
/test-regression-audit                     # Visual and performance regression

# Management Team
/manage-cross-department-review <feature>  # Coordinate multi-team review
/manage-conflict-resolution <issue>        # Arbitrate technical disagreements
/manage-workflow-optimization <project>    # Optimize team collaboration
/manage-quality-gates <release>            # Enforce standards across departments

# DevOps Team
/devops-ci-cd-setup <repository>           # CI/CD pipeline implementation
/devops-container-optimize <application>   # Docker optimization and security
/devops-infrastructure-review <terraform>  # Infrastructure as Code audit
/devops-deployment-strategy <service>      # Blue/green and canary deployments

# Product Team
/product-feature-prioritization <backlog>  # Feature scoring and roadmap planning
/product-market-analysis <competitors>     # Competitive landscape analysis
/product-metrics-dashboard <analytics>     # Product KPI tracking setup
/ux-user-research-plan <feature>          # User research methodology design

# AI/Data Team
/ai-llm-integration <application>          # LLM integration and optimization
/ai-prompt-optimization <prompts>          # Prompt engineering and testing
/data-pipeline-design <sources>            # Data pipeline architecture
/data-quality-audit <datasets>            # Data quality assessment

# Mobile Team
/mobile-architecture-review <app>          # Mobile app architecture analysis
/mobile-performance-optimization <app>     # Mobile performance tuning
/mobile-ui-platform-review <design>       # Platform design guideline compliance
/mobile-deployment-strategy <platform>     # App store deployment planning
```

## 📁 What Gets Integrated

```
your-project/
├── ai-agency/                     # The complete development team
│   └── departments/               # All specialist departments
│       ├── design/               # Visual development specialists
│       ├── frontend/             # React/Next.js specialists
│       ├── backend/              # API/security specialists
│       ├── css/                  # CSS/animation specialists
│       ├── database/             # SQL/schema specialists
│       ├── content/              # Copy and brand specialists
│       ├── testing/              # QA and testing specialists
│       ├── management/           # Coordination and leadership
│       ├── devops/               # CI/CD and infrastructure specialists
│       ├── product/              # Product strategy and UX specialists
│       ├── ai-data/              # AI engineering and data specialists
│       └── mobile/               # Mobile development specialists
│
├── .claude/
│   ├── agents/                   # All specialists linked here
│   └── commands/                 # All workflows available here
│
├── package.json                  # Enhanced with agency scripts
├── CLAUDE.md                     # Extended with agency workflows
└── tailwind.config.js            # Extended with design system
```

## 🔄 Workflow Examples

### Design Review & Iteration
```bash
/design-visual-review              # Comprehensive visual analysis
# → AI reviews design across mobile, tablet, desktop
# → Checks accessibility compliance
# → Validates design system adherence
# → Provides specific improvement recommendations

/design-iterate src/components/Button.tsx
# → AI makes improvements based on design principles
# → Tests changes visually
# → Iterates until optimal
```

### Frontend Optimization
```bash
/frontend-review src/components/Dashboard.tsx
# → Reviews React patterns and performance
# → Checks TypeScript usage
# → Identifies optimization opportunities
# → Provides code examples for improvements
```

### Backend Security & Performance
```bash
/backend-security-audit
# → Scans for vulnerabilities (OWASP Top 10)
# → Reviews authentication/authorization
# → Checks input validation
# → Provides security recommendations

/backend-performance-audit
# → Analyzes API response times
# → Reviews database query efficiency
# → Checks caching strategies
# → Identifies bottlenecks
```

### Content Optimization & Brand Strategy
```bash
/content-ui-copy-review src/components/ContactForm.tsx
# → Reviews microcopy for clarity and accessibility
# → Optimizes error messages and helper text
# → Ensures Grade 8 reading level compliance
# → Provides conversion-focused improvements

/content-brand-voice-audit src/pages/marketing/
# → Validates voice and tone consistency
# → Checks brand guideline compliance
# → Assesses emotional resonance
# → Provides messaging refinements
```

### Testing & Quality Assurance
```bash
/test-unit-coverage src/components/PaymentForm.tsx
# → Implements TDD workflow for payment logic
# → Achieves 90%+ test coverage for critical paths
# → Creates mocks for external payment APIs
# → Validates edge cases and error handling

/test-e2e-flow "user-checkout-flow"
# → Automates complete purchase journey testing
# → Tests across mobile, tablet, and desktop
# → Validates accessibility compliance (WCAG 2.1 AA)
# → Prevents regressions with visual comparisons
```

### Management & Coordination
```bash
/manage-conflict-resolution "performance-vs-accessibility"
# → Frontend wants lazy loading, Accessibility needs immediate content
# → Reviews both perspectives and requirements
# → Proposes progressive enhancement solution
# → Ensures both performance and WCAG compliance

/manage-cross-department-review "new-search-feature"
# → Coordinates design, frontend, backend, and testing specialists
# → Identifies dependencies and potential conflicts early
# → Ensures consistent implementation across all layers
# → Validates feature meets all quality gates before completion
```

## 🎨 Design System Integration

The agency includes a comprehensive design system:

```css
/* 8px Grid System */
p-2, p-4, p-6, p-8              /* 8px, 16px, 24px, 32px */

/* Semantic Colors */
bg-primary-500                  /* Brand color */
bg-success-500, bg-warning-500  /* Status colors */
text-neutral-900               /* Primary text */

/* Typography Scale */
heading-1, heading-2, heading-3 /* 48px, 32px, 24px */
body-text                      /* 16px content */

/* Components */
btn-primary, btn-secondary     /* Button styles */
card, card-hover              /* Card layouts */
```

## ⚙️ Technical Requirements

- **Claude Code** installed and configured
- **Node.js** 18+ for integration script
- **Host project** with `conventions.md` and `symbol-index.md` files (recommended for optimal integration)

## 🔗 Host Project Integration

The AI Development Agency automatically adapts to your existing project through an intelligent methodology discovery workflow:

### **Methodology Discovery Workflow**
1. **Search for existing methodology**: Checks for `conventions.md` and `symbol-index.md` in root, docs/, .github/, etc.
2. **Prompt for location**: If not found, asks user if methodology files exist elsewhere
3. **Analyze and create**: If files don't exist, offers to analyze your project and create them
4. **Adapt to standards**: All specialists use discovered/created methodology for project-aligned recommendations

### **Quick Setup**
```bash
# Automatic methodology discovery and setup
/setup-project-methodology

# Force create new methodology from project analysis
/setup-project-methodology --force-create
```

**Result**: All 27 specialists understand and follow your project's specific conventions, architectural patterns, and quality standards.

## 🔄 Keeping Updated

```bash
# Get latest improvements
cd ai-agency
git pull origin main
npm run integrate  # Re-apply latest changes
```

## 🎯 Success Metrics

After integration, your project will achieve:
- **95%+ accessibility score** (automated WCAG testing)
- **90+ Lighthouse performance** (frontend optimization)
- **<200ms API response times** (backend optimization)
- **Zero critical vulnerabilities** (security scanning)
- **Design system compliance** (visual consistency)

---

**Transform any Claude Code project into a design and development powerhouse with AI specialists working across your entire stack.** 🚀