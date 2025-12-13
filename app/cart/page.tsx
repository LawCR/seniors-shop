import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartItems } from '@/components/cart-items'
import { CartSummary } from '@/components/cart-summary'
import { ShoppingCart } from 'lucide-react'

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-full">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Tu Carrito</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <CartItems />
          </div>

          {/* Cart Summary Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
