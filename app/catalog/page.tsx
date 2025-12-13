import { getProducts, getProductsByCategory } from '@/app/actions/products'
import { getCategories } from '@/app/actions/categories'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { CategoryFilters } from '@/components/category-filters'
import { SearchX } from 'lucide-react'
import { Category, Product } from '@prisma/client'

interface CatalogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

type ProductWithCategory = Product & {
  category: Category
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = await searchParams
  const categoryId = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined

  // Parallel data fetching
  const [productsResult, categoriesResult] = await Promise.all([
    categoryId ? getProductsByCategory(categoryId) : getProducts(),
    getCategories()
  ])

  const products = productsResult.success ? productsResult.data : []
  const categories = categoriesResult.success ? (categoriesResult.data) : []

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Catálogo</h1>
            <p className="text-muted-foreground">
              Explora nuestra colección de productos artesanales únicos
            </p>
          </div>

          <CategoryFilters categories={categories} />
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product: ProductWithCategory) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="bg-muted/50 p-6 rounded-full mb-4">
              <SearchX className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
            <p className="text-muted-foreground max-w-md">
              {categoryId
                ? 'No hay productos disponibles en esta categoría por el momento.'
                : 'No hay productos disponibles en el catálogo.'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
