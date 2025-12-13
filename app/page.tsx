import { Navbar } from '@/components/navbar'
import { HeroCarousel } from '@/components/hero-carousel'
import { OurStory } from '@/components/our-story'
import { ValuesSection } from '@/components/values-section'
import { ObjectivesSection } from '@/components/objectives-section'
import { FeaturedProducts } from '@/components/featured-products'
import { CollaboratorsSection } from '@/components/collaborators-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <HeroCarousel />
        <OurStory />
        <ValuesSection />
        <ObjectivesSection />
        <FeaturedProducts />
        <CollaboratorsSection />
      </main>

      <Footer />
    </div>
  )
}
