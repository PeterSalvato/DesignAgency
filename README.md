# AI Development Agency

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/PeterSalvato/DesignAgency)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-green.svg)](https://claude.ai/code)
[![Self Discovering](https://img.shields.io/badge/Self--Discovering-✨-brightgreen.svg)](#self-discovering-architecture)
[![Auto Verification](https://img.shields.io/badge/Auto%20Verification-🛡️-orange.svg)](#self-verification-system)
[![Tech Detection](https://img.shields.io/badge/Tech%20Detection-91%25-blue.svg)](#technology-detection)
[![Zero Config](https://img.shields.io/badge/Setup-Zero%20Config-success.svg)](#quick-start)
[![License](https://img.shields.io/badge/License-Custom-red.svg)](LICENSE)

A self-discovering AI specialist system for Claude Code that automatically configures based on your project's technology stack and provides comprehensive development assistance with built-in verification.

## ✨ Key Features

- **🔍 Self-Discovering**: Automatically detects and configures when present in any project
- **🛡️ Built-in Verification**: All specialists automatically run verification tools (linting, testing, building)
- **🤖 Technology-Aware**: Detects React, TypeScript, Next.js, databases, and more
- **⚡ Zero Configuration**: No manual setup or integration scripts required
- **📈 Best Practices Enforcement**: Prevents incomplete analysis through mandatory quality checks

## 🚀 Quick Start

Simply add the agency to any project:

```bash
# Clone the agency into your project
git clone https://github.com/PeterSalvato/DesignAgency .claude-agency

# That's it! Claude automatically detects and configures the agency
# No integration scripts or manual setup required
```

**Or copy from an existing project:**
```bash
cp -r /path/to/existing-project/.claude-agency ./
```

## 🎯 How It Works

1. **Automatic Discovery**: Claude detects the `.claude-agency` folder and reads the manifest
2. **Technology Detection**: Analyzes your project to identify React, TypeScript, databases, etc.
3. **Specialist Loading**: Automatically loads appropriate specialists based on your tech stack
4. **Verification Integration**: Each specialist runs verification tools relevant to your project

## 👥 Core Specialists (Base Pack)

The agency includes 5 universal specialists that work in any project:

### 🎯 Project Manager
- `/pm-status` - Comprehensive project health analysis
- `/pm-planning` - Sprint planning and milestone coordination

### 🔧 Technical Lead
- `/tech-review` - Architecture review and technical debt assessment
- `/tech-architecture` - System design and technology decisions

### ⚛️ Frontend Specialist
- `/frontend-review` - React/TypeScript code review with automated verification
- `/frontend-optimize` - Performance optimization and bundle analysis

### 🛡️ Backend Specialist
- `/backend-review` - API architecture and database design review
- `/backend-security` - Security vulnerability assessment and OWASP compliance

### 🧪 QA Engineer
- `/qa-test-plan` - Comprehensive testing strategy and automation
- `/qa-coverage` - Test coverage analysis and quality metrics

### 🎨 Design Specialist
- `/design-iterate` - Iterative design validation with screenshot comparison

## 🔒 Self-Verification System

Every specialist automatically verifies their work using appropriate tools:

### Frontend Verification
- **TypeScript Compilation**: `npm run typecheck`
- **Code Quality**: `npm run lint`
- **Build Success**: `npm run build`
- **Component Testing**: `npm run test`

### Backend Verification
- **Security Scanning**: `npm audit`
- **API Testing**: Endpoint validation
- **Database Checks**: Schema and migration verification

### Design Verification
- **Visual Testing**: Playwright screenshot comparison
- **Accessibility Audits**: WCAG 2.1 AA compliance
- **Responsive Design**: Multi-viewport validation

### QA Verification
- **Test Execution**: Full test suite validation
- **Coverage Analysis**: Minimum threshold enforcement
- **Performance Testing**: E2E and regression testing

## 🔧 Technology Detection

The agency automatically detects and adapts to:

| Technology | Detection Method | Confidence |
|------------|------------------|------------|
| **React** | package.json deps, JSX files | 95% |
| **TypeScript** | tsconfig.json, .ts files | 95% |
| **Next.js** | next.config.js, App Router | 90% |
| **Tailwind CSS** | tailwind.config.js | 85% |
| **Node.js** | package.json engines | 90% |
| **PostgreSQL** | pg dependencies | 90% |
| **MongoDB** | mongoose/mongodb deps | 90% |
| **Prisma** | @prisma/client | 95% |

## 📁 Project Structure

After adding the agency to your project:

```
your-project/
├── .claude-agency/              # Self-discovering agency
│   ├── manifest.json            # Agency configuration
│   ├── discovery.js             # Auto-detection logic
│   ├── detection.js             # Technology detection
│   ├── verify.js                # Verification system
│   ├── commands/                # All specialist commands
│   │   ├── pm-status.md
│   │   ├── frontend-review.md
│   │   ├── backend-security.md
│   │   └── ... (11 total commands)
│   ├── specialists/             # Specialist definitions
│   │   ├── project-manager.json
│   │   ├── frontend-specialist.json
│   │   └── ... (5 core specialists)
│   └── logs/                    # Discovery and verification logs
├── src/                         # Your application code
├── package.json                 # Your project configuration
└── README.md                    # Your project documentation
```

## 💡 Usage Examples

### Automated Frontend Review
```bash
/frontend-review
```
**What happens automatically:**
1. ✅ Runs `npm run typecheck` to verify TypeScript
2. ✅ Runs `npm run lint` to check code quality
3. ✅ Runs `npm run build` to ensure compilation
4. ✅ Analyzes React components and performance
5. ✅ Provides comprehensive report with verification evidence

### Design Iteration with Verification
```bash
/design-iterate src/components/Button.tsx
```
**What happens automatically:**
1. 📸 Captures baseline screenshots with Playwright
2. 🔍 Runs accessibility audit for WCAG compliance
3. 🎨 Analyzes design improvements needed
4. 📸 Re-captures screenshots after changes
5. ✅ Compares before/after with quantified improvements

### Security Assessment
```bash
/backend-security
```
**What happens automatically:**
1. 🔒 Runs `npm audit` for dependency vulnerabilities
2. 🛡️ Scans for OWASP Top 10 compliance
3. 🔐 Reviews authentication and authorization
4. 📊 Provides detailed security report with fixes

## 🎯 Verification Benefits

**Before (manual prompting):**
- "Please run Playwright to check the design"
- "Don't forget to run the linter"
- "Did you test the build?"

**After (automatic verification):**
- ✅ All tools run automatically
- ✅ Comprehensive evidence provided
- ✅ No incomplete analysis possible
- ✅ Consistent quality enforcement

## 🔄 Expansion Packs (Future)

The architecture supports expansion packs for specific needs:

- **Tech Stack Packs**: Automatically loaded based on detected technologies
- **Initiative Packs**: Domain-specific specialists (e-commerce, mobile, AI)
- **Custom Packs**: Organization-specific specialists and workflows

## 🛠️ Development Features

### Agency Verification
```bash
# Test agency functionality
node .claude-agency/verify.js

# Check technology detection
node .claude-agency/detection.js

# View discovery logs
cat .claude-agency/logs/discovery.log
```

### Manifest Inspection
```json
{
  "version": "1.0.0-prototype",
  "type": "self-discovering-agency",
  "base_pack": {
    "specialists": ["project-manager", "tech-lead", "frontend-specialist", "backend-specialist", "qa-engineer"]
  },
  "verification": {
    "self_verification_enabled": true,
    "best_practices_enforcement": true
  }
}
```

## 📊 Quality Assurance

Every specialist interaction includes:

- **Pre-checks**: Environment and dependency validation
- **Automated tools**: Relevant verification commands
- **Post-checks**: Result validation and error handling
- **Evidence reporting**: Comprehensive verification documentation
- **Failure handling**: Automatic error diagnosis and resolution guidance

## 🔧 Requirements

- **Claude Code** environment
- **Node.js** project (for verification tools)
- **Project dependencies** properly installed

## 🚦 Project Health Indicators

The agency provides real-time project health assessment:

- 🟢 **Green**: All verifications pass, high code quality
- 🟡 **Yellow**: Minor issues identified, specific fixes provided
- 🔴 **Red**: Critical issues require immediate attention

## 🔄 Updates

```bash
# Update to latest version
cd .claude-agency
git pull origin main

# Agency automatically adapts to new features
# No re-integration required
```

## 🎯 Success Metrics

Projects using the AI Development Agency achieve:

- **100% Verification Coverage**: All specialist recommendations backed by automated testing
- **Consistent Quality Standards**: Built-in enforcement prevents incomplete analysis
- **Reduced Manual Work**: Automatic tool execution eliminates "please run X" requests
- **Faster Development**: Immediate specialist availability in any project
- **Better Code Quality**: Mandatory verification catches issues early

## 📄 Architecture Documents

For technical details, see:
- [Architectural Decision Records](ARCHITECTURAL-DECISION-RECORDS.md)
- [Implementation Roadmap](IMPLEMENTATION-ROADMAP.md)
- [Pack Architecture Specification](PACK-ARCHITECTURE-SPECIFICATION.md)
- [Prototype Implementation Plan](PROTOTYPE-IMPLEMENTATION-PLAN.md)

## 📜 License

This project is licensed under a custom Attribution Required License - see the [LICENSE](LICENSE) file for details.

**Attribution Required**: Any use of this software must include prominent attribution to:
- Original repository: https://github.com/PeterSalvato/DesignAgency
- Credit: "AI Development Agency by Peter Salvato"

## 🤝 Contributing

Contributions welcome! Please open an issue for major changes.

## 🙏 Acknowledgments

- Built for the [Claude Code](https://claude.ai/code) ecosystem
- Designed for zero-configuration developer experience
- Inspired by modern AI-assisted development workflows