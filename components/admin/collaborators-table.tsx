'use client'
import { Collaborator } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteCollaborator } from '@/app/actions/collaborators'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CollaboratorDialog } from './collaborator-dialog'
interface CollaboratorsTableProps {
  collaborators?: Collaborator[]
}
export function CollaboratorsTable({ collaborators = [] }: CollaboratorsTableProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar a "${name}"?`)) return
    setIsDeleting(id)
    const result = await deleteCollaborator(id)
    if (result.success) {
      toast.success('Colaborador eliminado correctamente')
      router.refresh()
    } else {
      toast.error(result.error || 'Error al eliminar el colaborador')
    }
    setIsDeleting(null)
  }
  if (collaborators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No hay colaboradores registrados</p>
      </div>
    )
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collaborators.map((collaborator) => (
            <TableRow key={collaborator.id}>
              <TableCell>
                <img
                  src={collaborator.image}
                  alt={`${collaborator.firstName} ${collaborator.lastName}`}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">
                {collaborator.firstName}
              </TableCell>
              <TableCell>{collaborator.lastName}</TableCell>
              <TableCell className="max-w-md truncate">
                {collaborator.description}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <CollaboratorDialog collaborator={collaborator}>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </CollaboratorDialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleDelete(
                      collaborator.id,
                      `${collaborator.firstName} ${collaborator.lastName}`
                    )
                  }
                  disabled={isDeleting === collaborator.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}