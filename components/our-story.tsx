"use client"
import { Heart } from 'lucide-react'

export function OurStory() {
  return (
    <section id="our-story" className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image Side */}
          <div className="relative order-2 md:order-1 perspective-1000 group">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-2 transition-transform duration-700 group-hover:rotate-0 border-8 border-card">
              <img
                src="https://plus.unsplash.com/premium_photo-1695120371091-ed395328de61?w=800&h=800&fit=crop"
                alt="Artesanos trabajando"
                className="object-cover w-full h-full transform scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />

            {/* Floating Badge */}
            <div className="absolute bottom-8 -right-4 bg-card p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float border border-border">
              <div className="bg-secondary/80 p-3 rounded-xl">
                <Heart className="h-6 w-6 text-secondary-foreground" fill="currentColor" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Hecho con</p>
                <p className="text-lg font-bold text-foreground">Pasión</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8 order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary tracking-wide">NUESTRA ESENCIA</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground font-serif">
              ¿Qué es Qori?
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary block mt-2 font-serif">
                El Oro de los Andes
              </span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-primary font-semibold">QORI</strong> es una salsa dip gourmet picante de aguaymanto, inspirada en los sabores andinos del Perú. Su nombre significa &quot;oro&quot; en quechua, haciendo referencia al gran valor del aguaymanto, su ingrediente estrella.
              </p>

              <p>
                Elaborada con insumos 100% naturales, libre de gluten y conservantes, y totalmente apta para veganos. Se presenta en un sofisticado frasco de vidrio de 100 g, diseñado para ofrecer una experiencia gastronómica innovadora, saludable y de la más alta calidad.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm font-medium text-muted-foreground mt-1">Natural y Vegano</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-foreground">100g</div>
                <div className="text-sm font-medium text-muted-foreground mt-1">Frasco Gourmet</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-foreground">0%</div>
                <div className="text-sm font-medium text-muted-foreground mt-1">Preservantes y Gluten</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
