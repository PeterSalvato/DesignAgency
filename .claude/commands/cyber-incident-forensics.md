# /cyber-incident-forensics Command

## Usage
```bash
/cyber-incident-forensics <incident> [--type=breach|malware|insider] [--preserve=logs|memory|network]
```

## Implementation
This command MUST invoke the cybersecurity-specialist agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Cybersecurity incident forensics investigation",
    prompt: `You are the cybersecurity-specialist from departments/cybersecurity/agents/cybersecurity-specialist.md.

**INCIDENT DETAILS**:
Incident: ${args.incident}
Type: ${args.type || 'breach'}
Evidence Focus: ${args.preserve || 'logs'}

Perform comprehensive digital forensics investigation:

1. **Incident Response & Evidence Preservation**
   - Immediate containment and isolation procedures
   - Evidence preservation and chain of custody
   - Memory dump and disk imaging
   - Network traffic capture and analysis

2. **Timeline Reconstruction**
   - Initial compromise vector identification
   - Attack progression and lateral movement
   - Data access and exfiltration timeline
   - Persistence mechanism analysis

3. **Artifact Analysis**
   - Log file correlation and analysis
   - File system forensics and deleted file recovery
   - Registry analysis and system changes
   - Network connection and communication analysis

4. **Malware & Tool Analysis**
   - Malware sample identification and analysis
   - Attacker tool and technique identification
   - Command and control communication analysis
   - Anti-forensics technique detection

5. **Attribution & Threat Intelligence**
   - Tactics, Techniques, and Procedures (TTP) analysis
   - Indicator of Compromise (IoC) extraction
   - Threat actor profiling and attribution
   - Campaign correlation and threat intelligence

6. **Impact Assessment & Recovery**
   - Data breach scope and affected systems
   - Business impact and regulatory implications
   - System integrity validation
   - Recovery and hardening recommendations

7. **Legal & Compliance Considerations**
   - Evidence admissibility and documentation
   - Regulatory notification requirements
   - Law enforcement coordination protocols
   - Incident disclosure procedures

Provide detailed forensics report with timeline, evidence, and recommendations.
Include specific indicators of compromise and attribution analysis.
Focus on actionable intelligence for prevention and detection improvement.`
  });

  return result;
}
```

## Expected Output
- Comprehensive incident timeline and attack progression
- Detailed digital evidence analysis
- Malware and attacker tool identification
- Indicator of Compromise (IoC) extraction
- Attribution analysis and threat intelligence
- Recovery and hardening recommendations
- Legal and compliance guidance

## Forensics Capabilities

### Digital Evidence Collection
- Memory dump analysis and volatile data capture
- Disk imaging and file system forensics
- Network packet capture and traffic analysis
- Log file preservation and correlation

### Malware Analysis
- Static analysis and reverse engineering
- Dynamic analysis in isolated environments
- Behavioral analysis and capability assessment
- Anti-analysis technique identification

### Attribution Analysis
- Threat actor profiling and campaign correlation
- Infrastructure analysis and attribution indicators
- Code similarity and tool overlap analysis
- Geopolitical context and motivation assessment

This command provides comprehensive incident investigation and forensics capabilities for security incident response.