import { Target, Eye, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const values = [
  {
    icon: Target,
    title: 'Misión',
    description:
      'Llevar el sabor auténtico del aguaymanto peruano a consumidores nacionales e internacionales mediante productos gourmet innovadores, promoviendo la sostenibilidad y la gastronomía del Perú.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Eye,
    title: 'Visión',
    description:
      'Ser la marca peruana líder en salsas dip gourmet de origen andino en América Latina, destacando por su innovación, calidad y valorización de ingredientes emblemáticos del Perú.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: Award,
    title: 'Valores',
    description:
      'Autenticidad, sostenibilidad, innovación, impacto social y calidad gourmet. Principios que definen la excelencia de nuestra salsa y nuestro compromiso con el origen andino.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
]

export function ValuesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            Nuestros Pilares
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Los principios que guían nuestro trabajo y compromiso con la comunidad
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="card-hover border border-border/80 bg-card">
              <CardHeader>
                <div className={`rounded-full ${value.bgColor} p-3 w-fit mb-4`}>
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <CardTitle className="text-2xl font-serif text-foreground">{value.title}</CardTitle>
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
