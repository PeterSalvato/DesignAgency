# /methodology-track-changes Command

## Usage
```bash
/methodology-track-changes [--since=date] [--detailed] [--format=summary|full|json]
```

## Implementation
This command MUST invoke the methodology-maintainer agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Methodology change tracking and analysis",
    prompt: `You are the methodology-maintainer from departments/management/agents/methodology-maintainer.md.

**METHODOLOGY CHANGE TRACKING REQUEST**:
Since: ${args.since || 'last-update'}
Detail Level: ${args.detailed ? 'detailed' : 'summary'}
Output Format: ${args.format || 'summary'}

Analyze and track methodology changes:

1. **Change Detection Analysis**
   - Compare current codebase with last methodology update
   - Identify new files, components, and architectural patterns
   - Detect changes to existing patterns and conventions
   - Find deprecated or removed patterns

2. **Git History Analysis**
   ${args.since ? `- Analyze commits since ${args.since}` : '- Analyze commits since last methodology update'}
   - Identify significant architectural changes
   - Track new component additions and modifications
   - Monitor changes to file organization and naming
   - Check for new dependencies or tool additions

3. **Pattern Evolution Tracking**
   - New component structures or naming patterns
   - Changes to coding style or formatting standards
   - Evolution of import/export patterns
   - Updates to testing conventions
   - Changes to build or deployment processes

4. **Convention Drift Detection**
   - Find code that doesn't follow documented conventions
   - Identify emerging patterns not yet documented
   - Detect inconsistencies in current practices
   - Check for outdated methodology documentation

5. **Impact Assessment**
   - Categorize changes by impact (breaking, additive, stylistic)
   - Identify changes requiring team communication
   - Assess need for methodology file updates
   - Recommend synchronization priorities

6. **Change Summary Generation**
   ${args.format === 'detailed' || args.detailed ? `
   **Detailed Output**:
   - Complete list of all detected changes
   - Specific file examples for each pattern change
   - Code snippets showing new patterns
   - Detailed impact analysis and recommendations` : ''}

   ${args.format === 'summary' ? `
   **Summary Output**:
   - High-level change categories
   - Count of changes by type
   - Priority recommendations
   - Next steps for methodology updates` : ''}

   ${args.format === 'json' ? `
   **JSON Output**:
   - Machine-readable change data
   - Structured pattern change information
   - Categorized impact metrics
   - Actionable update recommendations` : ''}

Provide comprehensive change analysis with specific examples and actionable recommendations.
Use appropriate tools for git analysis and codebase comparison.`
  });

  return result;
}
```

## Expected Output
- Comprehensive analysis of changes since last methodology update
- Categorized change summary (new patterns, modified conventions, deprecated practices)
- Specific file examples demonstrating each type of change
- Impact assessment and priority recommendations
- Actionable steps for methodology synchronization

## Change Tracking Categories

### 1. New Pattern Detection
```bash
# Automatically identify:
- New component types or structures
- Emerging naming conventions
- New utility patterns or helpers
- Additional testing approaches
- New dependency usage patterns
```

### 2. Modified Convention Tracking
```bash
# Track evolution of:
- Existing component structure changes
- Updates to naming conventions
- Changes to import/export patterns
- Modifications to testing practices
- Updates to build or deployment processes
```

### 3. Convention Drift Analysis
```bash
# Identify inconsistencies:
- Code not following documented conventions
- Multiple approaches to same problems
- Outdated practices still in use
- Missing documentation for new patterns
```

### 4. Impact Assessment
```bash
# Categorize changes by:
Breaking Changes:
- Major architectural shifts
- Breaking convention changes
- Deprecated pattern removal

Additive Changes:
- New component patterns
- Additional utility functions
- New testing approaches
- Extended build processes

Stylistic Changes:
- Formatting updates
- Naming refinements
- Comment conventions
- Code organization improvements
```

### 5. Recommendation Engine
```bash
# Generate actionable recommendations:
- Priority methodology updates needed
- Team communication requirements
- Training or onboarding updates
- Documentation improvement opportunities
```

This command provides visibility into how project conventions evolve and helps maintain accurate methodology documentation.