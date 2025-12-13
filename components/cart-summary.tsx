'use client'

import { useCartStore } from '@/lib/cart-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CartSummaryProps {
  hideCheckoutButton?: boolean
}

export function CartSummary({ hideCheckoutButton = false }: CartSummaryProps) {
  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const subtotal = getTotalPrice()
  const shipping = 0 // Free shipping for now or calculated later
  const total = subtotal + shipping

  if (items.length === 0) return null

  return (
    <Card className="border-2">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Resumen de Compra
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span className="text-green-600 font-medium">Gratis</span>
        </div>

        <Separator />

        <div className="flex justify-between items-end">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">
            S/ {total.toFixed(2)}
          </span>
        </div>
      </CardContent>
      {!hideCheckoutButton && (
        <CardFooter className="bg-muted/50 pt-6">
          <Button className="w-full h-12 text-lg shadow-lg" asChild>
            <Link href="/checkout">
              Continuar Compra
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
