# /backend-security- Command

## Usage
```bash
/backend-security- <target> [--options]
```

## Implementation
This command MUST invoke the security-engineer agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "OWASP security assessment",
    prompt: `You are the security-engineer specialist from departments/backend/agents/security-engineer.md.

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

This ensures the actual security-engineer specialist is called, not Claude pretending.