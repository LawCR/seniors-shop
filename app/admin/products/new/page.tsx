import { getCategories } from '@/app/actions/categories'
import { ProductForm } from '@/components/admin/product-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function NewProductPage() {
  const result = await getCategories()
  const categories = result?.success ? result.data : []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Producto</h1>
          <p className="text-muted-foreground">
            Crea un nuevo producto para la tienda
          </p>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  )
}
