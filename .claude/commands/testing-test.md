# /testing-test- Command

## Usage
```bash
/testing-test- <target> [--options]
```

## Implementation
This command MUST invoke the test-engineer agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Unit testing and TDD",
    prompt: `You are the test-engineer specialist from departments/testing/agents/test-engineer.md.

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

This ensures the actual test-engineer specialist is called, not Claude pretending.