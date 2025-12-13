import { getCategories } from '@/app/actions/categories'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoriesTable } from '@/components/admin/categories-table'
import { CategoryDialog } from '@/components/admin/category-dialog'
export default async function CategoriesPage() {
  const result = await getCategories()
  const categories = result.success ? result.data : []
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
          <p className="text-muted-foreground">
            Gestiona las categorías de productos
          </p>
        </div>
        <CategoryDialog />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesTable categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}