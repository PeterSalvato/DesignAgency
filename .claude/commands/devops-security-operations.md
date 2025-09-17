# /devops-security-operations Command

## Usage
```bash
/devops-security-operations <target> [--options]
```

## Implementation
This command MUST invoke the security-operations agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Infrastructure security and compliance",
    prompt: `You are the security-operations specialist from departments/devops/agents/security-operations.md.

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

This ensures the actual security-operations specialist is called, not Claude pretending.