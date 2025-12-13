'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProductSearch } from '@/components/admin/product-search'
import { ShoppingCart, Trash2, UserPlus, Search, Loader2 } from 'lucide-react'
import { createManualOrder, getClientByDni } from '@/app/actions/orders'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const clientSchema = z.object({
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
  fullName: z.string().min(2, 'El nombre es requerido'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos'),
  address: z.string().optional(),
  city: z.string().optional(),
})

type ClientFormData = z.infer<typeof clientSchema>

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export function ManualOrderForm() {
  const router = useRouter()
  const [items, setItems] = useState<OrderItem[]>([])
  const [lookingUpClient, setLookingUpClient] = useState(false)
  const [clientFound, setClientFound] = useState(false)
  console.log(lookingUpClient)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  })

  // Watch DNI for auto-lookup
  const dni = watch('dni')
  const isValidDni = !!dni && dni?.length === 8

  useEffect(() => {
    const lookupClient = async () => {
      if (dni?.length === 8) {
        setLookingUpClient(true)
        const result = await getClientByDni(dni)
        setLookingUpClient(false)

        if (result.success && result.data) {
          toast.success('Cliente encontrado')
          setClientFound(true)
          setValue('fullName', result.data.fullName)
          setValue('phone', result.data.phone)
          setValue('address', result.data.address || '')
          setValue('city', result.data.city || '')
        } else {
          setClientFound(false)
          // Don't reset fields if not found, allowing manual entry,
          // but maybe notify it's a new client
          toast.info('Cliente nuevo, por favor complete los datos')
        }
      }
    }
    lookupClient()
  }, [dni, setValue])

  const handleAddProduct = (product: any) => {
    setItems(current => {
      const existing = current.find(item => item.id === product.id)
      if (existing) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...current, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0]
      }]
    })
  }

  const handleRemoveItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems(current => current.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const onSubmit = async (data: ClientFormData) => {
    if (items.length === 0) {
      toast.error('Debe agregar al menos un producto')
      return
    }

    try {
      const orderData = {
        client: data,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total
      }

      const result = await createManualOrder(orderData)

      if (result.success) {
        toast.success('Orden registrada exitosamente')
        router.push('/admin/orders')
        router.refresh()
      } else {
        toast.error(result.error || 'Error al crear la orden')
      }
    } catch (error) {
      toast.error('Ocurrió un error inesperado')
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Product Selection Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProductSearch onSelect={handleAddProduct} />

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2 text-sm font-medium grid grid-cols-12 gap-4">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-center">Cant.</div>
                <div className="col-span-2 text-right">Precio</div>
                <div className="col-span-2"></div>
              </div>
              <div className="divide-y">
                {items.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No hay productos seleccionados
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="p-4 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted overflow-hidden shrink-0">
                          {item.image && (
                            <img src={item.image} alt="" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <span className="font-medium line-clamp-1">{item.name}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </Button>
                        <span className="w-4 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="col-span-2 text-right font-medium">
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="col-span-2 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive/90"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {items.length > 0 && (
                <div className="bg-muted/50 p-4 flex justify-between items-center border-t">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-primary">
                    S/ {total.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Info Column */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Datos del Cliente
              </CardTitle>
              <CardDescription>
                Ingrese el DNI del cliente para buscar sus datos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                <div className="relative">
                  <Input
                    id="dni"
                    {...register('dni')}
                    placeholder="Ingrese 8 dígitos"
                    maxLength={8}
                  />

                  {lookingUpClient && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  )}
                </div>
                {errors.dni && (
                  <p className="text-sm text-destructive">{errors.dni.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  disabled={lookingUpClient || !isValidDni}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono / Celular</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  disabled={lookingUpClient || !isValidDni}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección (Opcional)</Label>
                <Input
                  id="address"
                  {...register('address')}
                  disabled={lookingUpClient || !isValidDni}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ciudad (Opcional)</Label>
                <Input
                  id="city"
                  {...register('city')}
                  disabled={lookingUpClient || !isValidDni}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || items.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Registrar Orden'
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
