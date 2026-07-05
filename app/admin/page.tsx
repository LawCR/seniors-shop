import { getDashboardStats } from '@/app/actions/dashboard'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Package, FolderTree, Users, Star, ShoppingCart, UserPlus, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default async function AdminDashboard() {
  const result = await getDashboardStats()
  const stats = result.success ? result.data : null

  const cards = [
    {
      title: 'Total Productos',
      value: stats?.productsCount || 0,
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Órdenes',
      value: stats?.ordersCount || 0,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Clientes Registrados',
      value: stats?.clientsCount || 0,
      icon: UserPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Colaboradores',
      value: stats?.collaboratorsCount || 0,
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ]

  const lowStockProducts = stats?.lowStockProducts || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración de Qori.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Link href="/admin/orders/new">
              <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="rounded-full bg-green-100 p-2">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Nueva Orden</p>
                  <p className="text-xs text-muted-foreground">Registrar venta manual</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/products/new">
              <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="rounded-full bg-primary/10 p-2">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Nuevo Producto</p>
                  <p className="text-xs text-muted-foreground">Agregar al inventario</p>
                </div>
              </div>
            </Link>
            <Link href="/admin/clients">
              <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <div className="rounded-full bg-blue-100 p-2">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Ver Clientes</p>
                  <p className="text-xs text-muted-foreground">Gestionar base de datos</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="col-span-3 border-orange-200 bg-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              Alerta de Stock
            </CardTitle>
            <CardDescription>
              Productos con menos de 5 unidades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                Todo en orden. No hay productos con bajo stock.
              </p>
            ) : (
              <div className="space-y-4">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between border-b border-orange-100 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-8 w-8 rounded bg-background border shrink-0 overflow-hidden">
                        {product.images[0] && <img src={product.images[0]} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <span className="font-medium text-sm truncate">{product.name}</span>
                    </div>
                    <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-100">
                      {product.stock} un.
                    </Badge>
                  </div>
                ))}
                <div className="pt-2">
                  <Button asChild variant="link" className="px-0 text-orange-700 h-auto">
                    <Link href="/admin/products">Ver inventario completo &rarr;</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}