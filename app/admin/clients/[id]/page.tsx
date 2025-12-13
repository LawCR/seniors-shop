import { getClientById } from '@/app/actions/clients'
import { notFound } from 'next/navigation'
import { ClientForm } from '@/components/admin/client-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, History, Package, User } from 'lucide-react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface ClientPageProps {
  params: Promise<{ id: string }>
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params
  const result = await getClientById(id)

  if (!result.success || !result.data) {
    notFound()
  }

  const client = result.data

  return (
    <main className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Detalles del Cliente</h1>
          <p className="text-muted-foreground">
            Información personal e historial de compras.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Client Info / Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>
              Puedes editar los datos de contacto y dirección.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientForm client={client} />
            <div className="mt-4 text-xs text-muted-foreground">
              Registrado el: {format(new Date(client.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
            </div>
          </CardContent>
        </Card>

        {/* Stats Card (Optional placeholder for now, nice to have) */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="bg-background p-4 rounded-lg border shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Total Compras</div>
              <div className="text-2xl font-bold">{client.orders.length}</div>
            </div>
            {/* We could add Total Spent here if we calculated it manually or via aggregate query */}
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historial de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Orden ID</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client.orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Este cliente no ha realizado compras.
                    </TableCell>
                  </TableRow>
                ) : (
                  client.orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-xs">{order.id.slice(-8)}</TableCell>
                      <TableCell>
                        {format(new Date(order.createdAt), "d MMM yyyy", { locale: es })}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm flex items-center gap-2">
                              <span className="font-medium text-xs bg-muted px-1.5 py-0.5 rounded">x{item.quantity}</span>
                              <span className="line-clamp-1">{item.product.name}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">S/ {order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                          {order.status === 'completed' ? 'Completado' : 'Pendiente'}
                        </Badge>
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
