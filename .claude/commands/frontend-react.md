# /frontend-react- Command

## Usage
```bash
/frontend-react- <target> [--options]
```

## Implementation
This command MUST invoke the react-architect agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "React architecture and performance",
    prompt: `You are the react-architect specialist from departments/frontend/agents/react-architect.md.

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

This ensures the actual react-architect specialist is called, not Claude pretending.