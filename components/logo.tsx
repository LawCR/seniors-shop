import { cn } from '@/lib/utils'
interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
const sizeClasses = {
  sm: 'h-8 w-8 text-base',
  md: 'h-12 w-12 text-xl',
  lg: 'h-16 w-16 text-2xl',
}
export function Logo({ size = 'md', className }: LogoProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full overflow-hidden shadow-lg',
        sizeClasses[size],
        className
      )}
    >
      {/* Reemplaza este contenido con tu logo/imagen cuando lo tengas */}
      {/* <span className="font-bold text-primary-foreground">SS</span> */}

      {/* Para usar una imagen, descomenta esto y comenta el span de arriba: */}
      <img
        src="/logo.png"
        alt="Qori Logo"
        className="h-full w-full object-center rounded-full scale-105"
      />

    </div>
  )
}