# /methodology-sync-update Command

## Usage
```bash
/methodology-sync-update [--target=conventions|symbol-index|both] [--force] [--dry-run]
```

## Implementation
This command MUST invoke the methodology-maintainer agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Methodology documentation synchronization",
    prompt: `You are the methodology-maintainer from departments/management/agents/methodology-maintainer.md.

**METHODOLOGY SYNC UPDATE REQUEST**:
Target: ${args.target || 'both'}
Force Update: ${args.force || false}
Dry Run: ${args.dryRun || false}

Perform comprehensive methodology synchronization:

1. **Current State Analysis**
   - Read existing conventions.md and symbol-index.md files
   - Analyze current codebase structure and patterns
   - Identify discrepancies between documentation and reality
   - Check for new patterns, components, or architectural decisions

2. **Change Detection**
   - Scan recently modified files for new patterns
   - Check git history for architectural changes since last update
   - Identify new components, utilities, or design patterns
   - Detect changes to naming conventions or file organization

3. **Pattern Analysis**
   - Analyze component structure and naming patterns
   - Review import/export dependency patterns
   - Check coding style consistency across files
   - Identify testing patterns and practices

4. **Methodology Updates**
   ${args.target === 'conventions' || args.target === 'both' ? `
   **conventions.md Updates**:
   - File and directory naming conventions
   - Component structure and organization patterns
   - Coding style and formatting standards
   - Import/export patterns and best practices
   - Testing conventions and practices
   - Tool configurations and build patterns` : ''}

   ${args.target === 'symbol-index' || args.target === 'both' ? `
   **symbol-index.md Updates**:
   - Component dependency mapping
   - Utility function relationships
   - Architectural layer interactions
   - Data flow and state management patterns
   - External dependency usage and integration
   - API endpoint and data structure relationships` : ''}

5. **Validation & Quality Checks**
   - Verify updated methodology matches actual codebase
   - Check for consistency across all documented patterns
   - Ensure new team member comprehensibility
   - Validate that all architectural decisions are captured

6. **Change Summary Generation**
   - List all updates made to methodology files
   - Highlight new patterns or conventions discovered
   - Note any deprecated or changed practices
   - Provide recommendations for team adoption

${args.dryRun ? '**DRY RUN MODE**: Show what would be updated without making changes' : ''}
${args.force ? '**FORCE MODE**: Update methodology files even if no changes detected' : ''}

Provide detailed change summary and updated methodology file content.
Use appropriate tools for codebase analysis and file updates.`
  });

  return result;
}
```

## Expected Output
- Comprehensive analysis of current codebase vs methodology documentation
- Updated methodology files reflecting current project state
- Detailed change summary with specific updates made
- Validation that methodology accurately represents codebase
- Recommendations for team adoption of new patterns

## Sync Update Process

### 1. Pre-Sync Analysis
- Read existing methodology files
- Scan codebase for structural changes
- Check git history for recent architectural changes
- Identify patterns not yet documented

### 2. Pattern Detection
```bash
# Automatically detect:
- New component structures and naming patterns
- File organization and directory conventions
- Import/export dependency patterns
- Coding style and formatting standards
- Testing patterns and practices
- Configuration and build tool patterns
```

### 3. Documentation Updates
```bash
# Update conventions.md with:
- File naming conventions (components, utilities, tests)
- Directory structure and organization
- Code formatting and style guidelines
- Import/export patterns and best practices
- Testing conventions and patterns
- Build and deployment practices

# Update symbol-index.md with:
- Component dependency relationships
- Utility function and hook dependencies
- State management and data flow patterns
- API integration and data structures
- External library usage and integration
- Architectural layer relationships
```

### 4. Validation & Quality Assurance
- Verify methodology matches actual codebase patterns
- Check consistency across documented conventions
- Ensure completeness of architectural documentation
- Validate new team member comprehensibility

This command ensures methodology documentation stays current with evolving codebase patterns and architectural decisions.