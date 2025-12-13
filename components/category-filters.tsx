'use client'

import { Category } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface CategoryFiltersProps {
  categories?: Category[]
}

export function CategoryFilters({ categories = [] }: CategoryFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategoryId = searchParams.get('category')

  const handleCategoryClick = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categoryId) {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }

    router.push(`/catalog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCategoryClick(null)}
        className={cn(
          "rounded-full transition-all",
          !currentCategoryId
            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary"
            : "hover:border-primary/50"
        )}
      >
        Todas
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          size="sm"
          onClick={() => handleCategoryClick(category.id)}
          className={cn(
            "rounded-full transition-all",
            currentCategoryId === category.id
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary"
              : "hover:border-primary/50"
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
