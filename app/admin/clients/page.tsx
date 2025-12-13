import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Eye, Users } from 'lucide-react'
import Link from 'next/link'
import { getClients } from '@/app/actions/clients'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function ClientsPage() {
  const result = await getClients()
  const clients = result.success ? result.data || [] : []

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gestiona la base de datos de clientes y su historial.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Lista de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead className="text-center">Órdenes</TableHead>
                  <TableHead>Registrado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No hay clientes registrados aún.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        {client.fullName}
                      </TableCell>
                      <TableCell>{client.dni}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.city || '-'}</TableCell>
                      <TableCell className="text-center">
                        {client._count.orders}
                      </TableCell>
                      <TableCell>
                        {format(new Date(client.createdAt), "d MMM yyyy", { locale: es })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/admin/clients/${client.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
