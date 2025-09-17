# /devops-monitoring- Command

## Usage
```bash
/devops-monitoring- <target> [--options]
```

## Implementation
This command MUST invoke the monitoring-specialist agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Application monitoring and alerting",
    prompt: `You are the monitoring-specialist specialist from departments/devops/agents/monitoring-specialist.md.

Target: ${args.target}
Options: ${JSON.stringify(args)}

Perform your specialized analysis as defined in your agent file.
Provide specific, actionable recommendations with examples.
Use appropriate tools as specified in your department role.`
  });

  return result;
}
```

## Expected Output
- Specialist analysis following department agent guidelines
- Specific recommendations with implementation examples
- Tool usage appropriate to specialist role
- Verification that real specialist was invoked

This ensures the actual monitoring-specialist specialist is called, not Claude pretending.