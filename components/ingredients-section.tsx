"use client"

import { motion } from 'framer-motion'
import { Leaf, Sparkles, ShieldCheck, Flame, Sprout, Recycle } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

export function IngredientsSection() {
  const leftFeatures: Feature[] = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Insumos Naturales",
      description: "100% naturales, libres de conservantes, aditivos artificiales e ingredientes modificados."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Aguaymanto Seleccionado",
      description: "El \"oro andino\" seleccionado a mano para brindar un balance frutal y acidez inigualable."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Libre de Gluten",
      description: "Elaborado bajo estrictos estándares clean label para garantizar bienestar y pureza."
    }
  ]

  const rightFeatures: Feature[] = [
    {
      icon: <Flame className="h-6 w-6" />,
      title: "Toque Picante",
      description: "Un nivel de picor moderado y elegante logrado con páprika seleccionada de alta calidad."
    },
    {
      icon: <Sprout className="h-6 w-6" />,
      title: "100% Vegano",
      description: "Apto para dietas veganas, respetando la biodiversidad y elaborado con ingredientes 100% vegetales."
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Frasco Eco-Amigable",
      description: "Presentación en frasco de vidrio de 100g reutilizable, cuidando del sabor y del medio ambiente."
    }
  ]

  return (
    <section id="ingredients" className="relative min-h-screen py-24 md:py-32 bg-background flex flex-col justify-center overflow-hidden border-t border-border">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_70%)] rounded-full pointer-events-none blur-3xl z-0" />

      {/* <div className="container mx-auto px-4 relative z-10"> */}
      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
          >
            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            Ingredientes y Pureza
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-serif mt-6 text-foreground leading-tight"
          >
            Nuestra Esencia Natural
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground mt-4 text-base md:text-lg"
          >
            Una experiencia gourmet elaborada con la riqueza de la biodiversidad andina, equilibrando sabor y bienestar.
          </motion.p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center  mx-auto">

          {/* Left Column - Characteristics (Symmetry: Right Aligned on Desktop) */}
          <div className="space-y-12 md:space-y-16 order-2 md:order-1 text-center md:text-right">
            {leftFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`group cursor-pointer block ${idx === 1 ? 'mr-0 xl:mr-12' : ''}`}
              >
                <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-primary/10 border border-primary/20 mb-4 md:mb-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-primary mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-xs mx-auto md:mr-0 md:ml-auto">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Column - Ingredients Image */}
          <div className="relative order-1 md:order-2 flex justify-center py-6 md:py-0">
            {/* Subtle light glow behind image */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,transparent_60%)] rounded-full pointer-events-none blur-xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,133,19,0.05)_0%,transparent_70%)] rounded-full pointer-events-none blur-2xl" />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-card shadow-[0_0_50px_rgba(0,0,0,0.8)] group"
            >
              <img
                src="/ingredients.png"
                alt="Ingredientes naturales de Qori"
                className="w-full h-full object-cover transform scale-105 transition-transform duration-1000 group-hover:scale-100"
              />
              {/* Overlay inside the round image wrapper to soften it */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-background/20 mix-blend-multiply" /> */}
              <div className="absolute inset-0 bg-linear-to-t from-background/45 via-transparent to-background/20 mix-blend-multiply" />
            </motion.div>
          </div>

          {/* Right Column - Characteristics (Symmetry: Left Aligned on Desktop) */}
          <div className="space-y-12 md:space-y-16 order-3 text-center md:text-left">
            {rightFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`group cursor-pointer block ${idx === 1 ? 'mr-0 xl:ml-12' : ''}`}
              >
                <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-primary/10 border border-primary/20 mb-4 md:mb-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-primary mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-xs mx-auto md:ml-0 md:mr-auto">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
