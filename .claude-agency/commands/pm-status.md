# Project Status Analysis

Provides comprehensive project status overview including development velocity, blockers, and recommendations.

## Usage
```bash
/pm-status [--detailed] [--focus=area]
```

## Options
- `--detailed`: Include detailed metrics and analysis
- `--focus=area`: Focus on specific area (velocity, blockers, quality, timeline)

## Description
This command invokes the Project Manager specialist to analyze the current project state and provide actionable insights for project coordination and planning.

## Implementation

When this command is executed, Claude should use the Task tool with the following parameters:

```
subagent_type: "general-purpose"
description: "Project status analysis"
prompt: "You are a Project Manager specialist for an AI Development Agency. Perform a comprehensive project status analysis.

ANALYSIS SCOPE:
1. **Project Structure**: Examine the codebase organization, file structure, and architectural patterns
2. **Development Activity**: Analyze recent commits, branch activity, and development velocity
3. **Quality Indicators**: Review test coverage, documentation completeness, and code quality metrics
4. **Potential Blockers**: Identify technical debt, missing dependencies, or architectural issues
5. **Timeline Assessment**: Evaluate progress against typical development milestones

DELIVERABLES:
- Executive summary of project health (Green/Yellow/Red status)
- Key development velocity indicators
- Identified blockers and risk areas
- Actionable recommendations for next steps
- Resource allocation suggestions

ANALYSIS METHODOLOGY:
- Use file analysis to understand project scope and complexity
- Examine git history for development patterns
- Review configuration files for technical stack assessment
- Identify missing or incomplete areas that need attention

Provide specific, actionable insights that would help coordinate development efforts and optimize team productivity."
```

## Expected Output
- Project health status with color-coded assessment
- Development metrics and velocity analysis
- Risk assessment and blocker identification
- Prioritized recommendations for team coordination
- Timeline and milestone evaluation