'use client'

import { Product, Category } from '@prisma/client'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Eye, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { toast } from 'sonner'
import Link from 'next/link'

type ProductWithCategory = Product & {
  category: Category
}

interface ProductCardProps {
  product: ProductWithCategory
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.stock <= 0) {
      toast.error('Producto sin stock')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      stock: product.stock,
    })

    toast.success('Producto agregado al carrito')
  }

  return (
    <Link href={`/products/${product.id}`} className="block group h-full">
      <div className="relative h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">

        {/* Image Section - Edge to Edge */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {product.images[0] ? (
            <>
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-secondary/10">
              <span className="text-muted-foreground">Sin imagen</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-yellow-400/90 text-yellow-900 border-none backdrop-blur-sm shadow-sm gap-1">
                <Star className="h-3 w-3 fill-current" />
                Destacado
              </Badge>
            )}
            {product.stock <= 0 && (
              <Badge variant="destructive" className="shadow-sm">
                Agotado
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <Eye className="h-4 w-4 text-gray-700" />
            </div>
          </div>

          {/* Quick Add Button & Price on Hover */}
          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full shadow-lg bg-white text-primary hover:bg-primary hover:text-white border-none"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock <= 0 ? 'Sin Stock' : 'Agregar'}
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                {product.category.name}
              </p>
              <h3 className="font-bold text-lg text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-bold text-foreground">
                S/ {product.price.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-2 flex-1">
            {product.description}
          </p>

          <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground group-hover:text-primary transition-colors">
            <span>Ver detalles</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
