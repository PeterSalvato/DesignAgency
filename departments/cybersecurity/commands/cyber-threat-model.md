# /cyber-threat-model Command

## Usage
```bash
/cyber-threat-model <system> [--methodology=stride|pasta|trike] [--assets=data|systems|people]
```

## Implementation
This command MUST invoke the cybersecurity-specialist agent using the Task tool:

```javascript
// Real Claude Code slash command implementation
export async function execute(args) {
  const result = await Task({
    subagent_type: "general-purpose",
    description: "Cybersecurity threat modeling analysis",
    prompt: `You are the cybersecurity-specialist from departments/cybersecurity/agents/cybersecurity-specialist.md.

System: ${args.system}
Methodology: ${args.methodology || 'stride'}
Focus Assets: ${args.assets || 'data'}

Perform comprehensive threat modeling analysis:

1. **Asset Identification & Classification**
   - Identify critical data, systems, and processes
   - Classify assets by sensitivity and business criticality
   - Map data flows and system interactions
   - Document trust boundaries and entry points

2. **Threat Identification (${args.methodology?.toUpperCase() || 'STRIDE'})**
   ${args.methodology === 'stride' ? `
   - **Spoofing**: Identity verification weaknesses
   - **Tampering**: Data integrity vulnerabilities
   - **Repudiation**: Non-repudiation gaps
   - **Information Disclosure**: Data exposure risks
   - **Denial of Service**: Availability threats
   - **Elevation of Privilege**: Authorization bypasses` : ''}
   ${args.methodology === 'pasta' ? `
   - **Process for Attack Simulation and Threat Analysis**
   - Business objective alignment
   - Application decomposition
   - Threat analysis and scoring
   - Attack enumeration and impact assessment` : ''}

3. **Attack Vector Analysis**
   - External attack surfaces and entry points
   - Internal threats and insider risks
   - Supply chain and third-party risks
   - Social engineering attack vectors

4. **Risk Assessment & Prioritization**
   - Likelihood and impact analysis
   - Business risk quantification
   - Attack complexity assessment
   - Exploitability and discoverability factors

5. **Mitigation Strategy Development**
   - Security control recommendations
   - Defense-in-depth strategy
   - Incident response procedures
   - Monitoring and detection capabilities

6. **Validation & Testing Plan**
   - Penetration testing scope definition
   - Red team exercise scenarios
   - Security control validation methods
   - Continuous threat monitoring approach

Provide actionable security architecture recommendations.
Include specific threats relevant to the technology stack and business context.`
  });

  return result;
}
```

## Expected Output
- Comprehensive threat model with asset classification
- Detailed threat analysis using specified methodology
- Risk-prioritized security recommendations
- Attack scenario documentation
- Security control validation plan

This command provides systematic threat analysis to guide security architecture decisions.