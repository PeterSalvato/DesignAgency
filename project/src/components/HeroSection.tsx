import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="section bg-gradient-to-br from-primary-50 via-white to-neutral-50">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full" aria-hidden="true"></span>
            <span>AI-Powered Visual Development</span>
          </div>

          {/* Hero Headline */}
          <h1 className="heading-1 mb-6">
            Turn Claude Code into Your Own{' '}
            <span className="text-primary-500">Incredible UI Designer</span>
          </h1>

          {/* Hero Description */}
          <p className="text-xl text-neutral-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Bridge the gap between technical intelligence and visual understanding through
            automated browser interaction, screenshot-based feedback loops, and iterative design validation.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#features"
              className="btn-primary text-lg px-8 py-4"
              aria-describedby="primary-cta-description"
            >
              Start Building Better UIs
            </Link>
            <Link
              href="#demo"
              className="btn-secondary text-lg px-8 py-4"
              aria-describedby="secondary-cta-description"
            >
              Watch Demo
            </Link>
          </div>

          {/* Screen reader descriptions for CTAs */}
          <div className="sr-only">
            <p id="primary-cta-description">
              Get started with our visual development workflow and see immediate improvements in your UI design process
            </p>
            <p id="secondary-cta-description">
              Watch a demonstration of how Playwright MCP integration transforms the design workflow
            </p>
          </div>

          {/* Hero Stats */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">90%</div>
              <div className="text-neutral-600">Design Capabilities Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">10x</div>
              <div className="text-neutral-600">Faster Iterations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">100%</div>
              <div className="text-neutral-600">Accessibility Compliant</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Dashboard Mockup */}
            <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
              {/* Mock Browser Chrome */}
              <div className="bg-neutral-100 px-4 py-3 flex items-center space-x-2 border-b border-neutral-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1 mx-4">
                  <span className="text-neutral-500 text-sm">localhost:3000</span>
                </div>
              </div>

              {/* Mock Content */}
              <div className="p-8 bg-gradient-to-br from-neutral-50 to-white min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                    Visual Development in Action
                  </h2>
                  <p className="text-neutral-600 max-w-md">
                    See real-time visual feedback as you code, with automated accessibility testing and responsive design validation.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-success-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              ✓ Accessible
            </div>
            <div className="absolute -top-4 -right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              ⚡ Fast
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-warning-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              🎨 Beautiful
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}