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
    image: 'https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSmqDV1E1OxCrqllFOrde15CpUtvM5GrWEXixjIz4I-_k1shGOpIVgVLTwhC6yGgGKiooZIf-niFCZf2IOHAivoF_uM_Xl1kreaG_eTw41zMu8FJ9eL1rWB7SURfr22cN2Y-eJ0JloBOjD8GVsH3koCFiTcLdu4ANYQtP5IQbTQxTKnxFiLuydJcPhsInqliDCgHZMDEoqKks_1XSexiOdpqEEm3b1u47To24MYKWfLl7ZKs2G2v1tH6jll1f75jjSKxaJqKzuKG7WuhbTp5Hzj5-sk3Z8zqOxRPMSVLSKeM0E9JpDBAMHK-sgkqNSEoIo3hRXSF9UsELsrSExLRJMbACAUFE8Mv7Cxhf5Df_ijOv-1V3TS0NgFSaSmtgQc5E5M7rlHOawSlo2x33dA2vvxDlLBhZlXl2vhVSp46KCO82czur_vgQeB6fjP5jCTkah_EX7f8jNpFibWcBHKV7JjzsOzKPeaMQYhVL6PJSFCyAtRyfjbfAcnYW6xxbYYHYJr-j1kM8dBuQ054IWJQSv5BkqWZ3_JQvbFUeuq7EUOBQjmFqljsTuXu7FgExbNpYFi7i10WgHPkQ7BMr0YB_LT3nXgZtDjg3qzoJntvqL1oTa8z2YEBuqIrMHc25_anDJPQW5BaDK4RtWos4rxQCVMuiGjcek6Enu7zDRXIdL-iojRuKJLzAUrZnQLrWtg2X8oDX0m5QYDZUek-oHx_KoRXVcPsNQo6xajhAyXVJFayvDJcCgfGMGJd4oIxjQk6hrN4AN1Gi0sIbNXiejpuKs5KQiH_Qk9J3kk2J3784tXuAAqyUVqNIGiP6LyQ-TL5q6_V1HDWe1AL3EsKd4ZcAK-EJIUL-_5-8bx3oyxsZSHrLQ3T19lqkzPqLclEUtCQ2CZReeYn8AFUteyX8nVQTfOeMaiWUbqN0YWjcP9bMfjgHpNe1vAg5AxGbX_WJVHASMmZm3YyHKdzwhIn4YTkG8HIHvdQ1YmVOgZasRfV4qQmuRNbcLb_U6dWZ2anu8qsjmLSYOQrlWnfh6X1mkbjviGE3ncrnRFCf--5hIZLSYVLweiI02rFUtgvkQC-VREz4cLYkX_UTwISV7tXfUWdCGLeMDM9XFCwVjDoZ2lqMTapOCwL6kG3duv3tJbv0tJELVo5N0aVZgmi0hUdNr9IwqVEJQA9a3WIFMMWxXozZq_KDwEx75y9xIn3KyE4IU4drbajMpq3UeQz7X_0inuEeWBQOP-j60ItQcjxz-3b0Ll_vqFRH-g_G3mszXfAJ1r1Si1kx2QjEqCxHtKoeCRNRDfe7Bg2DBFT=s1024-rj',
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
