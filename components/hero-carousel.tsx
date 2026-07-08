'use client'

import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const heroSlides = [
  {
    title: 'Salsas Artesanales Premium',
    description: 'Sabores intensos y tradicionales elaborados con ingredientes seleccionados de la más alta calidad.',
    image: 'https://res.cloudinary.com/alvaro-dev/image/upload/v1783471993/images/eunmdc5imsycyjaoiymn.jpg',
    cta: 'Ver Colección',
    ctaLink: '/catalog',
  },
  {
    title: 'El Sabor de Oro de Nuestra Tierra',
    description: 'Qori rinde homenaje a las recetas tradicionales con una selección de salsas hechas con pasión y maestría.',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=1600&h=800&fit=crop',
    cta: 'Nuestra Esencia',
    ctaLink: '#our-story',
  },
  {
    title: 'Experiencia Gastronómica Única',
    description: 'El acompañamiento perfecto para realzar tus platos favoritos con un toque sofisticado y picante.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&h=800&fit=crop',
    cta: 'Explorar Salsas',
    ctaLink: '/catalog',
  },
]

export function HeroCarousel() {
  const [_, setApi] = useState<any>()

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30" />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-2xl space-y-4 animate-fade-in">
                      <h1 className="text-4xl md:text-6xl font-bold text-white font-serif tracking-wide">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-gray-200">
                        {slide.description}
                      </p>
                      <div className="pt-4">
                        <Button asChild size="lg" className="shadow-lg">
                          <Link href={slide.ctaLink}>{slide.cta}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
}
