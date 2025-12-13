'use client'

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { searchProducts } from '@/app/actions/orders'

interface ProductSearchProps {
  onSelect: (product: any) => void
}

export function ProductSearch({ onSelect }: ProductSearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 1) {
        setLoading(true)
        const result = await searchProducts(query)
        if (result.success && result.data) {
          setProducts(result.data)
        }
        setLoading(false)
      } else {
        setProducts([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="text-muted-foreground font-normal">
            Buscar productos por nombre...
          </span>
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Escribe para buscar..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && <CommandEmpty>Buscando...</CommandEmpty>}
            {!loading && products.length === 0 && query.length > 2 && (
              <CommandEmpty>No se encontraron productos.</CommandEmpty>
            )}
            {!loading && products.length > 0 && (
              <CommandGroup heading="Resultados">
                {products.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={() => {
                      onSelect(product)
                      setOpen(false)
                      setQuery('')
                      setProducts([])
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 opacity-0"
                      )}
                    />
                    <div className="flex items-center gap-2 w-full">
                      <div className="h-8 w-8 rounded overflow-hidden bg-muted shrink-0">
                        {product.images?.[0] && (
                          <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span>S/ {product.price.toFixed(2)}</span>
                          <span>• Stock: {product.stock}</span>
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
