# /help Command

## Usage
```bash
/help [department] [specialist] [--examples] [--quick]
```

## Implementation
This command provides guided help for the AI Development Agency:

```javascript
export async function execute(args) {
  const department = args.department;
  const specialist = args.specialist;
  const showExamples = args.examples;
  const quickMode = args.quick;

  if (quickMode) {
    return showQuickReference();
  }

  if (department && specialist) {
    return showSpecialistHelp(department, specialist, showExamples);
  }

  if (department) {
    return showDepartmentHelp(department, showExamples);
  }

  return showOverview();
}

function showQuickReference() {
  return `# 🚀 Quick Reference - AI Development Agency

## 🎯 Most Common Commands
\`\`\`bash
# Design & UX
/design-visual-review src/components/Button.tsx
/accessibility-audit src/pages/checkout/

# Development
/react-architecture-review src/pages/Dashboard.tsx
/api-design-review api/auth/login
/security-vulnerability-scan api/

# Quality & Testing
/test-unit-coverage src/utils/payment.ts
/qa-e2e-flow "user-checkout-journey"

# Deployment
/devops-deployment-readiness v2.1.0
/parallel-full-review src/features/search/
\`\`\`

## 📚 Get More Help
\`\`\`bash
/help design              # Show design department
/help devops security     # Show security-operations specialist
/help --examples          # Show command examples
/help frontend react      # Show react-architect details
\`\`\`

🎯 **26 specialists across 12 departments ready to help!**`;
}

function showOverview() {
  return `# 🏢 AI Development Agency - Complete Help Guide

## 📋 Department Overview (26 specialists total)

### 🎨 **Design (2 specialists)**
- \`design-reviewer\`: Visual design validation, screenshots, design system
- \`accessibility-specialist\`: WCAG 2.1 AA compliance, inclusive design

### ⚛️ **Frontend (2 specialists)**
- \`react-architect\`: Component architecture, state management
- \`performance-engineer\`: Core Web Vitals, bundle optimization

### 🔧 **Backend (2 specialists)**
- \`api-architect\`: RESTful design, OpenAPI documentation
- \`security-engineer\`: OWASP Top 10, vulnerability assessment

### 🎨 **CSS (1 specialist)**
- \`css-specialist\`: Advanced styling, animations, responsive design

### 🗃️ **Database (2 specialists)**
- \`schema-architect\`: Database design, relationships, normalization
- \`query-optimizer\`: SQL performance, indexing, N+1 detection

### ✍️ **Content (2 specialists)**
- \`copywriter\`: UI copy, microcopy, conversion optimization
- \`brand-strategist\`: Brand voice, messaging strategy

### 🧪 **Testing (2 specialists)**
- \`test-engineer\`: Unit testing, TDD, test coverage
- \`qa-automation\`: Integration testing, E2E, visual regression

### 👥 **Management (2 specialists)**
- \`project-coordinator\`: Cross-department coordination, conflict resolution
- \`tech-lead\`: Architecture decisions, code review orchestration

### 🚀 **DevOps (4 specialists)**
- \`devops-engineer\`: CI/CD pipelines, deployment automation
- \`monitoring-specialist\`: APM, logging, alerting systems
- \`security-operations\`: Infrastructure security, compliance
- \`platform-engineer\`: Developer experience, internal tooling

### 📊 **Product (3 specialists)**
- \`product-manager\`: Feature prioritization, roadmap planning
- \`ux-researcher\`: User validation, usability testing
- \`data-analyst\`: Business intelligence, analytics

### 🤖 **AI/Data (2 specialists)**
- \`ai-engineer\`: LLM integration, AI workflow design
- \`data-engineer\`: Data pipelines, analytics infrastructure

### 📱 **Mobile (2 specialists)**
- \`mobile-architect\`: React Native, cross-platform development
- \`mobile-ui-specialist\`: Platform-specific design, touch interactions

## 🎯 Quick Navigation
\`\`\`bash
/help [department]        # Show department details
/help [dept] [specialist] # Show specialist details
/help --examples          # Show common usage examples
/help --quick            # Show quick reference
\`\`\`

**Example**: \`/help devops\` or \`/help frontend react\``;
}

function showDepartmentHelp(department, showExamples) {
  const departments = {
    design: {
      name: "🎨 Design Department",
      specialists: ["design-reviewer", "accessibility-specialist"],
      commands: [
        "/design-visual-review <component>",
        "/accessibility-audit <page>",
        "/design-iterate <component>",
        "/design-screenshot-compare <baseline>"
      ],
      examples: [
        "/design-visual-review src/components/Header.tsx",
        "/accessibility-audit src/pages/checkout/",
        "/design-iterate src/components/Button.tsx --max-iterations=3"
      ]
    },
    devops: {
      name: "🚀 DevOps Department",
      specialists: ["devops-engineer", "monitoring-specialist", "security-operations", "platform-engineer"],
      commands: [
        "/devops-ci-cd-setup <repository>",
        "/devops-monitoring-setup <application>",
        "/devops-infrastructure-audit <terraform>",
        "/devops-deployment-strategy <service>"
      ],
      examples: [
        "/devops-ci-cd-setup .github/workflows/",
        "/devops-monitoring-setup production-app",
        "/devops-deployment-strategy payment-service --blue-green"
      ]
    }
    // ... more departments
  };

  const dept = departments[department];
  if (!dept) {
    return \`❌ Unknown department: \${department}

Available departments: \${Object.keys(departments).join(', ')}\`;
  }

  let output = \`# \${dept.name}

## 👥 Specialists (\${dept.specialists.length})
\${dept.specialists.map(s => \`- **\${s}**: Use \\\`/help \${department} \${s}\\\` for details\`).join('\\n')}

## ⚡ Available Commands
\\\`\\\`\\\`bash
\${dept.commands.join('\\n')}
\\\`\\\`\\\`\`;

  if (showExamples) {
    output += \`

## 📝 Usage Examples
\\\`\\\`\\\`bash
\${dept.examples.join('\\n')}
\\\`\\\`\\\`\`;
  }

  return output;
}
```

## Expected Output
- Comprehensive help system for all 26 specialists
- Department-level and specialist-level help
- Command examples and usage patterns
- Quick reference for common tasks

This makes the complex agency system much more approachable!