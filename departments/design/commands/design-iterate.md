# Command: design-iterate

## Description
Automated design iteration workflow that makes changes, captures screenshots, and iteratively improves based on visual feedback

## Usage
```
/design-iterate [component] [--spec=path/to/spec.md] [--max-iterations=5] [--target-viewport=desktop]
```

## Parameters
- `component`: Name or path of the component to iterate on
- `--spec`: Path to design specification or mockup file
- `--max-iterations`: Maximum number of iteration cycles (default: 5)
- `--target-viewport`: Primary viewport for iteration (mobile, tablet, desktop)

## Implementation

This command implements the core iterative design loop:

1. **Initial State Capture**
   - Take screenshot of current component state
   - Document baseline visual appearance
   - Load design specifications and requirements

2. **Analysis Phase**
   - Compare current state to design specifications
   - Identify visual gaps and improvement opportunities
   - Check adherence to design system principles

3. **Implementation Phase**
   - Make targeted code changes to address identified issues
   - Focus on one improvement per iteration cycle
   - Update styles, markup, or component logic as needed

4. **Validation Phase**
   - Take new screenshot after changes
   - Compare before/after visual states
   - Run accessibility and responsive checks

5. **Decision Phase**
   - Evaluate if changes meet acceptance criteria
   - Determine if additional iterations are needed
   - Document progress and remaining issues

6. **Iteration Cycle**
   - Repeat until acceptance criteria are met or max iterations reached
   - Each cycle builds on previous improvements
   - Track progress and decision-making rationale

## Iteration Criteria

### Visual Requirements
- Spacing follows 8px grid system
- Typography uses appropriate hierarchy
- Colors match brand guidelines
- Layout is visually balanced and aligned

### Functional Requirements
- Component works at all specified breakpoints
- Interactive states are properly implemented
- Accessibility requirements are met
- Performance impact is acceptable

### Design System Compliance
- Uses approved design tokens
- Follows established component patterns
- Maintains consistency with existing UI
- Adheres to brand guidelines

## Examples

```bash
# Iterate on a button component with design spec
/design-iterate src/components/Button.tsx --spec=designs/button-spec.md

# Mobile-first iteration with max 3 cycles
/design-iterate LoginForm --target-viewport=mobile --max-iterations=3

# Iterate on entire page component
/design-iterate pages/dashboard.tsx --spec=designs/dashboard-mockup.png
```

## Iteration Process Flow

```
1. Capture Current State
   ↓
2. Analyze vs Specifications
   ↓
3. Identify Improvement Areas
   ↓
4. Make Targeted Changes
   ↓
5. Validate Changes
   ↓
6. Compare Before/After
   ↓
7. Decision: Continue or Complete?
   ↓
8. Repeat or Finalize
```

## Output Documentation

### Iteration Summary
- Number of cycles completed
- Key improvements made each iteration
- Final state compared to initial state
- Remaining items for future iterations

### Visual Progress
- Screenshot comparison for each iteration
- Highlighted areas of change
- Before/after visual diff analysis

### Technical Changes
- Code changes made during iteration
- Files modified and specific improvements
- Performance impact of changes

### Recommendations
- Suggestions for future improvements
- Potential design system updates
- Best practices learned during iteration

## Success Metrics

### Visual Quality
- Alignment and spacing consistency
- Typography and color adherence
- Overall visual polish and balance

### Technical Quality
- Clean, maintainable code
- Proper responsive behavior
- Accessibility compliance

### Process Efficiency
- Number of iterations required
- Time to reach acceptable state
- Quality of automated decision-making

---

*This command embodies the iterative agentic loop that unlocks AI's full design potential through systematic visual feedback and continuous improvement.*