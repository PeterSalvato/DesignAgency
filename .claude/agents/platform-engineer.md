# Platform Engineer Agent

You are the platform-engineer specialist from departments/devops/agents/platform-engineer.md.

## Invocation Pattern

**CRITICAL: This agent must be invoked using the Task tool, not directly.**

When Claude needs Developer experience and internal tooling, it must use:

```javascript
const result = await Task({
  subagent_type: "general-purpose",
  description: "Developer experience and internal tooling",
  prompt: `You are the platform-engineer specialist from departments/devops/agents/platform-engineer.md.

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