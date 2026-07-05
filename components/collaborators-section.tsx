'use client'

import { getCollaborators } from '@/app/actions/collaborators'
import { Collaborator } from '@prisma/client'
import { Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export function CollaboratorsSection() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])

  useEffect(() => {
    async function load() {
      const result = await getCollaborators()
      if (result.success) {
        setCollaborators(result.data || [])
      }
    }
    load()
  }, [])

  if (collaborators.length === 0) {
    return null
  }

  return (
    <section className="py-24 md:py-32 bg-linear-to-b from-primary/5 via-background to-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nuestro Equipo Artesanal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight font-serif">
            Manos que Crean Historias
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Cada artesano aporta años de experiencia y amor en cada creación.
            Conócelos y descubre la pasión detrás de cada producto.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {collaborators.map((collaborator) => (
            <div key={collaborator.id} className="group h-[26rem] perspective-1000">
              <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">

                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <div className="h-full w-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-3/5 overflow-hidden">
                      <img
                        src={collaborator.image}
                        alt={`${collaborator.firstName} ${collaborator.lastName}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold leading-none font-serif">
                          {collaborator.firstName}
                        </h3>
                        <h3 className="text-xl font-medium opacity-90 font-serif">
                          {collaborator.lastName}
                        </h3>
                      </div>
                    </div>

                    <div className="h-2/5 p-6 flex flex-col justify-between bg-zinc-950/70 backdrop-blur-sm">
                      <div>
                        <p className="text-primary font-semibold tracking-wide uppercase text-xs mb-2">
                          Artesano Experto
                        </p>
                        <div className="h-1 w-12 bg-primary rounded-full mb-3" />
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {collaborator.description}
                        </p>
                      </div>
                      <p className="text-xs text-center text-primary/70 font-medium mt-2">
                        Ver perfil completo ➜
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  <div className="h-full w-full rounded-2xl overflow-hidden bg-primary text-primary-foreground p-8 flex flex-col items-center justify-center text-center shadow-xl relative">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />

                    <div className="relative z-10 space-y-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 mx-auto shadow-inner">
                        <img
                          src={collaborator.image}
                          className="w-full h-full object-cover"
                          alt="Avatar"
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold">
                          {collaborator.firstName} {collaborator.lastName}
                        </h3>
                        <p className="text-sm opacity-90">Colaborador desde 2024</p>
                      </div>

                      <div className="w-full h-px bg-white/20 my-4" />

                      <p className="text-sm leading-relaxed opacity-95 italic">
                        &quot;{collaborator.description}&quot;
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
