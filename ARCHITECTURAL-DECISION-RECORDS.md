# Architectural Decision Records (ADRs)

## ADR-001: Self-Discovering Agency Architecture

**Date**: 2025-09-19
**Status**: Accepted
**Decision**: Implement a self-discovering agency system that Claude can automatically detect and configure without manual integration scripts.

### Context
The original design required manual integration scripts (`npm run integrate`) that users had to remember to run. This created friction and potential for misconfiguration. Users expected Claude to automatically understand and configure the agency when present in a project.

### Decision
Move to a self-discovering architecture where:
- Claude automatically detects agency presence via manifest files
- Technology detection happens automatically during initialization
- No manual integration commands required
- Built-in verification prevents false success claims

### Consequences
- **Positive**: Seamless user experience, automatic configuration, robust verification
- **Negative**: More complex initialization logic, requires sophisticated detection mechanisms
- **Risks**: Detection failures in edge cases, performance overhead during discovery

---

## ADR-002: Three-Tier Pack System

**Date**: 2025-09-19
**Status**: Accepted
**Decision**: Implement a three-tier pack system: Base Pack + Dynamic Tech Stack Pack + Initiative Packs.

### Context
Original design had only expansion packs, but analysis revealed three distinct types of functionality:
1. Universal specialists needed in all projects
2. Technology-specific specialists based on detected tech stack
3. Domain-specific specialists for particular initiatives

### Decision
- **Base Pack**: 11 universal specialists (Project Manager, Tech Lead, etc.)
- **Dynamic Tech Stack Pack**: Automatically constructed based on detected technologies
- **Initiative Packs**: User-selected domain packs (Branding, E-commerce, etc.)

### Consequences
- **Positive**: Clear separation of concerns, automatic tech stack matching, scalable expansion
- **Negative**: More complex pack management, potential pack conflicts
- **Risks**: Technology detection accuracy, pack dependency management

---

## ADR-003: Task Tool Delegation Pattern

**Date**: 2025-09-19
**Status**: Accepted
**Decision**: Use Task tool invocation for all specialist commands rather than direct function execution.

### Context
Need to ensure specialists are actual AI agents rather than simple scripts, while maintaining command simplicity and real specialist capabilities.

### Decision
All specialist commands use Task tool pattern with proper parameters:
- Use `subagent_type` parameter to specify the specialist type
- Use `description` parameter for brief task description
- Use `prompt` parameter for detailed instructions

### Consequences
- **Positive**: Real AI specialist invocation, consistent delegation pattern, scalable specialist system
- **Negative**: Requires Task tool infrastructure, potential latency in specialist calls
- **Risks**: Task tool availability, specialist routing complexity

---

## ADR-004: Technology Detection Approach

**Date**: 2025-09-19
**Status**: Accepted
**Decision**: Implement file-pattern-based technology detection with confidence scoring.

### Context
Need to automatically detect project technology stack to construct appropriate Dynamic Tech Stack Pack without user configuration.

### Decision
Use file pattern analysis:
- Frontend: package.json dependencies, framework files
- Backend: server files, API patterns, configuration files
- Database: schema files, migration folders, connection configs
- Cloud: deployment configs, infrastructure as code files

Each detection returns confidence score (0-100) for weighted pack construction.

### Consequences
- **Positive**: Automatic tech stack detection, no user configuration required, confidence-based decisions
- **Negative**: Pattern maintenance overhead, potential false positives
- **Risks**: New technology adoption lag, complex polyglot project detection

---

## ADR-005: Agency Manifest System

**Date**: 2025-09-19
**Status**: Accepted
**Decision**: Use `.claude-agency/manifest.json` as the primary discovery and configuration mechanism.

### Context
Need a standardized way for Claude to detect agency presence and understand current configuration state without relying on external integration scripts.

### Decision
Implement manifest system:
```json
{
  "version": "1.0.0",
  "name": "AI Development Agency",
  "type": "self-discovering-agency",
  "packs": {
    "base": { "version": "1.0.0", "active": true },
    "tech-stack": { "detected": ["react", "typescript", "postgresql"], "confidence": 95 },
    "initiative": { "active": ["branding", "e-commerce"] }
  },
  "last_discovery": "2025-09-19T10:30:00Z",
  "verification_status": "verified"
}
```

### Consequences
- **Positive**: Clear discovery mechanism, version tracking, state management
- **Negative**: Additional file management, JSON schema evolution
- **Risks**: Manifest corruption, version compatibility issues

---

## ADR-006: Progressive Disclosure Architecture

**Date**: 2025-09-19
**Status**: Accepted
**Decision**: Implement progressive disclosure where pack complexity is revealed based on user interaction patterns.

### Context
Users need both simple access to basic functionality and deep specialist capabilities without overwhelming newcomers with complexity.

### Decision
Three disclosure levels:
1. **Basic**: Essential commands visible by default
2. **Advanced**: Revealed after basic command usage or explicit request
3. **Expert**: Full specialist capabilities available on demand

Commands adapt complexity based on user's demonstrated proficiency level.

### Consequences
- **Positive**: Approachable for beginners, powerful for experts, adaptive interface
- **Negative**: Complex state tracking, potential user confusion about available features
- **Risks**: Incorrect proficiency assessment, feature discoverability issues

---

## ADR-007: Change Management Pipeline

**Date**: 2025-09-19
**Status**: Accepted
**Decision**: Implement comprehensive change management with impact analysis and rollback capabilities.

### Context
Agency modifications (pack installation, configuration changes) can affect project functionality and need careful management with recovery options.

### Decision
Multi-stage pipeline:
1. **Pre-flight**: Backup current state, analyze impact
2. **Staging**: Apply changes in isolated environment
3. **Verification**: Run verification suite
4. **Deployment**: Apply to production environment
5. **Post-verification**: Confirm successful deployment

Include rollback mechanisms at each stage.

### Consequences
- **Positive**: Safe change deployment, comprehensive testing, recovery options
- **Negative**: Complex pipeline management, potential performance overhead
- **Risks**: Pipeline failures, verification suite maintenance

---

## ADR-008: Verification Framework Design

**Date**: 2025-09-19
**Status**: Accepted
**Decision**: Implement multi-level verification to prevent false success claims and ensure actual functionality.

### Context
Previous versions had unrealistic success metrics. Need robust verification that specialists and commands actually work as claimed.

### Decision
Three verification levels:
1. **Structural**: Verify files exist, commands are registered, specialists are defined
2. **Functional**: Test actual specialist invocation, command execution, basic workflows
3. **Integration**: Verify end-to-end workflows, cross-specialist coordination

All verification results logged with timestamps and detailed evidence.

### Consequences
- **Positive**: Honest success reporting, actual functionality validation, debugging capability
- **Negative**: Complex verification suite, maintenance overhead
- **Risks**: False negatives, verification suite bugs, performance impact