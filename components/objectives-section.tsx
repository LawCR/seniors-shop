import { CheckCircle2, TrendingUp, Users, ShoppingBag, Sparkles, HandHeart } from 'lucide-react'

const objectives = [
  {
    icon: TrendingUp,
    title: 'Visibilidad en el Mercado',
    description: 'Dar a conocer el talento de nuestros artesanos a nivel nacional',
  },
  {
    icon: Users,
    title: 'Comunidad Activa',
    description: 'Crear una red de apoyo entre artesanos y clientes',
  },
  {
    icon: ShoppingBag,
    title: 'Comercio Justo',
    description: 'Garantizar precios justos para los creadores',
  },
]

const benefits = [
  {
    icon: Sparkles,
    title: 'Productos Únicos',
    description: 'Cada pieza es única y hecha a mano con dedicación',
  },
  {
    icon: HandHeart,
    title: 'Impacto Social',
    description: 'Tu compra apoya directamente a nuestros colaboradores',
  },
  {
    icon: CheckCircle2,
    title: 'Calidad Garantizada',
    description: 'Productos elaborados con técnicas tradicionales de calidad',
  },
]

export function ObjectivesSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        {/* Objectives */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nuestros Objetivos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              Lo Que Buscamos Lograr
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestro compromiso con la comunidad artesanal
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {objectives.map((objective, index) => (
              <div
                key={objective.title}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full p-8 rounded-2xl bg-card border border-border/80 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-flex p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <objective.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-serif">{objective.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{objective.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Beneficios</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              Por Qué Elegirnos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lo que hace especial comprar en Qori
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full p-8 rounded-2xl bg-card border border-border/80 hover:border-secondary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-flex p-4 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                        <benefit.icon className="h-8 w-8 text-secondary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-serif">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
