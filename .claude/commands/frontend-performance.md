# /frontend-performance- Command

## Usage
```bash
/frontend-performance- <target> [--options]
```

## Implementation
This command MUST invoke the performance-engineer agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Core Web Vitals optimization",
    prompt: `You are the performance-engineer specialist from departments/frontend/agents/performance-engineer.md.

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

This ensures the actual performance-engineer specialist is called, not Claude pretending.