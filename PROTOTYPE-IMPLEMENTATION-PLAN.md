# Prototype Implementation Plan

## Prototype Scope

### Minimum Viable Agency (MVA)
Focus on core functionality that demonstrates the self-discovering architecture:

1. **Agency Discovery**: Claude automatically detects and configures agency
2. **Base Pack Loading**: 5 essential specialists instead of 11 for prototype
3. **Basic Technology Detection**: React/TypeScript detection only
4. **Single Command per Specialist**: One working command per specialist
5. **Basic Verification**: Structural verification only

### Prototype Goals
- Prove self-discovering architecture works
- Validate Task tool delegation pattern
- Test technology detection accuracy
- Demonstrate seamless user experience

---

## Implementation Strategy

### Phase 1A: Core Discovery (Week 1)
**Duration**: 5 days
**Goal**: Get basic agency discovery working

#### Day 1-2: Manifest System
```javascript
// .claude-agency/manifest.json (minimal)
{
  "version": "1.0.0-prototype",
  "type": "self-discovering-agency",
  "status": "prototype",
  "base_pack": {
    "active": true,
    "specialists": ["project-manager", "tech-lead", "frontend-specialist", "backend-specialist", "qa-engineer"]
  }
}
```

#### Day 3-4: Discovery Logic
```javascript
// .claude-agency/discovery.js
class AgencyDiscovery {
  static async detectAgency(projectPath = '.') {
    const manifestPath = path.join(projectPath, '.claude-agency', 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      return { found: true, manifest, path: projectPath };
    }
    return { found: false };
  }
}
```

#### Day 5: Claude Integration Test
- Test that Claude can read manifest and understand agency presence
- Verify discovery works in different project structures

### Phase 1B: Base Pack Implementation (Week 2)
**Duration**: 5 days
**Goal**: Get 5 core specialists working

#### Specialists to Implement:
1. **Project Manager**: `/pm-status`, `/pm-planning`
2. **Tech Lead**: `/tech-review`, `/tech-architecture`
3. **Frontend Specialist**: `/frontend-review`, `/frontend-optimize`
4. **Backend Specialist**: `/backend-review`, `/backend-security`
5. **QA Engineer**: `/qa-test-plan`, `/qa-coverage`

#### Command File Structure:
```
.claude-agency/
├── commands/
│   ├── pm-status.md
│   ├── pm-planning.md
│   ├── tech-review.md
│   ├── tech-architecture.md
│   ├── frontend-review.md
│   ├── frontend-optimize.md
│   ├── backend-review.md
│   ├── backend-security.md
│   ├── qa-test-plan.md
│   └── qa-coverage.md
└── specialists/
    ├── project-manager.json
    ├── tech-lead.json
    ├── frontend-specialist.json
    ├── backend-specialist.json
    └── qa-engineer.json
```

#### Implementation Pattern:
Each command file uses Task tool delegation:
- Proper subagent_type specification
- Clear task description
- Detailed specialist prompt
- Expected deliverables defined

---

## Technology Detection (Minimal)

### React/TypeScript Detection
```javascript
// .claude-agency/detection.js
class TechnologyDetector {
  static detectReactTypeScript(projectPath = '.') {
    const packageJsonPath = path.join(projectPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) return { detected: false };

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    const hasReact = deps.react || deps['@types/react'];
    const hasTypeScript = deps.typescript || fs.existsSync(path.join(projectPath, 'tsconfig.json'));

    return {
      detected: hasReact || hasTypeScript,
      technologies: {
        react: !!hasReact,
        typescript: !!hasTypeScript
      },
      confidence: hasReact && hasTypeScript ? 95 : hasReact ? 80 : hasTypeScript ? 60 : 0
    };
  }
}
```

---

## Directory Structure (Prototype)

```
.claude-agency/
├── manifest.json                 # Agency configuration
├── discovery.js                  # Detection logic
├── detection.js                  # Technology detection
├── verify.js                     # Basic verification
├── commands/                     # All specialist commands
│   ├── pm-status.md
│   ├── pm-planning.md
│   ├── tech-review.md
│   ├── tech-architecture.md
│   ├── frontend-review.md
│   ├── frontend-optimize.md
│   ├── backend-review.md
│   ├── backend-security.md
│   ├── qa-test-plan.md
│   └── qa-coverage.md
├── specialists/                  # Specialist definitions
│   ├── project-manager.json
│   ├── tech-lead.json
│   ├── frontend-specialist.json
│   ├── backend-specialist.json
│   └── qa-engineer.json
└── logs/                        # Discovery and verification logs
    ├── discovery.log
    └── verification.log
```

---

## Testing Strategy

### 1. Agency Discovery Tests
- Test in React project
- Test in TypeScript project
- Test in vanilla JavaScript project
- Test in empty directory
- Test with corrupted manifest

### 2. Command Execution Tests
- Test each of the 10 commands
- Verify Task tool delegation works
- Confirm specialist responses are valuable
- Check command help and documentation

### 3. Technology Detection Tests
- React + TypeScript project (should detect both)
- React only project (should detect React)
- TypeScript only project (should detect TypeScript)
- Plain JavaScript project (should detect neither)

### 4. User Experience Tests
- Claude discovers agency without user intervention
- Commands are available immediately after discovery
- Help system works for all commands
- Error messages are clear and actionable

---

## Success Criteria (Prototype)

### Technical Success
- [ ] Claude automatically detects agency in 100% of test cases
- [ ] All 10 commands execute successfully
- [ ] Technology detection accuracy >90% for React/TypeScript
- [ ] No false positive agency detection

### User Experience Success
- [ ] Zero manual configuration required
- [ ] Commands work immediately after project clone
- [ ] Clear indication of available specialists
- [ ] Helpful error messages for any failures

### Code Quality Success
- [ ] Clean, maintainable code structure
- [ ] Clear separation of concerns
- [ ] Comprehensive error handling
- [ ] Good documentation for future expansion

---

## Risk Management

### High Risks
1. **Task Tool Reliability**: What if Task tool fails?
   - *Mitigation*: Fallback to basic responses, clear error messages

2. **Discovery Performance**: What if discovery is slow?
   - *Mitigation*: Cache results, lazy loading, timeout handling

3. **Command Conflicts**: What if user has existing commands?
   - *Mitigation*: Namespace all commands with prefixes

### Medium Risks
1. **Technology Detection Accuracy**: False positives/negatives
   - *Mitigation*: Conservative confidence scoring, manual overrides

2. **Manifest Corruption**: What if manifest becomes invalid?
   - *Mitigation*: Schema validation, backup manifests, recovery mode

### Low Risks
1. **Specialist Response Quality**: Variable specialist effectiveness
   - *Mitigation*: Iterative prompt refinement, user feedback collection

---

## Next Steps After Prototype

1. **Full Base Pack**: Expand to all 11 universal specialists
2. **Dynamic Tech Stack Packs**: Full technology detection
3. **Initiative Packs**: User-selectable domain packs
4. **Advanced Verification**: Functional and integration testing
5. **Change Management**: Backup, rollback, impact analysis
6. **Progressive Disclosure**: Adaptive complexity based on user proficiency

The prototype will validate core assumptions and provide foundation for the complete system implementation.