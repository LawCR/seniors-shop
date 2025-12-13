'use client'

import { Product } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { toast } from 'sonner'

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
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
    <Button
      onClick={handleAddToCart}
      disabled={product.stock <= 0}
      className={className}
      size="lg"
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.stock <= 0 ? 'Agotado' : 'Agregar al Carrito'}
    </Button>
  )
}
