const fs = require('fs');
const path = require('path');

/**
 * Self-Verification and Best Practices Enforcement System
 * Ensures specialists automatically verify their work and follow best practices
 */
class SelfVerificationSystem {

  /**
   * Get verification requirements for a specialist and task type
   * @param {string} specialistType - Type of specialist (frontend, backend, qa, etc.)
   * @param {string} taskType - Type of task (review, optimize, test, etc.)
   * @returns {Object} Verification requirements and automated checks
   */
  static getVerificationRequirements(specialistType, taskType) {
    const requirements = {
      pre_checks: [],
      post_checks: [],
      automated_tools: [],
      best_practices: [],
      verification_commands: []
    };

    // Frontend specialist verification
    if (specialistType === 'frontend-specialist') {
      if (taskType === 'review' || taskType === 'optimize') {
        requirements.pre_checks = [
          'Check if package.json exists',
          'Verify Node.js project structure',
          'Confirm React/TypeScript setup'
        ];

        requirements.automated_tools = [
          'npm run lint (if available)',
          'npm run typecheck (if available)',
          'npm run build (verify builds successfully)',
          'Bundle analysis for optimization tasks'
        ];

        requirements.post_checks = [
          'Verify no TypeScript errors',
          'Confirm build succeeds',
          'Check bundle size impact',
          'Validate accessibility improvements'
        ];

        requirements.verification_commands = [
          'npm run lint',
          'npm run typecheck',
          'npm run build',
          'npm run test (if available)'
        ];

        requirements.best_practices = [
          'Always run TypeScript compilation check',
          'Verify build succeeds before claiming optimization',
          'Check accessibility impact of changes',
          'Measure performance impact quantitatively',
          'Validate component prop types',
          'Ensure proper error boundaries'
        ];
      }
    }

    // Backend specialist verification
    if (specialistType === 'backend-specialist') {
      if (taskType === 'review' || taskType === 'security') {
        requirements.pre_checks = [
          'Check if server files exist',
          'Verify API endpoint structure',
          'Confirm database configuration'
        ];

        requirements.automated_tools = [
          'npm run lint (if available)',
          'npm run test (if available)',
          'Security vulnerability scan',
          'API endpoint testing'
        ];

        requirements.post_checks = [
          'Verify no security vulnerabilities',
          'Confirm API tests pass',
          'Check database migrations',
          'Validate error handling'
        ];

        requirements.verification_commands = [
          'npm run lint',
          'npm run test',
          'npm audit',
          'API endpoint verification'
        ];

        requirements.best_practices = [
          'Always run security audit',
          'Verify API endpoints respond correctly',
          'Test authentication and authorization',
          'Check input validation',
          'Verify error handling and logging',
          'Confirm database security'
        ];
      }
    }

    // QA Engineer verification
    if (specialistType === 'qa-engineer') {
      if (taskType === 'test-plan' || taskType === 'coverage') {
        requirements.pre_checks = [
          'Check if test framework is configured',
          'Verify test files exist',
          'Confirm CI/CD testing setup'
        ];

        requirements.automated_tools = [
          'npm run test (run all tests)',
          'npm run test:coverage (if available)',
          'npm run test:e2e (if available)',
          'Test result analysis'
        ];

        requirements.post_checks = [
          'Verify all tests pass',
          'Confirm coverage meets thresholds',
          'Check test performance',
          'Validate test reliability'
        ];

        requirements.verification_commands = [
          'npm run test',
          'npm run test:coverage',
          'npm run test:e2e',
          'npx playwright test (if Playwright configured)'
        ];

        requirements.best_practices = [
          'Always run full test suite',
          'Verify test coverage meets minimum thresholds',
          'Check test execution time',
          'Ensure tests are deterministic',
          'Validate accessibility tests',
          'Confirm performance benchmarks'
        ];
      }
    }

    // Design specialist verification (for iterative design)
    if (specialistType === 'design-specialist') {
      if (taskType === 'visual-review' || taskType === 'iterate') {
        requirements.pre_checks = [
          'Check if screenshot capabilities available',
          'Verify design system files exist',
          'Confirm component library setup'
        ];

        requirements.automated_tools = [
          'npx playwright test --headed (visual testing)',
          'Screenshot comparison tools',
          'Accessibility scanning',
          'Design token validation'
        ];

        requirements.post_checks = [
          'Verify visual regression results',
          'Confirm accessibility compliance',
          'Check design system consistency',
          'Validate responsive design'
        ];

        requirements.verification_commands = [
          'npx playwright test',
          'npm run storybook (if available)',
          'Accessibility audit commands',
          'Visual regression testing'
        ];

        requirements.best_practices = [
          'Always capture screenshots for comparison',
          'Run accessibility audits after changes',
          'Verify design system compliance',
          'Test across multiple viewports',
          'Validate color contrast ratios',
          'Ensure keyboard navigation works'
        ];
      }
    }

    return requirements;
  }

  /**
   * Generate self-verification prompt for specialists
   * @param {string} specialistType - Type of specialist
   * @param {string} taskType - Type of task
   * @param {string} originalPrompt - Original task prompt
   * @returns {string} Enhanced prompt with verification requirements
   */
  static generateVerificationPrompt(specialistType, taskType, originalPrompt) {
    const requirements = this.getVerificationRequirements(specialistType, taskType);

    const verificationPrompt = `
${originalPrompt}

CRITICAL: SELF-VERIFICATION REQUIREMENTS
You MUST verify your work using automated tools and best practices. This is not optional.

PRE-TASK VERIFICATION:
${requirements.pre_checks.map(check => `- ${check}`).join('\n')}

AUTOMATED VERIFICATION TOOLS (MUST RUN):
${requirements.verification_commands.map(cmd => `- Run: ${cmd}`).join('\n')}

POST-TASK VERIFICATION:
${requirements.post_checks.map(check => `- ${check}`).join('\n')}

BEST PRACTICES ENFORCEMENT:
${requirements.best_practices.map(practice => `- ${practice}`).join('\n')}

VERIFICATION METHODOLOGY:
1. BEFORE making recommendations, run all applicable verification commands
2. ANALYZE the results and identify any issues
3. If issues found, provide specific fixes and re-verify
4. ONLY provide final recommendations after all verifications pass
5. INCLUDE verification results in your response
6. If any automated tools fail, you MUST address the failures before proceeding

VERIFICATION REPORTING:
- Always include a "Verification Results" section
- Report the output of each verification command
- Explain any failures and how they were resolved
- Provide evidence that best practices were followed

FAILURE HANDLING:
- If verification commands fail, diagnose and fix issues
- Re-run verification after fixes
- Do not proceed with recommendations until verification passes
- If unable to resolve issues, clearly state what prevents completion
`;

    return verificationPrompt;
  }

  /**
   * Get project-specific verification commands
   * @param {string} projectPath - Path to project
   * @returns {Object} Available verification commands in the project
   */
  static getProjectVerificationCommands(projectPath = '.') {
    const availableCommands = {
      package_scripts: [],
      testing_tools: [],
      linting_tools: [],
      build_tools: []
    };

    try {
      // Check package.json for available scripts
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        if (packageJson.scripts) {
          const scripts = Object.keys(packageJson.scripts);

          // Categorize scripts
          availableCommands.package_scripts = scripts;

          if (scripts.includes('test')) availableCommands.testing_tools.push('npm run test');
          if (scripts.includes('test:coverage')) availableCommands.testing_tools.push('npm run test:coverage');
          if (scripts.includes('test:e2e')) availableCommands.testing_tools.push('npm run test:e2e');

          if (scripts.includes('lint')) availableCommands.linting_tools.push('npm run lint');
          if (scripts.includes('typecheck')) availableCommands.linting_tools.push('npm run typecheck');

          if (scripts.includes('build')) availableCommands.build_tools.push('npm run build');
          if (scripts.includes('dev')) availableCommands.build_tools.push('npm run dev');
        }
      }

      // Check for testing frameworks
      const deps = this.getProjectDependencies(projectPath);

      if (deps.includes('playwright')) {
        availableCommands.testing_tools.push('npx playwright test');
      }

      if (deps.includes('jest')) {
        availableCommands.testing_tools.push('npx jest');
      }

      if (deps.includes('vitest')) {
        availableCommands.testing_tools.push('npx vitest run');
      }

    } catch (error) {
      console.warn('Error analyzing project verification commands:', error.message);
    }

    return availableCommands;
  }

  /**
   * Get project dependencies
   * @param {string} projectPath - Path to project
   * @returns {Array} List of dependency names
   */
  static getProjectDependencies(projectPath = '.') {
    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const deps = {
          ...packageJson.dependencies || {},
          ...packageJson.devDependencies || {}
        };
        return Object.keys(deps);
      }
    } catch (error) {
      console.warn('Error reading project dependencies:', error.message);
    }
    return [];
  }

  /**
   * Create verification checklist for a task
   * @param {string} specialistType - Type of specialist
   * @param {string} taskType - Type of task
   * @param {string} projectPath - Path to project
   * @returns {Object} Verification checklist with commands
   */
  static createVerificationChecklist(specialistType, taskType, projectPath = '.') {
    const requirements = this.getVerificationRequirements(specialistType, taskType);
    const projectCommands = this.getProjectVerificationCommands(projectPath);

    return {
      specialist: specialistType,
      task: taskType,
      pre_checks: requirements.pre_checks,
      verification_commands: requirements.verification_commands.filter(cmd => {
        // Only include commands that are available in the project
        if (cmd.startsWith('npm run')) {
          const script = cmd.replace('npm run ', '');
          return projectCommands.package_scripts.includes(script);
        }
        if (cmd.startsWith('npx playwright')) {
          return projectCommands.testing_tools.includes('npx playwright test');
        }
        return true;
      }),
      post_checks: requirements.post_checks,
      best_practices: requirements.best_practices,
      available_tools: projectCommands
    };
  }

  /**
   * Update manifest with verification capabilities
   * @param {string} projectPath - Path to project
   */
  static updateManifestWithVerification(projectPath = '.') {
    try {
      const manifestPath = path.join(projectPath, '.claude-agency', 'manifest.json');

      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

        manifest.verification = {
          self_verification_enabled: true,
          best_practices_enforcement: true,
          automated_tool_integration: true,
          verification_commands: this.getProjectVerificationCommands(projectPath),
          last_updated: new Date().toISOString()
        };

        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      }
    } catch (error) {
      console.warn('Error updating manifest with verification:', error.message);
    }
  }
}

module.exports = SelfVerificationSystem;