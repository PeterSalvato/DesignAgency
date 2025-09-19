const fs = require('fs');
const path = require('path');
const AgencyDiscovery = require('./discovery.js');
const TechnologyDetector = require('./detection.js');

/**
 * Agency Verification System
 * Verifies the integrity and functionality of the AI Development Agency
 */
class AgencyVerifier {

  /**
   * Run complete verification suite
   * @param {string} projectPath - Path to the project directory
   * @returns {Object} Verification results
   */
  static async runCompleteVerification(projectPath = '.') {
    const results = {
      timestamp: new Date().toISOString(),
      overall_status: 'pending',
      verification_level: 'structural',
      tests: {},
      summary: {
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };

    try {
      // Run structural verification
      results.tests.structural = await this.runStructuralVerification(projectPath);

      // Run discovery verification
      results.tests.discovery = await this.runDiscoveryVerification(projectPath);

      // Run technology detection verification
      results.tests.technology = await this.runTechnologyVerification(projectPath);

      // Run command verification
      results.tests.commands = await this.runCommandVerification(projectPath);

      // Run specialist verification
      results.tests.specialists = await this.runSpecialistVerification(projectPath);

      // Calculate summary
      this.calculateSummary(results);

      // Determine overall status
      results.overall_status = results.summary.failed === 0 ? 'passed' : 'failed';

      // Log verification results
      this.logVerification(projectPath, results);

      return results;

    } catch (error) {
      results.overall_status = 'error';
      results.error = error.message;
      return results;
    }
  }

  /**
   * Verify basic structural integrity
   */
  static async runStructuralVerification(projectPath) {
    const results = {
      name: 'Structural Verification',
      status: 'passed',
      tests: []
    };

    // Test 1: Manifest exists and is valid
    const manifestTest = {
      name: 'Manifest file exists and valid',
      status: 'failed',
      details: ''
    };

    try {
      const manifestPath = path.join(projectPath, '.claude-agency', 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        if (manifest.type === 'self-discovering-agency') {
          manifestTest.status = 'passed';
          manifestTest.details = `Manifest valid, version: ${manifest.version}`;
        } else {
          manifestTest.details = 'Invalid manifest type';
        }
      } else {
        manifestTest.details = 'Manifest file not found';
      }
    } catch (error) {
      manifestTest.details = `Manifest error: ${error.message}`;
    }
    results.tests.push(manifestTest);

    // Test 2: Required directories exist
    const dirTest = {
      name: 'Required directories exist',
      status: 'passed',
      details: ''
    };

    const requiredDirs = ['commands', 'specialists', 'logs'];
    const missingDirs = [];

    for (const dir of requiredDirs) {
      const dirPath = path.join(projectPath, '.claude-agency', dir);
      if (!fs.existsSync(dirPath)) {
        missingDirs.push(dir);
      }
    }

    if (missingDirs.length > 0) {
      dirTest.status = 'failed';
      dirTest.details = `Missing directories: ${missingDirs.join(', ')}`;
    } else {
      dirTest.details = 'All required directories present';
    }
    results.tests.push(dirTest);

    // Test 3: Core files exist
    const filesTest = {
      name: 'Core system files exist',
      status: 'passed',
      details: ''
    };

    const requiredFiles = ['discovery.js', 'detection.js', 'verify.js'];
    const missingFiles = [];

    for (const file of requiredFiles) {
      const filePath = path.join(projectPath, '.claude-agency', file);
      if (!fs.existsSync(filePath)) {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length > 0) {
      filesTest.status = 'failed';
      filesTest.details = `Missing files: ${missingFiles.join(', ')}`;
    } else {
      filesTest.details = 'All core files present';
    }
    results.tests.push(filesTest);

    // Determine overall status
    results.status = results.tests.every(test => test.status === 'passed') ? 'passed' : 'failed';

    return results;
  }

  /**
   * Verify discovery mechanism
   */
  static async runDiscoveryVerification(projectPath) {
    const results = {
      name: 'Discovery Verification',
      status: 'passed',
      tests: []
    };

    // Test 1: Discovery can find agency
    const discoveryTest = {
      name: 'Agency discovery works',
      status: 'failed',
      details: ''
    };

    try {
      const discovery = await AgencyDiscovery.detectAgency(projectPath);
      if (discovery.found) {
        discoveryTest.status = 'passed';
        discoveryTest.details = `Agency discovered successfully`;
      } else {
        discoveryTest.details = `Discovery failed: ${discovery.reason}`;
      }
    } catch (error) {
      discoveryTest.details = `Discovery error: ${error.message}`;
    }
    results.tests.push(discoveryTest);

    // Test 2: Commands can be enumerated
    const commandsTest = {
      name: 'Commands can be enumerated',
      status: 'failed',
      details: ''
    };

    try {
      const commands = AgencyDiscovery.getAvailableCommands(projectPath);
      if (commands.length >= 10) {
        commandsTest.status = 'passed';
        commandsTest.details = `Found ${commands.length} commands`;
      } else {
        commandsTest.details = `Only found ${commands.length} commands, expected at least 10`;
      }
    } catch (error) {
      commandsTest.details = `Commands enumeration error: ${error.message}`;
    }
    results.tests.push(commandsTest);

    // Test 3: Specialists can be enumerated
    const specialistsTest = {
      name: 'Specialists can be enumerated',
      status: 'failed',
      details: ''
    };

    try {
      const specialists = AgencyDiscovery.getSpecialists(projectPath);
      if (specialists.length >= 5) {
        specialistsTest.status = 'passed';
        specialistsTest.details = `Found ${specialists.length} specialists`;
      } else {
        specialistsTest.details = `Only found ${specialists.length} specialists, expected at least 5`;
      }
    } catch (error) {
      specialistsTest.details = `Specialists enumeration error: ${error.message}`;
    }
    results.tests.push(specialistsTest);

    results.status = results.tests.every(test => test.status === 'passed') ? 'passed' : 'failed';
    return results;
  }

  /**
   * Verify technology detection
   */
  static async runTechnologyVerification(projectPath) {
    const results = {
      name: 'Technology Detection Verification',
      status: 'passed',
      tests: []
    };

    // Test 1: Technology detection runs without error
    const detectionTest = {
      name: 'Technology detection executes',
      status: 'failed',
      details: ''
    };

    try {
      const detection = TechnologyDetector.detectTechnologies(projectPath);
      detectionTest.status = 'passed';
      detectionTest.details = `Detection completed, confidence: ${detection.confidence}%`;
    } catch (error) {
      detectionTest.details = `Detection error: ${error.message}`;
    }
    results.tests.push(detectionTest);

    results.status = results.tests.every(test => test.status === 'passed') ? 'passed' : 'failed';
    return results;
  }

  /**
   * Verify command files
   */
  static async runCommandVerification(projectPath) {
    const results = {
      name: 'Command Verification',
      status: 'passed',
      tests: []
    };

    const expectedCommands = [
      'pm-status', 'pm-planning',
      'tech-review', 'tech-architecture',
      'frontend-review', 'frontend-optimize',
      'backend-review', 'backend-security',
      'qa-test-plan', 'qa-coverage'
    ];

    for (const command of expectedCommands) {
      const commandTest = {
        name: `Command file: ${command}`,
        status: 'failed',
        details: ''
      };

      const commandPath = path.join(projectPath, '.claude-agency', 'commands', `${command}.md`);

      if (fs.existsSync(commandPath)) {
        const content = fs.readFileSync(commandPath, 'utf8');
        if (content.includes('Task tool') && content.includes('subagent_type')) {
          commandTest.status = 'passed';
          commandTest.details = 'Command file valid with Task tool delegation';
        } else {
          commandTest.details = 'Command file missing Task tool implementation';
        }
      } else {
        commandTest.details = 'Command file not found';
      }

      results.tests.push(commandTest);
    }

    results.status = results.tests.every(test => test.status === 'passed') ? 'passed' : 'failed';
    return results;
  }

  /**
   * Verify specialist definitions
   */
  static async runSpecialistVerification(projectPath) {
    const results = {
      name: 'Specialist Verification',
      status: 'passed',
      tests: []
    };

    const expectedSpecialists = [
      'project-manager', 'tech-lead', 'frontend-specialist',
      'backend-specialist', 'qa-engineer'
    ];

    for (const specialist of expectedSpecialists) {
      const specialistTest = {
        name: `Specialist definition: ${specialist}`,
        status: 'failed',
        details: ''
      };

      const specialistPath = path.join(projectPath, '.claude-agency', 'specialists', `${specialist}.json`);

      if (fs.existsSync(specialistPath)) {
        try {
          const content = JSON.parse(fs.readFileSync(specialistPath, 'utf8'));
          if (content.id && content.name && content.capabilities && content.commands) {
            specialistTest.status = 'passed';
            specialistTest.details = `Specialist definition valid with ${content.commands.length} commands`;
          } else {
            specialistTest.details = 'Specialist definition missing required fields';
          }
        } catch (error) {
          specialistTest.details = `Specialist definition parse error: ${error.message}`;
        }
      } else {
        specialistTest.details = 'Specialist definition file not found';
      }

      results.tests.push(specialistTest);
    }

    results.status = results.tests.every(test => test.status === 'passed') ? 'passed' : 'failed';
    return results;
  }

  /**
   * Calculate verification summary
   */
  static calculateSummary(results) {
    for (const testGroup of Object.values(results.tests)) {
      for (const test of testGroup.tests) {
        if (test.status === 'passed') {
          results.summary.passed++;
        } else if (test.status === 'failed') {
          results.summary.failed++;
        } else if (test.status === 'warning') {
          results.summary.warnings++;
        }
      }
    }
  }

  /**
   * Log verification results
   */
  static logVerification(projectPath, results) {
    const logPath = path.join(projectPath, '.claude-agency', 'logs', 'verification.log');
    const logEntry = {
      timestamp: results.timestamp,
      event: 'verification_complete',
      status: results.overall_status,
      summary: results.summary
    };

    // Ensure logs directory exists
    const logsDir = path.dirname(logPath);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Append log entry
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
  }
}

module.exports = AgencyVerifier;