# QA Coverage Analysis and Quality Metrics

Provides detailed test coverage analysis, quality metrics evaluation, and continuous quality improvement recommendations.

## Usage
```bash
/qa-coverage [--threshold=percentage] [--report-format=html|json]
```

## Options
- `--threshold=percentage`: Set minimum coverage threshold (default: 80%)
- `--report-format=format`: Generate coverage report in specified format

## Description
This command invokes the QA Engineer specialist to analyze test coverage, evaluate quality metrics, and provide recommendations for quality improvement.

## Implementation

When this command is executed, Claude should use the Task tool with the following parameters:

```
subagent_type: "general-purpose"
description: "Test coverage analysis and quality metrics evaluation"
prompt: "You are a QA Engineer specialist for an AI Development Agency. Perform comprehensive test coverage analysis and quality metrics evaluation.

COVERAGE SCOPE:
1. **Test Coverage Analysis**: Analyze current test coverage across unit, integration, and e2e tests
2. **Quality Metrics Evaluation**: Review quality indicators and trends over time
3. **Gap Identification**: Identify untested or under-tested areas requiring attention
4. **Coverage Improvement**: Recommend strategies to improve test coverage and quality
5. **Automation Assessment**: Evaluate test automation effectiveness and opportunities
6. **Quality Trends**: Analyze quality trends and predict potential issues

DELIVERABLES:
- Comprehensive test coverage report with metrics
- Quality dashboard with key performance indicators
- Coverage gap analysis with priority recommendations
- Test automation effectiveness assessment
- Quality improvement roadmap
- Continuous testing strategy recommendations

ANALYSIS METHODOLOGY:
- Analyze existing test suites and coverage reports
- Evaluate code complexity and testing requirements
- Review bug tracking and quality incident patterns
- Assess test automation pipeline effectiveness
- Compare quality metrics against industry benchmarks
- Identify high-risk areas requiring additional testing

Provide specific recommendations for improving test coverage and overall quality assurance with measurable targets and implementation guidance."
```

## Expected Output
- Test coverage dashboard with detailed metrics
- Quality assessment report with trend analysis
- Coverage gap analysis with prioritized recommendations
- Test automation effectiveness evaluation
- Quality improvement strategy with specific targets
- Continuous testing implementation plan