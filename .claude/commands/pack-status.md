# /pack-status Command

## Usage
```bash
/pack-status [--conflicts] [--recommendations]
```

## Implementation
This command MUST invoke a specialist using the Task tool:

```javascript
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Show current pack installation status",
    prompt: `You are the pack status specialist.

Show the current expansion pack installation status for this AI Development Agency.

Options: ${JSON.stringify(args)}

Analyze the current system to show:
1. Base pack specialists (always installed)
2. Currently installed expansion packs
3. Total specialist count by department
4. Available commands by pack
5. System configuration summary

If --conflicts flag is present, check for:
- Pack compatibility issues
- Conflicting specialist definitions
- Missing dependencies

If --recommendations flag is present, suggest:
- Additional packs that complement current installation
- Technology gaps in current coverage
- Optimization opportunities (unused packs)

Use base-pack-definition.js and scan .claude/agents/ directory to determine:
- Which expansion packs are currently installed
- Specialist distribution across departments
- Pack compatibility status

Provide clear status report showing:
- Installation summary (base + expansion packs)
- Specialist counts and capabilities
- Available commands and workflows
- Any issues or recommendations`
  });

  return result;
}
```

## Expected Output
- Current pack installation summary
- Specialist distribution by department
- Available commands and capabilities
- Conflict detection and recommendations