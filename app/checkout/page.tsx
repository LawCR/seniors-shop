'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartSummary } from '@/components/cart-summary'
import { CheckoutForm } from '@/components/checkout-form'
import { MessageCircle, ShieldCheck, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)

  // Empty state if accessed directly without items
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-muted rounded-full mb-4">
            <MessageCircle className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-6">Agrega productos para proceder al checkout.</p>
          <Button asChild>
            <Link href="/catalog">Ir al Catálogo</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center max-w-2xl mx-auto relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
            <Button asChild variant="ghost" size="sm">
              <Link href="/cart">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Finalizar Compra</h1>
          <p className="text-muted-foreground">
            Completa tus datos para enviarnos tu pedido por WhatsApp.
            Nos pondremos en contacto contigo para coordinar el pago y la entrega.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
              <CheckoutForm />
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p>Tus datos son tratados con confidencialidad y solo se usan para procesar tu pedido.</p>
            </div>
          </div>

          {/* Cart Summary Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary hideCheckoutButton />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
