const fs = require('fs');
const path = require('path');

/**
 * Technology Detection System
 * Automatically detects project technologies to construct appropriate specialist packs
 */
class TechnologyDetector {

  /**
   * Detect all technologies in the project
   * @param {string} projectPath - Path to the project directory
   * @returns {Object} Detection results with confidence scores
   */
  static detectTechnologies(projectPath = '.') {
    const results = {
      detected: false,
      technologies: {},
      confidence: 0,
      detectionTime: new Date().toISOString(),
      methods: []
    };

    // Run detection methods
    const reactTypeScript = this.detectReactTypeScript(projectPath);
    const backend = this.detectBackend(projectPath);
    const database = this.detectDatabase(projectPath);

    // Combine results
    results.technologies = {
      ...reactTypeScript.technologies,
      ...backend.technologies,
      ...database.technologies
    };

    results.methods = [
      ...reactTypeScript.methods,
      ...backend.methods,
      ...database.methods
    ];

    // Calculate overall confidence
    const detectedTechs = Object.values(results.technologies);
    if (detectedTechs.length > 0) {
      results.detected = true;
      results.confidence = Math.round(
        detectedTechs.reduce((sum, tech) => sum + (tech.confidence || 0), 0) / detectedTechs.length
      );
    }

    // Log detection
    this.logDetection(projectPath, results);

    return results;
  }

  /**
   * Detect React and TypeScript
   * @param {string} projectPath - Project path
   * @returns {Object} Detection results
   */
  static detectReactTypeScript(projectPath = '.') {
    const results = {
      technologies: {},
      methods: []
    };

    try {
      const packageJsonPath = path.join(projectPath, 'package.json');

      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        // React Detection
        if (deps.react || deps['@types/react']) {
          results.technologies.react = {
            detected: true,
            confidence: deps.react ? 95 : 80,
            version: deps.react || 'types-only',
            source: 'package.json'
          };
          results.methods.push('package.json-react');
        }

        // Next.js Detection
        if (deps.next || deps['@types/next']) {
          results.technologies.nextjs = {
            detected: true,
            confidence: 90,
            version: deps.next || deps['@types/next'],
            source: 'package.json'
          };
          results.methods.push('package.json-nextjs');
        }

        // TypeScript Detection
        if (deps.typescript || fs.existsSync(path.join(projectPath, 'tsconfig.json'))) {
          const tsconfigExists = fs.existsSync(path.join(projectPath, 'tsconfig.json'));
          results.technologies.typescript = {
            detected: true,
            confidence: deps.typescript && tsconfigExists ? 95 : deps.typescript ? 80 : 70,
            version: deps.typescript || 'configured',
            source: deps.typescript ? 'package.json' : 'tsconfig.json'
          };
          results.methods.push('typescript-detection');
        }

        // Tailwind CSS Detection
        if (deps['tailwindcss'] || fs.existsSync(path.join(projectPath, 'tailwind.config.js'))) {
          results.technologies.tailwind = {
            detected: true,
            confidence: 85,
            version: deps['tailwindcss'] || 'configured',
            source: deps['tailwindcss'] ? 'package.json' : 'config-file'
          };
          results.methods.push('tailwind-detection');
        }
      }

    } catch (error) {
      console.warn('Error detecting React/TypeScript:', error.message);
    }

    return results;
  }

  /**
   * Detect backend technologies
   * @param {string} projectPath - Project path
   * @returns {Object} Detection results
   */
  static detectBackend(projectPath = '.') {
    const results = {
      technologies: {},
      methods: []
    };

    try {
      const packageJsonPath = path.join(projectPath, 'package.json');

      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        // Node.js Detection
        if (packageJson.engines && packageJson.engines.node) {
          results.technologies.nodejs = {
            detected: true,
            confidence: 90,
            version: packageJson.engines.node,
            source: 'package.json-engines'
          };
          results.methods.push('nodejs-engines');
        }

        // Express Detection
        if (deps.express) {
          results.technologies.express = {
            detected: true,
            confidence: 95,
            version: deps.express,
            source: 'package.json'
          };
          results.methods.push('express-detection');
        }

        // Fastify Detection
        if (deps.fastify) {
          results.technologies.fastify = {
            detected: true,
            confidence: 95,
            version: deps.fastify,
            source: 'package.json'
          };
          results.methods.push('fastify-detection');
        }
      }

      // Python Detection
      if (fs.existsSync(path.join(projectPath, 'requirements.txt')) ||
          fs.existsSync(path.join(projectPath, 'pyproject.toml'))) {
        results.technologies.python = {
          detected: true,
          confidence: 85,
          version: 'detected',
          source: 'requirements-or-pyproject'
        };
        results.methods.push('python-detection');
      }

    } catch (error) {
      console.warn('Error detecting backend technologies:', error.message);
    }

    return results;
  }

  /**
   * Detect database technologies
   * @param {string} projectPath - Project path
   * @returns {Object} Detection results
   */
  static detectDatabase(projectPath = '.') {
    const results = {
      technologies: {},
      methods: []
    };

    try {
      const packageJsonPath = path.join(projectPath, 'package.json');

      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        // PostgreSQL Detection
        if (deps.pg || deps['@types/pg'] || deps.postgresql) {
          results.technologies.postgresql = {
            detected: true,
            confidence: 90,
            version: deps.pg || deps.postgresql || 'types-only',
            source: 'package.json'
          };
          results.methods.push('postgresql-detection');
        }

        // MongoDB Detection
        if (deps.mongodb || deps.mongoose) {
          results.technologies.mongodb = {
            detected: true,
            confidence: 90,
            version: deps.mongodb || deps.mongoose,
            source: 'package.json'
          };
          results.methods.push('mongodb-detection');
        }

        // Prisma Detection
        if (deps.prisma || deps['@prisma/client']) {
          results.technologies.prisma = {
            detected: true,
            confidence: 95,
            version: deps.prisma || deps['@prisma/client'],
            source: 'package.json'
          };
          results.methods.push('prisma-detection');
        }
      }

    } catch (error) {
      console.warn('Error detecting database technologies:', error.message);
    }

    return results;
  }

  /**
   * Log detection results
   * @param {string} projectPath - Project path
   * @param {Object} results - Detection results
   */
  static logDetection(projectPath, results) {
    const logPath = path.join(projectPath, '.claude-agency', 'logs', 'detection.log');
    const logEntry = {
      timestamp: new Date().toISOString(),
      event: 'technology_detection',
      detected: results.detected,
      confidence: results.confidence,
      technologies: Object.keys(results.technologies),
      methods: results.methods
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
   * Update manifest with detection results
   * @param {string} projectPath - Project path
   * @param {Object} detectionResults - Results from detectTechnologies
   */
  static updateManifest(projectPath, detectionResults) {
    try {
      const manifestPath = path.join(projectPath, '.claude-agency', 'manifest.json');

      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

        manifest.tech_stack_pack = {
          active: detectionResults.detected,
          detected_technologies: Object.keys(detectionResults.technologies),
          confidence_score: detectionResults.confidence,
          last_detection: detectionResults.detectionTime,
          technologies: detectionResults.technologies
        };

        manifest.last_updated = new Date().toISOString();

        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      }
    } catch (error) {
      console.warn('Error updating manifest with detection results:', error.message);
    }
  }
}

module.exports = TechnologyDetector;