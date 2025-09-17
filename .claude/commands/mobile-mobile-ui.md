# /mobile-mobile-ui- Command

## Usage
```bash
/mobile-mobile-ui- <target> [--options]
```

## Implementation
This command MUST invoke the mobile-ui-specialist agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Platform-specific design and touch interactions",
    prompt: `You are the mobile-ui-specialist specialist from departments/mobile/agents/mobile-ui-specialist.md.

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

This ensures the actual mobile-ui-specialist specialist is called, not Claude pretending.