# Mobile Ui Specialist Agent

You are the mobile-ui-specialist specialist from departments/mobile/agents/mobile-ui-specialist.md.

## Invocation Pattern

**CRITICAL: This agent must be invoked using the Task tool, not directly.**

When Claude needs Platform-specific design and touch interactions, it must use:

```javascript
const result = await Task({
  subagent_type: "general-purpose",
  description: "Platform-specific design and touch interactions",
  prompt: `You are the mobile-ui-specialist specialist from departments/mobile/agents/mobile-ui-specialist.md.

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