# /getting-started Command

## Usage
```bash
/getting-started [workflow-type]
```

## Implementation
This command provides beginner-friendly guidance for using the AI Development Agency:

```javascript
export async function execute(args) {
  const workflowType = args.workflowType;

  if (workflowType) {
    return showWorkflowGuide(workflowType);
  }

  return showGettingStarted();
}

function showGettingStarted() {
  return `# 🚀 Getting Started - AI Development Agency

## 🎯 **Your First 5 Commands**

### 1. **See What You Have**
\`\`\`bash
/help --quick
\`\`\`
Shows the most common commands you'll use daily.

### 2. **Review Your Code**
\`\`\`bash
/design-visual-review src/components/YourComponent.tsx
\`\`\`
Get a visual design expert to review any component.

### 3. **Check Security**
\`\`\`bash
/security-vulnerability-scan api/
\`\`\`
Security expert scans your API for vulnerabilities.

### 4. **Performance Check**
\`\`\`bash
/performance-audit src/pages/
\`\`\`
Performance expert optimizes your pages.

### 5. **Complete Review**
\`\`\`bash
/parallel-full-review src/features/search/
\`\`\`
6 specialists review your feature simultaneously (60 seconds!).

## 🎮 **Try These Workflows**

### 🎨 **Design & UX Workflow**
\`\`\`bash
/getting-started design
\`\`\`

### 🚀 **Development Workflow**
\`\`\`bash
/getting-started development
\`\`\`

### 📦 **Deployment Workflow**
\`\`\`bash
/getting-started deployment
\`\`\`

### 🧪 **Testing Workflow**
\`\`\`bash
/getting-started testing
\`\`\`

## 💡 **Pro Tips**

1. **Start Small**: Pick one component and run \`/design-visual-review\`
2. **Use Parallel**: \`/parallel-full-review\` is usually what you want
3. **Get Help**: \`/help design\` shows all design commands
4. **Check Examples**: \`/help --examples\` shows real usage

**Remember**: These are REAL specialists using the Task tool - not Claude pretending! 🎯`;
}

function showWorkflowGuide(workflowType) {
  const workflows = {
    design: `# 🎨 Design & UX Workflow

## 📋 **Step-by-Step Process**

### 1. **Visual Design Review**
\`\`\`bash
/design-visual-review src/components/Header.tsx
\`\`\`
- Takes screenshots across mobile/tablet/desktop
- Checks design system compliance
- Validates 8px grid and spacing

### 2. **Accessibility Audit**
\`\`\`bash
/accessibility-audit src/pages/checkout/
\`\`\`
- WCAG 2.1 AA compliance testing
- Screen reader compatibility
- Color contrast validation

### 3. **User Research** (if needed)
\`\`\`bash
/ux-user-research-plan "checkout-flow-optimization"
\`\`\`
- User interview planning
- Usability testing setup
- Behavioral analysis

### 4. **Content Review**
\`\`\`bash
/content-ui-copy-review src/components/ContactForm.tsx
\`\`\`
- Microcopy optimization
- Error message clarity
- Conversion optimization

## ⚡ **Quick Design Check** (2 specialists in parallel)
\`\`\`bash
# This runs design + accessibility simultaneously
/help design --examples
\`\`\``,

    development: `# ⚛️ Development Workflow

## 📋 **Step-by-Step Process**

### 1. **Architecture Review**
\`\`\`bash
/react-architecture-review src/pages/Dashboard.tsx
\`\`\`
- Component structure analysis
- State management optimization
- Performance patterns

### 2. **API Design**
\`\`\`bash
/api-design-review api/auth/login
\`\`\`
- RESTful design validation
- OpenAPI documentation
- Response optimization

### 3. **Security Check**
\`\`\`bash
/security-vulnerability-scan api/
\`\`\`
- OWASP Top 10 assessment
- Authentication security
- Input validation

### 4. **Database Review**
\`\`\`bash
/schema-design-review schema/users.sql
\`\`\`
- Relationship optimization
- Query performance
- Migration safety

## ⚡ **Full Stack Review** (4 specialists in parallel)
\`\`\`bash
/parallel-full-review src/features/payment/
\`\`\``,

    deployment: `# 🚀 Deployment Workflow

## 📋 **Step-by-Step Process**

### 1. **Pre-Deployment Check**
\`\`\`bash
/parallel-deployment-readiness v2.1.0 --environment=production
\`\`\`
- 7 specialists validate deployment safety
- Infrastructure, security, performance, QA
- Go/No-Go decision in 60 seconds

### 2. **CI/CD Setup**
\`\`\`bash
/devops-ci-cd-setup .github/workflows/
\`\`\`
- Pipeline optimization
- Docker configuration
- Automated testing integration

### 3. **Monitoring Setup**
\`\`\`bash
/devops-monitoring-setup production-app
\`\`\`
- APM configuration
- Alerting rules
- Dashboard creation

### 4. **Infrastructure Review**
\`\`\`bash
/devops-infrastructure-audit terraform/
\`\`\`
- Security compliance
- Cost optimization
- Scalability assessment

## 🎯 **Production Ready Checklist**
All specialists must give ✅ before deployment!`,

    testing: `# 🧪 Testing Workflow

## 📋 **Step-by-Step Process**

### 1. **Unit Test Coverage**
\`\`\`bash
/test-unit-coverage src/utils/payment.ts
\`\`\`
- TDD implementation
- 90%+ coverage validation
- Edge case testing

### 2. **Integration Testing**
\`\`\`bash
/test-integration-suite api/payment/
\`\`\`
- API integration validation
- Database testing
- Third-party service mocks

### 3. **End-to-End Testing**
\`\`\`bash
/test-e2e-flow "user-checkout-journey"
\`\`\`
- Complete user journey automation
- Cross-browser testing
- Mobile compatibility

### 4. **Visual Regression**
\`\`\`bash
/test-regression-audit --visual
\`\`\`
- Screenshot comparison
- Design consistency
- Breaking change detection

## ⚡ **Complete Testing** (2 specialists in parallel)
\`\`\`bash
# Both test-engineer and qa-automation working together
/parallel-full-review src/features/search/ --focus=testing
\`\`\``
  };

  return workflows[workflowType] || `❌ Unknown workflow: ${workflowType}

Available workflows: design, development, deployment, testing`;
}
```

## Expected Output
- Beginner-friendly introduction to the agency
- Step-by-step workflow guides for common tasks
- Simple command progression from basic to advanced
- Clear explanations of what each specialist does

This makes the complex 26-specialist system much more approachable for new users!