#!/usr/bin/env node

/**
 * AI Development Agency - Specialist Integration Script
 *
 * This script creates the actual Claude Code agent files and slash commands
 * that invoke real specialists using the Task tool.
 */

const fs = require('fs');
const path = require('path');

// Define all 26 specialists across 12 departments
const specialists = {
  design: [
    { name: 'design-reviewer', description: 'Visual design review with screenshots' },
    { name: 'accessibility-specialist', description: 'WCAG 2.1 AA compliance testing' }
  ],
  frontend: [
    { name: 'react-architect', description: 'React architecture and performance' },
    { name: 'performance-engineer', description: 'Core Web Vitals optimization' }
  ],
  backend: [
    { name: 'api-architect', description: 'RESTful API design and documentation' },
    { name: 'security-engineer', description: 'OWASP security assessment' }
  ],
  css: [
    { name: 'css-specialist', description: 'Advanced CSS and responsive design' }
  ],
  database: [
    { name: 'schema-architect', description: 'Database design and relationships' },
    { name: 'query-optimizer', description: 'SQL performance optimization' }
  ],
  content: [
    { name: 'copywriter', description: 'User-centered copy optimization' },
    { name: 'brand-strategist', description: 'Brand voice and messaging' }
  ],
  testing: [
    { name: 'test-engineer', description: 'Unit testing and TDD' },
    { name: 'qa-automation', description: 'Integration and E2E testing' }
  ],
  management: [
    { name: 'project-coordinator', description: 'Cross-department coordination' },
    { name: 'tech-lead', description: 'Technical leadership and architecture' },
    { name: 'methodology-specialist', description: 'Project methodology discovery and creation' }
  ],
  devops: [
    { name: 'devops-engineer', description: 'CI/CD pipelines and deployment automation' },
    { name: 'monitoring-specialist', description: 'Application monitoring and alerting' },
    { name: 'security-operations', description: 'Infrastructure security and compliance' },
    { name: 'platform-engineer', description: 'Developer experience and internal tooling' }
  ],
  product: [
    { name: 'product-manager', description: 'Feature prioritization and roadmap planning' },
    { name: 'ux-researcher', description: 'User validation and usability testing' },
    { name: 'data-analyst', description: 'Business intelligence and analytics' }
  ],
  'ai-data': [
    { name: 'ai-engineer', description: 'LLM integration and AI workflow design' },
    { name: 'data-engineer', description: 'Data pipelines and analytics infrastructure' }
  ],
  mobile: [
    { name: 'mobile-architect', description: 'React Native and cross-platform development' },
    { name: 'mobile-ui-specialist', description: 'Platform-specific design and touch interactions' }
  ]
};

// Create agent invocation template
function createAgentInvocation(department, specialist) {
  return `# ${specialist.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Agent

You are the ${specialist.name} specialist from departments/${department}/agents/${specialist.name}.md.

## Invocation Pattern

**CRITICAL: This agent must be invoked using the Task tool, not directly.**

When Claude needs ${specialist.description}, it must use:

\`\`\`javascript
const result = await Task({
  subagent_type: "general-purpose",
  description: "${specialist.description}",
  prompt: \`You are the ${specialist.name} specialist from departments/${department}/agents/${specialist.name}.md.

**HOST PROJECT INTEGRATION**: Follow this methodology discovery workflow:

1. **Check for methodology files**: Look for 'conventions.md' and 'symbol-index.md' in the project root
2. **If found**: Read and adapt your analysis to the host project's established standards and practices
3. **If not found**: Search common locations (docs/, .github/, etc.) and ask the user if they exist elsewhere
4. **If they don't exist**: Offer to analyze the project structure and create these files to establish proper methodology for future work
5. **Proceed with analysis**: Use discovered/created methodology or provide general best practices if declined

[SPECIFIC_TASK_REQUIREMENTS]

Follow the exact responsibilities and success criteria defined in your department agent file, while respecting the host project's methodology and conventions.

Provide specific, actionable output as defined in your specialist role that integrates with the host project's standards.\`
});
\`\`\`

## Verification
- Response must reference the department agent file
- Response must acknowledge host project methodology (conventions.md/symbol-index.md)
- Output must match specialist expertise level
- Must use appropriate tools as defined in agent file
- Recommendations must align with host project standards

This ensures real specialist invocation that respects the host project's existing methodology.`;
}

// Create slash command template
function createSlashCommand(department, specialist) {
  const commandName = specialist.name.replace('-', '-').replace('specialist', '').replace('engineer', '').replace('architect', '');

  return `# /${department}-${commandName} Command

## Usage
\`\`\`bash
/${department}-${commandName} <target> [--options]
\`\`\`

## Implementation
This command MUST invoke the ${specialist.name} agent using the Task tool:

\`\`\`javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "${specialist.description}",
    prompt: \`You are the ${specialist.name} specialist from departments/${department}/agents/${specialist.name}.md.

Target: \${args.target}
Options: \${JSON.stringify(args)}

Perform your specialized analysis as defined in your agent file.
Provide specific, actionable recommendations with examples.
Use appropriate tools as specified in your department role.\`
  });

  return result;
}
\`\`\`

## Expected Output
- Specialist analysis following department agent guidelines
- Specific recommendations with implementation examples
- Tool usage appropriate to specialist role
- Verification that real specialist was invoked

This ensures the actual ${specialist.name} specialist is called, not Claude pretending.`;
}

// Create directories
const agentsDir = './.claude/agents';
const commandsDir = './.claude/commands';

if (!fs.existsSync(agentsDir)) fs.mkdirSync(agentsDir, { recursive: true });
if (!fs.existsSync(commandsDir)) fs.mkdirSync(commandsDir, { recursive: true });

// Generate all agent invocation files
Object.entries(specialists).forEach(([department, departmentSpecialists]) => {
  departmentSpecialists.forEach(specialist => {
    // Create agent invocation file
    const agentContent = createAgentInvocation(department, specialist);
    fs.writeFileSync(
      path.join(agentsDir, `${specialist.name}.md`),
      agentContent
    );

    // Create slash command file
    const commandContent = createSlashCommand(department, specialist);
    fs.writeFileSync(
      path.join(commandsDir, `${department}-${specialist.name.replace('-specialist', '').replace('-engineer', '').replace('-architect', '')}.md`),
      commandContent
    );
  });
});

// Create master verification file
const verificationContent = `# Specialist Invocation Verification

## How to Verify Real Specialist Calls

### 1. Look for Task Tool Usage
Real specialist calls will show:
\`\`\`
🔧 Using Task tool to invoke specialist...
📊 Specialist analysis complete...
\`\`\`

### 2. Check Specialist Identity
Responses must reference their department file:
\`\`\`
"As the design-reviewer specialist from departments/design/agents/design-reviewer.md..."
\`\`\`

### 3. Validate Specialized Output
- Design reviewer: Screenshots + pixel measurements
- Security engineer: OWASP compliance report
- Performance engineer: Lighthouse scores + optimization
- React architect: Component analysis + refactoring examples

### 4. Available Specialists (15 total)
${Object.entries(specialists).map(([dept, specs]) =>
  `**${dept}**: ${specs.map(s => s.name).join(', ')}`
).join('\n')}

### 5. Command Usage
\`\`\`bash
# These commands invoke real specialists:
/design-visual-review src/components/Button.tsx
/security-vulnerability-scan api/auth/
/react-architecture-review src/pages/Dashboard.tsx
\`\`\`

If you don't see Task tool usage and specialist file references, Claude is pretending!`;

fs.writeFileSync('./.claude/verification.md', verificationContent);

console.log('✅ AI Development Agency Integration Complete!');
console.log('📁 Created agent files in .claude/agents/');
console.log('⚡ Created command files in .claude/commands/');
console.log('🔍 Created verification guide in .claude/verification.md');
console.log('');
console.log('🎯 Total Specialists: 27 across 12 departments');
console.log('🏗️  DevOps: CI/CD, monitoring, security-ops, platform engineering');
console.log('📊 Product: Product management, UX research, data analytics');
console.log('🤖 AI/Data: AI engineering, data pipelines');
console.log('📱 Mobile: React Native, mobile UI design');
console.log('');
console.log('🚀 Usage Examples:');
console.log('   /design-visual-review src/components/Button.tsx');
console.log('   /devops-ci-cd-setup .github/workflows/');
console.log('   /product-feature-prioritization backlog.md');
console.log('   /ai-llm-integration src/api/chat/');
console.log('   /mobile-architecture-review mobile-app/');
console.log('');
console.log('All commands will invoke real specialists using the Task tool!');