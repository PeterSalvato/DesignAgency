# /backend-api- Command

## Usage
```bash
/backend-api- <target> [--options]
```

## Implementation
This command MUST invoke the api-architect agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "RESTful API design and documentation",
    prompt: `You are the api-architect specialist from departments/backend/agents/api-architect.md.

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

This ensures the actual api-architect specialist is called, not Claude pretending.