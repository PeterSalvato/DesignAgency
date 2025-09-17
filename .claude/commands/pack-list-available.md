# /pack-list-available Command

## Usage
```bash
/pack-list-available [--frontend|--backend|--database|--cloud|--mobile]
```

## Implementation
This command MUST invoke a specialist using the Task tool:

```javascript
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "List available expansion packs",
    prompt: `You are the pack management specialist.

Show all available expansion packs for the AI Development Agency modular system.

Filter: ${args.filter || 'all'}

Use the base-pack-definition.js file to:
1. Load all available expansion packs
2. Show pack names, specialist counts, and descriptions
3. Group by category (frontend, backend, database, cloud, mobile)
4. Include compatibility information
5. Show example use cases for each pack

Format the output as a comprehensive catalog that helps users choose the right packs for their technology stack.

Provide specific information about:
- Specialist types included in each pack
- Technology focus and expertise areas
- Common use cases and project types
- Compatibility requirements and conflicts`
  });

  return result;
}
```

## Expected Output
- Comprehensive list of all expansion packs
- Specialist counts and capabilities for each pack
- Technology compatibility information
- Recommendations based on common project types