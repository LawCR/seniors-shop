import { getCollaborators } from '@/app/actions/collaborators'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CollaboratorsTable } from '@/components/admin/collaborators-table'
import { CollaboratorDialog } from '@/components/admin/collaborator-dialog'
export default async function CollaboratorsPage() {
  const result = await getCollaborators()
  const collaborators = result.success ? result.data : []
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Colaboradores</h1>
          <p className="text-muted-foreground">
            Gestiona los colaboradores artesanos
          </p>
        </div>
        <CollaboratorDialog />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Colaboradores</CardTitle>
        </CardHeader>
        <CardContent>
          <CollaboratorsTable collaborators={collaborators} />
        </CardContent>
      </Card>
    </div>
  )
}
