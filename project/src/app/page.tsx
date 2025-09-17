import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { FeatureSection } from '@/components/FeatureSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { CallToActionSection } from '@/components/CallToActionSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>

      <Header />

      <main id="main-content" role="main">
        <HeroSection />
        <FeatureSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>

      <Footer />
    </>
  )
}