'use client'
import { Category } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteCategory } from '@/app/actions/categories'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CategoryDialog } from './category-dialog'
type CategoryWithCount = Category & {
  _count: {
    products: number
  }
}
interface CategoriesTableProps {
  categories?: CategoryWithCount[]
}
export function CategoriesTable({ categories }: CategoriesTableProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar la categoría "${name}"?`)) return
    setIsDeleting(id)
    const result = await deleteCategory(id)
    if (result.success) {
      toast.success('Categoría eliminada correctamente')
      router.refresh()
    } else {
      toast.error(result.error || 'Error al eliminar la categoría')
    }
    setIsDeleting(null)
  }
  if (categories?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No hay categorías registradas</p>
      </div>
    )
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{category.slug}</Badge>
              </TableCell>
              <TableCell className="max-w-md truncate">
                {category.description || '-'}
              </TableCell>
              <TableCell>
                <Badge>{category._count.products}</Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <CategoryDialog category={category}>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </CategoryDialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(category.id, category.name)}
                  disabled={isDeleting === category.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}