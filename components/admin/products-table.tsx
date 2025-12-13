'use client'
import { useState } from 'react'
import { Product, Category } from '@prisma/client'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash2, Star } from 'lucide-react'
import Link from 'next/link'
import { deleteProduct, toggleProductFeatured } from '@/app/actions/products'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
type ProductWithCategory = Product & {
  category: Category
}
interface ProductsTableProps {
  products?: ProductWithCategory[]
}
export function ProductsTable({ products = [] }: ProductsTableProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return
    setIsDeleting(id)
    const result = await deleteProduct(id)
    if (result.success) {
      toast.success('Producto eliminado correctamente')
      router.refresh()
    } else {
      toast.error(result.error || 'Error al eliminar el producto')
    }
    setIsDeleting(null)
  }
  const handleToggleFeatured = async (id: string) => {
    const result = await toggleProductFeatured(id)
    if (result.success) {
      toast.success('Estado actualizado correctamente')
      router.refresh()
    } else {
      toast.error(result.error || 'Error al actualizar el estado')
    }
  }
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No hay productos registrados</p>
        <Button asChild className="mt-4">
          <Link href="/admin/products/new">Crear primer producto</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-md bg-muted" />
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>S/ {product.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                  {product.stock}
                </Badge>
              </TableCell>
              <TableCell>
                {product.featured && (
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3" />
                    Destacado
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleToggleFeatured(product.id)}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      {product.featured ? 'Quitar destacado' : 'Marcar destacado'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={isDeleting === product.id}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}