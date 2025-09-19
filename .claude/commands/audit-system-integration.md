# /audit-system-integration Command

## Usage
```bash
/audit-system-integration [--scope=full|quick|targeted] [--focus=data-flow|user-journey|knowledge] [--output=summary|detailed|checklist]
```

## Implementation
This command MUST invoke the audit-specialist agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Comprehensive system integration audit",
    prompt: `You are the audit-specialist from departments/management/agents/audit-specialist.md.

**SYSTEM INTEGRATION AUDIT REQUEST**:
Scope: ${args.scope || 'full'}
Focus Area: ${args.focus || 'comprehensive'}
Output Format: ${args.output || 'detailed'}

Perform comprehensive system integration audit using AUDIT-FRAMEWORK.md:

1. **Data Flow Analysis** (Lifecycle-Complete Review)
   ${args.focus === 'data-flow' || args.focus === 'comprehensive' ? `
   For each specialist, validate:
   - INPUT: Data consumption patterns and sources
   - PROCESSING: Transformation logic and decision-making
   - OUTPUT: Knowledge generation and format
   - PERSISTENCE: Storage mechanisms for generated knowledge
   - FEEDBACK: Knowledge flow back into system

   Red Flags to Identify:
   ❌ One-way data flows (consume but don't contribute back)
   ❌ Generated knowledge that disappears after specialist work
   ❌ No mechanism to update system knowledge with discoveries
   ❌ Knowledge siloed within individual specialist outputs` : ''}

2. **Temporal Validation** (Time-Aware Testing)
   Test system behavior across timepoints:
   - T0: Fresh project integration
   - T1: After 1 week of specialist work
   - T2: After 1 month of active development
   - T3: After 3 months with multiple team members

   Validate at each timepoint:
   - Methodology file accuracy vs actual codebase
   - New team member comprehension ability
   - Specialist recommendation consistency
   - Documentation drift detection

3. **User Journey Auditing**
   ${args.focus === 'user-journey' || args.focus === 'comprehensive' ? `
   Map complete developer experience workflows:
   - New Project Setup journey
   - Active Development workflow (weeks 1-4)
   - Team Expansion scenario (new developer joins)
   - Long-term Evolution (months 2-6)

   Critical Test: Cold Start Scenarios
   - New team member using methodology files only
   - 90% pattern documentation accuracy required
   - Developer productive within 1 day target` : ''}

4. **Knowledge Management Validation**
   ${args.focus === 'knowledge' || args.focus === 'comprehensive' ? `
   Verify bidirectional data flow for all specialists:
   - Knowledge completeness audit
   - Accuracy validation (documentation vs reality)
   - Consistency check across specialists
   - Evolution tracking and pattern updates

   Anti-Patterns to Flag:
   ❌ Specialists that only consume, never contribute
   ❌ Knowledge gaps that grow over time
   ❌ Inconsistencies between specialist understanding and docs` : ''}

5. **System Integration Testing**
   - Multi-specialist coordination validation
   - Knowledge sharing between specialists verification
   - System-wide consistency checks
   - Integration failure point identification

6. **Critical Oversight Prevention**
   Apply mandatory audit questions:
   - Where does generated knowledge go?
   - How does this work over 30+ days?
   - What's the developer experience long-term?
   - Will future team members understand this?
   - How does this interact with other specialists?

7. **Audit Report Generation**
   ${args.output === 'summary' ? `
   **Summary Report**:
   - High-level findings and risk assessment
   - Critical issues requiring immediate attention
   - Priority recommendations for fixes
   - Overall system health score` : ''}

   ${args.output === 'detailed' ? `
   **Detailed Report**:
   - Complete data flow analysis for all specialists
   - Specific examples of identified issues
   - Step-by-step remediation instructions
   - Comprehensive test results and validation` : ''}

   ${args.output === 'checklist' ? `
   **Audit Checklist Format**:
   - Systematic checklist of all validation points
   - Pass/fail status for each audit category
   - Action items for failed checks
   - Verification steps for remediation` : ''}

Execute comprehensive system audit and provide actionable recommendations.
Use AUDIT-FRAMEWORK.md as systematic validation guide.`
  });

  return result;
}
```

## Expected Output
- Comprehensive system integration validation report
- Identification of critical architecture gaps or oversights
- Data flow analysis for all specialists and commands
- User journey validation results with experience gaps
- Knowledge management audit with persistence verification
- Actionable recommendations for system improvements

## Audit Categories

### 1. Data Flow Integrity
```bash
# Validates complete data lifecycle:
- Input source reliability and currency
- Processing logic appropriateness
- Output format usefulness and actionability
- Knowledge persistence mechanisms
- Feedback loops for system improvement
```

### 2. Temporal Consistency
```bash
# Tests system behavior over time:
- Fresh integration functionality
- Short-term adaptation (1 week)
- Medium-term accuracy (1 month)
- Long-term value persistence (3+ months)
```

### 3. User Experience Validation
```bash
# Maps complete developer workflows:
- Project setup and initial integration
- Active development with specialists
- Team expansion and onboarding
- Long-term project evolution
```

### 4. Knowledge Management
```bash
# Ensures comprehensive knowledge handling:
- Bidirectional data flows for all specialists
- Knowledge completeness and accuracy
- Cross-specialist consistency
- Pattern evolution and documentation updates
```

### 5. System Integration
```bash
# Validates system-wide coordination:
- Multi-specialist interaction patterns
- Knowledge sharing mechanisms
- System-wide consistency maintenance
- Integration failure prevention
```

## Critical Success Metrics

- **Data Flow Completeness**: 100% of specialists have validated persistence mechanisms
- **Knowledge Accuracy**: 95%+ accuracy between documentation and actual codebase
- **User Experience**: New team member productive within 1 day using methodology files
- **Temporal Consistency**: Methodology files accurate after 30 days of development
- **Integration Quality**: Zero critical architecture gaps identified

This command provides systematic validation to prevent critical oversights like the methodology auto-update gap that was missed in previous reviews.