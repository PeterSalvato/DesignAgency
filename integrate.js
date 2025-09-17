#!/usr/bin/env node

/**
 * Design Team Integration Script
 *
 * Integrates the AI-powered visual development workflow into any existing
 * Claude Code project as an imported design team.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎨 Design Team Integration\n');
console.log('Adding AI-powered visual development capabilities to your project...\n');

// Determine the target project directory (parent of design-team)
const designTeamDir = process.cwd();
const projectDir = path.dirname(designTeamDir);
const designTeamName = path.basename(designTeamDir);

console.log(`📁 Design Team Directory: ${designTeamDir}`);
console.log(`📁 Target Project Directory: ${projectDir}`);
console.log(`📂 Integration Name: ${designTeamName}\n`);

// Validate we're in the right place
if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
  console.log('❌ No package.json found in parent directory.');
  console.log('   Please run this from within your cloned design-team directory:');
  console.log('   git clone https://github.com/username/design-team ./design-team');
  console.log('   cd design-team && node integrate.js');
  process.exit(1);
}

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

// Read target project's package.json
const packageJsonPath = path.join(projectDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

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

console.log('\n🎉 Design Team Integration Complete!\n');

console.log('🎨 Your project now has AI-powered visual development capabilities:');
console.log(`   • Design team located at: ./${designTeamName}/`);
console.log('   • Design agents: /design-visual-review, /design-iterate');
console.log('   • Design system: Tailwind extended with design tokens');
console.log('   • Visual testing: npm run design:test');
console.log('   • Accessibility testing: npm run design:accessibility\n');

console.log('📋 Next steps:');
console.log('   1. Start your development server: npm run dev');
console.log('   2. In Claude Code, run: /design-visual-review');
console.log('   3. Begin building with AI design validation');
console.log(`   4. Check ./${designTeamName}/context/ for design guidelines\n`);

console.log('🔧 Available commands:');
console.log('   npm run design:test           # Run all visual tests');
console.log('   npm run design:visual         # Visual regression tests');
console.log('   npm run design:accessibility  # Accessibility audit');
console.log('   npm run design:test:ui        # Interactive test runner');

console.log('\n🎯 Pro tip: The design team operates independently and can be updated');
console.log('   by pulling the latest changes in the design-team directory!');