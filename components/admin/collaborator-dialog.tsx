'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { collaboratorSchema, CollaboratorInput } from '@/lib/validations'
import { createCollaborator, updateCollaborator } from '@/app/actions/collaborators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'
import { Collaborator } from '@prisma/client'
interface CollaboratorDialogProps {
  collaborator?: Collaborator
  children?: React.ReactNode
}
export function CollaboratorDialog({
  collaborator,
  children,
}: CollaboratorDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollaboratorInput>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues: collaborator
      ? {
        firstName: collaborator.firstName,
        lastName: collaborator.lastName,
        image: collaborator.image,
        description: collaborator.description,
      }
      : undefined,
  })
  const onSubmit = async (data: CollaboratorInput) => {
    setIsSubmitting(true)
    try {
      const result = collaborator
        ? await updateCollaborator(collaborator.id, data)
        : await createCollaborator(data)
      if (result.success) {
        toast.success(
          collaborator
            ? 'Colaborador actualizado correctamente'
            : 'Colaborador creado correctamente'
        )
        setOpen(false)
        reset()
        router.refresh()
      } else {
        toast.error(result.error || 'Error al guardar el colaborador')
      }
    } catch (error) {
      console.log(error)
      toast.error('Ocurrió un error inesperado')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Colaborador
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {collaborator ? 'Editar Colaborador' : 'Nuevo Colaborador'}
          </DialogTitle>
          <DialogDescription>
            {collaborator
              ? 'Actualiza la información del colaborador'
              : 'Agrega un nuevo colaborador artesano'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="Ej: María"
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Ej: González"
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">URL de Imagen *</Label>
            <Input
              id="image"
              {...register('image')}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Cuéntanos sobre este colaborador..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {collaborator ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}