#!/usr/bin/env node

/**
 * AI Development Agency - Base Pack Definition
 *
 * Defines which specialists belong in the base pack (universal) vs expansion packs (technology-specific).
 * This enables the modular expansion pack architecture.
 */

// Base Pack Specialists - Universal, technology-agnostic capabilities
const BASE_PACK_SPECIALISTS = {
  // Management & Coordination (Technology-Agnostic)
  management: [
    'project-coordinator',    // Cross-team coordination
    'tech-lead',             // Architecture decisions
    'methodology-specialist', // Project standards discovery
    'methodology-maintainer', // Live documentation updates
    'audit-specialist'       // System validation
  ],

  // Quality Assurance (Universal)
  testing: [
    'test-engineer',         // Testing patterns and TDD
    'qa-automation'         // E2E and integration testing
  ],

  // Security (Universal)
  cybersecurity: [
    'cybersecurity-specialist'  // Security testing and threat modeling
  ],

  // Content & Design (Technology-Agnostic)
  content: [
    'copywriter',           // UI/UX copy optimization
    'brand-strategist'      // Brand voice and messaging
  ],

  design: [
    'accessibility-specialist'  // WCAG compliance (universal)
  ]
};

// Technology-Specific Specialists for Expansion Packs
const EXPANSION_PACK_SPECIALISTS = {
  // Frontend Technology Specialists
  'frontend-react': {
    frontend: ['react-architect'],
    design: ['design-reviewer'],        // Visual design needs frontend context
    css: ['css-specialist']             // CSS optimization is frontend-specific
  },

  'frontend-vue': {
    frontend: ['vue-architect'],
    design: ['design-reviewer'],
    css: ['css-specialist']
  },

  'frontend-angular': {
    frontend: ['angular-architect'],
    design: ['design-reviewer'],
    css: ['css-specialist']
  },

  // Backend Technology Specialists
  'backend-nodejs': {
    backend: ['nodejs-architect', 'nodejs-performance'],
    database: ['query-optimizer']       // Database optimization needs backend context
  },

  'backend-dotnet': {
    backend: ['dotnet-architect', 'aspnet-specialist', 'entityframework-specialist'],
    database: ['query-optimizer'],
    devops: ['azure-devops']           // .NET often uses Azure
  },

  'backend-python': {
    backend: ['python-architect', 'django-specialist'],
    database: ['query-optimizer'],
    'ai-data': ['ai-engineer', 'data-engineer']  // Python strong in AI/Data
  },

  'backend-go': {
    backend: ['go-architect', 'microservices-specialist'],
    database: ['query-optimizer'],
    devops: ['kubernetes-specialist']   // Go popular for microservices
  },

  // Database Technology Specialists
  'database-postgresql': {
    database: ['postgres-architect', 'postgres-performance']
  },

  'database-mongodb': {
    database: ['mongodb-architect', 'nosql-specialist']
  },

  'database-redis': {
    database: ['redis-specialist', 'cache-architect']
  },

  // Cloud Platform Specialists
  'cloud-aws': {
    devops: ['aws-architect', 'lambda-specialist', 'aws-security'],
    backend: ['serverless-architect']
  },

  'cloud-azure': {
    devops: ['azure-architect', 'azure-functions', 'azure-security'],
    backend: ['dotnet-cloud-architect']
  },

  'cloud-gcp': {
    devops: ['gcp-architect', 'cloud-functions', 'gcp-security'],
    'ai-data': ['ml-ops-specialist']    // GCP strong in ML
  },

  // Mobile Platform Specialists
  'mobile-react-native': {
    mobile: ['react-native-architect', 'mobile-ui-specialist'],
    frontend: ['react-architect']       // Shared React knowledge
  },

  'mobile-flutter': {
    mobile: ['flutter-architect', 'dart-specialist', 'mobile-ui-specialist']
  },

  'mobile-ios': {
    mobile: ['ios-architect', 'swift-specialist', 'apple-ui-specialist']
  },

  'mobile-android': {
    mobile: ['android-architect', 'kotlin-specialist', 'material-ui-specialist']
  }
};

// Pack Compatibility Rules
const PACK_COMPATIBILITY = {
  // Frontend packs are mutually exclusive
  conflicts: [
    ['frontend-react', 'frontend-vue', 'frontend-angular'],
    ['mobile-ios', 'mobile-android'], // Native mobile is exclusive
  ],

  // Pack dependencies
  dependencies: {
    'mobile-react-native': ['frontend-react'],  // RN needs React knowledge
    'backend-dotnet': ['cloud-azure'],          // .NET + Azure common combo
    'backend-python': ['database-postgresql']   // Python + PostgreSQL common
  },

  // Recommended combinations
  recommendations: {
    'frontend-react': ['backend-nodejs', 'database-postgresql'],
    'backend-dotnet': ['cloud-azure', 'database-sqlserver'],
    'backend-python': ['cloud-aws', 'database-postgresql'],
    'mobile-react-native': ['frontend-react', 'backend-nodejs']
  }
};

// Calculate specialist distribution
function getPackStatistics() {
  const baseCount = Object.values(BASE_PACK_SPECIALISTS)
    .reduce((total, specialists) => total + specialists.length, 0);

  const expansionStats = Object.entries(EXPANSION_PACK_SPECIALISTS)
    .map(([packName, departments]) => ({
      pack: packName,
      specialists: Object.values(departments)
        .reduce((total, specialists) => total + specialists.length, 0)
    }));

  return {
    basePackSpecialists: baseCount,
    expansionPacks: expansionStats,
    totalCurrentSpecialists: 30, // Current monolithic system
    modularAdvantage: 'Users get only relevant specialists for their stack'
  };
}

module.exports = {
  BASE_PACK_SPECIALISTS,
  EXPANSION_PACK_SPECIALISTS,
  PACK_COMPATIBILITY,
  getPackStatistics
};

// CLI usage
if (require.main === module) {
  console.log('🏗️ AI Development Agency - Base Pack Analysis\n');

  const stats = getPackStatistics();

  console.log(`📊 Specialist Distribution:`);
  console.log(`   Base Pack (Universal): ${stats.basePackSpecialists} specialists`);
  console.log(`   Current Monolithic: ${stats.totalCurrentSpecialists} specialists\n`);

  console.log('🎯 Base Pack Specialists (Always Included):');
  Object.entries(BASE_PACK_SPECIALISTS).forEach(([dept, specialists]) => {
    console.log(`   ${dept}: ${specialists.join(', ')}`);
  });

  console.log('\n📦 Available Expansion Packs:');
  stats.expansionPacks.forEach(pack => {
    console.log(`   ${pack.pack}: +${pack.specialists} specialists`);
  });

  console.log('\n✨ Example Configurations:');
  console.log('   React Project: 15 base + 8 React = 23 specialists (focused)');
  console.log('   .NET Project: 15 base + 10 .NET + 6 Azure = 31 specialists');
  console.log('   Python Project: 15 base + 8 Python + 4 PostgreSQL = 27 specialists');
  console.log('   vs Current: 30 specialists (many irrelevant)\n');

  console.log('🎯 Modular Advantage: Users get perfect fit for their technology stack!');
}