const fs = require('fs');
const path = require('path');

/**
 * Agency Discovery System
 * Enables Claude to automatically detect and configure the AI Development Agency
 */
class AgencyDiscovery {

  /**
   * Detect if an AI Development Agency is present in the project
   * @param {string} projectPath - Path to the project directory
   * @returns {Object} Discovery result with agency information
   */
  static async detectAgency(projectPath = '.') {
    try {
      const manifestPath = path.join(projectPath, '.claude-agency', 'manifest.json');

      if (!fs.existsSync(manifestPath)) {
        return {
          found: false,
          reason: 'No manifest found',
          path: manifestPath
        };
      }

      const manifestContent = fs.readFileSync(manifestPath, 'utf8');
      const manifest = JSON.parse(manifestContent);

      // Validate manifest structure
      if (!this.validateManifest(manifest)) {
        return {
          found: false,
          reason: 'Invalid manifest structure',
          path: manifestPath,
          manifest
        };
      }

      // Log discovery
      this.logDiscovery(projectPath, manifest);

      return {
        found: true,
        manifest,
        path: projectPath,
        manifestPath,
        discoveryTime: new Date().toISOString()
      };

    } catch (error) {
      return {
        found: false,
        reason: 'Discovery error',
        error: error.message,
        path: projectPath
      };
    }
  }

  /**
   * Validate manifest structure
   * @param {Object} manifest - Parsed manifest object
   * @returns {boolean} True if valid
   */
  static validateManifest(manifest) {
    const requiredFields = ['version', 'type', 'base_pack'];

    for (const field of requiredFields) {
      if (!manifest[field]) {
        return false;
      }
    }

    if (manifest.type !== 'self-discovering-agency') {
      return false;
    }

    if (!manifest.base_pack.specialists || !Array.isArray(manifest.base_pack.specialists)) {
      return false;
    }

    return true;
  }

  /**
   * Log discovery event
   * @param {string} projectPath - Project path
   * @param {Object} manifest - Agency manifest
   */
  static logDiscovery(projectPath, manifest) {
    const logPath = path.join(projectPath, '.claude-agency', 'logs', 'discovery.log');
    const logEntry = {
      timestamp: new Date().toISOString(),
      event: 'agency_discovered',
      version: manifest.version,
      specialists: manifest.base_pack.specialists.length,
      status: manifest.status
    };

    // Ensure logs directory exists
    const logsDir = path.dirname(logPath);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Append log entry
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
  }

  /**
   * Get available commands for the discovered agency
   * @param {string} projectPath - Project path
   * @returns {Array} List of available commands
   */
  static getAvailableCommands(projectPath = '.') {
    const commandsPath = path.join(projectPath, '.claude-agency', 'commands');

    if (!fs.existsSync(commandsPath)) {
      return [];
    }

    return fs.readdirSync(commandsPath)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  }

  /**
   * Get specialist information
   * @param {string} projectPath - Project path
   * @returns {Array} List of specialists with their capabilities
   */
  static getSpecialists(projectPath = '.') {
    const specialistsPath = path.join(projectPath, '.claude-agency', 'specialists');

    if (!fs.existsSync(specialistsPath)) {
      return [];
    }

    const specialists = [];
    const specialistFiles = fs.readdirSync(specialistsPath).filter(file => file.endsWith('.json'));

    for (const file of specialistFiles) {
      try {
        const specialistPath = path.join(specialistsPath, file);
        const specialist = JSON.parse(fs.readFileSync(specialistPath, 'utf8'));
        specialists.push(specialist);
      } catch (error) {
        console.warn(`Failed to load specialist ${file}:`, error.message);
      }
    }

    return specialists;
  }
}

module.exports = AgencyDiscovery;