import { getProductById } from '@/app/actions/products'
import { getCategories } from '@/app/actions/categories'
import { ProductForm } from '@/components/admin/product-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params
  const [productResult, categoriesResult] = await Promise.all([
    getProductById(id),
    getCategories(),
  ])

  if (!productResult.success || !productResult.data) {
    notFound()
  }

  const product = productResult.data
  const categories = categoriesResult.success ? categoriesResult.data : []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Producto</h1>
          <p className="text-muted-foreground">
            Actualiza la información del producto
          </p>
        </div>
      </div>

      <ProductForm categories={categories} product={product} />
    </div>
  )
}
