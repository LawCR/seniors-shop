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
        'flex items-center justify-center rounded-full  shadow-lg',
        sizeClasses[size],
        className
      )}
    >
      {/* Reemplaza este contenido con tu logo/imagen cuando lo tengas */}
      {/* <span className="font-bold text-primary-foreground">SS</span> */}

      {/* Para usar una imagen, descomenta esto y comenta el span de arriba: */}
      <img
        src="/logo.svg"
        alt="Seniors Shop Logo"
        className="h-full w-full object-contain p-1 text-white stroke-1 stroke-white fill-white "
      />

    </div>
  )
}