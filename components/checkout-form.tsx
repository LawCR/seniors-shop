'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useCartStore } from '@/lib/cart-store'
import { generateWhatsAppURL } from '@/lib/whatsapp'
import { toast } from 'sonner'
import { MessageCircle } from 'lucide-react'

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos').regex(/^\d+$/, 'Solo números'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos'),
  address: z.string().min(5, 'La dirección es muy corta'),
  city: z.string().min(2, 'La ciudad es requerida'),
  paymentMethod: z.enum(['yape', 'plin', 'transferencia', 'efectivo'], {
    error: 'Selecciona un método de pago'
  }),
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutForm() {
  const { items, getTotalPrice } = useCartStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'yape',
    },
  })

  const onSubmit = (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error('El carrito está vacío')
      return
    }

    const orderData = {
      fullName: data.fullName,
      dni: data.dni,
      items: items,
      total: getTotalPrice(),
      paymentMethod: data.paymentMethod,
      address: data.address,
      city: data.city,
    }

    const whatsappUrl = generateWhatsAppURL(orderData)

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    toast.success('¡Pedido generado! Redirigiendo a WhatsApp...')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Datos Personales</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input id="fullName" {...register('fullName')} placeholder="Juan Pérez" />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dni">DNI</Label>
            <Input id="dni" {...register('dni')} placeholder="12345678" maxLength={8} />
            {errors.dni && (
              <p className="text-sm text-destructive">{errors.dni.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono / WhatsApp</Label>
          <Input id="phone" {...register('phone')} placeholder="987654321" type="tel" />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Datos de Envío</h3>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección de Entrega</Label>
          <Input id="address" {...register('address')} placeholder="Av. Principal 123, Dpto 401" />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ciudad / Distrito</Label>
          <Input id="city" {...register('city')} placeholder="Miraflores, Lima" />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notas Adicionales (Opcional)</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Referencia de ubicación, horario preferido, etc."
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Método de Pago</h3>
        <RadioGroup defaultValue="yape" onValueChange={(val) => register('paymentMethod').onChange({ target: { value: val, name: 'paymentMethod' } })}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-accent/5">
              <RadioGroupItem value="yape" id="yape" />
              <Label htmlFor="yape" className="cursor-pointer font-medium">Yape</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-accent/5">
              <RadioGroupItem value="plin" id="plin" />
              <Label htmlFor="plin" className="cursor-pointer font-medium">Plin</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-accent/5">
              <RadioGroupItem value="transferencia" id="transferencia" />
              <Label htmlFor="transferencia" className="cursor-pointer font-medium">Transferencia</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-accent/5">
              <RadioGroupItem value="efectivo" id="efectivo" />
              <Label htmlFor="efectivo" className="cursor-pointer font-medium">Efectivo contra entrega</Label>
            </div>
          </div>
        </RadioGroup>
        {errors.paymentMethod && (
          <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full h-14 text-lg gap-2 shadow-lg hover:scale-[1.02] transition-transform" disabled={isSubmitting}>
        <MessageCircle className="h-5 w-5" />
        Completar Pedido por WhatsApp
      </Button>
    </form>
  )
}
