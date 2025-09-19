#!/usr/bin/env node

/**
 * AI Development Agency Integration Script
 *
 * Integrates 30 AI specialists across 13 departments into any existing
 * Claude Code project as a portable development team.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Enhanced error handling
process.on('uncaughtException', (error) => {
  console.error('❌ Unexpected error occurred:');
  console.error(error.message);
  console.error('\n📋 Please report this issue with the full error log.');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled promise rejection:', reason);
  process.exit(1);
});

console.log('🏢 AI Development Agency Integration\n');
console.log('Adding 30 AI specialists across 13 departments to your project...\n');

// Technology Detection System for Expansion Packs
class TechnologyDetector {
  constructor(projectDir) {
    this.projectDir = projectDir;
  }

  async detectFrontend() {
    const detections = [];
    const packageJsonPath = path.join(this.projectDir, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      if (allDeps.react || allDeps.next) {
        detections.push({
          pack: 'frontend-react',
          confidence: 0.9,
          evidence: ['package.json: react/next dependencies']
        });
      }
      if (allDeps.vue) {
        detections.push({
          pack: 'frontend-vue',
          confidence: 0.9,
          evidence: ['package.json: vue dependencies']
        });
      }
      if (allDeps['@angular/core']) {
        detections.push({
          pack: 'frontend-angular',
          confidence: 0.9,
          evidence: ['package.json: angular dependencies']
        });
      }
    }

    // Check for component directories
    if (fs.existsSync(path.join(this.projectDir, 'src/components'))) {
      detections.forEach(d => d.evidence.push('src/components/ directory'));
    }

    return detections;
  }

  async detectBackend() {
    const detections = [];

    // Node.js detection
    if (fs.existsSync(path.join(this.projectDir, 'package.json'))) {
      const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectDir, 'package.json'), 'utf8'));
      const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      if (allDeps.express || allDeps.fastify || allDeps.koa) {
        detections.push({
          pack: 'backend-nodejs',
          confidence: 0.8,
          evidence: ['package.json: Node.js server framework']
        });
      }
    }

    // .NET detection
    const csprojFiles = fs.readdirSync(this.projectDir).filter(f => f.endsWith('.csproj'));
    if (csprojFiles.length > 0) {
      detections.push({
        pack: 'backend-dotnet',
        confidence: 0.9,
        evidence: [`${csprojFiles.length} .csproj files found`]
      });
    }

    // Python detection
    if (fs.existsSync(path.join(this.projectDir, 'requirements.txt')) ||
        fs.existsSync(path.join(this.projectDir, 'pyproject.toml'))) {
      detections.push({
        pack: 'backend-python',
        confidence: 0.8,
        evidence: ['Python requirements/config files']
      });
    }

    // Go detection
    if (fs.existsSync(path.join(this.projectDir, 'go.mod'))) {
      detections.push({
        pack: 'backend-go',
        confidence: 0.9,
        evidence: ['go.mod file']
      });
    }

    return detections;
  }

  async detectDatabase() {
    const detections = [];
    const packageJsonPath = path.join(this.projectDir, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      if (allDeps.pg || allDeps.postgres) {
        detections.push({
          pack: 'database-postgresql',
          confidence: 0.8,
          evidence: ['package.json: PostgreSQL dependencies']
        });
      }
      if (allDeps.mongodb || allDeps.mongoose) {
        detections.push({
          pack: 'database-mongodb',
          confidence: 0.8,
          evidence: ['package.json: MongoDB dependencies']
        });
      }
      if (allDeps.redis) {
        detections.push({
          pack: 'database-redis',
          confidence: 0.7,
          evidence: ['package.json: Redis dependencies']
        });
      }
    }

    return detections;
  }

  async detectCloud() {
    const detections = [];

    // AWS detection
    if (fs.existsSync(path.join(this.projectDir, 'aws.yaml')) ||
        fs.existsSync(path.join(this.projectDir, 'serverless.yml')) ||
        fs.existsSync(path.join(this.projectDir, '.aws'))) {
      detections.push({
        pack: 'cloud-aws',
        confidence: 0.8,
        evidence: ['AWS configuration files']
      });
    }

    // Azure detection
    if (fs.existsSync(path.join(this.projectDir, 'azure-pipelines.yml'))) {
      detections.push({
        pack: 'cloud-azure',
        confidence: 0.8,
        evidence: ['Azure Pipelines configuration']
      });
    }

    // Vercel detection
    if (fs.existsSync(path.join(this.projectDir, 'vercel.json'))) {
      detections.push({
        pack: 'cloud-vercel',
        confidence: 0.9,
        evidence: ['vercel.json configuration']
      });
    }

    return detections;
  }

  async detectAll() {
    console.log('🔍 Analyzing project technology stack...');

    const [frontend, backend, database, cloud] = await Promise.all([
      this.detectFrontend(),
      this.detectBackend(),
      this.detectDatabase(),
      this.detectCloud()
    ]);

    const allDetections = [...frontend, ...backend, ...database, ...cloud];

    // Sort by confidence score
    allDetections.sort((a, b) => b.confidence - a.confidence);

    if (allDetections.length > 0) {
      console.log('📊 Technology Stack Detected:');
      allDetections.forEach(detection => {
        console.log(`   ✨ ${detection.pack} (${Math.round(detection.confidence * 100)}% confidence)`);
        detection.evidence.forEach(evidence => {
          console.log(`      - ${evidence}`);
        });
      });
      console.log('');
    }

    return allDetections;
  }
}

// Enhanced Agency Integrator with Expansion Pack Support
class AgencyIntegrator {
  constructor(projectDir, designTeamDir) {
    this.projectDir = projectDir;
    this.designTeamDir = designTeamDir;
    this.detector = new TechnologyDetector(projectDir);
  }

  async suggestExpansionPacks() {
    const detections = await this.detector.detectAll();

    if (detections.length === 0) {
      console.log('💡 No specific technology stack detected.');
      console.log('   Using base pack with universal specialists.');
      return [];
    }

    const recommendations = detections.filter(d => d.confidence > 0.7);

    if (recommendations.length > 0) {
      console.log('🎯 Recommended Expansion Packs:');
      recommendations.forEach(rec => {
        console.log(`   📦 ${rec.pack}: Enhanced ${rec.pack.split('-')[1]} specialists`);
      });
      console.log('');
      console.log('   Note: Expansion pack system will be available in next release.');
      console.log('   Currently installing base pack with 30 universal specialists.\n');
    }

    return recommendations;
  }
}

// Determine the target project directory (parent of design-team)
const designTeamDir = process.cwd();
const projectDir = path.dirname(designTeamDir);

// Initialize the enhanced integrator
const integrator = new AgencyIntegrator(projectDir, designTeamDir);
const designTeamName = path.basename(designTeamDir);

console.log(`📁 Design Team Directory: ${designTeamDir}`);
console.log(`📁 Target Project Directory: ${projectDir}`);
console.log(`📂 Integration Name: ${designTeamName}\n`);

// Enhanced validation
function validateEnvironment() {
  // Check if we're in the correct directory
  if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
    console.log('❌ No package.json found in parent directory.');
    console.log('   Please run this from within your cloned PortableAgency directory:');
    console.log('   git clone https://github.com/PeterSalvato/PortableAgency ./PortableAgency');
    console.log('   cd PortableAgency && npm run integrate');
    process.exit(1);
  }

  // Check if .claude directory exists in project
  const claudeDir = path.join(projectDir, '.claude');
  if (!fs.existsSync(claudeDir)) {
    console.log('⚠️  No .claude directory found in target project.');
    console.log('   This project may not be configured for Claude Code.');
    console.log('   Creating .claude directory for integration...');
  }

  // Verify we have the required agency files
  const requiredFiles = [
    '.claude/agents',
    '.claude/commands',
    'departments'
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(designTeamDir, file))) {
      console.log(`❌ Missing required agency file: ${file}`);
      console.log('   This doesn\'t appear to be a complete PortableAgency installation.');
      process.exit(1);
    }
  }
}

// Main integration workflow
async function runIntegration() {
  validateEnvironment();

  // Run technology detection and expansion pack suggestions
  await integrator.suggestExpansionPacks();

  // Check if this is a Next.js project
  const hasNextJS = fs.existsSync(path.join(projectDir, 'next.config.js')) ||
                    fs.existsSync(path.join(projectDir, 'next.config.mjs')) ||
                    fs.existsSync(path.join(projectDir, 'next.config.ts'));

  if (!hasNextJS) {
    console.log('⚠️  Target project doesn\'t appear to be Next.js.');
    console.log('   The design team is optimized for Next.js with Tailwind CSS.');
    console.log('   Continuing with integration...\n');
  }

  console.log('📦 Installing design team dependencies...');

  // Read target project's package.json with error handling
  const packageJsonPath = path.join(projectDir, 'package.json');
  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } catch (error) {
    console.log('❌ Failed to read or parse package.json');
    console.log(`   Error: ${error.message}`);
    process.exit(1);
  }

  // Add required dependencies
  const requiredDeps = {
    '@tailwindcss/aspect-ratio': '^0.4.2',
    '@tailwindcss/forms': '^0.5.10',
    '@tailwindcss/typography': '^0.5.16',
  };

  const requiredDevDeps = {
    '@axe-core/playwright': '^4.8.0',
    '@playwright/test': '^1.40.0',
    'autoprefixer': '^10.0.0',
    'postcss': '^8.0.0',
    'tailwindcss': '^3.0.0'
  };

  // Merge dependencies (don't overwrite existing versions)
  packageJson.dependencies = { ...requiredDeps, ...packageJson.dependencies };
  packageJson.devDependencies = { ...requiredDevDeps, ...packageJson.devDependencies };

  // Add design team scripts with namespace
  const designTeamScripts = {
    'design:test': `playwright test --config=${designTeamName}/config/playwright.config.ts`,
    'design:test:ui': `playwright test --config=${designTeamName}/config/playwright.config.ts --ui`,
    'design:visual': `playwright test --config=${designTeamName}/config/playwright.config.ts --project=visual-regression`,
    'design:accessibility': `playwright test --config=${designTeamName}/config/playwright.config.ts --project=accessibility`,
    'design:update-snapshots': `playwright test --config=${designTeamName}/config/playwright.config.ts --update-snapshots`
  };

  packageJson.scripts = { ...packageJson.scripts, ...designTeamScripts };

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('⚙️  Integrating configuration files...');

// Create or update Tailwind config to extend design team config
const tailwindConfigPath = path.join(projectDir, 'tailwind.config.js');
const designTeamTailwindPath = `./${designTeamName}/config/tailwind.base.js`;

let tailwindConfig;
if (fs.existsSync(tailwindConfigPath)) {
  console.log('   📝 Existing Tailwind config found, extending with design team config...');

  // Read existing config and extend it
  const existingConfig = fs.readFileSync(tailwindConfigPath, 'utf8');

  tailwindConfig = `/** @type {import('tailwindcss').Config} */
const designTeamConfig = require('${designTeamTailwindPath}');

// Your existing Tailwind config
const existingConfig = ${existingConfig.replace('module.exports =', '').replace(/^.*@type.*$/m, '').trim()};

// Merge configs with design team base
module.exports = {
  ...designTeamConfig,
  ...existingConfig,
  content: [
    ...designTeamConfig.content,
    ...(existingConfig.content || [])
  ],
  theme: {
    ...designTeamConfig.theme,
    extend: {
      ...designTeamConfig.theme.extend,
      ...(existingConfig.theme?.extend || {})
    }
  },
  plugins: [
    ...designTeamConfig.plugins,
    ...(existingConfig.plugins || [])
  ]
};`;
} else {
  console.log('   📝 Creating new Tailwind config extending design team base...');

  tailwindConfig = `/** @type {import('tailwindcss').Config} */
const designTeamConfig = require('${designTeamTailwindPath}');

module.exports = {
  ...designTeamConfig,
  content: [
    ...designTeamConfig.content,
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ]
};`;
}

fs.writeFileSync(tailwindConfigPath, tailwindConfig);

// Create or update PostCSS config
const postcssConfigPath = path.join(projectDir, 'postcss.config.js');
if (!fs.existsSync(postcssConfigPath)) {
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
  fs.writeFileSync(postcssConfigPath, postcssConfig);
  console.log('   📝 Created PostCSS config');
}

// Update or create CLAUDE.md to include design team
const claudeMdPath = path.join(projectDir, 'CLAUDE.md');
const designTeamClaudeConfig = fs.readFileSync(path.join(designTeamDir, 'CLAUDE.md'), 'utf8');

// Modify the design team config to reference the correct paths
const adaptedConfig = designTeamClaudeConfig
  .replace(/project\//g, `${designTeamName}/project/`)
  .replace(/config\//g, `${designTeamName}/config/`)
  .replace(/context\//g, `${designTeamName}/context/`)
  .replace(/\.claude\//g, `${designTeamName}/.claude/`)
  .replace(/tests\//g, `${designTeamName}/tests/`);

if (fs.existsSync(claudeMdPath)) {
  console.log('   📝 Extending existing CLAUDE.md with design team configuration...');
  const existingClaude = fs.readFileSync(claudeMdPath, 'utf8');

  const mergedClaude = `${existingClaude}

# ========================================
# 🎨 DESIGN TEAM INTEGRATION
# ========================================

${adaptedConfig}`;

  fs.writeFileSync(claudeMdPath, mergedClaude);
} else {
  console.log('   📝 Creating CLAUDE.md with design team configuration...');
  fs.writeFileSync(claudeMdPath, adaptedConfig);
}

console.log('🔗 Setting up design team symlinks...');

// Create symlinks for easy access to design team commands and agents
const claudeDir = path.join(projectDir, '.claude');
if (!fs.existsSync(claudeDir)) {
  fs.mkdirSync(claudeDir, { recursive: true });
}

const agentsDir = path.join(claudeDir, 'agents');
const commandsDir = path.join(claudeDir, 'commands');

if (!fs.existsSync(agentsDir)) {
  fs.mkdirSync(agentsDir, { recursive: true });
}
if (!fs.existsSync(commandsDir)) {
  fs.mkdirSync(commandsDir, { recursive: true });
}

// Copy design team agents and commands with namespacing
const designAgents = fs.readdirSync(path.join(designTeamDir, '.claude/agents'));
const designCommands = fs.readdirSync(path.join(designTeamDir, '.claude/commands'));

designAgents.forEach(agent => {
  const sourcePath = path.join(designTeamDir, '.claude/agents', agent);
  const targetPath = path.join(agentsDir, `design-${agent}`);
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`   📋 Added agent: design-${agent}`);
});

designCommands.forEach(command => {
  const sourcePath = path.join(designTeamDir, '.claude/commands', command);
  const targetPath = path.join(commandsDir, `design-${command}`);

  // Update command content to reference correct paths
  let commandContent = fs.readFileSync(sourcePath, 'utf8');
  commandContent = commandContent
    .replace(/config\//g, `${designTeamName}/config/`)
    .replace(/context\//g, `${designTeamName}/context/`)
    .replace(/tests\//g, `${designTeamName}/tests/`);

  fs.writeFileSync(targetPath, commandContent);
  console.log(`   ⚡ Added command: /design-${command.replace('.md', '')}`);
});

console.log('\n📚 Installing dependencies...');

try {
  process.chdir(projectDir);
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.log('⚠️  Some dependencies may need manual installation');
  console.log('   Run: npm install');
}

console.log('\n🎭 Installing Playwright browsers...');

try {
  execSync('npx playwright install chromium', { stdio: 'inherit' });
  console.log('✅ Playwright browsers installed');
} catch (error) {
  console.log('⚠️  Playwright browsers may need manual installation');
  console.log('   Run: npx playwright install chromium');
}

// Integrate all specialists and commands
console.log('\n🔧 Integrating specialists and specialized commands...');
try {
  execSync('node integrate-specialists.js', {
    cwd: designTeamDir,
    stdio: 'inherit'
  });
  console.log('✅ All specialists and commands integrated successfully');
} catch (error) {
  console.log('⚠️  Some specialist commands may need manual setup');
  console.log(`   Error: ${error.message}`);
}

console.log('\n🎉 AI Development Agency Integration Complete!\n');

console.log('🏢 Your project now has a complete AI development team:');
console.log(`   • 30 AI specialists across 13 departments`);
console.log(`   • Agency located at: ./${designTeamName}/`);
console.log('   • Specialists: Design, Frontend, Backend, CSS, Database, Content, Testing, Management, DevOps, Product, AI/Data, Mobile');
console.log('   • Visual testing: npm run design:test');
console.log('   • Accessibility testing: npm run design:accessibility\n');

console.log('📋 Next steps:');
console.log('   1. Start your development server: npm run dev');
console.log('   2. In Claude Code, try: /design-help or /design-getting-started');
console.log('   3. Use specialists: /design-visual-review, /design-frontend-react, /design-backend-security');
console.log('   4. Run methodology setup: /design-setup-project-methodology');
console.log(`   5. Check ./${designTeamName}/departments/ for all specialists\n`);

console.log('🔧 Available commands:');
console.log('   npm run design:test           # Run all visual tests');
console.log('   npm run design:visual         # Visual regression tests');
console.log('   npm run design:accessibility  # Accessibility audit');
console.log('   npm run design:test:ui        # Interactive test runner');

console.log('\n⚡ Parallel execution available:');
console.log('   /design-parallel-full-review  # Run multiple specialists in parallel');
console.log('   /design-parallel-deployment-readiness  # Pre-deployment checks');

  console.log('\n🎯 Pro tip: The AI Development Agency adapts to your project methodology!');
  console.log('   Create conventions.md and symbol-index.md for optimal specialist recommendations.');
  console.log('   Update the agency: cd PortableAgency && git pull && npm run integrate');
}

// Run the integration
runIntegration().catch(error => {
  console.error('❌ Integration failed:', error.message);
  process.exit(1);
});