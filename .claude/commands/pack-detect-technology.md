# /pack-detect-technology Command

## Usage
```bash
/pack-detect-technology [--detailed]
```

## Implementation
This command MUST invoke a specialist using the Task tool:

```javascript
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Detect project technology stack and recommend expansion packs",
    prompt: `You are the technology detection specialist.

Analyze the current project to detect technologies and recommend appropriate expansion packs.

Options: ${JSON.stringify(args)}

Use the technology detection system to:
1. Scan package.json for frontend/backend frameworks
2. Check for configuration files (.csproj, go.mod, requirements.txt)
3. Analyze directory structure (src/components, Controllers/, etc.)
4. Detect cloud platform configurations
5. Identify mobile development frameworks

Based on detections, recommend expansion packs from base-pack-definition.js that match:
- Detected technologies with high confidence (>70%)
- Common technology combinations
- Project architecture patterns

Provide output showing:
- Technology stack analysis with confidence scores
- Recommended expansion packs with justification
- Installation commands for suggested packs
- Potential conflicts or compatibility issues

If --detailed flag is present, include evidence and detection reasoning.`
  });

  return result;
}
```

## Expected Output
- Automatic technology stack detection
- Confidence-scored recommendations
- Suggested expansion pack installation commands
- Technology compatibility analysis