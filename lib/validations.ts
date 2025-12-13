import { z } from 'zod'

// Admin validation
export const adminLoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

// Category validation
export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  slug: z.string().min(1, 'El slug es requerido'),
})

// Product validation
export const productSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  price: z.number().positive('El precio debe ser mayor a 0'),
  images: z.array(z.string()).min(1, 'Debe agregar al menos una imagen'),
  categoryId: z.string().min(1, 'La categoría es requerida'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
  // featured: z.boolean().optional().default(false),
  featured: z.boolean(),
})

// Collaborator validation
export const collaboratorSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  image: z.string().min(1, 'La imagen es requerida'),
  description: z.string().min(1, 'La descripción es requerida'),
})

// Checkout validation
export const checkoutSchema = z.object({
  fullName: z.string().min(1, 'El nombre completo es requerido'),
  dni: z.string().min(8, 'El DNI debe tener al menos 8 caracteres'),
  paymentMethod: z.enum(['yape', 'plin', 'transferencia', 'none']).optional(),
})

export type AdminLoginInput = z.infer<typeof adminLoginSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type ProductInput = z.infer<typeof productSchema>
export type CollaboratorInput = z.infer<typeof collaboratorSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
