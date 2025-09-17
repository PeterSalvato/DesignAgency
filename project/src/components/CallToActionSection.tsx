import Link from 'next/link'

export function CallToActionSection() {
  return (
    <section className="section bg-gradient-to-r from-primary-500 to-primary-600 text-white">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          {/* CTA Headline */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <br />
            Design Workflow?
          </h2>

          {/* CTA Description */}
          <p className="text-xl text-primary-100 leading-relaxed mb-8 max-w-3xl mx-auto">
            Join thousands of developers who have unlocked the missing 90% of AI design capabilities.
            Start building better UIs with visual feedback loops and automated design validation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="#setup"
              className="bg-white text-primary-600 hover:bg-neutral-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-[56px] inline-flex items-center justify-center"
            >
              Get Started Free
            </Link>
            <Link
              href="#demo"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-[56px] inline-flex items-center justify-center"
            >
              Schedule Demo
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-primary-100">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Free to get started</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Open source</span>
            </div>
          </div>
        </div>

        {/* Bottom Section with Setup Steps */}
        <div className="mt-16 pt-16 border-t border-primary-400">
          <h3 className="text-2xl font-bold text-center mb-8">
            Get Started in 3 Simple Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-400 text-white rounded-full text-xl font-bold mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold mb-2">Install Playwright MCP</h4>
              <p className="text-primary-100">
                Add Playwright MCP to your Claude Code setup for browser automation capabilities.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-400 text-white rounded-full text-xl font-bold mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold mb-2">Configure Claude.md</h4>
              <p className="text-primary-100">
                Set up your visual development workflow with design principles and automation rules.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-400 text-white rounded-full text-xl font-bold mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold mb-2">Start Building</h4>
              <p className="text-primary-100">
                Begin creating beautiful, accessible UIs with AI-powered visual validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}