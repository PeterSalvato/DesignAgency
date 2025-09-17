# /methodology-auto-update Command

## Usage
```bash
/methodology-auto-update [on|off|status] [--interval=daily|weekly|after-work] [--targets=conventions,symbol-index]
```

## Implementation
This command MUST invoke the methodology-maintainer agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Methodology auto-update configuration",
    prompt: `You are the methodology-maintainer from departments/management/agents/methodology-maintainer.md.

**METHODOLOGY AUTO-UPDATE CONFIGURATION**:
Action: ${args._[0] || 'status'}
Update Interval: ${args.interval || 'after-work'}
Target Files: ${args.targets || 'conventions,symbol-index'}

Configure automatic methodology maintenance:

1. **Auto-Update Configuration**
   ${args._[0] === 'on' ? `
   **ENABLE AUTO-UPDATE**:
   - Set up automatic methodology synchronization
   - Configure update triggers and intervals
   - Establish change detection thresholds
   - Create update notification system` : ''}

   ${args._[0] === 'off' ? `
   **DISABLE AUTO-UPDATE**:
   - Turn off automatic methodology updates
   - Preserve manual control over methodology files
   - Disable change detection automation
   - Stop automatic update notifications` : ''}

   ${args._[0] === 'status' || !args._[0] ? `
   **CHECK AUTO-UPDATE STATUS**:
   - Report current auto-update configuration
   - Show last update timestamps and results
   - Display pending changes awaiting update
   - Provide configuration recommendations` : ''}

2. **Update Trigger Configuration**
   - **after-work**: Update methodology after specialist work sessions
   - **daily**: Daily methodology synchronization at specified time
   - **weekly**: Weekly comprehensive methodology review
   - **manual**: Only update when explicitly requested

3. **Change Detection Settings**
   - Minimum change threshold for auto-updates
   - File types and directories to monitor
   - Patterns to track for methodology updates
   - Exclusion rules for irrelevant changes

4. **Update Scope Configuration**
   ${args.targets?.includes('conventions') ? `
   **conventions.md Auto-Updates**:
   - File and directory naming patterns
   - Coding style and formatting standards
   - Component structure conventions
   - Testing and build practices` : ''}

   ${args.targets?.includes('symbol-index') ? `
   **symbol-index.md Auto-Updates**:
   - Component dependency mapping
   - Architectural relationship tracking
   - External dependency integration
   - Data flow and state patterns` : ''}

5. **Notification and Reporting**
   - Configure update success/failure notifications
   - Set up change summary reporting
   - Establish methodology drift alerts
   - Create periodic methodology health reports

6. **Safety and Validation**
   - Backup methodology files before auto-updates
   - Validate updates before applying changes
   - Rollback capability for failed updates
   - Manual review triggers for significant changes

Based on the requested action, configure auto-update settings appropriately.
Provide clear feedback on configuration changes and current status.`
  });

  return result;
}
```

## Expected Output
- Current auto-update configuration status
- Confirmation of configuration changes made
- Schedule and trigger details for automatic updates
- Change detection thresholds and monitoring scope
- Notification settings and reporting preferences

## Auto-Update Modes

### 1. After-Work Mode (Recommended)
```bash
# Triggered after specialist work sessions:
- Monitor specialist command completions
- Detect significant codebase changes
- Update methodology files when patterns change
- Generate change summaries for review
```

### 2. Daily Mode
```bash
# Daily methodology synchronization:
- Scheduled daily review at specified time
- Comprehensive change detection and analysis
- Batch updates for accumulated changes
- Daily methodology health reports
```

### 3. Weekly Mode
```bash
# Weekly comprehensive review:
- Full codebase pattern analysis
- Deep architectural change detection
- Comprehensive methodology validation
- Weekly evolution summary reports
```

### 4. Manual Mode
```bash
# User-controlled updates only:
- Disable all automatic triggers
- Require explicit update commands
- Maintain change tracking for manual review
- Alert when significant drift detected
```

## Configuration Options

### Change Detection Thresholds
```bash
# Minimum changes to trigger auto-update:
- New components: 1+ new files
- Pattern changes: 3+ files with new patterns
- Convention drift: 5+ files not following conventions
- Architectural changes: Any structural modifications
```

### Monitoring Scope
```bash
# Files and directories to monitor:
- Component directories (src/components/, etc.)
- Utility and helper directories
- Configuration files (package.json, tsconfig.json)
- Build and deployment scripts
- Test files and testing patterns
```

### Safety Features
```bash
# Automatic safeguards:
- Backup methodology files before updates
- Validate changes before applying
- Rollback capability for failed updates
- Manual review for major changes (>50% content change)
```

### Notification Settings
```bash
# Update notifications:
- Success/failure status
- Change summaries and impact analysis
- Methodology drift alerts
- Periodic health reports
```

This command enables intelligent, automated maintenance of project methodology documentation while providing appropriate safety controls and configuration flexibility.