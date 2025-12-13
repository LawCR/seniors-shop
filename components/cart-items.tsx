'use client'

import { useCartStore } from '@/lib/cart-store'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export function CartItems() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
        <p className="text-muted-foreground mb-4">Tu carrito está vacío</p>
        <Button asChild variant="outline">
          <Link href="/catalog">Explorar Catálogo</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 p-4 bg-card rounded-xl border border-border/50 shadow-sm"
        >
          {/* Image */}
          <div className="h-24 w-24 rounded-lg overflow-hidden bg-muted shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold line-clamp-2">{item.name}</h3>
              <p className="font-bold whitespace-nowrap">
                S/ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between items-end mt-2">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive h-8 w-8"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
