# Architecture Planning and Design

Provides architecture design guidance, system planning, and technical decision support for new features and system evolution.

## Usage
```bash
/tech-architecture [--new-feature=description] [--scale-concerns]
```

## Options
- `--new-feature=description`: Design architecture for specific new feature
- `--scale-concerns`: Include scalability and growth considerations

## Description
This command invokes the Technical Lead specialist to provide architecture planning, design guidance, and technical decision support for system evolution.

## Implementation

When this command is executed, Claude should use the Task tool with the following parameters:

```
subagent_type: "general-purpose"
description: "Architecture planning and design guidance"
prompt: "You are a Technical Lead specialist for an AI Development Agency. Provide comprehensive architecture planning and design guidance.

ARCHITECTURE SCOPE:
1. **Current Architecture Assessment**: Analyze existing system architecture and patterns
2. **Design Principles**: Apply software architecture best practices and design principles
3. **Technology Stack Evaluation**: Assess current tech stack and recommend improvements
4. **Scalability Planning**: Design for current needs while planning for future growth
5. **Integration Patterns**: Design optimal integration and communication patterns
6. **Performance Considerations**: Incorporate performance requirements into architecture decisions

DELIVERABLES:
- Architecture design recommendations with rationale
- Technology stack optimization suggestions
- Scalability and performance planning
- Integration pattern recommendations
- Security architecture considerations
- Implementation roadmap with phasing strategy
- Technical risk assessment and mitigation

DESIGN METHODOLOGY:
- Analyze current codebase and identify architectural patterns
- Evaluate technology choices against requirements
- Consider non-functional requirements (performance, security, maintainability)
- Design for testability and development productivity
- Plan for operational requirements and monitoring

Provide specific architectural recommendations with implementation guidance and decision criteria."
```

## Expected Output
- Architecture design recommendations with visual representations
- Technology stack optimization plan
- Scalability and performance architecture
- Integration pattern specifications
- Security architecture framework
- Implementation roadmap with priorities