export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      company: 'TechCorp',
      image: '/api/placeholder/64/64',
      quote: 'The visual feedback loop completely transformed how I build UIs. Instead of constantly switching between code and browser, I get real-time visual validation that catches issues before they reach production.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Design Systems Lead',
      company: 'StartupFlow',
      image: '/api/placeholder/64/64',
      quote: 'Accessibility testing is now automatic and comprehensive. We went from manual WCAG checks to having every component validated for contrast, keyboard navigation, and screen reader compatibility.',
    },
    {
      name: 'Emily Zhang',
      role: 'UX Engineer',
      company: 'DesignLabs',
      image: '/api/placeholder/64/64',
      quote: 'The iterative design loop is incredible. The AI can run for hours, continuously refining and improving designs based on visual feedback. It\'s like having a tireless design partner.',
    },
  ]

  return (
    <section id="testimonials" className="section bg-neutral-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 mb-6">
            Trusted by Design-Forward Teams
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            See how teams are using visual development workflows to build
            better user experiences with AI-powered design validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.name} className="card">
              {/* Quote */}
              <blockquote className="mb-6">
                <p className="body-text italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <cite className="text-neutral-900 font-semibold not-italic">
                    {testimonial.name}
                  </cite>
                  <p className="text-neutral-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mt-4 pt-4 border-t border-neutral-200">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className="w-4 h-4 text-warning-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-neutral-600 text-sm ml-2">5.0</span>
              </div>
            </article>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-2">50+</div>
            <div className="text-neutral-600">Companies Using</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-2">10k+</div>
            <div className="text-neutral-600">Components Built</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-2">99.9%</div>
            <div className="text-neutral-600">Accessibility Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-2">75%</div>
            <div className="text-neutral-600">Time Savings</div>
          </div>
        </div>
      </div>
    </section>
  )
}