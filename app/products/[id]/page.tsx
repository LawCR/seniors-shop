import { getProductById } from '@/app/actions/products'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductGallery } from '@/components/product-gallery'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Star, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const result = await getProductById(id)

  if (!result.success || !result.data) {
    notFound()
  }

  const product = result.data

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="hover:bg-primary/5">
            <Link href="/catalog" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Volver al Catálogo
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Gallery Section */}
          <div>
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground hover:bg-secondary">
                  {product.category.name}
                </Badge>
                {product.featured && (
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20 gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Destacado
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <p className="text-3xl font-bold text-primary">
                  S/ {product.price.toFixed(2)}
                </p>
                {product.stock > 0 && (
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    Disponible
                  </span>
                )}
              </div>
            </div>

            <div className="prose prose-stone max-w-none text-muted-foreground leading-relaxed text-lg">
              <p>{product.description}</p>
            </div>

            <div className="space-y-6 pt-6 border-t border-border">
              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10">
                  <ShieldCheck className="h-6 w-6 text-accent-foreground/70" />
                  <span className="text-sm font-medium">Hecho a mano</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Envíos a todo el país</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <AddToCartButton
                  product={product}
                  className="w-full h-14 text-lg shadow-lg hover:shadow-xl transition-all"
                />

                {product.stock <= 5 && product.stock > 0 && (
                  <p className="text-sm text-center text-red-500 font-medium">
                    ¡Apresúrate! Solo quedan {product.stock} unidades
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
