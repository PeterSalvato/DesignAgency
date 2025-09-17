# Pack Management Commands

## Overview
Manage modular expansion packs for the AI Development Agency. Add technology-specific specialists as needed for your project stack.

## Available Commands

### /pack-list-available
Shows all available expansion packs with descriptions and specialist counts.

```bash
/pack-list-available
# Shows comprehensive list of all expansion packs

/pack-list-available --frontend
# Shows only frontend expansion packs

/pack-list-available --backend
# Shows only backend expansion packs
```

### /pack-detect-technology
Analyzes your current project and suggests relevant expansion packs.

```bash
/pack-detect-technology
# Automatic analysis and recommendations

/pack-detect-technology --detailed
# Includes confidence scores and evidence
```

### /pack-install
Installs specific expansion packs, adding their specialists to your project.

```bash
/pack-install frontend-react
# Installs React specialists

/pack-install frontend-react backend-nodejs database-postgresql
# Installs multiple related packs

/pack-install --recommended
# Installs all recommended packs from technology detection
```

### /pack-uninstall
Removes expansion pack specialists from your project.

```bash
/pack-uninstall backend-python
# Removes Python backend specialists

/pack-uninstall --all-expansion
# Removes all expansion packs, keeps only base pack
```

### /pack-info
Shows detailed information about a specific expansion pack.

```bash
/pack-info frontend-react
# Shows React pack specialists, commands, and requirements

/pack-info --compatibility backend-dotnet
# Shows .NET pack compatibility with current setup
```

### /pack-status
Shows currently installed packs and system status.

```bash
/pack-status
# Lists all installed packs and specialist counts

/pack-status --conflicts
# Checks for any pack conflicts in current setup

/pack-status --recommendations
# Suggests additional packs based on current stack
```

### /pack-update-all
Updates all installed expansion packs to their latest versions.

```bash
/pack-update-all
# Updates all packs

/pack-update-all --dry-run
# Shows what would be updated without making changes
```

## Implementation Notes

These commands should be implemented to use the Task tool with the general-purpose agent, which will:

1. **Read pack definitions** from `base-pack-definition.js`
2. **Analyze project structure** using technology detection
3. **Manage pack installation** by modifying `.claude/agents/` and `.claude/commands/`
4. **Handle dependencies and conflicts** according to compatibility rules
5. **Update integration scripts** to reflect new pack configuration

## Example Workflow

```bash
# 1. Detect what packs your project needs
/pack-detect-technology

# 2. See available options
/pack-list-available --recommended

# 3. Install suggested packs
/pack-install frontend-react backend-nodejs

# 4. Verify installation
/pack-status

# 5. Get pack-specific help
/frontend-react-help
/backend-nodejs-help
```

## Pack System Benefits

- **Focused expertise**: Only get specialists relevant to your technology stack
- **Reduced complexity**: Smaller command set relevant to your project
- **Better performance**: Fewer specialists means faster parallel execution
- **Easier maintenance**: Technology-specific updates don't affect other stacks
- **Scalable growth**: New technologies can be added as expansion packs

The modular system transforms the agency from a monolithic 30-specialist team into a flexible, adaptive system that scales perfectly with your project's complexity and technology choices.