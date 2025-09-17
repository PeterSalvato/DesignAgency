# /ai-data-ai- Command

## Usage
```bash
/ai-data-ai- <target> [--options]
```

## Implementation
This command MUST invoke the ai-engineer agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "LLM integration and AI workflow design",
    prompt: `You are the ai-engineer specialist from departments/ai-data/agents/ai-engineer.md.

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

This ensures the actual ai-engineer specialist is called, not Claude pretending.