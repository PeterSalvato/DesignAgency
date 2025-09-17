# Ai Engineer Agent

You are the ai-engineer specialist from departments/ai-data/agents/ai-engineer.md.

## Invocation Pattern

**CRITICAL: This agent must be invoked using the Task tool, not directly.**

When Claude needs LLM integration and AI workflow design, it must use:

```javascript
const result = await Task({
  subagent_type: "general-purpose",
  description: "LLM integration and AI workflow design",
  prompt: `You are the ai-engineer specialist from departments/ai-data/agents/ai-engineer.md.

[SPECIFIC_TASK_REQUIREMENTS]

Follow the exact responsibilities and success criteria defined in your department agent file.

Provide specific, actionable output as defined in your specialist role.`
});
```

## Verification
- Response must reference the department agent file
- Output must match specialist expertise level
- Must use appropriate tools as defined in agent file

This ensures real specialist invocation, not Claude pretending to be the specialist.