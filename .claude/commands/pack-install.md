# /pack-install Command

## Usage
```bash
/pack-install <pack-name> [pack-name2] [--recommended]
```

## Implementation
This command MUST invoke a specialist using the Task tool:

```javascript
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Install expansion packs and their specialists",
    prompt: `You are the pack installation specialist.

Install the specified expansion packs: ${args.packs || args.join(' ')}

Options: ${JSON.stringify(args)}

Use base-pack-definition.js to:
1. Validate requested packs exist and are compatible
2. Check for conflicts with currently installed packs
3. Resolve dependencies (install required packs automatically)
4. Generate specialist agent files for the new packs
5. Create pack-specific command files
6. Update .claude/agents/ and .claude/commands/ directories
7. Modify CLAUDE.md to include new specialists

Installation process:
1. Pre-installation validation (conflicts, dependencies)
2. Create agent files from expansion pack templates
3. Generate command files with proper Task tool invocation
4. Update help system to include new specialists
5. Verify installation success

If --recommended flag is used, install packs from technology detection.

Provide confirmation of:
- Successfully installed packs and specialist counts
- New commands available
- Any warnings about conflicts or missing dependencies
- Updated total specialist count`
  });

  return result;
}
```

## Expected Output
- Installation confirmation with specialist counts
- List of newly available commands
- Conflict and dependency resolution results
- Updated system configuration summary