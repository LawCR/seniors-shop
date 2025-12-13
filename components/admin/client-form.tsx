'use client'

import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateClient } from '@/app/actions/clients'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Save } from 'lucide-react'

const clientSchema = z.object({
  fullName: z.string().min(2, "El nombre es requerido"),
  phone: z.string().min(9, "El teléfono es requerido"),
  address: z.string().optional(),
  city: z.string().optional(),
})

interface ClientFormProps {
  client: {
    id: string
    fullName: string
    dni: string
    phone: string
    address: string | null
    city: string | null
  }
}

export function ClientForm({ client }: ClientFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      fullName: client.fullName,
      phone: client.phone,
      address: client.address || '',
      city: client.city || '',
    },
  })

  const onSubmit = (data: z.infer<typeof clientSchema>) => {
    startTransition(async () => {
      const result = await updateClient(client.id, data)
      if (result.success) {
        toast.success('Cliente actualizado')
        router.refresh()
      } else {
        toast.error('Error al actualizar')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>DNI (No editable)</Label>
          <Input value={client.dni} disabled className="bg-muted" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre Completo</Label>
          <Input id="fullName" {...register('fullName')} />
          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono / Celular</Label>
          <Input id="phone" {...register('phone')} />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" {...register('city')} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" {...register('address')} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar Cambios
        </Button>
      </div>
    </form>
  )
}
