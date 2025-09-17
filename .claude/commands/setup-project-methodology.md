# /setup-project-methodology Command

## Usage
```bash
/setup-project-methodology [--force-create] [--search-locations=docs,github]
```

## Implementation
This command runs the methodology discovery and setup workflow:

```javascript
// Project methodology discovery and creation workflow
export async function execute(args) {
  const forceCreate = args.forceCreate;
  const searchLocations = args.searchLocations || 'docs,.github,.claude';

  // Step 1: Invoke methodology specialist for discovery
  const discoveryResult = await Task({
    subagent_type: "general-purpose",
    description: "Project methodology discovery and creation",
    prompt: `You are the methodology-specialist from departments/management/agents/methodology-specialist.md.

**METHODOLOGY DISCOVERY WORKFLOW**:

1. **Primary Search**: Look for 'conventions.md' and 'symbol-index.md' in the project root
2. **Extended Search**: Check these locations: ${searchLocations.split(',').join(', ')}
3. **User Inquiry**: If not found, ask user if methodology files exist elsewhere
4. **Analysis Decision**: If files don't exist, offer to analyze project and create them
5. **Implementation**: Create comprehensive methodology files based on project analysis

**FORCE CREATE**: ${forceCreate ? 'Skip discovery and create new methodology files from project analysis' : 'Follow standard discovery workflow'}

Provide:
- Discovery results (found files, locations, completeness assessment)
- Analysis of existing project patterns if creating new files
- Generated conventions.md and symbol-index.md if needed
- Integration recommendations for AI Development Agency specialists

Execute the complete methodology setup workflow.`
  });

  return {
    discoveryResult,
    nextSteps: [
      "Methodology files established and validated",
      "AI Development Agency specialists can now adapt to project standards",
      "Use /parallel-full-review to test integration with established methodology"
    ]
  };
}
```

## Expected Output
- **Discovery Report**: Found methodology files and their locations
- **Project Analysis**: Coding patterns, architecture, and conventions discovered
- **Generated Files**: Complete conventions.md and symbol-index.md if needed
- **Integration Status**: AI specialists ready to use project methodology

## Workflow Steps

### 1. Methodology File Discovery
```bash
# Automatic search locations
✓ /conventions.md
✓ /symbol-index.md
✓ /docs/conventions.md
✓ /docs/methodology.md
✓ /.github/conventions.md
✓ /.claude/conventions.md
```

### 2. Project Analysis (if files missing)
```bash
# Codebase pattern analysis
- Directory structure and naming patterns
- Import/export dependency mapping
- Component architecture analysis
- Configuration and build pattern review
```

### 3. Methodology Creation
```bash
# Generated files include
- conventions.md: Project-specific standards
- symbol-index.md: Architectural dependency map
- Integration recommendations for AI specialists
```

### 4. Validation
```bash
# Ensure completeness
- All major patterns documented
- Dependency relationships mapped
- Quality gates defined
- AI specialist integration ready
```

This command ensures every project has proper methodology documentation before AI specialists begin work, providing consistent and project-aligned recommendations.