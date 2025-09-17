export function FeatureSection() {
  const features = [
    {
      name: 'Visual Feedback Loop',
      description: 'Automated screenshot capture and analysis provides real-time visual validation of your design changes.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Accessibility First',
      description: 'Built-in WCAG 2.1 AA compliance testing with automated color contrast and keyboard navigation validation.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      name: 'Responsive Testing',
      description: 'Automated testing across mobile, tablet, and desktop viewports with visual regression detection.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Design System Integration',
      description: 'Enforce design token usage and component consistency across your entire application.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: 'Performance Optimization',
      description: 'Core Web Vitals monitoring with automated performance regression testing and optimization suggestions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: 'Iterative Refinement',
      description: 'AI-powered design iteration loops that continuously improve visual quality and user experience.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ]

  return (
    <section id="features" className="section bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            The Missing 90% of Design Intelligence
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Unlock AI's full visual intelligence through automated browser interaction
            and screenshot-based feedback loops that bridge technical and visual understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="card-hover group"
            >
              {/* Feature Icon */}
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-500 rounded-lg mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-normal">
                {feature.icon}
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.name}
              </h3>
              <p className="body-text">
                {feature.description}
              </p>

              {/* Feature Number */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-neutral-100 text-neutral-500 rounded-full flex items-center justify-center text-sm font-medium group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors duration-normal">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <h3 className="heading-3 text-center mb-12">
            The Iterative Agentic Loop
          </h3>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Input', description: 'Spec, style guide, and context' },
                { step: '02', title: 'Action', description: 'Make code changes and improvements' },
                { step: '03', title: 'Validation', description: 'Screenshot and accessibility testing' },
                { step: '04', title: 'Iteration', description: 'Compare results and refine' },
              ].map((phase, index) => (
                <div key={phase.step} className="text-center relative">
                  {/* Connection Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-primary-400 transform translate-x-0"></div>
                  )}

                  {/* Phase Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-full text-lg font-bold mb-4">
                    {phase.step}
                  </div>

                  {/* Phase Content */}
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                    {phase.title}
                  </h4>
                  <p className="text-neutral-600">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Loop Back Arrow */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center space-x-2 text-primary-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm font-medium">Continuous Improvement Loop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}