# Specialist Invocation Verification

## How to Verify Real Specialist Calls

### 1. Look for Task Tool Usage
Real specialist calls will show:
```
🔧 Using Task tool to invoke specialist...
📊 Specialist analysis complete...
```

### 2. Check Specialist Identity
Responses must reference their department file:
```
"As the design-reviewer specialist from departments/design/agents/design-reviewer.md..."
```

### 3. Validate Specialized Output
- Design reviewer: Screenshots + pixel measurements
- Security engineer: OWASP compliance report
- Performance engineer: Lighthouse scores + optimization
- React architect: Component analysis + refactoring examples

### 4. Available Specialists (15 total)
**design**: design-reviewer, accessibility-specialist
**frontend**: react-architect, performance-engineer
**backend**: api-architect, security-engineer
**css**: css-specialist
**database**: schema-architect, query-optimizer
**content**: copywriter, brand-strategist
**testing**: test-engineer, qa-automation
**management**: project-coordinator, tech-lead, methodology-specialist
**devops**: devops-engineer, monitoring-specialist, security-operations, platform-engineer
**product**: product-manager, ux-researcher, data-analyst
**ai-data**: ai-engineer, data-engineer
**mobile**: mobile-architect, mobile-ui-specialist

### 5. Command Usage
```bash
# These commands invoke real specialists:
/design-visual-review src/components/Button.tsx
/security-vulnerability-scan api/auth/
/react-architecture-review src/pages/Dashboard.tsx
```

If you don't see Task tool usage and specialist file references, Claude is pretending!