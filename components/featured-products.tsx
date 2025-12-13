import { getFeaturedProducts } from '@/app/actions/products'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { ProductCard } from './product-card'

export async function FeaturedProducts() {
  const result = await getFeaturedProducts(3)
  const products = result.success ? result.data : []

  if (products?.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background -z-10" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <Star className="h-4 w-4 text-secondary fill-current" />
            <span className="text-sm font-medium text-secondary">Lo Mejor de Nuestra Colección</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre algunas de nuestras creaciones más especiales, hechas con amor y dedicación
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="shadow-lg group">
            <Link href="/catalog">
              Ver Catálogo Completo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
