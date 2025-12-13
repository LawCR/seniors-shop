'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ProductInput } from '@/lib/validations'

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: products }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, error: 'Error al obtener productos' }
  }
}

export async function getProductById(id: string) {
  try {
    console.log({ id })
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })
    return { success: true, data: product }
  } catch (error) {
    console.error('Error fetching product:', error)
    return { success: false, error: 'Error al obtener el producto' }
  }
}

export async function getFeaturedProducts(limit: number = 3) {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: true,
      },
      include: {
        category: true,
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: products }
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return { success: false, error: 'Error al obtener productos destacados' }
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { success: true, data: products }
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return { success: false, error: 'Error al obtener productos por categoría' }
  }
}

export async function createProduct(data: ProductInput) {
  try {
    const product = await prisma.product.create({
      data,
    })
    revalidatePath('/admin/products')
    revalidatePath('/catalog')
    revalidatePath('/')
    return { success: true, data: product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: 'Error al crear el producto' }
  }
}

export async function updateProduct(id: string, data: ProductInput) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    })
    revalidatePath('/admin/products')
    revalidatePath('/catalog')
    revalidatePath('/')
    return { success: true, data: product }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Error al actualizar el producto' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    })
    revalidatePath('/admin/products')
    revalidatePath('/catalog')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Error al eliminar el producto' }
  }
}

export async function toggleProductFeatured(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return { success: false, error: 'Producto no encontrado' }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        featured: !product.featured,
      },
    })

    revalidatePath('/admin/products')
    revalidatePath('/')
    return { success: true, data: updated }
  } catch (error) {
    console.error('Error toggling product featured:', error)
    return { success: false, error: 'Error al cambiar estado destacado' }
  }
}
