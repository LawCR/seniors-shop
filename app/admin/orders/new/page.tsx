import { ManualOrderForm } from '@/components/admin/order-form'

export default function NewOrderPage() {
  return (
    <main className="space-y-6">

      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Registrar Nueva Orden</h1>
          <p className="text-muted-foreground">
            Ingresa los datos del cliente y selecciona los productos comprados.
          </p>
        </div>

        <ManualOrderForm />
      </div>
    </main>
  )
}
