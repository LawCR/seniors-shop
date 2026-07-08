import { Navbar } from '@/components/navbar'
import { HeroCarousel } from '@/components/hero-carousel'
import { OurStory } from '@/components/our-story'
import { IngredientsSection } from '@/components/ingredients-section'
import { ValuesSection } from '@/components/values-section'
import { ObjectivesSection } from '@/components/objectives-section'
import { FeaturedProducts } from '@/components/featured-products'
import { CollaboratorsSection } from '@/components/collaborators-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      <main>
        <HeroCarousel />
        <OurStory />
        <IngredientsSection />
        <ValuesSection />
        <ObjectivesSection />
        <FeaturedProducts />
        <CollaboratorsSection />
      </main>

      <Footer />
    </div>
  )
}
