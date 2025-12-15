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
    title: 'Productos Artesanales',
    description: 'Hechos con amor por nuestros queridos artesanos de la tercera edad',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&h=600&fit=crop',
    cta: 'Ver Catálogo',
    ctaLink: '/catalog',
  },
  {
    title: 'Apoyando a Nuestros Mayores',
    description: 'Cada compra ayuda a dar visibilidad al talento de nuestros colaboradores',
    image: 'https://static.wixstatic.com/media/63876d_ec107b13727445fd9335097aca3b7799~mv2.jpg/v1/fill/w_1125,h_434,al_c,q_85,enc_avif,quality_auto/63876d_ec107b13727445fd9335097aca3b7799~mv2.jpg',
    cta: 'Conocer Más',
    ctaLink: '#our-story',
  },
  {
    title: 'Calidad y Tradición',
    description: 'Productos únicos elaborados con técnicas tradicionales',
    // image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=600&fit=crop',
    image: 'https://teleasistencia.es/storage/redactor/ktiPpqRhEeAd5wkbi8gZlvVobToKXA3xgxjuDnNR.jpg',
    cta: 'Explorar',
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
                      <h1 className="text-4xl md:text-6xl font-bold text-white">
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
