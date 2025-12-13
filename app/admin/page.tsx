import { getDashboardStats } from '@/app/actions/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, FolderTree, Users, Star } from 'lucide-react'
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
      title: 'Categorías',
      value: stats?.categoriesCount || 0,
      icon: FolderTree,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Colaboradores',
      value: stats?.collaboratorsCount || 0,
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Productos Destacados',
      value: stats?.featuredProductsCount || 0,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración de Manos de Vida
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="card-hover">
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
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <a
            href="/admin/products/new"
            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <div className="rounded-full bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Nuevo Producto</p>
              <p className="text-sm text-muted-foreground">Agregar producto</p>
            </div>
          </a>
          <a
            href="/admin/categories"
            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <div className="rounded-full bg-secondary/10 p-2">
              <FolderTree className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium">Gestionar Categorías</p>
              <p className="text-sm text-muted-foreground">Ver categorías</p>
            </div>
          </a>
          <a
            href="/admin/collaborators"
            className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <div className="rounded-full bg-accent/10 p-2">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">Gestionar Colaboradores</p>
              <p className="text-sm text-muted-foreground">Ver colaboradores</p>
            </div>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}