import { Target, Eye, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const values = [
  {
    icon: Target,
    title: 'Misión',
    description:
      'Proporcionar una plataforma que empodere a los artesanos de la tercera edad, permitiéndoles compartir sus creaciones con el mundo y generar ingresos dignos a través de su talento.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Eye,
    title: 'Visión',
    description:
      'Ser la plataforma líder en la promoción y venta de productos artesanales elaborados por personas mayores, reconocida por valorar la experiencia y el talento de nuestros colaboradores.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: Award,
    title: 'Valores',
    description:
      'Respeto, calidad, tradición, inclusión y compromiso social. Valoramos el trabajo artesanal, la experiencia de vida y el legado cultural que cada colaborador aporta a nuestra comunidad.',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
]

export function ValuesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestros Pilares
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Los principios que guían nuestro trabajo y compromiso con la comunidad
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="card-hover border-2">
              <CardHeader>
                <div className={`rounded-full ${value.bgColor} p-3 w-fit mb-4`}>
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <CardTitle className="text-2xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
